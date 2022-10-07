
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { OfertaAcademicaActions } from '../../../../redux/actions/ofertaAcademicaActions';

function CreateOfertaAcademica( props ) {
    const { ofertaAcademica } = props;
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
                                    <h4>Nuevo Oferta Academica</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="form-group col-2"></div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Sigla"
                                                value={ofertaAcademica.sigla}
                                                onChange={ (value) => props.setSigla(ofertaAcademica, value) }
                                                error={ofertaAcademica.error.sigla}
                                                message={ofertaAcademica.message.sigla}
                                            />
                                        </div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Descripción"
                                                value={ofertaAcademica.descripcion}
                                                onChange={ (value) => props.setDescripcion(ofertaAcademica, value) }
                                                error={ofertaAcademica.error.descripcion}
                                                message={ofertaAcademica.message.descripcion}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <ButtonComponent
                                        onClick={ () => props.onStore(ofertaAcademica, onBack) }
                                    >
                                        Guardar
                                    </ButtonComponent>
                                    <ButtonComponent
                                        type='danger' onClick={onBack}
                                    >
                                        Cancelar
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
    onCreate: OfertaAcademicaActions.onCreate,
    setSigla: OfertaAcademicaActions.setSigla,
    setDescripcion: OfertaAcademicaActions.setDescripcion,
    onStore: OfertaAcademicaActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateOfertaAcademica );
