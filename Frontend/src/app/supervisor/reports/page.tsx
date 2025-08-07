"use client";

import { useEffect, useState } from "react";
import { Table, Button, Space, message, Tag, Tooltip, Input, Modal, Card } from "antd";
import { ToolOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useStyles } from "./style/styles";
import { useEquipmentState, useEquipmentActions } from "@/providers/equipment-provider";
import { useEmployeeActions } from "@/providers/employee-provider";
import { useConditionReportState, useConditionReportActions } from "@/providers/condition-report-provider/";
import { IConditionReport } from "@/providers/condition-report-provider/models";
import Search from "antd/es/input/Search";
import { deleteConditionReportError } from "@/providers/condition-report-provider/actions";

const ReportsListPage = () => {
    const { styles } = useStyles();
    const { getEmployees } = useEmployeeActions();
    const { getEquipments, updateEquipment } = useEquipmentActions();
    const { Equipments } = useEquipmentState();
    const { getConditionReports, updateConditionReport, deleteConditionReport } = useConditionReportActions();
    const { ConditionReports } = useConditionReportState();

    const [loading, setLoading] = useState(false);
    const [maintenanceModalVisible, setMaintenanceModalVisible] = useState(false);
    const [declineModalVisible, setDeclineModalVisible] = useState(false);
    const [declineReason, setDeclineReason] = useState("");
    const [selectedRecord, setSelectedRecord] = useState<IConditionReport | null>(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredReports, setFilteredReports] = useState<IConditionReport[]>([]);

    const refresh = async () => {
        setLoading(true);
        await Promise.all([getConditionReports(), getEmployees(), getEquipments()]);
        setLoading(false);
    };

    useEffect(() => {
        refresh();
        setFilteredReports(ConditionReports || []);
    }, []);

    useEffect(() => {
        setFilteredReports(pendingReports || []);
    }, [ConditionReports]);

    useEffect(() => {
        handleSearch(searchTerm);
    }, [searchTerm]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);

        const lowerTerm = term.toLowerCase();

        const results = pendingReports.filter((item: IConditionReport) =>
            [item.description, item.equipmentName, item.status]
                .filter(Boolean)
                .some((field) =>
                    field.toLowerCase().includes(lowerTerm)
                )
        );

        setFilteredReports(results);
    };

    const handleMaintenance = async (report: IConditionReport) => {
        const equipment = Equipments?.find(eq => eq.name === report.equipmentName);
        if (!equipment) {
            message.error("Equipment not found");
            return;
        }

        try {

            await Promise.all([
                deleteConditionReport(report.id ?? ""),
                updateEquipment({
                    ...equipment,
                    status: "maintenance",
                }),
            ]);

            message.success("Equipment sent for maintenance.");
            await refresh();
        } catch (error) {
            console.error("Error updating report:", error);
            message.error("Failed to send equipment for maintenance.");
        }
    };


    const pendingReports = ConditionReports?.filter(report => report.status === "pending" || report.status === "maintenance") || [];


    const handleDecline = async (report: IConditionReport, reason: string) => {
        const equipment = Equipments?.find(eq => eq.name === report.equipmentName);
        if (!equipment) {
            message.error("Equipment not found");
            return;
        }

        try {
            const updatedDescription = report.description
                ? `${report.description} Reason: ${reason}`
                : `Reason: ${reason}`;

            await Promise.all([
                updateConditionReport({
                    ...report,
                    description: updatedDescription,
                    status: "declined",
                }),
                updateEquipment({
                    ...equipment,
                    status: "inventory",
                }),
            ]);

            message.success("Request declined and equipment returned to inventory.");
            await refresh();
        } catch (error) {
            console.error("Decline failed:", error);
            message.error("Failed to decline request. Please try again.");
        }
    };


    const columns = [
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Equipment",
            dataIndex: "equipmentName",
            key: "equipment",
        },
        {
            title: "Serial Number",
            key: "serialNumber",
            render: (_: IConditionReport, record: IConditionReport) => {
                const equipment = Equipments?.find(eq => eq.name === record.equipmentName);
                return equipment?.serialNumber || "N/A";
            },
        },
        {
            title: "Reported By",
            key: "reportingEmployee",
            render: (_: IConditionReport, record: IConditionReport) => {
                return record.reportingEmployeeName || record.reportingEmployeeEmail || "Unknown Reporter";
            },
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                return <Tag style={{ background: "transparent" }} color={status === "pending" ? "orange" : status === "declined" ? "red" : "green"}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: IConditionReport, record: IConditionReport) => (
                <Space>
                    <Tooltip title="Send for Maintenance">
                        <Button
                            icon={<ToolOutlined />}
                            type="default"
                            style={{ borderColor: "#ff9900ff" }}
                            onClick={() => {
                                setSelectedRecord(record);
                                setMaintenanceModalVisible(true);
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
        <div className={styles.reportsContainer}>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                }}
            >
                <h2 style={{ margin: 0 }}>Reports List</h2>
            </div>

            <Card className={styles.reportsContainer}>
                <Search onSearch={handleSearch} allowClear placeholder="Search for Reports" style={{ border: "2px solid #84CC16" }} onChange={(e) => setSearchTerm(e.target.value)} />
                <Table
                    columns={columns}
                    dataSource={filteredReports}
                    className={styles.reportsTable}
                    rowKey={(record) => record.id?.toString() || record.equipmentName}
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: "max-content" }}
                    loading={!ConditionReports || loading}
                />
            </Card>
            {/* Maintenance modal */}
            <Modal
                open={maintenanceModalVisible}
                title="Confirm Maintenance"
                onCancel={() => setMaintenanceModalVisible(false)}
                onOk={() => {
                    if (selectedRecord) {
                        handleMaintenance(selectedRecord);
                    }
                    setMaintenanceModalVisible(false);
                }}
                okText="Confirm"
                cancelText="Cancel"
            >
                <p>Are you sure you want to send this equipment for maintenance?</p>
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

export default ReportsListPage;