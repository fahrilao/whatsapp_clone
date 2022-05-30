import React, { Dispatch, FC, SetStateAction, useContext, useState } from 'react'

interface ContactActiveContextInterface {
  idActive: string | null
  setIdActive: Dispatch<SetStateAction<string | null>>
}

interface ContactActiveProviderProps {
  children: React.ReactNode
}

const ContactActiveContext = React.createContext<ContactActiveContextInterface>({ idActive: null, setIdActive: () => {} })

export const useContactActive = () => useContext(ContactActiveContext)

export const ContactActiveProvider: FC<ContactActiveProviderProps> = ({ children }) => {
  const [idActive, setIdActive] = useState<string | null>(null)

  return (
    <ContactActiveContext.Provider value={{ idActive, setIdActive }}>
      { children }
    </ContactActiveContext.Provider>
  )
}
