import fotoHabbibs from "../assets/images_hero/foto-habbibs2.webp";
import fotoFestaJuninaPaulo from "../assets/images_hero/festa-junina-paulo.webp";
import fotoAniversarioGael from "../assets/images_hero/foto-aniversario-gael1_1.webp";
import fotoGatoJamal from "../assets/images_hero/gato-jamal.webp"
import fotoHalloween from "../assets/images_hero/hallowen.webp"

import aramVicio from "../assets/images_vices/aram-lol.webp"
import discordVicio from "../assets/images_vices/discord.webp"
import praiaVicio from "../assets/images_vices/mochila-e-afins.webp"
import rpgVicio from "../assets/images_vices/rpg.webp"
import progamacaoVicio from "../assets/images_vices/progamacao.webp"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"


export const itemsHeader = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company" },
        { label: "Careers", ariaLabel: "About Careers" }
      ]
    },
    {
      label: "Projects", 
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects" },
        { label: "Case Studies", ariaLabel: "Project Case Studies" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#271E37", 
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us" },
        { label: "Twitter", ariaLabel: "Twitter" },
        { label: "LinkedIn", ariaLabel: "LinkedIn" }
      ]
    }
];

export const imagesMemorieHero = [
  {
    label: "Imagem com os amigos No Habbibs!",
    src: fotoHabbibs,
    className: "top-10 left-10 w-85 opacity-50 rotate-[-5deg]"
  },
  {
    label: "Imagem com os amigos na festa junina de Paulin!",
    src: fotoFestaJuninaPaulo,
    className: "top-1/2 left-0 w-75 opacity-50 rotate-[10deg]"
  },
  {
    label: "Imagem com os amigos no aniversário de gael!",
    src: fotoAniversarioGael,
    className: "bottom-10 right-20 w-75 opacity-50 rotate-[-3deg]"
  },
  {
    label: "Imagem com os amigos no halloween!",
    src: fotoHalloween,
    className: "top-15 right-20 w-80 opacity-50 rotate-[10deg]"
  },
  {
    label: "Foto do gato mais lindo do mundo, Jamal!",
    src: fotoGatoJamal,
    className: "top-100 right-75 w-70 opacity-50 rotate-[-15deg]"
  },
]

export const imagesVices = [
  {
    label: "Imagem do modo ARAM do jogo League of Legends.",
    src: aramVicio,
    className: ""
  },
  {
    label: "Imagem do aplicativo Discord.",
    src: discordVicio,
    className: ""
  },
  {
    label: "Imagem de uma praia com objetos a frente.",
    src: praiaVicio,
    className: ""
  },
  {
    label: "Imagem de uma mesa de RPG.",
    src: rpgVicio,
    className: ""
  },
  {
    label: "Imagem de uma tela com o fundo relacionado a progamação.",
    src: progamacaoVicio,
    className: ""
  }
]

export const sideBarContent = {

  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],

  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],

}