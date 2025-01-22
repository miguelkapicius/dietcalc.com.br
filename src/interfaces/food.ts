export type Unit = "g" | "ml" | "unit";

export interface IFood {
    id: string;
    name: string;
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
    unit: Unit;
    defaultQuantity: number;
}
