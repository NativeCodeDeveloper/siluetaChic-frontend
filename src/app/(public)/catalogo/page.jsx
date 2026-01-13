'use client'
import {useState, useEffect} from 'react';
import ToasterClient from "@/Componentes/ToasterClient";
import {toast} from "react-hot-toast";
import MediaCardImage from "@/Componentes/MediaCardImage";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import {useCarritoGlobal} from "@/ContextosGlobales/CarritoContext";
import {useRouter} from "next/navigation";

export default function Catalogo(){
    const API = process.env.NEXT_PUBLIC_API_URL;
    const [_carrito, setCarrito] = useCarritoGlobal();
    const [listaProductos, setlistaProductos] = useState([]);
    const [mujeres, setmujeres] = useState(true);
    const [hombres, sethombres] = useState(false);


    const router = useRouter();


    function anadirProducto(producto){
        setCarrito(productosAnteriores =>[...productosAnteriores, producto]);
        return toast.success("Producto Agregado al carrito!");
    }

    function comprarProducto(producto){
        setCarrito(productosAnteriores =>[...productosAnteriores, producto]);
        router.push('/carrito');
    }

    const formatoCLP = (valor) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0,
        }).format(valor);
    };

    async function seleccionarProductosHombres(){
        try {
            const res = await fetch(`${API}/producto/categoriaProducto`, {
                method: "POST",
                headers: {Accept: "application/json",
                    "Content-Type": "application/json"},
                body: JSON.stringify({
                    categoriaProducto: 48
                }),
                mode: "cors"
            })

            if (!res.ok) {

                return toast.error('Ha ocurrido un error al listar los productos de Mujer. Contacte a Soporte.');

            } else {

                const resultadoData = await res.json();
                setlistaProductos(resultadoData);
                setmujeres(false);
                sethombres(true);
            }
        }catch(err){
            return toast.error('Ha ocurrido un error al listar los productos de Mujer. Contacte a Soporte.');
        }
    }





    async function seleccionarProductosMujer(){
        try {
            const res = await fetch(`${API}/producto/categoriaProducto`, {
                method: "POST",
                headers: {Accept: "application/json",
                "Content-Type": "application/json"},
                body: JSON.stringify({
                    categoriaProducto: 49
                }),
                mode: "cors"
            })

            if (!res.ok) {

                return toast.error('Ha ocurrido un error al listar los productos de Mujer. Contacte a Soporte.');

            } else {

                const resultadoData = await res.json();
                setlistaProductos(resultadoData);
                setmujeres(true);
                sethombres(false);
            }
        }catch(err){
            return toast.error('Ha ocurrido un error al listar los productos de Mujer. Contacte a Soporte.');
        }
    }


    async function cargarTodosProductos(){
        try {

            const res = await fetch(`${API}/producto/seleccionarProducto`, {
                method: 'GET',
                headers: {Accept: 'application/json',
                    'Content-Type': 'application/json'},
                mode: 'cors'
            })

            if(!res.ok){
                return toast.error('No ha sido posible cargar los datos desde el servidor, contacte a soporte de NativeCode');
            }else{
                const dataProductos = await res.json();
                setlistaProductos(dataProductos);
            }
        }catch(error){
            return toast.error('Problema en cargar los dat desde el servidor contacte a soporte de NativeCode');
        }
    }

    useEffect(() => {
        seleccionarProductosMujer()
    },[])




    return (
        <div>
            <ToasterClient/>
            <div className='bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 h-50 flex justify-center items-center gap-2 flex-col'>
                <h1 className='text-white text-5xl font-bold'>Catalogo de Servicios</h1>
                <p className="text-white tracking-wide font-bold text-2xl">Descubre nuestros tratamientos de depilación láser con tecnología Triláser</p>
            </div>

     <div className="flex justify-center mt-10 px-4">
         <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white/70 p-10 sm:p-12 shadow-2xl ring-1 ring-indigo-200/70 backdrop-blur">
             {/* soft gradient glow */}
             <div className="pointer-events-none absolute -inset-12 bg-gradient-to-r from-purple-500/15 via-indigo-500/15 to-cyan-400/15 blur-2xl" />
             {/* top accent line */}
             <div className="pointer-events-none absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400" />

             <div className="relative flex justify-center items-center gap-6">
                 <button
                     onClick={() => seleccionarProductosHombres()}
                     className="border border-indigo-600 p-3 rounded-3xl w-50 text-2xl font-bold text-indigo-600 bg-indigo-100
transition-all duration-300 ease-out
hover:bg-gradient-to-r hover:from-purple-500 hover:via-indigo-500 hover:to-cyan-400
hover:text-white hover:shadow-xl hover:-translate-y-0.5
active:scale-95">
  HOMBRE
</button>
                 <button
                     onClick={() => seleccionarProductosMujer()}
                     className="border border-indigo-600 p-3 rounded-3xl w-50 text-2xl font-bold text-white bg-indigo-600
transition-all duration-300 ease-out
hover:bg-gradient-to-r hover:from-purple-500 hover:via-indigo-500 hover:to-cyan-400
hover:shadow-xl hover:-translate-y-0.5
active:scale-95">
  MUJER
</button>
             </div>
         </div>
     </div>


            {mujeres && (
                <div className='w-full flex justify-center items-center gap-6 mt-20 px-4'>
                    <h1 className='bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 text-5xl font-bold text-transparent bg-clip-text'>MUJERES</h1>
                </div>

            )}




            {hombres && (
                <div className='w-full flex justify-center items-center gap-6 mt-20 px-4'>
                    <h1 className='bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 text-5xl font-bold text-transparent bg-clip-text'>HOMBRES</h1>
                </div>

            )}


            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-center p-20 ml-20 -mt-20'>
                {listaProductos.map((producto) => (
                    <div
                        key={producto.id_producto}
                        className="group relative mt-10 w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-indigo-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                    >
                        {/* Glow / gradient border */}
                        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-cyan-400/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

                        {/* Top accent */}
                        <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400" />

                        <div className="relative p-6 sm:p-8">
                            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-cyan-50 ring-1 ring-indigo-100">
                                <MediaCardImage
                                    imagenProducto={`https://imagedelivery.net/aCBUhLfqUcxA2yhIBn1fNQ/${producto.imagenProducto}/card`}
                                    tituloProducto={producto.tituloProducto}
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-indigo-900/10 via-transparent to-transparent" />
                            </div>

                            <div className="mt-5 flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <h1 className=" text-lg font-extrabold tracking-tight text-slate-900">
                                        {producto.tituloProducto}
                                    </h1>
                                        <div className=" px-3 py-2">
                                            <p className="text-xs font-semibold text-slate-500">Valor</p>
                                            <p className="text-base font-extrabold text-indigo-600">
                                                {formatoCLP(producto.valorProducto)}
                                            </p>
                                        </div>
                                </div>


                            </div>

                            <div className=" flex gap-3">
                                <button
                                    onClick={() => comprarProducto(producto)}
                                    className="w-full rounded-2xl border border-indigo-200 bg-white px-4 py-2.5 text-sm font-extrabold tracking-wide text-indigo-600 shadow-sm transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-md active:scale-[0.99]">
                                    Comprar
                                </button>
                                <button
                                    onClick={()=>anadirProducto(producto)}
                                    className="w-full rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 px-4 py-2.5 text-sm font-extrabold tracking-wide text-white shadow-md transition-all duration-200 hover:brightness-105 hover:shadow-lg active:scale-[0.99]">
                          <span className="flex items-center justify-center gap-2">
                            <span>Añadir</span>
                            <ShoppingCartIcon className="h-5 w-5 text-white transition-transform duration-200 group-hover:translate-x-0.5" />
                          </span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}