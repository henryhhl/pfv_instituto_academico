
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TipoRolActions } from '../../../../redux/actions/tipoRolActions';
import { ButtonComponent ,InputComponent } from '../../../../components/components';

function CreateTipoRol( props ) {
    const { tipoRol } = props;
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
                                    <h4>Nuevo Tipo Rol</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="form-group col-3"></div>
                                        <div className="form-group col-6">
                                            <InputComponent
                                                label="Descripción"
                                                value={tipoRol.descripcion}
                                                onChange={ (value) => props.setDescripcion(tipoRol, value) }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <ButtonComponent>
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
    tipoRol: state.TipoRol,
} );

const mapDispatchToProps = {
    initData: TipoRolActions.initData,
    setDescripcion: TipoRolActions.setDescripcion,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateTipoRol );
