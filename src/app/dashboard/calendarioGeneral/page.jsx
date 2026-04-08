"use client"

import {useState, useMemo, useEffect, useRef} from "react";
import {useRouter} from "next/navigation";
import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import ShadcnInput from "@/Componentes/shadcnInput2";
import ShadcnFechaHora from "@/Componentes/ShadcnFechaHora";
import ShadcnButton2 from "@/Componentes/shadcnButton2";
import ToasterClient from "@/Componentes/ToasterClient";
import {toast} from "react-hot-toast";


import es from "date-fns/locale/es";

const locales = {
    es: es,
};

const dfStartOfWeek = (date) => startOfWeek(date, {locale: es});

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: dfStartOfWeek,
    getDay,
    locales,
});

export default function Calendario() {

    const API = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const detalleReservaRef = useRef(null);

    // Estilos CSS personalizados para mejorar la visualización de eventos
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            /* Estilos para eventos en vista mes */
            .rbc-month-view .rbc-event {
                min-height: 28px !important;
                height: auto !important;
                padding: 6px 8px !important;
                line-height: 1.3 !important;
                white-space: normal !important;
                overflow: visible !important;
                word-break: break-word !important;
            }
            
            /* Estilos para eventos en vista semana y día */
            .rbc-time-view .rbc-event {
                min-height: 30px !important;
                height: auto !important;
                padding: 6px 8px !important;
                line-height: 1.3 !important;
                white-space: normal !important;
                overflow: visible !important;
                word-break: break-word !important;
            }
            
            /* Aumentar altura de las celdas del mes para que quepan los nombres */
            .rbc-month-view .rbc-day-slot {
                min-height: 80px !important;
            }
            
            /* Contenedor de eventos en mes */
            .rbc-row-segment {
                z-index: 1 !important;
            }
            
            /* Texto del evento */
            .rbc-event-label,
            .rbc-event-content {
                white-space: normal !important;
                overflow: visible !important;
                word-break: break-word !important;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const [events, setEvents] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState("month");


    const [nombrePaciente, setNombrePaciente] = useState("");
    const [apellidoPaciente, setApellidoPaciente] = useState("");
    const [rut, setRut] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [fechaInicio, setfechaInicio,] = useState("");
    const [fechaFinalizacion, setfechaFinalizacion,] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFinalizacion, setHoraFinalizacion] = useState("");
    const [estadoReserva, setEstadoReserva,] = useState("");
    const [id_reserva, setid_reserva] = useState(0);
    const [id_paciente, setId_paciente] = useState("");
    const [idPacienteSeleccionado, setIdPacienteSeleccionado] = useState("");
    const [actualizandoEstado, setActualizandoEstado] = useState(false);

    const [dataAgenda, setDataAgenda] = useState([] || []);

    function obtenerEstiloPorEstado(estadoReserva) {
        const estado = (estadoReserva ?? '').toLowerCase();

        if (estado === 'confirmada') {
            return { backgroundColor: '#16a34a', color: '#ffffff' };
        }

        if (estado === 'anulada') {
            return { backgroundColor: '#dc2626', color: '#ffffff' };
        }

        if (estado === 'asiste') {
            return { backgroundColor: '#fbcfe8', color: '#831843' };
        }

        if (estado === 'no asiste') {
            return { backgroundColor: '#fde68a', color: '#854d0e' };
        }

        return { backgroundColor: '#0284c7', color: '#ffffff' };
    }


    function formatearFechaLocal(d) {
        const y = d.getFullYear()
        const m = String(d.getMonth() + 1).padStart(2, "0")
        const day = String(d.getDate()).padStart(2, "0")
        return `${y}-${m}-${day}`
    }

    const manejarFechaHoraInicio = (dateTime) => {
        setfechaInicio(formatearFechaLocal(dateTime))
        setHoraInicio(dateTime.toTimeString().slice(0, 8))
    }

    const manejarFechaHoraFinalizacion = (dateTime) => {
        setfechaFinalizacion(formatearFechaLocal(dateTime))
        setHoraFinalizacion(dateTime.toTimeString().slice(0, 8))
    }


    function convertirAFechaCalendario(fechaISO, hora) {
        const soloFecha = fechaISO.slice(0, 10);
        return new Date(`${soloFecha}T${hora}`);
    }

    // Helper: comprueba si un rango [start, end) se solapa con alguna reserva en dataAgenda
    function isOverlapping(start, end) {
        if (!dataAgenda || dataAgenda.length === 0) return false;

        // Normalizamos a Date para comparar
        for (const cita of dataAgenda) {
            const evStart = convertirAFechaCalendario((cita.fechaInicio ?? "").slice(0, 10), (cita.horaInicio ?? "00:00:00"));
            const evEnd = convertirAFechaCalendario((cita.fechaFinalizacion ?? "").slice(0, 10), (cita.horaFinalizacion ?? "00:00:00"));

            // Si cualquier parte se solapa
            if (start < evEnd && end > evStart) {
                return true;
            }
        }

        return false;
    }


    async function cargarDataAgenda() {
        try {
            const res = await fetch(`${API}/reservaPacientes/seleccionarReservados`, {
                method: "GET",
                headers: {Accept: "application/json"}
            })

            if (!res.ok) {
                return toast.error('No fue posible cargar las agendas, Contacte a soporte de Medify')
            }

            const data = await res.json();
            setDataAgenda(data);

        } catch (err) {
            return toast.error(err.message)
        }
    }

    useEffect(() => {
        cargarDataAgenda()
    }, [])





    const messages = useMemo(
        () => ({
            next: "Siguiente",
            previous: "Anterior",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
            agenda: "Agenda",
            noEventsInRange: "No hay eventos",
        }),
        []
    );


    useEffect(() => {
        if (!dataAgenda || dataAgenda.length === 0) {
            setEvents([]);
            return;
        }

        const eventosCalendario = dataAgenda.map((cita) => ({
            // id de la reserva para poder abrir el detalle al seleccionar
            id_reserva: cita.id_reserva,
            id_paciente: cita.id_paciente,
            title: cita.nombrePaciente + " " + cita.apellidoPaciente,
            start: convertirAFechaCalendario(cita.fechaInicio, cita.horaInicio),
            end: convertirAFechaCalendario(cita.fechaFinalizacion, cita.horaFinalizacion),
            estadoReserva: cita.estadoReserva,
        }));

        setEvents(eventosCalendario);
    }, [dataAgenda]);

    // Permite que el contenido del evento haga wrap y no se corte en vistas con poco espacio
    const eventStyleGetter = (event) => {
        const { backgroundColor, color } = obtenerEstiloPorEstado(event.estadoReserva);

        return {
            style: {
                display: 'flex',
                alignItems: 'center',
                height: 'auto',
                minHeight: '28px',
                maxHeight: 'none',
                whiteSpace: 'normal',
                overflow: 'visible',
                textOverflow: 'clip',
                lineHeight: '1.3',
                padding: '6px 8px',
                fontSize: '0.8rem',
                boxSizing: 'border-box',
                borderRadius: '4px',
                backgroundColor,
                color,
                fontWeight: '500',
                wordBreak: 'break-word',
            },
        };
    };

    // Componente ligero para renderizar el título del evento permitiendo salto de línea
    const EventComponent = ({event}) => {
        // Usamos title para mostrar tooltip nativo con el nombre completo
        return (
            <div
                title={event.title}
                className="break-words text-[13px] leading-snug w-full"
                style={{
                    whiteSpace: 'normal',
                    overflow: 'visible',
                    wordBreak: 'break-word',
                    hyphens: 'auto',
                }}
            >
                {event.title}
            </div>
        );
    };

    // Componente que muestra SOLO el título (para vistas Day y Agenda)
    const TitleOnlyEvent = ({event}) => {
        return (
            <div
                title={event.title}
                className="break-words text-[13px] leading-snug font-medium w-full"
                style={{
                    whiteSpace: 'normal',
                    overflow: 'visible',
                    wordBreak: 'break-word',
                }}
            >
                {event.title}
            </div>
        );
    };



    async function seleccionarReservaEspecifica(id_reserva) {
        try {

            if (!id_reserva) {
                return toast.error("Debe seleccionar una Reserva");
            }

            const res = await fetch(`${API}/reservaPacientes/seleccionarEspecifica`, {
                method: "POST",
                headers: {Accept: "application/json", "Content-Type": "application/json"},
                mode: "cors",
                body: JSON.stringify({id_reserva})
            });

            if (!res.ok) {
                return toast.error("El servidor no responde")
            }

            const data = await res.json();


            let reserva;

            if (Array.isArray(data)) {
                reserva = data[0];
            } else {
                reserva = data;
            }

            if (!reserva) {
                return toast.error("Sin Data")
            }

            // Seteamos los inputs desde la reserva (objeto)
            setNombrePaciente(reserva.nombrePaciente ?? "");
            setApellidoPaciente(reserva.apellidoPaciente ?? "");
            setRut(reserva.rut ?? "");
            setEmail(reserva.email ?? "");
            setTelefono(reserva.telefono ?? "");
            setId_paciente(reserva.id_paciente ?? "");
            setIdPacienteSeleccionado(reserva.id_paciente ?? "");

            // Si tu endpoint trae estos campos, los cargamos también
            setfechaInicio((reserva.fechaInicio ?? "").slice(0, 10));
            setHoraInicio(reserva.horaInicio ?? "");
            setfechaFinalizacion((reserva.fechaFinalizacion ?? "").slice(0, 10));
            setHoraFinalizacion(reserva.horaFinalizacion ?? "");
            setEstadoReserva(reserva.estadoReserva ?? "");

        } catch (error) {
            console.log(error);
            return toast.error("El servidor no responde")
        }
    }

    async function actualizarEstadoReserva(nuevoEstadoReserva) {
        try {
            if (!id_reserva) {
                return toast.error("Debe seleccionar una reserva");
            }

            setActualizandoEstado(true);

            const res = await fetch(`${API}/sincronizacionAsistencia/desdeReserva`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                mode: "cors",
                body: JSON.stringify({
                    estadoReserva: nuevoEstadoReserva,
                    id_reserva
                })
            });

            if (!res.ok) {
                return toast.error("No fue posible actualizar el estado de la reserva");
            }

            const resultadoBackend = await res.json();

            if (resultadoBackend.message === true) {
                setEstadoReserva(nuevoEstadoReserva);
                await Promise.all([
                    seleccionarReservaEspecifica(id_reserva),
                    cargarDataAgenda()
                ]);
                return toast.success("Estado de asistencia actualizado correctamente");
            }

            return toast.error("No fue posible actualizar el estado de la reserva");
        } catch (error) {
            console.log(error);
            return toast.error("No fue posible actualizar el estado de la reserva");
        } finally {
            setActualizandoEstado(false);
        }
    }

    async function resolverIdPaciente() {
        const idDirecto = idPacienteSeleccionado || id_paciente;

        if (idDirecto) {
            return idDirecto;
        }

        if (!rut) {
            return null;
        }

        try {
            const res = await fetch(`${API}/pacientes/contieneRut`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                mode: "cors",
                body: JSON.stringify({ rut })
            });

            if (!res.ok) {
                return null;
            }

            const data = await res.json();
            const paciente = Array.isArray(data) ? data.find((item) => item?.rut === rut) ?? data[0] : data;
            const idPacienteEncontrado = paciente?.id_paciente ?? null;

            if (idPacienteEncontrado) {
                setId_paciente(idPacienteEncontrado);
                setIdPacienteSeleccionado(idPacienteEncontrado);
            }

            return idPacienteEncontrado;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    useEffect(() => {
        if (id_reserva) {
            seleccionarReservaEspecifica(id_reserva);
        }
    }, [id_reserva]);

    useEffect(() => {
        if (!id_reserva || !nombrePaciente) {
            return;
        }

        detalleReservaRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, [id_reserva, nombrePaciente]);


    function limpiarData() {
        setNombrePaciente("");
        setApellidoPaciente("");
        setTelefono("");
        setRut("");
        setEmail("");
    }


    return (
        // Contenedor con altura fija para que el calendario se muestre correctamente
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-8 md:px-10">
            <ToasterClient/>

            <div className="mx-auto w-full max-w-7xl">
                <div className="mb-6 flex flex-col gap-2">
                    <h1 className="text-2xl md:text-5xl font-bold tracking-tight text-slate-900">Calendario General</h1>
                    <p className="text-sm text-slate-600">Revisa tus reservas y actividades.</p>
                </div>


                <div className="mt-10">
                    <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl border border-slate-200 ring-1 ring-black/5 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 bg-white">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-900">Calendario de Reservas</h3>
                                    <p className="text-xs text-slate-500">Navega por mes/semana/día y selecciona una reserva para ver su detalle.</p>
                                </div>
                                <div className="flex items-center gap-4 flex-wrap">
                                    <div className="flex items-center gap-1.5">
                                      <span className="inline-block w-3 h-3 rounded-full bg-[#0284c7]" />
                                      <span className="text-xs text-slate-600">Reservada</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="inline-block w-3 h-3 rounded-full bg-[#16a34a]" />
                                      <span className="text-xs text-slate-600">Confirmada</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="inline-block w-3 h-3 rounded-full bg-[#dc2626]" />
                                      <span className="text-xs text-slate-600">Anulada</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="inline-block w-3 h-3 rounded-full bg-[#fbcfe8]" />
                                      <span className="text-xs text-slate-600">Asiste</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="inline-block w-3 h-3 rounded-full bg-[#fde68a]" />
                                      <span className="text-xs text-slate-600">No asiste</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 h-[700px]">
                            <Calendar
                                // Pasamos el localizador configurado para manejar fechas y formatos
                                localizer={localizer}
                                // Eventos que se mostrarán en el calendario
                                events={events}
                                // Evita que el título se corte en vistas comprimidas (p. ej. semana)
                                eventPropGetter={eventStyleGetter}
                                // Usamos componentes específicos: para day y agenda mostramos sólo el título
                                components={{
                                    event: EventComponent,
                                    day: {event: TitleOnlyEvent},
                                    agenda: {event: TitleOnlyEvent}
                                }}
                                // Propiedades que indican qué campos del evento usar para inicio y fin
                                startAccessor="start"
                                endAccessor="end"
                                // Mensajes personalizados para la UI del calendario
                                messages={messages}
                                culture="es"
                                date={currentDate}
                                onNavigate={(nextDate) => setCurrentDate(nextDate)}
                                view={currentView}
                                onView={(nextView) => setCurrentView(nextView)}
                                defaultView="month"
                                style={{height: "100%"}}

                                // Permite seleccionar rangos de tiempo en el calendario
                                selectable
                                // Evitar seleccionar rangos que choquen con reservas existentes
                                onSelecting={(slot) => {
                                    // slot puede ser {start, end} o directamente un objeto
                                    const start = slot.start ?? slot;
                                    const end = slot.end ?? slot;
                                    if (isOverlapping(start, end)) {
                                        toast.error('Horario no disponible (solapa con una reserva existente)');
                                        return false; // cancela la selección
                                    }
                                    return true;
                                }}

                                onSelectEvent={(event) => {
                                    if (!event?.id_reserva) {
                                        toast.error("No se encontró la reserva seleccionada");
                                        return;
                                    }
                                    setIdPacienteSeleccionado(event.id_paciente ?? "");
                                    toast.success("Reserva seleccionada");
                                    setid_reserva(event.id_reserva);
                                }}

                                /* Función que se ejecuta al seleccionar un rango de tiempo.
                                   Solicita al usuario el título del evento y lo añade a la lista de eventos */
                                onSelectSlot={(slotInfo) => {
                                    const start = slotInfo.start ?? slotInfo;
                                    const end = slotInfo.end ?? slotInfo;
                                    if (isOverlapping(start, end)) {
                                        toast.error('No puede seleccionar un horario que ya está ocupado');
                                        return;
                                    }
                                    const title = prompt("Título del evento");
                                    if (!title) return;

                                    setEvents((prev) => [
                                        ...prev,
                                        {
                                            title,
                                            start: slotInfo.start,
                                            end: slotInfo.end,
                                        },
                                    ]);
                                }}
                            />
                        </div>
                    </div>
                </div>

                {id_reserva ? (
                    <div ref={detalleReservaRef} className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Reserva seleccionada</p>
                                    <h3 className="mt-2 text-xl font-bold text-slate-900">
                                        {nombrePaciente} {apellidoPaciente}
                                    </h3>
                                </div>

                                <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                                    <span className="rounded-full bg-slate-100 px-3 py-1 font-medium">RUT: {rut || "-"}</span>
                                    <span className="rounded-full bg-slate-100 px-3 py-1 font-medium">Teléfono: {telefono || "-"}</span>
                                    <span className="rounded-full bg-slate-100 px-3 py-1 font-medium">Estado: {estadoReserva || "-"}</span>
                                </div>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                                        <p className="text-[11px] uppercase tracking-wide text-slate-500">Inicio</p>
                                        <p className="mt-1 text-sm font-semibold text-slate-900">{fechaInicio || "-"} {horaInicio ? `· ${horaInicio.slice(0, 5)}` : ""}</p>
                                    </div>
                                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                                        <p className="text-[11px] uppercase tracking-wide text-slate-500">Finalización</p>
                                        <p className="mt-1 text-sm font-semibold text-slate-900">{fechaFinalizacion || "-"} {horaFinalizacion ? `· ${horaFinalizacion.slice(0, 5)}` : ""}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:min-w-[220px]">
                                <button
                                    type="button"
                                    onClick={() => actualizarEstadoReserva("asiste")}
                                    disabled={actualizandoEstado}
                                    className="inline-flex items-center justify-center rounded-lg bg-pink-200 px-4 py-2.5 text-sm font-semibold text-pink-900 transition hover:bg-pink-300 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    Asiste
                                </button>
                                <button
                                    type="button"
                                    onClick={() => actualizarEstadoReserva("no asiste")}
                                    disabled={actualizandoEstado}
                                    className="inline-flex items-center justify-center rounded-lg bg-amber-200 px-4 py-2.5 text-sm font-semibold text-amber-900 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    No asiste
                                </button>
                                <button
                                    type="button"
                                    onClick={async () => {
                                        const destinoPaciente = await resolverIdPaciente();

                                        if (!destinoPaciente) {
                                            toast.error("No se encontró el paciente asociado a esta reserva");
                                            return;
                                        }

                                        router.push(`/dashboard/FichasPacientes/${destinoPaciente}`);
                                    }}
                                    className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
                                >
                                    Ver ficha del paciente
                                </button>
                            </div>
                        </div>
                    </div>
                ) : null}

            </div>

        </div>
    );
}
