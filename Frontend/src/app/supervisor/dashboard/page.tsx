"use client";

import { Row, Col, Card, Button, Divider } from "antd/es";
import { useRouter } from "next/navigation";
// import IncidentList from "@/components/muncipality-components/incidents";
import { useStyles } from "./style/styles";
// import { useIncidentState, useIncidentActions } from "@/providers/incident-provider";
// import { useServiceProviderState, useServiceProviderActions } from "@/providers/serviceProvider-provider";
import { useEffect } from "react";
import SupervisorList from "@/components/list-component/SupervisorList";

const SupervisorDashboard = () => {
    const router = useRouter();
    const { styles } = useStyles();

    // const { incidents } = useIncidentState();
    // const { getIncidentList } = useIncidentActions();


    // const { serviceProviders } = useServiceProviderState();
    // const { getServiceProviderList } = useServiceProviderActions();


    useEffect(() => {
        // getIncidentList();
        // getServiceProviderList();
    }, [""]);


    return (
        <div className={styles.dashboardContainer}>
            <Row gutter={[20, 20,]} className={styles.summaryRow}>
                <Col xs={24} sm={10} md={8}>
                    <Card className={styles.summaryCard}>
                        <h3>Employees</h3>
                        <p className="count">{0}</p>
                        <p>Total Employees</p>
                    </Card>
                </Col>
                <Col xs={24} sm={10} md={8}>
                    <Card className={styles.summaryCard}>
                        <h3>Equipment</h3>
                        <p className="count">{0}</p>
                        <p>Total Equipment</p>
                    </Card>
                </Col>
                <Col xs={24} sm={10} md={8}>
                    <Card className={styles.summaryCard}>
                        <h3>Requests</h3>
                        <p className="count">{0}</p>
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

            <Divider orientation="left">Recent Reports</Divider>
            <Card className={styles.incidentCard}>
                {/* <IncidentList incidents={incidents?.slice(0, 3) || []} /> */}
                <SupervisorList />
            </Card>

        </div>
    );
};

export default SupervisorDashboard;
