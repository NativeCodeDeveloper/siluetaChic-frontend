"use client"
import {useState, useEffect} from "react";
import {useCarritoGlobal} from "@/ContextosGlobales/CarritoContext";
import {useObjetosPagosGlobales} from "@/ContextosGlobales/ObjetoPagarContext";
import Link from "next/link";
import {toast} from "react-hot-toast";
import {ShadcnButton} from "@/Componentes/shadcnButton";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"




export default function Carrito() {

    const [carrito, setCarrito] = useCarritoGlobal();
    const [_objetoDePago, _setObjetoDePago] = useObjetosPagosGlobales();
    const [_nuevaCantidad, _setNuevaCantidad] = useState(0);
    const [idSeleccionado, setIdSeleccionado] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => { setIsMounted(true); }, []);

    function obtenerClaveProducto(producto) {
        return producto?._esPack
            ? `${producto.id_producto}_pack_${producto._sesionesSeleccionadas}`
            : String(producto.id_producto);
    }

    function formatoCLP(valor) {
        return new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
            maximumFractionDigits: 0
        }).format(Number(valor) || 0);
    }

    const productoCatidades = {};
    let totalPago = 0;

    for (const productos of carrito) {
        if (!productos) continue;
        const key = obtenerClaveProducto(productos);
        if (productoCatidades[key]) {
            productoCatidades[key].cantidadVendida += 1;
        } else {
            productoCatidades[key] = {...productos, cantidadVendida: 1, carritoKey: key};
        }
    }

    const productosDelCarrito = Object.values(productoCatidades)

    useEffect(() => {
        // Solo ejecutar esta lógica después del montaje para evitar mismatch SSR/cliente
        if (!isMounted) return;
        if (
            productosDelCarrito.length > 0 &&
            (idSeleccionado === null ||
                !productosDelCarrito.some(p => p.id_producto === idSeleccionado))
        ) {
            setIdSeleccionado(productosDelCarrito[0].id_producto);
        }
    }, [productosDelCarrito, isMounted]);

    for (const producto of productosDelCarrito) {
        totalPago += (producto.valorProducto * producto.cantidadVendida);
    }


    function quitarDelCarrito(id_producto) {
        try {
            if (!id_producto) {
                return toast.error('Debe seleccionar un producto para quitarlo del carrito!');
            } else {
                const nuevoCarrito = carrito.filter(producto => {
                    return obtenerClaveProducto(producto) !== id_producto
                });
                setCarrito(nuevoCarrito);
            }

        } catch (e) {
            return toast.error("No se puede eliminar el producto del carrito. Pruebe mas tarde");
        }
    }




    function aumentarCantidad(id_producto) {
        try {
            if (!id_producto) {
                return toast.error('Debe seleccionar un producto para poder aumentar su cantidad.');
            } else {

                const productoAumentar = carrito.find(producto => obtenerClaveProducto(producto) === id_producto);
                if (!productoAumentar) {
                    return toast.error("No se ha encontrado el producto que se quiere aumentar");
                }else{
                    setCarrito([...carrito, {...productoAumentar}]);
                }

            }
        } catch (e) {
            console.log(e);
            return toast.error("No se puede aumentar la cantidad. Si necesita mas cantidad contacte a la tienda.");
        }

    }




    function disminuirCantidad(id_producto) {
        try {
            if (!id_producto) {
                return toast.error('Debe seleccionar un producto para poder bajar su cantidad.');
            } else {
                const productoEliminar = carrito.findIndex(producto => obtenerClaveProducto(producto) === id_producto);
                if (productoEliminar === -1) {
                    return toast.error("No se ha encontrado el producto que se quiere aumentar");
                }else{
                    const nuevoCarritoConProductoEliminado = [...carrito];
                    nuevoCarritoConProductoEliminado.splice(productoEliminar, 1);
                    setCarrito(nuevoCarritoConProductoEliminado);
                }
            }
        } catch (e) {
            console.log(e);
            return toast.error("No se puede aumentar la cantidad. Si necesita mas cantidad contacte a la tienda.");
        }

    }



    // Reemplazo del render: mantengo toda la lógica pero muestro tabla en md+ y tarjetas en móvil
    return (
        <div className="mt-20 min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="rounded-[28px] border border-slate-200 bg-white/95 p-5 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.28)] sm:p-8">
                    <div className="flex flex-col gap-3 border-b border-slate-100 pb-6 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600">Carrito</p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Sesiones y promociones</h1>
                            <p className="mt-2 text-sm text-slate-500">Ajusta cantidades y revisa el total antes de continuar con el pago.</p>
                        </div>
                        <div className="inline-flex items-center self-start rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800 ring-1 ring-sky-100">
                            {isMounted ? productosDelCarrito.length : 0} producto{isMounted && productosDelCarrito.length === 1 ? "" : "s"}
                        </div>
                    </div>

                {/* Mensaje cuando no hay productos */}
                {isMounted && productosDelCarrito.length === 0 && (
                    <div className="mt-8 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-600">
                        No hay sesiones o paquetes seleccionados.
                    </div>
                )}

                {/* VISTA ESCRITORIO: tabla (md+) */}
                <div className="mt-8 hidden md:block">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <Table className="w-full">
                        <TableCaption></TableCaption>
                        <TableHeader className="bg-slate-50">
                            <TableRow className="text-slate-700">
                                <TableHead
                                    className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Producto</TableHead>
                                <TableHead
                                    className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Referencia</TableHead>
                                <TableHead
                                    className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Cantidad</TableHead>

                                <TableHead className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Valor sesión</TableHead>
                                <TableHead
                                    className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Subtotal</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isMounted && productosDelCarrito.map((producto) => (
                                <TableRow key={producto.carritoKey} className="transition-colors hover:bg-slate-50">
                                    <TableCell
                                        className="px-6 py-5 align-middle text-sm font-medium text-slate-800">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={`https://imagedelivery.net/aCBUhLfqUcxA2yhIBn1fNQ/${producto.imagenProducto}/mini`}
                                                alt={"Imagen Producto"}
                                                width={72}
                                                height={72}
                                                className="h-[72px] w-[72px] rounded-xl object-cover ring-1 ring-slate-200"
                                            />
                                            <div>
                                                <span className="block text-base font-semibold text-sky-700">{producto.tituloProducto}</span>
                                                <span className="mt-1 block text-xs text-slate-500">
                                                    {producto._esPack ? `Pack ${producto._sesionesSeleccionadas} sesiones` : "Sesión individual"}
                                                </span>
                                                <span className="mt-3 block"><ShadcnButton
                                            funcion={() => quitarDelCarrito(producto.carritoKey)}
                                            nombre={"Eliminar"}/></span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell
                                        className="px-6 py-5 align-middle text-sm text-slate-600">#{producto.id_producto}</TableCell>
                                    <TableCell
                                        className="px-6 py-5 align-middle text-sm text-slate-800">
                                        <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white shadow-sm">
                                            <button
                                                type="button"
                                                onClick={() => disminuirCantidad(producto.carritoKey)}
                                                disabled={producto.cantidadVendida <= 1}
                                                className="flex h-10 w-10 items-center justify-center text-lg font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                -
                                            </button>
                                            <span className="flex min-w-12 items-center justify-center border-x border-slate-200 px-3 text-sm font-semibold text-slate-900">
                                                {producto.cantidadVendida}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => aumentarCantidad(producto.carritoKey)}
                                                className="flex h-10 w-10 items-center justify-center text-lg font-semibold text-slate-700 transition hover:bg-slate-50"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </TableCell>
                                    <TableCell
                                        className="px-6 py-5 align-middle text-sm text-slate-800">{formatoCLP(producto.valorProducto)}</TableCell>
                                    <TableCell
                                        className="px-6 py-5 text-right align-middle text-sm font-semibold text-slate-900">{formatoCLP(producto.cantidadVendida * producto.valorProducto)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow className="bg-slate-50 font-semibold">
                                <TableCell className="px-6 py-4 text-left text-slate-700"
                                           colSpan={4}>Total</TableCell>
                                <TableCell className="px-6 py-4 text-right text-base text-sky-700">{isMounted ? formatoCLP(totalPago) : formatoCLP(0)}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                    </div>
                </div>

                {/* VISTA MÓVIL: tarjetas (sm) */}
                <div className="md:hidden mt-6 space-y-4">
                    {isMounted && productosDelCarrito.map((producto) => (
                        <div key={producto.carritoKey} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                            <div className="flex items-start gap-4">
                            <img src={`https://imagedelivery.net/aCBUhLfqUcxA2yhIBn1fNQ/${producto.imagenProducto}/mini`} alt={producto.tituloProducto} className="h-20 w-20 rounded-xl object-cover ring-1 ring-slate-200 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <div className="min-w-0">
                                        <div className="text-sm font-semibold text-sky-700 truncate">{producto.tituloProducto}</div>
                                        <div className="mt-1 text-xs text-slate-500">Ref: {producto.id_producto}</div>
                                        <div className="mt-1 text-xs text-slate-500">{producto._esPack ? `Pack ${producto._sesionesSeleccionadas} sesiones` : "Sesión individual"}</div>
                                    </div>
                                    <div className="text-right ml-2 flex-shrink-0">
                                        <div className="text-sm font-semibold text-slate-800">{formatoCLP(producto.cantidadVendida * producto.valorProducto)}</div>
                                        <div className="text-xs text-slate-500">Subtotal</div>
                                    </div>
                                </div>
                            </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between gap-3">
                                <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white shadow-sm">
                                    <button
                                        type="button"
                                        onClick={() => disminuirCantidad(producto.carritoKey)}
                                        disabled={producto.cantidadVendida <= 1}
                                        className="flex h-10 w-10 items-center justify-center text-lg font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        -
                                    </button>
                                    <span className="flex min-w-12 items-center justify-center border-x border-slate-200 px-3 text-sm font-semibold text-slate-900">
                                        {producto.cantidadVendida}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => aumentarCantidad(producto.carritoKey)}
                                        className="flex h-10 w-10 items-center justify-center text-lg font-semibold text-slate-700 transition hover:bg-slate-50"
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="text-right">
                                    <div className="text-xs text-slate-500">Valor sesión</div>
                                    <div className="text-sm font-semibold text-slate-800">{formatoCLP(producto.valorProducto)}</div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <ShadcnButton funcion={() => quitarDelCarrito(producto.carritoKey)} nombre={"Eliminar"} />
                            </div>
                        </div>
                    ))}

                    {/* Total y botón pagar en móvil */}
                    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="text-lg font-semibold text-slate-700">Total</div>
                        <div className="text-xl font-bold text-sky-700">{isMounted ? formatoCLP(totalPago) : formatoCLP(0)}</div>
                    </div>
                </div>

                {/* Botón Ir a pagar (se mantiene visible en ambos tamaños) */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link href="/formularioPago">
                        <button
                            className="w-full rounded-xl p-3 font-semibold sm:w-44
    bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600
    text-white shadow-md transition-all duration-300
    hover:scale-105 hover:shadow-xl"
                        >
                            Ir a Pagar
                        </button>
                    </Link>

                    <Link href="/catalogo">
                        <button
                            className="w-full rounded-xl p-3 font-semibold sm:w-44
    bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600
    text-white shadow-md transition-all duration-300
    hover:scale-105 hover:shadow-xl"
                        >
                            Volver a Catalogo
                        </button>
                    </Link>


                </div>

            </div>
            </div>
        </div>
    )
}
