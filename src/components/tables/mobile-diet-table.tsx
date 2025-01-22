import { foods } from "@/data/foods";
import { Unit } from "@/interfaces/food";
import { STEP_BY_UNIT } from "@/lib/constants";
import { useState } from "react";
import { Table, TableHeader } from "../ui/table";

export function MobileDietTable() {
    const [quantities, setQuantities] = useState(
        foods.reduce((acc, food) => {
            acc[food.id] = food.defaultQuantity;
            return acc;
        }, {} as Record<string, number>)
    );

    function adjustQuantity(id: string, adjustment: number, unit: Unit) {
        const step = STEP_BY_UNIT[unit] || 1;
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [id]: Math.max(0, prevQuantities[id] + adjustment * step),
        }));
    }

    return (
        <Table>
            <TableHeader></TableHeader>
        </Table>
    );
}
