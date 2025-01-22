import { foods } from "@/data/foods";
import { IFood } from "@/interfaces/food";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function calculateMacros(food: IFood, quantity: number): IFood {
    const factor = quantity / food.defaultQuantity;

    return {
        ...food,
        kcal: food.kcal * factor,
        protein: food.protein * factor,
        carbs: food.carbs * factor,
        fat: food.fat * factor,
    };
}
