
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { ReferenciaContactoActions } from '../../../../redux/actions/parametros/referencia_contacto.action';

function CreateReferenciaContacto( props ) {
    const { referenciaContacto } = props;
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
                    header={"Nuevo Referencia Contacto"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(referenciaContacto, onBack) }
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
                        <div className="form-group col-3"></div>
                        <div className="form-group col-6">
                            <InputComponent
                                label="Nombre Referencia Contacto*"
                                value={referenciaContacto.descripcion}
                                onChange={ (value) => props.setDescripcion(referenciaContacto, value) }
                                error={referenciaContacto.error.descripcion}
                                message={referenciaContacto.message.descripcion}
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
    onValidateToken: AuthActions.onValidateToken,
    onLimpiar: ReferenciaContactoActions.onLimpiar,
    onCreate: ReferenciaContactoActions.onCreate,
    setDescripcion: ReferenciaContactoActions.setDescripcion,
    setTipoReferenciaContacto: ReferenciaContactoActions.setTipoReferenciaContacto,
    onStore: ReferenciaContactoActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateReferenciaContacto );
