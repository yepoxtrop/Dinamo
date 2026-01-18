//Librerias
//--reac
import React from 'react';
//--icons
import { UserRound } from 'lucide-react';

//Estilos
import '../../styles/components/Inputs/Input_text.css'

const Input_text = ({datos, funcion_onchange}) => {
  return (
    <>
      <div className='input_text_container'>
        <i className='input_text_icon_container'>
          {datos.icon == "usuario"?<UserRound className='svg_password'/>:null}
        </i>
        <input 
          type={datos.tipo} 
          name={datos.nombre}
          maxLength={datos.maximo} 
          minLength={datos.minimo} 
          placeholder={datos.ejemplo==null?null:datos.ejemplo} 
          required
          className='input_text_login'
          onChange={funcion_onchange}
        />
      </div>
    </>
  )
}

export default Input_text; 
