"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

export function InfoButton({ informacion }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative inline-flex">
            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setOpen((prev) => !prev)}
                className="h-12 w-35 border border-indigo-200 bg-white text-indigo-600 shadow-sm transition-all hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-md focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
                <HelpCircle className="h-10 w-10" />
                Informacion
            </Button>

            {open && (
                <>
                    <button
                        type="button"
                        aria-label="Cerrar informacion"
                        className="fixed inset-0 z-40 cursor-default bg-transparent"
                        onClick={() => setOpen(false)}
                    />
                    <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-[min(24rem,calc(100vw-2rem))] rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm leading-relaxed text-slate-700 shadow-xl">
                        <div className="space-y-2">
                            {typeof informacion === "string"
                                ? informacion.split("\n").map((line, index) => (
                                    <p key={index} className="text-slate-700">
                                        {line}
                                    </p>
                                ))
                                : informacion}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
