//Librerias
//--react
import React from 'react';
import { useState } from 'react';
//--icons
import { LockKeyhole } from 'lucide-react';
import { EyeClosed, Eye } from 'lucide-react';


//Estilos
import '../../styles/components/Inputs/Input_password.css'

const Input_password = ({datos}) => {
    const [see_pasword, set_see_password] = useState(false);

    const view_password = () =>{
        set_see_password(!see_pasword);
    }

    return (
        <>
          <div className='input_password_container'>
            <i className='input_password_icon_container'>
                <LockKeyhole className='svg_password'/>
            </i>
            <input 
              type={see_pasword === false?"password":"text"}
              name={datos.nombre}
              maxLength={datos.maximo} 
              minLength={datos.minimo} 
              placeholder={datos.ejemplo==null?null:datos.ejemplo} 
              required
              className='input_password_login'
            />

            <i className='input_password_icon_eyes_container' onClick={view_password}>
                {see_pasword === false ? <EyeClosed className='svg_eye_close' /> : <Eye className='svg_eye_open' />}
            </i>

          </div>
        </>
    )
}

export default Input_password; 
