import React, { useCallback } from 'react';
import { ContactActiveProvider } from './context/ContactActiveProvider';
import { ContactProvider } from './context/ContactProvider';
import { MessagesProvider } from './context/MessagesProvider';
import { SocketProvider } from './context/SocketProvided';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Home } from './pages/Home';
import { Login } from './pages/Login';

function App() {
  const [id, setId] = useLocalStorage<string>('Id')

  console.log('Rendering App...')

  const onLogout = useCallback(() => {
    setId("")
  }, [])

  return (
    id ?
      <SocketProvider id={id}>
        <ContactProvider>
          <ContactActiveProvider>
            <MessagesProvider>
              <Home id={id} onLogout={onLogout} />
            </MessagesProvider>
          </ContactActiveProvider>
        </ContactProvider>
      </SocketProvider>
    : <Login onSubmit={setId} />
  );
}

export default App;
