'use client'
import {Suspense} from "react";
import {useSearchParams} from "next/navigation";

function ReservaHoraContent() {
    const searchParams = useSearchParams();
    const fechaInicio = searchParams.get('fecha') || '';
    const horaInicio = searchParams.get('hora') || '';
    const emailPaciente = searchParams.get('email') || '';

  return (
    <section className="relative min-h-[70vh] w-full px-4 py-10 flex items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Fondos decorativos */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-200/60 via-cyan-200/40 to-white blur-3xl" />
        <div className="absolute -bottom-40 right-[-80px] h-[380px] w-[380px] rounded-full bg-gradient-to-br from-cyan-200/50 via-indigo-200/40 to-white blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg">
        <div className="rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(2,6,23,0.25)]">

          {/* Header */}
          <div className="flex items-start gap-4 p-7 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="flex-1">
              <span className="inline-flex items-center rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow">
                Reserva confirmada
              </span>

              <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
                ¡Felicidades!
              </h1>

              <p className="mt-2 text-slate-700">
                Su hora en{" "}
                <span className="font-semibold text-indigo-600">
                  Silueta Chic
                </span>{" "}
                ha sido reservada con éxito.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          {/* Body */}
          <div className="p-7 sm:p-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">Servicio</p>
                    <p className="text-sm text-slate-600">Depilación Trilaser</p>
                  </div>
                </div>

                <div className="h-px w-full bg-slate-100" />

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 border border-cyan-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M5 11h14M5 19h14M6 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">Fecha y hora</p>
                    <p className="text-sm text-slate-600">{fechaInicio} - {horaInicio}</p>
                  </div>
                </div>

                <div className="h-px w-full bg-slate-100" />

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">Duración</p>
                    <p className="text-sm text-slate-600">60 Minutos</p>
                  </div>
                </div>

                <div className="h-px w-full bg-slate-100" />

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 border border-slate-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-4.35 7-11a7 7 0 0 0-14 0c0 6.65 7 11 7 11z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">Ubicación</p>
                    <p className="text-sm text-slate-600">SILUETA CHIC, Avenida Irarrázaval 1989 OF 204 SUR, Ñuñoa, Santiago, Chile</p>
                  </div>
                </div>
              </div>
            </div>



            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">
                ¡Tu cita con Silueta Chic ha sido confirmada! <span aria-hidden>🎉</span>
              </p>
              <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                Para asegurar una sesión exitosa, revisa estos puntos clave:
                <br />
                1. Preparación Obligatoria: La zona debe asistir rasurada con rasuradora de varón (máx. 24h antes) y limpia e higienizada (sin cremas, maquillaje, desodorantes, etc.). Si no cumple la preparación, la sesión se pierde y se descuenta del paquete.
                <br />
                2. Políticas de Asistencia: Puntualidad: Tolerancia de 10 minutos de atraso. Si se excede, la sesión se pierde. Cancelación: Avise con al menos 24 horas de anticipación. El aviso tardío o No-Show resultará pérdida de la sesión.
                <br />
                3. Recordatorio de Cuidados PRE Y POST: Antes: Suspender sol/bronceado (30 días antes) y métodos de arranque (cera/pinzas). Suspender ácidos tópicos (1 semana antes). Suspender medicación fotosensibilizante/anticoagulante bajo supervisión médica. Si hay vacuna, esperar 15 días. Después: Evitar sol/bronceado (48 horas). Usar protector solar FPS 50. Evitar calor/sudor (24 horas). No depilar con métodos de arranque.
              </p>
            </div>

            <div className="mt-7 flex flex-col items-center gap-3">
              <a
                href="/AgendaProceso"
                className="inline-flex w-full max-w-xs items-center justify-center rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
              >
                Agendar otra cita
              </a>

              <a
                href="/"
                className="text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                Volver al inicio
              </a>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}

export default function ReservaHora() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center">Cargando...</div>}>
      <ReservaHoraContent />
    </Suspense>
  );
}
