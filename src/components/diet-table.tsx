"use client";

import { Minus, Plus } from "lucide-react";
import {
    Table,
    TableCaption,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    TableFooter,
} from "./ui/table";
import { foods } from "@/data/foods";
import { Button } from "./ui/button";
import { useState } from "react";
import { IFood, Unit } from "@/interfaces/food";
import { Input } from "./ui/input";

export function DietTable() {
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

    const STEP_BY_UNIT: Record<Unit, number> = {
        g: 10,
        ml: 5,
        unit: 1,
    };

    return (
        <Table className="border rounded-md text-lg">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead className="w-[100px]">Protein</TableHead>
                    <TableHead className="w-[100px]">Carbs</TableHead>
                    <TableHead className="w-[100px]">Fat</TableHead>
                    <TableHead className="w-[100px]">kcal</TableHead>
                    <TableHead className="w-[100px] text-center">
                        Quantity
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {foods.map((food) =>
                    food ? (
                        <TableRow key={food.id}>
                            <TableCell>{food.name}</TableCell>
                            <TableCell>
                                {(
                                    (food.protein / food.defaultQuantity) *
                                    quantities[food.id]
                                ).toFixed(1)}{" "}
                                {food.unit}
                            </TableCell>
                            <TableCell>
                                {(
                                    (food.carbs / food.defaultQuantity) *
                                    quantities[food.id]
                                ).toFixed(1)}{" "}
                                {food.unit}
                            </TableCell>
                            <TableCell>
                                {(
                                    (food.fat / food.defaultQuantity) *
                                    quantities[food.id]
                                ).toFixed(1)}{" "}
                                {food.unit}
                            </TableCell>
                            <TableCell>
                                {(
                                    (food.kcal / food.defaultQuantity) *
                                    quantities[food.id]
                                ).toFixed(1)}
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center justify-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 shrink-0 rounded-full"
                                        onClick={() =>
                                            adjustQuantity(
                                                food.id,
                                                -1,
                                                food.unit
                                            )
                                        }
                                    >
                                        <Minus />
                                        <span className="sr-only">
                                            Decrease
                                        </span>
                                    </Button>
                                    <Input
                                        className="text-center"
                                        type="number"
                                        value={quantities[food.id]}
                                        onChange={(e) =>
                                            setQuantities((prev) => ({
                                                ...prev,
                                                [food.id]: Number(
                                                    e.target.value
                                                ),
                                            }))
                                        }
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 shrink-0 rounded-full"
                                        onClick={() =>
                                            adjustQuantity(
                                                food.id,
                                                +1,
                                                food.unit
                                            )
                                        }
                                    >
                                        <Plus />
                                        <span className="sr-only">
                                            Increase
                                        </span>
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : null
                )}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-end"></TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
