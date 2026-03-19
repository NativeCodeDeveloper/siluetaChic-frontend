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
import {InfoButton} from "@/Componentes/InfoButton";




export default function Paciente(){

    const {id_paciente} = useParams();
    const [detallePaciente, setDetallePaciente] = useState([])
    const API = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const [mostrarFormulario, setMostrarFormulario] = useState(false);




    //PARAMETROS USESTATE PARA INSERCION DE DATOS EN PACIENTES
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [rut, setRut] = useState("");
    const [nacimiento, setNacimiento] = useState("");
    const [sexo, setSexo] = useState("");
    const [prevision, setPrevision] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const[observaciones, setObservaciones] = useState("");

    function volverAingreso(){
        router.push("/dashboard/GestionPaciente");
    }


    function convertirFecha(isoString) {
        if (!isoString) return null;

        if (typeof isoString === "string") {
            const match = isoString.match(/^(\d{4}-\d{2}-\d{2})/);
            if (match) {
                return match[1];
            }
        }

        const date = new Date(isoString);
        if (Number.isNaN(date.getTime())) {
            return null;
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    function formatearRutInput(valor) {
        const limpio = (valor ?? "").replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 9);
        if (!limpio) return "";
        if (limpio.length === 1) return limpio;

        const cuerpo = limpio.slice(0, -1).replace(/\D/g, "");
        const dv = limpio.slice(-1).replace(/[^0-9K]/g, "");

        if (!cuerpo && dv) return dv;

        const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return dv ? `${cuerpoFormateado}-${dv}` : cuerpoFormateado;
    }

    function formatearRut(rutSinFormato) {
        const limpio = (rutSinFormato ?? "").replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
        if (limpio.length < 7 || limpio.length > 9) return null;
        const cuerpo = limpio.slice(0, -1);
        const dv = limpio.slice(-1);
        const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return `${cuerpoFormateado}-${dv}`;
    }


    //FUNCION PARA LA ACTUALIZACION DE DATOS DEL PACIENTE
    async function actualizarDatosPacientes(nombre,apellido,rut,nacimiento,sexo, prevision,telefono,correo,observaciones,id_paciente ) {

        let prevision_id = null;

        if (prevision.includes("ALTA")) {
            prevision_id = 1
        }else if (prevision.includes("TRATAMIENTO")) {
            prevision_id = 2
        }else if (prevision.includes("ABANDONO")) {
            prevision_id = 3
        }else if (prevision.includes("EVALUACION")) {
            prevision_id = 4
        }else {
            prevision_id = 0
        }

        try {
            if (!nombre || !apellido || !rut || !nacimiento || !sexo || !prevision_id || !telefono || !correo || !id_paciente) {
                return toast.error("Debe llenar todos los campos para proceder con la actualziacion")
            }

            const rutFormateado = formatearRut(rut);
            if (!rutFormateado) {
                return toast.error("El RUT debe tener entre 7 y 9 caracteres válidos");
            }

            const res = await fetch(`${API}/pacientes/pacientesActualizar`, {
                method: "POST",
                headers: {Accept: "application/json",
                    "Content-Type": "application/json"},
                mode: "cors",
                body: JSON.stringify({
                    nombre,
                    apellido,
                    rut: rutFormateado,
                    nacimiento : convertirFecha(nacimiento),
                    sexo,
                    prevision_id,
                    telefono,
                    correo,
                    direccion: "--",
                    pais: "--",
                    observaciones,
                    id_paciente})
            })

            if(!res.ok) {
                return toast.error("Debe llenar todos los campos para proceder con la actualziacion, El servidor no esta recibiendo la informacion correcta.")

            } else{

                const resultadoQuery = await res.json();

                if(resultadoQuery.message === true){
                    setNombre("");
                    setApellido("");
                    setNacimiento("");
                    setTelefono("");
                    setCorreo("");
                    setRut("");
                    setSexo("");
                    setObservaciones("");
                    await buscarPacientePorId(id_paciente);
                    return toast.success("Datos del paciente actualizados con Exito!");

                }else{
                    return toast.error("No se han podido Actualizar los datos del paciente. Intente mas tarde.")
                }
            }
        }catch(err) {
            console.log(err);
            return toast.error("Ha ocurrido un problema en el servidor")
        }
    }


    async function buscarPacientePorId(id_paciente){
        try {
            if(!id_paciente){
                return toast.error("No se puede cargar los datos del paciente seleccionado. Debe haber seleccionado el paciente para poder ver el detalle de los datos.");
            }

            const res = await fetch(`${API}/pacientes/pacientesEspecifico`, {
                method: "POST",
                headers: {Accept: "application/json",
                    "Content-Type": "application/json"},
                body: JSON.stringify({id_paciente})
            })

            if(!res.ok){
                return toast.error("No se puede cargar los datos del paciente seleccionado.");
            }

            const dataPaciente = await res.json();
            // Asegurar que siempre guardamos un array para poder mapear sin errores
            setDetallePaciente(Array.isArray(dataPaciente) ? dataPaciente : [dataPaciente]);

        }catch(error){
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
        if (detallePaciente.length > 0) {
            const paciente = detallePaciente[0];
            setNombre(paciente.nombre);
            setApellido(paciente.apellido);
            setRut(formatearRutInput(paciente.rut));
            setNacimiento(paciente.nacimiento);
            setSexo(paciente.sexo);
            setTelefono(paciente.telefono);
            setCorreo(paciente.correo);
            setObservaciones(paciente.observaciones || "");
        }
    }, [detallePaciente]);





    function previsionDeterminacion(id_prevision){
        let previsionString = null;

        if(id_prevision === 1){
            previsionString = "ALTA"
        }else if(id_prevision === 2){
            previsionString = "TRATAMIENTO"
        } else if(id_prevision === 3){
            previsionString = "ABANDONO"
        }else if(id_prevision === 4){
            previsionString = "EVALUACION"
        }else{
            previsionString = "SIN DEFINIR"
        }
        return previsionString;
    }



    async function eliminarPaciente(id_paciente){
        try {
            if(!id_paciente){
                return toast.error("No se puede eliminar el paciente si no hay pacientes seleccionados.")
            }

            const res = await fetch(`${API}/pacientes/eliminarPaciente`, {
                method: "POST",
                headers: {Accept: "application/json",
                "Content-Type": "application/json"},
                body: JSON.stringify({id_paciente})
            })

            if(!res.ok){
                return toast.error("No se ha podido eliminar paciente, contacte a soporte de NativeCode (Problema en el servidor)")
            }else{

                const resultadoBackend = await res.json();
                if(resultadoBackend.message === true){
                    return toast.success("Se ha eliminado correctamente el paciente de la base de datos")
                }else{
                    return toast.error("No se ha podido elimnar al paciente de la base de datos, el mensaje que llega se contepla como false")
                }
            }
        }catch (error) {
            return toast.error('No ha sido posible eliminar al paciente, contacte a soporte ')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white py-6 sm:py-8">
            <ToasterClient/>

            <div className='flex justify-end mr-55'>
                <InfoButton informacion={"⚠️ Consideración importante:\n" +
                    "Si un paciente es eliminado, no será posible acceder a sus fichas clínicas, ya que estas quedarán ocultas en el sistema."}/>
            </div>

            <div className="max-w-5xl mx-auto px-4">
                <header className="mb-5 sm:mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">Datos del Paciente</h1>
                            <p className="mt-1 text-sm text-slate-600">Información de contacto del Paciente </p>
                        </div>
                        <div className="hidden sm:flex items-center gap-2">
                            <span className="text-xs text-slate-500">Registros:</span>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-sky-100 text-sky-900 font-semibold text-xs">{detallePaciente.length}</span>
                            <ShadcnButton nombre={"Volver a Ingreso"} funcion={()=> volverAingreso()}/>
                        </div>
                    </div>
                </header>

                <div className="space-y-3">
                    {detallePaciente.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-5 text-center text-sm text-slate-600 shadow-sm">No hay datos disponibles o se están cargando...</div>
                    ) : (
                        detallePaciente.map(paciente => (
                            <article key={paciente.id_paciente} className="overflow-hidden rounded-[28px] border border-sky-100/80 bg-white shadow-[0_18px_60px_-28px_rgba(14,116,144,0.35)] ring-1 ring-white/70">
                                <div className="bg-gradient-to-r from-sky-900 via-cyan-800 to-sky-700 px-5 py-6 sm:px-7">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <p className="text-[11px] uppercase tracking-[0.24em] text-sky-100/80">Paciente</p>
                                            <h2 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight text-white">{paciente.nombre} {paciente.apellido}</h2>
                                            <div className="mt-3 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-sky-50 backdrop-blur-sm">
                                                RUT: {paciente.rut}
                                            </div>
                                        </div>
                                        <div className="sm:text-right">
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
                                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                <div className="rounded-xl border border-slate-100 bg-white px-4 py-3">
                                                    <p className="text-[11px] uppercase tracking-wide text-slate-500">Fecha de nacimiento</p>
                                                    <p className="mt-1 text-sm font-semibold text-slate-900">{formatearFecha(paciente.nacimiento) ?? '---'}</p>
                                                </div>
                                                <div className="rounded-xl border border-slate-100 bg-white px-4 py-3">
                                                    <p className="text-[11px] uppercase tracking-wide text-slate-500">Sexo</p>
                                                    <p className="mt-1 text-sm font-semibold text-slate-900">{paciente.sexo ?? '---'}</p>
                                                </div>
                                                <div className="rounded-xl border border-slate-100 bg-white px-4 py-3">
                                                    <p className="text-[11px] uppercase tracking-wide text-slate-500">Número de ficha</p>
                                                    <p className="mt-1 text-sm font-semibold text-slate-900">{paciente.observaciones ?? '---'}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-5 shadow-sm">
                                            <p className="text-[11px] uppercase tracking-[0.18em] text-sky-800/70">Contacto</p>
                                            <div className="mt-4 space-y-3">
                                                <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-sky-100">
                                                    <p className="text-[11px] uppercase tracking-wide text-slate-500">Teléfono</p>
                                                    <p className="mt-1 text-sm font-semibold text-slate-900">{paciente.telefono ?? '---'}</p>
                                                </div>
                                                <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-sky-100">
                                                    <p className="text-[11px] uppercase tracking-wide text-slate-500">Correo</p>
                                                    <p className="mt-1 text-sm font-semibold text-slate-900 break-all">{paciente.correo ?? '---'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))
                    )}
                </div>

                <div className="mt-6 flex justify-center sm:justify-end gap-6">
                    <ShadcnButton nombre={'Eliminar Paciente'} funcion={()=> eliminarPaciente(id_paciente)}/>
                    <ShadcnButton nombre={mostrarFormulario ?  "Ocultar Formulario" : "Actualizar Datos" } funcion={()=> setMostrarFormulario((estadoBooleano) => !estadoBooleano)}/></div>

            </div>

            {/* FORMULARIO DE ACTUALIZACION */}
            {mostrarFormulario ? (
                <div className="mt-6 max-w-5xl mx-auto bg-white/90 backdrop-blur rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-sm ring-1 ring-slate-100/60">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base sm:text-lg font-semibold text-slate-900">Actualizar Datos Paciente</h2>
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div className="">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Nombre</label>
                            <div className="mt-1">
                                <ShadcnInput
                                    value={nombre}
                                    placeholder={"Ej: Jose Nicolas "}
                                    onChange={(e) => setNombre(e.target.value)} className="bg-slate-50/70 border-slate-200 focus:border-sky-400 focus:ring-sky-200" />
                            </div>
                        </div>


                        <div className="">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Apellido</label>
                            <div className="mt-1">
                                <ShadcnInput
                                    value={apellido}
                                    placeholder={"Ej: Gonzalez Garrido "}
                                    onChange={(e) => setApellido(e.target.value)} className="bg-slate-50/70 border-slate-200 focus:border-sky-400 focus:ring-sky-200" />
                            </div>
                        </div>

                        <div className="">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Número Identificación (RUT)</label>
                            <div className="mt-1">
                                <ShadcnInput
                                    value={rut}
                                    onChange={(e) => setRut(formatearRutInput(e.target.value))}
                                    placeholder="12.345.678-K"
                                    className="w-full"
                                />
                            </div>
                        </div>


                        <div className="">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Sexo</label>
                            <div className="mt-1">
                                <ShadcnInput
                                    value={sexo}
                                    placeholder={"Ej: Femenino"}
                                    onChange={(e) => setSexo(e.target.value)} className="bg-slate-50/70 border-slate-200 focus:border-sky-400 focus:ring-sky-200" />
                            </div>
                        </div>


                        <div className="">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Estado de Tratamiento</label>
                            <div className="mt-1">
                                <ShadcnSelect nombreDefault={"Seleccione Estado"}
                                              value1={"ALTA"}
                                              value2={"TRATAMIENTO"}
                                              value3={"ABANDONO"}
                                              value4={"EVALUACION"}
                                              onChange={(value) => setPrevision(value)}/>
                            </div>
                        </div>


                        <div className="">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Teléfono</label>
                            <div className="mt-1">
                                <ShadcnInput
                                    value={telefono}
                                    placeholder={"Ej: +569 99764369"}
                                    onChange={(e) => setTelefono(e.target.value)} className="bg-slate-50/70 border-slate-200 focus:border-sky-400 focus:ring-sky-200" />
                            </div>
                        </div>




                        <div className="">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Correo</label>
                            <div className="mt-1">
                                <ShadcnInput
                                    value={correo}
                                    placeholder={"CorreoDelPaciente@gmail.com"}
                                    onChange={(e) => setCorreo(e.target.value)} className="bg-slate-50/70 border-slate-200 focus:border-sky-400 focus:ring-sky-200" />
                            </div>
                        </div>



                        <div className="sm:col-span-2">
                            <div className="mt-1">
                                <ShadcnDatePicker
                                    label="Fecha de nacimiento"
                                    value={nacimiento}
                                    onChange={(fecha) => setNacimiento(fecha)}
                                />
                            </div>
                        </div>

                        <div className="">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Número de Ficha</label>
                            <div className="mt-1">
                                <ShadcnInput
                                    value={observaciones}
                                    placeholder={"Ej: 12345"}
                                    onChange={(e) => setObservaciones(e.target.value)}
                                    className="bg-slate-50/70 border-slate-200 focus:border-sky-400 focus:ring-sky-200" />
                            </div>
                        </div>

                        <div className="sm:col-span-2 flex justify-center sm:justify-end pt-2">

                            <button
                                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-sky-700 to-blue-600 text-white font-semibold shadow-md hover:from-sky-800 hover:to-blue-700 transition focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2"
                                type={"button"}
                                onClick={()=> actualizarDatosPacientes(nombre,apellido,rut,nacimiento,sexo, prevision,telefono,correo,observaciones,id_paciente )}
                            >Actualizar</button>

                        </div>

                    </div>
                </div>
            ) : null}


        </div>
    )
}
