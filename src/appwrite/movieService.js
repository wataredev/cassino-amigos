import conf from "../conf/conf.js"
import { Client, Databases, ID, Query, Permission, Role } from "appwrite"

export class MovieService {
    client = new Client()
    databases

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client)
    }

    async addMovie({ tmdbId, title, poster, bgMovie, userId }) {
        return await this.databases.createDocument(
            conf.database,
            conf.movieCollectionId,
            ID.unique(),
            {
                tmdbId,
                title,
                poster,
                bgMovie,
                assistido: false,
                userId,
            },
            [
                Permission.read(Role.users()),
                Permission.update(Role.users()),
                Permission.delete(Role.users()),
            ]
        )
    }

    async getMovies() {
        return await this.databases.listDocuments(
            conf.database,
            conf.movieCollectionId,
            [Query.orderDesc("$createdAt")]
        )
    }

    async toggleAssistido(movie) {
        return await this.databases.updateDocument(
            conf.database,
            conf.movieCollectionId,
            movie.$id,
            {
                assistido: !movie.assistido
            }
        )
    }

    async deleteMovie(movieId) {
        return await this.databases.deleteDocument(
            conf.database,
            conf.movieCollectionId,
            movieId
        )
    }
}

const movieService = new MovieService()
export default movieService