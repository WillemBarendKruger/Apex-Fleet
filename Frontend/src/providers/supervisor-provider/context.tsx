import { createContext } from "react";
import { ISupervisor } from "./models";

export interface ISupervisorStateContext {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    supervisor?: ISupervisor;
    supervisors?: ISupervisor[];
}

export interface ISupervisorActionsContext {
    getSupervisors: () => Promise<void>;
    getSupervisor: (supervisorId: number) => Promise<void>;
    createSupervisor: (supervisor: ISupervisor) => void;
    updateSupervisor: (supervisor: ISupervisor) => void;
    deleteSupervisor: (supervisorId: number) => void;
    supervisor?: ISupervisor;
}

export const INITIAL_STATE: ISupervisorStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
    supervisors: [],
};

export const SupervisorStateContext = createContext<ISupervisorStateContext>(INITIAL_STATE);
export const SupervisorActionContext = createContext<ISupervisorActionsContext | undefined>(
    undefined
);