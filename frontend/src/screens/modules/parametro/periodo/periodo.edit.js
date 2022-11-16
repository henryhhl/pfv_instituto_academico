
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { EstadoData } from '../../../../data/estado.data';
import { PeriodoActions } from '../../../../redux/actions/parametros/periodo.action';

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
            <PaperComponent>
                <CardComponent
                    header={"Editar Periodo"}
                    footer={
                        <>
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
                        </>
                    }
                >
                    <div className="row">
                        <div className="form-group col-2"></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Sigla*"
                                value={periodo.sigla}
                                onChange={ (value) => props.setSigla(periodo, value) }
                                error={periodo.error.sigla}
                                message={periodo.message.sigla}
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Nombre Periodo*"
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
                                label={"Estado*"}
                                value={periodo.estado}
                                onChange={ (value) => props.setEstado(periodo, value) }
                                error={periodo.error.estado}
                                message={periodo.message.estado}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
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
