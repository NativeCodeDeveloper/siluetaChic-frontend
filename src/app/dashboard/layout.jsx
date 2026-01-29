// app/dashboard/layout.jsx
import Link from "next/link";

export const metadata = {
    title: "Dashboard",
    description: "Panel de administración",
};

export default function DashboardLayout({ children }) {
    return (
        <div className="h-screen w-full overflow-hidden bg-slate-50">
            <div className="flex h-full w-full">
                {/* Sidebar */}
                <aside className="hidden md:flex h-screen w-[260px] shrink-0 flex-col border-r border-slate-800 bg-gray-800 text-white">
                    <div className="px-5 py-5 border-b border-white/10 shrink-0">
                        <div className="flex items-center gap-3">
                            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-cyan-300 to-cyan-500 shadow-[0_0_18px_rgba(34,211,238,0.35)]" />
                            <div className="leading-tight">
                                <div className="text-2xl font-semibold tracking-wide">Silueta Chic</div>
                                <div className="text-[11px] text-white/60">Panel Administrador</div>
                            </div>
                        </div>
                    </div>

                    <nav className="flex-1 px-3 py-4 overflow-y-auto">
                        <div className="space-y-1">
                            <Link
                                href="/dashboard"
                                className="group flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium text-white hover:bg-blue-400/15 transition"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-blue-400 transition" />
                                Inicio Panel
                            </Link>

                            <Link
                                href="/dashboard/pedidosCompras"
                                className="group flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium text-white hover:bg-blue-400/15 transition"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-blue-400 transition" />
                                Compras en Linea
                            </Link>

                            <Link
                                href="/dashboard/ingresoProductos"
                                className="group flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium text-white hover:bg-blue-400/15 transition"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-blue-400 transition" />
                                Productos / Servicios
                            </Link>



                            <Link
                                href="/dashboard/cupones"
                                className="group flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium text-white hover:bg-blue-400/15 transition"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-blue-400 transition" />
                                Cupones Descuentos
                            </Link>

                            <Link
                                href="/dashboard/calendario"
                                className="group flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium text-white hover:bg-blue-400/15 transition"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-blue-400 transition" />
                                Ingreso Agendamientos
                            </Link>




                            <Link
                                href="/dashboard/calendarioGeneral"
                                className="group flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium text-white hover:bg-blue-400/15 transition"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-blue-400 transition" />
                                Calendario de Citas
                            </Link>

                            <Link
                                href="/dashboard/agendaCitas"
                                className="group flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium text-white hover:bg-blue-400/15 transition"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-blue-400 transition" />
                                Estado de Reservaciones
                            </Link>

                            <Link
                                href="/dashboard/categoriasProductos"
                                className="group flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium text-white hover:bg-blue-400/15 transition"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-blue-400 transition" />
                                Categorías Productos/Servicios
                            </Link>

                            <Link
                                href="/dashboard/publicaciones"
                                className="group flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium text-white hover:bg-blue-400/15 transition"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-blue-400 transition" />
                                Publicaciones Estandar
                            </Link>


                            <Link
                                href="/dashboard/portadaEdit"
                                className="group flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium text-white hover:bg-blue-400/15 transition"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-blue-400 transition" />
                                Carrusel de Portada
                            </Link>

                            <Link
                                href="/dashboard/GestionPaciente"
                                className="group flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium text-white hover:bg-blue-400/15 transition"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-blue-400 transition" />
                                Ingreso Pacientes en sistema
                            </Link>



                            <Link
                                href="/dashboard/FichaClinica"
                                className="group flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium text-white hover:bg-blue-400/15 transition"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-blue-400 transition" />
                                Fichas Clinicas
                            </Link>
                        </div>

                        <div className="mt-6 border-t border-white/10 pt-4">
                            <div className="px-2 text-[11px] uppercase tracking-wider text-white/50">Atajos</div>
                            <div className="mt-2 space-y-1">
                                <Link
                                    href="/"
                                    className="group flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium text-white hover:bg-blue-400/15 transition"                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                                    Volver al sitio
                                </Link>
                            </div>
                        </div>







                    </nav>

                    <div className="px-5 py-4 border-t border-white/10 shrink-0">
                        <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 px-4 py-3">
                            <div className="text-[11px] uppercase tracking-wider text-white/60">Estado</div>
                            <div className="mt-1 flex items-center justify-between">
                                <span className="text-[13px] font-semibold text-white/90">Operativo</span>
                                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.35)]" />
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Content */}
                <div className="flex-1 min-w-0 h-full overflow-y-auto">
                    {/* Mobile top bar */}
                    <div className="md:hidden sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur">
                        <div className="px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-700" />
                                <span className="text-sm font-semibold text-slate-900">Silueta Chic</span>
                            </div>
                            <div className="text-xs text-slate-500">Dashboard</div>
                        </div>
                        <div className="px-4 pb-3">
                            <div className="flex flex-wrap gap-2">
                                <Link href="/dashboard" className="text-[11px] font-semibold px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition">Inicio</Link>
                                <Link href="/dashboard/pedidosCompras" className="text-[11px] font-semibold px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition">Pedidos</Link>
                                <Link href="/dashboard/ingresoProductos" className="text-[11px] font-semibold px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition">Productos</Link>
                                <Link href="/dashboard/cupones" className="text-[11px] font-semibold px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition">Cupones</Link>
                                <Link href="/dashboard/calendario" className="text-[11px] font-semibold px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition">Agenda</Link>
                                <Link href="/dashboard/agendaCitas" className="text-[11px] font-semibold px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition">Citas</Link>
                                <Link href="/dashboard/categoriasProductos" className="text-[11px] font-semibold px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition">Categorías</Link>
                                <Link href="/dashboard/publicaciones" className="text-[11px] font-semibold px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition">Publicaciones</Link>
                            </div>
                        </div>
                    </div>

                    <main className="min-w-0">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}