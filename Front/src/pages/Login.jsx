//Librerias
//--react
import React from 'react';
import { useState } from 'react';

//Estilos
import '../styles/pages/Login.css';

//Componenetes
import Form_login from '../components/Forms/Form_login.jsx';
import Form_soporte from '../components/Forms/Form_soporte.jsx';

function Login() {
  const [formulario, set_formulario] = useState(true); 

  return (
    <>
        <div className='login_body'>
            <div className='imagen_login_container'>
              
            </div>

            <div className='form_login_container'>
                
                <Form_login />

                <span className='description_form_login'>Todos los derechos reservados a ACS - Acie Soliciones Intregrales S.A.S</span>
            </div>
        </div>
    </>
  )
}

export default Login; 