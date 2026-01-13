//Librerias
import React from 'react'

//Estilos
import '../../styles/components/Inputs/Input_submit.css';

const Input_submit = ({datos}) => {
  return (
    <div>
        <input type="submit" value={datos.valor} className='input_submit_login'/>
    </div>
  )
}

export default Input_submit
