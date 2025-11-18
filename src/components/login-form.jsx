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
import { Input } from "@/components/ui/input"
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useState } from "react"

export function LoginForm({ className, ...props}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const entrarConta = async (data) => {

    setError("")

    try {
      
      const userData = await authService.login(data)

      if(userData) {

        const userAtual = await authService.getCurrentUser()

        if (userAtual) {
          
          console.log("CONTA LOGADA COM SUCESSO!")

          dispatch(login({ userData: userAtual}))
        }
      }

    } catch (error) {
      console.log("ERRO AO LOGAR NO USUÁRIO, ", error)
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
                <Button type="submit" variant="outline">Entrar</Button>
                <FieldDescription className="text-center">
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
