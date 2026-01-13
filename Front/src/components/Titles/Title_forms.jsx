//Librerias
//--react
import React from 'react'; 

//Multimedia
//--svg
import logo_acs from '../../public/SVG/logo_acs.svg';
import soporte from '../../public/SVG/soporte.svg'

//Estilos
import '../../styles/components/Titles/Title_forms.css';

const Title_forms = ({datos}) => {
  return (
    <>
        <div className='title_form_container'>
            {datos.icon=="acs"?<img src={logo_acs} alt="logo_acs" className='acs_svg'/>:<img src={soporte} alt='soporte' />}
            <h1 className='title_form'>{datos.valor}</h1>
        </div>
    </>
  )
}

export default Title_forms;