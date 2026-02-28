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
      title: "Galeria de Fotos",
      url: "galeria",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Roleta dos Membros",
      url: "roleta",
      icon: Bot,
      isActive: true,
    },
    {
      title: "Lista de Filmes",
      url: "filmes",
      icon: SquareTerminal,
      isActive: true,
    },
  ],

  navSecondary: [
    {
      title: "Me ajuda Watare",
      url: "#",
      icon: LifeBuoy,
    },
  ],
  
  projects: [
    {
      name: "SEILA1",
      url: "#",
      icon: Frame,
    },
    {
      name: "SEILA2",
      url: "#",
      icon: PieChart,
    },
    {
      name: "SEILA3",
      url: "#",
      icon: Map,
    },
  ],

}