"use client";

import React from "react";
import { List, Tag, Typography, Card } from "antd";
import { WarningOutlined, CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { IConditionReport } from "@/providers/condition-report-provider/models";

const { Text, Title } = Typography;

interface Props {
    reports: IConditionReport[];
}

const getPriorityTag = (priority: string) => {
    switch (priority.toLowerCase()) {
        case "urgent":
            return <Tag color="red" icon={<WarningOutlined />}>Urgent</Tag>;
        case "resolved":
            return <Tag color="green" icon={<CheckCircleOutlined />}>Resolved</Tag>;
        default:
            return <Tag color="orange" icon={<ClockCircleOutlined />}>Pending</Tag>;
    }
};

const SupervisorList: React.FC<Props> = ({ reports }) => {
    return (
        <Card bordered={false}>
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
                                    <Text strong>{report.equipmentName}</Text> {getPriorityTag(report.status)}
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
        </Card>
    );
};

export default SupervisorList;