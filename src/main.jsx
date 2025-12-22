import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Landing from './pages/Landing.jsx'
import { Toaster } from 'sonner'
import Login from './pages/Login.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import SignUp from './pages/SignUp.jsx'
import VerificacaoEmail from './pages/VerificacaoEmail.jsx'
import './index.css'
import Home from './pages/Home.jsx'
import HomeWelcome from './pages/HomeWelcome.jsx'
import App from './App.jsx'
import NotMember from './pages/NotMember.jsx'
import Gallery from './pages/Gallery.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Landing/>
      },
    ]
  },
  {
    element: <ProtectedRoute authentication />,
    children: [
      {
        path: "/home",
        element: <Home />,
        children: [
          { 
            index: true, 
            element: <HomeWelcome /> 
          },
          {
            path: "galeria",
            element: <Gallery/>,
          }
        ]
      },
    ]
  },
  {
    path: "/login",
    element: (
      <AuthLayout authentication = {false}>
        <Login/>
      </AuthLayout>
    )
  },
  {
    path:"/registro",
    element: (
      <AuthLayout authentication = {false}>
        <SignUp/>
      </AuthLayout>
    )
  },
  {
    path:"/verificacao",
    element: (
      <AuthLayout authentication = {false}>
        <VerificacaoEmail/>
      </AuthLayout>
    )
  },
  {
    path:"/nao-verificado",
    element: (
      <AuthLayout authentication = {true}>
        <NotMember/>
      </AuthLayout>
    )
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="top-center"/>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
