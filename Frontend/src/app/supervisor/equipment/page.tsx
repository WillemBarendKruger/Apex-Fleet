"use client";

import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Space, message, Select, InputNumber, Card, Tooltip } from "antd";
import { useStyles } from "./style/styles";
import { IEmployee } from "@/providers/employee-provider/models";
import { IEquipment } from "@/providers/equipment-provider/models";
import { useEmployeeState, useEmployeeActions } from "@/providers/employee-provider";
import { useEquipmentState, useEquipmentActions } from "@/providers/equipment-provider";
import { useCategoryActions, useCategoryState } from "@/providers/category-provider"
import { CheckSquareOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { useAuthActions, useAuthState } from "@/providers/auth-provider";


const EquipmentPage = () => {
    const { styles } = useStyles();
    const { Employees } = useEmployeeState();
    const { Equipments } = useEquipmentState();
    const { getEmployees } = useEmployeeActions();
    const { getEquipments, createEquipment, updateEquipment } = useEquipmentActions();
    const { getCategories } = useCategoryActions();
    const { Categories } = useCategoryState();
    const { getCurrentUser } = useAuthActions();
    const { user } = useAuthState();

    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const [selectedHandler, setSelectedHandler] = useState<IEmployee | null>(null);
    const [handlerModalVisible, setHandlerModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredEquipment, setFilteredEquipment] = useState<IEquipment[]>([]);
    const hasReturningEquipment = Equipments?.some(eq => eq.status === "returning");

    const { Search } = Input;

    const refresh = async () => {
        setLoading(true);
        await getEmployees();
        await getCategories();
        await getEquipments();
        await getCurrentUser();
        setLoading(false);
    }

    useEffect(() => {
        refresh();
    }, []);

    useEffect(() => {
        setFilteredEquipment(Equipments || []);
    }, [Equipments]);

    useEffect(() => {
        handleSearch(searchTerm);
    }, [searchTerm]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);

        const lowerTerm = term.toLowerCase();

        const results = (Equipments ?? []).filter((item) =>
            item.name.toLowerCase().includes(lowerTerm) ||
            item.serialNumber.toLowerCase().includes(lowerTerm) ||
            item.status.toLowerCase().includes(lowerTerm) ||
            item.handlerEmail?.toLowerCase().includes(lowerTerm)
        );

        setFilteredEquipment(results);
    };

    const handleAddEquipment = async () => {
        setLoading(true);

        try {
            const values = await form.validateFields();

            const payload: IEquipment = {
                name: values.name,
                serialNumber: values.serialNumber,
                maintenancePeriod: values.maintenancePeriod,
                getDate: "",
                returnDate: "",
                LastMaintenanceDate: new Date().toISOString(),
                status: "inventory",
                categoryName: values.categoryName,
                handlerEmail: user?.emailAddress ?? "",
            };

            await createEquipment(payload);
            setModalVisible(false);
            form.resetFields();
            message.success(`Added equipment ${values.name}`);
            await refresh();
        } catch (error) {
            console.error("Error adding equipment:", error);
            message.error("Failed to add equipment");
        }
        setLoading(false);
    };

    const confirmReturn = async (equipment: IEquipment) => {
        try {
            await updateEquipment({
                ...equipment,
                status: "inventory",
                getDate: "",
                returnDate: new Date().toISOString(),
                handlerEmail: user?.emailAddress ?? "",
            });

            message.success("Equipment return confirmed.");
            refresh();
        } catch (error) {
            console.error("Return confirmation failed:", error);
            message.error("Failed to confirm return.");
        }
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Serial Number",
            dataIndex: "serialNumber",
            key: "serialNumber",
        },
        {
            title: "Maintenance Period",
            dataIndex: "maintenancePeriod",
            key: "maintenancePeriod",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Category",
            dataIndex: "categoryName",
            key: "category",
        },
        {
            title: "Handler",
            key: "handler",
            render: (_: IEquipment, record: IEquipment) => {
                const handler = Employees?.find(emp => emp.emailAddress === record.handlerEmail);

                return (
                    <Space>
                        {handler ? (
                            <Button
                                type="link"
                                onClick={() => {
                                    setSelectedHandler(handler);
                                    setHandlerModalVisible(true);
                                }}
                            >
                                View Handler
                            </Button>
                        ) : (
                            <span>Unassigned</span>
                        )}
                    </Space>
                );
            },
        },

        ...(hasReturningEquipment
            ? [
                {
                    title: "Actions",
                    key: "actions",
                    render: (_: IEquipment, record: IEquipment) => (
                        <Space>
                            {record.status === "returning" && (
                                <Tooltip title="Return Equipment">
                                    <Button
                                        icon={<CheckSquareOutlined />}
                                        type="primary"
                                        style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
                                        onClick={() => confirmReturn(record)}
                                    />
                                </Tooltip>
                            )}
                        </Space>
                    ),
                },
            ]
            : []),
    ];


    return (

        <div className={styles.equipmentContainer}>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                }}
            >

                <h2 style={{ margin: 0 }}>Equipment List</h2>
                <Button type="primary" onClick={() => setModalVisible(true)}>
                    Add Equipment
                </Button>

            </div>

            <Card className={styles.equipmentContainer}>
                <Search onSearch={handleSearch} allowClear placeholder="Search for Equipment" style={{ border: "2px solid #84CC16" }} onChange={(e) => setSearchTerm(e.target.value)} />
                <Table
                    columns={columns}
                    dataSource={filteredEquipment}
                    className={styles.equipmentTable}
                    rowKey={(record) => record.id || record.serialNumber}
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: "max-content" }}
                    loading={!Equipments || loading}
                />
            </Card>

            {/* Add Equipment Modal */}
            <Modal
                title="Add Equipment"
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={
                    <Space>
                        <Button onClick={() => setModalVisible(false)}>Cancel</Button>
                        <Button type="primary" onClick={handleAddEquipment}>
                            Add
                        </Button>
                    </Space>
                }
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: "Please enter equipment name" }]}
                    >
                        <Input placeholder="John" />
                    </Form.Item>
                    <Form.Item
                        name="serialNumber"
                        label="Serial Number"
                        rules={[{ required: true, message: "Please enter serial number" }]}
                    >
                        <Input placeholder="s2df4ds654ds5c3sd" />
                    </Form.Item>
                    <Form.Item
                        name="maintenancePeriod"
                        label="Maintenance Period"
                        rules={[
                            { required: true, message: "Please enter maintenance period" },
                            { pattern: /^\d+$/, message: "Only numeric values are allowed" },
                        ]}
                    >
                        <InputNumber min={0} style={{ width: "100%" }} placeholder="0" />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="categoryName"
                        rules={[{ required: true, message: "Please select or create a category" }]}
                    >
                        <Select
                            mode="tags"
                            placeholder="Select or create a category"
                            style={{ width: '100%' }}
                            onChange={(value) => {
                                const lastValue = value[0];
                                form.setFieldsValue({ categoryName: lastValue });
                            }}
                        >
                            {Categories?.map((cat) => (
                                <Select.Option key={cat.type} value={cat.type}>
                                    {cat.type}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Handler Info Modal */}
            <Modal
                title={<Title level={4} style={{ marginBottom: 0, padding: 10 }}>Handler Profile</Title>}
                open={handlerModalVisible}
                onCancel={() => setHandlerModalVisible(false)}
                footer={[
                    <Button
                        key="close"
                        onClick={() => setHandlerModalVisible(false)}
                        style={{
                            backgroundColor: "#84CC16",
                            borderColor: "#84CC16",
                            color: "#1E1E1E",
                            fontWeight: "bold",
                        }}
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
                {selectedHandler ? (
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
                                    <td className={styles.cellStyle}>{selectedHandler.name} {selectedHandler.surname}</td>
                                </tr>
                                <tr>
                                    <td className={styles.cellStyle}><strong>Email</strong></td>
                                    <td className={styles.cellStyle}>{selectedHandler.emailAddress}</td>
                                </tr>
                                <tr>
                                    <td className={styles.cellStyle}><strong>Username</strong></td>
                                    <td className={styles.cellStyle}>{selectedHandler.userName}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <Paragraph>No handler selected.</Paragraph>
                )}
            </Modal>
        </div >
    );
};

export default EquipmentPage;