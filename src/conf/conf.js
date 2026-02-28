const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID), 
    bucketFotos: String(import.meta.env.VITE_APPWRITE_BUCKET_FOTOS),
    database: String(import.meta.env.VITE_APPWRITE_DATABASE),
    tableUsuario: String(import.meta.env.VITE_APPWRITE_TABLE_USUARIO),
    cloudinaryFunctionId: String(import.meta.env.VITE_CLOUDINARY_FUNCTION_ID),
    imagesCollectionId: String(import.meta.env.VITE_IMAGES_COLLECTION_ID),
    movieApi: String(import.meta.env.VITE_TMDB_API),
    movieCollectionId: String(import.meta.env.VITE_MOVIE_COLLECTION_ID)
}

export default conf