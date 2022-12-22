
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';
import { InscripcionProgramaService } from '../../services/inscripcion/inscripcionprograma.service';

const setInit = () => ( {
    type: Constants.inscripcionprograma_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.inscripcionprograma_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.inscripcionprograma_onChange,
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
    type: Constants.inscripcionprograma_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.inscripcionprograma_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageInscripcionPrograma = ( page = 1, paginate = 20, search = "", fkidprograma = "", fkidgestionperiodo = "" ) => {
    return ( dispatch ) => {
        dispatch( setShowLoading() );
        InscripcionProgramaService.getAllInscripcionPrograma( {
            page: page, paginate: paginate, 
            fkidprograma: fkidprograma, fkidgestionperiodo: fkidgestionperiodo, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                result.arrayInscripcionPrograma = result.arrayInscripcionPrograma?.map( (item) => {
                    return {
                        ...item,
                        nameestudiante: `${item.estudiante.apellidoprimero} ${item.estudiante.apellidosegundo} ${item.estudiante.nombreprincipal} ${item.estudiante.nombreadicional}`,
                        registroestudiante: item.estudiante.numeroregistro,
                    };
                } );
                let obj = {
                    data: {
                        name: 'listInscripcionPrograma',
                        value: result.arrayInscripcionPrograma,
                    },
                    pagination: {
                        name: 'paginationInscripcionPrograma',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageInscripcionPrograma',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateInscripcionPrograma',
                        value: paginate,
                    },
                };
                dispatch( onPaginateModule(obj) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {
            dispatch( setHiddenLoading() );
        } );
    };
};

const getAllInscripcionPrograma = () => {
    return ( dispatch ) => {
        InscripcionProgramaService.getAllInscripcionPrograma(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listInscripcionPrograma',
                    value: result.arrayInscripcionPrograma,
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

const setFKIDPensum = (inscripcionPrograma, pensum) => {
    return ( dispatch ) => {
        inscripcionPrograma.fkidpensum = pensum.idpensum;
        inscripcionPrograma.pensum = pensum.descripcion;

        inscripcionPrograma.fkidunidadadministrativa = pensum.fkidunidadadministrativa;
        inscripcionPrograma.unidadadministrativa = pensum.unidadadministrativa;

        inscripcionPrograma.fkidunidadacademica = pensum.fkidunidadacademica;
        inscripcionPrograma.unidadacademica = pensum.unidadacademica;

        inscripcionPrograma.fkidunidadnegocio = pensum.fkidunidadnegocio;
        inscripcionPrograma.unidadnegocio = pensum.unidadnegocio;

        inscripcionPrograma.fkidprograma = pensum.fkidprograma;
        inscripcionPrograma.programa = pensum.programa;

        inscripcionPrograma.error.fkidpensum = false;
        inscripcionPrograma.message.fkidpensum = "";

        inscripcionPrograma.error.fkidunidadadministrativa = false;
        inscripcionPrograma.message.fkidunidadadministrativa = "";

        inscripcionPrograma.error.fkidunidadacademica = false;
        inscripcionPrograma.message.fkidunidadacademica = "";

        inscripcionPrograma.error.fkidunidadnegocio = false;
        inscripcionPrograma.message.fkidunidadnegocio = "";

        inscripcionPrograma.error.fkidprograma = false;
        inscripcionPrograma.message.fkidprograma = "";
        dispatch( onChange(inscripcionPrograma) );
    };
};

const setFKIDEstudiante = (inscripcionPrograma, estudiante) => {
    return ( dispatch ) => {
        inscripcionPrograma.fkidestudiante = estudiante.idestudiante;
        inscripcionPrograma.estudiante = `${estudiante.apellidoprimero} ${estudiante.apellidosegundo} ${estudiante.nombreprincipal} ${estudiante.nombreadicional}`;
        inscripcionPrograma.numeroregistro = estudiante.numeroregistro;
        inscripcionPrograma.error.fkidestudiante = false;
        inscripcionPrograma.message.fkidestudiante = "";
        dispatch( onChange(inscripcionPrograma) );
    };
};

const setFKIDGestionPeriodo = (inscripcionPrograma, gestionPeriodo) => {
    return ( dispatch ) => {
        inscripcionPrograma.fkidgestionperiodo = gestionPeriodo.idgestionperiodo;
        inscripcionPrograma.gestionperiodo = gestionPeriodo.descripcion;
        inscripcionPrograma.error.fkidgestionperiodo = false;
        inscripcionPrograma.message.fkidgestionperiodo = "";
        dispatch( onChange(inscripcionPrograma) );
    };
};

const setFechaInscripcion = (inscripcionPrograma, value) => {
    return ( dispatch ) => {
        inscripcionPrograma.fechainscripcion = value;
        inscripcionPrograma.error.fechainscripcion = false;
        inscripcionPrograma.message.fechainscripcion = "";
        dispatch( onChange(inscripcionPrograma) );
    };
};

const setEsInscripcionFormalizada = (inscripcionPrograma, value) => {
    return ( dispatch ) => {
        inscripcionPrograma.esinscripcionformalizada = value;
        inscripcionPrograma.error.esinscripcionformalizada = false;
        inscripcionPrograma.message.esinscripcionformalizada = "";
        dispatch( onChange(inscripcionPrograma) );
    };
};

const setNota = (inscripcionPrograma, value) => {
    return ( dispatch ) => {
        inscripcionPrograma.nota = value;
        dispatch( onChange(inscripcionPrograma) );
    };
};

const setEstado = (inscripcionPrograma, value) => {
    return ( dispatch ) => {
        inscripcionPrograma.estado = value;
        inscripcionPrograma.error.estado = false;
        inscripcionPrograma.message.estado = "";
        dispatch( onChange(inscripcionPrograma) );
    };
};

const setISDelete = (inscripcionPrograma, value) => {
    return ( dispatch ) => {
        inscripcionPrograma.isdelete = value;
        inscripcionPrograma.error.isdelete = false;
        inscripcionPrograma.message.isdelete = "";
        dispatch( onChange(inscripcionPrograma) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idinscripcionprograma ) => {
    return ( dispatch ) => {
        InscripcionProgramaService.onShow( 
            idinscripcionprograma 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.inscripcionPrograma ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idinscripcionprograma ) => {
    return ( dispatch ) => {
        InscripcionProgramaService.onEdit( 
            idinscripcionprograma 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.inscripcionPrograma ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( inscripcionPrograma, onBack = () => {} ) => {
    return ( dispatch ) => {
        if ( !onValidate( inscripcionPrograma ) ) {
            dispatch( onChange( inscripcionPrograma ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            InscripcionProgramaService.onStore(
                inscripcionPrograma
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( setCreate() );
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
            title: "Registrar Inscripción Programa", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( inscripcionPrograma, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( inscripcionPrograma ) ) {
            dispatch( onChange( inscripcionPrograma ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            InscripcionProgramaService.onUpdate(
                inscripcionPrograma
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
            title: "Editar Inscripción Programa", onOk: onUpdate,
            okType: "primary", content: "Estás seguro de actualizar información?",
        } );
    };
};

function onValidate( data ) {
    let bandera = true;
    if ( data.fkidunidadadministrativa.toString().trim().length === 0 ) {
        data.error.fkidunidadadministrativa   = true;
        data.message.fkidunidadadministrativa = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidunidadacademica.toString().trim().length === 0 ) {
        data.error.fkidunidadacademica   = true;
        data.message.fkidunidadacademica = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidunidadnegocio.toString().trim().length === 0 ) {
        data.error.fkidunidadnegocio   = true;
        data.message.fkidunidadnegocio = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidprograma.toString().trim().length === 0 ) {
        data.error.fkidprograma   = true;
        data.message.fkidprograma = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidpensum.toString().trim().length === 0 ) {
        data.error.fkidpensum   = true;
        data.message.fkidpensum = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidgestionperiodo.toString().trim().length === 0 ) {
        data.error.fkidgestionperiodo   = true;
        data.message.fkidgestionperiodo = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidestudiante.toString().trim().length === 0 ) {
        data.error.fkidestudiante   = true;
        data.message.fkidestudiante = "Campo requerido.";
        bandera = false;
    }
    if ( data.fechainscripcion.toString().trim().length === 0 ) {
        data.error.fechainscripcion   = true;
        data.message.fechainscripcion = "Campo requerido.";
        bandera = false;
    }
    if ( data.esinscripcionformalizada.toString().trim().length === 0 ) {
        data.error.esinscripcionformalizada   = true;
        data.message.esinscripcionformalizada = "Campo requerido.";
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

const onDelete = ( inscripcionPrograma, fkidprograma = null, fkidgestionperiodo = null, ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            InscripcionProgramaService.onDelete(
                inscripcionPrograma
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageInscripcionPrograma(1, 25, '', fkidprograma, fkidgestionperiodo) );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Estudiante Inscrito a Grupo.", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const InscripcionProgramaActions = {
    initData,
    onPageInscripcionPrograma,
    getAllInscripcionPrograma,
    onLimpiar,
    setFKIDPensum,
    setFKIDEstudiante,
    setFKIDGestionPeriodo,
    setFechaInscripcion,
    setEsInscripcionFormalizada,
    setNota,
    setEstado,
    setISDelete,
    onCreate,
    onGrabar,
    onShow,
    onEdit,
    onUpdate,
    onDelete,
};
