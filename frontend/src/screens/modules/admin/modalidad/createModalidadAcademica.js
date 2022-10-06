
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { ModalidadAcademicaActions } from '../../../../redux/actions/modalidadAcademicaActions';

function CreateModalidadAcademica( props ) {
    const { modalidadAcademica } = props;
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
                                    <h4>Nuevo Modalidad Academica</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="form-group col-2"></div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Sigla"
                                                value={modalidadAcademica.sigla}
                                                onChange={ (value) => props.setSigla(modalidadAcademica, value) }
                                                error={modalidadAcademica.error.sigla}
                                                message={modalidadAcademica.message.sigla}
                                            />
                                        </div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Descripción"
                                                value={modalidadAcademica.descripcion}
                                                onChange={ (value) => props.setDescripcion(modalidadAcademica, value) }
                                                error={modalidadAcademica.error.descripcion}
                                                message={modalidadAcademica.message.descripcion}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <ButtonComponent
                                        onClick={ () => props.onStore(modalidadAcademica, onBack) }
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
    modalidadAcademica: state.ModalidadAcademica,
} );

const mapDispatchToProps = {
    onLimpiar: ModalidadAcademicaActions.onLimpiar,
    onCreate: ModalidadAcademicaActions.onCreate,
    setSigla: ModalidadAcademicaActions.setSigla,
    setDescripcion: ModalidadAcademicaActions.setDescripcion,
    onStore: ModalidadAcademicaActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateModalidadAcademica );
