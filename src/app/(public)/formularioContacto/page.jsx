"use client";

import {useState} from "react";
import {ShadcnButton} from "@/Componentes/shadcnButton";
import {ShadcnInput} from "@/Componentes/shadcnInput";
import {Textarea} from "@/components/ui/textarea";
import ToasterClient from "@/Componentes/ToasterClient";
import {toast} from "react-hot-toast";


export default function FormularioContacto() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const[mensaje, setMensaje] = useState("");
    const API = process.env.NEXT_PUBLIC_API_URL;

    async function enviarCorreo(nombre, email, mensaje) {
        try {
            if (!nombre || !email || !mensaje) {
                return toast.error("Por llene todos los campos.");
            }

            const res =  await fetch(`${API}/correo/contacto`,{
                method: "POST",
                headers: {Accept: "application/json",
                "Content-Type": "application/json"},
                body: JSON.stringify({nombre, email, mensaje}),
                mode: "cors",
                cache: "no-cache"
            })

            if(!res.ok){
                return toast.error("Ha ocurrido un error, Porfavor contactenos por otro medio.");
            }else {

                const respuestaBackend = await res.json();
                if (respuestaBackend.message === true) {
                    setMensaje("");
                    setEmail("");
                    setMensaje("");
                    return toast.success("Se ha enviado su consulta correctamente.");
                }else {
                    return toast.error("Correo ingresado NO Valido. Intente con otro correo.");
                }
            }

        }catch(error) {
            console.log(error);
            return toast.error("Ha ocurrido un error, Porfavor contactenos por otro medio.");
        }
    }




    return (
        <section className="w-full bg-gradient-to-b from-white to-sky-50 text-gray-900 py-16 px-4">
            <ToasterClient/>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">

                {/* --- LADO IZQUIERDO (Texto comercial) --- */}
                <div className="flex flex-col justify-center p-8 md:p-12 rounded-3xl bg-gradient-to-r from-sky-50 to-white border border-sky-100 shadow-lg">
                    <p className="text-sm uppercase tracking-widest text-sky-600 font-medium">
                        Contacto especializado
                    </p>

                    <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-sky-900 leading-tight">
                        Cuéntanos qué necesitas o cómo podemos ayudarte.
                    </h1>

                    <p className="mt-4 text-gray-700 text-sm md:text-base leading-relaxed">
                        Nuestro equipo revisa cada consulta de forma personalizada. Trabajamos con
                        repuestos para vehículos Maxus y soluciones para flotas industriales y mineras en todo Chile.
                    </p>

                    <ul className="mt-5 space-y-2 text-gray-700 text-sm md:text-base list-none">
                        <li className="flex items-start gap-3"><span className="text-sky-500 font-semibold">•</span> ¿Buscas un repuesto específico?</li>
                        <li className="flex items-start gap-3"><span className="text-sky-500 font-semibold">•</span> ¿Quieres cotizar exportación de alguna pieza?</li>
                        <li className="flex items-start gap-3"><span className="text-sky-500 font-semibold">•</span> ¿Necesitas soporte, reclamos o sugerencias?</li>
                    </ul>

                    <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Completa el formulario y te responderemos lo antes posible.
                    </div>
                </div>

                {/* --- FORMULARIO --- */}
                <div className="flex items-center">
                    <div className="w-full bg-white/95 border border-gray-100 rounded-3xl shadow-2xl p-6 md:p-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold text-sky-800">Enviar consulta</h2>
                                <p className="text-sm text-gray-500">Escríbenos y cuéntanos tu caso. Te ayudaremos con rapidez.</p>
                            </div>
                        </div>

                        <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); enviarCorreo(nombre, email, mensaje); }}>
                            <div>
                                <label htmlFor="nombre" className="block text-sm font-semibold text-sky-700 mb-2">Nombre</label>
                                <ShadcnInput id="nombre" placeholder="Ej.: Sebastian Flores" value={nombre} onChange={e => setNombre(e.target.value)} className="w-full" />
                            </div>

                            <div>
                                <label htmlFor="correo" className="block text-sm font-semibold text-sky-700 mb-2">Email</label>
                                <ShadcnInput id="correo" placeholder="Ej.: micorreo@gmail.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full" />
                            </div>

                            <div>
                                <label htmlFor="consulta" className="block text-sm font-semibold text-sky-700 mb-2">Consulta</label>
                                <Textarea id="consulta" value={mensaje} onChange={e => setMensaje(e.target.value)} className="w-full min-h-[140px] resize-none rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300" />
                            </div>

                            <div className="pt-2">
                                <ShadcnButton nombre={"Enviar Mensaje"} funcion={() => enviarCorreo(nombre, email, mensaje)} />
                            </div>

                            <div className="mt-4 text-sm text-gray-500">
                                <p>Te responderemos antes de 24 Horas en días hábiles.</p>
                                <p className="mt-2">En caso de que necesites contacto telefónico, por favor deja tu teléfono en el mensaje.</p>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </section>
    );
}
