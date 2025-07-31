import { createAction } from "redux-actions";
import { IEmployee } from "../employee-provider/models";
import { IEmployeeStateContext } from "../employee-provider/context";

export enum EmployeeActionsEnum {
    getEmployeesPending = "GET_EMPLOYEES_PENDING",
    getEmployeesSuccess = "GET_EMPLOYEES_SUCCESS",
    getEmployeesError = "GET_EMPLOYEES_ERROR",

    getEmployeePending = "GET_EMPLOYEE_PENDING",
    getEmployeeSuccess = "GET_EMPLOYEE_SUCCESS",
    getEmployeeError = "GET_EMPLOYEE_ERROR",

    createEmployeePending = "CREATE_EMPLOYEE_PENDING",
    createEmployeeSuccess = "CREATE_EMPLOYEE_SUCCESS",
    createEmployeeError = "CREATE_EMPLOYEE_ERROR",

    updateEmployeePending = "UPDATE_EMPLOYEE_PENDING",
    updateEmployeeSuccess = "UPDATE_EMPLOYEE_SUCCESS",
    updateEmployeeError = "UPDATE_EMPLOYEE_ERROR",

    deleteEmployeePending = "DELETE_EMPLOYEE_PENDING",
    deleteEmployeeSuccess = "DELETE_EMPLOYEE_SUCCESS",
    deleteEmployeeError = "DELETE_EMPLOYEE_ERROR",
}

export const getEmployeesPending = createAction<IEmployeeStateContext>(
    EmployeeActionsEnum.getEmployeesPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getEmployeesSuccess = createAction<IEmployeeStateContext, IEmployee[]>(
    EmployeeActionsEnum.getEmployeesSuccess,
    (Employees: IEmployee[]) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        Employees,
    })
);

export const getEmployeesError = createAction<IEmployeeStateContext>(
    EmployeeActionsEnum.getEmployeesError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getEmployeePending = createAction<IEmployeeStateContext>(
    EmployeeActionsEnum.getEmployeePending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getEmployeeSuccess = createAction<IEmployeeStateContext, IEmployee>(
    EmployeeActionsEnum.getEmployeeSuccess,
    (employee: IEmployee) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        employee,
    })
);

export const getEmployeeError = createAction<IEmployeeStateContext>(
    EmployeeActionsEnum.getEmployeeError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const createEmployeePending = createAction<IEmployeeStateContext>(
    EmployeeActionsEnum.createEmployeePending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createEmployeeSuccess = createAction<IEmployeeStateContext, IEmployee>(
    EmployeeActionsEnum.createEmployeeSuccess,
    (citizen: IEmployee) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        citizen,
    })
);

export const createEmployeeError = createAction<IEmployeeStateContext>(
    EmployeeActionsEnum.createEmployeeError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const updateEmployeePending = createAction<IEmployeeStateContext>(
    EmployeeActionsEnum.updateEmployeePending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const updateEmployeeSuccess = createAction<IEmployeeStateContext, IEmployee>(
    EmployeeActionsEnum.updateEmployeeSuccess,
    (citizen: IEmployee) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        citizen,
    })
);

export const updateEmployeeError = createAction<IEmployeeStateContext>(
    EmployeeActionsEnum.updateEmployeeError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const deleteEmployeePending = createAction<IEmployeeStateContext>(
    EmployeeActionsEnum.deleteEmployeePending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const deleteEmployeeSuccess = createAction<IEmployeeStateContext, IEmployee>(
    EmployeeActionsEnum.deleteEmployeeSuccess,
    (employee: IEmployee) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        employee,
    })
);

export const deleteEmployeeError = createAction<IEmployeeStateContext>(
    EmployeeActionsEnum.deleteEmployeeError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);