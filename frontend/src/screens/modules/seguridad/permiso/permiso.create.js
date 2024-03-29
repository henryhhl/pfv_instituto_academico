
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonComponent from '../../../../components/button';
import InputComponent from '../../../../components/input';
import { PermisoActions } from '../../../../redux/actions/seguridad/permiso.action';
import ListadoTipoPermisoModal from '../tipopermiso/modal/listadoPermiso.modal';
import CardComponent from '../../../../components/card';

function CreatePermiso( props ) {
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
            <CardComponent
                style={{ marginTop:10, }} isHeader={false}
                footer={
                    <>
                        <ButtonComponent
                            onClick={ () => props.onStore(permiso, props.onClose) }
                        >
                            Guardar
                        </ButtonComponent>
                        <ButtonComponent
                            type='danger' onClick={props.onClose}
                        >
                            Cancelar
                        </ButtonComponent>
                    </>
                }
            >
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
            </CardComponent>
        </>
    );
};

CreatePermiso.propTypes = {
    onClose: PropTypes.func,
};

CreatePermiso.defaultProps = {
    onClose: () => {},
};

const mapStateToProps = ( state ) => ( {
    permiso: state.Permiso,
} );

const mapDispatchToProps = {
    onLimpiar: PermisoActions.onLimpiar,
    setFKIDTipoPermiso: PermisoActions.setFKIDTipoPermiso,
    setDescripcion: PermisoActions.setDescripcion,
    onStore: PermisoActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreatePermiso );
