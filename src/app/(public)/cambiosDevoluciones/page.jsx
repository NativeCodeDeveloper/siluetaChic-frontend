"use client";

export default function PoliticaDevoluciones() {
    return (
        <div className="min-h-screen w-full bg-[#f0f2f5] flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-3xl">
                {/* “Tarjeta” estilo Facebook */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
                    {/* Título principal */}
                    <h1 className="text-2xl md:text-3xl font-semibold text-[#1877f2] text-center mb-4">
                        Política de Devoluciones
                    </h1>

                    <p className="text-gray-600 text-sm text-center mb-6">
                        Última actualización: {new Date().getFullYear()}
                    </p>

                    {/* Intro */}
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
                        En <span className="font-semibold">Macar Repuestos</span> queremos
                        que tengas una experiencia de compra clara y confiable. Por eso, te
                        presentamos nuestra política de devoluciones, donde se detallan las
                        condiciones y pasos necesarios para gestionar una devolución de
                        producto.
                    </p>

                    {/* Estado del producto */}
                    <section className="mb-6">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                            Estado del producto
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
                            Para que un producto sea aceptado como devolución, debe cumplir
                            con las siguientes condiciones:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 text-sm md:text-base space-y-1">
                            <li>
                                El producto <span className="font-semibold">no debe haber sido intervenido</span>, manipulado, instalado ni utilizado.
                            </li>
                            <li>
                                No debe presentar{" "}
                                <span className="font-semibold">
                  trizaduras, golpes ni otros daños físicos
                </span>
                                .
                            </li>
                        </ul>
                    </section>

                    {/* Embalaje original */}
                    <section className="mb-6">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                            Embalaje original
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
                            El producto debe venir en su{" "}
                            <span className="font-semibold">embalaje de origen</span>, incluyendo:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 text-sm md:text-base space-y-1">
                            <li>Sellos y etiquetas originales.</li>
                            <li>Códigos y stickers sin alterar.</li>
                            <li>Accesorios y protecciones internas.</li>
                        </ul>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mt-2">
                            No se aceptarán devoluciones con embalajes incompletos, dañados o
                            claramente manipulados.
                        </p>
                    </section>

                    {/* Plazo de devolución */}
                    <section className="mb-6">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                            Plazo de devolución
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            Las devoluciones podrán solicitarse dentro de un{" "}
                            <span className="font-semibold">
                plazo máximo de 30 días corridos
              </span>{" "}
                            desde la fecha de emisión de la{" "}
                            <span className="font-semibold">boleta o factura</span>.
                            Pasado este plazo, no será posible gestionar la devolución del
                            producto.
                        </p>
                    </section>

                    {/* Revisión del producto */}
                    <section className="mb-6">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                            Revisión del producto
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            Todo producto ingresado como devolución será{" "}
                            <span className="font-semibold">revisado por el área técnica</span>{" "}
                            para comprobar su estado y verificar que cumple con las
                            condiciones descritas en esta política.
                            La aprobación de la devolución quedará sujeta al resultado de
                            dicha revisión.
                        </p>
                    </section>

                    {/* Aprobación y emisión de documentos */}
                    <section className="mb-6">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                            Aprobación y emisión de documentos
                        </h2>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
                            Una vez aprobada la devolución por el área técnica:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 text-sm md:text-base space-y-1">
                            <li>
                                Se emitirá la correspondiente{" "}
                                <span className="font-semibold">Nota de Crédito</span>, o
                            </li>
                            <li>
                                Se gestionará la{" "}
                                <span className="font-semibold">devolución de valores</span>, según corresponda.
                            </li>
                        </ul>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mt-2">
                            Con ello se dará por finalizado el proceso formal de devolución,
                            de acuerdo con la normativa comercial vigente.
                        </p>
                    </section>

                    {/* Cierre */}
                    <section className="pt-4 border-t border-gray-200 mt-4">
                        <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                            Si tienes dudas sobre esta política o necesitas ayuda para
                            iniciar un proceso de devolución, puedes comunicarte con nuestro
                            equipo de soporte a través de los canales oficiales de contacto.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}