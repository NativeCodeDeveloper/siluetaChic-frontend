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
        <section className="w-full bg-gradient-to-b from-white via-indigo-50/60 to-cyan-50 text-gray-900 py-16 px-4">
            <ToasterClient/>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">

                {/* --- LADO IZQUIERDO (Texto comercial) --- */}
                <div className="flex flex-col justify-center p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white via-indigo-50 to-cyan-50 border border-indigo-100 shadow-[0_20px_50px_rgba(79,70,229,0.12)]">
                    <p className="text-sm uppercase tracking-widest text-indigo-600 font-medium">
                        Contacto especializado
                    </p>

                    <h1 className="mt-3 text-3xl md:text-4xl font-extrabold text-indigo-900 leading-tight">
                        Cuéntanos qué necesitas o cómo podemos ayudarte.
                    </h1>

                    <p className="mt-4 text-gray-700 text-sm md:text-base leading-relaxed">
                        Nuestro equipo revisa cada consulta de forma personalizada. Resolvemos dudas sobre depilación láser, sesiones, preparación previa, cuidados posteriores y resultados esperados.
                    </p>

                    <ul className="mt-5 space-y-2 text-gray-700 text-sm md:text-base list-none">
                        <li className="flex items-start gap-3"><span className="text-indigo-500 font-semibold">•</span> ¿Es dolorosa la depilación láser?</li>
                        <li className="flex items-start gap-3"><span className="text-indigo-500 font-semibold">•</span> ¿Cuántas sesiones necesito y cada cuánto?</li>
                        <li className="flex items-start gap-3"><span className="text-indigo-500 font-semibold">•</span> ¿Puedo depilarme si estoy embarazada o tomando medicamentos?</li>
                        <li className="flex items-start gap-3"><span className="text-indigo-500 font-semibold">•</span> ¿Qué cuidados debo tener antes y después de la sesión?</li>
                    </ul>

                    <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-cyan-50 px-4 py-3 text-sm text-indigo-700 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Completa el formulario y te orientaremos para que reserves tu evaluación o aclares tus dudas.
                    </div>

                    <div className="mt-6 rounded-2xl border border-indigo-200/70 bg-white/70 p-4 backdrop-blur-sm shadow-sm">
                      <p className="text-xs uppercase tracking-widest text-indigo-600 font-semibold">
                        Contacto directo
                      </p>

                      <div className="mt-3 flex flex-col gap-3 text-sm">
                        <a
                          href="mailto:silueta.chic200@gmail.com"
                          className="inline-flex items-center gap-3 rounded-xl border border-indigo-200/60 bg-white px-4 py-3 text-slate-700 hover:text-indigo-700 hover:border-indigo-300 transition"
                        >
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-700">
                            ✉️
                          </span>
                          silueta.chic200@gmail.com
                        </a>

                        <a
                          href="tel:+56981396016"
                          className="inline-flex items-center gap-3 rounded-xl border border-indigo-200/60 bg-white px-4 py-3 text-slate-700 hover:text-indigo-700 hover:border-indigo-300 transition"
                        >
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-700">
                            📞
                          </span>
                          +56 9 8139 6016
                        </a>
                      </div>
                    </div>
                </div>

                {/* --- FORMULARIO --- */}
                <div className="flex items-center">
                    <div className="w-full bg-white/95 border border-gray-100 rounded-3xl shadow-[0_30px_80px_rgba(79,70,229,0.18)] p-6 md:p-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold text-indigo-800">Agenda tu consulta</h2>
                                <p className="text-sm text-gray-500">Cuéntanos tu duda y te ayudaremos a elegir el tratamiento y resolver tus preguntas.</p>
                            </div>
                        </div>

                        <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); enviarCorreo(nombre, email, mensaje); }}>
                            <div>
                                <label htmlFor="nombre" className="block text-sm font-semibold text-indigo-700 mb-2">Nombre</label>
                                <ShadcnInput id="nombre" placeholder="Ej.: Camila Pérez" value={nombre} onChange={e => setNombre(e.target.value)} className="w-full" />
                            </div>

                            <div>
                                <label htmlFor="correo" className="block text-sm font-semibold text-indigo-700 mb-2">Email</label>
                                <ShadcnInput id="correo" placeholder="Ej.: micorreo@gmail.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full" />
                            </div>

                            <div>
                                <label htmlFor="consulta" className="block text-sm font-semibold text-indigo-700 mb-2">Tu duda</label>
                                <Textarea id="consulta" value={mensaje} onChange={e => setMensaje(e.target.value)} className="w-full min-h-[140px] resize-none rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                            </div>

                            <div className="pt-2">
                                <ShadcnButton nombre={"Enviar Mensaje"} funcion={() => enviarCorreo(nombre, email, mensaje)} />
                            </div>

                            <div className="mt-4 text-sm text-gray-500">
                                <p>Te responderemos dentro de 24 horas hábiles.</p>
                                <p className="mt-2">Si quieres que te contactemos por WhatsApp o teléfono, déjanos tu número en el mensaje.</p>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </section>
    );
}
