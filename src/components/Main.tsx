import React, { FC, useEffect, useRef, useState } from 'react'
import { useContactActive } from '../context/ContactActiveProvider'
import { useContact } from '../context/ContactProvider'
import { MessageInterface, MessageType, useMessages } from '../context/MessagesProvider'

interface MainProps {
  id: string
}

export const Main: FC<MainProps> = ({ id }) => {
  const [received, setReceived] = useState<MessageInterface[]>([])
  const { messages, setMessage } = useMessages()
  const { idActive } = useContactActive()
  const { setContact } = useContact()
  const messageInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setReceived(messages.filter(message => message.id === idActive))
  }, [messages, idActive])

  const onSubmit = (e: any) => {
    e.preventDefault()

    setMessage(prev => [
      ...prev,
      {
        id: idActive!,
        from: id,
        text: messageInput.current!.value,
        type: MessageType.personal,
        time: '12:00'
      }
    ])

    setContact(prev => ({
      ...prev,
      [idActive!]: {
        id: idActive!,
        last_message: messageInput.current!.value,
        last_time_message: '12:00'
      }
    }))

    messageInput.current!.value = ""
  }

  return (
    <div className="main-content">
      <div className="recevier_info">
        {idActive}
      </div>
      <ul className="chats-list">
        { received.map(message => (
          <li className={`chat${message.from === id ? " chat-mine" : ""}`}>
            <div className="chat-id">{ message.from }</div>
            <div className="chat-message">{ message.text }</div>
            <div className="chat-message_time">{ message.time }</div>
          </li>
        )) }
      </ul>
      <form onSubmit={onSubmit} className="form-chat">
        <input ref={ messageInput } type="text" name="message" className="form-chat_message" />
        <button type="submit" className="form-chat_btn">Send</button>
      </form>
    </div>
  )
}
