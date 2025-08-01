import { createAction } from "redux-actions";
import { ICategory } from "../category-provider/models";
import { ICategoryStateContext } from "../category-provider/context";

export enum CategoryActionsEnum {
    getCategoriesPending = "GET_CATEGORIES_PENDING",
    getCategoriesSuccess = "GET_CATEGORIES_SUCCESS",
    getCategoriesError = "GET_CATEGORIES_ERROR",

    getCategoryPending = "GET_CATEGORY_PENDING",
    getCategorySuccess = "GET_CATEGORY_SUCCESS",
    getCategoryError = "GET_CATEGORY_ERROR",

    createCategoryPending = "CREATE_CATEGORY_PENDING",
    createCategorySuccess = "CREATE_CATEGORY_SUCCESS",
    createCategoryError = "CREATE_CATEGORY_ERROR",
}

export const getCategoriesPending = createAction<ICategoryStateContext>(
    CategoryActionsEnum.getCategoriesPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getCategoriesSuccess = createAction<ICategoryStateContext, ICategory[]>(
    CategoryActionsEnum.getCategoriesSuccess,
    (Categories: ICategory[]) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        Categories,
    })
);

export const getCategoriesError = createAction<ICategoryStateContext>(
    CategoryActionsEnum.getCategoriesError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getCategoryPending = createAction<ICategoryStateContext>(
    CategoryActionsEnum.getCategoryPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getCategorySuccess = createAction<ICategoryStateContext, ICategory>(
    CategoryActionsEnum.getCategorySuccess,
    (Category: ICategory) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        Category,
    })
);

export const getCategoryError = createAction<ICategoryStateContext>(
    CategoryActionsEnum.getCategoryError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);

export const createCategoryPending = createAction<ICategoryStateContext>(
    CategoryActionsEnum.createCategoryPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createCategorySuccess = createAction<ICategoryStateContext, string>(
    CategoryActionsEnum.createCategorySuccess,
    (token: string) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        token: token,
    })
);

export const createCategoryError = createAction<ICategoryStateContext>(
    CategoryActionsEnum.createCategoryError,
    () => ({ isPending: false, isSuccess: false, isError: true })
);