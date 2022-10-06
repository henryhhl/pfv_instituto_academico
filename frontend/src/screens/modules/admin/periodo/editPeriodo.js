
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import { EstadoData } from '../../../../data/estado.data';
import { PeriodoActions } from '../../../../redux/actions/periodoActions';

function EditPeriodo( props ) {
    const { periodo } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onEdit( params.idperiodo );
    }, [] );

    function onBack() {
        props.onLimpiar();
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
                                    <h4>Editar Periodo</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="form-group col-2"></div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Sigla"
                                                value={periodo.sigla}
                                                onChange={ (value) => props.setSigla(periodo, value) }
                                                error={periodo.error.sigla}
                                                message={periodo.message.sigla}
                                            />
                                        </div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Descripción"
                                                value={periodo.descripcion}
                                                onChange={ (value) => props.setDescripcion(periodo, value) }
                                                error={periodo.error.descripcion}
                                                message={periodo.message.descripcion}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-4"></div>
                                        <div className="form-group col-4">
                                            <SelectComponent 
                                                data={EstadoData}
                                                label={"Estado"}
                                                value={periodo.estado}
                                                onChange={ (value) => props.setEstado(periodo, value) }
                                                error={periodo.error.estado}
                                                message={periodo.message.estado}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <ButtonComponent
                                        onClick={ () => props.onUpdate(periodo, onBack) }
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
    periodo: state.Periodo,
} );

const mapDispatchToProps = {
    onLimpiar: PeriodoActions.onLimpiar,
    onEdit: PeriodoActions.onEdit,
    setSigla: PeriodoActions.setSigla,
    setDescripcion: PeriodoActions.setDescripcion,
    setEstado: PeriodoActions.setEstado,
    onUpdate: PeriodoActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditPeriodo );
