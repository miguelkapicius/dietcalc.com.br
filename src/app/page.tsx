import { DietTable } from "@/components/diet-table";

export default function Home() {
    return (
        <div className="py-24">
            <main className="space-y-12 max-w-5xl mx-auto">
                <h1 className="text-4xl font-semibold">Diet Calc</h1>
                <DietTable />
            </main>
        </div>
    );
}
