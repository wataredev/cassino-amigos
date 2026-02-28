import { useEffect, useState } from "react"
import movieService from "../appwrite/movieService"

function GroupList() {

    const [filmes, setFilmes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        carregarFilmes()

    }, [])


    async function carregarFilmes() {

        try {

            setLoading(true)

            const response = await movieService.getMovies()

            setFilmes(response.documents)

        }
        catch (error) {

            console.log("Erro ao carregar filmes", error)

        }
        finally {

            setLoading(false)

        }

    }


    async function marcarAssistido(filmeId, valorAtual) {

        try {

            await movieService.updateWatched(filmeId, !valorAtual)

            carregarFilmes()

        }
        catch (error) {

            console.log("Erro ao atualizar", error)

        }

    }


    if (loading) {

        return (
            <p className="text-white">
                Carregando lista...
            </p>
        )

    }


    if (filmes.length === 0) {

        return (
            <p className="text-white">
                Nenhum filme adicionado ainda
            </p>
        )

    }


    return (

        <div className="mt-8">

            <h2 className="text-white text-xl mb-4">
                Lista do grupo
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

                {filmes.map((filme) => (

                    <div
                        key={filme.$id}
                        className="bg-gray-800 p-3 rounded text-white flex flex-col items-center"
                    >

                        <h3 className="text-center text-sm mb-2">
                            {filme.title}
                        </h3>

                        {filme.poster && (

                            <img
                                src={
                                    "https://image.tmdb.org/t/p/w300" +
                                    filme.poster
                                }
                                className="rounded mb-2"
                            />

                        )}

                        <button
                            onClick={() =>
                                marcarAssistido(
                                    filme.$id,
                                    filme.assistido
                                )
                            }
                            className={`px-2 py-1 rounded text-sm ${
                                filme.assistido
                                    ? "bg-green-600"
                                    : "bg-gray-600"
                            }`}
                        >

                            {filme.assistido
                                ? "Assistido"
                                : "Marcar assistido"}

                        </button>

                    </div>

                ))}

            </div>

        </div>

    )

}

export default GroupList