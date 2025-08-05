"use client";

import React from "react";
import { List, Tag, Typography, Card } from "antd";
import { WarningOutlined, CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { IConditionReport } from "@/providers/condition-report-provider/models";

const { Text, Title } = Typography;

interface Props {
    reports: IConditionReport[];
}

const getPriorityTag = (status: string) => {
    switch (status.toLowerCase()) {
        case "declined":
            return <Tag color="red" icon={<WarningOutlined />}>{status}</Tag>;
        case "maintenance":
            return <Tag color="green" icon={<CheckCircleOutlined />}>{status}</Tag>;
        default:
            return <Tag color="orange" icon={<ClockCircleOutlined />}>{status}</Tag>;
    }
};

const ReportsList: React.FC<Props> = ({ reports }) => {
    return (
        <Card >
            <Title level={4}>Recent Equipment Condition Reports</Title>
            <List
                itemLayout="vertical"
                dataSource={reports}
                locale={{ emptyText: "No recent reports found." }}
                renderItem={(report) => (
                    <List.Item key={report.equipmentId}>
                        <List.Item.Meta
                            title={
                                <>
                                    <Text strong>{report.equipmentName}</Text>  {getPriorityTag(report.status)}
                                </>
                            }
                            description={
                                <>
                                    <Text type="secondary">Reported by: {report.reportingEmployeeEmail}</Text>
                                    <br />
                                    <Text>{report.description}</Text>
                                </>
                            }
                        />
                    </List.Item>
                )}
            />
        </Card >
    );
};

export default ReportsList;