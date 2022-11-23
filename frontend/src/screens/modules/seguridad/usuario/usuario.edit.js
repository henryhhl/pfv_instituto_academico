
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import { EstadoData } from '../../../../data/estado.data';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { UsuarioActions } from '../../../../redux/actions/seguridad/usuario.action';

function EditUsuario( props ) {
    const { usuario } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onEdit( params.idusuario );
            }
        } );
        return () => {};
    }, [] );

    const onLogin = () => {
        navigate( '/login' );
    };

    const onBack = () => {
        props.onLimpiar();
        navigate(-1);
    };

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Editar Usuario"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(usuario, onBack) }
                            >
                                Editar
                            </ButtonComponent>
                            <ButtonComponent
                                type='danger' onClick={onBack}
                            >
                                Cancelar
                            </ButtonComponent>
                        </>
                    }
                >
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
                    <div className="row">
                        <div className="form-group col-4"></div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado"}
                                value={usuario.estado}
                                onChange={ (value) => props.setEstado(usuario, value) }
                                error={usuario.error.estado}
                                message={usuario.message.estado}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    usuario: state.Usuario,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onLimpiar: UsuarioActions.onLimpiar,
    setEmail: UsuarioActions.setEmail,
    setLogin: UsuarioActions.setLogin,
    setPassword: UsuarioActions.setPassword,
    setEstado: UsuarioActions.setEstado,
    onEdit: UsuarioActions.onEdit,
    onUpdate: UsuarioActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditUsuario );
