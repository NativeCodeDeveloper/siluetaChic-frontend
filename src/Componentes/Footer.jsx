"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import StatsCount from "@/components/ui/statscount";

import { Michroma } from "next/font/google";

const michroma = Michroma({
    weight: "400",
    subsets: ["latin"],
});

function Icon({ name, className = "w-6 h-6 text-gray-700" }) {

  const icons = {
    instagram: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5-2.25a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </svg>
    ),
    facebook: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M13.5 22v-8h2.5l.5-3h-3V8.5c0-.87.24-1.46 1.5-1.46H17V4.2C16.65 4.14 15.73 4 14.67 4 12.47 4 11 5.24 11 8v3H8.5v3H11v8h2.5z"/>
      </svg>
    ),
    tiktok: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M21 8.5a7 7 0 0 1-4-1.3V15a5.5 5.5 0 1 1-5.5-5.5c.17 0 .34 0 .5.03V12a3 3 0 1 0 3 3V2h3a7 7 0 0 0 2 5.5z"/>
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M6.94 8.94H3.88V20h3.06V8.94zM5.41 3.5a1.77 1.77 0 1 0 0 3.54 1.77 1.77 0 0 0 0-3.54zM20.12 20h-3.06v-5.8c0-1.38-.03-3.15-1.92-3.15-1.92 0-2.22 1.5-2.22 3.05V20H9.86V8.94h2.94v1.5h.04c.41-.78 1.43-1.6 2.95-1.6 3.16 0 3.74 2.08 3.74 4.77V20z"/>
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path fillRule="evenodd" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48 0-.24-.01-.88-.01-1.72-2.78.6-3.37-1.19-3.37-1.19-.46-1.16-1.12-1.47-1.12-1.47-.92-.63.07-.61.07-.61 1.02.07 1.56 1.05 1.56 1.05.9 1.54 2.37 1.09 2.95.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 7.51c.85 0 1.7.11 2.5.32 1.9-1.29 2.74-1.02 2.74-1.02.56 1.37.21 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.69.92.69 1.86 0 1.34-.01 2.42-.01 2.75 0 .26.18.58.69.48A10 10 0 0 0 12 2z" clipRule="evenodd"/>
      </svg>
    ),
    home: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}><path d="M12 3l9 8h-3v10H6V11H3l9-8z"/></svg>
    ),
    envelope: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}><path d="M4 6h16a2 2 0 0 1 2 2v.2l-10 6.25L2 8.2V8a2 2 0 0 1 2-2zm0 4.3l8 5 8-5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7.7z"/></svg>
    ),
    phone: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1.5 1.5 0 0 1 1.6-.36c1.74.58 3.63.9 5 .9a1.5 1.5 0 0 1 1.5 1.5V21a1.5 1.5 0 0 1-1.5 1.5C12.08 22.5 1.5 11.92 1.5 1.5A1.5 1.5 0 0 1 3 0h3.7A1.5 1.5 0 0 1 8.2 1.5c0 1.36.32 3.26.9 5a1.5 1.5 0 0 1-.37 1.6L6.6 10.8z"/></svg>
    ),
    clock: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}><path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm1 10.41l3.3 1.9-.75 1.3L11 13V7h2v5.41z"/></svg>
    ),
    truck: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}><path d="M3 4h11v8h2l3 3v3h-2a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H3V4zm13 8V6h2l3 4v2h-5z"/></svg>
    ),
    lock: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}><path d="M12 1a5 5 0 0 0-5 5v3H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-2V6a5 5 0 0 0-5-5zm-3 8V6a3 3 0 0 1 6 0v3H9z"/></svg>
    ),
    credit: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}><path d="M3 5h18a2 2 0 0 1 2 2v2H1V7a2 2 0 0 1 2-2zm-2 6h22v6a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-6z"/></svg>
    ),
  };
  return icons[name] || null;
}

