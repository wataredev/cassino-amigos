import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute({ authentication = true }) {
  const authStatus = useSelector(state => state.auth.status)
  const { userDoc } = useSelector((state) => state.auth)

  if (authStatus === undefined || authStatus === null) {
    return null
  }

  if (authentication && !authStatus) {
    return <Navigate to="/login" replace />
  }

  if (!authentication && authStatus) {

    return userDoc.membro === true ? <Navigate to="/home" replace /> : <Navigate to="/nao-verificado" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
