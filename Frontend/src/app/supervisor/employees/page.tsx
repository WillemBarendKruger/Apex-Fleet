"use client";

import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Space, message } from "antd";
import { useStyles } from "./style/styles";
import { IEmployee } from "@/providers/employee-provider/models";
import Loader from "@/components/loader/loader";
import { useAuthActions } from "@/providers/auth-provider";
import { useEmployeeState, useEmployeeActions } from "@/providers/employee-provider";
import { useEquipmentState, useEquipmentActions } from "@/providers/equipment-provider"

const EmployeesPage = () => {
  const { styles } = useStyles();
  const { Employees } = useEmployeeState();
  const { Equipments } = useEquipmentState();
  const { registerEmployee } = useAuthActions();
  const { getEmployees } = useEmployeeActions();
  const { getEquipments } = useEquipmentActions();

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(null);
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  const refresh = async () => {
    await getEmployees();
    await getEquipments();

  }

  useEffect(() => {
    // Fetch logic if needed
    refresh();
  }, []);

  const handleAddEmployee = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();

      const payload: IEmployee = {
        name: values.name,
        surname: values.surname,
        userName: values.userName,
        emailAddress: values.email,
        password: values.password,
        roleName: "Employee",
      };

      await registerEmployee(payload);
      setModalVisible(false);
      form.resetFields();
      message.success(`Added employee ${values.name}`);
      await refresh();
    } catch (error) {
      console.error("Error adding employee:", error);
      message.error("Failed to add employee");
    }
    setLoading(false);
  };

  const enrichedEmployees = Employees?.map((employee) => {
    const equipmentOwned = Equipments?.filter(
      (eq) => eq.handlerId === employee.id
    ) || [];

    return {
      ...employee,
      equipmentCount: equipmentOwned.length,
    };
  });

  const employeeEquipments = Equipments?.filter(
    (eq) => eq.handlerId === selectedEmployee?.id
  ) || [];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Email",
      dataIndex: "emailAddress",
      key: "email",
    },
    {
      title: "Equipment in Possession",
      dataIndex: "equipmentCount",
      key: "equipment",
    },
    {
      title: "Profile View",
      key: "view",
      render: (_: IEmployee, record: IEmployee) => (
        <Button
          type="link"
          onClick={() => {
            setSelectedEmployee(record);
            setProfileModalVisible(true);
          }}
        >
          View Profile
        </Button>
      ),
    }
  ];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.serviceProviderContainer}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <h2 style={{ margin: 0 }}>Employee List</h2>
            <Button type="primary" onClick={() => setModalVisible(true)}>
              Add Employee
            </Button>
          </div>


          <Modal
            title="Employee Profile"
            open={profileModalVisible}
            onCancel={() => setProfileModalVisible(false)}
            footer={[
              <Button key="close" onClick={() => setProfileModalVisible(false)}>
                Close
              </Button>,
            ]}
          >
            {selectedEmployee ? (
              <div>
                <p><strong>Name:</strong> {selectedEmployee.name} {selectedEmployee.surname}</p>
                <p><strong>Email:</strong> {selectedEmployee.emailAddress}</p>
                <p><strong>Username:</strong> {selectedEmployee.userName}</p>
                <p><strong>Equipment Count:</strong> {selectedEmployee.equipmentCount}</p>
                <p><strong>Equipment:</strong></p>
                <ul>
                  {employeeEquipments.map((eq) => (
                    <li key={eq.id}>{eq.name}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No employee selected.</p>
            )}
          </Modal>

          <Table
            columns={columns}
            dataSource={enrichedEmployees}
            className={styles.serviceProviderTable}
            rowKey={(record) => record.userName}
            pagination={{ pageSize: 5 }}
            scroll={{ x: "max-content" }}
          />

          <Modal
            title="Add Employee"
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={
              <Space>
                <Button onClick={() => setModalVisible(false)}>Cancel</Button>
                <Button type="primary" onClick={handleAddEmployee}>
                  Add
                </Button>
              </Space>
            }
          >
            <Form form={form} layout="vertical">
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="surname"
                label="Surname"
                rules={[{ required: true, message: "Please enter your surname" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="userName"
                label="Username"
                rules={[{ required: true, message: "Please enter your username" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Please enter email" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Please enter the password" }]}
              >
                <Input.Password />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      )}
    </>
  );
};

export default EmployeesPage;