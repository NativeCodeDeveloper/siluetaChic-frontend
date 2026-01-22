"use client";
import { Phone, Mail, Facebook, Instagram, MapPin } from "lucide-react";
import { FaWhatsapp, FaTiktok } from "react-icons/fa";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Calendar } from "lucide-react";

export default function SeccionContacto() {
    return (
<div className='
bg-gradient-to-r
from-purple-500
via-indigo-500
to-cyan-400
py-20 flex flex-col justify-center items-center'>

<div className='flex flex-col justify-center items-center'>

    <div >
        <div>
            <div className="flex justify-center mt-6 p-6 ">
                <h1 className="text-center text-4xl md:text-5xl font-bold text-white">
                  ¿Lista para transformar tu piel?
                </h1>
            </div>

            <div className="flex justify-center text-white mt-2 px-6">
                <p className="text-center text-base md:text-lg max-w-2xl">
                  Agenda tu evaluación gratuita y descubre cómo la depilación triláser puede cambiar tu vida
                </p>
            </div>



            <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 px-6 md:flex-row md:gap-6">

                <Link href={'/AgendaProceso'}>
                    <div className=''>

                            <button
                                className="
                          group
                          w-full sm:w-[320px]
                          p-3
                          bg-white text-indigo-600 text-xl md:text-2xl font-bold
                          border rounded-[2rem] ring-1 shadow-lg
                          flex items-center justify-center
                          transition-all duration-300 ease-out
                          hover:bg-indigo-600 hover:text-white
                          hover:shadow-xl hover:-translate-y-1
                          active:translate-y-0
                        "
                                aria-label="Llamar al +56 9 7717 3029"
                            >
                                <Calendar className="mr-3 h-6 w-6 text-indigo-500  transition-colors duration-300 group-hover:text-white"/>


                                <span>AGENDAR HORA</span>
                            </button>

                    </div>
                </Link>





                <div className=''>
                    <a
                      href="https://wa.me/56977173029"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full md:w-auto"
                    >
                      <button
                        className="
                          group
                          w-full sm:w-[320px]
                          p-3
                          bg-[#25D366] text-xl md:text-2xl font-bold
                          rounded-[2rem] shadow-lg text-white
                          flex items-center justify-center
                          transition-all duration-300 ease-out
                          hover:bg-[#1EBE5D] hover:shadow-xl hover:-translate-y-1
                          active:translate-y-0
                        "
                        aria-label="Abrir WhatsApp"
                      >
                        <FaWhatsapp className="mr-3 h-6 w-6 text-white transition-colors duration-300 group-hover:text-white" />
                        <span>WhatsApp</span>
                      </button>
                    </a>
                </div>


        <Link href={'/catalogo'}>
            <div className=''>

                    <button
                        className="
                          group
                          w-full sm:w-[320px]
                          p-3
                          text-white text-xl md:text-2xl font-bold
                          border rounded-[2rem] ring-1 shadow-lg
                          flex items-center justify-center
                          transition-all duration-300 ease-out
                          hover:bg-white hover:text-indigo-600
                          hover:shadow-xl hover:-translate-y-1
                          active:translate-y-0
                        "
                        aria-label="Enviar correo a siluetachicestudio@gmail.com"
                    >
                        <ShoppingCart className="mr-3 h-6 w-6 text-white transition-colors duration-300 group-hover:text-indigo-600"  />

                        <span>COMPRAR AHORA</span>
                    </button>

            </div>

        </Link>



            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 px-6">








            </div>
        </div>
    </div>
</div>

</div>
    );
}