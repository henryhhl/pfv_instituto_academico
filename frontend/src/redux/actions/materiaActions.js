
import Constants from "../constants/constans";
// import { TipoRolService } from "../services/tipoRolServices";

const setInit = () => ( {
    type: Constants.materia_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.materia_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.materia_onChange,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const getAllMateria = () => {
    return ( dispatch ) => {
        // TipoRolService.getAllMateria().then( (respta) => {
        //     console.log(respta);
        // } ).finally( () => {} );
    };
};

const onLimpiar = () => {
    return ( dispatch ) => {
        dispatch( setLimpiar() );
    };
};

const setCodigo = (materia, value) => {
    return ( dispatch ) => {
        materia.codigo = value;
        materia.error.codigo = false;
        materia.message.codigo = "";
        dispatch( onChange(materia) );
    };
};

const setSigla = (materia, value) => {
    return ( dispatch ) => {
        materia.sigla = value;
        materia.error.sigla = false;
        materia.message.sigla = "";
        dispatch( onChange(materia) );
    };
};

const setNombreLargo = (materia, value) => {
    return ( dispatch ) => {
        materia.nombrelargo = value;
        materia.error.nombrelargo = false;
        materia.message.nombrelargo = "";
        dispatch( onChange(materia) );
    };
};

const setNombreCorto = (materia, value) => {
    return ( dispatch ) => {
        materia.nombrecorto = value;
        materia.error.nombrecorto = false;
        materia.message.nombrecorto = "";
        dispatch( onChange(materia) );
    };
};

const setNombreAlternativo = (materia, value) => {
    return ( dispatch ) => {
        materia.nombrealternativo = value;
        materia.error.nombrealternativo = false;
        materia.message.nombrealternativo = "";
        dispatch( onChange(materia) );
    };
};

const setCredito = (materia, value) => {
    return ( dispatch ) => {
        materia.creditos = value;
        materia.error.creditos = false;
        materia.message.creditos = "";
        dispatch( onChange(materia) );
    };
};

const setEstado = (materia, value) => {
    return ( dispatch ) => {
        materia.estado = value;
        materia.error.estado = false;
        materia.message.estado = "";
        dispatch( onChange(materia) );
    };
};

const setISDelete = (materia, value) => {
    return ( dispatch ) => {
        materia.isdelete = value;
        materia.error.isdelete = false;
        materia.message.isdelete = "";
        dispatch( onChange(materia) );
    };
};

const onGrabar = ( materia ) => {
    return ( dispatch ) => {
        if ( !onValidate( materia ) ) {
            dispatch( onChange( materia ) );
            return;
        }
        console.log(materia);
    };
};

function onValidate( data ) {
    let bandera = true;
    if ( data.codigo.toString().trim().length === 0 ) {
        data.error.codigo   = true;
        data.message.codigo = "Campo requerido.";
        bandera = false;
    }
    if ( data.sigla.toString().trim().length === 0 ) {
        data.error.sigla   = true;
        data.message.sigla = "Campo requerido.";
        bandera = false;
    }
    if ( data.nombrelargo.toString().trim().length === 0 ) {
        data.error.nombrelargo   = true;
        data.message.nombrelargo = "Campo requerido.";
        bandera = false;
    }
    if ( data.nombrecorto.toString().trim().length === 0 ) {
        data.error.nombrecorto   = true;
        data.message.nombrecorto = "Campo requerido.";
        bandera = false;
    }
    if ( data.nombrealternativo.toString().trim().length === 0 ) {
        data.error.nombrealternativo   = true;
        data.message.nombrealternativo = "Campo requerido.";
        bandera = false;
    }
    if ( data.creditos.toString().trim().length === 0 ) {
        data.error.creditos   = true;
        data.message.creditos = "Campo requerido.";
        bandera = false;
    }
    return bandera;
};

export const MateriaActions = {
    initData,
    getAllMateria,
    onLimpiar,
    setCodigo,
    setSigla,
    setNombreLargo,
    setNombreCorto,
    setNombreAlternativo,
    setCredito,
    setEstado,
    setISDelete,
    onGrabar,
};
