
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginActions } from '../../redux/actions/auth/login.action';
import '../../public/css/login.css';
import LoadingComponent from '../../components/loading';
import { RegisterActions } from '../../redux/actions/auth/register.action';

function LoginPage( props ) {
  const { loading, login, register } = props;
  const navigate = useNavigate();
  const [ esRegister, setEsRegister ] = React.useState(false);

  const onHome = () => {
    navigate('/');
  };

  const setLoading = () => {
      return (
          <LoadingComponent visible={loading.visible} />
      );
  };
  
  return (
    <>
      <div className='body-login'>
        { setLoading() }
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
                <label>
                  Usuario
                </label>
                <input type="text"
                  value={props.login.usuario}
                  onChange={ (evt) => {
                    props.setLogin( login, evt.target.value );
                  } }
                  className={`${(login.error.usuario === true) && 'border-danger'}`} 
                />
                <div className={`invalid-feedback ${(login.error.usuario === true) ? 'd-block' : 'd-none'}`}
                    style={{ fontSize: 10, }}
                >
                    { login.message.usuario }
                </div>
              </div>
              <div className="form-group-login">
                <label>
                  Contraseña
                </label>
                <input type="password"
                  value={props.login.password}
                  onChange={ (evt) => {
                    props.setPassword( login, evt.target.value );
                  } }
                  className={`${(login.error.password === true) && 'border-danger'}`} 
                />
                <div className={`invalid-feedback ${(login.error.password === true) ? 'd-block' : 'd-none'}`}
                    style={{ fontSize: 10, }}
                >
                    { login.message.password }
                </div>
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
                <button type="button" 
                  onClick={ () => {
                    props.onLogin( login, onHome );
                  } }
                >
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
              <div className="form-group-login">
                <label>Email</label>
                <input type="email" 
                  value={register.email}
                  onChange={ (evt) => {
                    props.setEmailRegister( register, evt.target.value );
                  } }
                />
                <div className={`invalid-feedback ${(register.error.email === true) ? 'd-block' : 'd-none'}`}
                    style={{ fontSize: 12, }}
                >
                    { register.message.email }
                </div>
              </div>
              <div className="form-group-login">
                <label>Usuario</label>
                <input type="text"
                  value={register.usuario}
                  onChange={ (evt) => {
                    props.setLoginRegister( register, evt.target.value );
                  } }
                />
                <div className={`invalid-feedback ${(register.error.usuario === true) ? 'd-block' : 'd-none'}`}
                    style={{ fontSize: 12, }}
                >
                    { register.message.usuario }
                </div>
              </div>
              <div className="form-group-login">
                <label>Contraseña</label>
                <input type="password"
                  value={register.password}
                  onChange={ (evt) => {
                    props.setPasswordRegister( register, evt.target.value );
                  } }
                />
                <div className={`invalid-feedback ${(register.error.password === true) ? 'd-block' : 'd-none'}`}
                    style={{ fontSize: 12, }}
                >
                    { register.message.password }
                </div>
              </div>
              <div className="form-group-login">
                <button type="button"
                  onClick={ () => {
                    props.onRegister( register, onHome );
                  } }
                >
                  Registrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ( state ) => ( {
  login: state.Login,
  register: state.Register,
  loading: state.Loading,
} );

const mapDispatchToProps = {
  setLogin: LoginActions.setLogin,
  setPassword: LoginActions.setPassword,
  onLogin: LoginActions.onLogin,

  setLoginRegister: RegisterActions.setLogin,
  setEmailRegister: RegisterActions.setEmail,
  setPasswordRegister: RegisterActions.setPassword,
  onRegister: RegisterActions.onRegister,
};

export default connect(mapStateToProps, mapDispatchToProps)( LoginPage );
