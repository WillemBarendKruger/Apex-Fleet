import { createContext } from "react";
import { IRequest } from "./models";

export interface IRequestStateContext {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    Request?: IRequest;
    Requests?: IRequest[];
}

export interface IRequestActionsContext {
    getRequests: () => Promise<void>;
    getRequest: (requestId: string) => Promise<void>;
    createRequest: (Request: IRequest) => Promise<void>;
    updateRequest: (Request: IRequest) => Promise<void>;
    deleteRequest: (RequestID: string) => Promise<void>;
}

export const INITIAL_STATE: IRequestStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
    Requests: [],
};

export const RequestStateContext = createContext<IRequestStateContext>(INITIAL_STATE);
export const RequestActionContext = createContext<IRequestActionsContext | undefined>(
    undefined
);