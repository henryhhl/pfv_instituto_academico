
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { AdministrativoService } from "../../services/persona/administrativo.service";

const setInit = () => ( {
    type: Constants.administrativo_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.administrativo_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.administrativo_onChange,
    payload: data,
} );

const onAddNacionalidad = ( ) => ( {
    type: Constants.administrativo_onAddRowNacionalidad,
} );

const onDeleteNacionalidad = ( index ) => ( {
    type: Constants.administrativo_onDeleteRowNacionalidad,
    payload: index,
} );

const onAddRowCategoriaDocumento = ( ) => ( {
    type: Constants.administrativo_onAddRowCategoriaDocumento,
} );

const onDeleteRowCategoriaDocumento = ( index ) => ( {
    type: Constants.administrativo_onDeleteRowCategoriaDocumento,
    payload: index,
} );

const onAddRowEstudio = ( ) => ( {
    type: Constants.administrativo_onAddRowEstudio,
} );

const onDeleteRowEstudio = ( index ) => ( {
    type: Constants.administrativo_onDeleteRowEstudio,
    payload: index,
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
    type: Constants.administrativo_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.administrativo_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageAdministrativo = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        AdministrativoService.getAllAdministrativo( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listAdministrativo',
                        value: result.arrayAdministrativo,
                    },
                    pagination: {
                        name: 'paginationAdministrativo',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageAdministrativo',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateAdministrativo',
                        value: paginate,
                    },
                };
                dispatch( onPaginateModule(obj) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                setTimeout(() => {
                    dispatch( setHiddenSesion() );
                }, 1000);
            }
        } ).finally( () => {} );
    };
};

