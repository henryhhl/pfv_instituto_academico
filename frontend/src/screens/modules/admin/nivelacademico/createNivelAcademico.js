
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { NivelAcademicoActions } from '../../../../redux/actions/nivelAcademicoActions';

function CreateNivelAcademico( props ) {
    const { nivelAcademico } = props;
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
                                    <h4>Nuevo Nivel Academico</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="form-group col-2"></div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Sigla"
                                                value={nivelAcademico.sigla}
                                                onChange={ (value) => props.setSigla(nivelAcademico, value) }
                                                error={nivelAcademico.error.sigla}
                                                message={nivelAcademico.message.sigla}
                                            />
                                        </div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Descripción"
                                                value={nivelAcademico.descripcion}
                                                onChange={ (value) => props.setDescripcion(nivelAcademico, value) }
                                                error={nivelAcademico.error.descripcion}
                                                message={nivelAcademico.message.descripcion}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <ButtonComponent
                                        onClick={ () => props.onStore(nivelAcademico, onBack) }
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
    nivelAcademico: state.NivelAcademico,
} );

const mapDispatchToProps = {
    onLimpiar: NivelAcademicoActions.onLimpiar,
    onCreate: NivelAcademicoActions.onCreate,
    setSigla: NivelAcademicoActions.setSigla,
    setDescripcion: NivelAcademicoActions.setDescripcion,
    onStore: NivelAcademicoActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateNivelAcademico );
