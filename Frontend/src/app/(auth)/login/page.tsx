"use client";

import React, { useState } from "react";
import { useStyles } from "./style/styles";
import Typography from "antd/es/typography";
import { useRouter } from "next/navigation";
import { Button, Divider, Flex, Form, FormProps, Input, Spin, message } from "antd";
import "@ant-design/v5-patch-for-react-19";
import Image from "next/image";
import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    LockOutlined,
    MailOutlined,
} from "@ant-design/icons";
import { useAuthActions } from "@/providers/auth-provider";

type FieldType = {
    email?: string;
    password?: string;
};

const Login = () => {
    const { styles } = useStyles();
    const { Title } = Typography;
    const router = useRouter();
    const { login } = useAuthActions();
    const [loading, setLoading] = useState(false);

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        setLoading(true);
        try {
            const payload = {
                userNameOrEmailAddress: values.email || "",
                password: values.password || "",
                rememberClient: true,
            };
            await login(payload);
            setLoading(false);
            const user = sessionStorage.getItem("role") || "";

            if (user === "Superviser") {
                message.success("Login successfully!");
                router.push("/supervisor/dashboard");
            } else if (user === "Employee") {
                message.success("Login successfully!");
                router.push("/employee/dashboard");
            } else {
                message.success("Could not find user");
                router.push("/login");
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
            message.error("Login failed. Please check your credentials.");
        }
    }


    return (
        <>
            {loading ? (
                <div>
                    <Flex
                        justify="center"
                        align="center"
                        style={{ marginBottom: 20, width: "100%", height: "100vh" }}
                    >
                        <Spin size="large" />
                    </Flex>
                </div>
            ) : (
                <>
                    <div className={styles.splitLeft}>
                        <div className={styles.centered}>
                            <Image
                                src="/AppLogo-TransparentWhite.png"
                                alt="Profile"
                                width={300}
                                height={300}
                            ></Image>
                            <Title> Welcome to Potholio</Title>
                            <h2 className={styles.subHeading}>
                                Help make the roads safer by a simple tap of a button
                            </h2>
                        </div>
                    </div>
                    <div className={styles.splitRight}>
                        <div className={styles.page}>
                            <div className={styles.mobileLogo}>
                                <Image
                                    src="/AppLogo-Small.png"
                                    alt="Potholio Logo"
                                    width={200}
                                    height={200}
                                    className={styles.logoImage}
                                />
                            </div>
                            <div className={styles.form}>
                                <Form
                                    name="login"
                                    initialValues={{ remember: true }}
                                    className={styles.formContent}
                                    onFinish={onFinish}
                                >
                                    <h2 className={styles.heading}>Login</h2>
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            { required: true, message: "Please input your Email!" },
                                        ]}
                                    >
                                        <Input
                                            size="large"
                                            placeholder="Email or Username"
                                            prefix={<MailOutlined />}
                                            className={styles.input}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input your Password!",
                                            },
                                        ]}
                                    >
                                        <Input.Password
                                            className={styles.input}
                                            size="large"
                                            placeholder="Password"
                                            prefix={<LockOutlined />}
                                            iconRender={(visible) =>
                                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                            }
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            block
                                            type="primary"
                                            htmlType="submit"
                                            style={{
                                                width: "300px",
                                                fontWeight: "bold",
                                            }}
                                            size="large"
                                        >
                                            Log in
                                        </Button>
                                    </Form.Item>
                                    <Divider plain>
                                        Don&#39;t have an account?
                                        <a href="/register" className={styles.link}>
                                            {" "}
                                            Register
                                        </a>
                                    </Divider>
                                </Form>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Login;
