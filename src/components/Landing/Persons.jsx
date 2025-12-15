import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Persons() {

  // const sectionRef = useRef(null);
  // const leftRef = useRef(null);

  // useGSAP(() => {
  //   const section = sectionRef.current;
  //   const left = leftRef.current;

  //   gsap.from(left, {
  //     y: 150,
  //     opacity: 0,
  //     duration: 1.2,
  //     ease: "power3.out",
  //     scrollTrigger: {
  //       trigger: section,
  //       start: "top bottom",
  //       end: "top top",
  //       scrub: true,
  //     }
  //   });
  // }, { scope: sectionRef });

  return (
    <section className="relative w-full py-32 grid grid-cols-1 md:grid-cols-2 gap-20 container border-bottom-default">

      {/* ESQUERDA */}
      <div className="sticky top-32 h-fit">
        <h2 className="text-6xl md:text-7xl font-bold leading-none">
          Perguntas <br /> frequentes
        </h2>

        <p className="mt-6 text-(--color-subtext) max-w-sm">
          As dúvidas que todo mundo tem, mas finge que não.  
          Aqui a gente responde sem enrolação (ou quase).
        </p>

        <button className="mt-8 px-6 py-3 border border-black rounded-full">
          Falar com a gente
        </button>
      </div>


      {/* DIREITA - precisa ser alta */}
      <div className="space-y-32">
        <div>
          <h3 className="text-2xl font-semibold">Como funciona?</h3>
          <p className="mt-2 text-(--color-subtext)">
            Funciona na base da amizade, do caos organizado e de boas ideias
            que surgem do nada. Cada um contribui do seu jeito. seja criando,
            zoando ou só aparecendo.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">Quem são os membros?</h3>
          <p className="mt-2 text-(--color-subtext)">
            Um grupo de amigos com personalidades bem diferentes, mas com algo
            em comum: ninguém aqui leva a vida tão a sério (exceto quando precisa).
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">De onde veio o nome?</h3>
          <p className="mt-2 text-(--color-subtext)">
            O nome surgiu em uma conversa aleatória, como quase tudo por aqui.
            Pode não fazer sentido à primeira vista, mas depois de um tempo
            passa a fazer todo.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">O que tem no site?</h3>
          <p className="mt-2 text-(--color-subtext)">
            Histórias, ideias, projetos, lembranças e aquele conteúdo que só
            faz sentido pra quem faz parte. Basicamente: nosso cantinho na
            internet.
          </p>
        </div>
      </div>


    </section>
  );
}

export default Persons;
