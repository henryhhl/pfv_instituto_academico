
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { Functions } from '../../../../utils/functions';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
import { TipoCiudadActions } from '../../../../redux/actions/parametros/tipo_ciudad.action';

function ShowTipoCiudad( props ) {
    const { tipoCiudad } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onShow( params.idtipociudad );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Detalle Tipo Localidad"}
                    footer={
                        <ButtonComponent
                            onClick={onBack}
                        >
                            Aceptar
                        </ButtonComponent>
                    }
                >
                    <div className="row">
                        <div className="form-group col-2"></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Nombre Tipo Localidad"
                                value={tipoCiudad.descripcion}
                                readOnly={true}
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Estado"
                                value={ Functions.getValueEstado( tipoCiudad.estado ) }
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
    tipoCiudad: state.TipoCiudad,
} );

const mapDispatchToProps = {
    onLimpiar: TipoCiudadActions.onLimpiar,
    onShow: TipoCiudadActions.onShow,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowTipoCiudad );
