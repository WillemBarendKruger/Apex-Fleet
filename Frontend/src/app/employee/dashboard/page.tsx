"use client";

import { Row, Col, Card, message } from "antd";
import { useStyles } from "./style/styles";
import { useEffect, useState } from "react";

import { useEquipmentState, useEquipmentActions } from "@/providers/equipment-provider";
import { useConditionReportState, useConditionReportActions } from "@/providers/condition-report-provider";
import { useRequestState, useRequestActions } from "@/providers/request-provider";

import { IConditionReport } from "@/providers/condition-report-provider/models";
import { IEquipment } from "@/providers/equipment-provider/models";
import { IRequest } from "@/providers/request-provider/models";

import Loader from "@/components/loader/loader";
import ReportsList from "@/components/list-component/ReportsList";
import RequestList from "@/components/RequestList/RequestList";

import useUserId from "@/Hooks/books/useUserId";

import QuickActionButton from "@/components/ActionButtons/ActionButtons";
import DashboardSection from "@/components/DashboardSection/DashboardSection";
import SummaryCard from "@/components/SummaryCard/SummaryCard";

const EmployeeDashboard = () => {
    const { styles } = useStyles();

    const { Equipments } = useEquipmentState();
    const { getEquipments } = useEquipmentActions();

    const { ConditionReports } = useConditionReportState();
    const { getConditionReports, deleteConditionReport } = useConditionReportActions();

    const { Requests } = useRequestState();
    const { getRequests, deleteRequest } = useRequestActions();

    const userId = useUserId();
    const [loading, setLoading] = useState(true);

    const refresh = async () => {
        setLoading(true);
        await Promise.all([
            getEquipments(),
            getConditionReports(),
            getRequests(),
        ]);
        setLoading(false);
    };

    useEffect(() => {
        refresh();
    }, []);

    const assignedEquipments: IEquipment[] =
        Equipments?.filter(eq => eq.handlerId === userId) || [];

    const myReports: IConditionReport[] =
        ConditionReports?.filter(rep => rep.reportingEmployeeId === userId) || [];

    const myRequests: IRequest[] =
        Requests?.filter(req => req.requestingEmployeeId === userId) || [];

    const handleDeleteReport = async (id: string) => {
        try {
            await deleteConditionReport(id);
            message.success("Report deleted.");
            refresh();
        } catch {
            message.error("Failed to delete report.");
        }
    };

    const handleDeleteRequest = async (id: string) => {
        try {
            await deleteRequest(id);
            message.success("Request deleted.");
            refresh();
        } catch (error) {
            message.error("Failed to delete request.");
            console.error(error);
        }
    };

    return (
        <div className={styles.dashboardContainer}>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Row gutter={[20, 20]} className={styles.summaryRow}>
                        <Col xs={24} sm={12} md={8}>
                            <SummaryCard
                                title="My Equipment"
                                count={assignedEquipments.length}
                                description="Assigned to you"
                                className={styles.summaryCard}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <SummaryCard
                                title="My Reports"
                                count={myReports.length}
                                description="Submitted condition reports"
                                className={styles.summaryCard}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <SummaryCard
                                title="My Requests"
                                count={myRequests.length}
                                description="Equipment requests made"
                                className={styles.summaryCard}
                            />
                        </Col>
                    </Row>

                    <DashboardSection title="Quick Actions">
                        <Row gutter={[16, 16]} className={styles.quickActionsRow}>
                            <Col xs={24} sm={12}>
                                <QuickActionButton
                                    label="Request Equipment"
                                    route="./equipment"
                                    type="primary"
                                    className={styles.quickActionButton}
                                />
                            </Col>
                            <Col xs={24} sm={12}>
                                <QuickActionButton
                                    label="Report Condition"
                                    route="./equipment"
                                    type="dashed"
                                    className={styles.quickActionButton}
                                />
                            </Col>
                        </Row>
                    </DashboardSection>

                    <DashboardSection title="My Recent Activity">
                        <Row gutter={[16, 16]} className={styles.quickActionsRow}>
                            <Col xs={24} md={12}>
                                <ReportsList reports={myReports.toReversed().slice(0, 3)} onDelete={handleDeleteReport}
                                />
                            </Col>
                            <Col xs={24} md={12}>
                                <RequestList
                                    requests={myRequests
                                        .filter(req => req.status === "declined")
                                        .reverse()
                                        .slice(0, 3)}
                                    onDelete={handleDeleteRequest}

                                />
                            </Col>
                        </Row>
                    </DashboardSection>

                </>
            )}
        </div>
    );
};

export default EmployeeDashboard;