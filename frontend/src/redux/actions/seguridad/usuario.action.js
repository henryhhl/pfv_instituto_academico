
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { UsuarioService } from "../../services/seguridad/usuarioServices";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';
import { Functions } from '../../../utils/functions';

const setInit = () => ( {
    type: Constants.usuario_setInit,
} );

const setLimpiar = () => ( {
    type: Constants.usuario_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.usuario_onChange,
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
    type: Constants.usuario_onCreate,
} );

const setShowData = ( data ) => ( {
    type: Constants.usuario_onShow,
    payload: data,
} );

const initData = () => {
    return ( dispatch ) => {
        dispatch( setInit() );
    };
};

const onPageUsuario = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        UsuarioService.getAllUsuario( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listUsuario',
                        value: result.arrayUsuario,
                    },
                    pagination: {
                        name: 'paginationUsuario',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageUsuario',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateUsuario',
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

const getAllUsuario = () => {
    return ( dispatch ) => {
        UsuarioService.getAllUsuario(

        ).then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listUsuario',
                    value: result.arrayUsuario,
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

const setEmail = (usuario, value) => {
    return ( dispatch ) => {
        usuario.email = value;
        usuario.error.email = false;
        usuario.message.email = "";
        dispatch( onChange(usuario) );
    };
};

const setLogin = (usuario, value) => {
    return ( dispatch ) => {
        usuario.login = value;
        usuario.error.login = false;
        usuario.message.login = "";
        dispatch( onChange(usuario) );
    };
};

const setPassword = (usuario, value) => {
    return ( dispatch ) => {
        usuario.password = value;
        usuario.error.password = false;
        usuario.message.password = "";
        dispatch( onChange(usuario) );
    };
};

const setEstado = (usuario, value) => {
    return ( dispatch ) => {
        usuario.estado = value;
        usuario.error.estado = false;
        usuario.message.estado = "";
        dispatch( onChange(usuario) );
    };
};

const setISDelete = (usuario, value) => {
    return ( dispatch ) => {
        usuario.isdelete = value;
        usuario.error.isdelete = false;
        usuario.message.isdelete = "";
        dispatch( onChange(usuario) );
    };
};

const onCreate = () => {
    return ( dispatch ) => {
        dispatch( setCreate() );
    };
};

const onShow = ( idusuario ) => {
    return ( dispatch ) => {
        UsuarioService.onShow( 
            idusuario 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.usuario ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onEdit = ( idusuario ) => {
    return ( dispatch ) => {
        UsuarioService.onEdit( 
            idusuario 
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.usuario ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

const onGrabar = ( usuario, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( usuario ) ) {
            dispatch( onChange( usuario ) );
            return;
        }
        let onStore = () => {
            dispatch( setShowLoading() );
            UsuarioService.onStore(
                usuario
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
            title: "Registrar Usuario", onOk: onStore,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

const onUpdate = ( usuario, onBack ) => {
    return ( dispatch ) => {
        if ( !onValidate( usuario ) ) {
            dispatch( onChange( usuario ) );
            return;
        }
        let onUpdate = () => {
            dispatch( setShowLoading() );
            UsuarioService.onUpdate(
                usuario
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
            title: "Editar Usuario", onOk: onUpdate,
            okType: "primary", content: "Estás seguro de actualizar información?",
        } );
    };
};

function onValidate( data ) {
    let bandera = true;
    if ( !Functions.validateEmail( data.email ) ) {
        data.error.email   = true;
        data.message.email = "Email requerido.";
        bandera = false;
    }
    if ( data.email.toString().trim().length === 0 ) {
        data.error.email   = true;
        data.message.email = "Campo requerido.";
        bandera = false;
    }
    if ( data.login.toString().trim().length < 3 ) {
        data.error.login   = true;
        data.message.login = "Campo password debe ser mayor o igual a 3 carácter.";
        bandera = false;
    }
    if ( data.login.toString().trim().length === 0 ) {
        data.error.login   = true;
        data.message.login = "Campo requerido.";
        bandera = false;
    }
    if ( data.password.toString().trim().length < 4 ) {
        data.error.password   = true;
        data.message.password = "Campo password debe ser mayor o igual a 4 carácter.";
        bandera = false;
    }
    if ( data.password.toString().trim().length === 0 ) {
        data.error.password   = true;
        data.message.password = "Campo requerido.";
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

const onDelete = ( usuario ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            UsuarioService.onDelete(
                usuario
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    dispatch( onPageUsuario() );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Usuario", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const UsuarioActions = {
    initData,
    onPageUsuario,
    getAllUsuario,
    onLimpiar,
    setEmail,
    setLogin,
    setPassword,
    setEstado,
    setISDelete,
    onCreate,
    onShow,
    onEdit,
    onGrabar,
    onUpdate,
    onDelete,
};