export default function Footer() {
  // Estadísticas de Macar Repuestos
  const stats = [
    {
      value: 700,
      suffix: "+",
      label: "Repuestos originales Maxus",
      duration: 5
    },
    {
      value: 1000,
      suffix: "+",
      label: "Clientes satisfechos en Chile",
      duration: 6
    },
    {
      value: 100,
      suffix: "%",
      label: "Garantía en repuestos originales",
      duration: 5.5
    },
  ];

  return (
    <footer id="footer" className="text-gray-700 tracking-[0.01em] mt-20">
      {/* ESTADÍSTICAS DESTACADAS - Oculto en móvil */}

        <br/> <br/> <br/> <br/> <br/>
      <section className="w-full hidden md:block ">
        <div className="max-w-7xl mx-auto">
          <StatsCount
            stats={stats}
            title="ESPECIALISTAS EN REPUESTOS MAXUS ORIGINALES"
            showDividers={true}
            className="py-12 lg:py-16"
          />
        </div>
      </section>
        <br/> <br/> <br/> <br/> <br/>

      {/* BANNER DESTACADO: ENVÍOS A TODO CHILE */}
      <section className="w-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">
            {/* Texto principal */}
            <div className="text-center lg:text-left flex-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 sm:mb-4 flex items-center justify-center lg:justify-start gap-3">
                <Icon name="truck" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white animate-pulse" />
                <span>Envíos a Todo Chile</span>
              </h2>
              <p className="text-blue-100 text-sm sm:text-base lg:text-lg font-medium max-w-2xl">
                Llega rápido y seguro a cualquier región del país con nuestros partners de confianza
              </p>
            </div>

            {/* Logos de empresas de transporte - Grid responsive */}
            <div className="w-full lg:w-auto lg:flex-1">
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 items-center justify-items-center">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-2 sm:p-3 shadow-lg hover:scale-105 transition-transform duration-300 w-full max-w-[80px] sm:max-w-[100px] aspect-square flex items-center justify-center">
                  <Image src="/chilexpress.png" alt="Chilexpress" width={80} height={80} className="w-full h-auto object-contain" />
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-2 sm:p-3 shadow-lg hover:scale-105 transition-transform duration-300 w-full max-w-[80px] sm:max-w-[100px] aspect-square flex items-center justify-center">
                  <Image src="/Correos.webp" alt="Correos de Chile" width={80} height={80} className="w-full h-auto object-contain" />
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-2 sm:p-3 shadow-lg hover:scale-105 transition-transform duration-300 w-full max-w-[80px] sm:max-w-[100px] aspect-square flex items-center justify-center">
                  <Image src="/logoBlueExpress.png" alt="Blue Express" width={80} height={80} className="w-full h-auto object-contain" />
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-2 sm:p-3 shadow-lg hover:scale-105 transition-transform duration-300 w-full max-w-[80px] sm:max-w-[100px] aspect-square flex items-center justify-center">
                  <Image src="/logoCheve.png" alt="Cheve" width={80} height={80} className="w-full h-auto object-contain" />
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-2 sm:p-3 shadow-lg hover:scale-105 transition-transform duration-300 w-full max-w-[80px] sm:max-w-[100px] aspect-square flex items-center justify-center">
                  <Image src="/logoStarken.png" alt="Starken" width={80} height={80} className="w-full h-auto object-contain" />
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-2 sm:p-3 shadow-lg hover:scale-105 transition-transform duration-300 w-full max-w-[80px] sm:max-w-[100px] aspect-square flex items-center justify-center">
                  <Image src="/logoFedex.png" alt="FedEx" width={80} height={80} className="w-full h-auto object-contain" />
                </div>
                <div className="hidden md:block bg-white/95 backdrop-blur-sm rounded-xl p-2 sm:p-3 shadow-lg hover:scale-105 transition-transform duration-300 w-full max-w-[80px] sm:max-w-[100px] aspect-square flex items-center justify-center">
                  <Image src="/logoPullman.png" alt="Pullman" width={80} height={80} className="w-full h-auto object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INFORMACIÓN PRINCIPAL - Simplificado en móvil */}
      <section className="w-full bg-gradient-to-br from-gray-50 to-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">

          {/* VERSIÓN MÓVIL - Minimalista */}
          <div className="block lg:hidden space-y-6">
            {/* Logo y datos básicos */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Macar Repuestos</h3>
              <p className="text-sm text-gray-600 mb-4">Especialistas en repuestos originales Maxus</p>

              {/* Contacto compacto */}
              <div className="space-y-2">
                <a href="tel:+56229419523" className="flex items-center justify-center gap-2 text-sm text-gray-700 hover:text-blue-600">
                  <Icon name="phone" className="w-4 h-4" />
                  <span>+56 2 2941 9523</span>
                </a>
                <a href="mailto:macar.repuestos.automotriz@gmail.com" className="flex items-center justify-center gap-2 text-sm text-gray-700 hover:text-blue-600">
                  <Icon name="envelope" className="w-4 h-4" />
                  <span>macar.repuestos.automotriz@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Enlaces rápidos - compactos */}
            <div className="flex flex-wrap justify-center gap-3 text-xs">
              <Link href="/catalogo" className="text-gray-600 hover:text-blue-600 px-3 py-1.5 rounded-lg bg-white border border-gray-200">Catálogo</Link>
              <Link href="/politicaPrivacidad" className="text-gray-600 hover:text-blue-600 px-3 py-1.5 rounded-lg bg-white border border-gray-200">Privacidad</Link>
              <Link href="/terminosCondiciones" className="text-gray-600 hover:text-blue-600 px-3 py-1.5 rounded-lg bg-white border border-gray-200">Términos</Link>
            </div>
          </div>

          {/* VERSIÓN DESKTOP - Completa */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Columna 1: Info de la empresa */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Macar Repuestos</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Especialistas en repuestos originales Maxus. Calidad garantizada y atención profesional.
              </p>

              <div className="space-y-3">
                <a href="tel:+56995043704" className="flex items-center gap-3 text-sm text-gray-700 hover:text-blue-600 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                    <Icon name="phone" className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium">+56 9 9504 3704</span>
                </a>
                <a href="mailto:macar.repuestos.automotriz@gmail.com" className="flex items-center gap-3 text-sm text-gray-700 hover:text-blue-600 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                    <Icon name="envelope" className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium">macar.repuestos.automotriz@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Columna 2: Información */}
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-4">Información</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <Icon name="clock" className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Horario</p>
                    <p>Lun–Vie 08:30–18:00</p>

                  </div>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <Icon name="truck" className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Despacho</p>
                    <p>A todo Chile</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <Icon name="credit" className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Pagos</p>
                    <p>Mercado Pago seguro</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Columna 3: Enlaces */}
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/catalogo" className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 group-hover:bg-blue-600 transition-colors"></span>
                    Catálogo
                  </Link>
                </li>
                <li>
                  <Link href="/politicaPrivacidad" className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 group-hover:bg-blue-600 transition-colors"></span>
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/terminosCondiciones" className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 group-hover:bg-blue-600 transition-colors"></span>
                    Términos y Condiciones
                  </Link>
                </li>
                <li>
                  <Link href="/cambiosDevoluciones" className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 group-hover:bg-blue-600 transition-colors"></span>
                    Cambios y Devoluciones
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 4: Logo Mercado Pago */}
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-4">Métodos de Pago</h4>
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <Image src="/mercadopago.png" alt="Mercado Pago" width={200} height={60} className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COPYRIGHT - Minimalista en móvil */}
      <div className="border-t-2 border-gray-200 bg-gradient-to-r from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">

          {/* Versión móvil - ultra compacta */}
          <div className="flex flex-col items-center gap-2 text-center lg:hidden">
            <p className={`${michroma.className} text-gray-600 text-xs tracking-wide select-none`}>
              <span className="text-sm">©</span> 2024 Macar Repuestos
            </p>
            <p className="text-xs text-gray-500">
              Desarrollado por{' '}
              <a href="https://nativecode.cl/" target="_blank" rel="noopener noreferrer" className="text-blue-300 font-semibold hover:underline">NativeCode</a>
            </p>
          </div>

          {/* Versión desktop - completa */}
          <div className="hidden lg:flex items-center justify-between">
            <p className={`${michroma.className} text-gray-700 text-sm tracking-wide select-none`}>
              <span className="text-base">©</span> 2024 Macar Repuestos. Todos los derechos reservados. Desarrollado por{' '}
              <a href="https://nativecode.cl/" target="_blank" rel="noopener noreferrer" title="NativeCode" className="text-blue-900 font-semibold hover:text-blue-900 transition-colors">NativeCode</a>
            </p>

            <div className="flex items-center gap-6">
              <a href="/politicaPrivacidad" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">Aviso legal</a>
              <a href="/politicaPrivacidad" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">Política de Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
