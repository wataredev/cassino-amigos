import React from 'react'

function NotMember() {
  return (
    <div className="flex justify-center items-center min-h-screen px-6">
      <div className="shadow-xl rounded-xl p-10 max-w-lg w-full text-center">
        
        <div className="text-blue-600 text-5xl mb-4">
          🕒
        </div>

        <h2 className="text-3xl font-semibold mb-3">
          Sua conta está em análise
        </h2>

        <p className="mb-6 leading-relaxed">
          Seu cadastro foi realizado com sucesso.
          Agora ele precisa ser aprovado por um administrador antes que você possa acessar o sistema.
        </p>

      </div>
    </div>
  )
}



export default NotMember