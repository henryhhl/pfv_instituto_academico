
import axios from 'axios';

// const dateToString = ( date = new Date() ) => {
//     let year  = date.getFullYear();
//     let month = date.getMonth() + 1;
//     let day   = date.getDate();

//     month = month < 10 ? "0" + month : month;
//     day   = day   < 10 ? "0" + day : day;

//     return year + "-" + month + "-" + day;
// };

// const hourToString = ( date = new Date() ) => {
//     let hour     = date.getHours();
//     let minutes  = date.getMinutes();
//     let segundos = date.getSeconds();
//     hour     = hour < 10 ? "0" + hour : hour;
//     minutes  = minutes < 10 ? "0" + minutes : minutes;
//     segundos = segundos < 10 ? "0" + segundos : segundos;
//     return hour + ":" + minutes + ":" + segundos;
// };

export const httpRequest = async ( method = "", uri, data = {} ) => {

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
            'Access-Control-Allow-Origin': '*',
            // 'origin': 'x-requested-with',
            // 'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Autorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin,',
            'Content-type': 'application/json',
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
        console.log(respta)
        if ( respta.status === 200 || respta.status === 201 ) {
            return respta.data;
        }
        if (respta.status === 401) {}
        if (respta.status === 404) {}
        if (respta.status === 500) {}
        return { resp: -5, };
    } ).catch( (error) => {
        if ( error.response.status === 401 ) {}
        if ( error.response.status === 404 ) {}
        if ( error.response.status === 500 ) {}
        return { resp: -5, error: error };
    } );
};
