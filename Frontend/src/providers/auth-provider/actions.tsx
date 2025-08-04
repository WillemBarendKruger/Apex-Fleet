import { createAction } from "redux-actions";
import { IUser } from "./models";
import { IAuthStateContext } from "./context";

export enum AuthActionsEnum {
    logInPending = "LOG_IN_PENDING",
    logInSuccess = "LOG_IN_SUCCESS",
    logInError = "LOG_IN_ERROR",

    registerPending = "REGISTER_PENDING",
    registerSuccess = "REGISTER_SUCCESS",
    registerError = "REGISTER_ERROR",

    getCurrentUserPending = "GET_CURRENT_USER_PENDING",
    getCurrentUserSuccess = "GET_CURRENT_USER_SUCCESS",
    getCurrentUserError = "GET_CURRENT_USER_ERROR",

    logOutPending = "LOG_OUT_PENDING",
    logOutSuccess = "LOG_OUT_SUCCESS",
    logOutError = "LOG_OUT_ERROR",

}

export const logInPending = createAction<IAuthStateContext>(
    AuthActionsEnum.logInPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const logInSuccess = createAction<IAuthStateContext, string>(
    AuthActionsEnum.logInSuccess,
    (token: string) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        token: token,
    })
);

export const logInError = createAction<IAuthStateContext>(
    AuthActionsEnum.logInError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const registerPending = createAction<IAuthStateContext>(
    AuthActionsEnum.registerPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const registerSuccess = createAction<IAuthStateContext, IUser>(
    AuthActionsEnum.registerSuccess,
    (user: IUser) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        user,
    })
);

export const registerError = createAction<IAuthStateContext>(
    AuthActionsEnum.registerError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getCurrentUserPending = createAction<IAuthStateContext>(
    AuthActionsEnum.getCurrentUserPending,

    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getCurrentUserSuccess = createAction<
    IAuthStateContext,
    IUser
>(
    AuthActionsEnum.getCurrentUserSuccess,

    (user: IUser) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        user,
    })
);

export const getCurrentUserError = createAction<IAuthStateContext>(
    AuthActionsEnum.getCurrentUserError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const logOutPending = createAction<IAuthStateContext>(
    AuthActionsEnum.logOutPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const logOutSuccess = createAction<IAuthStateContext>(
    AuthActionsEnum.logOutSuccess,
    () => ({
        isPending: false,
        isSuccess: true,
        isError: false,
    })
);

export const logOutError = createAction<IAuthStateContext>(
    AuthActionsEnum.logOutError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);