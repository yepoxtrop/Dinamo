//Librerias
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

//Componentes
import Login from './pages/Login.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
  </StrictMode>
)
