import React from "react";
import { List, Tag, Typography, Card, Button, Popconfirm, Space } from "antd";
import { WarningOutlined, CheckCircleOutlined, ClockCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { IConditionReport } from "@/providers/condition-report-provider/models";

const { Text, Title } = Typography;

interface Props {
    reports: IConditionReport[];
    onDelete?: (id: string) => void;
}

const getPriorityTag = (status: string) => {
    switch (status.toLowerCase()) {
        case "declined":
            return <Tag color="red" style={{ background: "transparent" }} icon={<WarningOutlined />}>{status}</Tag>;
        case "maintenance":
            return <Tag color="orange" style={{ background: "transparent" }} icon={<CheckCircleOutlined />}>{status}</Tag>;
        default:
            return <Tag color="orange" style={{ background: "transparent" }} icon={<ClockCircleOutlined />}>{status}</Tag>;
    }
};

const ReportsList: React.FC<Props> = ({ reports, onDelete }) => {
    return (
        <Card>
            <Title level={4}>Recent Equipment Condition Reports</Title>
            <List
                itemLayout="vertical"
                dataSource={reports}
                locale={{ emptyText: "No recent reports found." }}
                renderItem={(report) => (
                    <List.Item key={report.id}>
                        <List.Item.Meta
                            title={
                                <Space>
                                    <Text strong>{report.equipmentName}</Text>
                                    {getPriorityTag(report.status)}
                                </Space>
                            }
                            description={
                                <>
                                    <Text type="secondary">Reported by: {report.reportingEmployeeEmail}</Text>
                                    <br />
                                    <Text>{report.description}</Text>
                                </>
                            }
                        />
                        {report.status === "declined" && onDelete && (
                            <Popconfirm
                                title="Delete this declined report?"
                                onConfirm={() => onDelete(report.id ?? "")}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    type="text"
                                    icon={<DeleteOutlined />}
                                    danger
                                />
                            </Popconfirm>
                        )}
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default ReportsList;