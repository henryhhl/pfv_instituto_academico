
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import { EstadoData } from '../../../../data/estado.data';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { CargoActions } from '../../../../redux/actions/persona/cargo.action';

function EditCargo( props ) {
    const { cargo } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onEdit( params.idcargo );
            }
        } );
        return () => {};
    }, [] );

    const onLogin = () => {
        navigate( '/login' );
    };

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Editar Cargo"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(cargo, onBack) }
                            >
                                Editar
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
                        <div className="form-group col-8">
                            <InputComponent
                                label="Nombre de Cargo*"
                                value={cargo.descripcion}
                                onChange={ (value) => props.setDescripcion(cargo, value) }
                                error={cargo.error.descripcion}
                                message={cargo.message.descripcion}
                            />
                        </div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado*"}
                                value={cargo.estado}
                                onChange={ (value) => props.setEstado(cargo, value) }
                                error={cargo.error.estado}
                                message={cargo.message.estado}
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
    onEdit: CargoActions.onEdit,
    onLimpiar: CargoActions.onLimpiar,
    setDescripcion: CargoActions.setDescripcion,
    setEstado: CargoActions.setEstado,
    onUpdate: CargoActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditCargo );
