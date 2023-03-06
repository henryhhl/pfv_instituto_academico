
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';
import { InscripcionGrupoService } from '../../services/inscripcion/inscripciongrupo.service';

const setInit = () => ( {
    type: Constants.inscripciongrupo_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.inscripciongrupo_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.inscripciongrupo_onChange,
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
    type: Constants.inscripciongrupo_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.inscripciongrupo_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageInscripcionGrupo = ( page = 1, paginate = 20, search = "", fkidgrupo = "", fkidmateria = "", fkidgestionperiodo = "", ) => {
    return ( dispatch ) => {
        dispatch( setShowLoading() );
        InscripcionGrupoService.getAllInscripcionGrupo( {
            page: page, paginate: paginate, 
            fkidgrupo: fkidgrupo, fkidmateria: fkidmateria, fkidgestionperiodo: fkidgestionperiodo,
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                result.arrayInscripcionGrupo = result.arrayInscripcionGrupo?.map( (item) => {
                    return {
                        ...item,
                        nameestudiante: `${item.estudiante.apellidoprimero} ${item.estudiante.apellidosegundo} ${item.estudiante.nombreprincipal} ${item.estudiante.nombreadicional}`,
                        registroestudiante: item.estudiante.numeroregistro,
                    };
                } );
                let obj = {
                    data: {
                        name: 'listInscripcionGrupo',
                        value: result.arrayInscripcionGrupo,
                    },
                    pagination: {
                        name: 'paginationInscripcionGrupo',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageInscripcionGrupo',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateInscripcionGrupo',
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

const getAllInscripcionGrupo = () => {
    return ( dispatch ) => {
        InscripcionGrupoService.getAllInscripcionGrupo(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listInscripcionGrupo',
                    value: result.arrayInscripcionGrupo,
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

const setFKIDPensum = (inscripcionGrupo, pensum) => {
    return ( dispatch ) => {
        if ( inscripcionGrupo.fkidpensum !== pensum.idpensum ) {
            inscripcionGrupo.fkidpensum = pensum.idpensum;
            inscripcionGrupo.pensum = `${pensum.descripcion}`;

            inscripcionGrupo.fkidunidadadministrativa = pensum.fkidunidadadministrativa;
            inscripcionGrupo.unidadadministrativa = pensum.unidadadministrativa;

            inscripcionGrupo.fkidunidadacademica = pensum.fkidunidadacademica;
            inscripcionGrupo.unidadacademica = pensum.unidadacademica;

            inscripcionGrupo.fkidunidadnegocio = pensum.fkidunidadnegocio;
            inscripcionGrupo.unidadnegocio = pensum.unidadnegocio;

            inscripcionGrupo.fkidprograma = pensum.fkidprograma;
            inscripcionGrupo.programa = pensum.programa;

            inscripcionGrupo.fkidgrupopensumdetalle = '';

            inscripcionGrupo.fkidgrupo = '';
            inscripcionGrupo.grupo = '';

            inscripcionGrupo.fkidmateria = '';
            inscripcionGrupo.materia = '';

            inscripcionGrupo.fkiddocente = '';
            inscripcionGrupo.docente = '';

            inscripcionGrupo.fkidgestionperiodo = '';
            inscripcionGrupo.gestionperiodo = '';

            inscripcionGrupo.error.fkidpensum = false;
            inscripcionGrupo.message.fkidpensum = "";

            inscripcionGrupo.error.fkidunidadadministrativa = false;
            inscripcionGrupo.message.fkidunidadadministrativa = "";

            inscripcionGrupo.error.fkidunidadacademica = false;
            inscripcionGrupo.message.fkidunidadacademica = "";

            inscripcionGrupo.error.fkidunidadnegocio = false;
            inscripcionGrupo.message.fkidunidadnegocio = "";

            inscripcionGrupo.error.fkidprograma = false;
            inscripcionGrupo.message.fkidprograma = "";

            dispatch( onChange(inscripcionGrupo) );
        }
    };
};

const setFKIDGrupo = (inscripcionGrupo, grupo) => {
    return ( dispatch ) => {
        if ( inscripcionGrupo.fkidgrupo !== grupo.idgrupo ) {
            inscripcionGrupo.fkidgrupo = grupo.idgrupo;
            inscripcionGrupo.grupo = grupo.sigla;
            inscripcionGrupo.fkidmateria = '';
            inscripcionGrupo.materia = '';
            inscripcionGrupo.error.fkidgrupo = false;
            inscripcionGrupo.message.fkidgrupo = "";
            dispatch( onChange(inscripcionGrupo) );
        }
    };
};

const setFKIDMateria = (inscripcionGrupo, item) => {
    return ( dispatch ) => {
        inscripcionGrupo.fkidgrupopensumdetalle = item.idgrupopensumdetalle;
        inscripcionGrupo.fkidmateria = item.materia.idmateria;
        inscripcionGrupo.materia = item.materia.nombrelargo;

        inscripcionGrupo.fkidgestionperiodo = item.gestionPeriodo.idgestionperiodo;
        inscripcionGrupo.gestionperiodo = item.gestionPeriodo.descripcion;

        inscripcionGrupo.fkiddocente = item.docente.iddocente;
        inscripcionGrupo.docente = `${item.docente.apellidoprimero} ${item.docente.apellidosegundo} ${item.docente.nombreprincipal} ${item.docente.nombreadicional}`;
        
        inscripcionGrupo.error.fkidmateria = false;
        inscripcionGrupo.message.fkidmateria = "";
        dispatch( onChange(inscripcionGrupo) );
    };
};


const setFKIDEstudiante = (inscripcionGrupo, estudiante) => {
    return ( dispatch ) => {
        inscripcionGrupo.fkidestudiante = estudiante.idestudiante;
        inscripcionGrupo.estudiante = `${estudiante.apellidoprimero} ${estudiante.apellidosegundo} ${estudiante.nombreprincipal} ${estudiante.nombreadicional}`;
        inscripcionGrupo.numeroregistro = estudiante.numeroregistro;
        inscripcionGrupo.error.fkidestudiante = false;
        inscripcionGrupo.message.fkidestudiante = "";
        dispatch( onChange(inscripcionGrupo) );
    };
};

const setFKIDGestionPeriodo = (inscripcionGrupo, gestionPeriodo) => {
    return ( dispatch ) => {
        inscripcionGrupo.fkidgestionperiodo = gestionPeriodo.idgestionperiodo;
        inscripcionGrupo.gestionperiodo = gestionPeriodo.descripcion;
        inscripcionGrupo.error.fkidgestionperiodo = false;
        inscripcionGrupo.message.fkidgestionperiodo = "";
        dispatch( onChange(inscripcionGrupo) );
    };
};

const setFechaInscripcion = (inscripcionGrupo, value) => {
    return ( dispatch ) => {
        inscripcionGrupo.fechainscripcion = value;
        inscripcionGrupo.error.fechainscripcion = false;
        inscripcionGrupo.message.fechainscripcion = "";
        dispatch( onChange(inscripcionGrupo) );
    };
};

const setNota = (inscripcionGrupo, value) => {
    return ( dispatch ) => {
        inscripcionGrupo.nota = value;
        dispatch( onChange(inscripcionGrupo) );
    };
};

const setEstado = (inscripcionGrupo, value) => {
    return ( dispatch ) => {
        inscripcionGrupo.estado = value;
        inscripcionGrupo.error.estado = false;
        inscripcionGrupo.message.estado = "";
        dispatch( onChange(inscripcionGrupo) );
    };
};

const setISDelete = (inscripcionGrupo, value) => {
    return ( dispatch ) => {
        inscripcionGrupo.isdelete = value;
        inscripcionGrupo.error.isdelete = false;
        inscripcionGrupo.message.isdelete = "";
        dispatch( onChange(inscripcionGrupo) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idinscripciongrupo ) => {
    return ( dispatch ) => {
        InscripcionGrupoService.onShow( 
            idinscripciongrupo 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.inscripcionGrupo ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idinscripciongrupo ) => {
    return ( dispatch ) => {
        InscripcionGrupoService.onEdit( 
            idinscripciongrupo 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.inscripcionGrupo ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( inscripcionGrupo, onBack = () => {} ) => {
    return ( dispatch ) => {
        if ( !onValidate( inscripcionGrupo ) ) {
            dispatch( onChange( inscripcionGrupo ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            InscripcionGrupoService.onStore(
                inscripcionGrupo
            ).then( async (result) => {
                console.log(result)
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
            title: "Registrar Inscripción Grupo", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( inscripcionGrupo, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( inscripcionGrupo ) ) {
            dispatch( onChange( inscripcionGrupo ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            InscripcionGrupoService.onUpdate(
                inscripcionGrupo
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
            title: "Editar Inscripción Grupo", onOk: onUpdate,
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
    if ( data.fkidpensum.toString().trim().length === 0 ) {
        data.error.fkidpensum   = true;
        data.message.fkidpensum = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidprograma.toString().trim().length === 0 ) {
        data.error.fkidprograma   = true;
        data.message.fkidprograma = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidgrupo.toString().trim().length === 0 ) {
        data.error.fkidgrupo   = true;
        data.message.fkidgrupo = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidmateria.toString().trim().length === 0 ) {
        data.error.fkidmateria   = true;
        data.message.fkidmateria = "Campo requerido.";
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

const onDelete = ( inscripcionGrupo, fkidgrupo = null, fkidmateria = null, fkidgestionperiodo = null ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            InscripcionGrupoService.onDelete(
                inscripcionGrupo
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageInscripcionGrupo(1, 25, '', fkidgrupo, fkidmateria, fkidgestionperiodo) );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Inscripción Grupo", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const InscripcionGrupoActions = {
    initData,
    onPageInscripcionGrupo,
    getAllInscripcionGrupo,
    onLimpiar,
    setFKIDPensum,
    setFKIDGrupo,
    setFKIDMateria,
    setFKIDEstudiante,
    setFKIDGestionPeriodo,
    setFechaInscripcion,
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
