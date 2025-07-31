"use client";
import { getAxiosInstance } from "@/utils/axiosInstance";
import { INITIAL_STATE, SupervisorStateContext, SupervisorActionContext } from "./context";
import { ISupervisor } from "./models";
import { SupervisorReducer } from "./reducer";
import { useContext, useReducer } from "react";
import { useRouter } from "next/navigation";
import { decodeToken } from "@/utils/jwt";
import { createSupervisorError, createSupervisorPending, createSupervisorSuccess, deleteSupervisorError, deleteSupervisorPending, deleteSupervisorSuccess, getSupervisorError, getSupervisorPending, getSupervisorsError, getSupervisorsPending, getSupervisorsSuccess, getSupervisorSuccess, updateSupervisorError, updateSupervisorPending, updateSupervisorSuccess } from "./actions";

export const SupervisorProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(SupervisorReducer, INITIAL_STATE);
    const instance = getAxiosInstance();
    const router = useRouter();

    const getSupervisors = async () => {
        dispatch(getSupervisorsPending());
        const endpoint = `services/app/Supervisor/GetAll`;
        try {
            const response = await instance.get(endpoint);
            const filteredData = response.data.result.items.map((user: ISupervisor) => ({
                name: user.name || "",
                userName: user.userName || "",
                surname: user.surname || "",
                emailAddress: user.emailAddress || "",
                // roleName: user.roleNames?.[0] || "",
                // activeState: user.isActive ?? true,
            }));
            dispatch(getSupervisorsSuccess(filteredData));
        } catch (error) {
            dispatch(getSupervisorsError());
            console.error("Error message", error);
        }
    };

    const getSupervisor = async (SupervisorId: number) => {
        dispatch(getSupervisorPending());
        const endpoint = `services/app/Supervisor/Get?Id=${SupervisorId}`;
        await instance
            .get(endpoint)
            .then((response) => {
                dispatch(getSupervisorSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(getSupervisorError());
            });
    };

    const createSupervisor = async (Supervisor: ISupervisor) => {
        const token = sessionStorage.getItem("token")?.trim();
        dispatch(createSupervisorPending());
        const endpoint = `services/app/Supervisor/Create`;
        await instance
            .post(endpoint, Supervisor)
            .then((response) => {
                dispatch(createSupervisorSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(createSupervisorError());
            });
    };

    const updateSupervisor = async (Supervisor: ISupervisor) => {
        dispatch(updateSupervisorPending());
        const endpoint = `services/app/Supervisor/Update`;
        await instance
            .put(endpoint, Supervisor)
            .then((response) => {
                dispatch(updateSupervisorSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(updateSupervisorError());
            });
    };

    const deleteSupervisor = async (SupervisorId: number) => {
        dispatch(deleteSupervisorPending());
        const endpoint = `services/app/Supervisor/Delete?Id=${SupervisorId}`;
        await instance
            .delete(endpoint)
            .then((response) => {
                dispatch(deleteSupervisorSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(deleteSupervisorError());
            });
    };

    return (
        <SupervisorStateContext.Provider value={state}>
            <SupervisorActionContext.Provider
                value={{
                    getSupervisors,
                    getSupervisor,
                    createSupervisor,
                    updateSupervisor,
                    deleteSupervisor,
                }}
            >
                {children}
            </SupervisorActionContext.Provider>
        </SupervisorStateContext.Provider>
    );
};

export const useSupervisorState = () => {
    const context = useContext(SupervisorStateContext);
    if (!context) {
        throw new Error("useSupervisorState must be used within a SupervisorProvider");
    }
    return context;
};

export const useSupervisorActions = () => {
    const context = useContext(SupervisorActionContext);
    if (!context) {
        throw new Error("useSupervisorActions must be used within a SupervisorProvider");
    }
    return context;
};