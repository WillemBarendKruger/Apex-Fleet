"use client";

import { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Divider, message } from "antd";
import { ISupervisor } from "@/providers/supervisor-provider/models";
import Loader from "@/components/loader/loader";
import { IEmployee } from "@/providers/employee-provider/models";

interface ProfileFormProps {
    userInfo: ISupervisor | IEmployee | undefined;
    getCurrentUser: () => Promise<void>;
    updateUser: (payload: ISupervisor) => void;
    deleteUser: (id: number) => void;
    redirectAfterDelete?: () => void;
    roleName: string;
}

const ProfileForm = ({
    userInfo,
    updateUser,
    deleteUser,
    redirectAfterDelete,
    roleName,
}: ProfileFormProps) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);

            if (userInfo) {
                form.setFieldsValue({
                    userName: userInfo.userName,
                    name: userInfo.name,
                    surname: userInfo.surname,
                    emailAddress: userInfo.emailAddress,
                });
            }
            setLoading(false);
        };
        fetchUser();
    }, [userInfo]);

    const handleUpdateDetails = async () => {
        try {
            const values = await form.validateFields();
            const payload: ISupervisor = {
                id: parseInt(sessionStorage.getItem("userId") || "0"),
                userName: values.userName,
                name: values.name,
                surname: values.surname,
                emailAddress: values.emailAddress,
                password: values.password,
                roleName: roleName,
            };
            updateUser(payload);
        } catch (error) {
            console.error("Update error:", error);
            message.error("Something went wrong while updating your details.");
        }
    };

    const confirmDelete = async () => {
        try {
            deleteUser(parseInt(sessionStorage.getItem("userId") || "0"));
            sessionStorage.clear();
            redirectAfterDelete?.();
        } catch (error) {
            console.error("Delete error:", error);
            message.error("Something went wrong while deleting your account.");
        }
    };

    if (loading && !userInfo) return <Loader />;

    return (
        <>
            <div style={{ width: "100%", marginBottom: "16px" }}>
                <h2 style={{ margin: 0 }}>Update your profile details</h2>
            </div>

            <Form layout="vertical" form={form} >
                <Form.Item
                    name="userName"
                    label="Username"
                    rules={[{ required: true, message: "Please enter your Username" }]}
                >
                    <Input placeholder="NAME" />
                </Form.Item>

                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: "Please enter your Name" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="surname"
                    label="Surname"
                    rules={[{ required: true, message: "Please enter your Surname" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="emailAddress"
                    label="Email"
                    rules={[
                        { required: true, message: "Please enter email" },
                        { type: "email", message: "Please enter a valid email address" },
                    ]}
                >
                    <Input type="email" />
                </Form.Item>

                <Divider>Change Password</Divider>

                <Form.Item
                    name="password"
                    label="New Password"
                    rules={[
                        { required: true, message: "Please enter Password to confirm it you" },
                        {
                            validator(_, value) {
                                if (!value) return Promise.resolve();
                                const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
                                if (!strongPasswordRegex.test(value)) {
                                    return Promise.reject(
                                        new Error("Password must be at least 6 characters, include uppercase, lowercase, and a number.")
                                    );
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <Input.Password placeholder="Input your current password to update" />
                </Form.Item>

                <Button type="primary" htmlType="submit" block size="large" onClick={handleUpdateDetails}>
                    Confirm Update
                </Button>

                <Divider>Delete your Account?</Divider>
            </Form>

            <Button type="default" danger block size="large" onClick={() => setDeleteModalVisible(true)}>
                Delete Account
            </Button>

            <Modal
                open={deleteModalVisible}
                title="Confirm Delete"
                onCancel={() => setDeleteModalVisible(false)}
                onOk={confirmDelete}
                okText="Yes, Delete"
                cancelText="Cancel"
            >
                <p>Are you sure you want to delete your account and log out?</p>
            </Modal>
        </>
    );
};

export default ProfileForm;