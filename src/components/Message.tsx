import React, { FC } from 'react'
import { MessageInterface } from '../context/MessagesProvider'
import { convertEpoch } from '../libraries/datetime'

interface MessageProps {
  id: string
  messages: MessageInterface[]
}

export const Message: FC<MessageProps> = ({ id, messages }) => {
  return (
    <ul className="chats-list">
      { messages.map((message, index) => (
        <li key={index} className={`chat${message.from === id ? " chat-mine" : ""}`}>
          <div className="chat-id">{ message.from === id ? " You" : message.from }</div>
          <div className="chat-message">{ message.text }</div>
          <div className="chat-message_time">{ convertEpoch(message.time) }</div>
        </li>
      )) }
    </ul>
  )
}
