import React, { Dispatch, FC, SetStateAction, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export interface ContactInterface {
  [key: string] : {
    id: string
    last_message: string
    last_time_message: number
  }
}

interface ContactContextInterface {
  contacts: ContactInterface
  setContact: Dispatch<SetStateAction<ContactInterface>>
}

interface ContactProviderProps {
  children: React.ReactNode
}

const ContactContext = React.createContext<ContactContextInterface>({ contacts: {}, setContact: () => {} })

export const useContact = () => useContext(ContactContext)

export const ContactProvider: FC<ContactProviderProps> = ({ children }) => {
  const [contacts, setContact] = useLocalStorage<ContactInterface>('Contacts', {})

  return (
    <ContactContext.Provider value={{ contacts, setContact }}>
      {children}
    </ContactContext.Provider>
  )
}
