import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Query } from "appwrite"
import { login } from "../store/authSlice"
import authService from "../appwrite/auth"
import service from "../appwrite/config"
import conf from "../conf/conf"

export function useAuthInit() {
  const dispatch = useDispatch()

  useEffect(() => {
    let isMounted = true

    async function loadUser() {
      try {
        const userData = await authService.getCurrentUser()
        if (!userData || !isMounted) return

        const res = await service.databases.listDocuments(
          conf.database,
          conf.tableUsuario,
          [Query.equal("accountId", userData.$id)]
        )

        const userDoc = res.documents[0]

        if (userDoc && isMounted) {
          dispatch(login({ userData, userDoc }))
        }
      } catch (error) {
        console.error("Erro ao inicializar auth:", error)
      }
    }

    loadUser()

    return () => {
      isMounted = false
    }
  }, [dispatch])
}
