
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TipoRolActions } from '../../../../redux/actions/seguridad/tipoRol.action';
import { ButtonComponent ,InputComponent } from '../../../../components/components';

function CreateTipoRol( props ) {
    const { tipoRol } = props;
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
                                                error={tipoRol.error.descripcion}
                                                message={tipoRol.message.descripcion}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <ButtonComponent
                                        onClick={ () => props.onStore(tipoRol, onBack) }
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
    tipoRol: state.TipoRol,
} );

const mapDispatchToProps = {
    onLimpiar: TipoRolActions.onLimpiar,
    onCreate: TipoRolActions.onCreate,
    setDescripcion: TipoRolActions.setDescripcion,
    onStore: TipoRolActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateTipoRol );
