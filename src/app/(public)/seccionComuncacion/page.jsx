export default function SeccionComuncacion() {
    return (
        <section className="mt-50 px-6">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
                    Depilación que <span className="bg-gradient-to-r from-violet-500 to-sky-500 bg-clip-text text-transparent">Transforma</span>
                </h1>

                <p className="mt-4 text-gray-500 text-lg">
                    No solo eliminamos el vello, transformamos tu relación con tu piel
                </p>


                <div>
                    <p className="mt-4 text-gray-500 text-lg">
                        La depilación láser no solo ofrece una solución a largo plazo para el vello no deseado. También puede marcar un cambio profundo en tu relación con tu piel. Te da libertad, comodidad y seguridad. Te permite soltar la rutina de la rasuradora, olvidarte de la cera y abrazar una nueva forma de cuidado personal.
                    </p>
                </div>


                <div className="mt-30 grid grid-cols-1 md:grid-cols-4 gap-10">


                    {/* Card 1 */}
                    <div className="bg-white rounded-3xl p-10  transition">
                        <div className="flex justify-center -mt-20 mb-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg ring-8 ring-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 4v5c0 5-3.5 9-7 11-3.5-2-7-6-7-11V7l7-4z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-lg font-semibold tracking-tight">Seguridad</h2>

                        <p className="text-sm leading-relaxed">
                            Tecnología certificada y personal especializado
                        </p>

                    </div>


                    {/* Card 2 */}
                    <div className="bg-white rounded-3xl p-10  transition">
                        <div className="flex justify-center -mt-20 mb-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center shadow-lg ring-8 ring-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <circle cx="12" cy="12" r="9" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-lg font-semibold tracking-tight">Rapidez</h2>

                        <p className="text-sm leading-relaxed">
                            Sesiones cortas con resultados duradeross
                        </p>

                    </div>


                    {/* Card 3 */}
                    <div className="bg-white rounded-3xl p-10  transition">
                        <div className="flex justify-center -mt-20 mb-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg ring-8 ring-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 21s-6.7-4.4-9.3-7.4C-1 9.9 2 4 7 6c2 1 3 3 5 5 2-2 3-4 5-5 5-2 8 3.9 4.3 7.6C18.7 16.6 12 21 12 21z"/>
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-lg font-semibold tracking-tight">Confort</h2>

                        <p className="text-sm leading-relaxed">
                            Sistema de enfriamiento para mayor comodidad
                        </p>

                    </div>


                    {/* Card 4 */}
                    <div className="bg-white rounded-3xl p-10  transition">
                        <div className="flex justify-center -mt-20 mb-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg ring-8 ring-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <circle cx="12" cy="7" r="4" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 21a6.5 6.5 0 0113 0" />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-lg font-semibold tracking-tight">
                            Personalizado

                        </h2>

                         <p className="text-sm leading-relaxed">
                            Plan diseñado específicamente para ti
                         </p>
                    </div>
                </div>
            </div>
        </section>
    );
}