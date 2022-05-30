import React from 'react'
import { useContactActive } from '../context/ContactActiveProvider'
import { useContact } from '../context/ContactProvider'
import { convertEpoch } from '../libraries/datetime'

export const ContactCard = React.memo(() => {
  console.log('Rendering Component Contact Card...')
  const { setIdActive } = useContactActive()
  const { contacts } = useContact()

  const onClickContact = (id: string) => {
    setIdActive(id)
  }
  return (
    <ul className="list-card">
      { Object.keys(contacts).map((id, index) => (
        <li key={index} className="card" onClick={() => onClickContact(contacts[id].id)}>
          <div className="card-header">
            <div className="card-header_name">{ contacts[id].id }</div>
            <div className="card-header_time">{ convertEpoch(contacts[id].last_time_message) }</div>
          </div>
          <div className="card-footer">{ contacts[id].last_message }</div>
        </li>
      )) }
    </ul>
  )
})
