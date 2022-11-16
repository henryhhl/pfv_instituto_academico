
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { TipoPermisoActions } from '../../../../redux/actions/seguridad/tipoPermiso.action';
import { Functions } from '../../../../utils/functions';

function ShowTipoPermiso( props ) {
    const { tipoPermiso } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onShow( params.idtipopermiso );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Detalle Tipo Permiso"}
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
                                label="Nombre Tipo Permiso"
                                value={tipoPermiso.descripcion}
                                readOnly={true}
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Estado"
                                value={ Functions.getValueEstado( tipoPermiso.estado ) }
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
    tipoPermiso: state.TipoPermiso,
} );

const mapDispatchToProps = {
    onLimpiar: TipoPermisoActions.onLimpiar,
    onShow: TipoPermisoActions.onShow,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowTipoPermiso );
