import { useEffect, useState } from "react"
import {
  Upload,
  ImagePlus,
  Calendar,
  Users,
  MapPin,
  Tag,
  Check,
} from "lucide-react"

import { useForm, Controller } from "react-hook-form"
import service from "../appwrite/config"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"

export default function UploadImageDialog({ onUpload, uploading }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      people: [],
    },
  })

  const [users, setUsers] = useState([])
  const [open, setOpen] = useState(false)

  const files = watch("files")

  useEffect(() => {
    service.getAllUsers().then(setUsers)
  }, [])

  function onSubmit(data) {
    if (!data.files?.length) return

    const metadata = {
      photoDate: data.photoDate || null,
      people: data.people,
      location: data.location || "",
      tags: data.tags
        ?.split(",")
        .map(t => t.trim())
        .filter(Boolean),
      description: data.description || "",
    }

    onUpload(data.files, metadata)
    reset()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <ImagePlus size={18} />
          Adicionar imagens
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[520px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Salvar novas imagens</DialogTitle>
            <DialogDescription>
              Envie fotos e organize sua galeria com detalhes.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <Label>Imagens</Label>

            <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/40 p-8 text-center transition hover:border-primary">
              <Upload className="mb-3 h-10 w-10 text-muted-foreground" />

              <p className="text-sm font-medium">
                Clique para selecionar ou arraste as imagens
              </p>

              <p className="text-xs text-muted-foreground">
                PNG, JPG ou WEBP
              </p>

              <Input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                {...register("files", {
                  required: "Selecione pelo menos uma imagem",
                })}
              />
            </label>

            {files?.length > 0 && (
              <p className="mt-2 text-xs text-muted-foreground">
                {files.length} arquivo(s) selecionado(s)
              </p>
            )}

            {errors.files && (
              <p className="mt-1 text-xs text-red-500">
                {errors.files.message}
              </p>
            )}
          </div>

          <div className="mt-6 grid gap-4">
            <div className="grid gap-2">
              <Label className="flex items-center gap-2">
                <Calendar size={16} /> Data da foto
              </Label>
              <Input type="date" {...register("photoDate")} />
            </div>

            <Controller
              name="people"
              control={control}
              render={({ field }) => (
                <div className="grid gap-2">
                  <Label className="flex items-center gap-2">
                    <Users size={16} /> Quem está na foto
                  </Label>

                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-between"
                      >
                        {field.value.length
                          ? `${field.value.length} pessoa(s) selecionada(s)`
                          : "Selecionar pessoas"}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-[300px] p-0 bg-popover text-popover-foreground shadow-md border">
                      <Command>
                        <CommandInput placeholder="Buscar pessoa..." />
                        <CommandEmpty>
                          Nenhum usuário encontrado
                        </CommandEmpty>

                        <CommandGroup>
                          {users.map(user => {
                            const selected = field.value.includes(user.$id)

                            return (
                              <CommandItem
                                key={user.$id}
                                onSelect={() => {
                                  field.onChange(
                                    selected
                                      ? field.value.filter(
                                          id => id !== user.$id
                                        )
                                      : [...field.value, user.$id]
                                  )
                                }}
                              >
                                <div className="flex items-center gap-3">
                                  <img
                                    src={user.foto_url}
                                    alt={user.nome_display}
                                    className="h-6 w-6 rounded-full object-cover"
                                  />
                                  <span>{user.nome_display}</span>
                                </div>

                                {selected && (
                                  <Check className="ml-auto h-4 w-4" />
                                )}
                              </CommandItem>
                            )
                          })}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            />

            <div className="grid gap-2">
              <Label className="flex items-center gap-2">
                <MapPin size={16} /> Local
              </Label>
              <Input
                placeholder="Recife - PE"
                {...register("location")}
              />
            </div>

            <div className="grid gap-2">
              <Label className="flex items-center gap-2">
                <Tag size={16} /> Tags
              </Label>
              <Input
                placeholder="evento, trabalho, família"
                {...register("tags")}
              />
            </div>

            <div className="grid gap-2">
              <Label>Descrição</Label>
              <Textarea
                placeholder="Detalhes da foto"
                {...register("description")}
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit" disabled={uploading}>
              {uploading ? "Enviando..." : "Salvar imagens"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
