
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { TipoMateriaActions } from '../../../../redux/actions/tipoMateriaActions';

function CreateTipoMateria( props ) {
    const { tipoMateria } = props;
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
                                    <h4>Nuevo Tipo Materia</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="form-group col-2"></div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Sigla"
                                                value={tipoMateria.sigla}
                                                onChange={ (value) => props.setSigla(tipoMateria, value) }
                                                error={tipoMateria.error.sigla}
                                                message={tipoMateria.message.sigla}
                                            />
                                        </div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Descripción"
                                                value={tipoMateria.descripcion}
                                                onChange={ (value) => props.setDescripcion(tipoMateria, value) }
                                                error={tipoMateria.error.descripcion}
                                                message={tipoMateria.message.descripcion}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <ButtonComponent
                                        onClick={ () => props.onStore(tipoMateria, onBack) }
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
    tipoMateria: state.TipoMateria,
} );

const mapDispatchToProps = {
    onLimpiar: TipoMateriaActions.onLimpiar,
    onCreate: TipoMateriaActions.onCreate,
    setSigla: TipoMateriaActions.setSigla,
    setDescripcion: TipoMateriaActions.setDescripcion,
    onStore: TipoMateriaActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateTipoMateria );
