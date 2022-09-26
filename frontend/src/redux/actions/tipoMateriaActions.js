
import Constants from "../constants/constans";
// import { TipoRolService } from "../services/tipoRolServices";

const setInit = () => ( {
    type: Constants.tipoMateria_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.tipoMateria_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.tipoMateria_onChange,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const getAllTipoMateria = () => {
    return ( dispatch ) => {
        // TipoRolService.getAllTipoMateria().then( (respta) => {
        //     console.log(respta);
        // } ).finally( () => {} );
    };
};

const onLimpiar = () => {
    return ( dispatch ) => {
        dispatch( setLimpiar() );
    };
};

const setSigla = (tipoMateria, value) => {
    return ( dispatch ) => {
        tipoMateria.sigla = value;
        tipoMateria.error.sigla = false;
        tipoMateria.message.sigla = "";
        dispatch( onChange(tipoMateria) );
    };
};

const setDescripcion = (tipoMateria, value) => {
    return ( dispatch ) => {
        tipoMateria.descripcion = value;
        tipoMateria.error.descripcion = false;
        tipoMateria.message.descripcion = "";
        dispatch( onChange(tipoMateria) );
    };
};

const setEstado = (tipoMateria, value) => {
    return ( dispatch ) => {
        tipoMateria.estado = value;
        tipoMateria.error.estado = false;
        tipoMateria.message.estado = "";
        dispatch( onChange(tipoMateria) );
    };
};

const setISDelete = (tipoMateria, value) => {
    return ( dispatch ) => {
        tipoMateria.isdelete = value;
        tipoMateria.error.isdelete = false;
        tipoMateria.message.isdelete = "";
        dispatch( onChange(tipoMateria) );
    };
};

const onGrabar = ( tipoMateria ) => {
    return ( dispatch ) => {
        if ( !onValidate( tipoMateria ) ) {
            dispatch( onChange( tipoMateria ) );
            return;
        }
        console.log(tipoMateria);
    };
};

function onValidate( data ) {
    let bandera = true;
    if ( data.sigla.toString().trim().length === 0 ) {
        data.error.sigla   = true;
        data.message.sigla = "Campo requerido.";
        bandera = false;
    }
    if ( data.descripcion.toString().trim().length === 0 ) {
        data.error.descripcion   = true;
        data.message.descripcion = "Campo requerido.";
        bandera = false;
    }
    return bandera;
};

export const TipoMateriaActions = {
    initData,
    getAllTipoMateria,
    onLimpiar,
    setSigla,
    setDescripcion,
    setEstado,
    setISDelete,
    onGrabar,
};
