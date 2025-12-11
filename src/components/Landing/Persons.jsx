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
    <section className="relative w-full py-32 grid grid-cols-1 md:grid-cols-2 gap-20">

      {/* ESQUERDA */}
      <div className="sticky top-32 h-fit">
        <h2 className="text-6xl md:text-7xl font-bold leading-none">
          Frequently <br /> asked questions
        </h2>

        <p className="mt-6 text-gray-500 max-w-sm">
          Find answers...
        </p>

        <button className="mt-8 px-6 py-3 border border-black rounded-full">
          Contact
        </button>
      </div>

      {/* DIREITA - precisa ser alta */}
      <div className="space-y-32 pb-[40vh]">
        <div>
          <h3 className="text-2xl font-semibold">Como funciona?</h3>
          <p className="mt-2 text-gray-600">...</p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">Quem são os membros?</h3>
          <p className="mt-2 text-gray-600">...</p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">De onde veio o nome?</h3>
          <p className="mt-2 text-gray-600">...</p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">O que tem no site?</h3>
          <p className="mt-2 text-gray-600">...</p>
        </div>
      </div>

    </section>
  );
}

export default Persons;
