"use client"

import * as React from "react"

import Link from "next/link"
import { ShoppingCart, Phone, Menu, X } from "lucide-react"
import Image from "next/image"

export function ShadcnNavBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-16 flex items-center justify-between">

          {/* Brand */}
          <div className="flex items-center gap-3">
<Image src={'/silueta.png'} alt={'icono'} height={64} width={64} />
            <span className="text-sm font-extrabold text-indigo-400">
              Silueta Chic
            </span>
          </div>

          {/* Links desktop */}
          <nav className="hidden lg:flex items-center gap-8">
              {[  {titulo : 'Inicio' , href : '/'},
                  {titulo : 'Hombre' , href : '/hombre'},
                  {titulo : 'Mujer' , href : '/mujer'},
                  {titulo : 'Servicios' , href : '/servicios'},
                  {titulo : 'Dudas' , href : '/dudas'},
                  {titulo : 'Contacto' , href : '/contacto'}].map((item) => (
              <Link
                key={item.titulo}
                href={item.href}
                className="relative text-sm font-semibold text-purple-500 hover:text-purple-600 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:w-0 after:bg-gradient-to-r after:from-purple-400 after:to-blue-500 hover:after:w-full after:transition-all after:duration-300"
              >
                {item.titulo}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="hidden sm:flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-bold text-gray-900 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition"
            >
              <span className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 text-white flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </span>
              RESERVAR
            </Link>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 bg-white text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition"
              aria-label="Abrir menú"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link
              href="/carrito"
              className="relative w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 text-white flex items-center justify-center hover:from-purple-600 hover:to-blue-700 transition"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 min-w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 text-xs font-bold flex items-center justify-center border-2 border-white">
                0
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile menu (collapsible) */}
        <div
          className={[
            "lg:hidden absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)]",
            mobileOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0",
            "overflow-hidden transition-all duration-300",
          ].join(" ")}
        >
          <div className="px-4 py-6 flex flex-col gap-6">
              {[  {titulo : 'Inicio' , href : '/'},
                  {titulo : 'Hombre' , href : '/hombre'},
                  {titulo : 'Mujer' , href : '/mujer'},
                  {titulo : 'Servicios' , href : '/servicios'},
                  {titulo : 'Dudas' , href : '/dudas'},
                  {titulo : 'Contacto' , href : '/contacto'}].map((item) => (
              <Link
                key={item.titulo}
                href={item.href}
                className="text-lg font-semibold text-purple-500 hover:text-purple-600 transition"
                onClick={() => setMobileOpen(false)}
              >
                {item.titulo}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}