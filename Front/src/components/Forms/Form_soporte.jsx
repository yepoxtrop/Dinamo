//Librerias
//--react
import React from 'react'

//Componentes
import Soporte_card from '../Cards/Soporte_card.jsx';
import Title_forms from '../Titles/Title_forms.jsx';

//Estilos
import '../../styles/components/Forms/Form_soporte.css';

const Form_soporte = () => {
  return (
    <div className='soporte_container'>
      <div className='title_container'>
        <div className='subtitle_container'>
          <Title_forms datos={{icon:"soporte", valor:"Soporte Técnico"}}/>
          <div className='form_login_description'>
            <hr />
            <span className='description_login'>El mejor soporte técnico</span>
            <hr />
          </div>
        </div>
      </div>

      <div className='soporte_body_container'>
          <div className='soporte_card_container'>
            <Soporte_card datos={{icon:"acs", glpi:"ACS"}}/>
            
            <Soporte_card datos={{icon:"neps", glpi:"Nueva EPS"}}/>
          </div>
          <div className='input_especial'>
            <span className='link_soporte_form_login'>
              <a href="#" className='link_Soporte'>Regresar al inicio de sesión</a>
            </span>
          </div>
      </div>

        
    </div>
  )
};

export default Form_soporte; 
