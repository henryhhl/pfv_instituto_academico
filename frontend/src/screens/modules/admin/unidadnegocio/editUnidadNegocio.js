
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { UnidadNegocioActions } from '../../../../redux/actions/unidadNegocioActions';

function EditUnidadNegocio( props ) {
    const { unidadNegocio } = props;
    const navigate = useNavigate();

    function onBack() {
        navigate(-1);
    }

    return (
        <>
            <div className="main-content">
                <section className="section">
                    <h1 className="section-header">
                        <div>
                        </div>
                    </h1>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Editar Unidad Negocio</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="form-group col-2"></div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Sigla"
                                                value={unidadNegocio.sigla}
                                                onChange={ (value) => props.setSigla(unidadNegocio, value) }
                                                error={unidadNegocio.error.sigla}
                                                message={unidadNegocio.message.sigla}
                                            />
                                        </div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Descripción"
                                                value={unidadNegocio.descripcion}
                                                onChange={ (value) => props.setDescripcion(unidadNegocio, value) }
                                                error={unidadNegocio.error.descripcion}
                                                message={unidadNegocio.message.descripcion}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <ButtonComponent
                                        onClick={ () => props.onStore(unidadNegocio) }
                                    >
                                        Editar
                                    </ButtonComponent>
                                    <ButtonComponent
                                        type='danger' onClick={onBack}
                                    >
                                        Cancelar
                                    </ButtonComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    unidadNegocio: state.UnidadNegocio,
} );

const mapDispatchToProps = {
    initData: UnidadNegocioActions.initData,
    setSigla: UnidadNegocioActions.setSigla,
    setDescripcion: UnidadNegocioActions.setDescripcion,
    onStore: UnidadNegocioActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditUnidadNegocio );
