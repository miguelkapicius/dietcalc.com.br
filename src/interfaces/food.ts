export type Unit = "g" | "ml" | "unit";
export type Category = "Protein" | "Carbs" | "Fat";

export interface IFood {
    id: string;
    name: string;
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
    unit: Unit;
    defaultQuantity: number;
    category: Category;
    imageUrl: string;
}
