import {
  BadgeCheck,
  ChevronsUpDown,
  LogOut,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { useSelector, useDispatch } from "react-redux"
import { logout } from "../store/authSlice"
import authService from "../appwrite/auth"
import { useNavigate } from "react-router-dom"
import { useState, useRef } from "react"
import { toast } from "sonner";
import { updateUserDoc } from "../store/authSlice"
import service from "../appwrite/config"

export function NavUser({ user }) {
  const { isMobile } = useSidebar()

  const inputFileRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const authStatus = useSelector((state) => state.auth.status)

  const [preview, setPreview] = useState(user?.foto_url)
  const [loading, setLoading] = useState(false)

  const handleSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setPreview(URL.createObjectURL(file))
    enviarFoto(file)
  }

  async function enviarFoto(file) {
    try {
      setLoading(true)

      const uploaded = await service.uploadFotoPerfil(file)
      const foto_id = uploaded.$id
      const foto_url = service.getFotoPerfil(foto_id)

      const updatedDoc = await service.updateFotoPerfil(
        user.$id,
        foto_id,
        foto_url
      )

      dispatch(updateUserDoc(updatedDoc))
      toast.success("Foto atualizada com sucesso!")
    } catch (err) {
      console.error(err)
      toast.error("Erro ao enviar a foto.")
    } finally {
      setLoading(false)
    }
  }

  const handleClickEdit = () => {
    inputFileRef.current.click()
  }

  const handleLogout = () => {
    if (authStatus) {
      authService.logout().then(() => {
        dispatch(logout())
        navigate("/")
      })
    } else {
      navigate("/")
    }
  }

  return (
    <>
      {/* INPUT INVISÍVEL (OBRIGATÓRIO) */}
      <input
        type="file"
        ref={inputFileRef}
        hidden
        accept="image/*"
        onChange={handleSelect}
      />

      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={preview || user.foto_url}
                    alt={user.nome_display}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user.nome_display}
                  </span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>

                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={preview || user.foto_url}
                      alt={user.nome_display}
                    />
                    <AvatarFallback className="rounded-lg">
                      CN
                    </AvatarFallback>
                  </Avatar>

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {user.nome_display}
                    </span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleClickEdit}>
                  <BadgeCheck />
                  Mudar Foto
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleLogout}>
                <LogOut />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  )
}
