import React, { useState } from "react";
import { Card, List, Tag, Typography, Space, Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { IRequest } from "@/providers/request-provider/models";
import Title from "antd/es/typography/Title";

const { Text } = Typography;

interface Props {
    requests: IRequest[] | undefined;
    onDelete?: (id: string) => void;
}

const RequestList: React.FC<Props> = ({ requests = [], onDelete }) => {
    const [localRequests, setLocalRequests] = useState<IRequest[]>(requests);

    const handleDelete = (id: string) => {
        const updated = localRequests.filter((req) => req.id !== id);
        setLocalRequests(updated);
        onDelete?.(id);
        message.success("Declined request removed.");
    };

    return (
        <Card>
            <Title level={4}>Recent Equipment Requests</Title>
            <List
                itemLayout="vertical"
                dataSource={localRequests}
                renderItem={(item) => (
                    <List.Item>
                        <Space direction="vertical" style={{ width: "100%" }}>
                            <Text strong>{item.equipmentName}</Text>
                            <Tag
                                style={{ background: "transparent" }}
                                color={
                                    item.status === "declined" ? "red" : "orange"
                                }
                            >
                                {item.status}
                            </Tag>
                            {item.status === "declined" && item.description && (
                                <Text type="danger">— {item.description}</Text>
                            )}

                            {item.status === "declined" && (
                                <Space>
                                    <Popconfirm
                                        title="Are you sure you want to delete this request?"
                                        onConfirm={() => handleDelete(item.id ?? "")}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            type="text"
                                            icon={<DeleteOutlined />}
                                            danger
                                        />
                                    </Popconfirm>
                                </Space>
                            )}
                        </Space>
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default RequestList;