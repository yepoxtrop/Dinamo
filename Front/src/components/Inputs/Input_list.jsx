//Librerias
//--react
import React from 'react';

//Estilos
import '../../styles/components/Inputs/Input_list.css';

const Input_list = () => {
  return (
    <div className='input_list_container'>
      <input type="checkbox" name="remember_password" className='input_list'/>
      <label htmlFor="remember_password" className='label_input_list'>Recordar</label>
    </div>
  )
;}

export default Input_list;