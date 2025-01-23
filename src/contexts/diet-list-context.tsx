"use client";
import { IFood } from "@/interfaces/food";
import { createContext, useContext, useState } from "react";

interface IDietListContext {
    foodList: IFood[];
    setFoods: React.Dispatch<React.SetStateAction<any[]>>;
}

const DietListContext = createContext<IDietListContext>({} as IDietListContext);

export const DietListProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [foodList, setFoods] = useState<IFood[]>([]);
    return (
        <DietListContext.Provider value={{ foodList, setFoods }}>
            {children}
        </DietListContext.Provider>
    );
};

export const useDietListContext = () => {
    const context = useContext(DietListContext);
    if (!context)
        throw new Error(
            "useDietListContext must be used within a DietListProvider"
        );
    return context;
};
