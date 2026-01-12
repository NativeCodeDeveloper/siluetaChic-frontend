"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Outfit } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Layers, LayoutPanelTop, Package, Scroll } from "lucide-react";
import {Cormorant_Garamond} from "next/font/google";

const comorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight:["400"]
})

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["900"],
});

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export default function Portada() {
  return (
<div>
    {/*ESCRITORIO*/}
    <section className="relative isolate overflow-hidden min-h-[75vh] hidden md:block ">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
            <Image
                src="/portada3.png"
                alt="Depilación Láser - Fondo"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[78%_18%] sm:object-[80%_22%] lg:object-[82%_20%]"
            />
            <div className="absolute inset-0 " />
            <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_70%_35%,rgba(34,211,238,0.28)_0%,rgba(0,0,0,0)_60%)]" />
        </div>

        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
                {/* Left */}
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: { opacity: 0, y: 18 },
                        show: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.55, ease: "easeOut" },
                        },
                    }}
                    className="lg:col-span-8"
                >


                    <h1
                        className={`${comorant.className} mt-5 text-balance text-6xl font-medium leading-tight tracking-tight text-[#2b2b2b] sm:text-5xl lg:text-6xl`}
                    >
                        Depilación Trilaser
                        <span className="text-[#c7a458]"> Indolora:</span>
                        {" "}Tu piel suave y libre todo el año.
                    </h1>

                    <p className="mt-4 max-w-2xl text-pretty text-base font-semibold leading-relaxed text-gray-800 sm:text-lg">
                        Resultados reales desde la primera sesión. Tecnología de vanguardia para eliminar el vello, la irritación y la foliculitis definitivamente.
                    </p>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Link href="/agenda" className="w-full sm:w-auto">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#d6b46a] via-[#e7c97c] to-[#c9a24d] px-10 py-6 text-base font-extrabold text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
                            >
                                AGENDA TU EVALUACIÓN GRATUITA
                                <span className="text-white/90">→</span>
                            </Button>
                        </Link>


                    </div>
                </motion.div>

                {/* Right */}

            </div>
        </div>
    </section>


    
</div>

  );
}