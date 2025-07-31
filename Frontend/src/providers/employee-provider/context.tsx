import { createContext } from "react";
import { IEmployee } from "../employee-provider/models";

export interface IEmployeeStateContext {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    Employee?: IEmployee;
    Employees?: IEmployee[];
}

export interface IEmployeeActionsContext {
    getEmployees: () => Promise<void>;
    getEmployee: (employeeId: number) => Promise<void>;
    createEmployee: (employee: IEmployee) => void;
    updateEmployee: (employee: IEmployee) => void;
    deleteEmployee: (employeeId: number) => void;
    employee?: IEmployee
}

export const INITIAL_STATE: IEmployeeStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
    Employees: [],
};

export const EmployeeStateContext = createContext<IEmployeeStateContext>(INITIAL_STATE);
export const EmployeeActionContext = createContext<IEmployeeActionsContext | undefined>(
    undefined
);