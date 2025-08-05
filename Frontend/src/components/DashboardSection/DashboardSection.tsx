import { Divider } from "antd";
import React from "react";

interface Props {
    title: string;
    children: React.ReactNode;
}

const DashboardSection: React.FC<Props> = ({ title, children }) => (
    <>
        <Divider orientation="left">{title}</Divider>
        {children}
    </>
);

export default DashboardSection;