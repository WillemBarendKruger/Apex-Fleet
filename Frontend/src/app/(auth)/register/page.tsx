"use client";

import React, { useState } from "react";
import "@ant-design/v5-patch-for-react-19";
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
import { Form, Input, Button, FormProps, message } from "antd/es";
import { useAuthActions } from "@/providers/auth-provider";
import Link from "next/link";
import Loader from "@/components/loader/loader";
import { ISupervisor } from "@/providers/supervisor-provider/models";

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
            if (values.accessToken !== "Apex Supervisor321") {
                message.error("You don't have permission to access register");
                setLoading(false);
                return;
            }

            const payload: ISupervisor = {
                emailAddress: values.emailAddress,
                password: values.password,
                roleName: "Supervisor",
                userName: values.userName,
                name: values.name,
                surname: values.surname,
            };

            await register(payload);
            router.replace("/login");
        } catch (error) {
            console.error(error);
            message.error("Register failed. Please try again.");
        } finally {
            setLoading(false);
        }
        setLoading(false);
        return router.push("/login");
    };

    return (
        <>
            {loading ? (
                <div>
                    <Loader />
                </div>
            ) : (
                <>
                    <div className={styles.splitLeft}>
                        <div className={styles.centered}>
                            <Image
                                src="/ApexIT-Green.png"
                                alt="Profile"
                                width={300}
                                height={300}
                            />
                            <Title>To Get Started, please register to Apex IT.</Title>
                        </div>
                    </div>

                    <div className={styles.splitRight}>
                        <div className={styles.Right}>
                            <div className={styles.page}>
                                <div className={styles.mobileLogo}>
                                    <Image
                                        src="/ApexIT-Green.png"
                                        alt="APexIT Logo"
                                        width={300}
                                        height={300}
                                        className={styles.logoImage}
                                    />
                                </div>
                                <div className={styles.form}>
                                    <Form
                                        form={form}
                                        name="register"
                                        className={styles.formContent}
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
                                                    message: "Please input your Password!",
                                                },
                                                {
                                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                                    min: 6,
                                                    message:
                                                        "Wrong password requirments",
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
                                                size="large"
                                                loading={loading}
                                            >
                                                Register
                                            </Button>
                                        </Form.Item>
                                        <Link href="/login" className={styles.loginButton}>
                                            <Button
                                                type="default"
                                                block
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
