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
    RobotOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Modal, theme, Image } from "antd";
import Title from "antd/es/typography/Title";
import { useStyles } from "./style/styles";
import Loader from "@/components/loader/loader";
import { useAuthActions } from "@/providers/auth-provider";
import withAuth from "@/HOC/withAuth";

const { Header, Sider, Content } = Layout;

const EmployeeLayout = ({ children }: { children: React.ReactNode }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [loggedInUser, setLoggedInUser] = useState("Unknown User");
    const [loading, setLoading] = useState(false);

    const { logOut } = useAuthActions();

    useEffect(() => {
        setLoading(true);
        const storedData = sessionStorage.getItem("currentUser");
        if (storedData) {
            setLoggedInUser(storedData);
        }
        setLoading(false);
    }, []);

    const [collapsed, setCollapsed] = useState(false);
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);
    const { styles } = useStyles();
    const router = useRouter();
    const pathname = usePathname();

    const getSelectedKey = () => {
        if (pathname.includes("/dashboard")) return "1";
        if (pathname.includes("/equipment")) return "2";
        if (pathname.includes("/settings")) return "3";
        if (pathname.includes("/employee/troubleshoot-ai")) return "4";
        return "1";
    };

    const confirmLogout = () => {
        setLogoutModalVisible(false);
        logOut();
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <Layout style={{ height: "100vh", overflow: "hidden" }}>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={collapsed}
                        breakpoint="lg"
                        collapsedWidth="80"
                        onBreakpoint={(broken) => setCollapsed(broken)}
                        style={{
                            position: "relative", height: "100%", backgroundColor: "#1E1E1E",
                            borderRight: "2px solid #84CC16",
                        }}
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
                            style={{ backgroundColor: "#1E1E1E" }}
                            selectedKeys={[getSelectedKey()]}
                            onClick={(info) => {
                                if (info.key === "1") router.push("/employee/dashboard");
                                if (info.key === "2") router.push("/employee/equipment");
                                if (info.key === "3") router.push("/employee/settings");
                                if (info.key === "") router.push("/employee/troubleshoot-ai");
                            }}
                            items={[
                                {
                                    key: "1",
                                    icon: <HomeOutlined />,
                                    label: "Home",
                                },
                                {
                                    key: "2",
                                    icon: <FileTextOutlined />,
                                    label: "Equipment",
                                },
                                {
                                    key: "3",
                                    icon: <ToolOutlined />,
                                    label: "Settings",
                                },
                                {
                                    key: "",
                                    icon: <RobotOutlined />,
                                    label: "Troubleshoot AI",
                                },
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
                            <Title level={2} className={styles.title} >
                                Welcome {loggedInUser}
                            </Title>
                        </Header>

                        <Content className={styles.contentContainer}>
                            <div className={styles.scrollableContent}>
                                {children}
                            </div>
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
            )}
        </>
    );
};

export default withAuth(EmployeeLayout, { allowedRoles: ["Employee"] });