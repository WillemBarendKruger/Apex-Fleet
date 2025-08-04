"use client";

import { Row, Col, Card, Button, Divider, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useStyles } from "./style/styles";
import { useEffect, useState } from "react";
import SupervisorList from "@/components/list-component/SupervisorList";
import { useEmployeeState, useEmployeeActions } from "@/providers/employee-provider";
import { useEquipmentState, useEquipmentActions } from "@/providers/equipment-provider";
import { useRequestState, useRequestActions } from "@/providers/request-provider";
import { useConditionReportState, useConditionReportActions } from "@/providers/condition-report-provider";

const SupervisorDashboard = () => {
    const router = useRouter();
    const { styles } = useStyles();

    const { Employees } = useEmployeeState();
    const { Equipments } = useEquipmentState();
    const { Requests } = useRequestState();
    const { ConditionReports } = useConditionReportState();

    const { getEmployees } = useEmployeeActions();
    const { getEquipments } = useEquipmentActions();
    const { getRequests } = useRequestActions();
    const { getConditionReports } = useConditionReportActions();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([
                getEmployees(),
                getEquipments(),
                getRequests(),
                getConditionReports(),
            ]);
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div className={styles.dashboardContainer}>
            {loading ? (
                <Spin size="large" />
            ) : (
                <>
                    <Row gutter={[20, 20]} className={styles.summaryRow}>
                        <Col xs={24} sm={10} md={8}>
                            <Card className={styles.summaryCard}>
                                <h3>Employees</h3>
                                <p className="count">{Employees?.length || 0}</p>
                                <p>Total Employees</p>
                            </Card>
                        </Col>
                        <Col xs={24} sm={10} md={8}>
                            <Card className={styles.summaryCard}>
                                <h3>Equipment</h3>
                                <p className="count">{Equipments?.length || 0}</p>
                                <p>Total Equipment</p>
                            </Card>
                        </Col>
                        <Col xs={24} sm={10} md={8}>
                            <Card className={styles.summaryCard}>
                                <h3>Requests</h3>
                                <p className="count">{Requests?.length || 0}</p>
                                <p>Total Requests</p>
                            </Card>
                        </Col>
                    </Row>

                    <Divider orientation="left">Quick Actions</Divider>
                    <Row gutter={[16, 16]} className={styles.quickActionsRow}>
                        <Col xs={24} sm={8}>
                            <Button
                                type="primary"
                                size="large"
                                block
                                className={styles.quickActionButton}
                                onClick={() => router.push("./employees")}
                            >
                                View all Employees
                            </Button>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Button
                                type="dashed"
                                size="large"
                                block
                                className={styles.quickActionButton}
                                onClick={() => router.push("./equipment")}
                            >
                                View all Equipment
                            </Button>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Button
                                type="dashed"
                                size="large"
                                block
                                className={styles.quickActionButton}
                                onClick={() => router.push("./requests")}
                            >
                                View all Requests
                            </Button>
                        </Col>
                    </Row>

                    <Divider orientation="left">Recent Condition Reports</Divider>
                    <Card className={styles.incidentCard}>
                        <SupervisorList reports={ConditionReports?.slice(0, 3) || []} />
                    </Card>
                </>
            )}
        </div>
    );
};

export default SupervisorDashboard;