
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { Functions } from '../../../../utils/functions';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { EstadoNegocioActions } from '../../../../redux/actions/oportunidad/estadonegocio.action';

function ShowEstadoNegocio( props ) {
    const { estadoNegocio } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onShow( params.idestadonegocio );
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
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Detalle Estado Negocio"}
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
                        <div className="form-group col-3">
                            <InputComponent
                                label="Sigla*"
                                value={estadoNegocio.sigla}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-6">
                            <InputComponent
                                label="Nombre Estado*"
                                value={estadoNegocio.descripcion}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Valor*"
                                value={estadoNegocio.valorporcentaje}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='form-group col-4'></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Estado"
                                value={ Functions.getValueEstado( estadoNegocio.estado ) }
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
    estadoNegocio: state.EstadoNegocio,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onShow: EstadoNegocioActions.onShow,
    onLimpiar: EstadoNegocioActions.onLimpiar,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowEstadoNegocio );
