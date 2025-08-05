import { Card } from "antd";
import React from "react";

interface Props {
    title: string;
    count: number;
    description: string;
    className?: string;
}

const SummaryCard: React.FC<Props> = ({ title, count, description, className }) => (
    <Card className={className}>
        <h3>{title}</h3>
        <p className="count">{count}</p>
        <p>{description}</p>
    </Card>
);

export default SummaryCard;