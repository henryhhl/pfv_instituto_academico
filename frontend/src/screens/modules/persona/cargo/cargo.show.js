
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { CargoActions } from '../../../../redux/actions/persona/cargo.action';
import { Functions } from '../../../../utils/functions';

function ShowCargo( props ) {
    const { cargo } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onShow( params.idcargo );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Detalle Cargo"}
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
                        <div className="form-group col-8">
                            <InputComponent
                                label="Nombre de Cargo"
                                value={cargo.descripcion}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Estado"
                                value={ Functions.getValueEstado( cargo.estado ) }
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
    cargo: state.Cargo,
} );

const mapDispatchToProps = {
    onShow: CargoActions.onShow,
    onLimpiar: CargoActions.onLimpiar,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowCargo );
