import { createContext } from "react";
import { ICategory } from "./models";

export interface ICategoryStateContext {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    Category?: ICategory;
    Categorys?: ICategory[];
}

export interface ICategoryActionsContext {
    getCategories: () => Promise<void>;
    getCategory: (categoryId: string) => Promise<void>;
    createCategory: (Category: ICategory) => Promise<void>;
}

export const INITIAL_STATE: ICategoryStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
    Categorys: [],
};

export const CategoryStateContext = createContext<ICategoryStateContext>(INITIAL_STATE);
export const CategoryActionContext = createContext<ICategoryActionsContext | undefined>(
    undefined
);