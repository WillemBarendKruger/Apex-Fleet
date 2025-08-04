import { createContext } from "react";
import { ILogin, IRegister, IUser } from "./models";

export interface IAuthStateContext {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    user?: IUser;
    users?: IUser[];
}

export interface IAuthActionsContext {
    login: (user: ILogin) => Promise<void>;
    register: (user: IRegister) => Promise<void>;
    registerEmployee: (user: IRegister) => Promise<void>;
    getCurrentUser: () => Promise<void>;
    logOut: () => void;
}

export const INITIAL_STATE: IAuthStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
    users: [],
};

export const AuthStateContext = createContext<IAuthStateContext>(INITIAL_STATE);
export const AuthActionContext = createContext<IAuthActionsContext | undefined>(
    undefined
);