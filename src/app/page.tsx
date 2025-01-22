import { DesktopDietTable } from "@/components/tables/desktop-diet-table";

export default function Home() {
    return (
        <div className="py-24">
            <main className="space-y-12 max-w-5xl mx-auto px-6">
                <h1 className="text-4xl font-semibold">Diet Calc</h1>
                <div className="hidden md:block">
                    <DesktopDietTable />
                </div>
                <div className="md:hidden"></div>
            </main>
        </div>
    );
}
