"use client"

export const dynamic = "force-dynamic";

import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import ShadcnInput from "@/Componentes/shadcnInput2";
import ShadcnFechaHora from "@/Componentes/ShadcnFechaHora";
import ToasterClient from "@/Componentes/ToasterClient";
import { toast } from "react-hot-toast";
import es from "date-fns/locale/es";
import { InfoButton } from "@/Componentes/InfoButton";

const locales = { es };
const dfStartOfWeek = (date) => startOfWeek(date, { locale: es });
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: dfStartOfWeek,
    getDay,
    locales,
});

export default function CalendarioPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400">Cargando calendario...</div>}>
            <Calendario />
        </Suspense>
    );
}

function Calendario() {
    const API = process.env.NEXT_PUBLIC_API_URL;
    const searchParams = useSearchParams();

    const [events, setEvents] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState("month");

    const [nombrePaciente, setNombrePaciente] = useState("");
    const [apellidoPaciente, setApellidoPaciente] = useState("");
    const [rut, setRut] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [fechaInicio, setfechaInicio] = useState("");
    const [fechaFinalizacion, setfechaFinalizacion] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFinalizacion, setHoraFinalizacion] = useState("");
    const [estadoReserva, setEstadoReserva] = useState("");
    const [id_reserva, setid_reserva] = useState(0);
    const [dataAgenda, setDataAgenda] = useState([]);

    const [valorFechaHoraInicio, setValorFechaHoraInicio] = useState(null);
    const [valorFechaHoraFin, setValorFechaHoraFin] = useState(null);

    const popupRef = useRef(null);
    const [showQuickPopup, setShowQuickPopup] = useState(false);
    const [quickPopupPos, setQuickPopupPos] = useState({ top: 0, left: 0 });
    const [quickNombre, setQuickNombre] = useState("");
    const [quickApellido, setQuickApellido] = useState("");
    const [quickRut, setQuickRut] = useState("");
    const [quickTelefono, setQuickTelefono] = useState("");
    const [quickEmail, setQuickEmail] = useState("");
    const [quickFechaInicio, setQuickFechaInicio] = useState("");
    const [quickHoraInicio, setQuickHoraInicio] = useState("");
    const [quickFechaFin, setQuickFechaFin] = useState("");
    const [quickHoraFin, setQuickHoraFin] = useState("");
    const [guardandoQuick, setGuardandoQuick] = useState(false);
    const isDraggingPopup = useRef(false);
    const dragOffset = useRef({ x: 0, y: 0 });

    function obtenerEstiloPorEstado(estadoReserva) {
        const estado = (estadoReserva ?? "").toLowerCase();

        if (estado === "confirmada") {
            return { backgroundColor: "#16a34a", color: "#ffffff" };
        }

        if (estado === "anulada") {
            return { backgroundColor: "#dc2626", color: "#ffffff" };
        }

        if (estado === "asiste") {
            return { backgroundColor: "#fbcfe8", color: "#831843" };
        }

        if (estado === "no asiste") {
            return { backgroundColor: "#fde68a", color: "#854d0e" };
        }

        return { backgroundColor: "#0284c7", color: "#ffffff" };
    }


    function formatearFechaLocal(d) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
    }

    function formatearRut(rutSinFormato) {
        const limpio = (rutSinFormato ?? "").replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

        if (limpio.length < 7 || limpio.length > 9) {
            return null;
        }

        const cuerpo = limpio.slice(0, -1);
        const dv = limpio.slice(-1);
        const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return `${cuerpoFormateado}-${dv}`;
    }

    function normalizarRutInput(valor) {
        const limpio = (valor ?? "").replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 9);

        if (limpio.length <= 1) {
            return limpio;
        }

        const cuerpo = limpio.slice(0, -1);
        const dv = limpio.slice(-1);
        const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return `${cuerpoFormateado}-${dv}`;
    }

    const manejarFechaHoraInicio = (dateTime) => {
        setfechaInicio(formatearFechaLocal(dateTime));
        setHoraInicio(dateTime.toTimeString().slice(0, 8));
        setValorFechaHoraInicio(dateTime);
    };

    const manejarFechaHoraFinalizacion = (dateTime) => {
        setfechaFinalizacion(formatearFechaLocal(dateTime));
        setHoraFinalizacion(dateTime.toTimeString().slice(0, 8));
        setValorFechaHoraFin(dateTime);
    };

    function convertirAFechaCalendario(fechaISO, hora) {
        const soloFecha = fechaISO.slice(0, 10);
        return new Date(`${soloFecha}T${hora}`);
    }

    function isOverlapping(start, end) {
        if (!dataAgenda || dataAgenda.length === 0) return false;

        for (const cita of dataAgenda) {
            const evStart = convertirAFechaCalendario((cita.fechaInicio ?? "").slice(0, 10), cita.horaInicio ?? "00:00:00");
            const evEnd = convertirAFechaCalendario((cita.fechaFinalizacion ?? "").slice(0, 10), cita.horaFinalizacion ?? "00:00:00");
            if (start < evEnd && end > evStart) return true;
        }

        return false;
    }

    function limpiarData() {
        setNombrePaciente("");
        setApellidoPaciente("");
        setTelefono("");
        setRut("");
        setEmail("");
        setfechaInicio("");
        setHoraInicio("");
        setfechaFinalizacion("");
        setHoraFinalizacion("");
        setValorFechaHoraInicio(null);
        setValorFechaHoraFin(null);
        setid_reserva(0);
        setEstadoReserva("");
    }

    function cerrarPopup() {
        setShowQuickPopup(false);
        setQuickNombre("");
        setQuickApellido("");
        setQuickRut("");
        setQuickTelefono("");
        setQuickEmail("");
        setQuickFechaInicio("");
        setQuickHoraInicio("");
        setQuickFechaFin("");
        setQuickHoraFin("");
    }

    function calcularPosicionPopup(slotInfo) {
        const POPUP_W = 320;
        const POPUP_H = 420;
        const GAP = 8;
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        let top;
        let left;

        if (slotInfo.bounds) {
            left = slotInfo.bounds.right + GAP;
            top = slotInfo.bounds.top;
            if (left + POPUP_W > vw - 16) left = slotInfo.bounds.left - POPUP_W - GAP;
        } else if (slotInfo.box) {
            left = slotInfo.box.clientX + GAP;
            top = slotInfo.box.clientY - 40;
            if (left + POPUP_W > vw - 16) left = slotInfo.box.clientX - POPUP_W - GAP;
        } else {
            left = (vw - POPUP_W) / 2;
            top = (vh - POPUP_H) / 2;
        }

        if (top + POPUP_H > vh - 16) top = vh - POPUP_H - 16;
        if (top < 16) top = 16;
        if (left < 16) left = 16;

        return { top, left };
    }

    async function cargarDataAgenda() {
        try {
            const res = await fetch(`${API}/reservaPacientes/seleccionarReservados`, {
                method: "GET",
                headers: { Accept: "application/json" }
            });

            if (!res.ok) {
                return toast.error("No fue posible cargar las agendas, contacte a soporte de Medify");
            }

            const data = await res.json();
            setDataAgenda(data);
        } catch (err) {
            return toast.error(err.message);
        }
    }

    useEffect(() => {
        const nombre = searchParams.get("nombre");
        const apellido = searchParams.get("apellido");
        const rutParam = searchParams.get("rut");
        const telefonoParam = searchParams.get("telefono");
        const emailParam = searchParams.get("email") || searchParams.get("correo");

        if (nombre) setNombrePaciente(nombre);
        if (apellido) setApellidoPaciente(apellido);
        if (rutParam) setRut(normalizarRutInput(rutParam));
        if (telefonoParam) setTelefono(telefonoParam);
        if (emailParam) setEmail(emailParam);
    }, [searchParams]);

    useEffect(() => {
        const style = document.createElement("style");
        style.textContent = `
            .rbc-month-view .rbc-event {
                min-height: 28px !important; height: auto !important; padding: 6px 10px !important;
                line-height: 1.3 !important; white-space: normal !important; overflow: visible !important; word-break: break-word !important;
                border-radius: 10px !important;
            }
            .rbc-time-view .rbc-event {
                min-height: 30px !important; height: auto !important; padding: 6px 10px !important;
                line-height: 1.3 !important; white-space: normal !important; overflow: visible !important; word-break: break-word !important;
                border-radius: 10px !important;
            }
            .rbc-month-view .rbc-day-slot { min-height: 80px !important; }
            .rbc-row-segment { z-index: 1 !important; }
            .rbc-event-label, .rbc-event-content { white-space: normal !important; overflow: visible !important; word-break: break-word !important; }
            .rbc-slot-selection {
                border-radius: 10px !important;
                background-color: rgba(14, 165, 233, 0.28) !important;
                border: 1px solid rgba(14, 165, 233, 0.6) !important;
            }
            .rbc-day-slot .rbc-event { border-radius: 10px !important; }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    useEffect(() => {
        cargarDataAgenda();
    }, []);

    useEffect(() => {
        if (!dataAgenda || dataAgenda.length === 0) {
            setEvents([]);
            return;
        }

        const eventosCalendario = dataAgenda.map((cita) => ({
            id_reserva: cita.id_reserva,
            title: `${cita.nombrePaciente} ${cita.apellidoPaciente}`,
            start: convertirAFechaCalendario(cita.fechaInicio, cita.horaInicio),
            end: convertirAFechaCalendario(cita.fechaFinalizacion, cita.horaFinalizacion),
            estadoReserva: cita.estadoReserva,
        }));

        setEvents(eventosCalendario);
    }, [dataAgenda]);

    useEffect(() => {
        if (!showQuickPopup) return;

        function handleClickOutside(e) {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                cerrarPopup();
            }
        }

        function handleMouseMove(e) {
            if (!isDraggingPopup.current) return;
            setQuickPopupPos({
                top: e.clientY - dragOffset.current.y,
                left: e.clientX - dragOffset.current.x,
            });
        }

        function handleMouseUp() {
            isDraggingPopup.current = false;
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [showQuickPopup]);

    const messages = useMemo(() => ({
        next: "Siguiente",
        previous: "Anterior",
        today: "Hoy",
        month: "Mes",
        week: "Semana",
        day: "Día",
        agenda: "Agenda",
        noEventsInRange: "No hay eventos",
    }), []);

    const eventStyleGetter = (event) => {
        const { backgroundColor, color } = obtenerEstiloPorEstado(event.estadoReserva);

        return {
            style: {
                display: "flex",
                alignItems: "center",
                height: "auto",
                minHeight: "28px",
                maxHeight: "none",
                whiteSpace: "normal",
                overflow: "visible",
                textOverflow: "clip",
                lineHeight: "1.3",
                padding: "6px 10px",
                fontSize: "0.8rem",
                boxSizing: "border-box",
                borderRadius: "10px",
                backgroundColor,
                color,
                fontWeight: "500",
                wordBreak: "break-word",
            },
        };
    };

    const EventComponent = ({ event }) => (
        <div title={event.title} className="break-words text-[13px] leading-snug w-full" style={{ whiteSpace: "normal", overflow: "visible", wordBreak: "break-word", hyphens: "auto" }}>
            {event.title}
        </div>
    );

    const TitleOnlyEvent = ({ event }) => (
        <div title={event.title} className="break-words text-[13px] leading-snug font-medium w-full" style={{ whiteSpace: "normal", overflow: "visible", wordBreak: "break-word" }}>
            {event.title}
        </div>
    );

    async function bloquearAgenda(fechaInicioValue, horaInicioValue, fechaFinalizacionValue, horaFinalizacionValue) {
        try {
            if (!fechaInicioValue || !horaInicioValue || !horaFinalizacionValue) {
                return toast.error("Debe llenar los campos de fechas para bloquear un periodo");
            }

            const nombrePacienteValue = "AGENDA BLOQUEADA";
            const apellidoPacienteValue = "-";
            const rutValue = "-";
            const telefonoValue = "-";
            const emailValue = "-";
            const ahora = new Date();
            const inicio = new Date(`${fechaInicioValue}T${horaInicioValue}`);
            const final = new Date(`${fechaFinalizacionValue}T${horaFinalizacionValue}`);

            if (inicio < ahora) return toast.error("No es posible agendar en fechas no vigentes");
            if (final < inicio) return toast.error("No es posible en fechas irreales");
            if (isOverlapping(inicio, final)) return toast.error("La hora seleccionada ya está ocupada");

            if (fechaInicioValue === fechaFinalizacionValue) {
                const res = await fetch(`${API}/reservaPacientes/insertarReserva`, {
                    method: "POST",
                    headers: { Accept: "application/json", "Content-Type": "application/json" },
                    mode: "cors",
                    body: JSON.stringify({
                        nombrePaciente: nombrePacienteValue,
                        apellidoPaciente: apellidoPacienteValue,
                        rut: rutValue,
                        telefono: telefonoValue,
                        email: emailValue,
                        fechaInicio: fechaInicioValue,
                        horaInicio: horaInicioValue,
                        fechaFinalizacion: fechaFinalizacionValue,
                        horaFinalizacion: horaFinalizacionValue,
                        estadoReserva: "reservada"
                    })
                });

                const respuestaBackend = await res.json();

                if (respuestaBackend.message === true) {
                    limpiarData();
                    await cargarDataAgenda();
                    return toast.success("Se ha bloqueado el periodo indicado correctamente.");
                }

                if (respuestaBackend.message === "conflicto" || respuestaBackend.message?.includes("conflicto")) {
                    return toast.error("No puede agendar una hora que ya está ocupada");
                }

                return toast.error("Asegure que no está ocupada la hora");
            }

            return toast.error("Solo se permite bloquear periodos dentro de un mismo día.");
        } catch (error) {
            console.log(error);
            return toast.error("Sin respuesta del servidor, contacte a soporte.");
        }
    }

    async function insertarNuevaReserva(nombrePacienteValue, apellidoPacienteValue, rutValue, telefonoValue, emailValue, fechaInicioValue, horaInicioValue, fechaFinalizacionValue, horaFinalizacionValue) {
        try {
            if (!nombrePacienteValue || !apellidoPacienteValue || !rutValue || !telefonoValue || !emailValue || !fechaInicioValue || !horaInicioValue || !horaFinalizacionValue) {
                return toast.error("Debe llenar todos los campos");
            }

            const rutFormateado = formatearRut(rutValue);
            if (!rutFormateado) {
                return toast.error("El RUT debe tener entre 7 y 9 caracteres válidos");
            }

            const ahora = new Date();
            const inicio = new Date(`${fechaInicioValue}T${horaInicioValue}`);
            const final = new Date(`${fechaFinalizacionValue}T${horaFinalizacionValue}`);

            if (inicio < ahora) return toast.error("No es posible agendar en fechas no vigentes");
            if (final < inicio) return toast.error("No es posible en fechas irreales");
            if (isOverlapping(inicio, final)) return toast.error("La hora seleccionada ya está ocupada");

            if (fechaInicioValue === fechaFinalizacionValue) {
                const res = await fetch(`${API}/reservaPacientes/insertarReservaPacienteFicha`, {
                    method: "POST",
                    headers: { Accept: "application/json", "Content-Type": "application/json" },
                    mode: "cors",
                    body: JSON.stringify({
                        nombrePaciente: nombrePacienteValue,
                        apellidoPaciente: apellidoPacienteValue,
                        rut: rutFormateado,
                        telefono: telefonoValue,
                        email: emailValue,
                        fechaInicio: fechaInicioValue,
                        horaInicio: horaInicioValue,
                        fechaFinalizacion: fechaFinalizacionValue,
                        horaFinalizacion: horaFinalizacionValue,
                        estadoReserva: "reservada"
                    })
                });

                const respuestaBackend = await res.json();

                if (respuestaBackend.message === true) {
                    limpiarData();
                    await cargarDataAgenda();
                    return toast.success("Se ha ingresado correctamente el agendamiento");
                }

                if (respuestaBackend.message === "conflicto" || respuestaBackend.message?.includes("conflicto")) {
                    return toast.error("No puede agendar una hora que ya está ocupada");
                }

                return toast.error("Asegure que no está ocupada la hora");
            }

            return toast.error("Solo se permite agendar si es en el mismo día");
        } catch (error) {
            console.log(error);
            return toast.error("Sin respuesta del servidor, contacte a soporte.");
        }
    }

    async function actualizarInformacionReserva(nombrePacienteValue, apellidoPacienteValue, rutValue, telefonoValue, emailValue, fechaInicioValue, horaInicioValue, fechaFinalizacionValue, horaFinalizacionValue, estadoReservaValue, idReservaValue) {
        try {
            if (!nombrePacienteValue || !apellidoPacienteValue || !rutValue || !telefonoValue || !emailValue || !fechaInicioValue || !horaInicioValue || !fechaFinalizacionValue || !horaFinalizacionValue || !estadoReservaValue || !idReservaValue) {
                return toast.error("Debe llenar todos los campos para poder actualizar la reserva");
            }

            const rutFormateado = formatearRut(rutValue);
            if (!rutFormateado) {
                return toast.error("El RUT debe tener entre 7 y 9 caracteres válidos");
            }

            const res = await fetch(`${API}/reservaPacientes/actualizarReservacion`, {
                method: "POST",
                headers: { Accept: "application/json", "Content-Type": "application/json" },
                mode: "cors",
                body: JSON.stringify({
                    nombrePaciente: nombrePacienteValue,
                    apellidoPaciente: apellidoPacienteValue,
                    rut: rutFormateado,
                    telefono: telefonoValue,
                    email: emailValue,
                    fechaInicio: fechaInicioValue,
                    horaInicio: horaInicioValue,
                    fechaFinalizacion: fechaFinalizacionValue,
                    horaFinalizacion: horaFinalizacionValue,
                    estadoReserva: estadoReservaValue,
                    id_reserva: idReservaValue
                })
            });

            if (!res.ok) return toast.error("El servidor no responde");

            const respuestaBackend = await res.json();
            if (respuestaBackend.message === true) {
                limpiarData();
                await cargarDataAgenda();
                return toast.success("Se ha actualizado la reserva correctamente");
            }
        } catch (error) {
            console.log(error);
            return toast.error(error.message);
        }
    }

    async function seleccionarReservaEspecifica(idReservaValue) {
        try {
            if (!idReservaValue) return toast.error("Debe seleccionar una reserva");

            const res = await fetch(`${API}/reservaPacientes/seleccionarEspecifica`, {
                method: "POST",
                headers: { Accept: "application/json", "Content-Type": "application/json" },
                mode: "cors",
                body: JSON.stringify({ id_reserva: idReservaValue })
            });

            if (!res.ok) return toast.error("El servidor no responde");

            const data = await res.json();
            const reserva = Array.isArray(data) ? data[0] : data;
            if (!reserva) return toast.error("Sin data");

            setNombrePaciente(reserva.nombrePaciente ?? "");
            setApellidoPaciente(reserva.apellidoPaciente ?? "");
            setRut(normalizarRutInput(reserva.rut ?? ""));
            setEmail(reserva.email ?? "");
            setTelefono(reserva.telefono ?? "");
            setfechaInicio((reserva.fechaInicio ?? "").slice(0, 10));
            setHoraInicio(reserva.horaInicio ?? "");
            setfechaFinalizacion((reserva.fechaFinalizacion ?? "").slice(0, 10));
            setHoraFinalizacion(reserva.horaFinalizacion ?? "");
            setEstadoReserva(reserva.estadoReserva ?? "");

            const loadedStart = new Date(`${(reserva.fechaInicio ?? "").slice(0, 10)}T${reserva.horaInicio ?? "10:00:00"}`);
            const loadedEnd = new Date(`${(reserva.fechaFinalizacion ?? "").slice(0, 10)}T${reserva.horaFinalizacion ?? "11:00:00"}`);
            setValorFechaHoraInicio(loadedStart);
            setValorFechaHoraFin(loadedEnd);

            setQuickNombre(reserva.nombrePaciente ?? "");
            setQuickApellido(reserva.apellidoPaciente ?? "");
            setQuickRut(normalizarRutInput(reserva.rut ?? ""));
            setQuickTelefono(reserva.telefono ?? "");
            setQuickEmail(reserva.email ?? "");
            setQuickFechaInicio((reserva.fechaInicio ?? "").slice(0, 10));
            setQuickHoraInicio(reserva.horaInicio ?? "");
            setQuickFechaFin((reserva.fechaFinalizacion ?? "").slice(0, 10));
            setQuickHoraFin(reserva.horaFinalizacion ?? "");
        } catch (error) {
            console.log(error);
            return toast.error("El servidor no responde");
        }
    }

    useEffect(() => {
        if (id_reserva) seleccionarReservaEspecifica(id_reserva);
    }, [id_reserva]);

    async function eliminarReserva() {
        try {
            if (!id_reserva) return toast.error("Debe seleccionar una reserva para eliminarla");

            const res = await fetch(`${API}/reservaPacientes/eliminarReserva`, {
                method: "POST",
                headers: { Accept: "application/json", "Content-Type": "application/json" },
                mode: "cors",
                body: JSON.stringify({ id_reserva })
            });

            if (!res.ok) return toast.error("El servidor no responde");

            const respuestaBackend = await res.json();
            if (respuestaBackend.message === true) {
                limpiarData();
                await cargarDataAgenda();
                return toast.success("Se ha eliminado la reserva correctamente");
            }

            return toast.error("No se pudo eliminar la reserva");
        } catch (error) {
            console.log(error);
            return toast.error("Error al eliminar la reserva");
        }
    }


    async function bloquearDesdePopup() {
        setGuardandoQuick(true);
        try {
            await bloquearAgenda(quickFechaInicio, quickHoraInicio, quickFechaFin, quickHoraFin);
            cerrarPopup();
        } finally {
            setGuardandoQuick(false);
        }
    }

    async function guardarDesdePopup() {
        if (!quickNombre || !quickApellido || !quickRut || !quickTelefono || !quickEmail) {
            return toast.error("Debe llenar todos los campos");
        }

        setGuardandoQuick(true);
        try {
            await insertarNuevaReserva(
                quickNombre,
                quickApellido,
                quickRut,
                quickTelefono,
                quickEmail,
                quickFechaInicio,
                quickHoraInicio,
                quickFechaFin,
                quickHoraFin
            );
            cerrarPopup();
        } finally {
            setGuardandoQuick(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
            <ToasterClient />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-sky-600 mb-1">Planificación</p>
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Módulo de Agenda</h1>
                        <p className="text-sm text-slate-500 mt-1">Gestiona reservas, revisa disponibilidad y actualiza datos en un solo lugar</p>
                    </div>
                    <InfoButton informacion={"En este apartado, usted puede ingresar pacientes de manera manual directamente en la agenda o sistema de citas. Además, es posible editar los datos de los pacientes ya registrados, permitiéndole mantener la información siempre actualizada y correcta.\n\nAsimismo, este módulo le permite bloquear períodos específicos de la agenda cuando no se encuentre disponible para atender.\nPara bloquear un período, solo debe seleccionar el rango horario que desea bloquear dentro del mismo día y luego presionar el botón \"Bloquear\". El sistema marcará automáticamente ese período como no disponible para nuevas citas.\n\nEsta funcionalidad le entrega un control total sobre la agenda, facilitando la organización de horarios, la gestión de pacientes y la administración de tiempos no disponibles."} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {valorFechaHoraInicio && fechaInicio && (
                        <div className="lg:col-span-2 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2.5 flex items-center justify-between">
                            <span className="text-sm text-emerald-700">
                                Horario seleccionado: <strong>{fechaInicio}</strong> de <strong>{horaInicio?.slice(0, 5)}</strong> a <strong>{horaFinalizacion?.slice(0, 5)}</strong> - Complete los datos del paciente y presione <strong>Agregar</strong>
                            </span>
                            <button onClick={() => limpiarData()} className="text-xs text-emerald-600 hover:text-emerald-800 underline ml-3">Cancelar</button>
                        </div>
                    )}

                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-3 flex items-center gap-2">
                            <h2 className="text-sm font-semibold text-slate-700 tracking-wide uppercase">Datos del Paciente</h2>
                        </div>
                        <div className="p-5 md:p-6 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Nombre</label>
                                    <ShadcnInput value={nombrePaciente ?? ""} onChange={(e) => setNombrePaciente(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Apellido</label>
                                    <ShadcnInput value={apellidoPaciente ?? ""} onChange={(e) => setApellidoPaciente(e.target.value)} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">RUT</label>
                                <ShadcnInput
                                    value={rut}
                                    onChange={(e) => setRut(normalizarRutInput(e.target.value))}
                                    placeholder="12.345.678-K"
                                    className="w-full"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Correo</label>
                                    <ShadcnInput value={email ?? ""} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Teléfono</label>
                                    <ShadcnInput value={telefono ?? ""} onChange={(e) => setTelefono(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                            <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-3 flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-slate-700">Inicio</h3>
                                <span className="text-[11px] text-slate-400 uppercase tracking-wider">Fecha y hora</span>
                            </div>
                            <div className="p-5 flex flex-col md:flex-row md:items-center md:gap-4">
                                <div className="flex-1">
                                    <ShadcnFechaHora onChange={manejarFechaHoraInicio} value={valorFechaHoraInicio} />
                                </div>
                                <div className="mt-3 md:mt-0 bg-slate-50 border border-slate-100 rounded-lg p-3 w-full md:w-48">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] text-slate-400 uppercase">Fecha</span>
                                        <span className="text-sm font-medium text-slate-800">{fechaInicio || "--"}</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-[11px] text-slate-400 uppercase">Hora</span>
                                        <span className="text-sm font-semibold text-emerald-600">{horaInicio || "--"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                            <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-3 flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-slate-700">Final</h3>
                                <span className="text-[11px] text-slate-400 uppercase tracking-wider">Debe ser el mismo día</span>
                            </div>
                            <div className="p-5 flex flex-col md:flex-row md:items-center md:gap-4">
                                <div className="flex-1">
                                    <ShadcnFechaHora onChange={manejarFechaHoraFinalizacion} value={valorFechaHoraFin} />
                                </div>
                                <div className="mt-3 md:mt-0 bg-slate-50 border border-slate-100 rounded-lg p-3 w-full md:w-48">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] text-slate-400 uppercase">Fecha</span>
                                        <span className="text-sm font-medium text-slate-800">{fechaFinalizacion || "--"}</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-[11px] text-slate-400 uppercase">Hora</span>
                                        <span className="text-sm font-semibold text-sky-600">{horaFinalizacion || "--"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-1">
                            <button
                                onClick={() => insertarNuevaReserva(nombrePaciente, apellidoPaciente, rut, telefono, email, fechaInicio, horaInicio, fechaFinalizacion, horaFinalizacion)}
                                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-sky-600 to-cyan-500 rounded-lg hover:from-sky-700 hover:to-cyan-600 transition-all duration-150 shadow-sm"
                            >
                                Agregar
                            </button>

                            <button
                                onClick={() => actualizarInformacionReserva(nombrePaciente, apellidoPaciente, rut, telefono, email, fechaInicio, horaInicio, fechaFinalizacion, horaFinalizacion, estadoReserva, id_reserva)}
                                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-sky-700 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 transition-colors duration-150"
                            >
                                Actualizar
                            </button>

                            <button
                                onClick={() => limpiarData()}
                                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-150"
                            >
                                Limpiar
                            </button>

                            <button
                                onClick={() => bloquearAgenda(fechaInicio, horaInicio, fechaFinalizacion, horaFinalizacion)}
                                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors duration-150"
                            >
                                Bloquear
                            </button>

                            <button
                                onClick={() => eliminarReserva()}
                                disabled={!id_reserva}
                                className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-150 ${id_reserva ? "text-white bg-red-600 border border-red-600 hover:bg-red-700 shadow-sm" : "text-slate-400 bg-slate-100 border border-slate-200 cursor-not-allowed"}`}
                            >
                                Eliminar Reserva
                            </button>
                        </div>
                    </div>
                </div>


                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h2 className="text-sm font-semibold text-slate-700 tracking-wide uppercase">Calendario de Reservas</h2>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <span className="inline-block w-3 h-3 rounded bg-sky-600" />
                                <span className="text-xs text-slate-500">Reserva</span>
                            </div>
                            <span className="text-xs text-slate-400">Vista: <span className="font-medium text-slate-600 capitalize">{currentView}</span></span>
                        </div>
                    </div>
                    <div className="p-4 md:p-6 h-[700px]">
                        <Calendar
                            localizer={localizer}
                            events={events}
                            eventPropGetter={eventStyleGetter}
                            components={{
                                event: EventComponent,
                                day: { event: TitleOnlyEvent },
                                agenda: { event: TitleOnlyEvent }
                            }}
                            startAccessor="start"
                            endAccessor="end"
                            messages={messages}
                            culture="es"
                            date={currentDate}
                            onNavigate={(nextDate) => setCurrentDate(nextDate)}
                            view={currentView}
                            onView={(nextView) => setCurrentView(nextView)}
                            defaultView="month"
                            style={{ height: "100%" }}
                            selectable
                            onSelecting={(slot) => {
                                const start = slot.start ?? slot;
                                const end = slot.end ?? slot;
                                if (isOverlapping(start, end)) {
                                    toast.error("Horario no disponible (solapa con una reserva existente)");
                                    return false;
                                }
                                return true;
                            }}
                            onSelectEvent={(event) => {
                                if (!event?.id_reserva) {
                                    toast.error("No se encontró el ID de la reserva");
                                    return;
                                }
                                setid_reserva(event.id_reserva);
                                seleccionarReservaEspecifica(event.id_reserva);
                                toast.success(`Reserva: Numero # ${event.id_reserva}`);
                            }}
                            onSelectSlot={(slotInfo) => {
                                const start = slotInfo.start;
                                const end = slotInfo.end;

                                if (isOverlapping(start, end)) {
                                    toast.error("No puede seleccionar un horario que ya está ocupado");
                                    return;
                                }

                                let adjustedStart = start;
                                let adjustedEnd = end;
                                const isFullDay = start.getHours() === 0 && start.getMinutes() === 0 && end.getHours() === 0 && end.getMinutes() === 0;

                                if (isFullDay) {
                                    adjustedStart = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 10, 0, 0);
                                    adjustedEnd = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 11, 0, 0);
                                }

                                const fi = formatearFechaLocal(adjustedStart);
                                const hi = adjustedStart.toTimeString().slice(0, 8);
                                const ff = formatearFechaLocal(adjustedEnd);
                                const hf = adjustedEnd.toTimeString().slice(0, 8);

                                setfechaInicio(fi);
                                setHoraInicio(hi);
                                setfechaFinalizacion(ff);
                                setHoraFinalizacion(hf);
                                setValorFechaHoraInicio(new Date(adjustedStart));
                                setValorFechaHoraFin(new Date(adjustedEnd));
                                setid_reserva(0);
                                setEstadoReserva("");

                                setQuickFechaInicio(fi);
                                setQuickHoraInicio(hi);
                                setQuickFechaFin(ff);
                                setQuickHoraFin(hf);
                                setQuickNombre(nombrePaciente || "");
                                setQuickApellido(apellidoPaciente || "");
                                setQuickRut(rut || "");
                                setQuickTelefono(telefono || "");
                                setQuickEmail(email || "");
                                setQuickPopupPos(calcularPosicionPopup(slotInfo));
                                setShowQuickPopup(true);
                            }}
                        />
                    </div>
                </div>
            </div>

            {showQuickPopup && (
                <>
                    <div className="fixed inset-0 z-40 bg-transparent" onMouseDown={cerrarPopup} />
                    <div
                        ref={popupRef}
                        className="fixed z-50 w-80 rounded-xl border border-slate-200 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-150"
                        style={{
                            top: quickPopupPos.top,
                            left: quickPopupPos.left,
                            transition: isDraggingPopup.current ? "none" : "top 180ms ease, left 180ms ease, box-shadow 180ms ease",
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <div
                            className="flex items-center justify-between px-4 pt-4 pb-2 cursor-grab active:cursor-grabbing select-none"
                            onMouseDown={(e) => {
                                e.stopPropagation();
                                isDraggingPopup.current = true;
                                dragOffset.current = {
                                    x: e.clientX - quickPopupPos.left,
                                    y: e.clientY - quickPopupPos.top,
                                };
                            }}
                        >
                            <h3 className="text-sm font-bold text-slate-800">Nueva Reserva</h3>
                            <button onClick={cerrarPopup} className="text-slate-400 hover:text-slate-600 transition-colors rounded-full p-1 hover:bg-slate-100">
                                x
                            </button>
                        </div>

                        <div className="mx-4 mb-3 bg-sky-50 border border-sky-100 rounded-lg px-3 py-2 flex items-center gap-2">
                            <span className="text-xs font-medium text-sky-700">
                                {quickFechaInicio} - {quickHoraInicio?.slice(0, 5)} a {quickHoraFin?.slice(0, 5)}
                            </span>
                        </div>

                        <div className="px-4 space-y-2">
                            <input
                                type="text"
                                placeholder="Nombre *"
                                value={quickNombre}
                                onChange={(e) => setQuickNombre(e.target.value)}
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                                autoFocus
                            />
                            <input
                                type="text"
                                placeholder="Apellido *"
                                value={quickApellido}
                                onChange={(e) => setQuickApellido(e.target.value)}
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                            />
                            <input
                                type="text"
                                placeholder="RUT *"
                                value={quickRut}
                                onChange={(e) => setQuickRut(normalizarRutInput(e.target.value))}
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                            />
                            <input
                                type="text"
                                placeholder="Telefono *"
                                value={quickTelefono}
                                onChange={(e) => setQuickTelefono(e.target.value)}
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                            />
                            <input
                                type="email"
                                placeholder="Correo *"
                                value={quickEmail}
                                onChange={(e) => setQuickEmail(e.target.value)}
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                            />
                        </div>

                        <div className="flex flex-col gap-2 px-4 pt-3 pb-4">
                            <div className="flex gap-2">
                                <button
                                    onClick={guardarDesdePopup}
                                    disabled={guardandoQuick}
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-sky-600 to-cyan-500 rounded-lg hover:from-sky-700 hover:to-cyan-600 transition-all duration-150 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {guardandoQuick ? "Guardando..." : "Guardar"}
                                </button>
                                <button
                                    onClick={cerrarPopup}
                                    className="px-4 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-150"
                                >
                                    Cancelar
                                </button>
                            </div>
                            <button
                                onClick={bloquearDesdePopup}
                                disabled={guardandoQuick}
                                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Bloquear horario
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
