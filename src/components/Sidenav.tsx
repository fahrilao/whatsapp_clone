import React, { FC } from 'react'
import { ContactCard } from './ContactCard'
import { FormContact } from './FormContact'
import { UserInfo } from './UserInfo'
interface SidenavProps {
  id: string
  onLogout: () => void
}

export const Sidenav: FC<SidenavProps> = React.memo(({ id, onLogout }) => {
  console.log('Rendering Component Side Nav...')

  return (
    <div className="sidenav">
      <FormContact />
      <ContactCard />
      <UserInfo id={id} onClickLogout={onLogout} />
    </div>
  )
})
