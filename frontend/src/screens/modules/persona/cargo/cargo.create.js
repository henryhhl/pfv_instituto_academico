
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { CargoActions } from '../../../../redux/actions/persona/cargo.action';

function CreateCargo( props ) {
    const { cargo } = props;
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
                    header={"Nuevo Cargo"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(cargo, onBack) }
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
                        <div className="form-group col-2"></div>
                        <div className="form-group col-8">
                            <InputComponent
                                label="Nombre de Cargo*"
                                value={cargo.descripcion}
                                onChange={ (value) => props.setDescripcion(cargo, value) }
                                error={cargo.error.descripcion}
                                message={cargo.message.descripcion}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    cargo: state.Cargo,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onCreate: CargoActions.onCreate,
    onLimpiar: CargoActions.onLimpiar,
    setDescripcion: CargoActions.setDescripcion,
    onStore: CargoActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateCargo );
