import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function AuthLayout({ children, authentication = true }) {

    const authStatus = useSelector((state) => state.auth.status)
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

    return <>{children}</>
}

export default AuthLayout
