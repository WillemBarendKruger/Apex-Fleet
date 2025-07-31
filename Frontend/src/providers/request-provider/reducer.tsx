
import { handleActions } from "redux-actions";
import { INITIAL_STATE, IRequestStateContext } from "./context";
import { RequestActionsEnum } from "./actions";

export const RequestReducer = handleActions<IRequestStateContext, IRequestStateContext>(
    {
        [RequestActionsEnum.getRequestsPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [RequestActionsEnum.getRequestsSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [RequestActionsEnum.getRequestsError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [RequestActionsEnum.createRequestPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [RequestActionsEnum.createRequestSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [RequestActionsEnum.createRequestError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),

        [RequestActionsEnum.updateRequestPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [RequestActionsEnum.updateRequestSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [RequestActionsEnum.updateRequestError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [RequestActionsEnum.deleteRequestPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [RequestActionsEnum.deleteRequestSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [RequestActionsEnum.deleteRequestError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    },
    INITIAL_STATE
);
