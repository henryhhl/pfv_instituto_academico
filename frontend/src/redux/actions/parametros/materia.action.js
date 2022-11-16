
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { MateriaService } from "../../services/parametros/materia.service";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';

const setInit = () => ( {
    type: Constants.materia_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.materia_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.materia_onChange,
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
    type: Constants.materia_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.materia_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageMateria = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        MateriaService.getAllMateria( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listMateria',
                        value: result.arrayMateria,
                    },
                    pagination: {
                        name: 'paginationMateria',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageMateria',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateMateria',
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

const getAllMateria = () => {
    return ( dispatch ) => {
        MateriaService.getAllMateria(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listMateria',
                    value: result.arrayMateria,
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

const setCodigo = (materia, value) => {
    return ( dispatch ) => {
        materia.codigo = value;
        materia.error.codigo = false;
        materia.message.codigo = "";
        dispatch( onChange(materia) );
    };
};

const setSigla = (materia, value) => {
    return ( dispatch ) => {
        materia.sigla = value;
        materia.error.sigla = false;
        materia.message.sigla = "";
        dispatch( onChange(materia) );
    };
};

const setNombreLargo = (materia, value) => {
    return ( dispatch ) => {
        materia.nombrelargo = value;
        materia.error.nombrelargo = false;
        materia.message.nombrelargo = "";
        dispatch( onChange(materia) );
    };
};

const setNombreCorto = (materia, value) => {
    return ( dispatch ) => {
        materia.nombrecorto = value;
        materia.error.nombrecorto = false;
        materia.message.nombrecorto = "";
        dispatch( onChange(materia) );
    };
};

const setNombreAlternativo = (materia, value) => {
    return ( dispatch ) => {
        materia.nombrealternativo = value;
        materia.error.nombrealternativo = false;
        materia.message.nombrealternativo = "";
        dispatch( onChange(materia) );
    };
};

const setCredito = (materia, value) => {
    return ( dispatch ) => {
        if ( value === "" ) value = 0;
        if ( !isNaN( value ) ) {
            if ( parseInt( value ) >= 0 ) {
                materia.creditos = parseInt(value);
                materia.error.creditos = false;
                materia.message.creditos = "";
                dispatch( onChange(materia) );
            }
        }
    };
};

const setEstado = (materia, value) => {
    return ( dispatch ) => {
        materia.estado = value;
        materia.error.estado = false;
        materia.message.estado = "";
        dispatch( onChange(materia) );
    };
};

const setISDelete = (materia, value) => {
    return ( dispatch ) => {
        materia.isdelete = value;
        materia.error.isdelete = false;
        materia.message.isdelete = "";
        dispatch( onChange(materia) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idmateria ) => {
    return ( dispatch ) => {
        MateriaService.onShow( 
            idmateria 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.materia ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idmateria ) => {
    return ( dispatch ) => {
        MateriaService.onEdit( 
            idmateria 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.materia ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( materia, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( materia ) ) {
            dispatch( onChange( materia ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            MateriaService.onStore(
                materia
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
            title: "Registrar Materia", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( materia, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( materia ) ) {
            dispatch( onChange( materia ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            MateriaService.onUpdate(
                materia
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
            title: "Editar Materia", onOk: onUpdate,
            okType: "primary", content: "Estás seguro de actualizar información?",
        } );
    };
};

function onValidate( data ) {
    let bandera = true;
    if ( data.codigo.toString().trim().length === 0 ) {
        data.error.codigo   = true;
        data.message.codigo = "Campo requerido.";
        bandera = false;
    }
    if ( data.sigla.toString().trim().length === 0 ) {
        data.error.sigla   = true;
        data.message.sigla = "Campo requerido.";
        bandera = false;
    }
    if ( data.nombrelargo.toString().trim().length === 0 ) {
        data.error.nombrelargo   = true;
        data.message.nombrelargo = "Campo requerido.";
        bandera = false;
    }
    if ( data.nombrecorto.toString().trim().length === 0 ) {
        data.error.nombrecorto   = true;
        data.message.nombrecorto = "Campo requerido.";
        bandera = false;
    }
    if ( data.nombrealternativo.toString().trim().length === 0 ) {
        data.error.nombrealternativo   = true;
        data.message.nombrealternativo = "Campo requerido.";
        bandera = false;
    }
    if ( data.creditos.toString().trim().length === 0 ) {
        data.error.creditos   = true;
        data.message.creditos = "Campo requerido.";
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

const onDelete = ( materia ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            MateriaService.onDelete(
                materia
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageMateria() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Materia", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const MateriaActions = {
    initData,
    onPageMateria,
    getAllMateria,
    onLimpiar,
    setCodigo,
    setSigla,
    setNombreLargo,
    setNombreCorto,
    setNombreAlternativo,
    setCredito,
    setEstado,
    setISDelete,
    onCreate,
    onGrabar,
    onShow,
    onEdit,
    onUpdate,
    onDelete,
};
