
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UnidadNegocioActions } from '../../../../redux/actions/parametros/unidad_negocio.action';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';

function CreateUnidadNegocio( props ) {
    const { unidadNegocio } = props;
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
    onLimpiar: UnidadNegocioActions.onLimpiar,
    onCreate: UnidadNegocioActions.onCreate,
    setSigla: UnidadNegocioActions.setSigla,
    setDescripcion: UnidadNegocioActions.setDescripcion,
    onStore: UnidadNegocioActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateUnidadNegocio );
