import service from "../appwrite/config"
import { useEffect, useState } from "react"

import DomeGallery from "../components/Landing/DomeGallery/DomeGallery"
import UploadImageDialog from "../components/UploadImageDialog"

function Gallery() {
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  async function loadImages() {
    try {
      const docs = await service.getAllImages(50, 0)

      setImages(
        docs.map((imagem) => ({
          id: imagem.$id,
          src: imagem.cloudinaryUrl,
          publicId: imagem.publicId,
          owner: imagem.userId,
          createdAt: imagem.uploadedAt,
          width: imagem.width,
          height: imagem.height,
        }))
      )
    } catch (err) {
      console.error("Erro ao carregar galeria", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadImages()
  }, [])

  async function handleUpload(files, metadata) {
    try {
      setUploading(true)

      const uploads = Array.from(files).map((file) =>
        service.uploadImageCloudinary(file, metadata)
      )

      const results = await Promise.all(uploads)

      const successUploads = results.filter((r) => r.success)

      if (successUploads.length > 0) {
        await loadImages()
      }
    } catch (error) {
      console.error("Erro no upload:", error)
    } finally {
      setUploading(false)
    }
  }

  if (loading) return <p>Carregando galeria...</p>

  return (
    <div className="p-6 space-y-6">
      <UploadImageDialog
        onUpload={handleUpload}
        uploading={uploading}
      />

      <div style={{ width: "100vw", height: "100vh" }}>
        <DomeGallery images={images} />
      </div>
    </div>
  )
}

export default Gallery
