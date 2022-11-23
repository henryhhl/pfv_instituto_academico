
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { UnidadNegocioActions } from '../../../../redux/actions/parametros/unidad_negocio.action';

function CreateUnidadNegocio( props ) {
    const { unidadNegocio } = props;
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
                    header={"Nuevo Unidad Negocio"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(unidadNegocio, onBack) }
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
                        <div className="form-group col-3">
                            <InputComponent
                                label="Sigla*"
                                value={unidadNegocio.sigla}
                                onChange={ (value) => props.setSigla(unidadNegocio, value) }
                                error={unidadNegocio.error.sigla}
                                message={unidadNegocio.message.sigla}
                            />
                        </div>
                        <div className="form-group col-5">
                            <InputComponent
                                label="Nombre Unidad Negocio*"
                                value={unidadNegocio.descripcion}
                                onChange={ (value) => props.setDescripcion(unidadNegocio, value) }
                                error={unidadNegocio.error.descripcion}
                                message={unidadNegocio.message.descripcion}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    unidadNegocio: state.UnidadNegocio,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onLimpiar: UnidadNegocioActions.onLimpiar,
    onCreate: UnidadNegocioActions.onCreate,
    setSigla: UnidadNegocioActions.setSigla,
    setDescripcion: UnidadNegocioActions.setDescripcion,
    onStore: UnidadNegocioActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateUnidadNegocio );
