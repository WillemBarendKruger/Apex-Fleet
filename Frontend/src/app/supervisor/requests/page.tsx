"use client";

import { useCallback, useEffect, useState } from "react";
import { Table, Button, Space, message, Tooltip, Modal, Input } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useStyles } from "./style/styles";
import Loader from "@/components/loader/loader";
import { useEmployeeState, useEmployeeActions } from "@/providers/employee-provider";
import { useCategoryActions } from "@/providers/category-provider";
import { useRequestState, useRequestActions } from "@/providers/request-provider";
import { IRequest } from "@/providers/request-provider/models";
import { useEquipmentState, useEquipmentActions } from "@/providers/equipment-provider";
import { IEquipment } from "@/providers/equipment-provider/models";

const RequestListPage = () => {
    const { styles } = useStyles();
    const { Employees } = useEmployeeState();
    const { Equipments } = useEquipmentState();
    const { getEmployees } = useEmployeeActions();
    const { getCategories } = useCategoryActions();
    const { Requests } = useRequestState();
    const { getRequests, updateRequest } = useRequestActions();
    const { getEquipments, updateEquipment } = useEquipmentActions();

    const [loading, setLoading] = useState(false);

    const [approveModalVisible, setApproveModalVisible] = useState(false);
    const [declineModalVisible, setDeclineModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<IRequest | null>(null);
    const [declineReason, setDeclineReason] = useState("");

    const refresh = async () => {
        setLoading(true);
        await Promise.all([getRequests(), getEmployees(), getCategories(), getEquipments()]);
        setLoading(false);
    };

    const newRequests = Requests?.filter(request => request.status === "pending") || [];

    const handleApprove = async (record: IRequest) => {
        try {
            const approvalNote = "Request approved by supervisor.";

            const updatedDescription = record.description
                ? `${record.description} ${approvalNote}`
                : approvalNote;

            await updateRequest({
                ...record,
                description: updatedDescription,
                status: "assigned",
            });

            const equipment = Equipments?.find(eq => eq.id === record.equipmentId);
            const handler = Employees?.find(emp => emp.id === record.requestingEmployeeId);

            if (!equipment || !handler) {
                message.error("Equipment or requester not found");
                return;
            }

            await updateEquipment({
                ...equipment,
                handlerId: handler.id,
                handlerEmail: handler.emailAddress,
                status: "assigned",
            });

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
    }, []);

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
        <div className={styles.equipmentContainer}>
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

            <Table
                columns={columns}
                dataSource={newRequests}
                className={styles.equipmentTable}
                rowKey={(record, index) => record.id?.toString() || `temp-${index}`}
                pagination={{ pageSize: 5 }}
                scroll={{ x: "max-content" }}
                loading={{
                    spinning: loading,
                    indicator: <Loader />,
                }}
            />

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