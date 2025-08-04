"use client";

import React, { useState } from "react";
import { useStyles } from "./style/styles";
import Typography from "antd/es/typography";
import { Button, Divider, Form, FormProps, Input, message } from "antd";
import "@ant-design/v5-patch-for-react-19";
import Image from "next/image";
import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    LockOutlined,
    MailOutlined,
} from "@ant-design/icons";
import { useAuthActions } from "@/providers/auth-provider";
import Loader from "@/components/loader/loader";

type FieldType = {
    email?: string;
    password?: string;
};

const Login = () => {
    const { styles } = useStyles();
    const { Title } = Typography;
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
                    <Loader />
                </div>
            ) : (
                <>
                    <div className={styles.splitLeft}>
                        <div className={styles.Left}>
                            <div className={styles.page}>
                                <div className={styles.mobileLogo}>
                                    <Image
                                        src="/Apex-IT-Logo.png"
                                        alt="Potholio Logo"
                                        width={300}
                                        height={300}
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
                                                {
                                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                                    min: 6,
                                                    message:
                                                        "Wrong password requirments",
                                                },
                                            ]}
                                            style={{
                                                width: "300px",
                                            }}
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
                    </div>
                    <div className={styles.splitRight}>
                        <div className={styles.centered}>
                            <Image
                                src="/Apex-IT-Logo-orange.png"
                                alt="Profile"
                                width={300}
                                height={300}
                            ></Image>
                            <Title> Welcome to Apex IT</Title>
                            <h2 className={styles.subHeading}>
                                Never Lose Track of What Keeps You Working.
                            </h2>
                        </div>
                    </div>
                </>
            )
            }
        </>
    );
};

export default Login;
