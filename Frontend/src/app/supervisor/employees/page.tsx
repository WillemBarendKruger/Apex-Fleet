"use client";

import { useEffect, useMemo, useState } from "react";
import { Table, Button, Modal, Form, Input, Space, message, Card } from "antd";
import { useStyles } from "./style/styles";
import { IEmployee } from "@/providers/employee-provider/models";
import { useAuthActions } from "@/providers/auth-provider";
import { useEmployeeState, useEmployeeActions } from "@/providers/employee-provider";
import { useEquipmentState, useEquipmentActions } from "@/providers/equipment-provider"
import Search from "antd/es/input/Search";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState<IEmployee[]>([]);

  const refresh = async () => {
    setLoading(true);
    await getEmployees();
    await getEquipments();
    setLoading(false);

  }

  useEffect(() => {
    refresh();
    setFilteredEmployees(enrichedEmployees);
  }, []);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

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

  const enrichedEmployees = useMemo(() => {
    return Employees?.map((employee) => {
      const equipmentOwned = Equipments?.filter(
        (eq) => eq.handlerId === employee.id
      ) || [];

      return {
        ...employee,
        equipmentCount: equipmentOwned.length,
      };
    }) ?? [];
  }, [Employees, Equipments]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);

    const lowerTerm = term.toLowerCase();

    const results = enrichedEmployees.filter((item: IEmployee) =>
      [item.name, item.emailAddress, item.userName, item.surname]
        .filter(Boolean)
        .some((field) =>
          field.toLowerCase().includes(lowerTerm)
        )
    );

    setFilteredEmployees(results);
  };


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
    <div className={styles.EmployeesContainer}>
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
        title={<Title level={4} style={{ marginBottom: 0, padding: 10 }}>Employee Profile</Title>}
        open={profileModalVisible}
        onCancel={() => setProfileModalVisible(false)}
        footer={[
          <Button
            key="close"
            onClick={() => setProfileModalVisible(false)}
            className={styles.CloseBtn}
          >
            Close
          </Button>,
        ]}
        bodyStyle={{
          backgroundColor: "#2C2C2C",
          color: "#E5E7EB",
          borderRadius: "8px",
          padding: "24px",
        }}
      >
        {selectedEmployee ? (
          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#1F1F1F",
              color: "#E5E7EB",
              borderRadius: "6px",
              overflow: "hidden",
            }}>
              <tbody>
                <tr>
                  <td className={styles.cellStyle}><strong>Name</strong></td>
                  <td className={styles.cellStyle}>{selectedEmployee.name} {selectedEmployee.surname}</td>
                </tr>
                <tr>
                  <td className={styles.cellStyle}><strong>Email</strong></td>
                  <td className={styles.cellStyle}>{selectedEmployee.emailAddress}</td>
                </tr>
                <tr>
                  <td className={styles.cellStyle}><strong>Username</strong></td>
                  <td className={styles.cellStyle}>{selectedEmployee.userName}</td>
                </tr>
                <tr>
                  <td className={styles.cellStyle}><strong>Equipment Count</strong></td>
                  <td className={styles.cellStyle}>{selectedEmployee.equipmentCount}</td>
                </tr>
                <tr>
                  <td className={styles.cellStyle}><strong>Equipment</strong></td>
                  <td className={styles.cellStyle}>
                    {employeeEquipments.length > 0 ? (
                      <ul style={{ paddingLeft: "16px", margin: 0 }}>
                        {employeeEquipments.map((eq) => (
                          <li key={eq.id} style={{ color: "#A7D129", marginBottom: "4px" }}>
                            {eq.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span style={{ color: "#9CA3AF" }}>No equipment assigned.</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <Paragraph>No employee selected.</Paragraph>
        )}
      </Modal>


      <Card className={styles.EmployeesContainer}>
        <Search onSearch={handleSearch} allowClear placeholder="Search for Employees" style={{ border: "2px solid #84CC16" }} onChange={(e) => setSearchTerm(e.target.value)} />
        <Table
          columns={columns}
          dataSource={filteredEmployees}
          className={styles.EmployeesTable}
          rowKey={(record) => record.userName}
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
          loading={!Equipments || loading}
        />
      </Card>

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
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
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
  );
};

export default EmployeesPage;