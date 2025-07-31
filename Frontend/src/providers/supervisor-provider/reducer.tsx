import { handleActions } from "redux-actions";
import { INITIAL_STATE, ISupervisorStateContext } from "./context";
import { SupervisorActionsEnum } from "./actions";

export const SupervisorReducer = handleActions<ISupervisorStateContext, ISupervisorStateContext>(
    {
        [SupervisorActionsEnum.getSupervisorsPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SupervisorActionsEnum.getSupervisorsSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SupervisorActionsEnum.getSupervisorsError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SupervisorActionsEnum.createSupervisorPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SupervisorActionsEnum.createSupervisorSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SupervisorActionsEnum.createSupervisorError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SupervisorActionsEnum.updateSupervisorPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SupervisorActionsEnum.updateSupervisorSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SupervisorActionsEnum.updateSupervisorError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SupervisorActionsEnum.deleteSupervisorPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SupervisorActionsEnum.deleteSupervisorSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [SupervisorActionsEnum.deleteSupervisorError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    },
    INITIAL_STATE
);