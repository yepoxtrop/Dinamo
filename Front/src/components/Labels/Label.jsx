//Librerias 
import React from 'react';

//Estilos
import '../../styles/components/Labels/Label.css';

const Label = ({datos}) => {
  return (
    <div>
      <label htmlFor={datos.for_input} className='label_form'>{datos.valor}</label>
    </div>
  )
};

export default Label;