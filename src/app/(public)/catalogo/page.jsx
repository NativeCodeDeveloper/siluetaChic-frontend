'use client'
import {useState, useEffect} from 'react';
import ToasterClient from "@/Componentes/ToasterClient";
import {toast} from "react-hot-toast";
import MediaCardImage from "@/Componentes/MediaCardImage";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import {useCarritoGlobal} from "@/ContextosGlobales/CarritoContext";
import {useRouter} from "next/navigation";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function Catalogo(){
    const API = process.env.NEXT_PUBLIC_API_URL;
    const [_carrito, setCarrito] = useCarritoGlobal();
    const [listaProductos, setlistaProductos] = useState([]);
    const [mujeres, setmujeres] = useState(true);
    const [hombres, sethombres] = useState(false);
    const [listaSubcategoria, setListaSubcategoria] = useState([]);
    const [subCategoria, setSubCategoria] = useState(undefined);

    const router = useRouter();

    async function seleccionarProductosPorSubcategoria(subCategoria) {
        try {

            const res = await fetch(`${API}/producto/seleccionarPorSubcategoria`, {
                method: 'POST',
                headers: {Accept: 'application/json',
                    'Content-Type': 'application/json'},
                body: JSON.stringify({subCategoria: Number(subCategoria),}),
                mode: 'cors'
            })

            if (!res.ok) {
                return toast.error("No hay respuesta del servidor contacte al administrador.")
            }else {

                const dataSubcategoria = await res.json();
                setlistaProductos(dataSubcategoria);
            }
        }catch (e) {
            return toast.error("No hay respuesta del servidor")
        }
    }

    useEffect(() => {
 if (!subCategoria) return;
 seleccionarProductosPorSubcategoria(subCategoria);

    }, [subCategoria]);




    useEffect(() => {
        if (hombres) {
            listarSubcategoriaHombre();
        }else{
            listarSubcategoriaMujer();
        }

    },[hombres]);


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





    async function listarSubcategoriaHombre(){
        try {

            const res = await fetch(`${API}/subcategorias/seleccionarPorCategoria`, {
                method: 'POST',
                headers: {Accept: 'application/json',
                'Content-Type': 'application/json'},
                body: JSON.stringify({id_categoriaProducto : 48}),
                mode: 'cors'
            })
            if (!res.ok) {
                return toast.error("No se pueden listar subcategorias porque no hay hay respuesta desde el servidor.")

            }else{

                const backendData = await res.json();
                setListaSubcategoria(backendData);

            }
        }catch(error){
            return toast.error("No se pueden listar subcategorias porque no hay hay respuesta desde el servidor.")
        }

    }



    async function listarSubcategoriaMujer(){
        try {

            const res = await fetch(`${API}/subcategorias/seleccionarPorCategoria`, {
                method: 'POST',
                headers: {Accept: 'application/json',
                    'Content-Type': 'application/json'},
                body: JSON.stringify({id_categoriaProducto : 49}),
                mode: 'cors'
            })
            if (!res.ok) {
                return toast.error("No se pueden listar subcategorias porque no hay hay respuesta desde el servidor.")

            }else{

                const backendData = await res.json();
                setListaSubcategoria(backendData);

            }
        }catch(error){
            return toast.error("No se pueden listar subcategorias porque no hay hay respuesta desde el servidor.")
        }

    }



    return (
        <div>
            <ToasterClient/>
            <div className='bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 h-50 flex justify-center items-center gap-2 flex-col'>
  <div className="p-30">
      <h1 className='text-white text-4xl md:text-5xl text-center font-bold'>Catalogo de Servicios</h1>
      <p className="hidden md:block text-white tracking-wide text-xs text-center p-5">Diseñado para hombres y mujeres que buscan una piel saludable, libre de vello encarnado e irritación. Entendemos que la verdadera comodidad nace de una rutina sin complicaciones; por eso, nuestra tecnología Trilaser ofrece una solución definitiva que prioriza tu higiene y bienestar. Recupera la suavidad y el confort total en tu día a día con resultados visibles desde la primera sesión
      </p>

      <p className="block md:hidden text-white tracking-wide text-xs text-center p-5">Diseñado para hombres y mujeres que buscan una piel saludable.
      </p>

  </div>
            </div>

     <div className="flex justify-center mt-8 px-4">
         <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white/80 p-4 sm:p-6 shadow-lg ring-1 ring-indigo-100/80 backdrop-blur">
             {/* soft gradient glow */}
             <div className="pointer-events-none absolute -inset-16 bg-gradient-to-r from-purple-500/16 via-indigo-500/16 to-cyan-400/14 blur-3xl" />
             {/* top accent */}
             <div className="relative h-1 w-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400" />

             <div className="relative mt-4">
                 <p className="mx-auto max-w-2xl text-center text-base sm:text-xl font-extrabold tracking-tight text-slate-800">
                     Selecciona tu categoría y descubre el plan perfecto para transformar tu rutina
                 </p>
                 <p className="mx-auto mt-1 max-w-2xl text-center text-xs sm:text-sm text-slate-500">
                     Elige Mujer u Hombre para ver servicios y precios recomendados.
                 </p>

                 <div className="mt-5 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                     {/* HOMBRE */}
                     <button
                         type="button"
                         onClick={seleccionarProductosHombres}
                         className={`group relative w-full max-w-[240px] rounded-2xl p-4 sm:p-5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 ${hombres ? 'ring-2 ring-amber-400/70 shadow-[0_0_0_1px_rgba(251,191,36,0.40),0_14px_44px_-28px_rgba(245,158,11,0.55)]' : 'ring-1 ring-slate-200 hover:ring-amber-300/60 hover:shadow-md'} bg-white/70`}
                     >
                         <div className="relative mx-auto flex h-[150px] w-[150px] sm:h-[180px] sm:w-[180px] items-center justify-center">
                             {/* glow */}
                             <div className="pointer-events-none absolute -inset-6 rounded-full bg-amber-300/25 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                             <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-slate-100 via-white to-slate-100 ring-1 transition-all ${hombres ? 'ring-amber-300/70' : 'ring-indigo-100 group-hover:ring-amber-200/60'}`} />
                             <img
                                 src={"/hombre3.png"}
                                 alt={"Hombre"}
                                 width={180}
                                 height={180}
                                 className="relative z-10 h-full w-full rounded-full object-cover"
                             />
                         </div>

                         <div className="mt-4 text-center">
                             <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-[11px] font-extrabold tracking-[0.24em] ${hombres ? 'bg-amber-100 text-amber-900 ring-1 ring-amber-200' : 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'} transition-all duration-300`}
                             >
                                 HOMBRE
                             </span>

                         </div>
                     </button>

                     {/* MUJER */}
                     <button
                         type="button"
                         onClick={seleccionarProductosMujer}
                         className={`group relative w-full max-w-[240px] rounded-2xl p-4 sm:p-5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 ${mujeres ? 'ring-2 ring-amber-400/70 shadow-[0_0_0_1px_rgba(251,191,36,0.40),0_14px_44px_-28px_rgba(245,158,11,0.55)]' : 'ring-1 ring-slate-200 hover:ring-amber-300/60 hover:shadow-md'} bg-white/70`}
                     >
                         <div className="relative mx-auto flex h-[150px] w-[150px] sm:h-[180px] sm:w-[180px] items-center justify-center">
                             {/* glow */}
                             <div className="pointer-events-none absolute -inset-6 rounded-full bg-amber-300/25 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                             <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-slate-100 via-white to-slate-100 ring-1 transition-all ${mujeres ? 'ring-amber-300/70' : 'ring-indigo-100 group-hover:ring-amber-200/60'}`} />
                             <img
                                 src={"/mujer1.png"}
                                 alt={"Mujer"}
                                 width={180}
                                 height={180}
                                 className="relative z-10 h-full w-full rounded-full object-cover"
                             />
                         </div>

                         <div className="mt-4 text-center">
                             <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-[11px] font-extrabold tracking-[0.24em] ${mujeres ? 'bg-amber-100 text-amber-900 ring-1 ring-amber-200' : 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'} transition-all duration-300`}
                             >
                                 MUJER
                             </span>

                         </div>
                     </button>
                 </div>
             </div>
         </div>
     </div>


<div className="w-full flex justify-center items-center mt-10">
    <Select
    value={subCategoria}
    onValueChange={value => setSubCategoria(value)}
    >
        <SelectTrigger className=" w-100">
            <SelectValue placeholder="Selecciona por Categoria" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>Filtrar por Categoria</SelectLabel>
                {listaSubcategoria.map(subcategoria => (
                    <SelectItem key={subcategoria.id_subcategoria} value={String(subcategoria.id_subcategoria)}>{subcategoria.descripcionCategoria}</SelectItem>
                ))}
            </SelectGroup>
        </SelectContent>
    </Select>
</div>

            {mujeres && (
                <div className='w-full flex justify-center items-center gap-6 mt-20 px-4'>
                    <h1 className='bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 text-4xl md:text-5xl font-bold text-transparent bg-clip-text'>MUJERES</h1>
                </div>

            )}




            {hombres && (
                <div className='w-full flex justify-center items-center gap-6 mt-20 px-4'>
                    <h1 className='bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 text-4xl md:text-5xl font-bold text-transparent bg-clip-text'>HOMBRES</h1>
                </div>

            )}


            <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-8 px-6 md:grid-cols-3">
                {listaProductos.map((producto) => (
                    <div
                        key={producto.id_producto}
                        className="group relative flex h-full w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-indigo-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                    >
                        {/* Glow / gradient border */}
                        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-cyan-400/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

                        {/* Top accent */}
                        <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400" />

                        <div className="relative flex h-full flex-col p-6 sm:p-8">
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

                            <div className="mt-auto flex gap-3">
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