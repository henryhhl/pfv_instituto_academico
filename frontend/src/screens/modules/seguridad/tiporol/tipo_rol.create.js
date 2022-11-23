
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { TipoRolActions } from '../../../../redux/actions/seguridad/tipoRol.action';

function CreateTipoRol( props ) {
    const { tipoRol } = props;
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
                    header={"Nuevo Tipo Rol"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(tipoRol, onBack) }
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
                                label="Nombre Tipo Rol*"
                                value={tipoRol.descripcion}
                                onChange={ (value) => props.setDescripcion(tipoRol, value) }
                                error={tipoRol.error.descripcion}
                                message={tipoRol.message.descripcion}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    tipoRol: state.TipoRol,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onLimpiar: TipoRolActions.onLimpiar,
    onCreate: TipoRolActions.onCreate,
    setDescripcion: TipoRolActions.setDescripcion,
    onStore: TipoRolActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateTipoRol );
