import Image from "next/image";
import {
    BoltIcon,
    SparklesIcon,
    BeakerIcon,
    ShieldCheckIcon,
    HeartIcon,
    CheckIcon
} from "@heroicons/react/24/solid";

export  default function ServicioPage(){
    return(
        <div>
            <div className="
            bg-gradient-to-r  from-purple-300 via-indigo-400 to-cyan-700
            h-50 flex flex-col items-center justify-center ">
                <h1 className='text-6xl font-bold text-white'>Nuestros Servicios</h1>
                <p className='text-white font-bold'>Tecnología Triláser de última generación para resultados excepcionales</p>
            </div>



            <div className="flex flex-col items-center justify-center mt-20">
                <h1 className='text-5xl font-bold text-gray-800'>Una nueva relación con tu piel</h1>
                <br/>
                <div className='mx-auto max-w-4xl text-center'>
                    <p className='mx-auto text-balance text-lg leading-relaxed tracking-wide text-gray-700'>
                        La depilación láser no solo ofrece una solución a largo plazo para el vello no deseado.
                        También puede marcar un cambio profundo en tu relación con tu piel. Te da libertad, comodidad y
                        seguridad. Te permite soltar la rutina de la rasuradora, olvidarte de la cera y abrazar una nueva
                        forma de cuidado personal.
                    </p>
                </div>



                <div className='mt-30 bg-gray-100 w-full flex flex-col items-center justify-center '>
                    <h1 className="text-5xl font-bold text-gray-800 mt-20">
                        Mira el {" "}
                        <span className="bg-gradient-to-r from-purple-300 via-indigo-400 to-cyan-700 text-transparent bg-clip-text">Proceso</span>
                    </h1>


                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-20'>
                        
                        <div className='flex flex-col items-center justify-center border rounded-2xl shadow-lg'>
                            <Image src={'/prueba1.jpg'} alt={'prueba'} width={400} height={400} />

                            <di className=' flex flex-col items-center justify-center mt-5'>
                                <h1 className='text-gray-700 font-bold'>Depilación Axila</h1>
                                <p>Tratamiento rápido y efectivo</p>
                                <br/>
                            </di>
                        </div>




                        <div className='flex flex-col items-center justify-center border rounded-2xl shadow-lg'>
                            <Image src={'/prueba1.jpg'} alt={'prueba'} width={400} height={400} />

                            <di className=' flex flex-col items-center justify-center mt-5'>
                                <h1 className='text-gray-700 font-bold'>Depilación Pierna</h1>
                                <p>Resultados desde la primera sesión</p>
                                <br/>
                            </di>

                        </div>




                        <div className='flex flex-col items-center justify-center border rounded-2xl shadow-lg'>
                            <Image src={'/prueba1.jpg'} alt={'prueba'} width={400} height={400} />

                            <di className=' flex flex-col items-center justify-center mt-5'>
                                <h1 className='text-gray-700 font-bold'>Rostro Completo</h1>
                                <p>Tratamiento facial delicado</p>
                                <br/>
                            </di>

                        </div>




                        <div className='flex flex-col items-center justify-center border rounded-2xl shadow-lg'>
                            <Image src={'/prueba1.jpg'} alt={'prueba'} width={400} height={400} />

                            <di className=' flex flex-col items-center justify-center mt-5'>
                                <h1 className='text-gray-700 font-bold'>Barba y Rostro</h1>
                                <p>Perfilado profesional</p>
                                <br/>
                            </di>

                        </div>




                        <div className='flex flex-col items-center justify-center border rounded-2xl shadow-lg'>
                            <Image src={'/prueba1.jpg'} alt={'prueba'} width={400} height={400} />

                            <di className=' flex flex-col items-center justify-center mt-5'>
                                <h1 className='text-gray-700 font-bold'>Empeine y Dedos</h1>
                                <p>Acabado perfecto</p>
                                <br/>
                            </di>

                        </div>



                        <div className='flex flex-col items-center justify-center border rounded-2xl shadow-lg'>
                            <Image src={'/prueba1.jpg'} alt={'prueba'} width={400} height={400} />

                            <di className=' flex flex-col items-center justify-center mt-5'>
                                <h1 className='text-gray-700 font-bold'>Otras Areas</h1>
                                <p>Tratamiento a medida</p>
                                <br/>
                            </di>

                        </div>

                    </div>

                    <br/> <br/> <br/>
                </div>


                <div className='flex flex-col items-center justify-center  p-10 bg-gray-100'>
                    <h1 className='text-5xl font-bold text-gray-800 mt-20'>
                        Nuestra {" "}
                        <span className="
                        bg-gradient-to-r from-purple-300 via-indigo-400 to-cyan-700
                        text-transparent bg-clip-text
                        ">
                            Especialización
                        </span>
                    </h1>

                    <div>

                        <div className='border p-10 rounded-2xl shadow-lg mt-5 bg-white '>
                            <p className="text-center tracking-wide text-gray-400 ">
                                Nos especializamos en depilación triláser avanzada, un sistema seguro, rápido y eficaz para lograr una piel suave y libre de vello en cualquier época del año.
                                Nuestro enfoque no es solo ofrecer sesiones, sino diseñar planes personalizados de depilación adaptados a cada tipo de piel, tono, nivel de sensibilidad y velocidad de crecimiento del vello.
                                Trabajamos con tecnología triláser de última generación, que combina Alejandrita, Diodo y Nd:YAG, lo que nos permite brindar resultados visibles en menos tiempo.
                                Cada cliente recibe un diagnóstico inicial, un plan estructurado de sesiones y acompañamiento continuo, porque entendemos que la depilación es un proceso y no un servicio aislado.
                            </p>
                        </div>
                    </div>
                </div>




                <div className='flex flex-col items-center justify-center mt-50'>

                    <h1 className='text-5xl font-bold text-gray-800 mt-20'>
                        Tecnología {" "}
                        <span className="bg-gradient-to-r from-purple-300 via-indigo-500 to-cyan-700 text-transparent bg-clip-text">
                            Triláser Infinity Super Ice
                        </span>
                    </h1>

                    <br/> <br/> <br/>




                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-5'>
                        <div className='flex flex-col items-center justify-center mt-5 bg-white border
                        rounded-2xl shadow-lg w-100 p-10'>
                            {/* ICONO */}
                            <div className="mb-4 flex items-center justify-center">
                                <BoltIcon className="w-20 h-20 text-indigo-500" />
                            </div>

                            <h1 className='mt-5'>
                                <span className="bg-gradient-to-r from-purple-300 to-indigo-400 text-transparent bg-clip-text font-bold text-2xl mt-20">Láser Alejandrita 755nm</span>
                            </h1>

                            <p className="text-base text-gray-400 tracking-wide mt-2">Ofrece una absorción de energía que permite tratar la más amplia variedad de tipo de vello, ofreciendo sus mejores
                                resultados con el vello fino y de color claro,
                                con una capacidad de penetración superficial es eficaz en
                                el vello que se encuentra situado a un nivel muy superficial.</p>

                            <hr className="mt-5 w-full border-gray-700 my-10" />

                            <br/>

                            <h1>
                                <span className="bg-gradient-to-r from-purple-300 to-indigo-400 text-transparent bg-clip-text font-bold text-2xl mt-20">Ideal para:</span>
                            </h1>
                            <ul className='list-disc mt-2 text-gray-400 tracking-wide'>
                                <li>Vello fino y claro</li>
                                <li>Penetración superficial</li>
                                <li>Pieles claras</li>
                            </ul>
                        </div>


                        <div className='flex flex-col items-center justify-center mt-5 bg-white border
                        rounded-2xl shadow-lg w-100 p-10'>


                            <div className="mb-4 flex items-center justify-center -mt-20">
                                <div className="mb-4 flex items-center justify-center">
                                    <SparklesIcon className="w-20 h-20 text-sky-500" />
                                </div>

                            </div>

                            <h1>
                                <span className="bg-gradient-to-r from-sky-400 to-sky-500  text-transparent bg-clip-text font-bold text-2xl mt-20">Láser de Diodo 808nm

</span>
                            </h1>

                            <p className="text-base text-gray-400 tracking-wide mt-2">Tiene una capacidad de penetración profunda, se centra en la protuberancia y el bulbo del folículo piloso, y con una capacidad moderada de absorción por la melanina es seguro tratar pieles oscuras.</p>

                            <hr className="mt-5 w-full border-gray-700 my-10" />

                            <br/>

                            <h1>
                                <span className="bg-gradient-to-r from-sky-400 to-sky-500  text-transparent bg-clip-text font-bold text-2xl mt-20">Ideal para:</span>
                            </h1>
                            <ul className='list-disc mt-2 text-gray-400 tracking-wide'>
                                <li>Penetración profunda</li>
                                <li>Pieles oscuras</li>
                                <li>Vello medio y grueso</li>
                            </ul>
                        </div>


                        <div className='flex flex-col items-center justify-center mt-5 bg-white border
                        rounded-2xl shadow-lg w-100 p-10 '>

                            <div className="mb-4 flex items-center justify-center -mt-20">
                                <BeakerIcon className="w-20 h-20 text-indigo-500" />
                            </div>

                            <h1>
                                <span className="bg-gradient-to-r from-purple-300 to-indigo-400 text-transparent bg-clip-text font-bold text-2xl mt-20">Láser Nd:YAG 1064nm</span>
                            </h1>

                            <p className="text-base text-gray-400 tracking-wide mt-2">Tiene una longitud de onda de 1064nm, enfocada para tratar las pieles más oscuras, puede tratar el vello a mayor profundidad de la piel, tiene una mayor absorción de agua lo que genera una temperatura más elevada..</p>

                            <hr className="mt-5 w-full border-gray-700 my-10" />

                            <br/>

                            <h1>
                                <span className="bg-gradient-to-r from-purple-300 to-indigo-400 text-transparent bg-clip-text font-bold text-2xl mt-20">Ideal para:</span>
                            </h1>
                            <ul className='list-disc mt-2 text-gray-400 tracking-wide'>
                                <li>Pieles muy oscuras</li>
                                <li>Mayor profundidad</li>
                                <li>Todos los fototipos</li>
                            </ul>
                        </div>

                    </div>



                </div>

                <br/> <br/> <br/>


                <div className='flex flex-col items-center justify-center mt-5 bg-gradient-to-r from-purple-300 via-indigo-500 to-cyan-400 w-full'>
                    <h1 className='text-5xl font-bold text-white mt-10'>
                        Beneficios Clave

                    </h1>

                    <div className='shadow-lg bg-white/20 w-200 rounded-2xl p-10 mt-10'>
                        <div className='flex gap-6'>
                            <span>   <SparklesIcon className="w-8 h-8 text-yellow-300" /></span>
                            <h1 className='text-white font-bold tracking-wide text-3xl'> Versatilidad</h1>
                        </div>

                        <p className='text-white font-light tracking-wide text-base mt-5'>
                            Utiliza tres longitudes de onda (Alexandrita, Diodo y Nd:YAG) que combinan la acción del vello fino, el vello medio y el vello
                            grueso, haciendo que el tratamiento sea efectivo para todos los tipos de piel y vello.
                        </p>
                    </div>



                    <div className='shadow-lg bg-white/20 w-200 rounded-2xl p-10 mt-10'>
                        <div className='flex gap-6'>
                            <span>   <ShieldCheckIcon className="w-8 h-8 text-sky-800" /></span>
                            <h1 className='text-white font-bold tracking-wide text-3xl'> Seguridad</h1>
                        </div>

                        <p className='text-white font-light tracking-wide text-base mt-5'>
                            La tecnología está diseñada para minimizar la absorción de energía en la piel, enfocándola en el folículo piloso y reduciendo el riesgo de lesiones..
                        </p>
                    </div>





                    <div className='shadow-lg bg-white/20 w-200 rounded-2xl p-10 mt-10'>
                        <div className='flex gap-6'>
                            <span>   <HeartIcon className="w-8 h-8 text-red-600" /></span>
                            <h1 className='text-white font-bold tracking-wide text-3xl'> Confort</h1>
                        </div>

                        <p className='text-white font-light tracking-wide text-base mt-5'>
                            Cuenta con un sistema de enfriamiento avanzado que mantiene el aplicador a baja temperatura durante el tratamiento, lo que hace que el proceso sea indoloro y cómodo.                        </p>
                    </div>



                    <div className='shadow-lg bg-white/20 w-200 rounded-2xl p-10 mt-10'>
                        <div className='flex gap-6'>
                            <span>   <BoltIcon className="w-8 h-8 text-amber-400" /></span>
                            <h1 className='text-white font-bold tracking-wide text-3xl'> Eficacia</h1>
                        </div>

                        <p className='text-white font-light tracking-wide text-base mt-5'>
                            Cuenta con un sistema de enfriamiento avanzado que mantiene el aplicador a baja temperatura durante el tratamiento, lo que hace que el proceso sea indoloro y cómodo.                        </p>
                    </div>





                    <div className='shadow-lg bg-white/20 w-200 rounded-2xl p-10 mt-10'>
                        <div className='flex gap-6'>
                            <span>   <CheckIcon className="w-8 h-8 text-green-700" /></span>
                            <h1 className='text-white font-bold tracking-wide text-3xl'> Beneficios Adicionales</h1>
                        </div>

                        <p className='text-white font-light tracking-wide text-base mt-5'>
                            Además de la depilación, puede mejorar la calidad de la piel y ayudar a tratar la foliculitis causado por la cera o la rasuradora, obstrucciones que generan brotes e irritación, el olor corporal y la sudoración excesiva.                    </div>

                </div>







            </div>
        </div>
    )
}