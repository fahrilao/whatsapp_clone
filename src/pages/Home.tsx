import React, { Dispatch, FC, SetStateAction } from 'react'
import { Main } from '../components/Main'
import { Sidenav } from '../components/Sidenav'

interface HomeProps {
  id: string
  onLogout: () => void
}

export const Home: FC<HomeProps> = ({ id, onLogout }) => {
  return (
    <div className="container">
      <Sidenav id={id} onLogout={onLogout} />
      <Main id={id} />
    </div>
  )
}
