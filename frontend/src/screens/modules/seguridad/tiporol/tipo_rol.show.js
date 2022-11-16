
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { TipoRolActions } from '../../../../redux/actions/seguridad/tipoRol.action';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { Functions } from '../../../../utils/functions';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';

function ShowTipoRol( props ) {
    const { tipoRol } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onShow( params.idtiporol );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Detalle Tipo Rol"}
                    footer={
                        <ButtonComponent
                            onClick={onBack}
                        >
                            Aceptar
                        </ButtonComponent>
                    }
                >
                    <div className="row">
                        <div className="form-group col-2"></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Nombre Tipo Rol"
                                value={tipoRol.descripcion}
                                readOnly={true}
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Estado"
                                value={ Functions.getValueEstado( tipoRol.estado ) }
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
    tipoRol: state.TipoRol,
} );

const mapDispatchToProps = {
    onLimpiar: TipoRolActions.onLimpiar,
    onShow: TipoRolActions.onShow,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowTipoRol );
