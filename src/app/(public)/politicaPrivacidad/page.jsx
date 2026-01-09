"use client";

export default function PoliticaSeguridadDatos() {
    return (
        <div className="min-h-screen w-full bg-[#f0f2f5] flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-3xl">
                {/* Tarjeta estilo Facebook */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">

                    {/* Título principal */}
                    <h1 className="text-2xl md:text-3xl font-semibold text-[#1877f2] text-center mb-4">
                        Política de Privacidad y Seguridad de Datos
                    </h1>

                    <p className="text-gray-600 text-sm text-center mb-6">
                        Macar Repuestos Chile – Comprometidos con la transparencia y la seguridad.
                    </p>

                    {/* Introducción */}
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
                        En <span className="font-semibold">Macar Repuestos Chile</span> entendemos la importancia
                        de proteger tus datos personales. Esta política explica de forma clara y sencilla
                        qué información recopilamos, cómo la utilizamos y cómo la protegemos.
                    </p>

                    {/* Uso de los datos personales */}
                    <section className="mb-6">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                            ¿Para qué utilizamos tus datos?
                        </h2>

                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
                            La información que nos entregas al realizar una compra o consulta se utiliza
                            exclusivamente para:
                        </p>

                        <ul className="list-disc list-inside text-gray-700 text-sm md:text-base space-y-1">
                            <li>Gestionar tu pedido de forma correcta y oportuna.</li>
                            <li>Coordinar el despacho y entrega del producto.</li>
                            <li>Contactarte en caso de dudas o verificaciones necesarias.</li>
                            <li>Emitir documentos tributarios (boletas o facturas).</li>
                        </ul>

                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mt-2">
                            No utilizamos tus datos para publicidad invasiva ni los compartimos con terceros
                            fuera del proceso de compra.
                        </p>
                    </section>

                    {/* Datos bancarios y pagos */}
                    <section className="mb-6">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                            Seguridad en tus pagos
                        </h2>

                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
                            En <span className="font-semibold">Macar Repuestos Chile</span>{` `}
                            <span className="font-semibold">no manejamos ni almacenamos datos bancarios</span>
                            de nuestros clientes.
                        </p>

                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
                            Todas las transacciones se realizan directamente a través de la plataforma
                            <span className="font-semibold"> Mercado Pago</span>, una pasarela de pago segura y certificada.
                        </p>

                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
                            Esto significa que:
                        </p>

                        <ul className="list-disc list-inside text-gray-700 text-sm md:text-base space-y-1">
                            <li>Macar Repuestos Chile no ve ni registra tu número de tarjeta.</li>
                            <li>No accedemos a claves, tokens ni contraseñas bancarias.</li>
                            <li>
                                El pago se procesa **directamente entre Mercado Pago y tu banco**.
                            </li>
                        </ul>

                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mt-2">
                            Nuestro objetivo es brindarte una experiencia de compra segura y transparente.
                        </p>
                    </section>

                    {/* Almacenamiento y resguardo */}
                    <section className="mb-6">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                            Almacenamiento y protección de tus datos
                        </h2>

                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
                            La información necesaria para procesar tus compras (nombre, dirección,
                            correo, teléfono y datos tributarios) es almacenada de manera segura
                            en nuestros sistemas.
                        </p>

                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
                            Solo personal autorizado de Macar Repuestos Chile puede acceder a ella,
                            exclusivamente para tareas relacionadas con:
                        </p>

                        <ul className="list-disc list-inside text-gray-700 text-sm md:text-base space-y-1">
                            <li>Preparación de pedidos</li>
                            <li>Despacho y seguimiento</li>
                            <li>Atención al cliente</li>
                            <li>Respaldos administrativos requeridos</li>
                        </ul>

                        <p className="text-gray-700 text-sm md:text-base leading-relaxed mt-2">
                            Nunca venderemos ni compartiremos tus datos con terceros ajenos a nuestros servicios.
                        </p>
                    </section>

                    {/* Derechos del cliente */}
                    <section className="mb-6">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                            Tus derechos como cliente
                        </h2>

                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                            Puedes solicitar en cualquier momento información sobre los datos que guardamos
                            de ti, pedir su actualización o solicitar su eliminación, siempre que no exista
                            una obligación legal de mantenerlos (por ejemplo: boletas, facturas o garantías).
                        </p>
                    </section>

                    {/* Contacto */}
                    <section className="pt-4 border-t border-gray-200 mt-4">
                        <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-2">
                            Si tienes dudas sobre esta política o necesitas mayor información, puedes
                            comunicarte con nuestro equipo de soporte a través de los canales oficiales
                            de Macar Repuestos Chile.
                        </p>

                        <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                            Nuestro compromiso es mantener una relación basada en{" "}
                            <span className="font-semibold">seriedad, seguridad y transparencia</span>,
                            protegiendo siempre los datos que nos confías.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}