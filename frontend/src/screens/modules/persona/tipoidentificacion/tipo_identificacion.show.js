
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { TipoIdentificacionActions } from '../../../../redux/actions/persona/tipo_identificacion.action';
import { Functions } from '../../../../utils/functions';

function ShowTipoIdentificacion( props ) {
    const { tipoIdentificacion } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onShow( params.idtipoidentificacion );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Detalle Tipo Identificación"}
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
                                value={tipoIdentificacion.sigla}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-8">
                            <InputComponent
                                label="Nombre Tipo Identificación"
                                value={tipoIdentificacion.descripcion}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='form-group col-4'></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Estado"
                                value={ Functions.getValueEstado( tipoIdentificacion.estado ) }
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
    tipoIdentificacion: state.TipoIdentificacion,
} );

const mapDispatchToProps = {
    onShow: TipoIdentificacionActions.onShow,
    onLimpiar: TipoIdentificacionActions.onLimpiar,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowTipoIdentificacion );
