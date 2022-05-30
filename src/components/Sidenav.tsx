import React, { Dispatch, FC, SetStateAction } from 'react'
import { useContactActive } from '../context/ContactActiveProvider'
import { useContact } from '../context/ContactProvider'
import { FormContact } from './FormContact'
interface SidenavProps {
  id: string
  onLogout: () => void
}

export const Sidenav: FC<SidenavProps> = ({ id, onLogout }) => {
  const { contacts } = useContact()
  const { setIdActive } = useContactActive()

  const onClickContact = (id: string) => {
    setIdActive(id)
  }

  const onClickLogout = () => {
    onLogout()
  }

  return (
    <div className="sidenav">
      <FormContact />
      <ul className="list-card">
        { Object.keys(contacts).map(id => (
          <li className="card" onClick={() => onClickContact(contacts[id].id)}>
            <div className="card-header">
              <div className="card-header_name">{ contacts[id].id }</div>
              <div className="card-header_time">{ contacts[id].last_time_message }</div>
            </div>
            <div className="card-footer">{ contacts[id].last_message }</div>
          </li>
        )) }
      </ul>
      <div className="user_info">
        My id's {id}
        <button onClick={onClickLogout} className="btn-logout">Logout</button>
      </div>
    </div>
  )
}
