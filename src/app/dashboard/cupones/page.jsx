"use client"
import {ShadcnButton} from "@/Componentes/shadcnButton";
import {ShadcnInput} from "@/Componentes/shadcnInput";
import {Textarea} from "@/components/ui/textarea";
import {useState, useEffect} from "react";
import ToasterClient from "@/Componentes/ToasterClient";
import {toast} from "react-hot-toast";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

export default function Cupones() {
    const API = process.env.NEXT_PUBLIC_API_URL;
    const [tablaCupones, setTablaCupones] = useState([]);

    //ESTADOS PARA INSERCION DE DATOS
    const [nombreCupon, setNombreCupon] = useState("");
    const [codigoVerificadorCupon, setCodigoVerificadorCupon] = useState("");
    const[objetivoCupon, setObjetivoCupon] = useState("");
    const [porcentajeDescuento,setPorcentajeDescuento] = useState(0);
    const[dataCuponSeleccionado, setDataCuponSeleccionado] = useState([]);
    const [id_cupon, setId_cupon] = useState(0);





    //FUNCION PARA LA SELECCIONAR ID ESPECIFICO DE CUPONES LLAMANDO A LA API
    async function actualizarCupon(nombreCupon,codigoVerificadorCupon,objetivoCupon,porcentajeDescuento,id_cupon) {
        try {
            if (!nombreCupon  || !codigoVerificadorCupon || !objetivoCupon || !porcentajeDescuento || !id_cupon) {
               return  toast.error("Seleccione almenos un cupon");

            } else if (isNaN(porcentajeDescuento)) {
              return  toast.error("El porcentaje debe ser un valor numerico, no debe contener simbolos o letras");

            } else if (porcentajeDescuento < 1 || porcentajeDescuento > 100) {
                return  toast.error("El porcentaje debe ser un valor numerico entre 1 y 100");

            }

            const res = await fetch(`${API}/cupon/actualizarCupon`, {
                method: "POST",
                headers: {Accept: "application/json",
                    "Content-Type": "application/json"},
                body: JSON.stringify({nombreCupon,codigoVerificadorCupon,objetivoCupon,porcentajeDescuento,id_cupon}),
                mode: "cors",
                cache: "no-cache"
            })

            if (!res.ok) {
                toast.error("Por favor llene todos los campos. Si yas los ha llenado y el problema persiste contacte a soporte de NativeCode");
            }else{

                const respuestaBackend = await res.json();
                if (respuestaBackend.message === true) {
                    setNombreCupon("");
                    setObjetivoCupon("");
                    setCodigoVerificadorCupon("");
                    setPorcentajeDescuento(0);
                    setId_cupon(0);
                    await listarTablaCupones();
                    return toast.success("Datos del cupon actualizados!");

                }else{
                    return toast.error("No se logro actualizar cupon, porfavor intente mas tarde!");
                }
            }
        }catch (error) {
            console.log(error)
            return toast.error('Problema al insertar los cupones contacte a soporte de NativeCode el error es :' +  error.message);
        }
    }




    //FUNCION PARA LA SELECCIONAR ID ESPECIFICO DE CUPONES LLAMANDO A LA API
    async function seleccionarCupon(id_cupon) {
        try {
            if (!id_cupon) {
                toast.error("Seleccione almenos un cupon");
            }
            const res = await fetch(`${API}/cupon/seleccionarCuponesId`, {
                method: "POST",
                headers: {Accept: "application/json",
                    "Content-Type": "application/json"},
                body: JSON.stringify({id_cupon}),
                mode: "cors",
                cache: "no-cache"
            })

            if (!res.ok) {
                toast.error("Por favor llene todos los campos. Si yas los ha llenado y el problema persiste contacte a soporte de NativeCode");
            }else{

                const respuestaBackend = await res.json();
                if (respuestaBackend) {
                    setDataCuponSeleccionado(respuestaBackend);
                    return toast.success("Cupon seleccionado!");

                }else{
                    return toast.error("No se logro cargargar el cupon elegido. Contacte a soporte de NativeCode");
                }
            }
        }catch (error) {
            console.log(error)
            return toast.error('Problema al insertar los cupones contacte a soporte de NativeCode el error es :' +  error.message);
        }
    }

    useEffect(() => {
    if (dataCuponSeleccionado.length > 0) {
        dataCuponSeleccionado.map((cupon) => {
            setNombreCupon(cupon.nombreCupon);
            setObjetivoCupon(cupon.objetivoCupon);
            setCodigoVerificadorCupon(cupon.codigoVerificadorCupon)
            setPorcentajeDescuento(cupon.porcentajeDescuento)
            setId_cupon(cupon.id_cupon)

        });

    }
}, [dataCuponSeleccionado])





    //FUNCION PARA LA ELIMINACION DE DATOS LLAMANDO A LA API
    async function eliminarCupon(id_cupon) {
        try {

            if (!id_cupon) {
                toast.error("Seleccione almenos un cupon");
            }
            const res = await fetch(`${API}/cupon/eliminarCupon`, {
                method: "POST",
                headers: {Accept: "application/json",
                    "Content-Type": "application/json"},
                body: JSON.stringify({id_cupon}),
                mode: "cors",
                cache: "no-cache"
            })

            if (!res.ok) {
                toast.error("Por favor llene todos los campos. Si yas los ha llenado y el problema persiste contacte a soporte de NativeCode");
            }else{

                const respuestaBackend = await res.json();
                if (respuestaBackend.message === true) {
                    await listarTablaCupones();
                    return toast.success("Se ha eliminado el cupon con exito!");
                }else{
                    return toast.error("Ha ocurrido un problema con la eliminacion del cupon porfavor intente mas tarde.");
                }
            }
        }catch (error) {
            console.log(error)
            return toast.error('Problema al insertar los cupones contacte a soporte de NativeCode el error es :' +  error.message);
        }
    }



    //FUNCION PARA LA INSERCION DE DATOS LLAMANDO A LA API
    async function insertarCupon(nombreCupon,codigoVerificadorCupon,objetivoCupon,porcentajeDescuento) {
        try {

            if (!nombreCupon || !codigoVerificadorCupon || !objetivoCupon || !porcentajeDescuento) {
                toast.error("Por favor llene todos los campos.");
            }  else if (isNaN(porcentajeDescuento)) {
                return  toast.error("El porcentaje debe ser un valor numerico, no debe contener simbolos o letras");

            } else if (porcentajeDescuento < 1 || porcentajeDescuento > 100) {
                return  toast.error("El porcentaje debe ser un valor numerico entre 1 y 100");

            }

            if(isNaN(porcentajeDescuento)){
               return  toast.error("El porcentaje debe ser un valor numerico sin letras puntos o simbolos");
            }

            const res = await fetch(`${API}/cupon/insertarCupon`, {
                method: "POST",
                headers: {Accept: "application/json",
                "Content-Type": "application/json"},
                body: JSON.stringify({nombreCupon,codigoVerificadorCupon,objetivoCupon,porcentajeDescuento}),
                mode: "cors",
                cache: "no-cache"
            })

            if (!res.ok) {
                toast.error("Por favor llene todos los campos. Si yas los ha llenado y el problema persiste contacte a soporte de NativeCode");
            }else{

                const respuestaBackend = await res.json();
                if (respuestaBackend.message === true) {
                    await listarTablaCupones();
                    return toast.success("Se ha insertado un nuevo cupon de descuentos");
                }else{
                    return toast.error("Ha ocurrido un problema con la insercion  del cupon porfavor intente mas tarde.");

                }
            }
        }catch (error) {
            console.log(error)
            return toast.error('Problema al insertar los cupones contacte a soporte de NativeCode el error es :' +  error.message);
        }
    }


    async function listarTablaCupones() {
        try {
            const res = await fetch(`${API}/cupon/seleccionarCupones`, {
                method: "GET",
                headers: {Accept: "application/json"},
                mode: "cors"
            })


            const dataCupones = await res.json();

            if (Array.isArray(dataCupones)) {
                setTablaCupones(dataCupones);
            }

        }catch(error) {
            return toast.error('Problema al listar los cupones contacte a soporte de NativeCode el error es :' +  error.message);
        }
    }

    useEffect(() => {
            listarTablaCupones();
    }, [])


function mostrarIdSeleccionado(id_cupon) {
    if (!id_cupon) {
       return "-"
    }else {
        return id_cupon;
    }
}


    return(
       <div>

           {/*PANTALLAS EN CELULARES*/}
           <div className="blok md:hidden min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-6">
               <ToasterClient/>
               {/* Header con diseño premium */}
               <div className="max-w-7xl mx-auto mb-6">
                   <h1 className="text-xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                       Sistema de Gestión de Cupones
                   </h1>
                   <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-3"></div>
               </div>

               <div className="max-w-7xl mx-auto grid grid-cols-1 gap-5">
                   {/* Card de Ingreso - Premium */}
                   <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                       {/* Gradient overlay decorativo */}
                       <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 pointer-events-none"></div>
                       <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500"></div>

                       <div className="relative p-6">
                           <div className="flex items-center gap-3 mb-5">
                               <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-md">
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                   </svg>
                               </div>
                               <h2 className="text-xl font-bold text-slate-800">
                                   Crear Cupón
                               </h2>
                               <br/>

                           </div>
                           <div className="flex items-center gap-3">
                             <label className="text-[11px] uppercase tracking-wide text-sky-800 font-semibold">ID cupón</label>
                             <span className="text-sm font-bold text-gray-600 border border-slate-200 bg-slate-50 px-3 py-1.5 rounded-xl">{mostrarIdSeleccionado(id_cupon)}</span>
                           </div>
                           <div className="space-y-4 mt-6">
                               <div className="transform transition-all duration-200 hover:scale-[1.01]">
                                   <ShadcnInput value={nombreCupon}
                                                onChange={(e)=>setNombreCupon(e.target.value)}
                                                placeholder={"Titulo del cupon.."} />
                               </div>

                               <div className="transform transition-all duration-200 hover:scale-[1.01]">
                                   <ShadcnInput
                                       value={codigoVerificadorCupon}
                                       onChange={(e)=>setCodigoVerificadorCupon(e.target.value)}
                                       placeholder={"Codigo del cupon.."}
                                   />
                               </div>

                               <div className="transform transition-all duration-200 hover:scale-[1.01]">
                                   <Textarea className="min-h-[96px] resize-none border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl"
                                             placeholder="Descripción del cupón..."
                                             value={objetivoCupon}
                                             onChange={(e)=>setObjetivoCupon(e.target.value)}

                                   />

                               </div>

                               <div className="transform transition-all duration-200 hover:scale-[1.01]">
                                   <h1 className="pt-1 font-bold text-gray-700">Porcentaje descuento</h1>
                                   <p className="text-gray-400 text-[11px]">Solo números del 1 al 100</p>
                                   <ShadcnInput
                                       type="number"
                                       placeholder="Descuento (%).. solo en numeros 1 a 100.."
                                       value={porcentajeDescuento}
                                       onChange={(e)=>setPorcentajeDescuento(e.target.value)}
                                   />

                               </div>

                               <div className="flex gap-3 pt-2">
                                   <div className="flex-1">
                                       <ShadcnButton nombre={"Ingresar"}
                                                     funcion={()=> insertarCupon(nombreCupon,codigoVerificadorCupon,objetivoCupon,porcentajeDescuento)}
                                                     className="w-full"/>
                                   </div>
                                   <div className="flex-1">
                                       <ShadcnButton
                                           funcion={()=>actualizarCupon(nombreCupon,codigoVerificadorCupon,objetivoCupon,porcentajeDescuento,id_cupon)}
                                           nombre={"Actualizar"} className="w-full"/>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>

                   {/* Card de Listado - Premium */}
                   <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                       {/* Gradient overlay decorativo */}
                       <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 pointer-events-none"></div>
                       <div className="absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500"></div>

                       <div className="relative p-6">
                           <div className="flex items-center gap-3 mb-5">
                               <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-md">
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                   </svg>
                               </div>
                               <h2 className="text-xl font-bold text-slate-800">
                                   Cupones Activos
                               </h2>
                           </div>

                           <div className="transform transition-all duration-200">
                               <Table className="text-sm">
                                   <TableCaption>Listado de Cupones.</TableCaption>
                                   <TableHeader>
                                       <TableRow>
                                           <TableHead className="text-xs text-slate-600">ID Cupon</TableHead>
                                           <TableHead className="text-xs text-slate-600">Codigo</TableHead>
                                           <TableHead className="text-xs text-slate-600">Descuento (%)</TableHead>
                                       </TableRow>
                                   </TableHeader>
                                   <TableBody>
                                       {tablaCupones.map((cupon) => (
                                           <TableRow key={cupon.id_cupon}>
                                               <TableCell className="font-medium py-2">{cupon.id_cupon}</TableCell>
                                               <TableCell className="py-2">{cupon.codigoVerificadorCupon}</TableCell>
                                               <TableCell className="py-2">{cupon.porcentajeDescuento} %</TableCell>
                                               <TableCell className="py-2">
                                                   <ShadcnButton
                                                       funcion={()=> eliminarCupon(cupon.id_cupon)}
                                                       nombre={"Eliminar"}/>
                                               </TableCell>
                                               <TableCell className="py-2">
                                                   <ShadcnButton
                                                       funcion={()=> seleccionarCupon(cupon.id_cupon)}
                                                       nombre={"Seleccionar"}/>
                                               </TableCell>
                                           </TableRow>
                                       ))}
                                   </TableBody>
                               </Table>
                           </div>
                       </div>
                   </div>
               </div>
           </div>



           {/*PANTALLA EN COMPUTADORES DE ESCRITORIO*/}
           <div className="hidden md:block min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-8 py-8">
               <ToasterClient/>
               {/* Header con diseño premium */}
               <div className="max-w-7xl mx-auto mb-7">
                   <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                       Sistema de Gestión de Cupones
                   </h1>
                   <div className="h-1 w-28 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-3"></div>
               </div>

               <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
                   {/* Card de Ingreso - Premium */}
                   <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                       {/* Gradient overlay decorativo */}
                       <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 pointer-events-none"></div>
                       <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500"></div>

                       <div className="relative p-7">
                           <div className="flex items-center gap-3 mb-6">
                               <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-md">
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                   </svg>
                               </div>
                               <h2 className="text-2xl font-bold text-slate-800">
                                   Crear Cupón
                               </h2>
                               <br/>

                           </div>
                           <div className="flex items-center gap-3">
                             <label className="text-[11px] uppercase tracking-wide text-sky-800 font-semibold">ID cupón seleccionado</label>
                             <span className="text-sm font-bold text-gray-600 border border-slate-200 bg-slate-50 px-3 py-1.5 rounded-xl">{mostrarIdSeleccionado(id_cupon)}</span>
                           </div>
                           <div className="space-y-4 mt-6">
                               <div className="transform transition-all duration-200 hover:scale-[1.01]">
                                   <ShadcnInput value={nombreCupon}
                                                onChange={(e)=>setNombreCupon(e.target.value)}
                                                placeholder={"Titulo del cupon.."} />
                               </div>

                               <div className="transform transition-all duration-200 hover:scale-[1.01]">
                                   <ShadcnInput
                                       value={codigoVerificadorCupon}
                                       onChange={(e)=>setCodigoVerificadorCupon(e.target.value)}
                                       placeholder={"Codigo del cupon.."}
                                   />
                               </div>

                               <div className="transform transition-all duration-200 hover:scale-[1.01]">
                                   <Textarea className="min-h-[96px] resize-none border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl"
                                             placeholder="Descripción del cupón..."
                                             value={objetivoCupon}
                                             onChange={(e)=>setObjetivoCupon(e.target.value)}

                                   />

                               </div>

                               <div className="transform transition-all duration-200 hover:scale-[1.01]">
                                   <ShadcnInput
                                       type="number"
                                       placeholder="Descuento (%).. solo en numeros 1 a 100.."
                                       value={porcentajeDescuento}
                                       onChange={(e)=>setPorcentajeDescuento(e.target.value)}
                                   />

                               </div>

                               <div className="flex gap-3 pt-2">
                                   <div className="flex-1">
                                       <ShadcnButton nombre={"Ingresar"}
                                                     funcion={()=> insertarCupon(nombreCupon,codigoVerificadorCupon,objetivoCupon,porcentajeDescuento)}
                                                     className="w-full"/>
                                   </div>
                                   <div className="flex-1">
                                       <ShadcnButton
                                           funcion={()=>actualizarCupon(nombreCupon,codigoVerificadorCupon,objetivoCupon,porcentajeDescuento,id_cupon)}
                                           nombre={"Actualizar"} className="w-full"/>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>

                   {/* Card de Listado - Premium */}
                   <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                       {/* Gradient overlay decorativo */}
                       <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 pointer-events-none"></div>
                       <div className="absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500"></div>

                       <div className="relative p-7">
                           <div className="flex items-center gap-3 mb-6">
                               <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-md">
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                   </svg>
                               </div>
                               <h2 className="text-2xl font-bold text-slate-800">
                                   Cupones Activos
                               </h2>
                           </div>

                           <div className="transform transition-all duration-200">
                               <Table className="text-sm">
                                   <TableCaption>Listado de Cupones.</TableCaption>
                                   <TableHeader>
                                       <TableRow>
                                           <TableHead className="text-xs text-slate-600">ID Cupon</TableHead>
                                           <TableHead className="text-xs text-slate-600">Titulo</TableHead>
                                           <TableHead className="text-xs text-slate-600">Objetivo</TableHead>
                                           <TableHead className="text-xs text-slate-600">Codigo</TableHead>
                                           <TableHead className="text-xs text-slate-600">Descuento (%)</TableHead>
                                       </TableRow>
                                   </TableHeader>
                                   <TableBody>
                                       {tablaCupones.map((cupon) => (
                                           <TableRow key={cupon.id_cupon}>
                                               <TableCell className="font-medium py-2">{cupon.id_cupon}</TableCell>
                                               <TableCell className="font-medium py-2">{cupon.nombreCupon}</TableCell>
                                               <TableCell className="font-medium py-2">{cupon.objetivoCupon}</TableCell>
                                               <TableCell className="py-2">{cupon.codigoVerificadorCupon}</TableCell>
                                               <TableCell className="py-2">{cupon.porcentajeDescuento} %</TableCell>
                                               <TableCell className="py-2">
                                                   <ShadcnButton
                                                       funcion={()=> eliminarCupon(cupon.id_cupon)}
                                                       nombre={"Eliminar"}/>
                                               </TableCell>
                                               <TableCell className="py-2">
                                                   <ShadcnButton
                                                       funcion={()=> seleccionarCupon(cupon.id_cupon)}
                                                       nombre={"Seleccionar"}/>
                                               </TableCell>
                                           </TableRow>
                                       ))}
                                   </TableBody>
                               </Table>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
    )
}