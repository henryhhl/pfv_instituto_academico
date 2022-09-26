
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { MateriaActions } from '../../../../redux/actions/materiaActions';

function ShowMateria( props ) {
    const { materia } = props;
    const navigate = useNavigate();

    function onBack() {
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
                                    <h4>Detalle Materia</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="form-group col-2"></div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Código"
                                                value={materia.codigo}
                                                readOnly
                                            />
                                        </div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Sigla"
                                                value={materia.sigla}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Nombre Largo"
                                                value={materia.nombrelargo}
                                                readOnly
                                            />
                                        </div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Nombre Corto"
                                                value={materia.nombrecorto}
                                                readOnly
                                            />
                                        </div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Nombre Alternativo"
                                                value={materia.nombrealternativo}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-4"></div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Créditos"
                                                value={materia.creditos}
                                                readOnly
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
    materia: state.Materia,
} );

const mapDispatchToProps = {
    initData: MateriaActions.initData,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowMateria );
