"use client";

import { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Divider, message } from "antd";
import { useStyles } from "./style/styles";
import { useRouter } from "next/navigation";

import { ISupervisor } from "@/providers/supervisor-provider/models";
import { useSupervisorActions } from "@/providers/supervisor-provider";
import { useAuthActions, useAuthState } from "@/providers/auth-provider";

import "@ant-design/v5-patch-for-react-19";

const SettingsPage = () => {
  const { styles } = useStyles();
  const router = useRouter();

  const { getCurrentUser } = useAuthActions();
  const { updateSupervisor, deleteSupervisor } = useSupervisorActions();
  const { user } = useAuthState();

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchUser = async () => {
    getCurrentUser();

    if (user) {
      form.setFieldsValue({
        userName: user.userName,
        name: user.name,
        surname: user.surname,
        emailAddress: user.emailAddress,
        roleNames: "Employee",
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
        roleName: "Supervisor",
      };
      };

      updateSupervisor(payload);
      message.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      message.error("Something went wrong while updating your details.");
    }
  };

  const confirmDelete = async () => {
    try {
      deleteSupervisor(parseInt(sessionStorage.getItem("userId") || "0"));
      message.success("Account deleted successfully!");
      sessionStorage.clear();
      router.push("/login");
    } catch (error) {
      console.error("Delete error:", error);
      message.error("Something went wrong while deleting your account.");
    }
  };

  return (
    <div className={styles.updateContainer}>
      <div style={{ width: "100%", display: "flex", justifyContent: "start", marginBottom: "16px" }}>
        <h2 style={{ margin: 0 }}>Update your profile details</h2>
      </div>

      <div style={{ width: "100%" }}>
        <Form layout="vertical" form={form}>
          <Form.Item
            name="userName"
            label="Username"
            rules={[{ required: true, message: "Please enter your Username" }]}
          >
            <Input />
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
              {
                validator(_, value) {
                  if (!value) {
                    return Promise.resolve(); // Allow empty (optional field)
                  }

                  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
                  if (!strongPasswordRegex.test(value)) {
                    return Promise.reject(
                      new Error("Password must be at least 6 characters, include uppercase, lowercase, and a number.")
                    );
                  }

                  return Promise.resolve();
                }

              },
            ]}
          >
            <Input.Password placeholder="Input your current password to update" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            onClick={handleUpdateDetails}
          >
            Confirm Update
          </Button>

          <Divider>Delete your Account?</Divider>
        </Form>

        <Button
          type="default"
          danger
          block
          size="large"
          onClick={() => setDeleteModalVisible(true)}
        >
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
      </div>
    </div>
  );
};

export default SettingsPage;
