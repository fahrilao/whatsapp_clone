import React, { FC, useCallback, useEffect, useState } from 'react'
import { useContactActive } from '../context/ContactActiveProvider'
import { useContact } from '../context/ContactProvider'
import { MessageInterface, MessageType, useMessages } from '../context/MessagesProvider'
import { useSocket } from '../context/SocketProvided'
import { FormChat } from './FormChat'
import { Message } from './Message'

interface MainProps {
  id: string
}

export const Main: FC<MainProps> = React.memo(({ id }) => {
  console.log('Rendering Component Main...')
  const [received, setReceived] = useState<MessageInterface[]>([])
  const { messages, setMessage } = useMessages()
  const { idActive } = useContactActive()
  const { setContact } = useContact()
  const socket = useSocket()

  const onSubmit = useCallback((value: string) => {
    const time = Date.now()
    socket?.emit('send_message', {
      id: idActive,
      from: id,
      text: value,
      type: MessageType.personal,
      time
    })

    setMessage(prev => [
      ...prev,
      {
        id: idActive!,
        from: id,
        text: value,
        type: MessageType.personal,
        time
      }
    ])

    setContact(prev => ({
      ...prev,
      [idActive!]: {
        id: idActive!,
        last_message: value,
        last_time_message: time
      }
    }))
  }, [idActive])

  useEffect(() => {
    console.log('socket connect')

    if (socket == null) return
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("receiving_message", (payload: MessageInterface) => {
      console.log('receiving_message')
      setMessage(prev => [
        ...prev,
        {
          ...payload,
          id: payload.from
        }
      ])
  
      setContact(prev => ({
        ...prev,
        [payload.from]: {
          id: payload.from,
          last_message: payload.text,
          last_time_message: payload.time
        }
      }))
    })

    return () => {
      socket.off('connect', () => {
        console.log('socket off')
      })

      socket.off('receiving_message', () => {
        console.log('socket off')
      })
    }
  }, [socket])

  useEffect(() => {
    setReceived(messages.filter(message => message.id === idActive))
  }, [messages, idActive])

  return (
    <div className="main-content">
      <div className="recevier_info">
        {idActive}
      </div>
      <Message id={id} messages={received} />
      { idActive && <FormChat onSubmit={onSubmit} /> }
    </div>
  )
})
