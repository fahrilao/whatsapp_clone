import React, { FC, useRef } from 'react'

interface FormChatProps {
  onSubmit: (value: string) => void
}

export const FormChat: FC<FormChatProps> = React.memo(({ onSubmit }) => {
  console.log('Rendering Component Form Chat...')

  const messageInput = useRef<HTMLInputElement>(null)
  
  const onFromSubmit = (e: any) => {
    e.preventDefault()

    onSubmit(messageInput.current!.value)

    messageInput.current!.value = ""
  }

  return (
    <form onSubmit={onFromSubmit} className="form-chat">
      <input ref={ messageInput } type="text" name="message" className="form-chat_message" />
      <button type="submit" className="form-chat_btn">Send</button>
    </form>
  )
})
