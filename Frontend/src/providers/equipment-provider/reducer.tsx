
import { handleActions } from "redux-actions";
import { INITIAL_STATE, IEquipmentStateContext } from "./context";
import { EquipmentActionsEnum } from "./actions";

export const EquipmentReducer = handleActions<IEquipmentStateContext, IEquipmentStateContext>(
    {
        [EquipmentActionsEnum.getEquipmentsPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EquipmentActionsEnum.getEquipmentsSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EquipmentActionsEnum.getEquipmentsError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EquipmentActionsEnum.createEquipmentPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EquipmentActionsEnum.createEquipmentSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EquipmentActionsEnum.createEquipmentError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EquipmentActionsEnum.updateEquipmentPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EquipmentActionsEnum.updateEquipmentSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EquipmentActionsEnum.updateEquipmentError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EquipmentActionsEnum.deleteEquipmentPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EquipmentActionsEnum.deleteEquipmentSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EquipmentActionsEnum.deleteEquipmentError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    },
    INITIAL_STATE
);
