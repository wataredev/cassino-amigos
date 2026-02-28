import conf from "../conf/conf.js"
import { Client, Databases, ID, Query } from "appwrite"

export class MovieService {

    client = new Client()
    databases

    constructor() {

        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client)

    }

    async addMovie({ tmdbId, title, poster, userId, userName }) {

        try {

            return await this.databases.createDocument(
                conf.database,
                conf.movieCollectionId,
                ID.unique(),
                {
                    tmdbId,
                    title,
                    poster,
                    assistido: false,
                    userId,
                    userName
                }
            )

        } catch (error) {

            console.log("MovieService addMovie error", error)

        }

    }

    async getMovies() {

        try {

            return await this.databases.listDocuments(
                conf.database,
                conf.movieCollectionId,
                [
                    Query.orderDesc("$createdAt")
                ]
            )

        } catch (error) {

            console.log("MovieService getMovies error", error)

        }

    }

    async toggleAssistido(movie) {

        try {

            return await this.databases.updateDocument(
                conf.database,
                conf.movieCollectionId,
                movie.$id,
                {
                    assistido: !movie.assistido
                }
            )

        } catch (error) {

            console.log("MovieService toggle error", error)

        }

    }

    async deleteMovie(movieId) {

        try {

            return await this.databases.deleteDocument(
                conf.database,
                conf.movieCollectionId,
                movieId
            )

        } catch (error) {

            console.log("MovieService delete error", error)

        }

    }

}

const movieService = new MovieService()

export default movieService