
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../components/card';
import ListComponent from '../../../components/list';
import PaperComponent from '../../../components/paper';
import InputComponent from '../../../components/input';
import ButtonComponent from '../../../components/button';
import RolListadoModal from './rol/modal/rol_listado.modal';
import UsuarioListadoModal from './usuario/modal/usuario_listado.modal';
import { AuthActions } from '../../../redux/actions/auth/auth.action';
import { AsignarRolActions } from '../../../redux/actions/seguridad/asignarrol.action';

function IndexAsignarRol( props ) {
    const navigate = useNavigate();
    const { asignarRol } = props;

    const [ visibleUsuario, setVisibleUsuario ] = React.useState(false);
    const [ visibleRol, setVisibleRol ] = React.useState(false);

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin );
        return () => {};
    }, [] );

    const onLogin = () => {
        navigate( '/login' );
    };

    const onComponentUsuario = () => {
        if ( !visibleUsuario ) return null;
        return (
            <UsuarioListadoModal
                visible={visibleUsuario}
                onClose={ () => setVisibleUsuario(false) }
                onSelect={ (usuario) => {
                    props.setFkIDUsuario(asignarRol, usuario);
                    props.getAll(asignarRol);
                    setVisibleUsuario(false);
                } }
            />
        );
    };

    const onComponentRol = () => {
        if ( !visibleRol ) return null;
        return (
            <RolListadoModal
                visible={visibleRol}
                onClose={ () => setVisibleRol(false) }
                onSelect={ (rol) => {
                    props.setFKIDRol(asignarRol, rol);
                    setVisibleRol(false);
                } }
            />
        );
    };

    return (
        <>
            { onComponentUsuario() }
            { onComponentRol() }
            <PaperComponent>
                <CardComponent
                    header={"Asignar Rol"}
                >
                    <div className="row">
                        <div className="form-group col-2"></div>
                        <div className="form-group col-4">
                            <InputComponent
                                placeholder="SELECCIONAR USUARIO"
                                value={asignarRol.usuario}
                                onClick={ () => setVisibleUsuario(true) }
                                readOnly
                                style={{ background: 'white', cursor: 'pointer', }}
                                label={'Usuario'}
                                message={asignarRol.message.fkidusuario}
                                error={asignarRol.error.fkidusuario}
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                placeholder="SELECCIONAR ROL"
                                value={asignarRol.rol}
                                onClick={ () => setVisibleRol(true) }
                                readOnly
                                style={{ background: 'white', cursor: 'pointer', }}
                                label={'Rol'}
                                message={asignarRol.message.fkidrol}
                                error={asignarRol.error.fkidrol}
                            />
                        </div>
                        <div className="form-group col-12">
                            <ButtonComponent
                                fullWidth
                                onClick={ () => {
                                    props.onAsignar(asignarRol);
                                } }
                            >
                                Asignar
                            </ButtonComponent>
                        </div>
                    </div>
                    <CardComponent
                        header={"ROL DEL USUARIO"}
                    >
                        <ListComponent
                            dataSource={asignarRol.arrayGrupo}
                            isObjectTitle={true}
                            idTitle={'rol'}
                            title={'descripcion'}
                            onClose={(item) => {
                                asignarRol.idasignarrol = item.idasignarrol;
                                props.onDelete(asignarRol);
                            }}
                        />
                    </CardComponent>
                </CardComponent>
            </PaperComponent>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
    asignarRol: state.AsignarRol,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onLimpiar: AsignarRolActions.onLimpiar,
    getAll: AsignarRolActions.getAll,
    setFkIDUsuario: AsignarRolActions.setFkIDUsuario,
    setFKIDRol: AsignarRolActions.setFKIDRol,
    onAsignar: AsignarRolActions.onAsignar,
    onDelete: AsignarRolActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexAsignarRol);
