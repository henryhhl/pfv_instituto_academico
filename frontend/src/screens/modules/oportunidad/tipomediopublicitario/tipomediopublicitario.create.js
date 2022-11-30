
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { TipoMedioPublicitarioActions } from '../../../../redux/actions/oportunidad/tipomediopublicitario.action';

function CreateTipoMedioPublicitario( props ) {
    const { tipoMedioPublicitario } = props;
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
                    header={"Nuevo Tipo Medio Publicitario"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(tipoMedioPublicitario, onBack) }
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
                                value={tipoMedioPublicitario.sigla}
                                onChange={ (value) => props.setSigla(tipoMedioPublicitario, value) }
                                error={tipoMedioPublicitario.error.sigla}
                                message={tipoMedioPublicitario.message.sigla}
                            />
                        </div>
                        <div className="form-group col-8">
                            <InputComponent
                                label="Tipo*"
                                value={tipoMedioPublicitario.descripcion}
                                onChange={ (value) => props.setDescripcion(tipoMedioPublicitario, value) }
                                error={tipoMedioPublicitario.error.descripcion}
                                message={tipoMedioPublicitario.message.descripcion}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    tipoMedioPublicitario: state.TipoMedioPublicitario,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onCreate: TipoMedioPublicitarioActions.onCreate,
    onLimpiar: TipoMedioPublicitarioActions.onLimpiar,
    setSigla: TipoMedioPublicitarioActions.setSigla,
    setDescripcion: TipoMedioPublicitarioActions.setDescripcion,
    onStore: TipoMedioPublicitarioActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateTipoMedioPublicitario );
