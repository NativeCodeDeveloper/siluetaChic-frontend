"use client"
import {useParams} from "next/navigation";
import {useState, useEffect} from "react";
import {toast} from "react-hot-toast";
import ToasterClient from "@/Componentes/ToasterClient";
import formatearFecha from "@/FuncionesTranversales/funcionesTranversales.js"
import {ShadcnButton} from "@/Componentes/shadcnButton";
import {useRouter} from "next/navigation";
import {ShadcnInput} from "@/Componentes/shadcnInput";
import {ShadcnSelect} from "@/Componentes/shadcnSelect";
import ShadcnDatePicker from "@/Componentes/shadcnDatePicker";
import * as React from "react";
import {CheckboxIcon} from "@radix-ui/react-icons";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {InfoButton} from "@/Componentes/InfoButton";


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


    function previsionDeterminacion(id_prevision) {
        let previsionString = null;

        if (id_prevision === 1) {
            previsionString = "NO APLICA"
        } else if (id_prevision === 2) {
            previsionString = "NO APLICA"
        } else {
            previsionString = "SIN DEFINIR"
        }
        return previsionString;
    }




    function estadoReservacion(estado) {
        if (estado === 1) return "RESERVADA";
        if (estado === 2) return "CONFIRMADA";
        if (estado === 3) return "ANULADA";
        return "SIN ESTADO";
    }

    function badgePorEstado(estado) {
        if (estado === 1) return "bg-blue-100 text-blue-800 ring-1 ring-blue-200";
        if (estado === 2) return "bg-green-100 text-green-800 ring-1 ring-green-200";
        if (estado === 3) return "bg-red-100 text-red-800 ring-1 ring-red-200";
        return "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
    }


    return (
        <div>
            <ToasterClient/>

            {/*PANTALLAS MOVILES*/}
            <div className="block md:hidden min-h-screen bg-gradient-to-b from-sky-50 via-white to-white py-10">

                <div className="max-w-5xl mx-auto px-4">
                    <header className="mb-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">Historial
                                    Clínico</h1>
                                <p className="mt-1 text-sm text-slate-500">Detalle y fichas del paciente</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="hidden sm:flex items-center gap-3">
                                    <span className="text-xs text-slate-500">Registros:</span>
                                    <span
                                        className="inline-flex items-center px-3 py-1 rounded-full bg-sky-100 text-sky-800 font-medium text-sm">{detallePaciente.length}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShadcnButton className="text-base" nombre={"Volver a Fichas Clinicas"}
                                                  funcion={() => volverAFichas()}/>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* CONTENEDOR CON INFORMACION DEL PACIENTE */}
                    <div className="mb-6">
                        {detallePaciente.length === 0 ? (

                            <div
                                className="rounded-lg border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-500 shadow-sm">No
                                hay datos disponibles o se están cargando...</div>
                        ) : (
                            detallePaciente.map(paciente => (
                                <article key={paciente.id_paciente}
                                         className="bg-white rounded-2xl shadow-lg border border-sky-50 overflow-hidden">
                                    <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        <div className="sm:col-span-2">
                                            <div className="flex items-start justify-between">
                                                <div>

                                                    <span> PREVISIÓN : </span>
                                                    <span
                                                        className="inline-flex items-center p-2 mr-2 rounded-full text-xs font-medium bg-sky-100 text-sky-800"> Previsión : {previsionDeterminacion(paciente.prevision_id)}</span>

                                                    <h2 className="text-base mt-5 font-semibold text-slate-900">{paciente.nombre} {paciente.apellido}</h2>
                                                    <p className="mt-1 text-xs text-slate-500">RUT: <span
                                                        className="font-medium text-slate-700">{paciente.rut}</span></p>
                                                </div>
                                                <div className="text-right">
                                                </div>
                                            </div>

                                            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="bg-slate-50 p-3 rounded-md">
                                                    <p className="text-xs text-slate-500">Fecha de nacimiento</p>
                                                    <p className="mt-1 text-xs font-medium text-slate-700">{formatearFecha(paciente.nacimiento)}</p>
                                                </div>

                                                <div className="bg-slate-50 p-3 rounded-md">
                                                    <p className="text-xs text-slate-500">Sexo</p>
                                                    <p className="mt-1 text-xs font-medium text-slate-700">{paciente.sexo}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-1">
                                            <div className="flex flex-col gap-3">
                                                <div className=" bg-slate-50 p-3 rounded-md">
                                                    <p className="text-xs text-slate-500">Teléfono</p>
                                                    <p className="mt-1  text-xs font-medium text-slate-700">{paciente.telefono || '-'}</p>
                                                </div>
                                                <div className="text-sm bg-slate-50 p-3 rounded-md">
                                                    <p className="text-xs text-slate-500">Correo</p>
                                                    <p className="mt-1 text-xs font-medium text-slate-700 break-all">{paciente.correo || '-'}</p>
                                                </div>
                                                <div className="text-xs bg-slate-50 p-3 rounded-md">
                                                    <p className="text-xs text-slate-500">Dirección</p>
                                                    <p className="mt-1 text-xs font-medium text-slate-700">{paciente.direccion || '-'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>

                    {/*BOTONES VER FICHAS Y NUEVA FICHA*/}
                    <div className="mt-4 flex justify gap-4">
                        <ShadcnButton nombre={"Ver Fichas"} funcion={() => listarFichasClinicasPaciente(id_paciente)}/>

                        <ShadcnButton nombre={"Nueva Ficha"} funcion={() => nuevaFichaClinica(id_paciente)}/>


                    </div>
                    {/* Fichas Listado */}
                    <section className="mt-8 grid grid-cols-1 gap-4">
                        {listaFichas.length === 0 ? (
                            <div className="text-center text-sm text-slate-500">No hay fichas cargadas para este paciente.</div>
                        ) : (
                            listaFichas.map((ficha) => (
                                <article key={ficha.id_ficha}
                                         className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-base font-bold text-slate-900">Ficha #{ficha.id_ficha}</h3>
                                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${badgePorEstado(ficha.estadoFicha)}`}>
                                            {estadoReservacion(ficha.estadoFicha)}
                                        </span>
                                    </div>

                                    <div className="my-3 h-px w-full bg-slate-100" />

                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Fecha</p>
                                            <p className="mt-0.5 text-xs font-medium text-slate-800">{formatearFecha(ficha.fechaConsulta)}</p>
                                        </div>
                                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Tipo</p>
                                            <p className="mt-0.5 text-xs font-medium text-slate-800">{ficha.tipoAtencion || '-'}</p>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Anotación General</p>
                                        <p className="mt-1 text-xs leading-relaxed whitespace-pre-line text-slate-700">{ficha.anotacionConsulta || '-'}</p>
                                    </div>

                                    <div className="my-3 h-px w-full bg-slate-100" />

                                    <div className="flex gap-2">
                                        <ShadcnButton funcion={() => editarFichaClinica(ficha.id_ficha)} nombre={"Editar"} />
                                        <ShadcnButton funcion={() => eliminarFicha(ficha.id_ficha)} nombre={"Eliminar"} />
                                    </div>
                                </article>
                            ))
                        )}
                    </section>

                </div>

            </div>


            {/*PANTALLAS ESCRITORIO*/}
            <div className="hidden md:block min-h-screen bg-gradient-to-b from-sky-50 via-white to-white py-10">
                <div className="max-w-5xl mx-auto px-4 flex justify-end">
                    <InfoButton informacion={'En este apartado se mostrarán las fichas clínicas del paciente, ordenadas desde la más reciente a la más antigua, incluyendo tanto las fichas como sus anotaciones asociadas.\n' +
                        '\n' +
                        'Para editar una ficha clínica, debe seleccionarse el botón Editar, lo que lo llevará al formulario correspondiente donde podrá modificar la información de la ficha seleccionada.\n' +
                        '\n' +
                        'En caso de eliminar una ficha clínica, deberá presionar el botón Eliminar. Esta acción removerá la ficha seleccionada del sistema.\n' +
                        '\n' +
                        'Si desea crear una nueva ficha clínica, debe seleccionar el botón Nueva Ficha, el cual lo dirigirá al formulario de ingreso para registrar una nueva ficha clínica.'} />
                </div>

                <div className="max-w-5xl mx-auto px-4">
                    <header className="mb-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-5xl  font-extrabold text-gray-800">Historial
                                    Clínico</h1>
                                <p className="mt-1 text-sm text-slate-500">Detalle y fichas del paciente</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="hidden sm:flex items-center gap-3">
                                    <span className="text-xs text-slate-500">Registros:</span>
                                    <span
                                        className="inline-flex items-center px-3 py-1 rounded-full bg-sky-100 text-sky-800 font-medium text-sm">{detallePaciente.length}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShadcnButton nombre={"Volver a Fichas Clinicas"} funcion={() => volverAFichas()}/>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* CONTENEDOR CON INFORMACION DEL PACIENTE */}
                    <div className="mb-6">
                        {detallePaciente.length === 0 ? (
                            <div
                                className="rounded-lg border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-500 shadow-sm">No
                                hay datos disponibles o se están cargando...</div>
                        ) : (
                            detallePaciente.map(paciente => (
                                <article key={paciente.id_paciente}
                                         className="bg-white rounded-2xl shadow-lg border border-sky-50 overflow-hidden">
                                    <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        <div className="sm:col-span-2">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">{paciente.nombre} {paciente.apellido}</h2>
                                                    <p className="mt-1 text-sm text-slate-500">RUT: <span
                                                        className="font-medium text-slate-700">{paciente.rut}</span></p>
                                                </div>
                                                <div className="text-right">
                                                <span
                                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-sky-100 text-sky-800">Previsión : {previsionDeterminacion(paciente.prevision_id)}</span>
                                                </div>
                                            </div>

                                            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="bg-slate-50 p-3 rounded-md">
                                                    <p className="text-xs text-slate-500">Fecha de nacimiento</p>
                                                    <p className="mt-1 font-medium text-slate-700">{formatearFecha(paciente.nacimiento)}</p>
                                                </div>
                                                <div className="bg-slate-50 p-3 rounded-md">
                                                    <p className="text-xs text-slate-500">Sexo</p>
                                                    <p className="mt-1 font-medium text-slate-700">{paciente.sexo}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-1">
                                            <div className="flex flex-col gap-3">
                                                <div className="text-sm bg-slate-50 p-3 rounded-md">
                                                    <p className="text-xs text-slate-500">Teléfono</p>
                                                    <p className="mt-1 font-medium text-slate-700">{paciente.telefono || '-'}</p>
                                                </div>
                                                <div className="text-sm bg-slate-50 p-3 rounded-md">
                                                    <p className="text-xs text-slate-500">Correo</p>
                                                    <p className="mt-1 font-medium text-slate-700 break-all">{paciente.correo || '-'}</p>
                                                </div>
                                                <div className="text-sm bg-slate-50 p-3 rounded-md">
                                                    <p className="text-xs text-slate-500">Dirección</p>
                                                    <p className="mt-1 font-medium text-slate-700">{paciente.direccion || '-'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>

                    {/*BOTONES VER FICHAS Y NUEVA FICHA*/}
                    <div className="mt-4 flex justify gap-4">
                        <ShadcnButton nombre={"Ver Historial"} funcion={() => listarFichasClinicasPaciente(id_paciente)}/>

                        <ShadcnButton nombre={"Nueva Ficha"} funcion={() => nuevaFichaClinica(id_paciente)}/>


                    </div>
                    {/* Fichas Listado */}
                    <section className="mt-8 grid grid-cols-1 gap-4">
                        {listaFichas.length === 0 ? (
                            <div className="text-center text-sm text-slate-500">No hay fichas cargadas para este paciente.</div>
                        ) : (
                            listaFichas.map((ficha) => (
                                <article key={ficha.id_ficha}
                                         className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <h3 className="text-lg font-bold text-slate-900">Ficha Nº{ficha.id_ficha}</h3>
                                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${badgePorEstado(ficha.estadoFicha)}`}>
                                                {estadoReservacion(ficha.estadoFicha)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="my-4 h-px w-full bg-slate-100" />

                                    <div className="grid grid-cols-4 gap-3">
                                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Fecha Reservación</p>
                                            <p className="mt-1 text-sm font-semibold text-slate-800">{formatearFecha(ficha.fechaConsulta)}</p>
                                        </div>
                                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Tipo Atención</p>
                                            <p className="mt-1 text-sm font-semibold text-slate-800">{ficha.tipoAtencion || '-'}</p>
                                        </div>
                                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Valor Sesión</p>
                                            <p className="mt-1 text-sm font-semibold text-slate-800">{ficha.observaciones || '-'}</p>
                                        </div>
                                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Estado</p>
                                            <p className="mt-1 text-sm font-bold text-slate-800">{estadoReservacion(ficha.estadoFicha)}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Anotación General de Consulta</p>
                                        <p className="mt-1 text-sm leading-relaxed whitespace-pre-line text-slate-700">{ficha.anotacionConsulta || '-'}</p>
                                    </div>

                                    <div className="my-4 h-px w-full bg-slate-100" />

                                    <div className="flex gap-4">
                                        <ShadcnButton funcion={() => editarFichaClinica(ficha.id_ficha)} nombre={"Editar"} />
                                        <ShadcnButton funcion={() => eliminarFicha(ficha.id_ficha)} nombre={"Eliminar"} />
                                    </div>
                                </article>
                            ))
                        )}
                    </section>

                </div>

            </div>
        </div>
    )
}