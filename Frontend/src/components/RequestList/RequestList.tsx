import React from "react";
import { Card, List, Tag, Typography } from "antd";
import { IRequest } from "@/providers/request-provider/models";
import Title from "antd/es/typography/Title";

const { Text } = Typography;

interface Props {
    requests: IRequest[];
}

const RequestList: React.FC<Props> = ({ requests }) => (
    <Card>
        <Title level={4}>Recent Equipment Requests</Title>
        <List
            itemLayout="vertical"
            dataSource={requests}
            renderItem={item => (
                <List.Item>
                    <Text strong>{item.equipmentName}</Text>
                    <br />
                    <Tag color={item.status === "declined" ? "red" : item.status === "approved" ? "green" : "blue"}>
                        {item.status}
                    </Tag>
                    {item.status === "declined" && item.description && (
                        <Text type="danger"> — {item.description}</Text>
                    )}
                </List.Item>
            )}
        />
    </Card>
);

export default RequestList;