
import Constants from "../constants/constans";
// import { TipoRolService } from "../services/tipoRolServices";

const setInit = () => ( {
    type: Constants.nivelAcademico_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.nivelAcademico_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.nivelAcademico_onChange,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const getAllNivelAcademico = () => {
    return ( dispatch ) => {
        // TipoRolService.getAllNivelAcademico().then( (respta) => {
        //     console.log(respta);
        // } ).finally( () => {} );
    };
};

const onLimpiar = () => {
    return ( dispatch ) => {
        dispatch( setLimpiar() );
    };
};

const setSigla = (nivelAcademico, value) => {
    return ( dispatch ) => {
        nivelAcademico.sigla = value;
        nivelAcademico.error.sigla = false;
        nivelAcademico.message.sigla = "";
        dispatch( onChange(nivelAcademico) );
    };
};

const setDescripcion = (nivelAcademico, value) => {
    return ( dispatch ) => {
        nivelAcademico.descripcion = value;
        nivelAcademico.error.descripcion = false;
        nivelAcademico.message.descripcion = "";
        dispatch( onChange(nivelAcademico) );
    };
};

const setEstado = (nivelAcademico, value) => {
    return ( dispatch ) => {
        nivelAcademico.estado = value;
        nivelAcademico.error.estado = false;
        nivelAcademico.message.estado = "";
        dispatch( onChange(nivelAcademico) );
    };
};

const setISDelete = (nivelAcademico, value) => {
    return ( dispatch ) => {
        nivelAcademico.isdelete = value;
        nivelAcademico.error.isdelete = false;
        nivelAcademico.message.isdelete = "";
        dispatch( onChange(nivelAcademico) );
    };
};

const onGrabar = ( nivelacademico ) => {
    return ( dispatch ) => {
        if ( !onValidate( nivelacademico ) ) {
            dispatch( onChange( nivelacademico ) );
            return;
        }
        console.log(nivelacademico);
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

export const NivelAcademicoActions = {
    initData,
    getAllNivelAcademico,
    onLimpiar,
    setSigla,
    setDescripcion,
    setEstado,
    setISDelete,
    onGrabar,
};
