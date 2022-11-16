
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { Functions } from '../../../../utils/functions';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
import { ReferenciaContactoActions } from '../../../../redux/actions/parametros/referencia_contacto.action';

function ShowReferenciaContacto( props ) {
    const { referenciaContacto } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onShow( params.idreferenciacontacto );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Detalle Referencia Contacto"}
                    footer={
                        <ButtonComponent
                            onClick={onBack}
                        >
                            Aceptar
                        </ButtonComponent>
                    }
                >
                    <div className="row">
                        <div className="form-group col-1"></div>
                        <div className="form-group col-6">
                            <InputComponent
                                label="Nombre Referencia Contacto"
                                value={referenciaContacto.descripcion}
                                readOnly={true}
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Estado"
                                value={ Functions.getValueEstado( referenciaContacto.estado ) }
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
    referenciaContacto: state.ReferenciaContacto,
} );

const mapDispatchToProps = {
    onLimpiar: ReferenciaContactoActions.onLimpiar,
    onShow: ReferenciaContactoActions.onShow,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowReferenciaContacto );
