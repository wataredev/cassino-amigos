import { useState, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import service from "../../appwrite/config";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDoc } from '../../store/authSlice'

export default function ProfileAvatar({ userDoc }) {
  const inputFileRef = useRef(null);
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.auth);

  const isOwner = userData?.$id === userDoc?.accountId;

  const [preview, setPreview] = useState(userDoc?.foto_url);
  const [loading, setLoading] = useState(false);

  const handleSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    enviarFoto(file);
  };

  async function enviarFoto(file) {

    try {
      setLoading(true);

      const uploaded = await service.uploadFotoPerfil(file);
      const foto_id = uploaded.$id;
      const foto_url = service.getFotoPerfil(foto_id);

      const updatedDoc = await service.updateFotoPerfil(
        userDoc.$id,
        foto_id,
        foto_url
      );

      dispatch(updateUserDoc(updatedDoc));
      toast.success("Foto atualizada com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar a foto.");
    } finally {
      setLoading(false);
    }
  }

  const handleClickEdit = () => inputFileRef.current.click();

  const fallback = userDoc?.nome_display?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="relative flex items-center justify-center">
      <Avatar className="w-32 h-32">
        <AvatarImage src={preview} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>

      {isOwner && (
        <button
          onClick={handleClickEdit}
          disabled={loading}
          className="absolute bottom-1 right-1 bg-black/60 hover:bg-black/80 text-white p-1 rounded-full"
        >
          <Pencil size={18} />
        </button>
      )}

      {/* input escondido */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputFileRef}
        onChange={handleSelect}
      />
    </div>
  );
}
