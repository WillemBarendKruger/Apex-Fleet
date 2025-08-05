"use client"

import { getAxiosInstance } from "@/utils/axiosInstance";
import { INITIAL_STATE, AuthStateContext, AuthActionContext } from "./context";
import { ILogin, IUser } from "./models";
import { AuthReducer } from "./reducer";
import { useContext, useReducer } from "react";
import { useRouter } from "next/navigation";
import { decodeToken, AbpTokenProperies } from "@/utils/jwt";
import { getCurrentUserError, getCurrentUserPending, getCurrentUserSuccess, logInError, logInPending, logInSuccess, logOutError, logOutPending, logOutSuccess, registerError, registerPending, registerSuccess } from "./actions";
import { jwtDecode } from "jwt-decode";
import { message } from "antd/es";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    const instance = getAxiosInstance();
    const router = useRouter();

    const login = async (user: ILogin) => {
        dispatch(logInPending());
        const endpoint = `/TokenAuth/Authenticate`;
        await instance
            .post(endpoint, user)
            .then((response) => {
                const token = response.data.result.accessToken;
                const decoded = decodeToken(token);
                const userRole = decoded[AbpTokenProperies.role];
                const userId = decoded[AbpTokenProperies.nameidentifier];
                const userName = decoded[AbpTokenProperies.name];

                sessionStorage.setItem("token", token);
                sessionStorage.setItem("role", userRole);
                sessionStorage.setItem("userId", userId);
                sessionStorage.setItem("currentUser", userName);

                if (userRole === "Supervisor") {
                    getCurrentUser();
                    router.replace(`/supervisor/dashboard`);
                    message.success("Login successfully!");
                    dispatch(logInSuccess(response.data.result.user));
                } else if (((userRole === "Employee"))) {
                    getCurrentUser();
                    router.replace(`/employee/dashboard`);
                    message.success("Login successfully!");
                    dispatch(logInSuccess(response.data.result.user));
                }
                else {
                    router.replace(`/login`)
                    message.error("Login failed. Please check your credentials.");
                    dispatch(logInError());
                }
            })
            .catch((error) => {
                console.error(error);
                message.error("Login failed. Please check your credentials.");
                dispatch(logInError());
            });
    };

    const register = async (user: IUser) => {
        dispatch(registerPending());
        const endpoint = `services/app/supervisor/Create`;
        await instance
            .post(endpoint, user)
            .then((response) => {
                const token = response.data.result.accessToken;
                const decoded = jwtDecode(token);
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("role", JSON.stringify(decoded));
                dispatch(registerSuccess(user));
                message.success("Registration successfull!");
                dispatch(logOutSuccess());
            })
            .catch((error) => {
                dispatch(registerError());
                message.error("Register failed. Please check your inputs.");
                console.error(error);
            });
    };

    const registerEmployee = async (user: IUser) => {
        dispatch(registerPending());
        const endpoint = `services/app/employee/Create`;
        await instance
            .post(endpoint, user)
            .then((response) => {
                const token = response.data.result.accessToken;
                const decoded = jwtDecode(token);
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("role", JSON.stringify(decoded));
                dispatch(registerSuccess(user));
                message.success("Registration successfull!");
                dispatch(logOutSuccess());
            })
            .catch((error) => {
                dispatch(registerError());
                message.error("Register failed. Please check your inputs.");
                console.error(error);
            });
    };

    const getCurrentUser = async () => {
        dispatch(getCurrentUserPending());
        const endpoint = `services/app/Session/GetCurrentLoginInformations`;

        await instance
            .get(endpoint)
            .then((response) => {
                sessionStorage.setItem("UserInfo", JSON.stringify(response.data.result.user));
                dispatch(getCurrentUserSuccess(response.data.result.user));
            })
            .catch((error) => {
                console.error(error);
                dispatch(getCurrentUserError());
            });

    };

    const logOut = () => {
        try {
            dispatch(logOutPending());
            sessionStorage.clear();
            dispatch(logOutSuccess());
            router.replace("/auth/login");
            message.success("Logged out successfully!");
        } catch {
            dispatch(logOutError());
        }
    };

    return (
        <AuthStateContext.Provider value={state}>
            <AuthActionContext.Provider
                value={{
                    login,
                    register,
                    registerEmployee,
                    getCurrentUser,
                    logOut,
                }}
            >
                {children}
            </AuthActionContext.Provider>
        </AuthStateContext.Provider>
    );
};

export const useAuthState = () => {
    const context = useContext(AuthStateContext);
    if (!context) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return context;
};

export const useAuthActions = () => {
    const context = useContext(AuthActionContext);
    if (!context) {
        throw new Error("useAuthActions must be used within a AuthProvider");
    }
    return context;
};
