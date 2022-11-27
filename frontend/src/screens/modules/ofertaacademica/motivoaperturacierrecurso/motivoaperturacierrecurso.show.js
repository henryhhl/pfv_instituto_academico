
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { Functions } from '../../../../utils/functions';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { MotivoAperturaCierreCursoActions } from '../../../../redux/actions/ofertaacademica/motivoaperturacierrecurso.action';

function ShowMotivoAperturaCierreCurso( props ) {
    const { motivoAperturaCierre } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onShow( params.idmotivoaperturacierrecurso );
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
                    header={"Detalle Motivo Apertura o Cierre"}
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
                                label="Sigla*"
                                value={motivoAperturaCierre.sigla}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-8">
                            <InputComponent
                                label="Motivo*"
                                value={motivoAperturaCierre.descripcion}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='form-group col-4'></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Estado"
                                value={ Functions.getValueEstado( motivoAperturaCierre.estado ) }
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
    motivoAperturaCierre: state.MotivoAperturaCierreCurso,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onShow: MotivoAperturaCierreCursoActions.onShow,
    onLimpiar: MotivoAperturaCierreCursoActions.onLimpiar,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowMotivoAperturaCierreCurso );
