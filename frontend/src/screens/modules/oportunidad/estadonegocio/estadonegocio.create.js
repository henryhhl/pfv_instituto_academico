
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { EstadoNegocioActions } from '../../../../redux/actions/oportunidad/estadonegocio.action';

function CreateEstadoNegocio( props ) {
    const { estadoNegocio } = props;
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
                    header={"Nuevo Estado Negocio"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(estadoNegocio, onBack) }
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
                        <div className="form-group col-3">
                            <InputComponent
                                label="Sigla*"
                                value={estadoNegocio.sigla}
                                onChange={ (value) => props.setSigla(estadoNegocio, value) }
                                error={estadoNegocio.error.sigla}
                                message={estadoNegocio.message.sigla}
                            />
                        </div>
                        <div className="form-group col-6">
                            <InputComponent
                                label="Nombre Estado*"
                                value={estadoNegocio.descripcion}
                                onChange={ (value) => props.setDescripcion(estadoNegocio, value) }
                                error={estadoNegocio.error.descripcion}
                                message={estadoNegocio.message.descripcion}
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Valor*"
                                value={estadoNegocio.valorporcentaje}
                                onChange={ (value) => props.setValorPorcentaje(estadoNegocio, value) }
                                error={estadoNegocio.error.valorporcentaje}
                                message={estadoNegocio.message.valorporcentaje}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    estadoNegocio: state.EstadoNegocio,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onCreate: EstadoNegocioActions.onCreate,
    onLimpiar: EstadoNegocioActions.onLimpiar,
    setSigla: EstadoNegocioActions.setSigla,
    setDescripcion: EstadoNegocioActions.setDescripcion,
    setValorPorcentaje: EstadoNegocioActions.setValorPorcentaje,
    onStore: EstadoNegocioActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateEstadoNegocio );
