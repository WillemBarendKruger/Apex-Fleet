"use client";

import { useCallback, useEffect, useState } from "react";
import { Table, Button, Space, message } from "antd";
import { useStyles } from "./style/styles";
import { IEmployee } from "@/providers/employee-provider/models";
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

    const refresh = async () => {
        setLoading(true);
        await Promise.all([getRequests(), getEmployees(), getCategories(), getEquipments()]);
        setLoading(false);
    };

    const handleApprove = useCallback(async (record: IRequest) => {
        try {
            await updateRequest({ ...record, status: "approved" });

            const equipment = Equipments?.find(eq => eq.id === record.equipmentId);
            const handler = Employees?.find(emp => emp.id === record.requestingEmployeeId);

            if (!equipment || !handler) {
                message.error("Equipment or requester not found");
                return;
            }

            const updatedEquipment: IEquipment = {
                ...equipment,
                handlerId: handler.id,
                handlerEmail: handler.emailAddress,
                status: "assigned",
            };

            await updateEquipment(updatedEquipment);

            message.success("Request approved and equipment assigned");
            await refresh();
        } catch (error) {
            message.error("Failed to approve request");
            console.error("Error approving request:", error);
        }
    }, [updateRequest, updateEquipment, Equipments, Employees, refresh]);

    const handleDecline = useCallback(async (record: IRequest) => {
        try {
            await updateRequest({ ...record, status: "declined" });
            message.info("Request declined");
            await refresh();
        } catch (error) {
            message.error("Failed to decline request");
            console.error("Error declining request:", error);
        }
    }, [updateRequest, refresh]);

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
                    <Button type="primary" onClick={() => handleApprove(record)}>
                        Approve
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
                        <h2 style={{ margin: 0 }}>Requests List</h2>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={Requests}
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

export default RequestListPage;