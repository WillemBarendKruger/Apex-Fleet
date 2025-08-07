import { createContext } from "react";
import { IConditionReport } from "./models";

export interface IConditionReportStateContext {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    ConditionReport?: IConditionReport;
    ConditionReports?: IConditionReport[];
}

export interface IConditionReportActionsContext {
    getConditionReports: () => Promise<void>;
    createConditionReport: (ConditionReport: IConditionReport) => Promise<void>;
    updateConditionReport: (ConditionReport: IConditionReport) => Promise<void>;
    deleteConditionReport: (ConditionReportId: string) => Promise<void>;
}

export const INITIAL_STATE: IConditionReportStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
    ConditionReports: [],
};

export const ConditionReportStateContext = createContext<IConditionReportStateContext>(INITIAL_STATE);
export const ConditionReportActionContext = createContext<IConditionReportActionsContext | undefined>(
    undefined
);