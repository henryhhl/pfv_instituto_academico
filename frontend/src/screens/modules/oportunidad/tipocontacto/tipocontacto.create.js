
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { TipoContactoActions } from '../../../../redux/actions/oportunidad/tipocontacto.action';

function CreateTipoContacto( props ) {
    const { tipoContacto } = props;
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
                    header={"Nuevo Tipo Contacto"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(tipoContacto, onBack) }
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
                                value={tipoContacto.sigla}
                                onChange={ (value) => props.setSigla(tipoContacto, value) }
                                error={tipoContacto.error.sigla}
                                message={tipoContacto.message.sigla}
                            />
                        </div>
                        <div className="form-group col-8">
                            <InputComponent
                                label="Tipo*"
                                value={tipoContacto.descripcion}
                                onChange={ (value) => props.setDescripcion(tipoContacto, value) }
                                error={tipoContacto.error.descripcion}
                                message={tipoContacto.message.descripcion}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    tipoContacto: state.TipoContacto,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onLimpiar: TipoContactoActions.onLimpiar,
    onCreate: TipoContactoActions.onCreate,
    setSigla: TipoContactoActions.setSigla,
    setDescripcion: TipoContactoActions.setDescripcion,
    onStore: TipoContactoActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateTipoContacto );
