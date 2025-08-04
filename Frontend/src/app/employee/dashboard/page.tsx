"use client";

import { useEffect, useState } from "react";
import { Row, Col, Card, Button, Divider, Typography, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useStyles } from "./style/styles";
import { useEquipmentState, useEquipmentActions } from "@/providers/equipment-provider";
import { useConditionReportState, useConditionReportActions } from "@/providers/condition-report-provider";
import { useEmployeeState } from "@/providers/employee-provider";
import { IConditionReport } from "@/providers/condition-report-provider/models";
import { IEquipment } from "@/providers/equipment-provider/models";
import SupervisorList from "@/components/list-component/SupervisorList";

const { Title, Text } = Typography;

const EmployeeDashboard = () => {
    const router = useRouter();
    const { styles } = useStyles();

    const { Equipments } = useEquipmentState();
    const { getEquipments } = useEquipmentActions();

    const { ConditionReports } = useConditionReportState();
    const { getConditionReports } = useConditionReportActions();

    const { Employees } = useEmployeeState();

    const [userId, setUserId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedId = sessionStorage.getItem("userId");
        if (storedId && !isNaN(parseInt(storedId))) {
            setUserId(parseInt(storedId));
        }

        const fetchData = async () => {
            await Promise.all([getEquipments(), getConditionReports()]);
            setLoading(false);
        };

        fetchData();
    }, []);

    const assignedEquipments: IEquipment[] =
        Equipments?.filter(eq => eq.handlerId === userId) || [];

    const myReports: IConditionReport[] =
        ConditionReports?.filter(rep => rep.reportingEmployeeId === userId) || [];

    return (
        <div className={styles.dashboardContainer}>
            {loading ? (
                <Spin size="large" />
            ) : (
                <>
                    <Row gutter={[20, 20]} className={styles.summaryRow}>
                        <Col xs={24} sm={12} md={8}>
                            <Card className={styles.summaryCard}>
                                <Title level={4}>My Equipment</Title>
                                <Text className="count">{assignedEquipments.length}</Text>
                                <p>Assigned to you</p>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Card className={styles.summaryCard}>
                                <Title level={4}>My Reports</Title>
                                <Text className="count">{myReports.length}</Text>
                                <p>Submitted condition reports</p>
                            </Card>
                        </Col>
                    </Row>

                    <Divider orientation="left">Quick Actions</Divider>
                    <Row gutter={[16, 16]} className={styles.quickActionsRow}>
                        <Col xs={24} sm={12}>
                            <Button
                                type="primary"
                                block
                                size="large"
                                className={styles.quickActionButton}
                                onClick={() => router.push("./equipment")}
                            >
                                Request Equipment
                            </Button>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Button
                                type="dashed"
                                block
                                size="large"
                                className={styles.quickActionButton}
                                onClick={() => router.push("./equipment")}
                            >
                                Report Condition
                            </Button>
                        </Col>
                    </Row>

                    <Divider orientation="left">My Recent Reports</Divider>
                    <Card className={styles.incidentCard}>
                        <SupervisorList reports={myReports.slice(0, 3)} />
                    </Card>
                </>
            )}
        </div>
    );
};

export default EmployeeDashboard;