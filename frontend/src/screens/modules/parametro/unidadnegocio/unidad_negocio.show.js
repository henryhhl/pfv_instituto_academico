
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { UnidadNegocioActions } from '../../../../redux/actions/parametros/unidad_negocio.action';
import { Functions } from '../../../../utils/functions';

function ShowUnidadNegocio( props ) {
    const { unidadNegocio } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onShow( params.idunidadnegocio );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Detalle Unidad Negocio"}
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
                        <div className="form-group col-3">
                            <InputComponent
                                label="Sigla"
                                value={unidadNegocio.sigla}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-5">
                            <InputComponent
                                label="Nombre Unidad Negocio"
                                value={unidadNegocio.descripcion}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='form-group col-4'></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Estado"
                                value={ Functions.getValueEstado( unidadNegocio.estado ) }
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
    unidadNegocio: state.UnidadNegocio,
} );

const mapDispatchToProps = {
    onLimpiar: UnidadNegocioActions.onLimpiar,
    onShow: UnidadNegocioActions.onShow,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowUnidadNegocio );
