"use client";

import React, { useState } from "react";
import "@ant-design/v5-patch-for-react-19";
// import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStyles } from "./style/styles";
import Image from "next/image";
import Typography from "antd/es/typography";
import {
    UserOutlined,
    MailOutlined,
    LockOutlined,
    EyeTwoTone,
    EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, FormProps, message, Flex, Spin } from "antd/es";
import { useAuthActions } from "@/providers/auth-provider";
import Link from "next/link";

type FieldType = {
    accessToken?: string;
    emailAddress: string;
    password: string;
    name: string;
    surname: string;
    userName: string;
};

const RegistrationForm = () => {
    const router = useRouter();
    const { styles } = useStyles();
    const [form] = Form.useForm();
    const { Title } = Typography;
    const [loading, setLoading] = useState(false);
    const { register } = useAuthActions();

    const handleRegister: FormProps<FieldType>["onFinish"] = async (values) => {
        setLoading(true);
        try {
            let payload = {
                emailAddress: "",
                password: "null",
                roleName: "",
                userName: "",
                name: "",
                surname: "",
            };
            if (values.accessToken === "Apex Supervisor321") {
                payload = {
                    emailAddress: values.emailAddress,
                    password: values.password,
                    roleName: "Supervisor",
                    userName: values.userName,
                    name: values.name,
                    surname: values.surname,
                };
            }
            else {
                message.error("You dont't have permission to access register")
            }
            await register(payload);
            message.success("Registered successfully!");
            router.replace("/login");
        } catch (error) {
            console.error(error);
            message.error("Register failed. Please try again.");
        }
        setLoading(false);
        return router.push("/login");
    };

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
                                src="/Apex-IT-Logo-orange.png"
                                alt="Profile"
                                width={300}
                                height={300}
                            ></Image>
                            <Title>To Get Started, please register to Apex IT.</Title>
                        </div>
                    </div>

                    <div className={styles.splitRight}>
                        <div className={styles.Right}>
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
                                        form={form}
                                        name="register"
                                        onFinish={handleRegister}
                                        scrollToFirstError
                                    >
                                        <h1 className={styles.heading}>Register</h1>
                                        <Form.Item
                                            name="accessToken"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input your Access Token!",
                                                },
                                            ]}
                                        >
                                            <Input.Password
                                                size="large"
                                                placeholder="Access Token"
                                                prefix={<LockOutlined />}
                                                className={styles.input}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="emailAddress"
                                            rules={[
                                                {
                                                    type: "email",
                                                    message: "The input is not valid E-mail!",
                                                },
                                                {
                                                    required: true,
                                                    message: "Please input your E-mail!",
                                                },
                                            ]}
                                        >
                                            <Input
                                                size="large"
                                                placeholder="Email"
                                                prefix={<MailOutlined />}
                                                className={styles.input}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input your password!",
                                                },
                                                {

                                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                                    message: "Password must include at least 6 characters, uppercase, lowercase, number, and special character!",
                                                },
                                            ]}
                                            hasFeedback
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
                                        <Form.Item
                                            name="userName"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input your username!",
                                                },
                                            ]}
                                        >
                                            <Input
                                                size="large"
                                                placeholder="Username"
                                                prefix={<UserOutlined />}
                                                className={styles.input}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input your First Name!",
                                                },
                                            ]}
                                        >
                                            <Input
                                                size="large"
                                                placeholder="First Name"
                                                prefix={<UserOutlined />}
                                                className={styles.input}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="surname"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input your Last Name!",
                                                },
                                            ]}
                                        >
                                            <Input
                                                size="large"
                                                placeholder="Last Name"
                                                prefix={<UserOutlined />}
                                                className={styles.input}
                                            />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button
                                                className={styles.registerBtn}
                                                type="primary"
                                                htmlType="submit"
                                                block
                                                style={{ width: "300px" }}
                                                size="large"
                                            >
                                                Register
                                            </Button>
                                        </Form.Item>
                                        <Link href="/login" className={styles.loginBtn}>
                                            <Button
                                                type="default"
                                                block
                                                style={{ width: "300px" }}
                                                size="large"

                                            >
                                                Back to Login
                                            </Button>
                                        </Link>
                                    </Form>

                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default RegistrationForm;
