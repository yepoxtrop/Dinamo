//Librerias
//--react
import React from 'react';

//Componentes
import Label from '../Labels/Label.jsx';
import Input_text from '../Inputs/Input_text.jsx';
import Input_submit from '../Inputs/Input_submit.jsx';
import Input_password from '../Inputs/Input_password.jsx';
import Input_list from '../Inputs/Input_list.jsx';
import Title_forms from '../Titles/Title_forms.jsx';

//Estilos
import '../../styles/components/Forms/Form_login.css';

const Form_login = () => {
  return (
    <div className='login_container'>
        <div className='title_container'>
          <div className='subtitle_container'>
            <Title_forms datos={{icon:"acs", valor:"Firma Digital ACS"}}/>

            <div className='form_login_description'>
              <hr />
              <span className='description_login'>Tu firma digital, segura y al instante</span>
              <hr />
            </div>
          </div>

          <span className='title_form_login'>Inicia Sesión</span>
        </div>

        

        <form className='login'>
            <div className='input_normal'>
              <Label datos={{valor:"Usuario",for_input:"usuario"}}/>
              <Input_text datos={{tipo:"text", icon:"usuario", nombre:"usuario", maximo:45, minimo:4, ejemplo:"tony.chopper"}}/>  
            </div>
            
            <div className='input_normal'>
              <Label datos={{valor:"Contraseña",for_input:"contrasena"}}/>
              <Input_password datos={{nombre:"usuario", maximo:25, minimo:4, ejemplo:"**********"}}/>
            </div>

            <div className='input_especial'>
              <Input_list />
              <span className='link_soporte_form_login'>
                <a href="#" className='link_Soporte'>¿Olividó su contraseña?</a>
              </span>
            </div>

            <div className='input_normal'>
              <Input_submit datos={{valor:"Iniciar Sesión"}}/>
            </div>
        </form>
    </div>
  )
};

export default Form_login;
