const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID), 
    bucketFotoPerfil: String(import.meta.env.VITE_APPWRITE_BUCKET_FOTO_PERFIL),
    database: String(import.meta.env.VITE_APPWRITE_DATABASE),
    tableUsuario: String(import.meta.env.VITE_APPWRITE_TABLE_USUARIO)
}

export default conf