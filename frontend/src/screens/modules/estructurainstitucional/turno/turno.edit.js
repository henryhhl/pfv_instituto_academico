
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { EstadoData } from '../../../../data/estado.data';
import { TurnoActions } from '../../../../redux/actions/estructurainstitucional/turno.action';

function EditTurno( props ) {
    const { turno } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onEdit( params.idturno );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Editar Turno"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(turno, onBack) }
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
                        <div className="form-group col-4">
                            <InputComponent
                                label="Sigla*"
                                value={turno.sigla}
                                onChange={ (value) => props.setSigla(turno, value) }
                                error={turno.error.sigla}
                                message={turno.message.sigla}
                            />
                        </div>
                        <div className="form-group col-8">
                            <InputComponent
                                label="Jornada*"
                                value={turno.descripcion}
                                onChange={ (value) => props.setDescripcion(turno, value) }
                                error={turno.error.descripcion}
                                message={turno.message.descripcion}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4"></div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado*"}
                                value={turno.estado}
                                onChange={ (value) => props.setEstado(turno, value) }
                                error={turno.error.estado}
                                message={turno.message.estado}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    turno: state.Turno,
} );

const mapDispatchToProps = {
    onEdit: TurnoActions.onEdit,
    onLimpiar: TurnoActions.onLimpiar,
    setSigla: TurnoActions.setSigla,
    setDescripcion: TurnoActions.setDescripcion,
    setEstado: TurnoActions.setEstado,
    onUpdate: TurnoActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditTurno );
