
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { TipoResultadoActions } from '../../../../redux/actions/oportunidad/tiporesultado.action';

function CreateTipoResultado( props ) {
    const { tipoResultado } = props;
    const navigate = useNavigate();

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onCreate();
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
                    header={"Nuevo Tipo Resultado"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(tipoResultado, onBack) }
                            >
                                Guardar
                            </ButtonComponent>
                            <ButtonComponent
                                type='danger' onClick={onBack}
                            >
                                Cancelar
                            </ButtonComponent>
                        </>
                    }
                >
                    <div className="row">
                        <div className="form-group col-4">
                            <InputComponent
                                label="Sigla*"
                                value={tipoResultado.sigla}
                                onChange={ (value) => props.setSigla(tipoResultado, value) }
                                error={tipoResultado.error.sigla}
                                message={tipoResultado.message.sigla}
                            />
                        </div>
                        <div className="form-group col-8">
                            <InputComponent
                                label="Tipo*"
                                value={tipoResultado.descripcion}
                                onChange={ (value) => props.setDescripcion(tipoResultado, value) }
                                error={tipoResultado.error.descripcion}
                                message={tipoResultado.message.descripcion}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    tipoResultado: state.TipoResultado,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onCreate: TipoResultadoActions.onCreate,
    onLimpiar: TipoResultadoActions.onLimpiar,
    setSigla: TipoResultadoActions.setSigla,
    setDescripcion: TipoResultadoActions.setDescripcion,
    onStore: TipoResultadoActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateTipoResultado );
