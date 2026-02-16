"use client"

import {Textarea} from "@/components/ui/textarea";
import {useState, useEffect} from "react";
import {useParams} from "next/navigation";
import ToasterClient from "@/Componentes/ToasterClient";
import toast from "react-hot-toast";
import {ShadcnButton} from "@/Componentes/shadcnButton";
import {ShadcnInput} from "@/Componentes/shadcnInput2";
import {useRouter} from "next/navigation";
import formatearFecha from "@/FuncionesTranversales/funcionesTranversales";
import * as React from "react";


export default function EdicionFichaClinica() {
    const {id_ficha} = useParams();
    const [dataFicha, setdataFicha] = useState([]);

    // Solo campos editables
    const [estadoFicha, setestadoFicha] = useState("");
    const [tipoAtencion, settipoAtencion] = useState("");
    const [observaciones, setobservaciones] = useState("");
    const [anotacionConsulta, setanotacionConsulta] = useState("");
    const [fechaConsulta, setfechaConsulta] = useState("");

    const API = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    function retroceder(id_paciente) {
        router.push(`/dashboard/FichasPacientes/${id_paciente}`);
    }

    function estadoReservacion(estado) {
        if (estado === 1) return "RESERVADA";
        if (estado === 2) return "CONFIRMADA";
        if (estado === 3) return "ANULADA";
        if (estado === 4) return "ASISTE";
        if (estado === 5) return "NO ASISTE";
        return "SIN ESTADO";
    }

    function estilosPorEstado(estado) {
        const num = Number(estado);
        if (num === 1) return {
            badge: "bg-blue-100 text-blue-800 ring-1 ring-blue-200",
            card: "border-blue-200 bg-blue-50/40",
        };
        if (num === 2) return {
            badge: "bg-green-100 text-green-800 ring-1 ring-green-200",
            card: "border-green-200 bg-green-50/40",
        };
        if (num === 3) return {
            badge: "bg-red-100 text-red-800 ring-1 ring-red-200",
            card: "border-red-200 bg-red-50/40",
        };
        if (num === 4) return {
            badge: "bg-green-100 text-green-800 ring-1 ring-green-200",
            card: "border-green-200 bg-green-50/40",
        };
        if (num === 5) return {
            badge: "bg-red-100 text-red-800 ring-1 ring-red-200",
            card: "border-red-200 bg-red-50/40",
        };

        return {
            badge: "bg-slate-100 text-slate-700 ring-1 ring-slate-200",
            card: "border-slate-200 bg-slate-50/40",
        };
    }

    function cargarDatosEnFormulario(ficha) {
        setestadoFicha(ficha.estadoFicha ?? "");
        settipoAtencion(ficha.tipoAtencion ?? "");
        setobservaciones(ficha.observaciones ?? "");
        setanotacionConsulta(ficha.anotacionConsulta ?? "");
        setfechaConsulta(ficha.fechaConsulta ? ficha.fechaConsulta.slice(0, 10) : "");
    }

    async function seleccionarFichaEspecifica(id_ficha) {
        try {
            const res = await fetch(`${API}/ficha/seleccionarFichaID`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id_ficha}),
                mode: "cors"
            });

            if (!res.ok) {
                return toast.error("No es posible ejecutar la consulta, contacte a soporte");
            }

            const dataFichasClinicas = await res.json();
            if (Array.isArray(dataFichasClinicas) && dataFichasClinicas.length > 0) {
                setdataFicha(dataFichasClinicas);
                cargarDatosEnFormulario(dataFichasClinicas[0]);
            } else {
                return toast.error("No se encuentran fichas clínicas con el ID seleccionado");
            }
        } catch (err) {
            return toast.error("Ha ocurrido un error, contacte a soporte");
        }
    }

    useEffect(() => {
        seleccionarFichaEspecifica(id_ficha);
    }, []);

    async function actualizarFichaConEstado() {
        try {
            if (!tipoAtencion || !anotacionConsulta || !id_ficha || !estadoFicha) {
                return toast.error("Debe llenar todos los campos obligatorios para actualizar la ficha");
            }

            const res = await fetch(`${API}/ficha/editarFichaPaciente`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    estadoFicha: Number(estadoFicha),
                    tipoAtencion,
                    motivoConsulta: null,
                    signosVitales: null,
                    observaciones,
                    anotacionConsulta,
                    anamnesis: null,
                    diagnostico: null,
                    indicaciones: null,
                    archivosAdjuntos: null,
                    fechaConsulta,
                    consentimientoFirmado: null,
                    id_ficha
                }),
                mode: "cors",
                cache: "no-cache"
            });

            if (!res.ok) {
                const errText = await res.text(); // a veces no es JSON
                console.error("STATUS:", res.status, "BODY:", errText);
                return toast.error(`Error servidor (${res.status})`);            }

            const respuestaBackend = await res.json();
            if (respuestaBackend.message === true) {
                await seleccionarFichaEspecifica(id_ficha);
                return toast.success("Ficha Clínica actualizada correctamente");
            } else {
                return toast.error("No ha sido posible actualizar la ficha clínica");
            }
        } catch (error) {
            return toast.error("Ha ocurrido un error, contacte a soporte");
        }
    }

    const ficha = dataFicha[0] ?? null;
    // Color según el estado que viene de la BD (ficha.estadoFicha), no del selector
    const estilosInfo = estilosPorEstado(ficha?.estadoFicha);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 py-10 px-4">
            <ToasterClient />

            <div className="mx-auto w-full max-w-4xl space-y-8">

                {/* Header */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                        Edición de Ficha Clínica
                    </h1>
                    <p className="text-sm text-slate-500">
                        Ficha Nº <span className="font-bold text-slate-700">{id_ficha}</span>
                    </p>
                </div>

                {/* Info actual de la ficha */}
                {ficha && (
                    <div className={`rounded-2xl border p-6 shadow-sm ${estilosInfo.card}`}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-slate-900">Información Actual</h2>
                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${estilosInfo.badge}`}>
                                {estadoReservacion(ficha.estadoFicha)}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            <div className="rounded-xl border border-slate-200 bg-white p-3">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Estado</p>
                                <p className="mt-1 text-sm font-medium text-slate-800">{estadoReservacion(ficha.estadoFicha)}</p>
                            </div>
                            <div className="rounded-xl border border-slate-200 bg-white p-3">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Tipo Atención</p>
                                <p className="mt-1 text-sm font-medium text-slate-800">{ficha.tipoAtencion || "-"}</p>
                            </div>
                            <div className="rounded-xl border border-slate-200 bg-white p-3">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Fecha Consulta</p>
                                <p className="mt-1 text-sm font-medium text-slate-800">{formatearFecha(ficha.fechaConsulta) || "-"}</p>
                            </div>
                            <div className="rounded-xl border border-slate-200 bg-white p-3">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Observaciones</p>
                                <p className="mt-1 text-sm font-medium text-slate-800">{ficha.observaciones || "-"}</p>
                            </div>
                        </div>

                        <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Anotación Actual</p>
                            <p className="mt-1 text-sm text-slate-700 whitespace-pre-line leading-relaxed">{ficha.anotacionConsulta || "-"}</p>
                        </div>
                    </div>
                )}

                {/* Formulario de edición */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                    <h2 className="text-lg font-bold text-slate-900">Editar Información</h2>

                    {/* Estado */}
                    <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-600 mb-1">Estado de la Ficha</label>
                        <select
                            value={estadoFicha}
                            onChange={(e) => setestadoFicha(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 shadow-sm focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="">Seleccione estado</option>
                            <option value="1">RESERVADA</option>
                            <option value="2">CONFIRMADA</option>
                            <option value="3">ANULADA</option>
                            <option value="4">ASISTE</option>
                            <option value="5">NO ASISTE</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-600 mb-1">Tipo de Atención</label>
                            <ShadcnInput value={tipoAtencion} onChange={e => settipoAtencion(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-600 mb-1">Fecha Consulta</label>
                            <ShadcnInput type="date" value={fechaConsulta} onChange={e => setfechaConsulta(e.target.value)} />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-600 mb-1">Observaciones (Valor Sesión)</label>
                            <ShadcnInput value={observaciones} onChange={e => setobservaciones(e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-600 mb-1">Anotación de Consulta</label>
                        <Textarea
                            className="min-h-[160px] resize-none"
                            value={anotacionConsulta}
                            onChange={(e) => setanotacionConsulta(e.target.value)}
                        />
                    </div>

                    <div className="h-px w-full bg-slate-200" />

                    <div className="flex flex-col sm:flex-row gap-3 justify-end">
                        <ShadcnButton
                            funcion={() => actualizarFichaConEstado()}
                            nombre={"Actualizar Ficha"}
                        />
                        {ficha && (
                            <ShadcnButton
                                funcion={() => retroceder(ficha.id_paciente)}
                                nombre={"Retroceder"}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
