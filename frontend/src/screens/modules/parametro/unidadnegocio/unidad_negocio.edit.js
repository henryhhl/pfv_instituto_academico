
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { EstadoData } from '../../../../data/estado.data';
import { UnidadNegocioActions } from '../../../../redux/actions/parametros/unidad_negocio.action';

function EditUnidadNegocio( props ) {
    const { unidadNegocio } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onEdit( params.idunidadnegocio );
    }, [] );

    function onBack() {
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Editar Unidad Negocio"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(unidadNegocio, onBack) }
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
                    <div className="row">
                        <div className="form-group col-4"></div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado*"}
                                value={unidadNegocio.estado}
                                onChange={ (value) => props.setEstado(unidadNegocio, value) }
                                error={unidadNegocio.error.estado}
                                message={unidadNegocio.message.estado}
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
    onEdit: UnidadNegocioActions.onEdit,
    setSigla: UnidadNegocioActions.setSigla,
    setDescripcion: UnidadNegocioActions.setDescripcion,
    setEstado: UnidadNegocioActions.setEstado,
    onUpdate: UnidadNegocioActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditUnidadNegocio );
