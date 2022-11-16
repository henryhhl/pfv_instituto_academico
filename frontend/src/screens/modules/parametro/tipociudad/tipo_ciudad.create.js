
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
import { TipoCiudadActions } from '../../../../redux/actions/parametros/tipo_ciudad.action';

function CreateTipoCiudad( props ) {
    const { tipoCiudad } = props;
    const navigate = useNavigate();

    React.useEffect( () => {
        props.onCreate();
        return () => {};
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Nuevo Tipo Localidad"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(tipoCiudad, onBack) }
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
                                label="Nombre Tipo Localidad*"
                                value={tipoCiudad.descripcion}
                                onChange={ (value) => props.setDescripcion(tipoCiudad, value) }
                                error={tipoCiudad.error.descripcion}
                                message={tipoCiudad.message.descripcion}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    tipoCiudad: state.TipoCiudad,
} );

const mapDispatchToProps = {
    onLimpiar: TipoCiudadActions.onLimpiar,
    onCreate: TipoCiudadActions.onCreate,
    setDescripcion: TipoCiudadActions.setDescripcion,
    onStore: TipoCiudadActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateTipoCiudad );
