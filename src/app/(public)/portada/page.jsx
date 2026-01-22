"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Outfit } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Layers, LayoutPanelTop, Package, Scroll } from "lucide-react";
import {Cormorant_Garamond} from "next/font/google";
import PortadaCarrusel from "@/Componentes/portadaCarrusel";
import {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import CarruselPortadaMoviles from "@/Componentes/CarruselPortadaMoviles";
import PortadaCelulares from "@/app/(public)/portadaCelulares/page";


export default function Portada() {
    const API = process.env.NEXT_PUBLIC_API_URL;
    const PORTADA = 'portada';
    const CARD = 'card';
    const FULL = 'full';

    const [dataPublicacionesCarrusel, setdataPublicacionesCarrusel] = useState([]);


    async function seleccionarPortadasCarrusel() {
        try {
            const res = await fetch(`${API}/carruselPortada/seleccionarCarruselPortada`, {
                method: "GET",
                headers: {Accept: "application/json,"},
                mode: "cors",
            })

            if(!res.ok) {
                return toast.error('No ha sido posible cargar las imagenes del carrusel porfavor contacte a soporte de NativeCode');

            }else{

                const dataCarrusel = await res.json();
                setdataPublicacionesCarrusel(dataCarrusel);
            }
        }catch (error) {
            return toast.error('No ha sido posible cargar las imagenes del carrusel porfavor contacte a soporte de NativeCode');
        }
    }

    useEffect(() => {
        seleccionarPortadasCarrusel();
    },[])

   const listaImagenes = dataPublicacionesCarrusel.map((portada) =>
       `https://imagedelivery.net/aCBUhLfqUcxA2yhIBn1fNQ/${portada.imagenPortada}/${PORTADA}`
   );




    return (
<div>
<div className="hidden md:block">
    <PortadaCarrusel images={listaImagenes} />
</div>

<PortadaCelulares/>




    {/*PORTADA PARTE BAJA ESCRITORIO DE CELULARES*/}
    <div className="block md:hidden">
        <div className="mx-auto mt-10 sm:mt-14 lg:mt-20 px-4 sm:px-8 lg:px-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
                <div className="flex flex-col gap-4 text-center items-center">

                    <div className="flex justify-center -mt-10">
                        <div className="group rounded-full w-36 h-36 sm:w-44 sm:h-44 lg:w-32 lg:h-32 overflow-hidden ring-1 ring-white/10 hover:ring-amber-400/60 hover:shadow-lg transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                            <img
                                className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:-translate-y-1"
                                src={'/laser.png'}
                                alt={'laser'}
                                width={100}
                                height={100}
                            />
                        </div>
                    </div>
                    <h1 className='text-base tracking-wide'><span className='font-bold'>Tecnología Trilaser:</span>  longitudes de onda para máxima eficacia.</h1>
                </div>


<br/>

                <div className="flex flex-col gap-4 text-center items-center -mt-10">
                    <div className="flex justify-center">
                        <div className="group rounded-full w-36 h-36 sm:w-44 sm:h-44 lg:w-32 lg:h-32 overflow-hidden ring-1 ring-white/10 hover:ring-amber-400/60 hover:shadow-lg transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                            <img
                                className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:-translate-y-1"
                                src={'/fresco.png'}
                                alt={'laser'}
                                width={100}
                                height={100}
                            />
                        </div>
                    </div>
                    <h1 className='text-base tracking-wide'><span className='font-bold'>100%</span> Indoloro: Gracias a nuestro sistema de enfriamiento avanzado.</h1>
                </div>


                <br/>


                <div className="flex flex-col gap-4 text-center items-center">

                    <div className="flex justify-center -mt-10">
                        <div className="group rounded-full w-36 h-36 sm:w-44 sm:h-44 lg:w-32 lg:h-32 overflow-hidden ring-1 ring-white/10 hover:ring-amber-400/60 hover:shadow-lg transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                            <img
                                className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:-translate-y-1"
                                src={'/escudo.png'}
                                alt={'laser'}
                                width={100}
                                height={100}
                            />
                        </div>
                    </div>
                    <h1 className='text-base tracking-wide'><span className='font-bold'>Expertos en Piel:</span>Adiós a los vellos encarnados y manchas.</h1>
                </div>
            </div>
        </div>
    </div>














    {/*PORTADA PARTE BAJA ESCRITORIO DE COMPUTADORES*/}
   <div className="hidden md:block">
       <div className="mx-auto mt-10 sm:mt-14 lg:mt-20 px-4 sm:px-8 lg:px-20">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
               <div className="flex flex-col gap-4 text-center items-center">

                   <div className="flex justify-center -mt-10">
                       <div className="group rounded-full w-36 h-36 sm:w-44 sm:h-44 lg:w-32 lg:h-32 overflow-hidden ring-1 ring-white/10 hover:ring-amber-400/60 hover:shadow-lg transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                           <img
                               className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:-translate-y-1"
                               src={'/laser.png'}
                               alt={'laser'}
                               width={100}
                               height={100}
                           />
                       </div>
                   </div>
                   <h1 className='text-2xl tracking-wide'><span className='font-bold'>Tecnología Trilaser:</span>  longitudes de onda para máxima eficacia.</h1>
               </div>




               <div className="flex flex-col gap-4 text-center items-center -mt-10">
                   <div className="flex justify-center">
                       <div className="group rounded-full w-36 h-36 sm:w-44 sm:h-44 lg:w-32 lg:h-32 overflow-hidden ring-1 ring-white/10 hover:ring-amber-400/60 hover:shadow-lg transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                           <img
                               className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:-translate-y-1"
                               src={'/fresco.png'}
                               alt={'laser'}
                               width={100}
                               height={100}
                           />
                       </div>
                   </div>
                   <h1 className='text-2xl tracking-wide'><span className='font-bold'>100%</span> Indoloro: Gracias a nuestro sistema de enfriamiento avanzado.</h1>
               </div>





               <div className="flex flex-col gap-4 text-center items-center">

                   <div className="flex justify-center -mt-10">
                       <div className="group rounded-full w-36 h-36 sm:w-44 sm:h-44 lg:w-32 lg:h-32 overflow-hidden ring-1 ring-white/10 hover:ring-amber-400/60 hover:shadow-lg transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                           <img
                               className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:-translate-y-1"
                               src={'/escudo.png'}
                               alt={'laser'}
                               width={100}
                               height={100}
                           />
                       </div>
                   </div>
                   <h1 className='text-2xl tracking-wide'><span className='font-bold'>Expertos en Piel:</span>Adiós a los vellos encarnados y manchas.</h1>
               </div>
           </div>
       </div>
   </div>
    <br/> <br/> <br/>
</div>

  );
}