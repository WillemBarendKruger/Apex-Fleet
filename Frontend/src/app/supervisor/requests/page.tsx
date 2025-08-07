"use client";

import { useEffect, useState } from "react";
import { Table, Button, Space, message, Tooltip, Modal, Input, Tag, Card } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useStyles } from "./style/styles";
import { useEmployeeState, useEmployeeActions } from "@/providers/employee-provider";
import { useCategoryActions } from "@/providers/category-provider";
import { useRequestState, useRequestActions } from "@/providers/request-provider";
import { IRequest } from "@/providers/request-provider/models";
import { useEquipmentState, useEquipmentActions } from "@/providers/equipment-provider";
import Search from "antd/es/input/Search";

const RequestListPage = () => {
    const { styles } = useStyles();
    const { Employees } = useEmployeeState();
    const { Equipments } = useEquipmentState();
    const { getEmployees } = useEmployeeActions();
    const { getCategories } = useCategoryActions();
    const { Requests } = useRequestState();
    const { getRequests, updateRequest, deleteRequest } = useRequestActions();
    const { getEquipments, updateEquipment } = useEquipmentActions();

    const [loading, setLoading] = useState(false);

    const [approveModalVisible, setApproveModalVisible] = useState(false);
    const [declineModalVisible, setDeclineModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<IRequest | null>(null);
    const [declineReason, setDeclineReason] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredRequests, setFilteredRequests] = useState<IRequest[]>([]);

    const refresh = async () => {
        setLoading(true);
        await Promise.all([getRequests(), getEmployees(), getCategories(), getEquipments()]);
        setLoading(false);
    };

    const newRequests = Requests?.filter(request => request.status === "pending") || [];

    const handleApprove = async (record: IRequest) => {
        try {
            if (!record.id || !record.equipmentId || !record.requestingEmployeeId) {
                message.error("Missing request, equipment, or employee ID.");
                return;
            }

            const equipment = Equipments?.find(eq => eq.id === record.equipmentId);
            const handler = Employees?.find(emp => emp.id === record.requestingEmployeeId);

            if (!equipment || !handler) {
                message.error("Equipment or requester not found.");
                return;
            }

            let returnDateStr = "";
            const dateMatch = record.description?.match(/\d{4}-\d{2}-\d{2}/);
            if (dateMatch) {
                returnDateStr = dateMatch[0];
            } else {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                returnDateStr = tomorrow.toISOString().slice(0, 10);
            }

            const returnDate = new Date(returnDateStr);
            if (isNaN(returnDate.getTime())) {
                message.error("Invalid return date.");
                return;
            }

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (returnDate < today) {
                message.error("Return date cannot be in the past.");
                return;
            }

            await updateEquipment({
                ...equipment,
                handlerId: handler.id,
                handlerEmail: handler.emailAddress,
                status: "assigned",
                returnDate: returnDate.toISOString(),
            });

            await deleteRequest(record.id);

            message.success("Request approved.");
            await refresh();
        } catch (error) {
            console.error("Approval failed:", error);
            message.error("Failed to approve request.");
        }
    };


    const handleDecline = async (record: IRequest, reason: string) => {
        try {
            const updatedDescription = record.description
                ? `${record.description} Reason: ${reason}`
                : `Reason: ${reason}`;

            await updateRequest({
                ...record,
                description: updatedDescription,
                status: "declined",
            });

            message.info("Request declined.");
            await refresh();
        } catch (error) {
            console.error("Decline failed:", error);
            message.error("Failed to decline request.");
        }
    };

    useEffect(() => {
        refresh();
        setFilteredRequests(Requests || []);
    }, []);

    useEffect(() => {
        handleSearch(searchTerm);
    }, [searchTerm]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);

        const lowerTerm = term.toLowerCase();

        const results = newRequests.filter((item: IRequest) =>
            [item.description, item.equipmentName, item.requestingEmployeeEmail, item.status]
                .filter(Boolean)
                .some((field) =>
                    field?.toLowerCase().includes(lowerTerm)
                )
        );

        setFilteredRequests(results);
    };

    const columns = [
        {
            title: "Equipment",
            dataIndex: "equipmentName",
            key: "equipmentName",
        },
        {
            title: "Requester",
            key: "requester",
            render: (_: IRequest, record: IRequest) => {
                const employee = Employees?.find(emp => emp.id === record.requestingEmployeeId);
                return employee ? `${employee.name} ${employee.surname}` : record.requestingEmployeeEmail;
            },
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                return <Tag color={status === "pending" ? "orange" : status === "declined" ? "red" : "green"}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: IRequest, record: IRequest) => (
                <Space>
                    <Tooltip title="Approve Request">
                        <Button
                            icon={<CheckCircleOutlined />}
                            type="default"
                            style={{ borderColor: "#52c41a" }}
                            onClick={() => {
                                setSelectedRecord(record);
                                setApproveModalVisible(true);
                            }}
                        />
                    </Tooltip>

                    <Tooltip title="Decline Request">
                        <Button
                            icon={<CloseCircleOutlined />}
                            danger
                            type="default"
                            onClick={() => {
                                setSelectedRecord(record);
                                setDeclineModalVisible(true);
                            }}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <div className={styles.requestsContainer}>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                }}
            >
                <h2 style={{ margin: 0 }}>Requests List</h2>
            </div>

            <Card className={styles.requestsContainer}>
                <Search onSearch={handleSearch} allowClear placeholder="Search for Requests" style={{ border: "2px solid #84CC16" }} onChange={(e) => setSearchTerm(e.target.value)} />
                <Table
                    columns={columns}
                    dataSource={filteredRequests}
                    className={styles.requestsTable}
                    rowKey={(record) => record.id?.toString() || ""}
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: "max-content" }}
                    loading={!Requests || loading}
                />
            </Card>

            {/* Approve model */}
            <Modal
                open={approveModalVisible}
                title="Confirm Approval"
                onCancel={() => setApproveModalVisible(false)}
                onOk={() => {
                    if (selectedRecord) {
                        handleApprove(selectedRecord);
                    }
                    setApproveModalVisible(false);
                }}
                okText="Approve"
                cancelText="Cancel"
            >
                <p>Are you sure you want to approve this request?</p>
            </Modal>

            {/* Decline model */}
            <Modal
                open={declineModalVisible}
                title="Decline Request"
                onCancel={() => setDeclineModalVisible(false)}
                onOk={() => {
                    if (!declineReason.trim()) {
                        message.error("Please provide a reason for the decline.");
                        return;
                    }

                    if (selectedRecord) {
                        handleDecline(selectedRecord, declineReason);
                    }
                    setDeclineModalVisible(false);
                    setDeclineReason("");
                }}
                okText="Submit"
                cancelText="Cancel"
            >
                <p>Please provide a reason for declining this request:</p>
                <Input.TextArea
                    rows={4}
                    value={declineReason}
                    onChange={(e) => setDeclineReason(e.target.value)}
                    placeholder="Enter reason..."
                />
            </Modal>
        </div>
    );
};

export default RequestListPage;