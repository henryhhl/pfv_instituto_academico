
import Constants from "../../constants/constans";
import { BitacoraService } from "../../services/seguridad/bitacora.service";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';

const setLimpiar = () => ( {
    type: Constants.bitacora_onLimpiar,
} );

const setShowData = ( data ) => ( {
    type: Constants.bitacora_onShow,
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

const onPage = ( page = 1, paginate = 5, search = "" ) => {
    return ( dispatch ) => {
        BitacoraService.getAll( {
            page: page, paginate: paginate, 
            search: search, esPaginate: true,
        } ).then( async (result) => {
            console.log(result)
            if ( result.resp === 1 ) {
                let obj = {
                    data: {
                        name: 'listBitacora',
                        value: result.arrayBitacora,
                    },
                    pagination: {
                        name: 'paginationBitacora',
                        value: result.pagination,
                    },
                    page: {
                        name: 'pageBitacora',
                        value: page,
                    },
                    paginate: {
                        name: 'paginateBitacora',
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

const getAll = () => {
    return ( dispatch ) => {
        BitacoraService.getAll().then( async (result) => {
            if ( result.resp === 1 ) {
                let obj = {
                    name: 'listBitacora',
                    value: result.arrayBitacora,
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

const onShow = ( idbitacora ) => {
    return ( dispatch ) => {
        BitacoraService.onShow( 
            idbitacora 
        ).then( async (result) => {
            console.log(result)
            if ( result.resp === 1 ) {
                dispatch( setShowData( result.bitacora ) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {} );
    };
};

export const BitacoraActions = {
    onPage,
    getAll,
    onLimpiar,
    onShow,
};
