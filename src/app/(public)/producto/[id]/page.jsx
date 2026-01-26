'use client'
import {useState, useEffect} from "react";
import {useParams} from "next/navigation";
import {useCarritoGlobal} from "@/ContextosGlobales/CarritoContext";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import CarruselProducto from "@/Componentes/CarruselProducto";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {number} from "zod";
import ToasterClient from "@/Componentes/ToasterClient";
import Link from "next/link";



export default function ProductoDetalle() {


    //USO DE CARRITO GLOBAL DE CONTEXT PARA EL USO EN TODA LA APLICACION DE ARRAY DE OBJETOS GLOBALES
    const [, setCarrito] = useCarritoGlobal();
    const [zonaIndividual, setZonaIndividual] = useState(true);
    const [cantidadSesiones, setcantidadSesiones] = useState(undefined);
    const [zonaAnatomica, setZonaAnatomica] = useState(undefined);
    const router = useRouter();


    function agregarAlCarrito(productoSeleccionado) {
        setCarrito(arrayProductosPrevios => [...arrayProductosPrevios, productoSeleccionado])
        toast.success("Producto añadido al carrito de compras!")
    }



    function agregarSesiones(productoSeleccionado, cantidadSesiones) {
        let numeroSesiones = Number(cantidadSesiones)

        if (numeroSesiones === 1) {
            setCarrito(arrayProductosPrevios => [...arrayProductosPrevios, productoSeleccionado])
           return  toast.success("Sesiones añadidas al carrito de compras!")


        }else if (numeroSesiones === 3) {
            setCarrito(arrayProductosPrevios => [...arrayProductosPrevios, productoSeleccionado])
            setCarrito(arrayProductosPrevios => [...arrayProductosPrevios, productoSeleccionado])
            setCarrito(arrayProductosPrevios => [...arrayProductosPrevios, productoSeleccionado])



        }else if (numeroSesiones === 6) {
            setCarrito(arrayProductosPrevios => [...arrayProductosPrevios, productoSeleccionado])
            setCarrito(arrayProductosPrevios => [...arrayProductosPrevios, productoSeleccionado])
            setCarrito(arrayProductosPrevios => [...arrayProductosPrevios, productoSeleccionado])
            setCarrito(arrayProductosPrevios => [...arrayProductosPrevios, productoSeleccionado])
            setCarrito(arrayProductosPrevios => [...arrayProductosPrevios, productoSeleccionado])
            setCarrito(arrayProductosPrevios => [...arrayProductosPrevios, productoSeleccionado])


        }else {

            return;

        }

    }

    function comparAhora(productoSeleccionado, cantidadSesiones) {
            if (!productoSeleccionado || !cantidadSesiones) {
                return toast.error("Debe seleccionar la cantidad de Sesiones.");
            }
            let producto = productoSeleccionado
            let sesiones = cantidadSesiones
                agregarSesiones(producto, sesiones)
                router.push("/carrito");
    }


    //USE STATE PARA ALMACENAR EL OBJETO SELECCIONADO CON USESTATE
    const [producto, setProducto] = useState({});

    //SE USA EL PARAM DE USEPARAMS NAVEGATE DE NBEXT PARA SUAR EL ID
    const params = useParams();
    const id_producto = params?.id;

    // CONSTANTE API QUE APUNTA AL SERVIDOR BACKEND PARA CONECTAR CON LOS ENDPOINDS EN VIEWS
    const API = process.env.NEXT_PUBLIC_API_URL;
    const CLOUDFLARE_HASH = process.env.NEXT_PUBLIC_CLOUDFLARE_HASH;
    const VARIANT = 'full'



    //FUNCION PARA LLAMAR AL OBJETO ESPECIFICO POR ID
    async function seleccionarProductoPorID(id_producto) {
        try {
            const res = await fetch(`${API}/producto/${id_producto}`, {
                method: 'GET',
                headers: {Accept: 'application/json'},
                mode: 'cors'
            });
            if (!res.ok) {
                return alert("No se ha podido renderizar el producto seleccionado, porfavor conatcte a soporte TI de NativeCode.cl")
            }else {
                const dataSeleccion = await res.json();
                setProducto(dataSeleccion);
            }
        }catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        seleccionarProductoPorID(id_producto);
    }, [id_producto]);


    useEffect(() => {
        if (producto?.subcategoria == null) return; // null o undefined

        if (producto?.subcategoria === 23){
            setZonaIndividual(true);
        }else if(producto?.subcategoria === 26){
            setZonaIndividual(true);
        }else {
            setZonaIndividual(false);
        }

    }, [producto?.subcategoria]);




    let booleanSinStock = false

    if (producto.cantidadStock < 1){
        booleanSinStock = true;
    }


    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 mt-8">
            <ToasterClient/>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="flex items-start justify-center bg-white/70 backdrop-blur rounded-2xl p-4 relative">
                    <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto -mt-10">
                        <CarruselProducto
                            imagen1={`https://imagedelivery.net/${CLOUDFLARE_HASH}/${producto.imagenProducto}/${VARIANT}`}
                            imagen2={`https://imagedelivery.net/${CLOUDFLARE_HASH}/${producto.imagenProductoSegunda}/${VARIANT}`}
                            imagen3={`https://imagedelivery.net/${CLOUDFLARE_HASH}/${producto.imagenProductoTercera}/${VARIANT}`}
                            imagen4={`https://imagedelivery.net/${CLOUDFLARE_HASH}/${producto.imagenProductoCuarta}/${VARIANT}`}

                        />

                        <div className="hidden md:block">
                            <div className="flex items-center gap-2 mt-25 ">
                                <img
                                    src="/MP_RGB_HANDSHAKE_color_horizontal.svg"
                                    alt="Mercado Pago"

                                />
                            </div>
                        </div>
                    </div>

                </div>


                <div className="space-y-6">

                    {producto && (
                        <>
                            {/* TÍTULO DEL PRODUCTO */}
                            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
                                {producto.tituloProducto}
                            </h1>


                            {/* PRECIO */}
                            <div className="flex items-baseline gap-3">
                                <span className="text-sm uppercase tracking-wider text-slate-500">Valor</span>
                                <label className="text-2xl md:text-3xl font-bold text-purple-600">
                                    $ {producto.valorProducto}
                                </label>
                            </div>

                            {/* DESCRIPCIÓN */}
                            <p className="text-slate-600 leading-relaxed whitespace-pre-line break-words">
                                {producto.descripcionProducto}
                            </p>


                            {/* SEPARADOR SUTIL */}
                            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                            <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 p-5">
                                <Select
                                    value={cantidadSesiones}
                                    onValueChange={value => setcantidadSesiones(value)}
                                >
                                    <SelectTrigger className="w-full sm:w-60">
                                        <SelectValue placeholder="Cantidad de Sesiones" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Cantidad Sesiones</SelectLabel>
                                            <SelectItem value={1}>1</SelectItem>
                                            <SelectItem value={3}>3</SelectItem>
                                            <SelectItem value={6}>6</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>


                                {zonaIndividual&&(
                                    <Select
                                        value={zonaAnatomica}
                                        onValueChange={value => setZonaAnatomica(value)}
                                    >
                                        <SelectTrigger className="w-full sm:w-60">
                                            <SelectValue placeholder="Selecciona Zona" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Zona de Depilasion</SelectLabel>
                                                <SelectItem value={"PIERNA"}>PIERNA</SelectItem>
                                                <SelectItem value={"BRAZO"}>BRAZO</SelectItem>
                                                <SelectItem value={"ROSTRO"}>ROSTRO</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                )}
                            </div>


                            {/* ACCIONES */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full">

                                <button
                                    type="button"
                                    disabled={booleanSinStock}
                                    onClick={() => comparAhora(producto,cantidadSesiones)}
                                    className="inline-flex w-full sm:w-auto sm:flex-1 min-h-12 items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-lg shadow-blue-600/20 ring-1 ring-emerald-700/20 transition disabled:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-500 disabled:active:bg-gray-500"
                                >
                                    agregar al carrito
                                </button>

                                <Link href="/catalogo">
                                    <button
                                        className="inline-flex w-full sm:w-auto sm:flex-1 min-h-12 items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-lg shadow-blue-600/20 ring-1 ring-emerald-700/20 transition"
                                    >
                                        Volver a Catalogo
                                    </button>
                                </Link>

                            </div>




                            {/* BENEFICIOS / SELLOS DE CONFIANZA */}
                            <div className="mt-6 rounded-2xl border border-sky-200 bg-white text-slate-900 px-4 py-4 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-600 mb-4 text-center sm:text-left">
                                    Compra segura y respaldo garantizado
                                </p>
                                <div className="flex flex-col sm:grid sm:grid-cols-3 gap-4 sm:gap-6">
                                    {/* Pago seguro */}
                                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1 sm:gap-2 p-3 rounded-xl border border-sky-100 bg-sky-50/30">
                                        <p className="text-base font-semibold leading-tight">Pago 100% seguro</p>
                                        <p className="text-xs text-slate-500 leading-snug">
                                            Tus datos están protegidos con cifrado avanzado y nunca se comparten con terceros.
                                        </p>
                                    </div>
                                    {/* Medios de pago */}
                                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1 sm:gap-2 p-3 rounded-xl border border-sky-100 bg-sky-50/30">
                                        <p className="text-base font-semibold leading-tight">Medios de pago flexibles</p>
                                        <p className="text-xs text-slate-500 leading-snug">
                                            Aceptamos tarjetas de crédito, débito y transferencias bancarias.
                                        </p>
                                    </div>
                                    {/* Soporte */}
                                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1 sm:gap-2 p-3 rounded-xl border border-sky-100 bg-sky-50/30">
                                        <p className="text-base font-semibold leading-tight">Soporte dedicado</p>
                                        <p className="text-xs text-slate-500 leading-snug">
                                            Te acompañamos en todo el proceso de compra y postventa para resolver cualquier inquietud.
                                        </p>
                                    </div>
                                </div>
                            </div>


                        </>
                    )}
                </div>


       <div className="block md:hidden">
           <img
               src="/MP_RGB_HANDSHAKE_color_horizontal.svg"
               alt="Mercado Pago"
           />
       </div>

            </div>
        </div>
    )

}