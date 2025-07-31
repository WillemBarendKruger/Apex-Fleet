import { createContext } from "react";
import { IEquipment } from "./models";

export interface IEquipmentStateContext {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    Equipment?: IEquipment;
    Equipments?: IEquipment[];
}

export interface IEquipmentActionsContext {
    getEquipments: () => Promise<void>;
    getEquipment: (EquipmentId: string) => Promise<void>;
    createEquipment: (Equipment: IEquipment) => Promise<void>;
    updateEquipment: (Equipment: IEquipment) => Promise<void>;
    deleteEquipment: (EquipmentId: string) => Promise<void>;
}

export const INITIAL_STATE: IEquipmentStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
    Equipments: [],
};

export const EquipmentStateContext = createContext<IEquipmentStateContext>(INITIAL_STATE);
export const EquipmentActionContext = createContext<IEquipmentActionsContext | undefined>(
    undefined
);