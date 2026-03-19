'use client'
import {useState, useEffect} from "react";
import {useParams, useRouter} from "next/navigation";
import {useCarritoGlobal} from "@/ContextosGlobales/CarritoContext";
import {toast} from "react-hot-toast";
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
import ToasterClient from "@/Componentes/ToasterClient";
import Link from "next/link";
import { calcularPrecioFinal, calcularPrecioPrevio } from "@/FuncionesTranversales/calcularPrecioFinal";

export default function PackProductoDetalle() {

    const [, setCarrito] = useCarritoGlobal();
    const [cantidadSesiones, setCantidadSesiones] = useState('');
    const [producto, setProducto] = useState({});
    const [precioFinal, setPrecioFinal] = useState(0);
    const [precioPrevio, setPrecioPrevio] = useState(0);
    const router = useRouter();
    const params = useParams();
    const id_producto = params?.id;

    const API = process.env.NEXT_PUBLIC_API_URL;
    const CLOUDFLARE_HASH = process.env.NEXT_PUBLIC_CLOUDFLARE_HASH;
    const VARIANT = 'full';

    useEffect(() => {
        async function cargarProducto() {
            try {
                const res = await fetch(`${API}/producto/${id_producto}`, {
                    method: 'GET',
                    headers: {Accept: 'application/json'},
                    mode: 'cors'
                });
                if (res.ok) {
                    const data = await res.json();
                    setProducto(data);
                } else {
                    toast.error("No se pudo cargar el producto. Contacte al administrador.");
                }
            } catch (error) {
                toast.error("Error al cargar el producto.");
            }
        }
        if (id_producto) cargarProducto();
    }, [id_producto]);

    useEffect(() => {
        setPrecioFinal(calcularPrecioFinal(producto, cantidadSesiones));
        setPrecioPrevio(calcularPrecioPrevio(producto, cantidadSesiones));
    }, [producto, cantidadSesiones]);

    const formatoCLP = (valor) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0,
        }).format(valor);
    };

    function agregarAlCarrito() {
        if (!cantidadSesiones) {
            return toast.error("Debe seleccionar la cantidad de sesiones.");
        }
        const productoParaCarrito = {
            ...producto,
            valorProducto: precioFinal,
            _esPack: true,
            _sesionesSeleccionadas: Number(cantidadSesiones),
        };
        setCarrito(prev => [...prev, productoParaCarrito]);
        toast.success("Pack agregado al carrito!");
    }

    function comprarAhora() {
        if (!cantidadSesiones) {
            return toast.error("Debe seleccionar la cantidad de sesiones.");
        }
        const productoParaCarrito = {
            ...producto,
            valorProducto: precioFinal,
            _esPack: true,
            _sesionesSeleccionadas: Number(cantidadSesiones),
        };
        setCarrito(prev => [...prev, productoParaCarrito]);
        router.push("/carrito");
    }

    return (
        <div className="w-full flex justify-center mt-6">
            <ToasterClient/>
            <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="flex items-start justify-center bg-slate-50/60 backdrop-blur rounded-2xl border border-slate-200 p-3 relative w-full max-w-2xl mx-auto overflow-hidden">
                    <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto pt-2">
                        <CarruselProducto
                            imagen1={`https://imagedelivery.net/${CLOUDFLARE_HASH}/${producto.imagenProducto}/${VARIANT}`}
                            imagen2={`https://imagedelivery.net/${CLOUDFLARE_HASH}/${producto.imagenProductoSegunda}/${VARIANT}`}
                            imagen3={`https://imagedelivery.net/${CLOUDFLARE_HASH}/${producto.imagenProductoTercera}/${VARIANT}`}
                            imagen4={`https://imagedelivery.net/${CLOUDFLARE_HASH}/${producto.imagenProductoCuarta}/${VARIANT}`}
                        />
                    </div>
                </div>

                <div className="space-y-4 w-full max-w-2xl mx-auto">
                    {producto && producto.tituloProducto && (
                        <>
                            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
                                {producto.tituloProducto}
                            </h1>

                            {/* PRECIO */}
                            <div className="flex items-baseline gap-3">
                                <span className="text-sm uppercase tracking-wider text-slate-500">Valor</span>
                                <label className="text-2xl md:text-3xl font-bold text-purple-600">
                                    {cantidadSesiones ? formatoCLP(precioFinal) : "Seleccione sesiones"}
                                </label>
                            </div>
                            {cantidadSesiones && precioPrevio > 0 && (
                                <div className="flex items-baseline gap-3 opacity-80">
                                    <span className="text-xs uppercase tracking-wider text-slate-400">
                                        Valor previo
                                    </span>
                                    <span className="relative text-base md:text-lg font-medium text-slate-400 opacity-90 after:content-[''] after:absolute after:left-0 after:right-0 after:top-1/2 after:h-[2px] after:bg-slate-400 after:-translate-y-1/2">
                                        {formatoCLP(precioPrevio)}
                                    </span>
                                </div>
                            )}

                            {/* DESCRIPCION */}
                            <p className="text-slate-600 leading-relaxed whitespace-pre-line break-words">
                                {producto.descripcionProducto}
                            </p>

                            <div className="h-px bg-slate-200/70" />

                            {/* SELECTOR DE SESIONES */}
                            <div className="w-full flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border border-slate-200 bg-slate-50/60">
                                <Select
                                    value={cantidadSesiones}
                                    onValueChange={value => setCantidadSesiones(value)}
                                >
                                    <SelectTrigger className="w-full sm:w-60">
                                        <SelectValue placeholder="Cantidad de Sesiones" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Cantidad Sesiones</SelectLabel>
                                            <SelectItem value="1">1 Sesion - {formatoCLP(producto.valorProducto)}</SelectItem>
                                            <SelectItem value="3">3 Sesiones - {formatoCLP(producto.precio_3_sesiones)}</SelectItem>
                                            <SelectItem value="6">6 Sesiones - {formatoCLP(producto.precio_6_sesiones)}</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* ACCIONES */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full">
                                <button
                                    type="button"
                                    disabled={!cantidadSesiones}
                                    onClick={comprarAhora}
                                    className="inline-flex w-full sm:w-auto sm:flex-1 min-h-12 items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 shadow-sm ring-1 ring-slate-900/10 transition disabled:bg-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Agregar al carrito
                                </button>

                                <Link href="/catalogo">
                                    <button
                                        className="inline-flex w-full sm:w-auto sm:flex-1 min-h-12 items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 active:bg-slate-100 shadow-sm transition"
                                    >
                                        Volver a Catalogo
                                    </button>
                                </Link>
                            </div>

                            {/* BENEFICIOS */}
                            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/60 text-slate-900 px-4 py-4 shadow-sm">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600 mb-3 text-center sm:text-left">
                                    Compra segura y respaldo
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div className="rounded-xl border border-slate-200 bg-white px-3 py-3">
                                        <p className="text-sm font-semibold leading-tight">Pago seguro</p>
                                        <p className="text-xs text-slate-600 leading-snug mt-1">
                                            Tus datos se protegen con cifrado y no se comparten.
                                        </p>
                                    </div>
                                    <div className="rounded-xl border border-slate-200 bg-white px-3 py-3">
                                        <p className="text-sm font-semibold leading-tight">Medios flexibles</p>
                                        <p className="text-xs text-slate-600 leading-snug mt-1">
                                            Credito, debito y transferencias disponibles.
                                        </p>
                                    </div>
                                    <div className="rounded-xl border border-slate-200 bg-white px-3 py-3">
                                        <p className="text-sm font-semibold leading-tight">Soporte</p>
                                        <p className="text-xs text-slate-600 leading-snug mt-1">
                                            Acompanamiento en compra y postventa.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
