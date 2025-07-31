import { handleActions } from "redux-actions";
import { INITIAL_STATE, IEmployeeStateContext } from "./context";
import { EmployeeActionsEnum } from "./actions";

export const EmployeeReducer = handleActions<IEmployeeStateContext, IEmployeeStateContext>(
    {
        [EmployeeActionsEnum.getEmployeesPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeActionsEnum.getEmployeesSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeActionsEnum.getEmployeesError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeActionsEnum.createEmployeePending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeActionsEnum.createEmployeeSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeActionsEnum.createEmployeeError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeActionsEnum.updateEmployeePending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeActionsEnum.updateEmployeeSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeActionsEnum.updateEmployeeError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeActionsEnum.deleteEmployeePending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeActionsEnum.deleteEmployeeSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeActionsEnum.deleteEmployeeError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    },
    INITIAL_STATE
);