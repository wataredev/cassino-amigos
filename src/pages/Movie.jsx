import React, { useEffect, useState } from "react"
import conf from "../conf/conf"
import movieService from "../appwrite/movieService"
import authService from "../appwrite/auth"
import GroupList from "../components/GroupList"

function Movie() {

    const [busca, setBusca] = useState("")
    const [filmes, setFilmes] = useState([])
    const [loading, setLoading] = useState(false)
    const [addingId, setAddingId] = useState(null)

    useEffect(() => {

        if (!busca.trim()) {
            setFilmes([])
            return
        }

        const delayDebounce = setTimeout(() => {
            buscarFilmes()
        }, 400)

        return () => clearTimeout(delayDebounce)

    }, [busca])


    async function buscarFilmes() {

        try {

            setLoading(true)

            const url =
                `https://api.themoviedb.org/3/search/movie?api_key=${conf.movieApi}&query=${busca}&language=pt-BR`

            const response = await fetch(url)
            const data = await response.json()

            setFilmes(data.results || [])

        }
        catch (error) {
            console.log("Erro ao buscar filmes", error)
        }
        finally {
            setLoading(false)
        }

    }


    async function adicionarFilme(filme) {

        try {

            setAddingId(filme.id)

            const user = await authService.getCurrentUser()

            if (!user) {
                alert("Você precisa estar logado")
                return
            }

            await movieService.addMovie({

                tmdbId: filme.id,
                title: filme.title,
                poster: filme.poster_path,
                userId: user.$id,
                userName: user.name

            })

            alert("Filme adicionado com sucesso!")

        }
        catch (error) {

            console.log("Erro ao adicionar filme", error)
            alert("Erro ao adicionar filme")

        }
        finally {

            setAddingId(null)

        }

    }


    return (

        <div className="p-4">

            <h1 className="text-white text-2xl mb-4">
                Buscar filmes
            </h1>


            <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Digite o nome do filme..."
                className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
            />


            {loading && (
                <p className="text-white">Buscando...</p>
            )}


            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                {filmes.map((filme) => (

                    <div
                        key={filme.id}
                        className="bg-gray-800 text-white p-3 rounded flex flex-col items-center"
                    >

                        <h2 className="text-center mb-2">
                            {filme.title}
                        </h2>


                        {filme.poster_path ? (

                            <img
                                src={
                                    "https://image.tmdb.org/t/p/w300" +
                                    filme.poster_path
                                }
                                alt={filme.title}
                                className="mb-2 rounded"
                            />

                        ) : (
                            <div className="mb-2">Sem imagem</div>
                        )}


                        <button
                            onClick={() => adicionarFilme(filme)}
                            disabled={addingId === filme.id}
                            className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                        >

                            {addingId === filme.id
                                ? "Adicionando..."
                                : "Adicionar"}

                        </button>

                    </div>

                ))}

            </div>


            {/* LISTA DO GRUPO */}
            <div className="mt-10">
                <GroupList />
            </div>


        </div>

    )

}

export default Movie