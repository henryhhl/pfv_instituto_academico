
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonComponent from '../../../../components/button';
import InputComponent from '../../../../components/input';
import { PermisoActions } from '../../../../redux/actions/seguridad/permiso.action';
import ListadoTipoPermisoModal from '../tipopermiso/modal/listadoPermiso.modal';
import { EstadoData } from '../../../../data/estado.data';
import SelectComponent from '../../../../components/select';

function EditPermiso( props ) {
    const { permiso } = props;
    const [ visibleTipoPermiso, setVisibleTipoPermiso ] = React.useState( false );

    function onComponentTipoPermiso() {
        if ( !visibleTipoPermiso ) return null;
        return (
            <ListadoTipoPermisoModal
                visible={visibleTipoPermiso}
                onClose={ () => setVisibleTipoPermiso(false) }
                onSelect={ (tipoPermiso) => {
                    props.setFKIDTipoPermiso(permiso, tipoPermiso);
                    setVisibleTipoPermiso(false);
                } }
            />
        );
    };
    
    return (
        <>
            { onComponentTipoPermiso() }
            <div className="row">
                <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="form-group col-12">
                                    <InputComponent
                                        label="Tipo"
                                        value={permiso.tipopermiso}
                                        onClick={ () => setVisibleTipoPermiso(true) }
                                        error={permiso.error.fkidtipopermiso}
                                        message={permiso.message.fkidtipopermiso}
                                        readOnly
                                        style={{ background: 'white', cursor: 'pointer', }}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12">
                                    <InputComponent
                                        label="Descripción"
                                        value={permiso.descripcion}
                                        onChange={ (value) => props.setDescripcion(permiso, value) }
                                        error={permiso.error.descripcion}
                                        message={permiso.message.descripcion}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12">
                                    <SelectComponent 
                                        data={EstadoData}
                                        label={"Estado"}
                                        value={permiso.estado}
                                        onChange={ (value) => props.setEstado(permiso, value) }
                                        error={permiso.error.estado}
                                        message={permiso.message.estado}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <ButtonComponent
                                onClick={ () => props.onUpdate(permiso, props.onClose) }
                            >
                                Guardar
                            </ButtonComponent>
                            <ButtonComponent
                                type='danger' onClick={props.onClose}
                            >
                                Cancelar
                            </ButtonComponent>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

EditPermiso.propTypes = {
    onClose: PropTypes.func,
};

EditPermiso.defaultProps = {
    onClose: () => {},
};

const mapStateToProps = ( state ) => ( {
    permiso: state.Permiso,
} );

const mapDispatchToProps = {
    onLimpiar: PermisoActions.onLimpiar,
    setFKIDTipoPermiso: PermisoActions.setFKIDTipoPermiso,
    setDescripcion: PermisoActions.setDescripcion,
    setEstado: PermisoActions.setEstado,
    onUpdate: PermisoActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditPermiso );
