"use client";

import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Space, message, Select, Input } from "antd";
import { useStyles } from "./style/styles";
import { IEquipment } from "@/providers/equipment-provider/models";
import Loader from "@/components/loader/loader";
import { useEmployeeState, useEmployeeActions } from "@/providers/employee-provider";
import { useEquipmentState, useEquipmentActions } from "@/providers/equipment-provider";
import { useCategoryActions, useCategoryState } from "@/providers/category-provider";
import { useRequestActions, useRequestState } from "@/providers/request-provider";
import { useConditionReportActions, useConditionReportState } from "@/providers/condition-report-provider";
import { IRequest } from "@/providers/request-provider/models";
import { IConditionReport } from "@/providers/condition-report-provider/models";
import GeminiImageAnalysis from "@/components/Gemini/gemini";

const EquipmentPage = () => {
    const { styles } = useStyles();
    const { Employees } = useEmployeeState();
    const { Equipments } = useEquipmentState();
    const { getEmployees } = useEmployeeActions();
    const { getEquipments, updateEquipment } = useEquipmentActions();
    const { getCategories } = useCategoryActions();
    const { Categories } = useCategoryState();
    const { getRequests, createRequest } = useRequestActions();
    const { Requests } = useRequestState();
    const { getConditionReports, createConditionReport } = useConditionReportActions();
    const { ConditionReports } = useConditionReportState();

    const [modalVisible, setModalVisible] = useState(false);
    const [reportModalVisible, setReportModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [selectedEquipmentForReport, setSelectedEquipmentForReport] = useState<IEquipment | null>(null);

    useEffect(() => {
        const storedId = sessionStorage.getItem("userId");
        if (storedId && !isNaN(parseInt(storedId))) {
            setUserId(parseInt(storedId));
        }
        refresh();
    }, []);

    const refresh = async () => {
        await Promise.all([getEmployees(), getCategories(), getEquipments(), getRequests()]);
    };

    const handleAddRequest = async () => {
        setLoading(true);
        try {
            if (!userId) {
                message.error("User session not found. Please log in again.");
                return;
            }

            const values = await form.validateFields();
            const requester = Employees?.find(emp => emp.id === userId);

            if (!requester) {
                message.error("Logged-in user not found");
                return;
            }

            const selectedEquipment = Equipments?.find(eq => eq.id === values.equipmentId);

            if (!selectedEquipment || selectedEquipment.status !== "inventory") {
                message.error("Selected equipment is not available");
                return;
            }

            const requestPayload: IRequest = {
                status: "pending",
                equipmentId: selectedEquipment.id,
                equipmentName: selectedEquipment.name,
                requestingEmployeeEmail: requester.emailAddress,
                requestingEmployeeId: userId,
            };

            await createRequest(requestPayload);

            setModalVisible(false);
            form.resetFields();
            message.success(`Request submitted for ${selectedEquipment.name}`);
            await refresh();
        } catch (error) {
            console.error("Error creating request:", error);
            message.error("Failed to submit request");
        }
        setLoading(false);
    };

    const handleReturnEquipment = async (record: IEquipment) => {
        setLoading(true);
        try {
            const updatedEquipment: IEquipment = {
                ...record,
                status: "inventory",
                handlerEmail: "supervisor1@example.com", // Update this logic in the near future
            };

            await updateEquipment(updatedEquipment);
            message.success("Equipment returned successfully");
            await refresh();
        } catch (error) {
            message.error("Failed to return equipment");
            console.error("Error returning equipment:", error);
        }
        setLoading(false);
    };

    const handleOpenReportModal = (equipment: IEquipment) => {
        setSelectedEquipmentForReport(equipment);
        form.resetFields();
        setReportModalVisible(true);
    };
    const handleReportCondition = async () => {
        setLoading(true);
        try {
            const values = await form.validateFields();

            if (!selectedEquipmentForReport || !userId) {
                message.error("No equipment selected or user not found");
                return;
            }

            const currentEmployee = Employees?.find(emp => emp.id === userId);
            if (!currentEmployee) {
                message.error("Current user information not found");
                return;
            }


            const reportPayload: IConditionReport = {
                equipmentId: selectedEquipmentForReport.id,
                equipmentName: selectedEquipmentForReport.name,
                reportingEmployeeEmail: Employees?.find(emp => emp.id === userId)?.emailAddress || "",
                description: values.description,
                status: "pending",
            };

            await createConditionReport(reportPayload);
            message.success("Condition report submitted");
            setReportModalVisible(false);
            await refresh();
        } catch (error) {
            console.error("Error submitting condition report:", error);
            message.error("Failed to submit report");
        } finally {
            setLoading(false);
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
            title: "Actions",
            key: "actions",
            render: (_: IEquipment, record: IEquipment) => {
                const handler = Employees?.find(emp => emp.emailAddress === record.handlerEmail);
                return handler ? (
                    <Space>
                        <Button type="primary" onClick={() => { handleReturnEquipment(record) }}>
                            Return
                        </Button>
                        <Button onClick={() => { handleOpenReportModal(record) }}>
                            Report condition
                        </Button>
                    </Space>
                ) : (
                    <span>Unassigned</span>
                );
            },
        },
    ];

    const filteredEquipments = Equipments?.filter(eq =>
        eq.handlerId === userId
    );

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className={styles.equipmentContainer}>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "16px",
                        }}
                    >
                        <h2 style={{ margin: 0 }}>My Assigned Equipment</h2>
                        <Button type="primary" onClick={() => setModalVisible(true)}>
                            Request Equipment
                        </Button>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={filteredEquipments}
                        className={styles.equipmentTable}
                        rowKey={(record) => record.id?.toString() || `temp-${record.serialNumber}`}
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: "max-content" }}
                    />
                    {/* model for request */}
                    <Modal
                        title="Request Equipment"
                        open={modalVisible}
                        onCancel={() => setModalVisible(false)}
                        footer={
                            <Space>
                                <Button onClick={() => setModalVisible(false)}>Cancel</Button>
                                <Button type="primary" onClick={handleAddRequest}>
                                    Submit Request
                                </Button>
                            </Space>
                        }
                    >
                        <Form form={form} layout="vertical">
                            <Form.Item
                                label="Category"
                                name="categoryName"
                                rules={[{ required: true, message: "Please select a category" }]}
                            >
                                <Select
                                    placeholder="Select a category"
                                    onChange={(value) => {
                                        setSelectedCategory(value);
                                        form.setFieldsValue({ categoryName: value });
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
                                name="equipmentId"
                                label="Select Equipment"
                                rules={[{ required: true, message: "Please select available equipment" }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Choose equipment from inventory"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        typeof option?.children === "string" &&
                                        (option.children as string).toLowerCase().includes(input.toLowerCase())
                                    }
                                >
                                    {Equipments?.filter(eq =>
                                        eq.status === "inventory" &&
                                        eq.categoryName === selectedCategory
                                    ).map(eq => (
                                        <Select.Option key={eq.id} value={eq.id}>
                                            {eq.name} ({eq.serialNumber})
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Form>
                    </Modal>

                    {/* model for reports */}
                    <Modal
                        title="Report Equipment Condition"
                        open={reportModalVisible}
                        onCancel={() => setReportModalVisible(false)}
                        footer={
                            <Space>
                                <Button onClick={() => setReportModalVisible(false)}>Cancel</Button>
                                <Button type="primary" onClick={handleReportCondition}>
                                    Submit Report
                                </Button>
                            </Space>
                        }
                    >
                        <Form form={form} layout="vertical">
                            <Form.Item
                                name="description"
                                label="Condition Description"
                                rules={[{ required: true, message: "Please describe the condition" }]}
                            >
                                <Input.TextArea
                                    rows={4}
                                    placeholder="Describe the condition of the equipment"
                                />
                            </Form.Item>
                            <Form.Item name="picture" label="Picture">
                                <GeminiImageAnalysis
                                    onDescriptionGenerated={(desc) => {
                                        form.setFieldsValue({ description: desc });
                                    }}
                                />
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            )}
        </>
    );
};

export default EquipmentPage;