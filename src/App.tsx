import React from 'react';
import { ContactActiveProvider } from './context/ContactActiveProvider';
import { ContactProvider } from './context/ContactProvider';
import { MessagesProvider } from './context/MessagesProvider';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Home } from './pages/Home';
import { Login } from './pages/Login';

function App() {
  const [id, setId] = useLocalStorage<string>('Id')

  const onLogout = () => {
    setId("")
  }

  return (
    id ?
      <ContactProvider>
        <ContactActiveProvider>
          <MessagesProvider>
            <Home id={id} onLogout={onLogout} />
          </MessagesProvider>
        </ContactActiveProvider>
      </ContactProvider>
    : <Login onSubmit={setId} />
  );
}

export default App;
