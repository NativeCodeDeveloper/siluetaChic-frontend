import Image from "next/image";
import Link from "next/link";

export default function MisionMacarCard() {
    return (
        <section className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl border border-blue-900/10 px-2 sm:px-4 md:px-10 bg-gradient-to-b from-blue-50/60 via-white/60 to-blue-100/60">
            {/* Fondo */}
            <div className="absolute inset-0 z-0" aria-hidden="true">
                <Image
                    src="/maxus1.jpg"
                    alt="Fondo Maxus"
                    fill
                    sizes="100vw"
                    className="object-cover object-center scale-105"
                />
                {/* Overlay: glassmorphism + gradiente corporativo */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-blue-800/40 to-white/50 backdrop-blur-[2px]" />
                {/* Detalle decorativo: blob azul */}
                <div className="absolute -top-24 -left-24 z-10 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
            </div>

            {/* Contenido */}
            <div className="relative z-20 flex flex-col items-center w-full pt-8 sm:pt-16 md:pt-24 pb-8 sm:pb-12 md:pb-20">
                {/* Logo (desktop) */}
                <div className="hidden md:flex justify-center items-center mb-8">
                    <Image
                        src="/logoBlack2.png"
                        alt="Macar Repuestos"
                        width={320}
                        height={320}
                        className="h-auto w-[220px] md:w-[320px] mx-auto"
                    />
                </div>

                {/* Logo (móvil) */}
                <div className="flex md:hidden justify-center items-center mb-6">
                    <Image
                        src="/logoBlack2.png"
                        alt="Macar Repuestos"
                        width={220}
                        height={220}
                        className="h-auto w-[160px] sm:w-[220px] mx-auto"
                    />
                </div>

                <div className="flex flex-col w-full items-center gap-6 sm:gap-10 md:gap-14">
                    {/* Card Misión */}
                    <div className="w-full max-w-xl md:max-w-2xl rounded-3xl border border-blue-900/15 bg-white/90 backdrop-blur-xl shadow-2xl p-4 sm:p-8 md:p-14 flex flex-col items-center break-words hyphens-auto">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-center mb-6 mt-2">
                            <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-400 bg-clip-text text-transparent drop-shadow-xl">
                                Nuestra Misión
                            </span>
                        </h2>

                        <p className="mt-2 text-center text-sm sm:text-base md:text-lg leading-relaxed text-gray-800 font-semibold">
                            Proveer repuestos <span className="text-blue-700 font-bold">100% originales de fábrica</span> para vehículos Maxus,
                            mediante importación directa y asesoría técnica especializada.
                            <br />
                            <br />
                            Entregamos soluciones confiables y oportunas a clientes de todo Chile, con un servicio serio antes, durante y después
                            de cada compra.
                            <br />
                            <br />
                            <span className="text-blue-700 font-bold">Transparencia, respaldo y atención personalizada</span> son nuestro sello,
                            construyendo relaciones de largo plazo.
                        </p>
                    </div>

                    {/* Card Visión */}
                    <div className="w-full max-w-xl md:max-w-2xl rounded-3xl border border-blue-900/15 bg-white/90 backdrop-blur-xl shadow-2xl p-4 sm:p-8 md:p-14 flex flex-col items-center break-words hyphens-auto">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-center mb-6 mt-2">
                            <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-400 bg-clip-text text-transparent drop-shadow-xl">
                                Nuestra Visión
                            </span>
                        </h2>

                        <p className="mt-2 text-center text-sm sm:text-base md:text-lg leading-relaxed text-gray-800 font-semibold">
                            Ser el líder nacional en repuestos originales Maxus y un referente regional en Latinoamérica.
                            <br />
                            <br />
                            Consolidarnos como empresa chilena de la Región de Ñuble, reconocida por
                            <span className="text-blue-700 font-bold"> especialización, confiabilidad y excelencia en el servicio</span>.
                            <br />
                            <br />
                            Aportar a la seguridad automotriz con estándares altos y repuestos oficiales.
                        </p>

                        <h3 className="mt-8 text-lg sm:text-xl md:text-2xl font-bold text-center text-blue-900">
                            Satisfacción al cliente
                        </h3>

                        <p className="mt-2 text-center text-sm sm:text-base md:text-lg leading-relaxed text-gray-700 font-semibold">
                            La satisfacción del cliente es el eje de nuestro trabajo. Entregamos productos originales, información clara,
                            asesoría experta y un servicio eficiente. Medimos nuestro éxito por la confianza, la fidelización y la recomendación,
                            asegurando una experiencia seria, segura y de alto estándar.
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <Link href="/formularioContacto" className="mt-10 inline-block">
                    <span className="inline-block rounded-full bg-gradient-to-r from-blue-700 to-cyan-400 px-8 py-3 text-base sm:text-lg font-bold text-white shadow-lg hover:scale-105 transition-transform">
                        Contáctanos
                    </span>
                </Link>
            </div>
        </section>
    );
}
