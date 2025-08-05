"use client";

import { Row, Col, Card } from "antd";
import { useStyles } from "./style/styles";
import { useEffect, useState } from "react";
import { useEmployeeState, useEmployeeActions } from "@/providers/employee-provider";
import { useEquipmentState, useEquipmentActions } from "@/providers/equipment-provider";
import { useRequestState, useRequestActions } from "@/providers/request-provider";
import { useConditionReportState, useConditionReportActions } from "@/providers/condition-report-provider";
import Loader from "@/components/loader/loader";
import ReportsList from "@/components/list-component/ReportsList";
import QuickActionButton from "@/components/ActionButtons/ActionButtons";
import DashboardSection from "@/components/DashboardSection/DashboardSection";
import SummaryCard from "@/components/SummaryCard/SummaryCard";


const SupervisorDashboard = () => {
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

    const fetchData = async () => {
        setLoading(true);
        await Promise.all([
            getEmployees(),
            getEquipments(),
            getRequests(),
            getConditionReports(),
        ]);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={styles.dashboardContainer}>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Row gutter={[20, 20]} className={styles.summaryRow}>
                        <Col xs={24} sm={10} md={8}>
                            <SummaryCard
                                title="Employees"
                                count={Employees?.length || 0}
                                description="Total Employees"
                                className={styles.summaryCard}
                            />
                        </Col>
                        <Col xs={24} sm={10} md={8}>
                            <SummaryCard
                                title="Equipment"
                                count={Equipments?.length || 0}
                                description="Total Equipment"
                                className={styles.summaryCard}
                            />
                        </Col>
                        <Col xs={24} sm={10} md={8}>
                            <SummaryCard
                                title="Requests"
                                count={Requests?.length || 0}
                                description="Total Requests"
                                className={styles.summaryCard}
                            />
                        </Col>
                    </Row>

                    <DashboardSection title="Quick Actions">
                        <Row gutter={[16, 16]} className={styles.quickActionsRow}>
                            <Col xs={24} sm={8}>
                                <QuickActionButton
                                    label="View all Employees"
                                    route="./employees"
                                    type="primary"
                                    className={styles.quickActionButton}
                                />
                            </Col>
                            <Col xs={24} sm={8}>
                                <QuickActionButton
                                    label="View all Equipment"
                                    route="./equipment"
                                    type="dashed"
                                    className={styles.quickActionButton}
                                />
                            </Col>
                            <Col xs={24} sm={8}>
                                <QuickActionButton
                                    label="View all Requests"
                                    route="./requests"
                                    type="dashed"
                                    className={styles.quickActionButton}
                                />
                            </Col>
                        </Row>
                    </DashboardSection>

                    <DashboardSection title="Recent Condition Reports">
                        <Row gutter={[16, 16]} className={styles.quickActionsRow}>
                            <Col xs={24} md={12}>
                                <ReportsList reports={ConditionReports?.filter(rp => rp.status === "pending").slice(0, 3) || []} /></Col>
                        </Row>
                    </DashboardSection>
                </>
            )}
        </div>
    );
};

export default SupervisorDashboard;