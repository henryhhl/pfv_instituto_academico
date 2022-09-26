
import Constants from "../constants/constans";
// import { TipoRolService } from "../services/tipoRolServices";

const setInit = () => ( {
    type: Constants.ofertaAcademica_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.ofertaAcademica_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.ofertaAcademica_onChange,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const getAllOfertaAcademica = () => {
    return ( dispatch ) => {
        // TipoRolService.getAllOfertaAcademica().then( (respta) => {
        //     console.log(respta);
        // } ).finally( () => {} );
    };
};

const onLimpiar = () => {
    return ( dispatch ) => {
        dispatch( setLimpiar() );
    };
};

const setSigla = (ofertaAcademica, value) => {
    return ( dispatch ) => {
        ofertaAcademica.sigla = value;
        ofertaAcademica.error.sigla = false;
        ofertaAcademica.message.sigla = "";
        dispatch( onChange(ofertaAcademica) );
    };
};

const setDescripcion = (ofertaAcademica, value) => {
    return ( dispatch ) => {
        ofertaAcademica.descripcion = value;
        ofertaAcademica.error.descripcion = false;
        ofertaAcademica.message.descripcion = "";
        dispatch( onChange(ofertaAcademica) );
    };
};

const setEstado = (ofertaAcademica, value) => {
    return ( dispatch ) => {
        ofertaAcademica.estado = value;
        ofertaAcademica.error.estado = false;
        ofertaAcademica.message.estado = "";
        dispatch( onChange(ofertaAcademica) );
    };
};

const setISDelete = (ofertaAcademica, value) => {
    return ( dispatch ) => {
        ofertaAcademica.isdelete = value;
        ofertaAcademica.error.isdelete = false;
        ofertaAcademica.message.isdelete = "";
        dispatch( onChange(ofertaAcademica) );
    };
};

const onGrabar = ( ofertaAcademica ) => {
    return ( dispatch ) => {
        if ( !onValidate( ofertaAcademica ) ) {
            dispatch( onChange( ofertaAcademica ) );
            return;
        }
        console.log(ofertaAcademica);
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

export const OfertaAcademicaActions = {
    initData,
    getAllOfertaAcademica,
    onLimpiar,
    setSigla,
    setDescripcion,
    setEstado,
    setISDelete,
    onGrabar,
};
