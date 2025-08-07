
import { handleActions } from "redux-actions";
import { INITIAL_STATE, IConditionReportStateContext } from "./context";
import { ConditionReportActionsEnum } from "./actions";

export const ConditionReportReducer = handleActions<IConditionReportStateContext, IConditionReportStateContext>(
    {
        [ConditionReportActionsEnum.getConditionReportsPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [ConditionReportActionsEnum.getConditionReportsSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [ConditionReportActionsEnum.getConditionReportsError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [ConditionReportActionsEnum.createConditionReportPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [ConditionReportActionsEnum.createConditionReportSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [ConditionReportActionsEnum.createConditionReportError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [ConditionReportActionsEnum.updateConditionReportPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [ConditionReportActionsEnum.updateConditionReportSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [ConditionReportActionsEnum.updateConditionReportError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [ConditionReportActionsEnum.deleteConditionReportPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [ConditionReportActionsEnum.deleteConditionReportSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [ConditionReportActionsEnum.deleteConditionReportError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    },
    INITIAL_STATE
);
