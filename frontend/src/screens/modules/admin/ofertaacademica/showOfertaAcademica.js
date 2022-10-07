
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { OfertaAcademicaActions } from '../../../../redux/actions/ofertaAcademicaActions';
import { Functions } from '../../../../utils/functions';

function ShowOfertaAcademica( props ) {
    const { ofertaAcademica } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onShow( params.idofertaacademica );
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
                                    <h4>Detalle Oferta Academica</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="form-group col-2"></div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Sigla"
                                                value={ofertaAcademica.sigla}
                                                readOnly
                                            />
                                        </div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Descripción"
                                                value={ofertaAcademica.descripcion}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='form-group col-4'></div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Estado"
                                                value={ Functions.getValueEstado( ofertaAcademica.estado ) }
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
    ofertaAcademica: state.OfertaAcademica,
} );

const mapDispatchToProps = {
    onLimpiar: OfertaAcademicaActions.onLimpiar,
    onShow: OfertaAcademicaActions.onShow,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowOfertaAcademica );
