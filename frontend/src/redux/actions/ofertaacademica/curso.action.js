
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';
import { CursoService } from '../../services/ofertaacademica/curso.service';

const setInit = () => ( {
    type: Constants.curso_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.curso_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.curso_onChange,
    payload: data,
} );

const onAddRowDocente = ( ) => ( {
    type: Constants.curso_onAddRowDocente,
} );

const onDeleteRowDocente = ( index ) => ( {
    type: Constants.curso_onDeleteRowDocente,
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
    type: Constants.curso_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.curso_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageCurso = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        CursoService.getAllCurso( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listCurso',
                        value: result.arrayCurso,
                    },
                    pagination: {
                        name: 'paginationCurso',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageCurso',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateCurso',
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

const getAllCurso = () => {
    return async ( dispatch ) => {
        await CursoService.getAllCurso(
            
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listCurso',
                    value: result.arrayCurso,
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

const setFKIDUnidadAcademica = (curso, unidadAcademica) => {
    return ( dispatch ) => {
        curso.fkidunidadacademica = unidadAcademica.idunidadacademica;
        curso.unidadacademica = unidadAcademica.descripcion;

        curso.fkidunidadadministrativa = unidadAcademica.fkidunidadadministrativa;
        curso.unidadadministrativa = unidadAcademica.unidadadministrativa;

        curso.fkidunidadnegocio = unidadAcademica.fkidunidadnegocio;
        curso.unidadnegocio = unidadAcademica.unidadnegocio;

        curso.error.fkidunidadacademica = false;
        curso.message.fkidunidadacademica = "";

        curso.error.fkidunidadadministrativa = false;
        curso.message.fkidunidadadministrativa = "";

        curso.error.fkidunidadnegocio = false;
        curso.message.fkidunidadnegocio = "";
        dispatch( onChange(curso) );
    };
};

const setFKIDModalidadAcademica = (curso, modalidadAcademica) => {
    return ( dispatch ) => {
        curso.fkidmodalidadacademica = modalidadAcademica.idmodalidadacademica;
        curso.modalidadacademica = modalidadAcademica.descripcion;

        curso.error.fkidmodalidadacademica = false;
        curso.message.fkidmodalidadacademica = "";
        dispatch( onChange(curso) );
    };
};

const setFKIDTurno = (curso, turno) => {
    return ( dispatch ) => {
        curso.fkidturno = turno.idturno;
        curso.turno = turno.descripcion;
        curso.descripcion = `${curso.materia} - Turno ${turno.descripcion}`;
        curso.error.fkidturno = false;
        curso.message.fkidturno = "";
        dispatch( onChange(curso) );
    };
};

const setFKIDMateria = (curso, materia) => {
    return ( dispatch ) => {
        curso.fkidmateria = materia.idmateria;
        curso.materia = materia.nombrelargo;
        curso.descripcion = `${materia.nombrelargo} - ${curso.turno}`;
        curso.error.fkidmateria = false;
        curso.message.fkidmateria = "";
        dispatch( onChange(curso) );
    };
};

const setFKIDGestionPeriodo = (curso, gestionPeriodo) => {
    return ( dispatch ) => {
        curso.fkidgestionperiodo = gestionPeriodo.idgestionperiodo;
        curso.gestionperiodo = gestionPeriodo.descripcion;
        curso.error.fkidgestionperiodo = false;
        curso.message.fkidgestionperiodo = "";
        dispatch( onChange(curso) );
    };
};

const setSigla = (curso, value) => {
    return ( dispatch ) => {
        curso.sigla = value;
        curso.error.sigla = false;
        curso.message.sigla = "";
        dispatch( onChange(curso) );
    };
};

const setDescripcion = (curso, value) => {
    return ( dispatch ) => {
        curso.descripcion = value;
        curso.error.descripcion = false;
        curso.message.descripcion = "";
        dispatch( onChange(curso) );
    };
};

const setCupo = (curso, value) => {
    return ( dispatch ) => {
        if ( !isNaN( value ) || value === "" ) {
            if ( value === "" || parseInt( value ) >= 0 ) {
                curso.cupo = value === "" ? "" : parseInt( value );
                curso.error.cupo = false;
                curso.message.cupo = "";
                dispatch( onChange(curso) );
            }
        }
    };
};

const setFechaInicio = (curso, value) => {
    return ( dispatch ) => {
        if ( Functions.compareInitDateString(value, curso.fechafinal) ) {
            if ( value === "" ) {
                curso.fechafinal = "";
            }
            curso.fechainicio = value;
            curso.error.fechainicio = false;
            curso.message.fechainicio = "";
            dispatch( onChange(curso) );
        }
    };
};

const setFechaFinal = (curso, value) => {
    return ( dispatch ) => {
        if ( Functions.compareFinishDateString(curso.fechainicio, value) ) {
            curso.fechafinal = value;
            curso.error.fechafinal = false;
            curso.message.fechafinal = "";
            dispatch( onChange(curso) );
        }
    };
};

const setPreRequisito = (curso, value) => {
    return ( dispatch ) => {
        curso.prerequisito = value;
        dispatch( onChange(curso) );
    };
};

const setObjetivo = (curso, value) => {
    return ( dispatch ) => {
        curso.objetivo = value;
        dispatch( onChange(curso) );
    };
};

const setCantidadHora = (curso, value) => {
    return ( dispatch ) => {
        if ( !isNaN( value ) || value === "" ) {
            if ( value === "" || parseInt( value ) >= 0 ) {
                curso.cantidadhora = value === "" ? "" : parseInt( value );
                curso.error.cantidadhora = false;
                curso.message.cantidadhora = "";
                dispatch( onChange(curso) );
            }
        }
    };
};

const setInversionBase = (curso, value) => {
    return ( dispatch ) => {
        if ( !isNaN( value ) || value === "" ) {
            if ( value === "" || parseFloat( value ) >= 0 ) {
                curso.inversionbase = value;
                curso.error.inversionbase = false;
                curso.message.inversionbase = "";
                dispatch( onChange(curso) );
            }
        }
    };
};

const setFKIDMotivoAperturaCierre = (curso, motivoAperturaCierreCurso) => {
    return ( dispatch ) => {
        curso.fkidmotivoaperturacierrecurso = motivoAperturaCierreCurso.idmotivoaperturacierrecurso;
        curso.motivoaperturacierrecurso = `${motivoAperturaCierreCurso.descripcion}`;
        curso.error.fkidmotivoaperturacierrecurso = false;
        curso.message.fkidmotivoaperturacierrecurso = "";
        dispatch( onChange(curso) );
    };
};

const setFKIDAdminitrativo = (curso, administrativo) => {
    return ( dispatch ) => {
        curso.fkidadministrativo = administrativo.idadministrativo;
        curso.administrativo = `${administrativo.nombreprincipal} ${administrativo.nombreadicional} ${administrativo.apellidoprimero} ${administrativo.apellidosegundo}`;
        curso.error.fkidadministrativo = false;
        curso.message.fkidadministrativo = "";
        dispatch( onChange(curso) );
    };
};

const setObservacion = (curso, value) => {
    return ( dispatch ) => {
        curso.observaciones = value;
        dispatch( onChange(curso) );
    };
};

const setFechaOperacion = (curso, value) => {
    return ( dispatch ) => {
        curso.fechaoperacion = value;
        curso.error.fechaoperacion = false;
        curso.message.fechaoperacion = "";
        dispatch( onChange(curso) );
    };
};

const setEstadoProceso = (curso, value) => {
    return ( dispatch ) => {
        curso.estadoproceso = value;
        curso.error.estadoproceso = false;
        curso.message.estadoproceso = "";
        dispatch( onChange(curso) );
    };
};

const setEstado = (curso, value) => {
    return ( dispatch ) => {
        curso.estado = value;
        curso.error.estado = false;
        curso.message.estado = "";
        dispatch( onChange(curso) );
    };
};

const setISDelete = (curso, value) => {
    return ( dispatch ) => {
        curso.isdelete = value;
        curso.error.isdelete = false;
        curso.message.isdelete = "";
        dispatch( onChange(curso) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idcurso ) => {
    return ( dispatch ) => {
        CursoService.onShow( 
            idcurso 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.curso ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idcurso ) => {
    return ( dispatch ) => {
        CursoService.onEdit( 
            idcurso 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.curso ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( curso, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( curso ) ) {
            dispatch( onChange( curso ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            CursoService.onStore(
                curso
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                } else if ( result.resp === 0 ) {
                    Swal.fire( {
                        position: 'top-end',
                        icon: 'warning',
                        title: 'No se pudo registrar.',
                        text: result.message,
                        showConfirmButton: false,
                        timer: 3000,
                    } );
                    curso.error.sigla   = true;
                    curso.message.sigla = "Sigla ya existente.";
                    dispatch( onChange(curso) );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Registrar Curso", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( curso, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( curso ) ) {
            dispatch( onChange( curso ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            CursoService.onUpdate(
                curso
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                    onBack();
                } else if ( result.resp === 0 ) {
                    Swal.fire( {
                        position: 'top-end',
                        icon: 'warning',
                        title: 'No se pudo actualizar.',
                        text: result.message,
                        showConfirmButton: false,
                        timer: 3000,
                    } );
                    curso.error.sigla   = true;
                    curso.message.sigla = "Sigla ya existente.";
                    dispatch( onChange(curso) );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Editar Curso", onOk: onUpdate,
            okType: "primary", content: "Estás seguro de actualizar información?",
        } );
    };
};

function onValidate( data ) {
    let bandera = true;
    if ( data.fkidunidadnegocio.toString().trim().length === 0 ) {
        data.error.fkidunidadnegocio   = true;
        data.message.fkidunidadnegocio = "Campo requerido.";
        bandera = false;
    }
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
    if ( data.fkidmodalidadacademica.toString().trim().length === 0 ) {
        data.error.fkidmodalidadacademica   = true;
        data.message.fkidmodalidadacademica = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidturno.toString().trim().length === 0 ) {
        data.error.fkidturno   = true;
        data.message.fkidturno = "Campo requerido.";
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
    if ( data.cupo.toString().trim().length === 0 ) {
        data.error.cupo   = true;
        data.message.cupo = "Campo requerido.";
        bandera = false;
    }
    if ( data.cupo.toString().trim().length > 0 ) {
        if ( parseInt(data.cupo) < 0 ) {
            data.error.cupo   = true;
            data.message.cupo = "Campo debe ser mayor o igual a 0.";
            bandera = false;
        }
    }
    if ( data.fechainicio.toString().trim().length === 0 ) {
        data.error.fechainicio   = true;
        data.message.fechainicio = "Campo requerido.";
        bandera = false;
    }
    if ( data.fechafinal.toString().trim().length === 0 ) {
        data.error.fechafinal   = true;
        data.message.fechafinal = "Campo requerido.";
        bandera = false;
    }
    if ( data.cantidadhora.toString().trim().length === 0 ) {
        data.error.cantidadhora   = true;
        data.message.cantidadhora = "Campo requerido.";
        bandera = false;
    }
    if ( data.cantidadhora.toString().trim().length > 0 ) {
        if ( parseInt(data.cantidadhora) < 0 ) {
            data.error.cantidadhora   = true;
            data.message.cantidadhora = "Campo debe ser mayor o igual a 0.";
            bandera = false;
        }
    }
    if ( data.inversionbase.toString().trim().length === 0 ) {
        data.error.inversionbase   = true;
        data.message.inversionbase = "Campo requerido.";
        bandera = false;
    }
    if ( data.inversionbase.toString().trim().length > 0 ) {
        if ( parseInt(data.inversionbase) < 0 ) {
            data.error.inversionbase   = true;
            data.message.inversionbase = "Campo debe ser mayor o igual a 0.";
            bandera = false;
        }
    }
    if ( data.estado.toString().trim().length === 0 ) {
        data.error.estado   = true;
        data.message.estado = "Campo requerido.";
        bandera = false;
    }
    if ( data.arraydocente.length > 0 ) {
        if ( data.arraydocente[0].fkiddocente === null ) {
            data.arraydocente[0].error.fkiddocente   = true;
            data.arraydocente[0].message.fkiddocente = "Campo requerido.";
            bandera = false;
        }
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
        return bandera;
    }
    if ( data.arraydocente.length === 0 ) {
        Swal.fire( {
            position: 'top-end',
            icon: 'warning',
            title: "No se pudo realizar la Funcionalidad",
            text: "Al menos debe tener un docente rellenado.",
            showConfirmButton: false,
            timer: 3000,
        } );
        bandera = false;
    }
    return bandera;
};

const onDelete = ( curso ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            CursoService.onDelete(
                curso
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageCurso() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Curso", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

function onValidateAperturaCierre( data ) {
    let bandera = true;
    if ( data.idcurso.toString().trim().length === 0 ) {
        data.error.idcurso   = true;
        data.message.idcurso = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidmotivoaperturacierrecurso.toString().trim().length === 0 ) {
        data.error.fkidmotivoaperturacierrecurso   = true;
        data.message.fkidmotivoaperturacierrecurso = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidadministrativo.toString().trim().length === 0 ) {
        data.error.fkidadministrativo   = true;
        data.message.fkidadministrativo = "Campo requerido.";
        bandera = false;
    }
    if ( data.fechaoperacion.toString().trim().length === 0 ) {
        data.error.fechaoperacion   = true;
        data.message.fechaoperacion = "Campo requerido.";
        bandera = false;
    }
    if ( data.estadoproceso !== "C" && data.estadoproceso !== "A" ) {
        data.error.estadoproceso   = true;
        data.message.estadoproceso = "Campo requerido.";
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
        return bandera;
    }
    return bandera;
};

const onAperturaCierre = ( curso ) => {
    return ( dispatch ) => {
        if ( !onValidateAperturaCierre( curso ) ) {
            dispatch( onChange( curso ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            CursoService.onAperturaCierre(
                curso
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Aperturar o Cerrar Curso", onOk: onStore,
            okType: "primary", content: "Estás seguro de aperturar o cerrar curso?",
        } );
    };
};

function onValidateCierre( data ) {
    let bandera = true;
    if ( data.idcurso.toString().trim().length === 0 ) {
        data.error.idcurso   = true;
        data.message.idcurso = "Campo requerido.";
        bandera = false;
    }
    if ( data.fechaoperacion.toString().trim().length === 0 ) {
        data.error.fechaoperacion   = true;
        data.message.fechaoperacion = "Campo requerido.";
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
        return bandera;
    }
    return bandera;
};

const onCierre = ( curso ) => {
    return ( dispatch ) => {
        if ( !onValidateCierre( curso ) ) {
            dispatch( onChange( curso ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            CursoService.onCierre(
                curso
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onLimpiar() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Cerrar Curso", onOk: onStore,
            okType: "primary", content: "Estás seguro de cerrar curso? Una vez cerrado sus informaciones no serán modificados.",
        } );
    };
};

export const CursoActions = {
    initData, onPageCurso, getAllCurso,
    setShowData,
    onLimpiar, onChange,
    onAddRowDocente, onDeleteRowDocente,
    setFKIDUnidadAcademica,
    setFKIDModalidadAcademica,
    setFKIDTurno,
    setFKIDMateria,
    setFKIDGestionPeriodo,
    setSigla,
    setDescripcion,
    setCupo,
    setFechaInicio,
    setFechaFinal,
    setPreRequisito,
    setObjetivo,
    setCantidadHora,
    setInversionBase,
    setFKIDMotivoAperturaCierre,
    setFKIDAdminitrativo,
    setObservacion,
    setFechaOperacion,
    setEstadoProceso,
    setEstado,
    setISDelete,
    onCreate,
    onGrabar,
    onShow,
    onEdit,
    onUpdate,
    onDelete,
    onAperturaCierre,
    onCierre,
};
