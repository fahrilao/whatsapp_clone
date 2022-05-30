import React, { FC, useContext, useEffect, useState } from 'react'
import { Socket } from 'socket.io'
import { io } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

interface SocketProviderProps {
  id: string
  children: React.ReactNode
}

const SocketContext = React.createContext<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null)

export const useSocket = () => useContext(SocketContext)

export const SocketProvider: FC<SocketProviderProps> = ({ id, children }) => {
  const [socket, setSocket] = useState<any>()

  useEffect(() => {
    const newSocket = io('http://localhost:4000', {
      query: { id }
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [id])

  return (
    <SocketContext.Provider value={socket}>
      { children }
    </SocketContext.Provider>
  )
}
