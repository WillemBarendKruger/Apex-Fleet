"use client";

import { useEffect, useState } from "react";
import { Table, Button, Space, message, Tag } from "antd";
import { useStyles } from "./style/styles";
import { useEquipmentState, useEquipmentActions } from "@/providers/equipment-provider";
import Loader from "@/components/loader/loader";
import { useEmployeeActions } from "@/providers/employee-provider";
import { useConditionReportState, useConditionReportActions } from "@/providers/condition-report-provider/";
import { IConditionReport } from "@/providers/condition-report-provider/models";
import { IEquipment } from "@/providers/equipment-provider/models";

const ReportsListPage = () => {
    const { styles } = useStyles();
    const { getEmployees } = useEmployeeActions();
    const { getEquipments, updateEquipment } = useEquipmentActions();
    const { Equipments } = useEquipmentState();
    const { getConditionReports, updateConditionReport } = useConditionReportActions();
    const { ConditionReports } = useConditionReportState();

    const [loading, setLoading] = useState(false);

    const refresh = async () => {
        setLoading(true);
        await Promise.all([getConditionReports(), getEmployees(), getEquipments()]);
        setLoading(false);
    };

    useEffect(() => {
        refresh();
    }, []);

    const handleMaintenance = async (report: IConditionReport) => {
        const equipment = Equipments?.find(eq => eq.name === report.equipmentName);
        if (!equipment) {
            message.error("Equipment not found");
            return;
        }

        await Promise.all([
            updateConditionReport({ ...report, priority: "maintenance" }),
            updateEquipment({ ...equipment, status: "maintenance" }),
        ]);

        message.success("Sent for maintenance");
        refresh();
    };

    const handleDecline = async (report: IConditionReport) => {
        const equipment = Equipments?.find(eq => eq.name === report.equipmentName);
        if (!equipment) {
            message.error("Equipment not found");
            return;
        }

        await Promise.all([
            updateConditionReport({ ...report, priority: "declined" }),
            updateEquipment({ ...equipment, status: "inventory" }),
        ]);

        message.info("Request declined");
        refresh();
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
            title: "Priority",
            dataIndex: "priority",
            key: "priority",
            render: (priority: string) => {
                return <Tag color={priority === "extreme" ? "volcano" : priority === "high" ? "red" : "blue"}>{priority.toUpperCase()}</Tag>;
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: IConditionReport, record: IConditionReport) => (
                <Space>
                    <Button type="primary" onClick={() => handleMaintenance(record)}>
                        Send for Maintenance
                    </Button>
                    <Button danger onClick={() => handleDecline(record)}>
                        Decline
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className={styles.equipmentContainer}>
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

                    <Table
                        columns={columns}
                        dataSource={ConditionReports}
                        className={styles.equipmentTable}
                        rowKey={(record, index) => record.id?.toString() || `temp-${index}`}
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: "max-content" }}
                    />
                </div>
            )}
        </>
    );
};

export default ReportsListPage;