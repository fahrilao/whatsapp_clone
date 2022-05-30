import React, { Dispatch, FC, SetStateAction, useRef } from 'react'

export interface LoginProps {
  onSubmit: Dispatch<SetStateAction<string>>
}

export const Login: FC<LoginProps> = ({ onSubmit }) => {
  const inputId = useRef<HTMLInputElement>(null)
  const onSubmitForm = (e: any) => {
    e.preventDefault()

    if (inputId.current === null) {
      onSubmit('')

      return
    }

    onSubmit(inputId.current.value)
  }

  return (
    <div>
      Login
      <form onSubmit={onSubmitForm}>
        <input ref={inputId} type="text" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
