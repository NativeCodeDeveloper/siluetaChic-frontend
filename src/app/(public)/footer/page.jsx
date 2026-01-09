"use client";
import React from 'react';

export default function App() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="footer"
      className="text-gray-700 bg-white border-t border-gray-200 tracking-[0.01em]"
    >
      {/* REDES SOCIALES */}
      <section className="w-full border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-center gap-6">
          {[
            { href: 'https://www.instagram.com/runajoyas', label: 'Instagram', icon: (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z"/></svg>
            )},
            { href: 'https://www.facebook.com/runajoyas', label: 'Facebook', icon: (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07C2 17.1 5.66 21.28 10.44 22v-6.99H7.9v-2.94h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.86h2.78l-.44 2.94h-2.34V22C18.34 21.28 22 17.1 22 12.07z"/></svg>
            )},
            { href: 'https://www.tiktok.com/@runajoyas', label: 'TikTok', icon: (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M13.5 3c.57 2.07 1.99 3.63 4.5 3.83V10c-1.7-.03-3.15-.56-4.5-1.48v4.9a5.92 5.92 0 1 1-5.92-5.92c.5 0 .99.07 1.45.22v3.05a2.98 2.98 0 1 0 2.97 2.97V3h1.5z"/></svg>
            )},
            { href: 'https://www.linkedin.com/', label: 'LinkedIn', icon: (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5 2.5 2.5 0 0 1 4.98 3.5zM3 9h4v12H3zM14.5 9A4.5 4.5 0 0 1 19 13.5V21h-4v-6a2 2 0 1 0-4 0v6H7V9h4v1.8A4.5 4.5 0 0 1 14.5 9z"/></svg>
            )},
            { href: 'https://github.com/', label: 'GitHub', icon: (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.21.68-.47 0-.23-.01-.99-.02-1.79-2.78.61-3.37-1.19-3.37-1.19-.45-1.17-1.1-1.49-1.1-1.49-.9-.62.07-.61.07-.61 1 .07 1.52 1.04 1.52 1.04.89 1.52 2.33 1.08 2.9.82.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.29.1-2.68 0 0 .84-.27 2.75 1.02A9.53 9.53 0 0 1 12 6.8c.85 0 1.7.11 2.5.33 1.9-1.29 2.74-1.02 2.74-1.02.56 1.39.21 2.42.1 2.68.64.7 1.03 1.59 1.03 2.68 0 3.85-2.35 4.7-4.59 4.95.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .26.18.57.69.47A10 10 0 0 0 12 2z"/></svg>
            )},
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-gray-600/80 transition-all no-underline hover:text-gray-900 hover:-translate-y-0.5"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </section>

      {/* INTRO / NEWSLETTER COPY */}
      <section className="w-full">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-4">
          <div>
            <h3 className="text-gray-900 text-lg font-semibold">Consulta por tu Joya Favorita</h3>
            <p className="text-gray-600 text-sm mt-1">
              Consulta sobre tus despachos, nos aseguramos de que tu pedido llegue a tus manos.
            </p>
          </div>

          <p className="text-gray-500 text-xs md:col-span-2">
            Síguenos en redes sociales y no te pierdas nuestras promociones y concursos.{' '}
            <a href="#" className="no-underline text-gray-700 hover:text-gray-900">Ir a redes</a>.
          </p>
        </div>
      </section>

      {/* CUERPO PRINCIPAL */}
      <section>
        <div className="max-w-6xl mx-auto text-center md:text-left mt-8 px-4">
          <div className="mt-2 md:mt-3 grid gap-8 md:gap-6 md:grid-cols-12">
            {/* SOBRE NOSOTROS */}
            <div className="md:col-span-5 lg:col-span-5 xl:col-span-4">
              <h6 className="text-gray-900 uppercase tracking-wide text-sm font-semibold mb-4 flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-700" fill="currentColor" aria-hidden="true"><path d="M12 2l2.39 4.84L20 8l-4 3.9L17 18l-5-2.64L7 18l1-6.1L4 8l5.61-1.16L12 2z"/></svg>
                Runa Joyas
              </h6>
              <p className="text-gray-600 leading-relaxed text-sm">
                Desde 1998, Runa Joyas crea piezas artesanales que celebran la cultura andina. Calidad, sostenibilidad y diseño auténtico para joyas que cuentan historias y conectan generaciones.
              </p>
            </div>

            {/* PRODUCTOS (oculto en móviles y tablets) */}
            <div className="hidden lg:block md:col-span-3 lg:col-span-3 xl:col-span-2">
              <h6 className="text-gray-900 uppercase tracking-wide text-sm font-semibold mb-4">Productos</h6>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Joyas</li>
                <li>Collares</li>
                <li>Pulseras</li>
                <li>Aros</li>
                <li>Accesorios</li>
              </ul>
            </div>

            {/* ENLACES (oculto en móviles y tablets) */}
            <div className="hidden lg:block md:col-span-3 lg:col-span-3 xl:col-span-2">
              <h6 className="text-gray-900 uppercase tracking-wide text-sm font-semibold mb-4">Enlaces</h6>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Categorías</li>
                <li>Más vendidos</li>
                <li>Ofertas</li>
              </ul>
            </div>

            {/* CONTACTO */}
            <div className="md:col-span-4 lg:col-span-4 xl:col-span-4">
              <h6 className="text-gray-900 tracking-wide uppercase text-sm font-bold mb-3 md:mb-4">Contacto</h6>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                <li className="flex items-start gap-2"><svg className="h-4 w-4 mt-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l7 6v12H5V8l7-6zm0 2.5L7 9h10L12 4.5z"/></svg>Valdivia Chile</li>
                <li className="flex items-start gap-2"><svg className="h-4 w-4 mt-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4a2 2 0 0 0-2 2v1l10 6 10-6V6a2 2 0 0 0-2-2zm0 6l-8 4-8-4v8h16v-8z"/></svg> runajoyaschile@gmail.com</li>
                <li className="flex items-start gap-2"><svg className="h-4 w-4 mt-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.53 15.53 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.05-.24c1.15.38 2.39.59 3.54.59a1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1A17.5 17.5 0 0 1 2.5 6a1 1 0 0 1 1-1H7a1 1 0 0 1 1 1c0 1.15.2 2.39.59 3.54a1 1 0 0 1-.24 1.05l-2.2 2.2z"/></svg>
                  <a href="tel:+56968343380" className="no-underline text-gray-600 hover:text-gray-900">+56 9 6834 3380</a></li>
                <li className="flex items-start gap-2"><svg className="h-4 w-4 mt-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h12a2 2 0 0 1 2 2v4H4V4a2 2 0 0 1 2-2zm14 8H4v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10zM8 14h8v2H8v-2z"/></svg> Lun–Sáb 10:00–19:00</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS / CONFIANZA */}
      <section className="w-full mt-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="flex items-center justify-center gap-3">
              <svg className="h-5 w-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6h18v2H3V6zm2 4h14l-1.5 8h-11L5 10zm4 9h6v2H9v-2z"/></svg>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900 m-0">Despacho a todo Chile</p>
                <p className="text-xs text-gray-600 m-0">Envíos seguros y confiables</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-2">
              <img src="/Correos_Chile_2008.webp" alt="Correos de Chile" className="h-6 w-auto opacity-90 transition-transform hover:scale-105" loading="lazy" />
              <img src="/Starken.png" alt="Starken" className="h-8 w-auto opacity-95 transition-transform hover:scale-110" loading="lazy" />
              <img src="/chilexpress.png.webp" alt="Chilexpress" className="h-6 w-auto opacity-90 transition-transform hover:scale-105" loading="lazy" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <svg className="h-5 w-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a5 5 0 0 1 5 5v3h-2V7a3 3 0 1 0-6 0v3H7V7a5 5 0 0 1 5-5zm-7 9h14v11H5V11zm7 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/></svg>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900 m-0">Compra Segura</p>
              <p className="text-xs text-gray-600 m-0">Pagos cifrados</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-gray-600 text-xs">Pagos con</span>
                <img src="/mercadopago.png" alt="Mercado Pago" className="h-6 w-auto opacity-95" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <svg className="h-5 w-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm-3 11h6v2H9v-2zm0-4h6v2H9V9z"/></svg>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900 m-0">Múltiples métodos de pago</p>
              <p className="text-xs text-gray-600 m-0">Crédito, débito y transferencias</p>
              <div className="flex items-center gap-2 mt-2">
                <img src="/medios.png" alt="Medios de pago" className="h-6 w-auto opacity-95" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-200 mt-8">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <span className="text-gray-600 text-sm">© {year} — Desarrollado por <a href="https://nativecode.cl/" target="_blank" rel="noopener noreferrer" title="NativeCode.cl" className="text-gray-900 font-semibold hover:underline">NativeCode.cl</a></span>
          <div className="flex items-center gap-4">
            {[
              { href: 'https://www.instagram.com/runajoyas', label: 'Instagram' },
              { href: 'https://www.facebook.com/runajoyas', label: 'Facebook' },
              { href: 'https://www.tiktok.com/@runajoyas', label: 'TikTok' },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="text-gray-600/80 transition-all no-underline hover:text-gray-900 hover:-translate-y-0.5">
                <span className="inline-block h-4 w-4 rounded-full border border-gray-500" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}