
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';
import { InscripcionCursoService } from '../../services/inscripcion/inscripcioncurso.service';

const setInit = () => ( {
    type: Constants.inscripcioncurso_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.inscripcioncurso_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.inscripcioncurso_onChange,
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
    type: Constants.inscripcioncurso_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.inscripcioncurso_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageInscripcionCurso = ( page = 1, paginate = 20, search = "", fkidcurso = "", ) => {
    return ( dispatch ) => {
        dispatch( setShowLoading() );
        InscripcionCursoService.getAllInscripcionCurso( {
            page: page, paginate: paginate, 
            fkidcurso: fkidcurso,
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                result.arrayInscripcionCurso = result.arrayInscripcionCurso?.map( (item) => {
                    return {
                        ...item,
                        nameestudiante: `${item.estudiante.apellidoprimero} ${item.estudiante.apellidosegundo} ${item.estudiante.nombreprincipal} ${item.estudiante.nombreadicional}`,
                        registroestudiante: item.estudiante.numeroregistro,
                    };
                } );
                let obj = {
                    data: {
                        name: 'listInscripcionCurso',
                        value: result.arrayInscripcionCurso,
                    },
                    pagination: {
                        name: 'paginationInscripcionCurso',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageInscripcionCurso',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateInscripcionCurso',
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

const getAllInscripcionCurso = () => {
    return ( dispatch ) => {
        InscripcionCursoService.getAllInscripcionCurso(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listInscripcionCurso',
                    value: result.arrayInscripcionCurso,
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

const setFKIDCurso = (inscripcionCurso, curso) => {
    return ( dispatch ) => {
        inscripcionCurso.fkidcurso = curso.idcurso;
        inscripcionCurso.curso = `${curso.sigla} - ${curso.descripcion}`;

        inscripcionCurso.fkidunidadadministrativa = curso.unidadAdministrativa.idunidadadministrativa;
        inscripcionCurso.unidadadministrativa = curso.unidadAdministrativa.descripcion;

        inscripcionCurso.fkidunidadacademica = curso.unidadAcademica.idunidadacademica;
        inscripcionCurso.unidadacademica = curso.unidadAcademica.descripcion;

        inscripcionCurso.fkidunidadnegocio = curso.unidadNegocio.idunidadnegocio;
        inscripcionCurso.unidadnegocio = curso.unidadNegocio.descripcion;

        inscripcionCurso.fkidgestionperiodo = curso.gestionPeriodo.idgestionperiodo;
        inscripcionCurso.gestionperiodo = curso.gestionPeriodo.descripcion;

        inscripcionCurso.fkidturno = curso.turno.idturno;
        inscripcionCurso.turno = curso.turno.descripcion;

        inscripcionCurso.fkidmodalidadacademica = curso.modalidadAcademica.idmodalidadacademica;
        inscripcionCurso.modalidadacademica = curso.modalidadAcademica.descripcion;

        inscripcionCurso.error.fkidcurso = false;
        inscripcionCurso.message.fkidcurso = "";

        inscripcionCurso.error.fkidunidadadministrativa = false;
        inscripcionCurso.message.fkidunidadadministrativa = "";

        inscripcionCurso.error.fkidunidadacademica = false;
        inscripcionCurso.message.fkidunidadacademica = "";

        inscripcionCurso.error.fkidunidadnegocio = false;
        inscripcionCurso.message.fkidunidadnegocio = "";

        inscripcionCurso.error.fkidgestionperiodo = false;
        inscripcionCurso.message.fkidgestionperiodo = "";

        inscripcionCurso.error.fkidturno = false;
        inscripcionCurso.message.fkidturno = "";

        inscripcionCurso.error.fkidmodalidadacademica = false;
        inscripcionCurso.message.fkidmodalidadacademica = "";
        dispatch( onChange(inscripcionCurso) );
    };
};

const setFKIDEstudiante = (inscripcionCurso, estudiante) => {
    return ( dispatch ) => {
        inscripcionCurso.fkidestudiante = estudiante.idestudiante;
        inscripcionCurso.estudiante = `${estudiante.apellidoprimero} ${estudiante.apellidosegundo} ${estudiante.nombreprincipal} ${estudiante.nombreadicional}`;
        inscripcionCurso.numeroregistro = estudiante.numeroregistro;
        inscripcionCurso.error.fkidestudiante = false;
        inscripcionCurso.message.fkidestudiante = "";
        dispatch( onChange(inscripcionCurso) );
    };
};

const setFechaInscripcion = (inscripcionCurso, value) => {
    return ( dispatch ) => {
        inscripcionCurso.fechainscripcion = value;
        inscripcionCurso.error.fechainscripcion = false;
        inscripcionCurso.message.fechainscripcion = "";
        dispatch( onChange(inscripcionCurso) );
    };
};

const setEsInscripcionFormalizada = (inscripcionCurso, value) => {
    return ( dispatch ) => {
        inscripcionCurso.esinscripcionformalizada = value;
        inscripcionCurso.error.esinscripcionformalizada = false;
        inscripcionCurso.message.esinscripcionformalizada = "";
        dispatch( onChange(inscripcionCurso) );
    };
};

const setCondicion = (inscripcionCurso, value) => {
    return ( dispatch ) => {
        inscripcionCurso.condicion = value;
        inscripcionCurso.error.condicion = false;
        inscripcionCurso.message.condicion = "";
        dispatch( onChange(inscripcionCurso) );
    };
};

const setNota = (inscripcionCurso, value) => {
    return ( dispatch ) => {
        inscripcionCurso.nota = value;
        dispatch( onChange(inscripcionCurso) );
    };
};

const setEstado = (inscripcionCurso, value) => {
    return ( dispatch ) => {
        inscripcionCurso.estado = value;
        inscripcionCurso.error.estado = false;
        inscripcionCurso.message.estado = "";
        dispatch( onChange(inscripcionCurso) );
    };
};

const setISDelete = (inscripcionCurso, value) => {
    return ( dispatch ) => {
        inscripcionCurso.isdelete = value;
        inscripcionCurso.error.isdelete = false;
        inscripcionCurso.message.isdelete = "";
        dispatch( onChange(inscripcionCurso) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idinscripcioncurso ) => {
    return ( dispatch ) => {
        InscripcionCursoService.onShow( 
            idinscripcioncurso 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.inscripcionCurso ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idinscripcioncurso ) => {
    return ( dispatch ) => {
        InscripcionCursoService.onEdit( 
            idinscripcioncurso 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.inscripcionCurso ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( inscripcionCurso, onBack = () => {} ) => {
    return ( dispatch ) => {
        if ( !onValidate( inscripcionCurso ) ) {
            dispatch( onChange( inscripcionCurso ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            InscripcionCursoService.onStore(
                inscripcionCurso
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
            title: "Registrar Inscripción Curso", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( inscripcionCurso, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( inscripcionCurso ) ) {
            dispatch( onChange( inscripcionCurso ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            InscripcionCursoService.onUpdate(
                inscripcionCurso
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
            title: "Editar Inscripción Curso", onOk: onUpdate,
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
    if ( data.fkidcurso.toString().trim().length === 0 ) {
        data.error.fkidcurso   = true;
        data.message.fkidcurso = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidturno.toString().trim().length === 0 ) {
        data.error.fkidturno   = true;
        data.message.fkidturno = "Campo requerido.";
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
    if ( data.condicion.toString().trim().length === 0 ) {
        data.error.condicion   = true;
        data.message.condicion = "Campo requerido.";
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

const onDelete = ( inscripcionCurso, fkidcurso = null ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            InscripcionCursoService.onDelete(
                inscripcionCurso
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageInscripcionCurso(1, 25, '', fkidcurso) );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Estudiante Inscrito a Curso.", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const InscripcionCursoActions = {
    initData,
    onPageInscripcionCurso,
    getAllInscripcionCurso,
    onLimpiar,
    setFKIDCurso,
    setFKIDEstudiante,
    setFechaInscripcion,
    setEsInscripcionFormalizada,
    setCondicion,
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
