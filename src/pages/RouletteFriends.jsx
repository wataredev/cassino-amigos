import { useState, useEffect } from 'react'
import Roulette from '../components/roulette/Roulette'
import service from "../appwrite/config"

function RouletteFriends() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    service.getAllUsers().then(data => {
      
      const lista = data.documents || data || []

      const usersFormatados = lista.map(user => ({
        option: user.nome_display,
        image: {
          uri: user.foto_url === null ? "https://marketplace.canva.com/Dz63E/MAF4KJDz63E/1/tl/canva-user-icon-MAF4KJDz63E.png" : user.foto_url,
          sizeMultiplier: 0.6,
          offsetY: 120,
          className: "roulette-image"
        },
      }))
      
      setUsers(usersFormatados)
    })
  }, [])
  
  return (
    <div className='w-full h-full flex items-center justify-center overflow-hidden'>
        {users.length > 0 && (
          <Roulette key={users.length} data={users} />
        )}
    </div>
  )
}

export default RouletteFriends