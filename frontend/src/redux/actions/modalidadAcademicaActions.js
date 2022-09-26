
import Constants from "../constants/constans";
// import { TipoRolService } from "../services/tipoRolServices";

const setInit = () => ( {
    type: Constants.modalidad_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.modalidad_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.modalidad_onChange,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const getAllModalidadAcademica = () => {
    return ( dispatch ) => {
        // TipoRolService.getAllModalidadAcademica().then( (respta) => {
        //     console.log(respta);
        // } ).finally( () => {} );
    };
};

const onLimpiar = () => {
    return ( dispatch ) => {
        dispatch( setLimpiar() );
    };
};

const setSigla = (modalidadAcademica, value) => {
    return ( dispatch ) => {
        modalidadAcademica.sigla = value;
        modalidadAcademica.error.sigla = false;
        modalidadAcademica.message.sigla = "";
        dispatch( onChange(modalidadAcademica) );
    };
};

const setDescripcion = (modalidadAcademica, value) => {
    return ( dispatch ) => {
        modalidadAcademica.descripcion = value;
        modalidadAcademica.error.descripcion = false;
        modalidadAcademica.message.descripcion = "";
        dispatch( onChange(modalidadAcademica) );
    };
};

const setEstado = (modalidadAcademica, value) => {
    return ( dispatch ) => {
        modalidadAcademica.estado = value;
        modalidadAcademica.error.estado = false;
        modalidadAcademica.message.estado = "";
        dispatch( onChange(modalidadAcademica) );
    };
};

const setISDelete = (modalidadAcademica, value) => {
    return ( dispatch ) => {
        modalidadAcademica.isdelete = value;
        modalidadAcademica.error.isdelete = false;
        modalidadAcademica.message.isdelete = "";
        dispatch( onChange(modalidadAcademica) );
    };
};

const onGrabar = ( modalidadAcademica ) => {
    return ( dispatch ) => {
        if ( !onValidate( modalidadAcademica ) ) {
            dispatch( onChange( modalidadAcademica ) );
            return;
        }
        console.log(modalidadAcademica);
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

export const ModalidadAcademicaActions = {
    initData,
    getAllModalidadAcademica,
    onLimpiar,
    setSigla,
    setDescripcion,
    setEstado,
    setISDelete,
    onGrabar,
};
