
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { UnidadNegocioActions } from '../../../../redux/actions/unidadNegocioActions';
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
            <div className="main-content">
                <section className="section">
                    <h1 className="section-header">
                        <div>
                        </div>
                    </h1>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Detalle Unidad Negocio</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="form-group col-2"></div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Sigla"
                                                value={unidadNegocio.sigla}
                                                readOnly
                                            />
                                        </div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Descripción"
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
                                </div>
                                <div className="card-footer">
                                    <ButtonComponent
                                        onClick={onBack}
                                    >
                                        Aceptar
                                    </ButtonComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
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
