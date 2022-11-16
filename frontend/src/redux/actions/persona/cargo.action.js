
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import { CargoService } from "../../services/persona/cargo.service";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';
import { setHiddenLoading, setShowLoading } from "../common/loading.action";

const setInit = () => ( {
    type: Constants.cargo_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.cargo_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.cargo_onChange,
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
    type: Constants.cargo_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.cargo_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageCargo = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        CargoService.getAllCargo( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listCargo',
                        value: result.arrayCargo,
                    },
                    pagination: {
                        name: 'paginationCargo',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageCargo',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateCargo',
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

const getAllCargo = () => {
    return ( dispatch ) => {
        CargoService.getAllCargo(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listCargo',
                    value: result.arrayCargo,
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

const setDescripcion = (cargo, value) => {
    return ( dispatch ) => {
        cargo.descripcion = value;
        cargo.error.descripcion = false;
        cargo.message.descripcion = "";
        dispatch( onChange(cargo) );
    };
};

const setEstado = (cargo, value) => {
    return ( dispatch ) => {
        cargo.estado = value;
        cargo.error.estado = false;
        cargo.message.estado = "";
        dispatch( onChange(cargo) );
    };
};

const setISDelete = (cargo, value) => {
    return ( dispatch ) => {
        cargo.isdelete = value;
        cargo.error.isdelete = false;
        cargo.message.isdelete = "";
        dispatch( onChange(cargo) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idcargo ) => {
    return ( dispatch ) => {
        CargoService.onShow( 
            idcargo 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.cargo ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idcargo ) => {
    return ( dispatch ) => {
        CargoService.onEdit( 
            idcargo 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.cargo ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( cargo, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( cargo ) ) {
            dispatch( onChange( cargo ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            CargoService.onStore(
                cargo
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
            title: "Registrar Cargo", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( cargo, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( cargo ) ) {
            dispatch( onChange( cargo ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            CargoService.onUpdate(
                cargo
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
            title: "Editar Cargo", onOk: onUpdate,
            okType: "primary", content: "Estás seguro de actualizar información?",
        } );
    };
};

function onValidate( data ) {
    let bandera = true;
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

const onDelete = ( cargo ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            CargoService.onDelete(
                cargo
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageCargo() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Cargo", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const CargoActions = {
    initData,
    onPageCargo,
    getAllCargo,
    onLimpiar,
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
