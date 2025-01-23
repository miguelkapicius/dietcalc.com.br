"use client";

import { Minus, Plus, Search } from "lucide-react";
import { foods } from "@/data/foods";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import { IFood, Unit } from "@/interfaces/food";
import { Input } from "../ui/input";
import { STEP_BY_UNIT } from "@/lib/constants";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { useDietListContext } from "@/contexts/diet-list-context";
import { SearchInput } from "./search-input";

export function DietTable() {
    const { foodList } = useDietListContext();

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
        <div className="space-y-12">
            <header className="flex flex-col gap-2 md:flex-row items-start justify-between">
                <h2 className="text-xl">Diet Table</h2>
                <div className="flex gap-4 max-w-2xl w-full">
                    <SearchInput />
                </div>
            </header>
            <main className="space-y-6">
                {foodList.map((food: IFood) => (
                    <Card key={food.id} className="space-y-4">
                        <CardHeader className="md:flex-row md:justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="size-16 relative rounded-md">
                                    <Image
                                        className="rounded-md absolute object-cover"
                                        draggable={false}
                                        src={food.imageUrl}
                                        alt={food.name}
                                        fill
                                    />
                                </div>
                                <div className="space-y-1">
                                    <CardTitle>{food.name}</CardTitle>
                                    <CardDescription className="flex flex-row items-center gap-2">
                                        <span className="size-2 rounded-full bg-red-500" />
                                        {food.category}
                                    </CardDescription>
                                </div>
                            </div>
                            <div className="flex items-center justify-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 shrink-0 rounded-full"
                                    onClick={() =>
                                        adjustQuantity(food.id, -1, food.unit)
                                    }
                                >
                                    <Minus />
                                    <span className="sr-only">Decrease</span>
                                </Button>
                                <Input
                                    className="text-center"
                                    type="number"
                                    value={quantities[food.id]}
                                    onChange={(e) =>
                                        setQuantities((prev) => ({
                                            ...prev,
                                            [food.id]: Number(e.target.value),
                                        }))
                                    }
                                />
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 shrink-0 rounded-full"
                                    onClick={() =>
                                        adjustQuantity(food.id, +1, food.unit)
                                    }
                                >
                                    <Plus />
                                    <span className="sr-only">Increase</span>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="flex flex-col gap-2 sm:flex-row">
                                <span className="flex gap-2 text-center">
                                    {(
                                        (food.kcal / food.defaultQuantity) *
                                        quantities[food.id]
                                    ).toFixed(1)}
                                    {" kcal"}
                                    <Separator orientation={"vertical"} />
                                </span>
                                <span className="flex gap-2 md:px-2 text-center">
                                    {(
                                        (food.protein / food.defaultQuantity) *
                                        quantities[food.id]
                                    ).toFixed(2)}
                                    {" g protein"}
                                    <Separator orientation={"vertical"} />
                                </span>
                                <span className="flex gap-2 md:px-2 text-center">
                                    {(
                                        (food.carbs / food.defaultQuantity) *
                                        quantities[food.id]
                                    ).toFixed(2)}
                                    {" g carbs"}
                                    <Separator orientation={"vertical"} />
                                </span>
                                <span className="flex gap-2 md:px-2 text-center">
                                    {(
                                        (food.fat / food.defaultQuantity) *
                                        quantities[food.id]
                                    ).toFixed(2)}
                                    {" g fat"}
                                </span>
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </main>
        </div>
    );
}
