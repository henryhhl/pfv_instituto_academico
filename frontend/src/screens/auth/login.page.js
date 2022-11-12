
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../public/css/login.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [ esRegister, setEsRegister ] = React.useState(false);

  const onLogin = () => {
    navigate('/');
  };
  
  return (
    <div className='body-login'>
      <div className={`form-login ${esRegister && 'register'}`}>
        <div className={`form-toggle-login ${esRegister && 'visible'}`}
          onClick={ (evt) => {
            evt.preventDefault();
            setEsRegister(false)
          } }
        ></div>
        <div className={`form-panel-login one ${esRegister && 'hidden'}`}>
          <div className="form-header-login">
            <h1>INGRESO AL SISTEMA</h1>
          </div>
          <div className="form-content-login">
            <div className="form-group-login">
              <label htmlFor="username">Usuario</label>
              <input type="text" id="username" name="username" required="required"/>
            </div>
            <div className="form-group-login">
              <label htmlFor="password">Contraseña</label>
              <input type="password" id="password" name="password" required="required"/>
            </div>
            <div className="form-group-login">
              <label className="form-remember-login">
                <input type="checkbox"/>
                <span style={ { position: 'relative', top: -3, } }>
                  Recordar Usuario
                </span>
              </label><a className="form-recovery-login" href="#">¿Has olvidado tu contraseña?</a>
            </div>
            <div className="form-group-login">
              <button type="button" onClick={onLogin}>
                ACCEDER
              </button>
            </div>
          </div>
        </div>
        <div className={`form-panel-login two ${esRegister && 'active'}`}
          onClick={ (evt) => {
            if ( !esRegister ) {
              evt.preventDefault();
              setEsRegister(true);
            }
          } }
        >
          <div className="form-header-login">
            <h1>Registrar Usuario</h1>
          </div>
          <div className="form-content-login">
            <form>
              <div className="form-group-login">
                <label htmlFor="username">Usuario</label>
                <input type="text" id="username" name="username" required="required"/>
              </div>
              <div className="form-group-login">
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" name="password" required="required"/>
              </div>
              <div className="form-group-login">
                <label htmlFor="cpassword">Confirmar Contraseña</label>
                <input type="password" id="cpassword" name="cpassword" required="required"/>
              </div>
              <div className="form-group-login">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required="required"/>
              </div>
              <div className="form-group-login">
                <button type="submit">Registrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
