
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { CiudadService } from "../../services/parametros/ciudad.service";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';

const setInit = () => ( {
    type: Constants.ciudad_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.ciudad_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.ciudad_onChange,
    payload: data,
} );

const onListModule = ( data ) => ( {
    type: Constants.listModules_onChange,
    payload: data,
} );

const setCreate = ( fkidciudadpadre = null ) => ( {
    type: Constants.ciudad_onCreate,
    payload: fkidciudadpadre,
} );

const setShowData = ( data ) => ( {
    type: Constants.ciudad_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const getAllCiudad = () => {
    return ( dispatch ) => {
        CiudadService.getAllCiudad(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listCiudad',
                    value: result.arrayCiudad,
                };
                dispatch( onListModule(obj) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onLimpiar = () => {
    return ( dispatch ) => {
        dispatch( setLimpiar() );
    };
};

const setFkIDTipoCiudad = (ciudad, tipoCiudad) => {
    return ( dispatch ) => {
        ciudad.fkidtipociudad = tipoCiudad.idtipociudad;
        ciudad.tipociudad = tipoCiudad.descripcion;
        ciudad.error.fkidtipociudad = false;
        ciudad.message.fkidtipociudad = "";
        dispatch( onChange(ciudad) );
        dispatch( onChange(ciudad) );
    };
};

const setFkIDCiudadPadre = (ciudad, value) => {
    return ( dispatch ) => {
        ciudad.fkidciudadpadre = value;
        dispatch( onChange(ciudad) );
    };
};

const setSigla = (ciudad, value) => {
    return ( dispatch ) => {
        ciudad.sigla = value;
        ciudad.error.sigla = false;
        ciudad.message.sigla = "";
        dispatch( onChange(ciudad) );
    };
};

const setDescripcion = (ciudad, value) => {
    return ( dispatch ) => {
        ciudad.descripcion = value;
        ciudad.error.descripcion = false;
        ciudad.message.descripcion = "";
        dispatch( onChange(ciudad) );
    };
};

const setEstado = (ciudad, value) => {
    return ( dispatch ) => {
        ciudad.estado = value;
        ciudad.error.estado = false;
        ciudad.message.estado = "";
        dispatch( onChange(ciudad) );
    };
};

const setISDelete = (ciudad, value) => {
    return ( dispatch ) => {
        ciudad.isdelete = value;
        ciudad.error.isdelete = false;
        ciudad.message.isdelete = "";
        dispatch( onChange(ciudad) );
    };
};

const onCreate = ( fkidciudadpadre = null ) => {
    return ( dispatch ) => {
        dispatch( setCreate(fkidciudadpadre) );
    };
};

const onShow = ( idciudad ) => {
    return ( dispatch ) => {
        CiudadService.onShow( 
            idciudad 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.ciudad ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idciudad ) => {
    return ( dispatch ) => {
        CiudadService.onEdit( 
            idciudad 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.ciudad ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( ciudad, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( ciudad ) ) {
            dispatch( onChange( ciudad ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            CiudadService.onStore(
                ciudad
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( getAllCiudad() );
                    onBack();
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Registrar Ciudad", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( ciudad, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( ciudad ) ) {
            dispatch( onChange( ciudad ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            CiudadService.onUpdate(
                ciudad
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( getAllCiudad() );
                    onBack();
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Editar Ciudad", onOk: onUpdate,
            okType: "primary", content: "Estás seguro de actualizar información?",
        } );
    };
};

function onValidate( data ) {
    let bandera = true;
    if ( data.fkidtipociudad?.toString().trim().length === 0 || data.fkidtipociudad === null ) {
        data.error.fkidtipociudad   = true;
        data.message.fkidtipociudad = "Campo requerido.";
        bandera = false;
    }
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
    if ( data.estado.toString().trim().length === 0 ) {
        data.error.estado   = true;
        data.message.estado = "Campo requerido.";
        bandera = false;
    }
    if ( !bandera ) {
        Swal.fire( {
            position: 'top-end',
            icon: 'warning',
            title: "No se pudo realizar la Funcionalidad",
            text: "Favor llenar los campos requeridos.",
            showConfirmButton: false,
            timer: 3000,
        } );
    }
    return bandera;
};

const onDelete = ( ciudad ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            CiudadService.onDelete(
                ciudad
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( getAllCiudad() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Ciudad", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const CiudadActions = {
    initData,
    getAllCiudad,
    onLimpiar,
    setFkIDTipoCiudad,
    setFkIDCiudadPadre,
    setSigla,
    setDescripcion,
    setEstado,
    setISDelete,
    onCreate,
    onShow,
    onEdit,
    onGrabar,
    onUpdate,
    onDelete,
};
