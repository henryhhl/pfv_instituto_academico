
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent, TextAreaComponent } from '../../../../components/components';
import ListadoTipoRolModal from '../tiporol/modal/listado.modal';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { RolActions } from '../../../../redux/actions/seguridad/rol.action';

function CreateRol( props ) {
    const { rol } = props;
    const navigate = useNavigate();
    const [ visibleTipoRol, setVisibleTipoRol ] = React.useState( false );

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onCreate();
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

    const onComponentTipoRol = () => {
        if ( !visibleTipoRol ) return null;
        return (
            <ListadoTipoRolModal
                visible={visibleTipoRol}
                onClose={ () => setVisibleTipoRol(false) }
                onSelect={ (tipoRol) => {
                    props.setFKIDTipoRol(rol, tipoRol);
                    setVisibleTipoRol(false);
                } }
            />
        );
    };

    return (
        <>
            { onComponentTipoRol() }
            <PaperComponent>
                <CardComponent
                    header={"Nuevo Rol"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(rol, onBack) }
                            >
                                Guardar
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
                        <div className="form-group col-2"></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Nombre Rol*"
                                value={rol.descripcion}
                                onChange={ (value) => props.setDescripcion(rol, value) }
                                error={rol.error.descripcion}
                                message={rol.message.descripcion}
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Tipo Rol*"
                                value={rol.tiporol}
                                onClick={ () => setVisibleTipoRol(true) }
                                error={rol.error.fkidtiporol}
                                message={rol.message.fkidtiporol}
                                readOnly
                                style={{ background: 'white', cursor: 'pointer', }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-12">
                            <TextAreaComponent 
                                label="Nota"
                                value={rol.nota}
                                onChange={ (value) => props.setNota(rol, value) }
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    rol: state.Rol,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onCreate: RolActions.onCreate,
    onLimpiar: RolActions.onLimpiar,
    setDescripcion: RolActions.setDescripcion,
    setFKIDTipoRol: RolActions.setFKIDTipoRol,
    setNota: RolActions.setNota,
    onStore: RolActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateRol );
