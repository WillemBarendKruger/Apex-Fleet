"use client";

import { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Divider, message } from "antd/es";

import { useStyles } from "./style/styles";
import { useRouter } from "next/navigation";
import { IEmployee } from "@/providers/employee-provider/models";
import { useEmployeeActions } from "@/providers/employee-provider";
import { useEquipmentActions, useEquipmentState } from "@/providers/equipment-provider";
import "@ant-design/v5-patch-for-react-19";
import { useAuthActions, useAuthState } from "@/providers/auth-provider";

const SettingsPage = () => {
  const { styles } = useStyles();
  const router = useRouter();
  const { getEquipments, } = useEquipmentActions();
  const { getCurrentUser } = useAuthActions();
  const { updateEmployee, deleteEmployee } = useEmployeeActions();
  const { user } = useAuthState()
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleUpdateDetails = async () => {
    try {
      const values = await form.validateFields();
      const payload: IEmployee = {
        id: parseInt(sessionStorage.getItem("userId") || "0"),
        userName: values.userName,
        name: values.name,
        surname: values.surname,
        emailAddress: values.emailAddress,
        password: values.password || user?.password || "",
        roleName: values.roleNames,
        isActive: true,
      };
      await updateEmployee(payload);

      message.success("Profile updated successfullys!");
    } catch (error) {
      console.error("Update error:", error);
      message.error("Something went wrong while updating your details.");
    }
  };

  const confirmDelete = () => {
    try {
      // getCitizen(sessionStorage.getItem("userId") || "");
      deleteEmployee(parseInt(sessionStorage.getItem("userId") || "0"));
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
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "start",
          marginBottom: "16px",
        }}
      >
        <h2 style={{ margin: 0 }}>Update your profile details</h2>
      </div>
      <div style={{ width: "100%" }}>
        <Form layout="vertical" form={form}>
          <Form.Item
            name="userName"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please enter your Username",
              },
            ]}
          >
            <Input placeholder={user?.userName} />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter your Name" }]}
          >
            <Input placeholder={user?.name} />
          </Form.Item>
          <Form.Item
            name="surname"
            label="Surname"
            rules={[{ required: true, message: "Please enter your Surname" }]}
          >
            <Input placeholder={user?.surname} />
          </Form.Item>
          <Form.Item
            name="emailAddress"
            label="Email"
            rules={[{ required: true, message: "Please enter your Email" }]}
          >
            <Input placeholder={user?.emailAddress} />
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
          htmlType="submit"
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
          <p>Are you sure you want to delete your account and Log Out?</p>
        </Modal>
      </div>
    </div>
  );
};

export default SettingsPage;
