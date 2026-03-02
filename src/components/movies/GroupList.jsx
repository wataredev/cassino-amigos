import { useEffect, useState } from "react"
import movieService from "../../appwrite/movieService"
import service from "../../appwrite/config"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const TMDB_BASE = "https://image.tmdb.org/t/p/w300"
const TMDB_LARGE = "https://image.tmdb.org/t/p/original"

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
            const filmesComUsuario = await Promise.all(
                response.documents.map(async (movie) => {
                    const user = await service.getUserById(movie.userId)
                    return { ...movie, user }
                })
            )
            setFilmes(filmesComUsuario)
        } catch (error) {
            console.log("Erro ao carregar filmes", error)
        } finally {
            setLoading(false)
        }
    }

    async function toggleAssistido(movie) {
        try {
            await movieService.toggleAssistido(movie)
            carregarFilmes()
        } catch (error) {
            console.log("Erro ao atualizar", error)
        }
    }

    async function excluirFilme(movieId) {
        try {
            await movieService.deleteMovie(movieId)
            carregarFilmes()
        } catch (error) {
            console.log("Erro ao excluir filme", error)
        }
    }

    function getIniciais(user) {
        const nome = user?.nome_display || user?.email || "?"
        return nome
            .split(" ")
            .slice(0, 2)
            .map((n) => n[0].toUpperCase())
            .join("")
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64 bg-gray-900 text-white">
                <p className="text-lg animate-pulse">Carregando lista...</p>
            </div>
        )
    }

    if (filmes.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 bg-gray-900 text-white">
                <p className="text-lg text-gray-400">Nenhum filme adicionado ainda</p>
            </div>
        )
    }

    const naoAssistidos = filmes.filter(f => !f.assistido)
    const [destaque, ...resto] = naoAssistidos

    return (
        <div className="bg-gray-900 min-h-screen text-white">

            {destaque && (
                <div className="relative w-full h-[70vh] overflow-hidden">
                    {destaque.bgMovie ? (
                        <img
                            src={TMDB_LARGE + destaque.bgMovie}
                            alt={destaque.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-400 text-2xl">Sem poster</span>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-8 w-full">
                        <h2 className="text-4xl font-bold mb-3 drop-shadow-lg">
                            {destaque.title}
                        </h2>

                        {destaque.user && (
                            <div className="flex gap-2 mb-4 flex-col">
                                <span className="text-sm text-gray-300">Adicionado por</span>
                                <div className="flex gap-2 items-center">
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src={destaque.user.foto_url} />
                                        <AvatarFallback className="text-xs bg-gray-600">
                                            {getIniciais(destaque.user)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-white font-medium">
                                        {destaque.user.nome_display}
                                    </span>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-2">
                            <Button
                                onClick={() => toggleAssistido(destaque)}
                                className="bg-white text-black hover:bg-gray-200 rounded-full"
                            >
                                Marcar assistido
                            </Button>

                            <Button
                                onClick={() => excluirFilme(destaque.$id)}
                                variant="destructive"
                                className="rounded-full"
                            >
                                Excluir
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {resto.length > 0 && (
                <div className="px-6 py-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-300">Pendentes</h3>

                    <div className="flex flex-col gap-3">
                        {resto.map((filme) => (
                            <div
                                key={filme.$id}
                                className="flex items-center gap-4 bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors"
                            >
                                {filme.poster ? (
                                    <img
                                        src={TMDB_BASE + filme.poster}
                                        alt={filme.title}
                                        className="w-16 h-24 object-cover rounded flex-shrink-0"
                                    />
                                ) : (
                                    <div className="w-16 h-24 bg-gray-600 rounded flex-shrink-0 flex items-center justify-center">
                                        <span className="text-gray-400 text-xs text-center">Sem poster</span>
                                    </div>
                                )}

                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-base truncate mb-1">
                                        {filme.title}
                                    </p>

                                    {filme.user && (
                                        <div className="flex items-center gap-1.5">
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage src={filme.user.foto_url} />
                                                <AvatarFallback className="text-[10px] bg-gray-600">
                                                    {getIniciais(filme.user)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-xs text-gray-400">
                                                {filme.user.nome_display}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2 flex-shrink-0">
                                    <Button
                                        size="sm"
                                        onClick={() => toggleAssistido(filme)}
                                        className="bg-gray-600 hover:bg-gray-500 text-white rounded-full text-xs"
                                    >
                                        Marcar
                                    </Button>

                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => excluirFilme(filme.$id)}
                                        className="rounded-full text-xs"
                                    >
                                        Excluir
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    )
}

export default GroupList