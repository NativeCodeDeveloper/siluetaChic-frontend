'use client'
import {useState, useEffect} from 'react';

export default function Hombre(){
    return (
        <div>
            <div className='bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 h-50 flex justify-center items-center gap-2 flex-col'>
                <h1 className='text-white text-5xl font-bold'>HOMBRE</h1>
                <p className="text-white tracking-wide font-bold text-2xl">Descubre nuestros tratamientos de depilación láser con tecnología Triláser</p>
            </div>
        </div>
    )
}