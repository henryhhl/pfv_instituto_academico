
import Constants from "../constants/constans";
// import { TipoRolService } from "../services/tipoRolServices";

const setInit = () => ( {
    type: Constants.periodo_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.periodo_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.periodo_onChange,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const getAllPeriodo = () => {
    return ( dispatch ) => {
        // TipoRolService.getAllPeriodo().then( (respta) => {
        //     console.log(respta);
        // } ).finally( () => {} );
    };
};

const onLimpiar = () => {
    return ( dispatch ) => {
        dispatch( setLimpiar() );
    };
};

const setSigla = (periodo, value) => {
    return ( dispatch ) => {
        periodo.sigla = value;
        periodo.error.sigla = false;
        periodo.message.sigla = "";
        dispatch( onChange(periodo) );
    };
};

const setDescripcion = (periodo, value) => {
    return ( dispatch ) => {
        periodo.descripcion = value;
        periodo.error.descripcion = false;
        periodo.message.descripcion = "";
        dispatch( onChange(periodo) );
    };
};

const setEstado = (periodo, value) => {
    return ( dispatch ) => {
        periodo.estado = value;
        periodo.error.estado = false;
        periodo.message.estado = "";
        dispatch( onChange(periodo) );
    };
};

const setISDelete = (periodo, value) => {
    return ( dispatch ) => {
        periodo.isdelete = value;
        periodo.error.isdelete = false;
        periodo.message.isdelete = "";
        dispatch( onChange(periodo) );
    };
};

const onGrabar = ( periodo ) => {
    return ( dispatch ) => {
        if ( !onValidate( periodo ) ) {
            dispatch( onChange( periodo ) );
            return;
        }
        console.log(periodo);
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

export const PeriodoActions = {
    initData,
    getAllPeriodo,
    onLimpiar,
    setSigla,
    setDescripcion,
    setEstado,
    setISDelete,
    onGrabar,
};
