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

export default function PortadaCelulares() {
    return (
        <div>
            {/*CELULARES*/}
            <section className="relative isolate overflow-hidden min-h-[85vh] block md:hidden">
                {/* Background */}
                <div className="absolute inset-0 -z-10">
                    <Image
                        src="/portadacel2.png"
                        alt="Depilación Láser - Fondo"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-[78%_18%]"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_70%_30%,rgba(34,211,238,0.30)_0%,rgba(0,0,0,0)_62%)]" />
                </div>


       <div className="w-auto">

           <h1 className={`p-6 text-start text-5xl  font-bold 
           
            text-sky-900
           `}>
               Depilación <span className=" bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-600 bg-clip-text text-transparent">Trilaser</span> Indolora: Tu piel suave y libre todo el año.
           </h1>

<p className='text-base p-10 tracking-wide text-gray-600 font-semibold'>
    Resultados reales desde la primera sesión. Tecnología de vanguardia para eliminar el vello, la irritación y la foliculitis definitivamente.
</p>

{/* Sellos de confianza */}
<div className="px-6 pb-4">
  <div className="grid grid-cols-3 gap-3">
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white/70 backdrop-blur-md border border-white/40 shadow-2xl py-3">
      <span className="text-[11px] font-extrabold tracking-wide text-sky-900">CALIDAD</span>
    </div>
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white/70 backdrop-blur-md border border-white/40 shadow-2xl py-3">
      <span className="text-[11px] font-extrabold tracking-wide text-sky-900">CUIDADO</span>
    </div>
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white/70 backdrop-blur-md border border-white/40 shadow-2xl py-3">
      <span className="text-[11px] font-extrabold tracking-wide text-sky-900">SUAVIDAD</span>
    </div>
  </div>
</div>




           <div className=" flex flex-col gap-3 sm:flex-row sm:items-center ml-3 mt-2">
               <Link href="/AgendaProceso" className="w-full sm:w-auto">
                   <Button
                       size="lg"
                       className="w-60 sm:w-auto rounded-full bg-gradient-to-r from-cyan-600 via-indigo-400 to-indigo-600 px-10 py-6 text-xs font-extrabold text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
                   >
                       AGENDA TU EVALUACIÓN
                       <span className="text-white/90">→</span>
                   </Button>
               </Link>

               <br/> <br/>


           </div>
       </div>




            </section>
        </div>

    );
}