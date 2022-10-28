
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent, TextAreaComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { PensumActions } from '../../../../redux/actions/estructuraacademica/pensum.action';
import { Functions } from '../../../../utils/functions';

function ShowPensum( props ) {
    const { pensum } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onShow( params.idpensum );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Detalle Pensum"}
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
                        <div className="form-group col-1"></div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Fecha Aprobación"
                                value={pensum.fechaaprobacion}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-7">
                            <InputComponent
                                label="Nombre de Pensum"
                                value={pensum.descripcion}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-12">
                            <TextAreaComponent 
                                label="Nota"
                                value={pensum.nota}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-12">
                            <InputComponent
                                label="Programa"
                                value={pensum.programa}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4">
                            <InputComponent
                                label="Unidad Academica"
                                value={pensum.unidadacademica}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Unidad Negocio"
                                value={pensum.unidadnegocio}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Unidad Administrativa"
                                value={pensum.unidadadministrativa}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='form-group col-2'></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Estado Proceso"
                                value={ pensum.estadoproceso }
                                readOnly={true}
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Estado"
                                value={ Functions.getValueEstado( pensum.estado ) }
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
    pensum: state.Pensum,
} );

const mapDispatchToProps = {
    onShow: PensumActions.onShow,
    onLimpiar: PensumActions.onLimpiar,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowPensum );
