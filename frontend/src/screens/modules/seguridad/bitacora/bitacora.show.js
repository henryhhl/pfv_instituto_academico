
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { Functions } from '../../../../utils/functions';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { BitacoraActions } from '../../../../redux/actions/seguridad/bitacora.action';

function ShowBitacora( props ) {
    const { bitacora } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onShow( params.idbitacora );
            }
        } );
        return () => {};
    }, [] );

    const onLogin = () => {
        navigate( '/login' );
    };

    const onBack = () => {
        props.onLimpiar();
        navigate(-1);
    };

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Detalle Bitacora"}
                    footer={
                        <ButtonComponent
                            onClick={onBack}
                        >
                            Aceptar
                        </ButtonComponent>
                    }
                >
                    <div className="row">
                        <div className="form-group col-4">
                            <InputComponent
                                label="Acción"
                                value={bitacora.accion}
                                readOnly={true}
                            />
                        </div>
                        <div className="form-group col-8">
                            <InputComponent
                                label="Descripción"
                                value={bitacora.descripcion}
                                readOnly={true}
                            />
                        </div>
                        {/* <div className="form-group col-4">
                            <InputComponent
                                label="Estado"
                                value={ Functions.getValueEstado( bitacora.estado ) }
                                readOnly={true}
                            />
                        </div> */}
                    </div>
                    <div className="row">
                        <div className="form-group col-3">
                            <InputComponent
                                label="Tabla"
                                value={bitacora.tabla}
                                readOnly={true}
                            />
                        </div>
                        <div className="form-group col-6">
                            <InputComponent
                                label="Uri"
                                value={bitacora.uri}
                                readOnly={true}
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="IP"
                                value={bitacora.ip}
                                readOnly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <InputComponent
                                label="Nombre Usuario"
                                value={bitacora.usuario?.nombreprincipal}
                                readOnly={true}
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Fecha"
                                value={bitacora.x_fecha}
                                readOnly={true}
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Hora"
                                value={bitacora.x_hora}
                                readOnly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-8">
                            <InputComponent
                                label="Email"
                                value={bitacora.usuario?.email}
                                readOnly={true}
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Usuario"
                                value={bitacora.usuario?.login}
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
    bitacora: state.Bitacora,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onLimpiar: BitacoraActions.onLimpiar,
    onShow: BitacoraActions.onShow,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowBitacora );
