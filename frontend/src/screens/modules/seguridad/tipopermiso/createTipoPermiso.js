
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { TipoPermisoActions } from '../../../../redux/actions/seguridad/tipoPermiso.action';

function CreateTipoPermiso( props ) {
    const { tipoPermiso } = props;
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
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h4>Nuevo Tipo Permiso</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="form-group col-3"></div>
                                        <div className="form-group col-6">
                                            <InputComponent
                                                label="Descripción"
                                                value={tipoPermiso.descripcion}
                                                onChange={ (value) => props.setDescripcion(tipoPermiso, value) }
                                                error={tipoPermiso.error.descripcion}
                                                message={tipoPermiso.message.descripcion}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <ButtonComponent
                                        onClick={ () => props.onStore(tipoPermiso, onBack) }
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
    tipoPermiso: state.TipoPermiso,
} );

const mapDispatchToProps = {
    onCreate: TipoPermisoActions.onCreate,
    onLimpiar: TipoPermisoActions.onLimpiar,
    setDescripcion: TipoPermisoActions.setDescripcion,
    onStore: TipoPermisoActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateTipoPermiso );
