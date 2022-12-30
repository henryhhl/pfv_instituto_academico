
import axios from 'axios';
import { readData } from './toolsStorage';
import { KeysStorage } from './keysStorage';

export const dateToString = ( date = new Date() ) => {
    let year  = date.getFullYear();
    let month = date.getMonth() + 1;
    let day   = date.getDate();

    month = month < 10 ? "0" + month : month;
    day   = day   < 10 ? "0" + day : day;

    return year + "-" + month + "-" + day;
};

export const hourToString = ( date = new Date() ) => {
    let hour     = date.getHours();
    let minutes  = date.getMinutes();
    let segundos = date.getSeconds();
    hour     = hour < 10 ? "0" + hour : hour;
    minutes  = minutes < 10 ? "0" + minutes : minutes;
    segundos = segundos < 10 ? "0" + segundos : segundos;
    return hour + ":" + minutes + ":" + segundos;
};

export const httpRequest = async ( method = "", uri, data = {} ) => {
    const token = readData(KeysStorage.token);

    let data_aditional = {
        // x_fecha: dateToString(),
        // x_hora:  hourToString(),
        // x_datetime: `${dateToString()} ${hourToString()}`,
    };
    const body = Object.assign( data, data_aditional );
    let config = {
        method: method,
        url: uri,
        responseType: "json",
        headers: {
            //'Access-Control-Allow-Origin': '*',
            // 'origin': 'x-requested-with',
            // 'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Autorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin,',
            //'Content-type': 'application/json',
            'Authorization': `Bearer ${ token ?? '' }`,
        },
        // mode: 'no-cors',
        // withCredentials: true,
        // credentials: 'same-origin',
    };
    method = method.toLowerCase();
    if ( method === "get" || method === "delete" ) {
        config.params = body;
    } else {
        config.data = body;
    }

    return await axios( config ).then( (respta) => {
        if ( respta.status === 200 || respta.status === 201 ) {
            return respta.data;
        }
        if (respta.status === 401) {
            return { 
                error: true, message: 'Lo sentimos, su sesión ha expirado.',
                resp: -2 
            };
        }
        if (respta.status === 404) {}
        if (respta.status === 500) {}
        return { resp: -5, };
    } ).catch( (error) => {
        console.log(error)
        if ( error.response.status === 401 ) {
            return { 
                error: true, message: 'Lo sentimos, su sesión ha expirado.',
                resp: -2 
            };
        }
        if ( error.response.status === 404 ) {}
        if ( error.response.status === 500 ) {}
        if ( error.response.status === 0 ) {
            
        }
        return { resp: -5, error: error };
    } );
};
