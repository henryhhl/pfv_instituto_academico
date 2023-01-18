
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import { EstadoData } from '../../../../data/estado.data';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { ParametroCalificacionActions } from '../../../../redux/actions/nota/parametrocalificacion.action';

function EditParametroCalificacion( props ) {
    const { parametroCalificacion } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onEdit( params.idparametrocalificacion );
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
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Editar Parametro Calificación"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(parametroCalificacion, onBack) }
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
                    <div className="row">
                        <div className="form-group col-4"></div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado*"}
                                value={parametroCalificacion.estado}
                                onChange={ (value) => props.setEstado(parametroCalificacion, value) }
                                error={parametroCalificacion.error.estado}
                                message={parametroCalificacion.message.estado}
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
    onEdit: ParametroCalificacionActions.onEdit,
    onLimpiar: ParametroCalificacionActions.onLimpiar,
    setSigla: ParametroCalificacionActions.setSigla,
    setDescripcion: ParametroCalificacionActions.setDescripcion,
    setValorPorcentaje: ParametroCalificacionActions.setValorPorcentaje,
    setEstado: ParametroCalificacionActions.setEstado,
    onUpdate: ParametroCalificacionActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditParametroCalificacion );
