
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { ModalidadAcademicaActions } from '../../../../redux/actions/modalidadAcademicaActions';
import { Functions } from '../../../../utils/functions';

function ShowModalidadAcademica( props ) {
    const { modalidadAcademica } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onShow( params.idmodalidadacademica );
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
                                    <h4>Detalle Modalidad Academica</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="form-group col-2"></div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Sigla"
                                                value={modalidadAcademica.sigla}
                                                readOnly
                                            />
                                        </div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Descripción"
                                                value={modalidadAcademica.descripcion}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='form-group col-4'></div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Estado"
                                                value={ Functions.getValueEstado( modalidadAcademica.estado ) }
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
    modalidadAcademica: state.ModalidadAcademica,
} );

const mapDispatchToProps = {
    onLimpiar: ModalidadAcademicaActions.onLimpiar,
    onShow: ModalidadAcademicaActions.onShow,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowModalidadAcademica );
