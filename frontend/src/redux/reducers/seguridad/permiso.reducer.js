
import Constants from "../../constants/constans";
import { Functions } from "../../../utils/functions";
import Permiso from "../../models/seguridad/permiso";

const inititalState = Permiso;

export const PermisoReducer = ( state = inititalState, action ) => {

    switch ( action.type ) {
        case Constants.permiso_setInit:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;

        case Constants.permiso_onChange:
            state = Object.assign( {}, action.payload );
            return state;

        case Constants.permiso_onCreate:
            state.fkidpermisopadre = action.payload;
            state.concurrencia = 1;
            state.estado = 'A';
            state.isdelete = 'A';
            state = Object.assign( {}, state );
            return state;

        case Constants.permiso_onShow:
            state.idpermiso = action.payload.idpermiso;
            state.fkidtipopermiso = action.payload.fkidtipopermiso;
            state.tipopermiso = action.payload.tipopermiso;
            state.fkidpermisopadre = action.payload.fkidpermisopadre;
            state.descripcion = action.payload.descripcion;
            state.concurrencia = action.payload.concurrencia;
            state.estado = action.payload.estado;
            state.isdelete = action.payload.isdelete;
            state = Object.assign( {}, state );
            return state;

        case Constants.permiso_onLimpiar:
            Functions.cleanObejct(state);
            state = Object.assign( {}, state );
            return state;
    
        default:
            return state;
    }
};
