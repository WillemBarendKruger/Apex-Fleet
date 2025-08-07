"use client";
import { getAxiosInstance } from "@/utils/axiosInstance";
import {
    INITIAL_STATE,
    EquipmentStateContext,
    EquipmentActionContext,
} from "./context";
import { EquipmentReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
    createEquipmentError,
    createEquipmentPending,
    createEquipmentSuccess,
    deleteEquipmentError,
    deleteEquipmentPending,
    deleteEquipmentSuccess,
    getEquipmentError,
    getEquipmentPending,
    getEquipmentsError,
    getEquipmentsPending,
    getEquipmentsSuccess,
    getEquipmentSuccess,
    updateEquipmentError,
    updateEquipmentPending,
} from "./actions";
import { IEquipment } from "./models";
import { message } from "antd";

export const EquipmentsProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(EquipmentReducer, INITIAL_STATE);
    const instance = getAxiosInstance();

    const getEquipments = async () => {
        dispatch(getEquipmentsPending());
        const endpoint = `services/app/Equipment/GetAll`;
        await instance
            .get(endpoint)
            .then((response) => {
                const filteredData = response.data.result.items.map((Equipment: IEquipment) => ({
                    id: Equipment.id,
                    name: Equipment.name,
                    serialNumber: Equipment.serialNumber,
                    maintenancePeriod: Equipment.maintenancePeriod,
                    returnDate: Equipment.returnDate,
                    status: Equipment.status,
                    categoryId: Equipment.categoryId,
                    categoryName: Equipment.categoryName,
                    handlerId: Equipment.handlerId,
                    handlerEmail: Equipment.handlerEmail
                }));
                dispatch(getEquipmentsSuccess(filteredData));
            })
            .catch((error) => {
                dispatch(getEquipmentsError());
                console.error("Error message", error);
            });
    };

    const getEquipment = async (EquipmentId: string) => {
        dispatch(getEquipmentPending());
        const endpoint = `services/app/Equipment/Get?Id=${EquipmentId}`;
        await instance
            .get(endpoint)
            .then((response) => {
                const filteredData = response.data.result.items.map((Equipment: IEquipment) => ({
                    id: Equipment.id,
                    name: Equipment.name,
                    serialNumber: Equipment.serialNumber,
                    maintenancePeriod: Equipment.maintenancePeriod,
                    status: Equipment.status,
                    categoryId: Equipment.categoryId,
                    categoryName: Equipment.categoryName,
                    handlerId: Equipment.handlerId,
                    handlerEmail: Equipment.handlerEmail
                }));
                dispatch(getEquipmentSuccess(filteredData));
            })
            .catch((error) => {
                dispatch(getEquipmentError());
                console.error("Error message", error);
            });
    };

    const createEquipment = async (Equipment: IEquipment) => {
        dispatch(createEquipmentPending());
        const endpoint = `services/app/Equipment/Create`;

        await instance
            .post(endpoint, Equipment)
            .then((response) => {
                dispatch(createEquipmentSuccess(response.data.data));
                getEquipments();
                message.success("Created successfully")
            })
            .catch((error) => {
                dispatch(createEquipmentError());
                message.error("Failed to create")
                console.error(error);
            });
    };

    const updateEquipment = async (equiment: IEquipment) => {
        dispatch(updateEquipmentPending());
        const endpoint = `services/app/Equipment/Update`;
        await instance
            .put(endpoint, equiment)
            .then((response) => {
                dispatch(createEquipmentSuccess(response.data));
                message.success("Equipment updated")
            })
            .catch((error) => {
                console.error(error);
                dispatch(updateEquipmentError());
                message.error("Failed to update")
            });
    };

    const deleteEquipment = async (id: string) => {
        dispatch(deleteEquipmentPending());
        const endpoint = `services/app/Equipment/Delete?Id=${id}`;
        await instance
            .delete(endpoint)
            .then((response) => {
                dispatch(deleteEquipmentSuccess(response.data));
                message.success("Deleted successfully");
                getEquipments();
            })
            .catch((error) => {
                console.error(error);
                dispatch(deleteEquipmentError());
                message.error("Delete failed")
            });
    };

    return (
        <EquipmentStateContext.Provider value={state}>
            <EquipmentActionContext.Provider
                value={{
                    getEquipments,
                    getEquipment,
                    createEquipment,
                    updateEquipment,
                    deleteEquipment
                }}
            >
                {children}
            </EquipmentActionContext.Provider>
        </EquipmentStateContext.Provider>
    );
};

export const useEquipmentState = () => {
    const context = useContext(EquipmentStateContext);
    if (!context) {
        throw new Error("useEquipmentState must be used within a EquipmentsProvider");
    }
    return context;
};

export const useEquipmentActions = () => {
    const context = useContext(EquipmentActionContext);
    if (!context) {
        throw new Error("useEquipmentActions must be used within a EquipmentsProvider");
    }
    return context;
};