import toastr from 'toastr';

const cleanObejct = ( object = {} ) => {
    for (let index in object) {
        if ( typeof object[index] === 'boolean' ) {
            object[index] = false;
        } else {
            if ( Array.isArray( object[index] ) ) {
                object[index] = [];
            } else {
                if ( typeof object[index] === 'object' ) {
                    for ( let data in object[index] ) {
                        if ( typeof object[index][data] === 'boolean' ) {
                            object[index][data] = false;
                        } else {
                            if ( Array.isArray( object[index][data] ) ) {
                                object[index][data]= [];
                            } else {
                                object[index][data] = "";
                            }
                        }
                    }
                } else {
                    object[index] = "";
                }
            }
        }
    }
};

const getValueEstado = ( estado ) => {
    if ( estado === 'A' ) return 'Activo';
    return 'InActivo';
};

const getValueGenero = ( genero ) => {
    if ( genero === 'M' ) return 'Masculino';
    return 'Femenino';
};

const convertDMYToYMD = ( date ) => {
    if ( date === null || typeof date === "undefined" || date === "" ) {
        return "";
    }
    let array = date.split('/');
    if ( array.length !== 3 ) return "";
    let year  = array[2];
    let month = array[1];
    let day   = array[0];

    return year + "-" + month + "-" + day;
};

const compareInitDateString = (fechainicio, fechafinal) => {
    if ( fechainicio === "" || fechafinal === "" ) return true;
    let initDate = convertDMYToYMD(fechainicio);
    let finishDate = convertDMYToYMD(fechafinal);
    if ( initDate <= finishDate ) return true;
    toastr.warning( 'Campo Fecha Inicio debe ser menor o igual a Fecha Final', '', { closeButton: true, progressBar: true, } );
    return false;

};

const compareFinishDateString = (fechainicio, fechafinal) => {
    if ( fechainicio === "" || fechafinal === "" ) return true;
    let initDate = convertDMYToYMD(fechainicio);
    let finishDate = convertDMYToYMD(fechafinal);
    if ( finishDate >= initDate ) return true;
    toastr.warning( 'Campo Fecha Final debe ser mayor o igual a Fecha Inicio', '', { closeButton: true, progressBar: true, } );
    return false;

};

export const Functions = {
    cleanObejct,
    getValueEstado,
    getValueGenero,
    convertDMYToYMD,
    compareInitDateString,
    compareFinishDateString,
};
