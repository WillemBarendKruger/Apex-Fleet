"use client";
import { getAxiosInstance } from "@/utils/axiosInstance";
import {
    INITIAL_STATE,
    CategoryStateContext,
    CategoryActionContext,
} from "./context";
import { CategoryReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
    createCategoryError,
    createCategoryPending,
    createCategorySuccess,
    getCategoriesError,
    getCategoriesPending,
    getCategoriesSuccess,
    getCategoryError,
    getCategoryPending,
    getCategorySuccess,
} from "./actions";
import { ICategory } from "./models";

export const CategoriesProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(CategoryReducer, INITIAL_STATE);
    const instance = getAxiosInstance();

    const getCategories = async () => {
        dispatch(getCategoriesPending());
        const endpoint = `services/app/Category/GetAll`;
        await instance
            .get(endpoint)
            .then((response) => {
                const filteredData = response.data.result.items.map((Category: ICategory) => ({
                    type: Category.type
                }));
                dispatch(getCategoriesSuccess(filteredData));
            })
            .catch((error) => {
                dispatch(getCategoriesError());
                console.error("Error message", error);
            });
    };

    const getCategory = async (id: string) => {
        dispatch(getCategoryPending());
        const endpoint = `services/app/Category/Get?Id=${id}`;
        await instance
            .get(endpoint)
            .then((response) => {
                dispatch(getCategorySuccess(response.data));
            })
            .catch((error) => {
                console.error(error);
                dispatch(getCategoryError());
            });
    };


    const createCategory = async (Category: ICategory) => {
        dispatch(createCategoryPending());
        const endpoint = `services/app/Category/Create`;

        await instance
            .post(endpoint, Category)
            .then((response) => {
                dispatch(createCategorySuccess(response.data.result));
                getCategories();
            })
            .catch((error) => {
                dispatch(createCategoryError());
                console.error(error);
            });
    };

    return (
        <CategoryStateContext.Provider value={state}>
            <CategoryActionContext.Provider
                value={{
                    getCategories,
                    getCategory,
                    createCategory,
                }}
            >
                {children}
            </CategoryActionContext.Provider>
        </CategoryStateContext.Provider>
    );
};

export const useCategoryState = () => {
    const context = useContext(CategoryStateContext);
    if (!context) {
        throw new Error("useCategoryState must be used within a CategorysProvider");
    }
    return context;
};

export const useCategoryActions = () => {
    const context = useContext(CategoryActionContext);
    if (!context) {
        throw new Error("useCategoryActions must be used within a CategorysProvider");
    }
    return context;
};