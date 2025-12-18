import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { useAuthInit } from "../hooks/useAuthInit"
import { Input } from "@/components/ui/input"
import authService from '../appwrite/auth';
import service from '../appwrite/config'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import { Query } from "appwrite";
import conf from "../conf/conf"

export function LoginForm({ className, ...props}) {

  useAuthInit()

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false)

  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState("");

  const entrarConta = async (data) => {

    setError("")

    try {

      setLoader(true)
      
      const userData = await authService.login(data)

      if(userData) {

        const userAtual = await authService.getCurrentUser()

        if (userAtual) {
          
          const res = await service.databases.listDocuments(
            conf.database,
            conf.tableUsuario,
            [Query.equal("accountId", userAtual.$id)]
          );

          const userDoc = res.documents[0];

          console.log("USERDOOOC", userDoc)

          if (!userDoc) {
            toast.error("Erro: perfil não encontrado no Appwrite Database.");
            return;
          }

          dispatch(login({ userData: userAtual, userDoc}))
        }
      }

    } catch (error) {
      console.log("ERRO AO LOGAR NO USUÁRIO, ", error)
      toast.error("Falha no login. Verifique seus dados e tente novamente.")
      reset()
    } finally {
      setLoader(false)
    }

  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Entre na sua Conta</CardTitle>
          <CardDescription>
            Insira seu e-mail abaixo para acessar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(entrarConta)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" type="email" placeholder="m@example.com" {...register("email", { required: true })} />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Esqueceu a Senha ?
                  </a>
                </div>
                <Input id="password" type="password" {...register("password", { required: true })} />
              </Field>
              <Field>
                <Button type="submit" variant="outline" disabled={loader}>
                  Entrar
                  { loader && <Spinner />}
                </Button>
                <FieldDescription className="text-center" onClick={() => navigate("/registro")}>
                  Não tem uma conta? <a href="#">Registre-se</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
