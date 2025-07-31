import { createAction } from "redux-actions";
import { IEquipment } from "../equipment-provider/models";
import { IEquipmentStateContext } from "../equipment-provider/context";
import { IEmployee } from "../employee-provider/models";

export enum EquipmentActionsEnum {
    getEquipmentsPending = "GET_EQUIPMENTS_PENDING",
    getEquipmentsSuccess = "GET_EQUIPMENTS_SUCCESS",
    getEquipmentsError = "GET_EQUIPMENTS_ERROR",

    getEquipmentPending = "GET_EQUIPMENT_PENDING",
    getEquipmentSuccess = "GET_EQUIPMENT_SUCCESS",
    getEquipmentError = "GET_EQUIPMENT_ERROR",

    createEquipmentPending = "CREATE_EQUIPMENT_PENDING",
    createEquipmentSuccess = "CREATE_EQUIPMENT_SUCCESS",
    createEquipmentError = "CREATE_EQUIPMENT_ERROR",

    updateEquipmentPending = "UPDATE_EQUIPMENT_PENDING",
    updateEquipmentSuccess = "UPDATE_EQUIPMENT_SUCCESS",
    updateEquipmentError = "UPDATE_EQUIPMENT_ERROR",

    deleteEquipmentPending = "DELETE_EQUIPMENT_PENDING",
    deleteEquipmentSuccess = "DELETE_EQUIPMENT_SUCCESS",
    deleteEquipmentError = "DELETE_EQUIPMENT_ERROR",
}

export const getEquipmentsPending = createAction<IEquipmentStateContext>(
    EquipmentActionsEnum.getEquipmentsPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getEquipmentsSuccess = createAction<IEquipmentStateContext, IEquipment[]>(
    EquipmentActionsEnum.getEquipmentsSuccess,
    (Equipments: IEquipment[]) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        Equipments,
    })
);

export const getEquipmentsError = createAction<IEquipmentStateContext>(
    EquipmentActionsEnum.getEquipmentsError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getEquipmentPending = createAction<IEquipmentStateContext>(
    EquipmentActionsEnum.getEquipmentPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getEquipmentSuccess = createAction<IEquipmentStateContext, IEquipment>(
    EquipmentActionsEnum.getEquipmentSuccess,
    (Equipment: IEquipment) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        Equipment,
    })
);

export const getEquipmentError = createAction<IEquipmentStateContext>(
    EquipmentActionsEnum.getEquipmentError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const createEquipmentPending = createAction<IEquipmentStateContext>(
    EquipmentActionsEnum.createEquipmentPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createEquipmentSuccess = createAction<IEquipmentStateContext, string>(
    EquipmentActionsEnum.createEquipmentSuccess,
    (token: string) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        token: token,
    })
);

export const createEquipmentError = createAction<IEquipmentStateContext>(
    EquipmentActionsEnum.createEquipmentError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const updateEquipmentPending = createAction<IEquipmentStateContext>(
    EquipmentActionsEnum.updateEquipmentPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const updateEquipmentSuccess = createAction<IEquipmentStateContext, IEquipment>(
    EquipmentActionsEnum.updateEquipmentSuccess,
    (equipment: IEquipment) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        equipment,
    })
);

export const updateEquipmentError = createAction<IEquipmentStateContext>(
    EquipmentActionsEnum.updateEquipmentError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const deleteEquipmentPending = createAction<IEquipmentStateContext>(
    EquipmentActionsEnum.deleteEquipmentPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const deleteEquipmentSuccess = createAction<IEquipmentStateContext, IEquipment>(
    EquipmentActionsEnum.deleteEquipmentSuccess,
    (citizen: IEquipment) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        citizen,
    })
);

export const deleteEquipmentError = createAction<IEquipmentStateContext>(
    EquipmentActionsEnum.deleteEquipmentError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);
