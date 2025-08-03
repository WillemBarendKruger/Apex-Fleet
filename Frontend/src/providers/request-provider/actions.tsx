import { createAction } from "redux-actions";
import { IRequest } from "../request-provider/models";
import { IRequestStateContext } from "../request-provider/context";

export enum RequestActionsEnum {
    getRequestsPending = "GET_REQUESTS_PENDING",
    getRequestsSuccess = "GET_REQUESTS_SUCCESS",
    getRequestsError = "GET_REQUESTS_ERROR",

    getRequestPending = "GET_REQUEST_PENDING",
    getRequestSuccess = "GET_REQUEST_SUCCESS",
    getRequestError = "GET_REQUEST_ERROR",

    createRequestPending = "CREATE_REQUEST_PENDING",
    createRequestSuccess = "CREATE_REQUEST_SUCCESS",
    createRequestError = "CREATE_REQUEST_ERROR",

    updateRequestPending = "UPDATE_REQUEST_PENDING",
    updateRequestSuccess = "UPDATE_REQUEST_SUCCESS",
    updateRequestError = "UPDATE_REQUEST_ERROR",

    deleteRequestPending = "DELETE_REQUEST_PENDING",
    deleteRequestSuccess = "DELETE_REQUEST_SUCCESS",
    deleteRequestError = "DELETE_REQUEST_ERROR",
}

export const getRequestsPending = createAction<IRequestStateContext>(
    RequestActionsEnum.getRequestsPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getRequestsSuccess = createAction<IRequestStateContext, IRequest[]>(
    RequestActionsEnum.getRequestsSuccess,
    (Requests: IRequest[]) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        Requests,
    })
);

export const getRequestsError = createAction<IRequestStateContext>(
    RequestActionsEnum.getRequestsError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getRequestPending = createAction<IRequestStateContext>(
    RequestActionsEnum.getRequestPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getRequestSuccess = createAction<IRequestStateContext, IRequest>(
    RequestActionsEnum.getRequestSuccess,
    (request: IRequest) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        request,
    })
);

export const getRequestError = createAction<IRequestStateContext>(
    RequestActionsEnum.getRequestError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const createRequestPending = createAction<IRequestStateContext>(
    RequestActionsEnum.createRequestPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createRequestSuccess = createAction<IRequestStateContext, string>(
    RequestActionsEnum.createRequestSuccess,
    (token: string) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        token: token,
    })
);

export const createRequestError = createAction<IRequestStateContext>(
    RequestActionsEnum.createRequestError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const updateRequestPending = createAction<IRequestStateContext>(
    RequestActionsEnum.updateRequestPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const updateRequestSuccess = createAction<
    IRequestStateContext,
    IRequest
>(RequestActionsEnum.updateRequestSuccess, (request: IRequest) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    request,
}));

export const updateRequestError = createAction<IRequestStateContext>(
    RequestActionsEnum.updateRequestError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const deleteRequestPending = createAction<IRequestStateContext>(
    RequestActionsEnum.deleteRequestPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const deleteRequestSuccess = createAction<
    IRequestStateContext,
    IRequest
>(RequestActionsEnum.deleteRequestSuccess, (request: IRequest) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    request,
}));

export const deleteRequestError = createAction<IRequestStateContext>(
    RequestActionsEnum.deleteRequestError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);