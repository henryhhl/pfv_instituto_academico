
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { TurnoActions } from '../../../../redux/actions/estructurainstitucional/turno.action';
import { Functions } from '../../../../utils/functions';

function ShowTurno( props ) {
    const { turno } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onShow( params.idturno );
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
                                onClick={onBack}
                            >
                                Aceptar
                            </ButtonComponent>
                        </>
                    }
                >
                    <div className="row">
                        <div className="form-group col-4">
                            <InputComponent
                                label="Sigla"
                                value={turno.sigla}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-8">
                            <InputComponent
                                label="Jornada"
                                value={turno.descripcion}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='form-group col-4'></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Estado"
                                value={ Functions.getValueEstado( turno.estado ) }
                                readOnly={true}
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
    onShow: TurnoActions.onShow,
    onLimpiar: TurnoActions.onLimpiar,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowTurno );
