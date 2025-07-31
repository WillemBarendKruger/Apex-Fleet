
import { handleActions } from "redux-actions";
import { INITIAL_STATE, ICategoryStateContext } from "./context";
import { CategoryActionsEnum } from "./actions";

export const CategoryReducer = handleActions<ICategoryStateContext, ICategoryStateContext>(
    {
        [CategoryActionsEnum.getCategoriesPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [CategoryActionsEnum.getCategoriesSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [CategoryActionsEnum.getCategoriesError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [CategoryActionsEnum.getCategoryPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [CategoryActionsEnum.getCategorySuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [CategoryActionsEnum.getCategoryError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [CategoryActionsEnum.createCategoryPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [CategoryActionsEnum.createCategorySuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [CategoryActionsEnum.createCategoryError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    },
    INITIAL_STATE
);
