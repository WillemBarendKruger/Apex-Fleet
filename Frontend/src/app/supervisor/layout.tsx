"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ToolOutlined,
    LogoutOutlined,
    HomeOutlined,
    FileTextOutlined,
    WarningOutlined,
    SnippetsOutlined,
    UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Modal, theme, Image } from "antd";
import Title from "antd/es/typography/Title";
import { useStyles } from "./style/styles";

const { Header, Sider, Content } = Layout;

const SupervisorLayout = ({ children }: { children: React.ReactNode }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [loggedInUser, setLoggedInUser] = useState("Guest");

    useEffect(() => {
        const storedData = sessionStorage.getItem("curentUser");
        if (storedData) {
            setLoggedInUser(storedData);
        }
    }, []);


    const [collapsed, setCollapsed] = useState(false);
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);
    const { styles } = useStyles();
    const router = useRouter();
    const pathname = usePathname();

    const getSelectedKey = () => {
        if (pathname.includes("/dashboard")) return "1";
        if (pathname.includes("/equipment")) return "2";
        if (pathname.includes("/employees")) return "3";
        if (pathname.includes("/requests")) return "4";
        if (pathname.includes("/reports")) return "5";
        if (pathname.includes("/settings")) return "6";
        return "1";
    };

    const confirmLogout = () => {
        sessionStorage.clear();
        setLogoutModalVisible(false);
        router.push("/login");
    };

    return (
        <Layout style={{ height: "100vh", overflow: "hidden" }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint="lg"
                collapsedWidth="80"
                onBreakpoint={(broken) => setCollapsed(broken)}
                style={{ position: "relative", height: "100%" }}
            >
                <div className={styles.imageContainer}>
                    <Image
                        src="/Apex-IT-Logo.png"
                        alt="Logo"
                        width={collapsed ? 40 : 70}
                        height={collapsed ? 40 : 70}
                        className={styles.image}
                        preview={false}
                    />
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[getSelectedKey()]}
                    onClick={(info) => {
                        if (info.key === "1") router.push("/supervisor/dashboard");
                        if (info.key === "2") router.push("/supervisor/equipment");
                        if (info.key === "3") router.push("/supervisor/employees");
                        if (info.key === "4") router.push("/supervisor/requests");
                        if (info.key === "5") router.push("/supervisor/reports");
                        if (info.key === "6") router.push("/supervisor/settings");
                    }}
                    items={[
                        { key: "1", icon: <HomeOutlined />, label: "Home" },
                        { key: "2", icon: <FileTextOutlined />, label: "Equipment" },
                        { key: "3", icon: <UsergroupAddOutlined />, label: "Employees" },
                        { key: "4", icon: <SnippetsOutlined />, label: "Requests" },
                        { key: "5", icon: <WarningOutlined />, label: "Reports" },
                        { key: "6", icon: <ToolOutlined />, label: "Settings" },
                    ]}
                />

                <div className={styles.logout}>
                    <Button
                        type="default"
                        danger
                        icon={<LogoutOutlined />}
                        block
                        onClick={() => setLogoutModalVisible(true)}
                        className={styles.logoutBtn}
                    >
                        {!collapsed && "Logout"}
                    </Button>
                </div>
            </Sider>

            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className={styles.toggleButton}
                style={{
                    left: collapsed ? "80px" : "200px",
                    background: colorBgContainer,
                }}
            />

            <Layout>
                <Header className={styles.headerTitle}>
                    <Title level={2} className={styles.title}>
                        Welcome {loggedInUser}
                    </Title>
                </Header>

                <Content className={styles.contentContainer}>
                    <div className={styles.scrollableContent}>{children}</div>
                </Content>
            </Layout>

            <Modal
                open={logoutModalVisible}
                title="Confirm Logout"
                onCancel={() => setLogoutModalVisible(false)}
                onOk={confirmLogout}
                okText="Yes, Logout"
                cancelText="Cancel"
            >
                <p>Are you sure you want to logout?</p>
            </Modal>
        </Layout>
    );
};

export default SupervisorLayout;