import React from 'react'
import { Linkedin, Github } from 'lucide-react';

function Footer() {
  return (
    <footer className="relative bg-black px-6 py-20">
      <div className="mx-auto max-w-6xl flex flex-col gap-12">

        <div className="h-px w-full bg-white/10" />

        <div className="flex flex-col md:flex-row justify-between gap-12">

          <div className="flex flex-col gap-2">
            <span className="text-white/80 font-light text-lg">
              Cassino
            </span>
            <span className="text-white/50 text-sm">
              Um espaço feito por amigos.
            </span>
          </div>

          <div className="flex gap-8 text-sm text-white/50">
            <a href="#inicio" className="hover:text-white/80 transition">
              Início
            </a>
            <a href="#vicios" className="hover:text-white/80 transition">
              Vícios
            </a>
            <a href="#faq" className="hover:text-white/80 transition">
              Perguntas
            </a>
          </div>
        </div>

        <div className="flex justify-center pt-10 text-white/40 gap-3">
          <span className="text-sm font-light tracking-wide">
            Desenvolvido com ❤️ por Heverton Victor
          </span>

          <a
            href="https://www.linkedin.com/in/heverton-victor/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={18} strokeWidth={1}/>
          </a>

          <a
            href="https://github.com/wataredev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={18} strokeWidth={1}/>
          </a>
          
        </div>

      </div>
    </footer>
  )
}

export default Footer