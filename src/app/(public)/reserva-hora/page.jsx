import Link from 'next/link';

export default function ReservaHora() {
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
            <p className="text-sm text-slate-600 leading-relaxed">
              Nuestro equipo se pondrá en contacto con usted a través de los
              medios proporcionados para confirmar detalles o entregar
              información adicional previa a su atención.
            </p>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-800 mb-2">
                Próximos pasos
              </p>
              <ul className="space-y-1 text-sm text-slate-600 list-disc list-inside">
                <li>Revisar mensajes o llamadas de confirmación</li>
                <li>Asistir puntualmente a su hora reservada</li>
                <li>Ante dudas, responder por el mismo medio de contacto</li>
              </ul>
            </div>

            <div className="mt-8 flex justify-center">
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
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