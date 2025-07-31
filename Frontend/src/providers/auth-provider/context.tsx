import { createContext } from "react";
import { ILogin, IRegister, IUser } from "./models";

export interface IAuthStateContext {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    user?: IUser;
}

export interface IAuthActionsContext {
    logIn: (user: ILogin) => Promise<void>;
    register: (user: IRegister) => Promise<void>;
    getCurrentUser: () => void;
    logOut: () => void;
}

export const INITIAL_STATE: IAuthStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
};

export const AuthStateContext = createContext<IAuthStateContext>(INITIAL_STATE);
export const AuthActionContext = createContext<IAuthActionsContext | undefined>(
    undefined
);