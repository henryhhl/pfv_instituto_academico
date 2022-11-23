
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { TipoPermisoActions } from '../../../../redux/actions/seguridad/tipoPermiso.action';

function CreateTipoPermiso( props ) {
    const { tipoPermiso } = props;
    const navigate = useNavigate();

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

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Nuevo Tipo Permiso"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(tipoPermiso, onBack) }
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
                        <div className="form-group col-3"></div>
                        <div className="form-group col-6">
                            <InputComponent
                                label="Nombre Tipo Permiso*"
                                value={tipoPermiso.descripcion}
                                onChange={ (value) => props.setDescripcion(tipoPermiso, value) }
                                error={tipoPermiso.error.descripcion}
                                message={tipoPermiso.message.descripcion}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    tipoPermiso: state.TipoPermiso,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onCreate: TipoPermisoActions.onCreate,
    onLimpiar: TipoPermisoActions.onLimpiar,
    setDescripcion: TipoPermisoActions.setDescripcion,
    onStore: TipoPermisoActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateTipoPermiso );
