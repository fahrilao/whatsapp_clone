import React, { useRef } from 'react'
import { useContactActive } from '../context/ContactActiveProvider'

export const FormContact = () => {
  const { setIdActive } = useContactActive()
  const inputId = useRef<HTMLInputElement>(null)

  const onSubmit = (e: any) => {
    e.preventDefault()

    setIdActive(inputId.current!.value)
  }

  return (
    <form onSubmit={onSubmit} className="form-contact">
      <input className="form-contact-id" ref={inputId} name="id" type="text" placeholder="ID" />
      <button type="submit" className="form-contact-btn">New Message</button>
    </form>
  )
}
