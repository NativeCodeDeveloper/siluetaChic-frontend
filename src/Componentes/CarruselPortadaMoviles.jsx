

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * CarruselPortadaMoviles
 * - Optimizado para móviles
 * - Acepta array de strings (urls)
 * - Imágenes siempre completas (sin cortes) usando object-contain
 * - Soporta swipe (touch)
 * - Botón opcional (texto + handler)
 */
export default function CarruselPortadaMoviles({
  images = [],
  autoPlay = true,
  intervalMs = 4500,
  buttonText = "",
  onButtonClick = undefined,
  className = "",
}) {
  const list = useMemo(() => (Array.isArray(images) ? images.filter(Boolean) : []), [images]);
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  // Touch handling
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const hasItems = list.length > 0;

  const goTo = (i) => {
    if (!hasItems) return;
    const next = (i + list.length) % list.length;
    setIndex(next);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // Autoplay (pausa si hay 0/1 imagen)
  useEffect(() => {
    if (!autoPlay || list.length <= 1) return;

    // clear
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setIndex((curr) => (curr + 1) % list.length);
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [autoPlay, intervalMs, list.length]);

  // Mantener index válido si cambia el array
  useEffect(() => {
    if (index >= list.length) setIndex(0);
  }, [list.length, index]);

  const onTouchStart = (e) => {
    if (!hasItems) return;
    touchStartX.current = e.touches?.[0]?.clientX ?? 0;
    touchDeltaX.current = 0;
  };

  const onTouchMove = (e) => {
    if (!hasItems) return;
    const x = e.touches?.[0]?.clientX ?? 0;
    touchDeltaX.current = x - touchStartX.current;
  };

  const onTouchEnd = () => {
    if (!hasItems) return;

    // Umbral para swipe
    const threshold = 50;
    const dx = touchDeltaX.current;

    if (dx > threshold) prev();
    if (dx < -threshold) next();

    touchStartX.current = 0;
    touchDeltaX.current = 0;
  };

  return (
    <section className={`w-full ${className}`}>
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-slate-900/40 ring-1 ring-white/10"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/*
          Contenedor con ratio móvil. Ajusta el ratio si tu portada es distinta.
          - 1808x669 ~ 2.70:1
          - Aquí usamos un ratio más común en mobile para que no quede aplastado.
          Si quieres EXACTO 1808x669 en mobile, cambia a aspect-[1808/669].
        */}
        <div className="relative w-full aspect-[16/10] sm:hidden">
          {hasItems ? (
            <div
              className="flex h-full w-full transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {list.map((src, i) => (
                <div key={`${src}-${i}`} className="h-full w-full shrink-0">
                  <img
                    src={src}
                    alt={`portada-${i + 1}`}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="h-full w-full object-contain object-center"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-white/70 text-sm">
              No hay imágenes para mostrar
            </div>
          )}

          {/* CTA Button (centrado en mobile) */}
          {buttonText && (
            <button
              type="button"
              onClick={onButtonClick}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/95 text-slate-900 px-5 py-3 text-sm font-semibold shadow-lg shadow-black/20 ring-1 ring-black/10 backdrop-blur transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              {buttonText}
            </button>
          )}

          {/* Dots */}
          {list.length > 1 && (
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 pb-14">
              {list.map((_, i) => (
                <button
                  key={`dot-${i}`}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Ir a imagen ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-white" : "w-2 bg-white/40"}`}
                />
              ))}
            </div>
          )}

          {/* Flechas (opcionales, solo si quieres usarlas; quedan discretas) */}
          {list.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Anterior"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 px-3 py-2 text-white/90 ring-1 ring-white/10 backdrop-blur active:scale-95"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Siguiente"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 px-3 py-2 text-white/90 ring-1 ring-white/10 backdrop-blur active:scale-95"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/*
          Si lo renderizas en pantallas mayores, puedes ocultarlo (default)
          o reutilizar tu otro carrusel de desktop.
        */}
        <div className="hidden sm:flex items-center justify-center p-6 text-white/70 text-sm">
          Este carrusel está optimizado para móviles (sm:hidden).
        </div>
      </div>
    </section>
  );
}