
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { TurnoActions } from '../../../../redux/actions/estructurainstitucional/turno.action';

function CreateTurno( props ) {
    const { turno } = props;
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
                    header={"Nuevo Turno"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(turno, onBack) }
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
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    turno: state.Turno,
} );

const mapDispatchToProps = {
    onCreate: TurnoActions.onCreate,
    onLimpiar: TurnoActions.onLimpiar,
    setSigla: TurnoActions.setSigla,
    setDescripcion: TurnoActions.setDescripcion,
    onStore: TurnoActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateTurno );
