"use client";

import { Row, Col, Card, Button, Divider } from "antd/es";
import { useRouter } from "next/navigation";
// import IncidentList from "@/components/muncipality-components/incidents";
import { useStyles } from "./style/styles";
import { useEquipmentActions, useEquipmentState } from "@/providers/equipment-provider";
// import { useServiceProviderState, useServiceProviderActions } from "@/providers/serviceProvider-provider";
import { useEffect } from "react";
import SupervisorList from "@/components/list-component/SupervisorList";

const SupervisorDashboard = () => {
    const router = useRouter();
    const { styles } = useStyles();

    useEffect(() => {
        // getIncidentList();
        // getServiceProviderList();
    }, []);


    return (
        <div className={styles.dashboardContainer}>
            <Row gutter={[20, 20,]} className={styles.summaryRow}>
                <Col xs={24} sm={10} md={8}>
                    <Card className={styles.summaryCard}>
                        <h3>Equipment</h3>
                        <p className="count">{0}</p>
                        <p>Total Equipment</p>
                    </Card>
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
