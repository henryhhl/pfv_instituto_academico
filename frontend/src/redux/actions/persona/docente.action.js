
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import ConfirmationComponent from "../../../components/confirmation";
import { DocenteService } from "../../services/persona/docente.service";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';

const setInit = () => ( {
    type: Constants.docente_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.docente_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.docente_onChange,
    payload: data,
} );

const onAddNacionalidad = ( ) => ( {
    type: Constants.docente_onAddRowNacionalidad,
} );

const onDeleteNacionalidad = ( index ) => ( {
    type: Constants.docente_onDeleteRowNacionalidad,
    payload: index,
} );

const onAddRowMateria = ( ) => ( {
    type: Constants.docente_onAddRowMateria,
} );

const onDeleteRowMateria = ( index ) => ( {
    type: Constants.docente_onDeleteRowMateria,
    payload: index,
} );

const onAddRowCategoriaDocumento = ( ) => ( {
    type: Constants.docente_onAddRowCategoriaDocumento,
} );

const onDeleteRowCategoriaDocumento = ( index ) => ( {
    type: Constants.docente_onDeleteRowCategoriaDocumento,
    payload: index,
} );

const onAddRowEstudio = ( ) => ( {
    type: Constants.docente_onAddRowEstudio,
} );

const onDeleteRowEstudio = ( index ) => ( {
    type: Constants.docente_onDeleteRowEstudio,
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
    type: Constants.docente_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.docente_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageDocente = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        DocenteService.getAllDocente( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listDocente',
                        value: result.arrayDocente,
                    },
                    pagination: {
                        name: 'paginationDocente',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageDocente',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateDocente',
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

const getAllDocente = () => {
    return ( dispatch ) => {
        DocenteService.getAllDocente(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listDocente',
                    value: result.arrayDocente,
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

const setNombrePrincipal = (docente, value) => {
    return ( dispatch ) => {
        docente.nombreprincipal = value;
        docente.error.nombreprincipal = false;
        docente.message.nombreprincipal = "";
        dispatch( onChange(docente) );
    };
};

const setNombreAdicional = (docente, value) => {
    return ( dispatch ) => {
        docente.nombreadicional = value;
        dispatch( onChange(docente) );
    };
};

const setApellidoPrimero = (docente, value) => {
    return ( dispatch ) => {
        docente.apellidoprimero = value;
        docente.error.apellidoprimero = false;
        docente.message.apellidoprimero = "";
        dispatch( onChange(docente) );
    };
};

const setApellidoSegundo = (docente, value) => {
    return ( dispatch ) => {
        docente.apellidosegundo = value;
        dispatch( onChange(docente) );
    };
};

const setFechaNacimiento = (docente, value) => {
    return ( dispatch ) => {
        docente.fechanacimiento = value;
        docente.error.fechanacimiento = false;
        docente.message.fechanacimiento = "";
        dispatch( onChange(docente) );
    };
};

const setFKIDTipoIdentificacion = (docente, tipoIdentificacion) => {
    return ( dispatch ) => {
        docente.fkidtipoidentificacion = tipoIdentificacion.idtipoidentificacion;
        docente.tipoidentificacion = tipoIdentificacion.descripcion;

        docente.error.fkidtipoidentificacion = false;
        docente.message.fkidtipoidentificacion = "";
        dispatch( onChange(docente) );
    };
};

const setNumeroIdentificacion = (docente, value) => {
    return ( dispatch ) => {
        docente.numeroidentificacion = value;
        docente.error.numeroidentificacion = false;
        docente.message.numeroidentificacion = "";
        dispatch( onChange(docente) );
    };
};

const setGenero = (docente, value) => {
    return ( dispatch ) => {
        docente.genero = value;
        docente.error.genero = false;
        docente.message.genero = "";
        dispatch( onChange(docente) );
    };
};

const setEstadoCivil = (docente, value) => {
    return ( dispatch ) => {
        docente.estadocivil = value;
        docente.error.estadocivil = false;
        docente.message.estadocivil = "";
        dispatch( onChange(docente) );
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

const setFKIDCiudadNacimiento = (docente, ciudad) => {
    return ( dispatch ) => {
        docente.fkidciudadnacimiento = ciudad.idciudad;
        ciudad.arrayFamily = [ ...ciudad.arrayFamily, ciudad.descripcion ];
        docente.ciudadnacimiento = `${getCiudadNacimiento(ciudad.arrayFamily)}`;
        docente.error.fkidciudadnacimiento = false;
        docente.message.fkidciudadnacimiento = "";
        dispatch( onChange(docente) );
    };
};

const setFKIDCiudadResidencia = (docente, ciudad) => {
    return ( dispatch ) => {
        docente.fkidciudadresidencia = ciudad.idciudad;
        ciudad.arrayFamily = [ ...ciudad.arrayFamily, ciudad.descripcion ];
        docente.ciudadresidencia = `${getCiudadNacimiento(ciudad.arrayFamily)}`;
        docente.error.fkidciudadresidencia = false;
        docente.message.fkidciudadresidencia = "";
        dispatch( onChange(docente) );
    };
};

const setDireccion = (docente, value) => {
    return ( dispatch ) => {
        docente.direccion = value;
        dispatch( onChange(docente) );
    };
};

const setBarrio = (docente, value) => {
    return ( dispatch ) => {
        docente.barrio = value;
        dispatch( onChange(docente) );
    };
};

const setManzano = (docente, value) => {
    return ( dispatch ) => {
        docente.manzano = value;
        dispatch( onChange(docente) );
    };
};

const setUV = (docente, value) => {
    return ( dispatch ) => {
        docente.uv = value;
        dispatch( onChange(docente) );
    };
};

const setTelefono = (docente, value) => {
    return ( dispatch ) => {
        docente.telefono = value;
        dispatch( onChange(docente) );
    };
};

const setCelular = (docente, value) => {
    return ( dispatch ) => {
        docente.celular = value;
        dispatch( onChange(docente) );
    };
};

const setEmail = (docente, value) => {
    return ( dispatch ) => {
        docente.email = value;
        docente.error.email = false;
        docente.message.email = "";
        dispatch( onChange(docente) );
    };
};

const setImagen = (docente, value) => {
    return ( dispatch ) => {
        docente.imagen = value;
        dispatch( onChange(docente) );
    };
};

const setEstado = (docente, value) => {
    return ( dispatch ) => {
        docente.estado = value;
        docente.error.estado = false;
        docente.message.estado = "";
        dispatch( onChange(docente) );
    };
};

const setISDelete = (docente, value) => {
    return ( dispatch ) => {
        docente.isdelete = value;
        docente.error.isdelete = false;
        docente.message.isdelete = "";
        dispatch( onChange(docente) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( iddocente ) => {
    return ( dispatch ) => {
        DocenteService.onShow( 
            iddocente 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.docente ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( iddocente ) => {
    return ( dispatch ) => {
        DocenteService.onEdit( 
            iddocente 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.docente ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( docente, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( docente ) ) {
            dispatch( onChange( docente ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            DocenteService.onStore(
                docente
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
            title: "Registrar Docente", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( docente, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( docente ) ) {
            dispatch( onChange( docente ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            DocenteService.onUpdate(
                docente
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
            title: "Editar Docente", onOk: onUpdate,
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

const onDelete = ( docente ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            DocenteService.onDelete(
                docente
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageDocente() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Docente", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const DocenteActions = {
    initData, onPageDocente, getAllDocente,
    onLimpiar, onChange,
    onAddNacionalidad, onDeleteNacionalidad,
    onAddRowMateria, onDeleteRowMateria,
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
