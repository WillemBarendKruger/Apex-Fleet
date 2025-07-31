import { createAction } from "redux-actions";
import { ISupervisor } from "../supervisor-provider/models";
import { ISupervisorStateContext } from "../supervisor-provider/context";

export enum SupervisorActionsEnum {
    getSupervisorsPending = "GET_SUPERVISORS_PENDING",
    getSupervisorsSuccess = "GET_SUPERVISORS_SUCCESS",
    getSupervisorsError = "GET_SUPERVISORS_ERROR",

    getSupervisorPending = "GET_SUPERVISOR_PENDING",
    getSupervisorSuccess = "GET_SUPERVISOR_SUCCESS",
    getSupervisorError = "GET_SUPERVISOR_ERROR",

    createSupervisorPending = "CREATE_Supervisor_PENDING",
    createSupervisorSuccess = "CREATE_Supervisor_SUCCESS",
    createSupervisorError = "CREATE_Supervisor_ERROR",

    updateSupervisorPending = "UPDATE_SUPERVISOR_PENDING",
    updateSupervisorSuccess = "UPDATE_SUPERVISOR_SUCCESS",
    updateSupervisorError = "UPDATE_SUPERVISOR_ERROR",

    deleteSupervisorPending = "DELETE_SUPERVISOR_PENDING",
    deleteSupervisorSuccess = "DELETE_SUPERVISOR_SUCCESS",
    deleteSupervisorError = "DELETE_SUPERVISOR_ERROR",
}

export const getSupervisorsPending = createAction<ISupervisorStateContext>(
    SupervisorActionsEnum.getSupervisorsPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getSupervisorsSuccess = createAction<ISupervisorStateContext, ISupervisor[]>(
    SupervisorActionsEnum.getSupervisorsSuccess,
    (Supervisors: ISupervisor[]) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        Supervisors,
    })
);

export const getSupervisorsError = createAction<ISupervisorStateContext>(
    SupervisorActionsEnum.getSupervisorsError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getSupervisorPending = createAction<ISupervisorStateContext>(
    SupervisorActionsEnum.getSupervisorPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getSupervisorSuccess = createAction<ISupervisorStateContext, ISupervisor>(
    SupervisorActionsEnum.getSupervisorSuccess,
    (Supervisor: ISupervisor) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        Supervisor,
    })
);

export const getSupervisorError = createAction<ISupervisorStateContext>(
    SupervisorActionsEnum.getSupervisorError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const createSupervisorPending = createAction<ISupervisorStateContext>(
    SupervisorActionsEnum.createSupervisorPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createSupervisorSuccess = createAction<ISupervisorStateContext, ISupervisor>(
    SupervisorActionsEnum.createSupervisorSuccess,
    (citizen: ISupervisor) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        citizen,
    })
);

export const createSupervisorError = createAction<ISupervisorStateContext>(
    SupervisorActionsEnum.createSupervisorError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const updateSupervisorPending = createAction<ISupervisorStateContext>(
    SupervisorActionsEnum.updateSupervisorPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const updateSupervisorSuccess = createAction<ISupervisorStateContext, ISupervisor>(
    SupervisorActionsEnum.updateSupervisorSuccess,
    (citizen: ISupervisor) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        citizen,
    })
);

export const updateSupervisorError = createAction<ISupervisorStateContext>(
    SupervisorActionsEnum.updateSupervisorError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const deleteSupervisorPending = createAction<ISupervisorStateContext>(
    SupervisorActionsEnum.deleteSupervisorPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const deleteSupervisorSuccess = createAction<ISupervisorStateContext, ISupervisor>(
    SupervisorActionsEnum.deleteSupervisorSuccess,
    (Supervisor: ISupervisor) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        Supervisor,
    })
);

export const deleteSupervisorError = createAction<ISupervisorStateContext>(
    SupervisorActionsEnum.deleteSupervisorError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);