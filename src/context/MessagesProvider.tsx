import React, { Dispatch, FC, SetStateAction, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export enum MessageType {
  personal = 'Personal',
  group = 'Group'
}

export interface MessageInterface {
  id: string
  from: string
  text: string
  type: MessageType
  time: string
}

interface MessageContextInterface {
  messages: MessageInterface[]
  setMessage: Dispatch<SetStateAction<MessageInterface[]>>
}

interface MessageProviderProps {
  children: React.ReactNode
}

const MessagesContext = React.createContext<MessageContextInterface>({ messages: [], setMessage: () => {} })

export const useMessages = () => useContext(MessagesContext)

export const MessagesProvider: FC<MessageProviderProps> = ({ children }) => {
  const [messages, setMessage] = useLocalStorage<MessageInterface[]>('messages', [])

  return (
    <MessagesContext.Provider value={{ messages, setMessage }}>
      { children }
    </MessagesContext.Provider>
  )
}
