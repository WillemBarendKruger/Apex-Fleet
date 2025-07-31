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
import { message } from "antd";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    const instance = getAxiosInstance();
    const router = useRouter();

    const logIn = async (user: ILogin) => {
        dispatch(logInPending());
        const endpoint = `/TokenAuth/Authenticate`;
        await instance
            .post(endpoint, user)
            .then((response) => {
                const token = response.data.result.accessToken;
                const decoded = decodeToken(token);
                const userRole = decoded[AbpTokenProperies.role];
                const userId = decoded[AbpTokenProperies.nameidentifier];

                sessionStorage.setItem("token", token);
                sessionStorage.setItem("role", userRole);
                sessionStorage.setItem("userId", userId);

                // currentUser();
                dispatch(logInSuccess(token));
                message.success;

                const { role } = decodeToken(token);

                if (role === "Supervisor") {
                    router.replace(`/supervisor/dashboard`);
                } else if (((role === "Employee"))) {
                    router.replace(`/employee/dashboard`);
                }
                else {
                    router.replace(`/login`)
                }
            })
            .catch((error) => {
                console.error(error);
                message.error;
                dispatch(logInError());
            });
    };

    const register = async (user: IUser) => {
        dispatch(registerPending());
        const endpoint =
            user.roleName === "Supervisor"
                ? `services/app/Employee/Create`
                : `services/app/Supervisor/Create`;
        await instance
            .post(endpoint, user)
            .then((response) => {
                const token = response.data.result.accessToken;
                const decoded = jwtDecode(token);
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("role", JSON.stringify(decoded));
                dispatch(registerSuccess(user));
                message.success;
                // dispatch(logOutSuccess());
            })
            .catch((error) => {
                dispatch(registerError());
                message.error;
                console.error(error);
            });
    };

    const getCurrentUser = async () => {
        dispatch(getCurrentUserPending());
        const endpoint = `services/app/Session/GetCurrentLoginInformations`;
        await instance
            .get(endpoint)
        await instance
            .get(endpoint)
            .then((response) => {
                const result = response.data.result.user;
                const user = result || "";
                sessionStorage.setItem("user", user);

                // const result2 = response.data.result.user.name;

                // const serviceProviderName = result2 || "";

                // sessionStorage.setItem("serviceProviderName", serviceProviderName);

                sessionStorage.setItem(
                    "currentUser",
                    JSON.stringify(response.data.result.user.id)
                );
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
            sessionStorage.removeItem("token");
            dispatch(logOutSuccess());
            router.replace("/auth/login");
        } catch {
            dispatch(logOutError());
        }
    };

    return (
        <AuthStateContext.Provider value={state}>
            <AuthActionContext.Provider
                value={{
                    logIn,
                    register,
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