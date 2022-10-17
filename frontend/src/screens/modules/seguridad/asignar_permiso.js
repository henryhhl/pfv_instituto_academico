
import React from 'react';
import CardComponent from '../../../components/card';
import InputComponent from '../../../components/input';
import PaperComponent from '../../../components/paper';
import RolListadoModal from './rol/modal/rol_listado.modal';

function AsignarPermiso( props ) {
    const [ visibleRol, setVisibleRol ] = React.useState(false);
    const [ rol, setRol ] = React.useState(null);

    function onComponentRol() {
        if ( !visibleRol ) return null;
        return (
            <RolListadoModal
                visible={visibleRol}
                onClose={ () => setVisibleRol(false) }
                onSelect={ (rol) => {
                    setRol(rol);
                    setVisibleRol(false);
                } }
            />
        );
    };

    return (
        <>
            { onComponentRol() }
            <PaperComponent>
                <CardComponent
                    header={"Asignar Permiso"}
                >
                    <div className="row">
                        <div className="form-group col-4"></div>
                        <div className="form-group col-4">
                            <InputComponent
                                placeholder="SELECCIONAR ROL"
                                value={rol?.descripcion}
                                onClick={ () => setVisibleRol(true) }
                                readOnly
                                style={{ background: 'white', cursor: 'pointer', }}
                            />
                        </div>
                    </div>
                    <CardComponent
                        header="Permiso del Rol"
                    ></CardComponent>
                </CardComponent>
            </PaperComponent>
        </>
    );
};

export default AsignarPermiso;
