
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { MotivoAperturaCierreCursoService } from '../../services/ofertaacademica/motivoaperturacierrecurso.service';

const setInit = () => ( {
    type: Constants.motivoaperturacierrecurso_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.motivoaperturacierrecurso_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.motivoaperturacierrecurso_onChange,
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
    type: Constants.motivoaperturacierrecurso_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.motivoaperturacierrecurso_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageMotivoAperturaCierreCurso = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        MotivoAperturaCierreCursoService.getAllMotivoAperturaCierreCurso( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listMotivoAperturaCierreCurso',
                        value: result.arrayMotivoAperturaCierreCurso,
                    },
                    pagination: {
                        name: 'paginationMotivoAperturaCierreCurso',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageMotivoAperturaCierreCurso',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateMotivoAperturaCierreCurso',
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

const getAllMotivoAperturaCierreCurso = () => {
    return ( dispatch ) => {
        MotivoAperturaCierreCursoService.getAllMotivoAperturaCierreCurso(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listMotivoAperturaCierreCurso',
                    value: result.arrayMotivoAperturaCierreCurso,
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

const setSigla = (motivoAperturaCierreCurso, value) => {
    return ( dispatch ) => {
        motivoAperturaCierreCurso.sigla = value;
        motivoAperturaCierreCurso.error.sigla = false;
        motivoAperturaCierreCurso.message.sigla = "";
        dispatch( onChange(motivoAperturaCierreCurso) );
    };
};

const setDescripcion = (motivoAperturaCierreCurso, value) => {
    return ( dispatch ) => {
        motivoAperturaCierreCurso.descripcion = value;
        motivoAperturaCierreCurso.error.descripcion = false;
        motivoAperturaCierreCurso.message.descripcion = "";
        dispatch( onChange(motivoAperturaCierreCurso) );
    };
};

const setEstado = (motivoAperturaCierreCurso, value) => {
    return ( dispatch ) => {
        motivoAperturaCierreCurso.estado = value;
        motivoAperturaCierreCurso.error.estado = false;
        motivoAperturaCierreCurso.message.estado = "";
        dispatch( onChange(motivoAperturaCierreCurso) );
    };
};

const setISDelete = (motivoAperturaCierreCurso, value) => {
    return ( dispatch ) => {
        motivoAperturaCierreCurso.isdelete = value;
        motivoAperturaCierreCurso.error.isdelete = false;
        motivoAperturaCierreCurso.message.isdelete = "";
        dispatch( onChange(motivoAperturaCierreCurso) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idmotivoaperturacierrecurso ) => {
    return ( dispatch ) => {
        MotivoAperturaCierreCursoService.onShow( 
            idmotivoaperturacierrecurso 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.motivoAperturaCierreCurso ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idmotivoaperturacierrecurso ) => {
    return ( dispatch ) => {
        MotivoAperturaCierreCursoService.onEdit( 
            idmotivoaperturacierrecurso 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.motivoAperturaCierreCurso ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( motivoAperturaCierreCurso, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( motivoAperturaCierreCurso ) ) {
            dispatch( onChange( motivoAperturaCierreCurso ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            MotivoAperturaCierreCursoService.onStore(
                motivoAperturaCierreCurso
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
            title: "Registrar Motivo Apertura Cierre Curso", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( motivoAperturaCierreCurso, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( motivoAperturaCierreCurso ) ) {
            dispatch( onChange( motivoAperturaCierreCurso ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            MotivoAperturaCierreCursoService.onUpdate(
                motivoAperturaCierreCurso
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
            title: "Editar Motivo Apertura Cierre Curso", onOk: onUpdate,
            okType: "primary", content: "Estás seguro de actualizar información?",
        } );
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

const onDelete = ( motivoAperturaCierreCurso ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            MotivoAperturaCierreCursoService.onDelete(
                motivoAperturaCierreCurso
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageMotivoAperturaCierreCurso() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Motivo Apertura Cierre Curso", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const MotivoAperturaCierreCursoActions = {
    initData,
    onPageMotivoAperturaCierreCurso,
    getAllMotivoAperturaCierreCurso,
    onLimpiar,
    setSigla,
    setDescripcion,
    setEstado,
    setISDelete,
    onCreate,
    onGrabar,
    onShow,
    onEdit,
    onUpdate,
    onDelete,
};
