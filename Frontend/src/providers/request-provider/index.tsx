"use client";
import { getAxiosInstance } from "@/utils/axiosInstance";
import {
    INITIAL_STATE,
    RequestStateContext,
    RequestActionContext,
} from "./context";
import { RequestReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
    createRequestError,
    createRequestPending,
    createRequestSuccess,
    deleteRequestError,
    deleteRequestPending,
    deleteRequestSuccess,
    getRequestsError,
    getRequestsPending,
    getRequestsSuccess,
    updateRequestError,
    updateRequestPending,
    updateRequestSuccess,
} from "./actions";
import { IRequest } from "./models";
import { message } from "antd";

export const RequestsProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(RequestReducer, INITIAL_STATE);
    const instance = getAxiosInstance();

    const getRequests = async () => {
        dispatch(getRequestsPending());
        const endpoint = `services/app/Request/GetAll`;
        await instance
            .get(endpoint)
            .then((response) => {
                const filteredData = response.data.result.items.map((Request: IRequest) => ({
                    id: Request.id,
                    status: Request.status,
                    description: Request.description,
                    getDate: Request.getDate,
                    returnDate: Request.returnDate,
                    equipmentId: Request.equipmentId,
                    equipmentName: Request.equipmentName,
                    requestingEmployeeEmail: Request.requestingEmployeeEmail,
                    requestingEmployeeId: Request.requestingEmployeeId
                }));
                dispatch(getRequestsSuccess(filteredData));
            })
            .catch((error) => {
                dispatch(getRequestsError());
                console.error("Error message", error);
            });
    };

    const getRequest = async (requestId: string) => {
        dispatch(getRequestsPending());
        const endpoint = `services/app/Request/Get?Id=${requestId}`;
        await instance
            .get(endpoint)
            .then((response) => {
                const filteredData = response.data.result.items.map((Request: IRequest) => ({
                    id: Request.id,
                    status: Request.status,
                    description: Request.description,
                    getDate: Request.getDate,
                    returnDate: Request.returnDate,
                    equipmentId: Request.equipmentId,
                    equipmentName: Request.equipmentName,
                    requestingEmployeeEmail: Request.requestingEmployeeEmail,
                    requestingEmployeeId: Request.requestingEmployeeId
                }));
                dispatch(getRequestsSuccess(filteredData));
            })
            .catch((error) => {
                dispatch(getRequestsError());
                console.error("Error message", error);
            });
    };

    const createRequest = async (Request: IRequest) => {
        dispatch(createRequestPending());
        const endpoint = `services/app/Request/Create`;

        await instance
            .post(endpoint, Request)
            .then((response) => {
                dispatch(createRequestSuccess(response.data.data));
                getRequests();
            })
            .catch((error) => {
                dispatch(createRequestError());
                console.error(error);
            });
    };

    const updateRequest = async (request: IRequest) => {
        dispatch(updateRequestPending());
        const endpoint = `services/app/Request/Update`;
        await instance
            .put(endpoint, request)
            .then((response) => {
                dispatch(updateRequestSuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(updateRequestError());
            });
    };

    const deleteRequest = async (requestId: string) => {
        dispatch(deleteRequestPending());
        const endpoint = `services/app/Request/Delete?Id=${requestId}`;
        await instance
            .delete(endpoint)
            .then((response) => {
                dispatch(deleteRequestSuccess(response.data));
                message.success("Request deleted successfully.");
            })
            .catch((error) => {
                console.error(error);
                dispatch(deleteRequestError());
                message.error("Failed to delete request.");
            });
    };


    return (
        <RequestStateContext.Provider value={state}>
            <RequestActionContext.Provider
                value={{
                    getRequests,
                    getRequest,
                    createRequest,
                    updateRequest,
                    deleteRequest
                }}
            >
                {children}
            </RequestActionContext.Provider>
        </RequestStateContext.Provider>
    );
};

export const useRequestState = () => {
    const context = useContext(RequestStateContext);
    if (!context) {
        throw new Error("useRequestState must be used within a RequestsProvider");
    }
    return context;
};

export const useRequestActions = () => {
    const context = useContext(RequestActionContext);
    if (!context) {
        throw new Error("useRequestActions must be used within a RequestsProvider");
    }
    return context;
};