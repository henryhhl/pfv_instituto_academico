
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { TipoActividadActions } from '../../../../redux/actions/oportunidad/tipoactividad.action';

function CreateTipoActividad( props ) {
    const { tipoActividad } = props;
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
                    header={"Nuevo Tipo Actividad"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(tipoActividad, onBack) }
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
                                value={tipoActividad.sigla}
                                onChange={ (value) => props.setSigla(tipoActividad, value) }
                                error={tipoActividad.error.sigla}
                                message={tipoActividad.message.sigla}
                            />
                        </div>
                        <div className="form-group col-8">
                            <InputComponent
                                label="Tipo*"
                                value={tipoActividad.descripcion}
                                onChange={ (value) => props.setDescripcion(tipoActividad, value) }
                                error={tipoActividad.error.descripcion}
                                message={tipoActividad.message.descripcion}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    tipoActividad: state.TipoActividad,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onCreate: TipoActividadActions.onCreate,
    onLimpiar: TipoActividadActions.onLimpiar,
    setSigla: TipoActividadActions.setSigla,
    setDescripcion: TipoActividadActions.setDescripcion,
    onStore: TipoActividadActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateTipoActividad );
