
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ResponsableActions } from '../../../../redux/actions/estructuraacademica/responsable.action';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
import DatePickerComponent from '../../../../components/date';
import { GeneroData } from '../../../../data/genero.data';
import { Functions } from '../../../../utils/functions';

function ShowResponsable( props ) {
    const { responsable } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onShow( params.idresponsable );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Detalle Responsable"}
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
                        <div className="form-group col-2"></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Código"
                                value={responsable.codigo}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Nro Documento"
                                value={responsable.nrodocumento}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4">
                            <InputComponent
                                label="Nombre"
                                value={responsable.nombre}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-8">
                            <InputComponent
                                label="Apellido"
                                value={responsable.apellido}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4">
                            <InputComponent
                                label="Ciudad"
                                value={responsable.ciudad}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-8">
                            <InputComponent
                                label="Dirección"
                                value={responsable.direccion}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4">
                            <InputComponent 
                                label={"Genero"}
                                value={ Functions.getValueGenero( responsable.genero ) }
                                readOnly
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Fecha Nacimiento"
                                value={responsable.fechanacimiento}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Estado"
                                value={ Functions.getValueEstado( responsable.estado ) }
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
    responsable: state.Responsable,
} );

const mapDispatchToProps = {
    onLimpiar: ResponsableActions.onLimpiar,
    onShow: ResponsableActions.onShow,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowResponsable );
