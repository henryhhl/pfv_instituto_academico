
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { GestionPeriodoActions } from '../../../../redux/actions/estructurainstitucional/gestion_periodo.action';
import { Functions } from '../../../../utils/functions';

function ShowGestionPeriodo( props ) {
    const { gestionPeriodo } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onShow( params.idgestionperiodo );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Detalle Gestión Periodo"}
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
                        <div className="form-group col-3"></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Nombre Periodo"
                                value={gestionPeriodo.descripcion}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-2">
                            <InputComponent
                                label="Orden"
                                value={gestionPeriodo.orden}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4">
                            <InputComponent
                                label="Fecha Inicio"
                                value={gestionPeriodo.fechainicio}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Fecha Final"
                                value={gestionPeriodo.fechafinal}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Estado"
                                value={ Functions.getValueEstado( gestionPeriodo.estado ) }
                                readOnly
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    gestionPeriodo: state.GestionPeriodo,
} );

const mapDispatchToProps = {
    onShow: GestionPeriodoActions.onShow,
    onLimpiar: GestionPeriodoActions.onLimpiar,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowGestionPeriodo );
