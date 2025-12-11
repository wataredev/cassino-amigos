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
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux'
import service from '../appwrite/config'
import { login } from '../store/authSlice'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner"
import { toast } from 'sonner'
import conf from "../conf/conf"
import { ID, Permission, Role, Query } from "appwrite"

export function SignupForm({...props}) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

    const [loader, setLoader] = useState(false)

  const { register, handleSubmit} = useForm()

  const [ error, setError ] = useState()

  const criarConta = async (data) => {
    setError("")

    if (data.password !== data.confirmarSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }

    try {

      setLoader(true)

      const userData = await authService.createAccount(data)
      if ( userData ) {
          const userAtual = await authService.getCurrentUser()

          if (userAtual) {

            await service.databases.createDocument(
              conf.database,
              conf.tableUsuario,
              ID.unique(),
              {
                accountId: userAtual.$id,
                nome_display: data.name,
                foto_url: null,
                membro: false
              },
              [
                Permission.read(Role.user(userAtual.$id)),
                Permission.update(Role.user(userAtual.$id)),
                Permission.write(Role.user(userAtual.$id)),
              ]
            );

            const userDoc = await service.databases.listDocuments(
              conf.database,
              conf.tableUsuario,
              [Query.equal("accountId", userAtual.$id)]
            );

            dispatch(login({userData: userAtual, userDoc: userDoc.documents[0]}))
          }
      }

    } catch (error) {

        console.log(error)
        switch (error.code) {
          case 409:
            toast.error("Este e-mail já está cadastrado.");
            break;

          case 401:
            toast.error("E-mail ou senha inválidos.");
            break;

          case 400:
            toast.error("Dados inválidos. Verifique os campos.");
            break;

          default:
            toast.error("Erro inesperado. Tente novamente.");
        }
    } finally {
      setLoader(false)
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Crie a sua conta</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(criarConta)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nome</FieldLabel>
              <Input id="name" type="text" {...register("name", { required: true })} />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" {...register("email", { required: true })} />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Input id="password" type="password" {...register("password", { required: true, minLength: 8 })} />
              <FieldDescription>Senha mínima de 8 caracteres</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirme a Senha
              </FieldLabel>
              <Input type="password" {...register("confirmarSenha", { required: "Confirme sua senha" })}/>
              <FieldDescription>Caso você seja um membro do clube, um administrador irá ativar sua conta após o cadastro.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" variant="outline" disabled={loader}>
                  Criar Conta
                  { loader && <Spinner />}
                </Button>
                <FieldDescription className="px-6 text-center">
                  Já possui uma conta ? <a href="#" onClick={() => navigate("/login")}>Entrar</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
