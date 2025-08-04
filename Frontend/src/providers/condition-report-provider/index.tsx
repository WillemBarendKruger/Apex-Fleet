"use client";
import { getAxiosInstance } from "@/utils/axiosInstance";
import {
    INITIAL_STATE,
    ConditionReportStateContext,
    ConditionReportActionContext,
} from "./context";
import { ConditionReportReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
    createConditionReportError,
    createConditionReportPending,
    createConditionReportSuccess,
    getConditionReportsError,
    getConditionReportsPending,
    getConditionReportsSuccess,
    updateConditionReportError,
    updateConditionReportPending,
    updateConditionReportSuccess,
} from "./actions";
import { IConditionReport } from "./models";

export const ConditionReportsProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(ConditionReportReducer, INITIAL_STATE);
    const instance = getAxiosInstance();

    const getConditionReports = async () => {
        dispatch(getConditionReportsPending());
        const endpoint = `services/app/ConditionReport/GetAll`;
        await instance
            .get(endpoint)
            .then((response) => {
                const filteredData = response.data.result.items.map((ConditionReport: IConditionReport) => ({
                    id: ConditionReport.id,
                    description: ConditionReport.description,
                    status: ConditionReport.status,
                    equipmentName: ConditionReport.equipmentName,
                    equipmentId: ConditionReport.equipmentId,
                    reportingEmployeeName: ConditionReport.reportingEmployeeName,
                    reportingEmployeeEmail: ConditionReport.reportingEmployeeEmail,
                    reportingEmployeeId: ConditionReport.reportingEmployeeId
                }));
                dispatch(getConditionReportsSuccess(filteredData));
            })
            .catch((error) => {
                dispatch(getConditionReportsError());
                console.error("Error message", error);
            });
    };

    const createConditionReport = async (ConditionReport: IConditionReport) => {
        dispatch(createConditionReportPending());
        const endpoint = `services/app/ConditionReport/Create`;

        await instance
            .post(endpoint, ConditionReport)
            .then((response) => {
                dispatch(createConditionReportSuccess(response.data.result));
                getConditionReports();
            })
            .catch((error) => {
                dispatch(createConditionReportError());
                console.error(error);
            });
    };

    const updateConditionReport = async (ConditionReport: IConditionReport) => {
        dispatch(updateConditionReportPending());
        const endpoint = `services/app/ConditionReport/Update`;

        await instance
            .put(endpoint, ConditionReport)
            .then((response) => {
                dispatch(updateConditionReportSuccess(response.data));
                getConditionReports();
            })
            .catch((error) => {
                dispatch(updateConditionReportError());
                console.error(error);
            });
    };

    return (
        <ConditionReportStateContext.Provider value={state}>
            <ConditionReportActionContext.Provider
                value={{
                    getConditionReports,
                    createConditionReport,
                    updateConditionReport
                }}
            >
                {children}
            </ConditionReportActionContext.Provider>
        </ConditionReportStateContext.Provider>
    );
};

export const useConditionReportState = () => {
    const context = useContext(ConditionReportStateContext);
    if (!context) {
        throw new Error("useConditionReportState must be used within a ConditionReportsProvider");
    }
    return context;
};

export const useConditionReportActions = () => {
    const context = useContext(ConditionReportActionContext);
    if (!context) {
        throw new Error("useConditionReportActions must be used within a ConditionReportsProvider");
    }
    return context;
};