const getAllAdministrativo = () => {
    return ( dispatch ) => {
        AdministrativoService.getAllAdministrativo(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listAdministrativo',
                    value: result.arrayAdministrativo,
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

const setNombrePrincipal = (administrativo, value) => {
    return ( dispatch ) => {
        administrativo.nombreprincipal = value;
        administrativo.error.nombreprincipal = false;
        administrativo.message.nombreprincipal = "";
        dispatch( onChange(administrativo) );
    };
};

const setNombreAdicional = (administrativo, value) => {
    return ( dispatch ) => {
        administrativo.nombreadicional = value;
        dispatch( onChange(administrativo) );
    };
};

const setApellidoPrimero = (administrativo, value) => {
    return ( dispatch ) => {
        administrativo.apellidoprimero = value;
        administrativo.error.apellidoprimero = false;
        administrativo.message.apellidoprimero = "";
        dispatch( onChange(administrativo) );
    };
};

const setApellidoSegundo = (administrativo, value) => {
    return ( dispatch ) => {
        administrativo.apellidosegundo = value;
        dispatch( onChange(administrativo) );
    };
};

const setFechaNacimiento = (administrativo, value) => {
    return ( dispatch ) => {
        administrativo.fechanacimiento = value;
        administrativo.error.fechanacimiento = false;
        administrativo.message.fechanacimiento = "";
        dispatch( onChange(administrativo) );
    };
};

const setFKIDTipoIdentificacion = (administrativo, tipoIdentificacion) => {
    return ( dispatch ) => {
        administrativo.fkidtipoidentificacion = tipoIdentificacion.idtipoidentificacion;
        administrativo.tipoidentificacion = tipoIdentificacion.descripcion;

        administrativo.error.fkidtipoidentificacion = false;
        administrativo.message.fkidtipoidentificacion = "";
        dispatch( onChange(administrativo) );
    };
};

const setNumeroIdentificacion = (administrativo, value) => {
    return ( dispatch ) => {
        administrativo.numeroidentificacion = value;
        administrativo.error.numeroidentificacion = false;
        administrativo.message.numeroidentificacion = "";
        dispatch( onChange(administrativo) );
    };
};

const setGenero = (administrativo, value) => {
    return ( dispatch ) => {
        administrativo.genero = value;
        administrativo.error.genero = false;
        administrativo.message.genero = "";
        dispatch( onChange(administrativo) );
    };
};

const setEstadoCivil = (administrativo, value) => {
    return ( dispatch ) => {
        administrativo.estadocivil = value;
        administrativo.error.estadocivil = false;
        administrativo.message.estadocivil = "";
        dispatch( onChange(administrativo) );
    };
};

const getCiudadNacimiento = ( array = [] ) => {
    let ciudades = "";
    for (let index = array.length; index > 0; index--) {
        const element = array[index - 1];
        if ( index === 1 ) { 
            ciudades += `${element}`;
        } else {
            ciudades += `${element}, `;
        }
    }
    return ciudades;
}

const setFKIDCiudadNacimiento = (administrativo, ciudad) => {
    return ( dispatch ) => {
        administrativo.fkidciudadnacimiento = ciudad.idciudad;
        ciudad.arrayFamily = [ ...ciudad.arrayFamily, ciudad.descripcion ];
        administrativo.ciudadnacimiento = `${getCiudadNacimiento(ciudad.arrayFamily)}`;
        administrativo.error.fkidciudadnacimiento = false;
        administrativo.message.fkidciudadnacimiento = "";
        dispatch( onChange(administrativo) );
    };
};

const setFKIDCiudadResidencia = (administrativo, ciudad) => {
    return ( dispatch ) => {
        administrativo.fkidciudadresidencia = ciudad.idciudad;
        ciudad.arrayFamily = [ ...ciudad.arrayFamily, ciudad.descripcion ];
        administrativo.ciudadresidencia = `${getCiudadNacimiento(ciudad.arrayFamily)}`;
        administrativo.error.fkidciudadresidencia = false;
        administrativo.message.fkidciudadresidencia = "";
        dispatch( onChange(administrativo) );
    };
};

const setDireccion = (administrativo, value) => {
    return ( dispatch ) => {
        administrativo.direccion = value;
        dispatch( onChange(administrativo) );
    };
};

const setBarrio = (administrativo, value) => {
    return ( dispatch ) => {
        administrativo.barrio = value;
        dispatch( onChange(administrativo) );
    };
};

const setManzano = (administrativo, value) => {
    return ( dispatch ) => {
        administrativo.manzano = value;
        dispatch( onChange(administrativo) );
    };
};

const setUV = (administrativo, value) => {
    return ( dispatch ) => {
        administrativo.uv = value;
        dispatch( onChange(administrativo) );
    };
};

const setTelefono = (administrativo, value) => {
    return ( dispatch ) => {
        administrativo.telefono = value;
        dispatch( onChange(administrativo) );
    };
};

const setCelular = (administrativo, value) => {
    return ( dispatch ) => {
        administrativo.celular = value;
        dispatch( onChange(administrativo) );
    };
};

const setEmail = (administrativo, value) => {
    return ( dispatch ) => {
        administrativo.email = value;
        administrativo.error.email = false;
        administrativo.message.email = "";
        dispatch( onChange(administrativo) );
    };
};

const setImagen = (administrativo, value) => {
    return ( dispatch ) => {
        administrativo.imagen = value;
        dispatch( onChange(administrativo) );
    };
};

const setEstado = (administrativo, value) => {
    return ( dispatch ) => {
        administrativo.estado = value;
        administrativo.error.estado = false;
        administrativo.message.estado = "";
        dispatch( onChange(administrativo) );
    };
};

const setISDelete = (administrativo, value) => {
    return ( dispatch ) => {
        administrativo.isdelete = value;
        administrativo.error.isdelete = false;
        administrativo.message.isdelete = "";
        dispatch( onChange(administrativo) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idadministrativo ) => {
    return ( dispatch ) => {
        AdministrativoService.onShow( 
            idadministrativo 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.administrativo ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idadministrativo ) => {
    return ( dispatch ) => {
        AdministrativoService.onEdit( 
            idadministrativo 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.administrativo ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( administrativo, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( administrativo ) ) {
            dispatch( onChange( administrativo ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            AdministrativoService.onStore(
                administrativo
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
            title: "Registrar Administrativo", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( administrativo, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( administrativo ) ) {
            dispatch( onChange( administrativo ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            AdministrativoService.onUpdate(
                administrativo
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
            title: "Editar Administrativo", onOk: onUpdate,
            okType: "primary", content: "Estás seguro de actualizar información?",
        } );
    };
};

function onValidate( data ) {
    let bandera = true;
    if ( data.nombreprincipal.toString().trim().length === 0 ) {
        data.error.nombreprincipal   = true;
        data.message.nombreprincipal = "Campo requerido.";
        bandera = false;
    }
    if ( data.apellidoprimero.toString().trim().length === 0 ) {
        data.error.apellidoprimero   = true;
        data.message.apellidoprimero = "Campo requerido.";
        bandera = false;
    }
    if ( data.fechanacimiento.toString().trim().length === 0 ) {
        data.error.fechanacimiento   = true;
        data.message.fechanacimiento = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidtipoidentificacion.toString().trim().length === 0 ) {
        data.error.fkidtipoidentificacion   = true;
        data.message.fkidtipoidentificacion = "Campo requerido.";
        bandera = false;
    }
    if ( data.numeroidentificacion.toString().trim().length === 0 ) {
        data.error.numeroidentificacion   = true;
        data.message.numeroidentificacion = "Campo requerido.";
        bandera = false;
    }
    if ( data.genero.toString().trim().length === 0 ) {
        data.error.genero   = true;
        data.message.genero = "Campo requerido.";
        bandera = false;
    }
    if ( data.estadocivil.toString().trim().length === 0 ) {
        data.error.estadocivil   = true;
        data.message.estadocivil = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidciudadnacimiento.toString().trim().length === 0 ) {
        data.error.fkidciudadnacimiento   = true;
        data.message.fkidciudadnacimiento = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidciudadresidencia.toString().trim().length === 0 ) {
        data.error.fkidciudadresidencia   = true;
        data.message.fkidciudadresidencia = "Campo requerido.";
        bandera = false;
    }
    if ( data.email.toString().trim().length > 0 ) {
        if ( !Functions.validateEmail( data.email ) ) {
            data.error.email   = true;
            data.message.email = "Email requerido.";
            bandera = false;
        }
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

const onDelete = ( administrativo ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            AdministrativoService.onDelete(
                administrativo
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageAdministrativo() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Administrativo", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const AdministrativoActions = {
    initData, onPageAdministrativo, getAllAdministrativo,
    onLimpiar, onChange,
    onAddNacionalidad, onDeleteNacionalidad,
    onAddRowCategoriaDocumento, onDeleteRowCategoriaDocumento,
    onAddRowEstudio, onDeleteRowEstudio,
    setNombrePrincipal,
    setNombreAdicional,
    setApellidoPrimero,
    setApellidoSegundo,
    setFechaNacimiento,
    setFKIDTipoIdentificacion,
    setNumeroIdentificacion,
    setGenero,
    setEstadoCivil,
    setFKIDCiudadNacimiento,
    setFKIDCiudadResidencia,
    setDireccion,
    setBarrio,
    setManzano,
    setUV,
    setTelefono,
    setCelular,
    setEmail,
    setImagen,
    setEstado,
    setISDelete,
    onCreate,
    onGrabar,
    onShow,
    onEdit,
    onUpdate,
    onDelete,
};
