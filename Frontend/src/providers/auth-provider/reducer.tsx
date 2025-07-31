import { handleActions } from "redux-actions";
import { INITIAL_STATE, IAuthStateContext } from "./context";
import { AuthActionsEnum } from "./actions";

export const AuthReducer = handleActions<IAuthStateContext, IAuthStateContext>(
    {
        [AuthActionsEnum.logInPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [AuthActionsEnum.logInSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [AuthActionsEnum.logInError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [AuthActionsEnum.logOutPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [AuthActionsEnum.logOutSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
            user: undefined,
        }),
        [AuthActionsEnum.logOutError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [AuthActionsEnum.registerPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [AuthActionsEnum.registerSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [AuthActionsEnum.registerError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [AuthActionsEnum.getCurrentUserPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [AuthActionsEnum.getCurrentUserSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [AuthActionsEnum.getCurrentUserError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    },
    INITIAL_STATE
);