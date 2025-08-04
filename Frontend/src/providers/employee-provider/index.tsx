"use client";
import { getAxiosInstance } from "@/utils/axiosInstance";
import { INITIAL_STATE, EmployeeStateContext, EmployeeActionContext } from "./context";
import { IEmployee } from "./models";
import { EmployeeReducer } from "./reducer";
import { useContext, useReducer } from "react";
import { createEmployeeError, createEmployeePending, createEmployeeSuccess, deleteEmployeeError, deleteEmployeePending, deleteEmployeeSuccess, getEmployeeError, getEmployeePending, getEmployeesError, getEmployeesPending, getEmployeesSuccess, getEmployeeSuccess, updateEmployeeError, updateEmployeePending, updateEmployeeSuccess } from "./actions";

export const EmployeeProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(EmployeeReducer, INITIAL_STATE);
    const instance = getAxiosInstance();

    const getEmployees = async () => {
        dispatch(getEmployeesPending());
        const endpoint = `services/app/Employee/GetAll`;
        try {
            const response = await instance.get(endpoint);
            const filteredData = response.data.result.items.map((user: IEmployee) => ({
                id: user.id || "",
                name: user.name || "",
                userName: user.userName || "",
                surname: user.surname || "",
                emailAddress: user.emailAddress || "",
                // roleName: user.roleNames?.[0] || "",
                // activeState: user.isActive ?? true,
            }));
            dispatch(getEmployeesSuccess(filteredData));
        } catch (error) {
            dispatch(getEmployeesError());
            console.error("Error message", error);
        }
    };

    const getEmployee = async (employeeId: number) => {
        dispatch(getEmployeePending());
        const endpoint = `services/app/Employee/Get?Id=${employeeId}`;
        await instance
            .get(endpoint)
            .then((response) => {
                dispatch(getEmployeeSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(getEmployeeError());
            });
    };

    const createEmployee = async (employee: IEmployee) => {
        dispatch(createEmployeePending());
        const endpoint = `services/app/Employee/Create`;
        await instance
            .post(endpoint, employee)
            .then((response) => {
                dispatch(createEmployeeSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(createEmployeeError());
            });
    };

    const updateEmployee = async (employee: IEmployee) => {
        dispatch(updateEmployeePending());
        const endpoint = `services/app/Employee/Update`;
        await instance
            .put(endpoint, employee)
            .then((response) => {
                dispatch(updateEmployeeSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(updateEmployeeError());
            });
    };

    const deleteEmployee = async (employeeId: number) => {
        dispatch(deleteEmployeePending());
        const endpoint = `services/app/Employee/Delete?Id=${employeeId}`;
        await instance
            .delete(endpoint)
            .then((response) => {
                dispatch(deleteEmployeeSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(deleteEmployeeError());
            });
    };

    return (
        <EmployeeStateContext.Provider value={state}>
            <EmployeeActionContext.Provider
                value={{
                    getEmployees,
                    getEmployee,
                    createEmployee,
                    updateEmployee,
                    deleteEmployee,
                }}
            >
                {children}
            </EmployeeActionContext.Provider>
        </EmployeeStateContext.Provider>
    );
};

export const useEmployeeState = () => {
    const context = useContext(EmployeeStateContext);
    if (!context) {
        throw new Error("useEmployeeState must be used within a EmployeeProvider");
    }
    return context;
};

export const useEmployeeActions = () => {
    const context = useContext(EmployeeActionContext);
    if (!context) {
        throw new Error("useEmployeeActions must be used within a EmployeeProvider");
    }
    return context;
};