
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { InstitucionService } from "../../services/estructurainstitucional/institucion.service";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';

const setInit = () => ( {
    type: Constants.institucion_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.institucion_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.institucion_onChange,
    payload: data,
} );

const onListModule = ( data ) => ( {
    type: Constants.listModules_onChange,
    payload: data,
} );

const onPaginateModule = ( data ) => ( {
    type: Constants.paginationModules_onChange,
    payload: data,
} );

const setCreate = () => ( {
    type: Constants.institucion_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.institucion_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageInstitucion = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        InstitucionService.getAllInstitucion( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listInstitucion',
                        value: result.arrayInstitucion,
                    },
                    pagination: {
                        name: 'paginationInstitucion',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageInstitucion',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateInstitucion',
                        value: paginate,
                    },
                };
                dispatch( onPaginateModule(obj) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const getAllInstitucion = () => {
    return ( dispatch ) => {
        InstitucionService.getAllInstitucion(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listInstitucion',
                    value: result.arrayInstitucion,
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

const getCiudad = ( array = [] ) => {
    let ciudades = "";
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        ciudades += `${element}, `;
    }
    return ciudades;
}

const setFKIDCiudad = (institucion, ciudad) => {
    return ( dispatch ) => {
        institucion.fkidciudad = ciudad.idciudad;
        institucion.ciudad = `${getCiudad(ciudad.arrayFamily)}${ciudad.descripcion}`;
        institucion.error.fkidciudad = false;
        institucion.message.fkidciudad = "";
        dispatch( onChange(institucion) );
    };
};

const setSigla = (institucion, value) => {
    return ( dispatch ) => {
        institucion.sigla = value;
        institucion.error.sigla = false;
        institucion.message.sigla = "";
        dispatch( onChange(institucion) );
    };
};

const setDescripcion = (institucion, value) => {
    return ( dispatch ) => {
        institucion.descripcion = value;
        institucion.error.descripcion = false;
        institucion.message.descripcion = "";
        dispatch( onChange(institucion) );
    };
};

const setNit = (institucion, value) => {
    return ( dispatch ) => {
        institucion.nit = value;
        institucion.error.nit = false;
        institucion.message.nit = "";
        dispatch( onChange(institucion) );
    };
};

const setTelefono = (institucion, value) => {
    return ( dispatch ) => {
        institucion.telefono = value;
        dispatch( onChange(institucion) );
    };
};

const setCelular = (institucion, value) => {
    return ( dispatch ) => {
        institucion.celular = value;
        dispatch( onChange(institucion) );
    };
};

const setDireccion = (institucion, value) => {
    return ( dispatch ) => {
        institucion.direccion = value;
        dispatch( onChange(institucion) );
    };
};

const setEmail = (institucion, value) => {
    return ( dispatch ) => {
        institucion.email = value;
        dispatch( onChange(institucion) );
    };
};

const setEstado = (institucion, value) => {
    return ( dispatch ) => {
        institucion.estado = value;
        institucion.error.estado = false;
        institucion.message.estado = "";
        dispatch( onChange(institucion) );
    };
};

const setISDelete = (institucion, value) => {
    return ( dispatch ) => {
        institucion.isdelete = value;
        institucion.error.isdelete = false;
        institucion.message.isdelete = "";
        dispatch( onChange(institucion) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idinstitucion ) => {
    return ( dispatch ) => {
        InstitucionService.onShow( 
            idinstitucion 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.institucion ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idinstitucion ) => {
    return ( dispatch ) => {
        InstitucionService.onEdit( 
            idinstitucion 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.institucion ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( institucion, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( institucion ) ) {
            dispatch( onChange( institucion ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            InstitucionService.onStore(
                institucion
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
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
            title: "Registrar Institución", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( institucion, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( institucion ) ) {
            dispatch( onChange( institucion ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            InstitucionService.onUpdate(
                institucion
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
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
            title: "Editar Institución", onOk: onUpdate,
            okType: "primary", content: "Estás seguro de actualizar información?",
        } );
    };
};

function onValidate( data ) {
    let bandera = true;
    if ( data.fkidciudad.toString().trim().length === 0 ) {
        data.error.fkidciudad   = true;
        data.message.fkidciudad = "Campo requerido.";
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
    if ( data.nit.toString().trim().length === 0 ) {
        data.error.nit   = true;
        data.message.nit = "Campo requerido.";
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

const onDelete = ( institucion ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            InstitucionService.onDelete(
                institucion
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageInstitucion() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Institución", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const InstitucionActions = {
    initData,
    onPageInstitucion,
    getAllInstitucion,
    onLimpiar,
    setFKIDCiudad,
    setSigla,
    setDescripcion,
    setNit,
    setTelefono,
    setCelular,
    setDireccion,
    setEmail,
    setEstado,
    setISDelete,
    onCreate,
    onGrabar,
    onShow,
    onEdit,
    onUpdate,
    onDelete,
};
