
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { ParametroCalificacionActions } from '../../../../redux/actions/nota/parametrocalificacion.action';

function CreateParametroCalificacion( props ) {
    const { parametroCalificacion } = props;
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
                    header={"Nuevo Parametro Calificación"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(parametroCalificacion, onBack) }
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
                                value={parametroCalificacion.sigla}
                                onChange={ (value) => props.setSigla(parametroCalificacion, value) }
                                error={parametroCalificacion.error.sigla}
                                message={parametroCalificacion.message.sigla}
                            />
                        </div>
                        <div className="form-group col-6">
                            <InputComponent
                                label="Descripción*"
                                value={parametroCalificacion.descripcion}
                                onChange={ (value) => props.setDescripcion(parametroCalificacion, value) }
                                error={parametroCalificacion.error.descripcion}
                                message={parametroCalificacion.message.descripcion}
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Valor*"
                                value={parametroCalificacion.valorporcentaje}
                                onChange={ (value) => props.setValorPorcentaje(parametroCalificacion, value) }
                                error={parametroCalificacion.error.valorporcentaje}
                                message={parametroCalificacion.message.valorporcentaje}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    parametroCalificacion: state.ParametroCalificacion,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onCreate: ParametroCalificacionActions.onCreate,
    onLimpiar: ParametroCalificacionActions.onLimpiar,
    setSigla: ParametroCalificacionActions.setSigla,
    setDescripcion: ParametroCalificacionActions.setDescripcion,
    setValorPorcentaje: ParametroCalificacionActions.setValorPorcentaje,
    onStore: ParametroCalificacionActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateParametroCalificacion );
