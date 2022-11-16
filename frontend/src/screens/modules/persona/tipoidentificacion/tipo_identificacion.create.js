
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { TipoIdentificacionActions } from '../../../../redux/actions/persona/tipo_identificacion.action';

function CreateTipoIdentificacion( props ) {
    const { tipoIdentificacion } = props;
    const navigate = useNavigate();

    React.useEffect( () => {
        props.onCreate();
        return () => {};
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Nuevo Tipo Identificación"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(tipoIdentificacion, onBack) }
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
                        <div className="form-group col-4">
                            <InputComponent
                                label="Sigla*"
                                value={tipoIdentificacion.sigla}
                                onChange={ (value) => props.setSigla(tipoIdentificacion, value) }
                                error={tipoIdentificacion.error.sigla}
                                message={tipoIdentificacion.message.sigla}
                            />
                        </div>
                        <div className="form-group col-8">
                            <InputComponent
                                label="Nombre Tipo Identificación"
                                value={tipoIdentificacion.descripcion}
                                onChange={ (value) => props.setDescripcion(tipoIdentificacion, value) }
                                error={tipoIdentificacion.error.descripcion}
                                message={tipoIdentificacion.message.descripcion}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    tipoIdentificacion: state.TipoIdentificacion,
} );

const mapDispatchToProps = {
    onCreate: TipoIdentificacionActions.onCreate,
    onLimpiar: TipoIdentificacionActions.onLimpiar,
    setSigla: TipoIdentificacionActions.setSigla,
    setDescripcion: TipoIdentificacionActions.setDescripcion,
    onStore: TipoIdentificacionActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateTipoIdentificacion );
