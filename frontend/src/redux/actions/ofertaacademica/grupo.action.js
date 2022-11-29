
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { GrupoService } from '../../services/ofertaacademica/grupo.service';

const setInit = () => ( {
    type: Constants.grupo_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.grupo_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.grupo_onChange,
    payload: data,
} );

const onAddRowPensum = ( ) => ( {
    type: Constants.grupo_onAddRowPensum,
} );

const onDeleteRowPensum = ( index ) => ( {
    type: Constants.grupo_onDeleteRowPensum,
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
    type: Constants.grupo_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.grupo_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageGrupo = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        GrupoService.getAllGrupo( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listGrupo',
                        value: result.arrayGrupo,
                    },
                    pagination: {
                        name: 'paginationGrupo',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageGrupo',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateGrupo',
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

const getAllGrupo = () => {
    return ( dispatch ) => {
        GrupoService.getAllGrupo(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                console.log(result)
                let obj = {
                    name: 'listGrupo',
                    value: result.arrayGrupo,
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

const setSigla = (grupo, value) => {
    return ( dispatch ) => {
        grupo.sigla = value;
        grupo.error.sigla = false;
        grupo.message.sigla = "";
        dispatch( onChange(grupo) );
    };
};

const setEstado = (grupo, value) => {
    return ( dispatch ) => {
        grupo.estado = value;
        grupo.error.estado = false;
        grupo.message.estado = "";
        dispatch( onChange(grupo) );
    };
};

const setISDelete = (grupo, value) => {
    return ( dispatch ) => {
        grupo.isdelete = value;
        grupo.error.isdelete = false;
        grupo.message.isdelete = "";
        dispatch( onChange(grupo) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idgrupo ) => {
    return ( dispatch ) => {
        GrupoService.onShow( 
            idgrupo 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.grupo ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idgrupo ) => {
    return ( dispatch ) => {
        GrupoService.onEdit( 
            idgrupo 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.grupo ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( grupo, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( grupo ) ) {
            dispatch( onChange( grupo ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            GrupoService.onStore(
                grupo
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
                    grupo.error.sigla   = true;
                    grupo.message.sigla = "Sigla ya existente.";
                    dispatch( onChange(grupo) );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Registrar Grupo", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( grupo, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( grupo ) ) {
            dispatch( onChange( grupo ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            GrupoService.onUpdate(
                grupo
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
                    grupo.error.sigla   = true;
                    grupo.message.sigla = "Sigla ya existente.";
                    dispatch( onChange(grupo) );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Editar Grupo", onOk: onUpdate,
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
    if ( data.estado.toString().trim().length === 0 ) {
        data.error.estado   = true;
        data.message.estado = "Campo requerido.";
        bandera = false;
    }
    if ( data.arraypensum?.length > 0 ) {
        for (let index = 0; index < data.arraypensum.length; index++) {
            const element = data.arraypensum[index];
            if ( element.fkidpensum === null ) {
                element.error.fkidpensum = true;
                element.message.fkidpensum = "Campo requerido.";
                bandera = false;
            }
            if ( element.fkiddocente === null ) {
                element.error.fkiddocente = true;
                element.message.fkiddocente = "Campo requerido.";
                bandera = false;
            }
            if ( element.fkidturno === null ) {
                element.error.fkidturno = true;
                element.message.fkidturno = "Campo requerido.";
                bandera = false;
            }
            if ( element.fkidgestionperiodo === null ) {
                element.error.fkidgestionperiodo = true;
                element.message.fkidgestionperiodo = "Campo requerido.";
                bandera = false;
            }
            if ( element.fkidmateria === null ) {
                element.error.fkidmateria = true;
                element.message.fkidmateria = "Campo requerido.";
                bandera = false;
            }
            if ( element.fkiddivisionacademica === null ) {
                element.error.fkiddivisionacademica = true;
                element.message.fkiddivisionacademica = "Campo requerido.";
                bandera = false;
            }
            if ( element.cupomaximo === "" ) {
                element.error.cupomaximo = true;
                element.message.cupomaximo = "Campo requerido.";
                bandera = false;
            }
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
    }
    return bandera;
};

const onDelete = ( grupo ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            GrupoService.onDelete(
                grupo
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageGrupo() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Grupo", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const GrupoActions = {
    initData,
    onPageGrupo,
    getAllGrupo,
    onLimpiar,
    onChange,
    setSigla,
    setEstado,
    setISDelete,
    onAddRowPensum,
    onDeleteRowPensum,
    onCreate,
    onGrabar,
    onShow,
    onEdit,
    onUpdate,
    onDelete,
};
