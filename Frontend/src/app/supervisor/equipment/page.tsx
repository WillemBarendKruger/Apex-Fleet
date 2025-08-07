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

const EquipmentPage = () => {
    const { styles } = useStyles();
    const { Employees } = useEmployeeState();
    const { Equipments } = useEquipmentState();
    const { getEmployees } = useEmployeeActions();
    const { getEquipments, createEquipment, updateEquipment } = useEquipmentActions();
    const { getCategories } = useCategoryActions();
    const { Categories } = useCategoryState();

    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const [selectedHandler, setSelectedHandler] = useState<IEmployee | null>(null);
    const [handlerModalVisible, setHandlerModalVisible] = useState(false);

    const refresh = async () => {
        setLoading(true);
        await getEmployees();
        await getCategories();
        await getEquipments();
        setLoading(false);
    }

    useEffect(() => {
        refresh();
    }, []);

    const handleAddEquipment = async () => {
        setLoading(true);

        try {
            const values = await form.validateFields();

            const payload: IEquipment = {
                name: values.name,
                serialNumber: values.serialNumber,
                maintenancePeriod: values.maintenancePeriod,
                LastMaintenanceDate: new Date(),
                status: "inventory",
                categoryName: values.categoryName,
                handlerEmail: values.handlerEmail,
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
                returnDate: new Date().toISOString(),
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
                );
            },
        }
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
                <Table
                    columns={columns}
                    dataSource={Equipments}
                    className={styles.equipmentTable}
                    rowKey={(record) => record.id || record.serialNumber}
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: "max-content" }}
                    loading={!Equipments}
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
                            tokenSeparators={[',']}
                            style={{ width: '100%' }}
                            onChange={(value) => {
                                const lastValue = value[value.length - 1];
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
                    <Form.Item
                        name="handlerEmail"
                        label="Assign to Handler"
                        rules={[{ required: true, message: "Please select a handler" }]}
                    >
                        <Select
                            showSearch
                            placeholder="Select an employee"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                typeof option?.label === "string" &&
                                option.label.toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {Employees?.map((emp) => (
                                <Select.Option key={emp.emailAddress} value={emp.emailAddress}>
                                    {emp.name} {emp.surname} ({emp.emailAddress})
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                </Form>
            </Modal>

            {/* Handler Info Modal */}
            <Modal
                title="Handler Profile"
                open={handlerModalVisible}
                onCancel={() => setHandlerModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setHandlerModalVisible(false)}>
                        Close
                    </Button>,
                ]}
            >
                {selectedHandler ? (
                    <div>
                        <p><strong>Name:</strong> {selectedHandler.name} {selectedHandler.surname}</p>
                        <p><strong>Email:</strong> {selectedHandler.emailAddress}</p>
                        <p><strong>Username:</strong> {selectedHandler.userName}</p>
                    </div>
                ) : (
                    <p>No handler selected.</p>
                )}
            </Modal>
        </div >
    );
};

export default EquipmentPage;