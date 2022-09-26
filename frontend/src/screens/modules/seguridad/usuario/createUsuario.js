
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { UsuarioActions } from '../../../../redux/actions/usuarioActions';

function CreateUsuario( props ) {
    const { usuario } = props;
    const navigate = useNavigate();

    function onBack() {
        navigate(-1);
    }

    return (
        <>
            <div className="main-content">
                <section className="section">
                    <h1 className="section-header">
                        <div>
                        </div>
                    </h1>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Nuevo Usuario</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="form-group col-3"></div>
                                        <div className="form-group col-6">
                                            <InputComponent
                                                label="Email"
                                                value={usuario.email}
                                                onChange={ (value) => props.setEmail(usuario, value) }
                                                error={usuario.error.email}
                                                message={usuario.message.email}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-2"></div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Login"
                                                value={usuario.login}
                                                onChange={ (value) => props.setLogin(usuario, value) }
                                                error={usuario.error.login}
                                                message={usuario.message.login}
                                            />
                                        </div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Contraseña"
                                                type='password'
                                                value={usuario.password}
                                                onChange={ (value) => props.setPassword(usuario, value) }
                                                error={usuario.error.password}
                                                message={usuario.message.password}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <ButtonComponent
                                        onClick={ () => props.onStore(usuario) }
                                    >
                                        Guardar
                                    </ButtonComponent>
                                    <ButtonComponent
                                        type='danger' onClick={onBack}
                                    >
                                        Cancelar
                                    </ButtonComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    usuario: state.Usuario,
} );

const mapDispatchToProps = {
    initData: UsuarioActions.initData,
    setEmail: UsuarioActions.setEmail,
    setLogin: UsuarioActions.setLogin,
    setPassword: UsuarioActions.setPassword,
    onStore: UsuarioActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateUsuario );
