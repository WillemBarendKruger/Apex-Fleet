import { createAction } from "redux-actions";
import { IConditionReport } from "../condition-report-provider/models";
import { IConditionReportStateContext } from "../condition-report-provider/context";

export enum ConditionReportActionsEnum {
    getConditionReportsPending = "GET_CONDITIONREPORTS_PENDING",
    getConditionReportsSuccess = "GET_CONDITIONREPORTS_SUCCESS",
    getConditionReportsError = "GET_CONDITIONREPORTS_ERROR",

    getConditionReportPending = "GET_CONDITIONREPORT_PENDING",
    getConditionReportSuccess = "GET_CONDITIONREPORT_SUCCESS",
    getConditionReportError = "GET_CONDITIONREPORT_ERROR",

    createConditionReportPending = "CREATE_CONDITIONREPORT_PENDING",
    createConditionReportSuccess = "CREATE_CONDITIONREPORT_SUCCESS",
    createConditionReportError = "CREATE_CONDITIONREPORT_ERROR",

    updateConditionReportPending = "UPDATE_CONDITIONREPORT_PENDING",
    updateConditionReportSuccess = "UPDATE_CONDITIONREPORT_SUCCESS",
    updateConditionReportError = "UPDATE_CONDITIONREPORT_ERROR",

    deleteConditionReportPending = "DELETE_CONDITIONREPORT_PENDING",
    deleteConditionReportSuccess = "DELETE_CONDITIONREPORT_SUCCESS",
    deleteConditionReportError = "DELETE_CONDITIONREPORT_ERROR",
}

export const getConditionReportsPending = createAction<IConditionReportStateContext>(
    ConditionReportActionsEnum.getConditionReportsPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getConditionReportsSuccess = createAction<IConditionReportStateContext, IConditionReport[]>(
    ConditionReportActionsEnum.getConditionReportsSuccess,
    (ConditionReports: IConditionReport[]) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        ConditionReports,
    })
);

export const getConditionReportsError = createAction<IConditionReportStateContext>(
    ConditionReportActionsEnum.getConditionReportsError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getConditionReportPending = createAction<IConditionReportStateContext>(
    ConditionReportActionsEnum.getConditionReportsPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getConditionReportSuccess = createAction<IConditionReportStateContext, IConditionReport>(
    ConditionReportActionsEnum.getConditionReportsSuccess,
    (ConditionReport: IConditionReport) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        ConditionReport,
    })
);

export const getConditionReportError = createAction<IConditionReportStateContext>(
    ConditionReportActionsEnum.getConditionReportsError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const createConditionReportPending = createAction<IConditionReportStateContext>(
    ConditionReportActionsEnum.createConditionReportPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createConditionReportSuccess = createAction<IConditionReportStateContext, string>(
    ConditionReportActionsEnum.createConditionReportSuccess,
    (token: string) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        token: token,
    })
);

export const createConditionReportError = createAction<IConditionReportStateContext>(
    ConditionReportActionsEnum.createConditionReportError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const updateConditionReportPending = createAction<IConditionReportStateContext>(
    ConditionReportActionsEnum.updateConditionReportPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const updateConditionReportSuccess = createAction<IConditionReportStateContext, string>(
    ConditionReportActionsEnum.updateConditionReportSuccess,
    (token: string) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        token: token,
    })
);

export const updateConditionReportError = createAction<IConditionReportStateContext>(
    ConditionReportActionsEnum.updateConditionReportError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const deleteConditionReportPending = createAction<IConditionReportStateContext>(
    ConditionReportActionsEnum.deleteConditionReportPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const deleteConditionReportSuccess = createAction<
    IConditionReportStateContext,
    IConditionReport
>(ConditionReportActionsEnum.deleteConditionReportSuccess, (report: IConditionReport) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    report,
}));

export const deleteConditionReportError = createAction<IConditionReportStateContext>(
    ConditionReportActionsEnum.deleteConditionReportError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);