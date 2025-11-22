import { useEffect } from "react"
import { toast } from 'sonner'

export function InputError({ message }) {
  useEffect(() => {
    if (message) toast.error(message)
  }, [message])

  if (!message) return null

  return <></>
}