"use client"
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import ToasterClient from "@/Componentes/ToasterClient";
import formatearFecha from "@/FuncionesTranversales/funcionesTranversales.js"
import { ShadcnButton } from "@/Componentes/shadcnButton";
import { useRouter } from "next/navigation";
import { InfoButton } from "@/Componentes/InfoButton";
import * as XLSX from "xlsx";


export default function Paciente() {

    const {id_paciente} = useParams();
    const [detallePaciente, setDetallePaciente] = useState([])
    const API = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    function nuevaFichaClinica() {
        const paciente = detallePaciente[0];
        if (!paciente) {
            router.push(`/dashboard/calendario`);
            return;
        }
        const params = new URLSearchParams({
            nombre: paciente.nombre || "",
            apellido: paciente.apellido || "",
            rut: paciente.rut || "",
            telefono: paciente.telefono || "",
            correo: paciente.correo || "",
        });
        router.push(`/dashboard/calendario?${params.toString()}`);
    }


    function editarFichaClinica(id_ficha) {
        router.push(`/dashboard/EdicionFicha/${id_ficha}`);
    }


    //PARAMETROS USESTATE PARA INSERCION DE DATOS EN PACIENTES
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [rut, setRut] = useState("");
    const [nacimiento, setNacimiento] = useState("");
    const [sexo, setSexo] = useState("");
    const [prevision, setPrevision] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [direccion, setDireccion] = useState("");
    const [pais, setPais] = useState("");



    const [checked, setChecked] = useState(true);


    //USESTATES PARA MANIPULAR DATOS DE LA FICHACLINICA
    const [tipoAtencion, setTipoAtencion] = useState("");
    const [motivoConsulta, setMotivoConsulta] = useState("");
    const [signosVitales, setSignosVitales] = useState("");
    const [observaciones, setObservaciones] = useState("");
    const [anotacionConsulta, setAnotacionConsulta] = useState("");
    const [anamnesis, setAnamnesis] = useState("");
    const [diagnostico, setDiagnostico] = useState("");
    const [indicaciones, setIndicaciones] = useState("");
    const [archivosAdjuntos, setArchivosAdjuntos] = useState("");
    const [fechaConsulta, setFechaConsulta] = useState("");
    const [estadoFicha, setEstadoFicha] = useState("");
    const [consentimientoFirmado, setConsentimientoFirmado] = useState("");


    //PARAMETROS PARA LISTAR FICHAS CLINICAS
    const [listaFichas, setListaFichas] = useState([]);
    const [reservasPaciente, setReservasPaciente] = useState([]);
    const [actualizandoEstadoId, setActualizandoEstadoId] = useState(null);


    //FUNCION PARA LA ELIMINACION LOGICA DE UNA FICHA CLINICA
    async function eliminarFicha(id_ficha) {
        try {
            if (!id_ficha) {
                return toast.error("Debe seleccionar al menos una ficha clinica");
            }

            const res = await fetch(`${API}/ficha/eliminarFichaClinica`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id_ficha}),
                mode: "cors",
                cache: "no-cache"
            })

            if (!res.ok) {
                return toast.error("No se puedo eliminar la ficha , contacte a soporte informatico");

            } else {

                const resultadoBackend = await res.json();

                if (resultadoBackend.message === true) {
                    await listarFichasClinicasPaciente(id_paciente)
                    return toast.success("Se ha eliminado la ficha con exito!")
                } else {
                    return toast.error("No se ha podido eliminar la ficha por favor intente mas tarde")
                }
            }
        } catch (error) {
            return toast.error("Ha ocurrido un error contacte a soporte tecnico");
        }
    }

    //FUNCION PARA LISTAR LAS FICHAS CLINICAS POR ID DE PACIENTE
    async function listarFichasClinicasPaciente(id_paciente) {
        try {
            if (!id_paciente) {
                return toast.error("No se ha seleccionado ningun Id, si el problema persiste contcate a soporte de Medify")
            } else {

                const res = await fetch(`${API}/ficha/seleccionarFichasPaciente`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id_paciente}),
                    mode: "cors"
                })


                if (!res.ok) {
                    return toast.error("Ha ocurrido un error Contacte a soporte de Medify")
                }

                const dataFichasClinicas = await res.json();
                setListaFichas(dataFichasClinicas);
            }
        } catch (e) {
            console.log(e)
            return toast.error("Ha ocurrido un error en el servidor: " + e)
        }

    }

    function normalizarFechaISO(fecha) {
        return (fecha ?? "").slice(0, 10);
    }

    function extraerHorarioAgendado(anotacionConsulta) {
        const texto = anotacionConsulta ?? "";
        const match = texto.match(/Hora de Agendamiento:\s*([0-2]\d:\d{2}(?::\d{2})?)\s*-\s*([0-2]\d:\d{2}(?::\d{2})?)/i);

        if (!match) {
            return null;
        }

        const normalizarHora = (hora) => hora.length === 5 ? `${hora}:00` : hora;

        return {
            horaInicio: normalizarHora(match[1]),
            horaFinalizacion: normalizarHora(match[2]),
        };
    }

    function obtenerReservaAsociada(ficha) {
        const paciente = detallePaciente[0];
        const horario = extraerHorarioAgendado(ficha.anotacionConsulta);

        if (!paciente?.rut || !ficha?.fechaConsulta || !horario) {
            return null;
        }

        const fechaFicha = normalizarFechaISO(ficha.fechaConsulta);

        const reservaExacta = reservasPaciente.find((reserva) =>
            (reserva.rut ?? "") === paciente.rut &&
            normalizarFechaISO(reserva.fechaFinalizacion) === fechaFicha &&
            (reserva.horaInicio ?? "") === horario.horaInicio &&
            (reserva.horaFinalizacion ?? "") === horario.horaFinalizacion
        );

        if (reservaExacta) {
            return reservaExacta;
        }

        return reservasPaciente.find((reserva) =>
            (reserva.rut ?? "") === paciente.rut &&
            normalizarFechaISO(reserva.fechaFinalizacion) === fechaFicha
        ) ?? null;
    }

    async function cargarReservasPaciente() {
        try {
            const res = await fetch(`${API}/reservaPacientes/seleccionarReservados`, {
                method: "GET",
                headers: {
                    Accept: "application/json"
                },
                mode: "cors"
            });

            if (!res.ok) {
                return toast.error("No fue posible cargar las reservas del paciente");
            }

            const data = await res.json();
            setReservasPaciente(Array.isArray(data) ? data : []);
        } catch (error) {
            console.log(error);
            return toast.error("No fue posible cargar las reservas del paciente");
        }
    }

    async function actualizarEstadoFichaYReserva(ficha, nuevoEstadoFicha, nuevoEstadoReserva) {
        const reservaAsociada = obtenerReservaAsociada(ficha);

        if (!reservaAsociada?.id_reserva) {
            return toast.error("No se encontró la reserva asociada a esta ficha clínica");
        }

        setActualizandoEstadoId(ficha.id_ficha);

        try {
            const [resFicha, resReserva] = await Promise.all([
                fetch(`${API}/ficha/editarFichaPaciente`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    mode: "cors",
                    body: JSON.stringify({
                        estadoFicha: nuevoEstadoFicha,
                        tipoAtencion: ficha.tipoAtencion ?? "",
                        motivoConsulta: ficha.motivoConsulta ?? "",
                        signosVitales: ficha.signosVitales ?? "",
                        observaciones: ficha.observaciones ?? "",
                        anotacionConsulta: ficha.anotacionConsulta ?? "",
                        anamnesis: ficha.anamnesis ?? "",
                        diagnostico: ficha.diagnostico ?? "",
                        indicaciones: ficha.indicaciones ?? "",
                        archivosAdjuntos: ficha.archivosAdjuntos ?? "",
                        fechaConsulta: normalizarFechaISO(ficha.fechaConsulta),
                        consentimientoFirmado: ficha.consentimientoFirmado ?? "",
                        id_ficha: ficha.id_ficha
                    })
                }),
                fetch(`${API}/reservaPacientes/actualizarEstado`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    mode: "cors",
                    body: JSON.stringify({
                        estadoReserva: nuevoEstadoReserva,
                        id_reserva: reservaAsociada.id_reserva
                    })
                })
            ]);

            if (!resFicha.ok || !resReserva.ok) {
                return toast.error("No fue posible actualizar el estado de asistencia");
            }

            const resultadoFicha = await resFicha.json();
            const resultadoReserva = await resReserva.json();

            if (resultadoFicha.message === true && resultadoReserva.message === true) {
                await Promise.all([
                    listarFichasClinicasPaciente(id_paciente),
                    cargarReservasPaciente()
                ]);
                return toast.success("Estado de asistencia actualizado correctamente");
            }

            return toast.error("No fue posible actualizar el estado de asistencia");
        } catch (error) {
            console.log(error);
            return toast.error("No fue posible actualizar el estado de asistencia");
        } finally {
            setActualizandoEstadoId(null);
        }
    }


    //FUNCION QUE PERMITE NAVEGAR ENTRE PAGINAS Y VOLVER A LA FECHA CLINCA CON USEROUTER
    function volverAFichas() {
        router.push("/dashboard/FichaClinica");
    }


    //FUNCION PARA LA ACTUALIZACION DE DATOS DEL PACIENTE
    async function actualizarDatosPacientes(nombre, apellido, rut, nacimiento, sexo, prevision, telefono, correo, direccion, pais, id_paciente) {

        let prevision_id = null;

        if (prevision.includes("FONASA")) {
            prevision_id = 1
        } else if (prevision.includes("ISAPRE")) {
            prevision_id = 2
        } else {
            prevision_id = 0
        }

        try {
            if (!nombre || !apellido || !rut || !nacimiento || !sexo || !prevision_id || !telefono || !correo || !direccion || !pais || !id_paciente) {
                return toast.error("Debe llenar todos los campos para proceder con la actualziacion")
            }

            const res = await fetch(`${API}/pacientes/pacientesActualizar`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                mode: "cors",
                body: JSON.stringify({
                    nombre,
                    apellido,
                    rut,
                    nacimiento,
                    sexo,
                    prevision_id,
                    telefono,
                    correo,
                    direccion,
                    pais,
                    id_paciente
                })
            })

            if (!res.ok) {
                return toast.error("Debe llenar todos los campos para proceder con la actualziacion")
            } else {
                const resultadoQuery = await res.json();
                if (resultadoQuery.message === true) {
                    setNombre("");
                    setApellido("");
                    setNacimiento("");
                    setTelefono("");
                    setCorreo("");
                    setDireccion("");
                    setRut("");
                    setSexo("");
                    setPais("");
                    await buscarPacientePorId(id_paciente);
                    return toast.success("Datos del paciente actualizados con Exito!");
                } else {
                    return toast.error("No se han podido Actualizar los datos del paciente. Intente mas tarde.")
                }
            }
        } catch (err) {
            console.log(err);
            return toast.error("Ha ocurrido un problema en el servidor")
        }
    }


    async function buscarPacientePorId(id_paciente) {
        try {
            if (!id_paciente) {
                return toast.error("No se puede cargar los datos del paciente seleccionado. Debe haber seleccionado el paciente para poder ver el detalle de los datos.");
            }
            const res = await fetch(`${API}/pacientes/pacientesEspecifico`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id_paciente})
            })

            if (!res.ok) {
                return toast.error("No se puede cargar los datos del paciente seleccionado.");
            }

            const dataPaciente = await res.json();
            // Asegurar que siempre guardamos un array para poder mapear sin errores
            setDetallePaciente(Array.isArray(dataPaciente) ? dataPaciente : [dataPaciente]);

        } catch (error) {
            console.log(error);
            return toast.error("No se puede cargar los datos del paciente seleccionado. Por favor contacte a soporte de Medify");

        }
    }

    // Ejecutar la búsqueda cuando cambie id_paciente (Next puede resolver el param después del primer render)
    useEffect(() => {
        if (!id_paciente) return;
        buscarPacientePorId(id_paciente)
    }, [id_paciente]);

    useEffect(() => {
        if (!id_paciente) return;
        listarFichasClinicasPaciente(id_paciente);
        cargarReservasPaciente();
    }, [id_paciente]);


    function previsionDeterminacion(id_prevision) {
        if (id_prevision === 1) return "ALTA";
        if (id_prevision === 2) return "TRATAMIENTO";
        if (id_prevision === 3) return "ABANDONO";
        return "SIN DEFINIR";
    }




    function descargarExcel() {
        if (listaFichas.length === 0) {
            return toast.error("No hay fichas para descargar");
        }

        const paciente = detallePaciente[0];
        const datos = listaFichas.map((ficha) => ({
            "Nº Ficha": ficha.id_ficha,
            "Fecha Consulta": formatearFecha(ficha.fechaConsulta) || "-",
            "Tipo Atención": ficha.tipoAtencion || "-",
            "Estado": estadoReservacion(ficha.estadoFicha),
            "Valor Sesión": ficha.observaciones || "-",
            "Medio de Pago": ficha.archivosAdjuntos || "-",
            "Anotación Consulta": ficha.anotacionConsulta || "-",
        }));

        const ws = XLSX.utils.json_to_sheet(datos);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Fichas Clínicas");

        const nombreArchivo = paciente
            ? `Fichas_${paciente.nombre}_${paciente.apellido}.xlsx`
            : `Fichas_Paciente_${id_paciente}.xlsx`;

        XLSX.writeFile(wb, nombreArchivo);
    }

    function estadoReservacion(estado) {
        if (estado === 1) return "RESERVADA";
        if (estado === 2) return "CONFIRMADA";
        if (estado === 3) return "ANULADA";
        if (estado === 4) return "ASISTE";
        if (estado === 5) return "NO ASISTE";
        return "SIN ESTADO";
    }

    function badgePorEstado(estado) {
        if (estado === 1) return "bg-blue-100 text-blue-800 ring-1 ring-blue-200";
        if (estado === 2) return "bg-green-100 text-green-800 ring-1 ring-green-200";
        if (estado === 3) return "bg-red-100 text-red-800 ring-1 ring-red-200";
        if (estado === 4) return "bg-green-100 text-green-800 ring-1 ring-green-200";
        if (estado === 5) return "bg-purple-100 text-purple-800 ring-1 ring-purple-200";
        return "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
    }


    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white px-4 py-6 md:px-8 lg:px-10">
            <ToasterClient />

            <div className="mx-auto w-full max-w-5xl">
                <div className="flex justify-end">
                    <InfoButton informacion={"En este apartado se mostrarán las fichas clínicas del paciente, ordenadas desde la más reciente a la más antigua, incluyendo tanto las fichas como sus anotaciones asociadas.\n\nPara editar una ficha clínica, debe seleccionarse el botón Editar, lo que lo llevará al formulario correspondiente donde podrá modificar la información de la ficha seleccionada.\n\nEn caso de eliminar una ficha clínica, deberá presionar el botón Eliminar. Esta acción removerá la ficha seleccionada del sistema.\n\nSi desea crear una nueva ficha clínica, debe seleccionar el botón Nueva Ficha, el cual lo dirigirá al formulario de ingreso para registrar una nueva ficha clínica."} />
                </div>

                <header className="mb-6 mt-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-2xl font-extrabold text-slate-900 md:text-5xl">Historial Clínico</h1>
                            <p className="mt-1 text-sm text-slate-500">Detalle y fichas del paciente</p>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="inline-flex items-center gap-3 self-start rounded-full bg-sky-50 px-3 py-2 text-sm text-sky-800 ring-1 ring-sky-200">
                                <span className="text-xs text-slate-500">Registros:</span>
                                <span className="font-medium">{detallePaciente.length}</span>
                            </div>
                            <div className="w-full sm:w-auto">
                                <ShadcnButton nombre={"Volver a Fichas Clinicas"} funcion={() => volverAFichas()} />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="mb-6">
                    {detallePaciente.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-500 shadow-sm">
                            No hay datos disponibles o se están cargando...
                        </div>
                    ) : (
                        detallePaciente.map((paciente) => (
                            <article key={paciente.id_paciente} className="overflow-hidden rounded-[28px] border border-sky-100/80 bg-white shadow-[0_18px_60px_-28px_rgba(14,116,144,0.35)] ring-1 ring-white/70">
                                <div className="bg-gradient-to-r from-sky-900 via-cyan-800 to-sky-700 px-5 py-6 sm:px-7">
                                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                        <div>
                                            <p className="text-[11px] uppercase tracking-[0.24em] text-sky-100/80">Paciente</p>
                                            <h2 className="mt-2 text-xl font-semibold tracking-tight text-white md:text-2xl">
                                                {paciente.nombre} {paciente.apellido}
                                            </h2>
                                            <div className="mt-3 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-sky-50 backdrop-blur-sm">
                                                RUT: {paciente.rut}
                                            </div>
                                        </div>
                                        <div className="md:text-right">
                                            <p className="text-[11px] uppercase tracking-[0.18em] text-sky-100/70">Estado</p>
                                            <span className="mt-2 inline-flex items-center rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-sky-900 shadow-sm">
                                                {previsionDeterminacion(paciente.prevision_id)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 sm:p-7">
                                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.9fr]">
                                        <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm">
                                            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Resumen del paciente</p>
                                            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                                <div className="rounded-xl border border-slate-100 bg-white px-4 py-3">
                                                    <p className="text-[11px] uppercase tracking-wide text-slate-500">Fecha de nacimiento</p>
                                                    <p className="mt-1 text-sm font-semibold text-slate-900">{formatearFecha(paciente.nacimiento) || "-"}</p>
                                                </div>
                                                <div className="rounded-xl border border-slate-100 bg-white px-4 py-3">
                                                    <p className="text-[11px] uppercase tracking-wide text-slate-500">Sexo</p>
                                                    <p className="mt-1 text-sm font-semibold text-slate-900">{paciente.sexo || "-"}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-5 shadow-sm">
                                            <p className="text-[11px] uppercase tracking-[0.18em] text-sky-800/70">Contacto</p>
                                            <div className="mt-4 space-y-3">
                                                <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-sky-100">
                                                    <p className="text-[11px] uppercase tracking-wide text-slate-500">Teléfono</p>
                                                    <p className="mt-1 text-sm font-semibold text-slate-900">{paciente.telefono || "-"}</p>
                                                </div>
                                                <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-sky-100">
                                                    <p className="text-[11px] uppercase tracking-wide text-slate-500">Correo</p>
                                                    <p className="mt-1 break-all text-sm font-semibold text-slate-900">{paciente.correo || "-"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))
                    )}
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <div className="w-full sm:w-auto">
                        <ShadcnButton nombre={"Ver Historial"} funcion={() => listarFichasClinicasPaciente(id_paciente)} />
                    </div>
                    <div className="w-full sm:w-auto">
                        <ShadcnButton nombre={"Nueva Ficha"} funcion={() => nuevaFichaClinica(id_paciente)} />
                    </div>
                    {listaFichas.length > 0 && (
                        <div className="w-full sm:w-auto">
                            <ShadcnButton nombre={"Descargar Excel"} funcion={() => descargarExcel()} />
                        </div>
                    )}
                </div>

                <section className="mt-8 grid grid-cols-1 gap-4">
                    {listaFichas.length === 0 ? (
                        <div className="text-center text-sm text-slate-500">No hay fichas cargadas para este paciente.</div>
                    ) : (
                        listaFichas.map((ficha) => (
                            <article key={ficha.id_ficha} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                    <h3 className="text-base font-bold text-slate-900 md:text-lg">Ficha Nº{ficha.id_ficha}</h3>
                                    <span className={`inline-flex items-center self-start rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${badgePorEstado(ficha.estadoFicha)}`}>
                                        {estadoReservacion(ficha.estadoFicha)}
                                    </span>
                                </div>

                                <div className="my-4 h-px w-full bg-slate-100" />

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Fecha Reservación</p>
                                        <p className="mt-1 text-sm font-semibold text-slate-800">{formatearFecha(ficha.fechaConsulta)}</p>
                                    </div>
                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Tipo Atención</p>
                                        <p className="mt-1 text-sm font-semibold text-slate-800">{ficha.tipoAtencion || "-"}</p>
                                    </div>
                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Valor Sesión</p>
                                        <p className="mt-1 text-sm font-semibold text-slate-800">{ficha.observaciones || "-"}</p>
                                    </div>
                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Estado</p>
                                        <p className="mt-1 text-sm font-bold text-slate-800">{estadoReservacion(ficha.estadoFicha)}</p>
                                    </div>
                                </div>

                                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 xl:col-span-1">
                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Medio de Pago</p>
                                        <p className="mt-1 text-sm font-semibold text-slate-800">{ficha.archivosAdjuntos || "-"}</p>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Anotación General de Consulta</p>
                                    <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-slate-700">{ficha.anotacionConsulta || "-"}</p>
                                </div>

                                <div className="my-4 h-px w-full bg-slate-100" />

                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <div className="w-full sm:w-auto">
                                        <ShadcnButton funcion={() => editarFichaClinica(ficha.id_ficha)} nombre={"Editar"} />
                                    </div>
                                    <div className="w-full sm:w-auto">
                                        <ShadcnButton funcion={() => eliminarFicha(ficha.id_ficha)} nombre={"Eliminar"} />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => actualizarEstadoFichaYReserva(ficha, 4, "asiste")}
                                        disabled={actualizandoEstadoId === ficha.id_ficha}
                                        className="inline-flex w-full items-center justify-center rounded-lg bg-pink-200 px-4 py-2 text-sm font-semibold text-pink-900 transition hover:bg-pink-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                                    >
                                        Asiste
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => actualizarEstadoFichaYReserva(ficha, 5, "no asiste")}
                                        disabled={actualizandoEstadoId === ficha.id_ficha}
                                        className="inline-flex w-full items-center justify-center rounded-lg bg-amber-200 px-4 py-2 text-sm font-semibold text-amber-900 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                                    >
                                        No asiste
                                    </button>
                                </div>
                            </article>
                        ))
                    )}
                </section>
            </div>
        </div>
    )
}
