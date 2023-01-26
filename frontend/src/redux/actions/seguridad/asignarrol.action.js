
import Swal from 'sweetalert2';
import toastr from 'toastr';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';
import { AsignarRolService } from '../../services/seguridad/asignarrol.service';

const setLimpiar = () => ( {
    type: Constants.asignarrol_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.asignarrol_onChange,
    payload: data,
} );

const getAll = (asignarRol) => {
    return ( dispatch ) => {
        dispatch( setShowLoading() );
        AsignarRolService.getAll( {
            fkidusuario: asignarRol.fkidusuario,
        } ).then( async (result) => {
            if ( result.resp === 1 ) {
                asignarRol.arrayGrupo = [...result.arrayGrupo];
                dispatch( onChange(asignarRol) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {
            dispatch( setHiddenLoading() );
        } );
    };
};

const onLimpiar = () => {
    return ( dispatch ) => {
        dispatch( setLimpiar() );
    };
};

const setFkIDUsuario = (asignarRol, usuario) => {
    return ( dispatch ) => {
        asignarRol.fkidusuario = usuario.idusuario;
        asignarRol.usuario = usuario.login;
        asignarRol.error.fkidusuario = false;
        asignarRol.message.fkidusuario = "";
        dispatch( onChange(asignarRol) );
    };
};

const setFKIDRol = (asignarRol, rol) => {
    return ( dispatch ) => {
        asignarRol.fkidrol = rol.idrol;
        asignarRol.rol = rol.descripcion;
        asignarRol.error.fkidrol = false;
        asignarRol.message.fkidrol = "";
        dispatch( onChange(asignarRol) );
    };
};

const setEstado = (asignarRol, value) => {
    return ( dispatch ) => {
        asignarRol.estado = value;
        asignarRol.error.estado = false;
        asignarRol.message.estado = "";
        dispatch( onChange(asignarRol) );
    };
};

const setISDelete = (asignarRol, value) => {
    return ( dispatch ) => {
        asignarRol.isdelete = value;
        asignarRol.error.isdelete = false;
        asignarRol.message.isdelete = "";
        dispatch( onChange(asignarRol) );
    };
};

const onAsignar = ( asignarRol ) => {
    return ( dispatch ) => {
        if ( !onValidate( asignarRol ) ) {
            dispatch( onChange( asignarRol ) );
            return;
        }
        let existeRol = asignarRol.arrayGrupo.find( (item) => item.rol.idrol === asignarRol.fkidrol );
        if ( existeRol ) {
            toastr.warning('', 'Rol ya asignado.', { progressBar: true, });
            return;
        }
        let onAsignar = () => {
            dispatch( setShowLoading() );
            AsignarRolService.onAsignar(
                asignarRol
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    asignarRol.fkidrol = '';
                    asignarRol.rol = '';
                    asignarRol.arrayGrupo = [...result.arrayGrupo];
                    dispatch( onChange(asignarRol) );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Asignar Rol", onOk: onAsignar,
            okType: "primary", content: "Estás seguro de registrar información?",
        } );
    };
};

function onValidate( data ) {
    let bandera = true;
    if ( data.fkidusuario.toString().trim().length === 0 ) {
        data.error.fkidusuario   = true;
        data.message.fkidusuario = "Campo requerido.";
        bandera = false;
    }
    if ( data.fkidrol.toString().trim().length === 0 ) {
        data.error.fkidrol   = true;
        data.message.fkidrol = "Campo requerido.";
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

const onDelete = ( asignarRol ) => {
    return ( dispatch ) => {
        let onDelete = () => {
            dispatch( setShowLoading() );
            AsignarRolService.onDelete(
                asignarRol
            ).then( async (result) => {
                if ( result.resp === 1 ) {
                    asignarRol.arrayGrupo = [...result.arrayGrupo];
                    dispatch( onChange(asignarRol) );
                } else if ( result.resp === -2 ) {
                    await dispatch( setShowSesion() );
                    await dispatch( setHiddenSesion() );
                }
            } ).finally( () => {
                dispatch( setHiddenLoading() );
            } );
        };
        ConfirmationComponent( {
            title: "Eliminar Rol Asignado", onOk: onDelete,
            content: "Estás seguro de eliminar información?",
        } );
    };
};

export const AsignarRolActions = {
    getAll,
    onLimpiar,
    setFkIDUsuario,
    setFKIDRol,
    setEstado,
    setISDelete,
    onAsignar,
    onDelete,
};
