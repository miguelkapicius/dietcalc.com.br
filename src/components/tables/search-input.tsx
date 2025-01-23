"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { foods } from "@/data/foods";
import { Card, CardDescription, CardHeader } from "../ui/card";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { useDietListContext } from "@/contexts/diet-list-context";

export function SearchInput() {
    const { foodList, setFoods } = useDietListContext();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredFoods = foods.filter((food) =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className="flex flex-col gap-1 w-full relative">
            <div className="relative flex-1">
                <Input
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search"
                    className="relative pl-10"
                />
                <Search className="absolute top-1/2 left-3 size-4 text-muted-foreground -translate-y-1/2" />
            </div>
            {searchQuery !== "" && (
                <div className="absolute top-full mt-2 left-0 w-full z-30">
                    {filteredFoods.length > 0 ? (
                        filteredFoods.map((food) => (
                            <button
                                key={food.id}
                                onClick={() => {
                                    if (!foodList.includes(food)) {
                                        setFoods([...foodList, food]);
                                    }
                                }}
                                className="w-full hover:opacity-90"
                            >
                                <Card>
                                    <CardHeader className="flex-row gap-4 justify-between items-center">
                                        <div className="flex gap-4 items-center">
                                            <div className="size-8 rounded-md relative">
                                                <Image
                                                    src={food.imageUrl}
                                                    alt={food.name}
                                                    className="object-cover absolute"
                                                    fill
                                                />
                                            </div>
                                            <p>{food.name}</p>
                                        </div>
                                        <CardDescription className="flex flex-row">
                                            <span className="flex gap-2 text-center">
                                                {food.kcal}
                                                kcal
                                                <Separator
                                                    orientation={"vertical"}
                                                />
                                            </span>
                                            <span className="flex gap-2 px-2 text-center">
                                                {food.protein}
                                                g protein
                                                <Separator
                                                    orientation={"vertical"}
                                                />
                                            </span>
                                            <span className="flex gap-2 px-2 text-center">
                                                {food.carbs}
                                                g carbs
                                                <Separator
                                                    orientation={"vertical"}
                                                />
                                            </span>
                                            <span className="flex gap-2 px-2 text-center">
                                                {food.fat}g fat
                                            </span>
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </button>
                        ))
                    ) : (
                        <p>No results found</p>
                    )}
                </div>
            )}
        </section>
    );
}
