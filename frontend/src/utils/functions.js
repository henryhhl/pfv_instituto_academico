import toastr from 'toastr';
import { EstadoCivilData } from '../data/estado_civil.data';

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

const onDefaultDays = () => {
    return [1, 2, 3, 4, 5, 6, 7].map( (item) => {
        switch (item) {
            case 1:
                return {
                    codigo: 'lu', descripcion: 'Lunes',
                };
            case 2:
                return {
                    codigo: 'ma', descripcion: 'Martes',
                };
            case 3:
                return {
                    codigo: 'mi', descripcion: 'Miércoles',
                };
            case 4:
                return {
                    codigo: 'ju', descripcion: 'Jueves',
                };
            case 5:
                return {
                    codigo: 'vi', descripcion: 'Viernes',
                };
            case 6:
                return {
                    codigo: 'sá', descripcion: 'Sábado',
                };
            default:
                return {
                    codigo: 'do', descripcion: 'Domingo',
                };
        }
    } );
};

const getValueConfirmacion = ( estado ) => {
    if ( estado === 'S' ) return 'Si';
    return 'No';
};

const getValueTipoEmpleado = ( estado ) => {
    if ( estado === 'N' ) return 'Ninguno';
    if ( estado === 'D' ) return 'Dependiente';
    return 'Independiente';
};

const getValueEstado = ( estado ) => {
    if ( estado === 'A' ) return 'Activo';
    return 'InActivo';
};

const getValueGenero = ( genero ) => {
    if ( genero === 'M' ) return 'Masculino';
    return 'Femenino';
};

const getValueEstadoCivil = ( estadocivil ) => {
    for (let index = 0; index < EstadoCivilData.length; index++) {
        const element = EstadoCivilData[index];
        if ( element.value === estadocivil ) return element.title;
    }
    return '';
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

const dateToString = ( date = new Date() ) => {
    let year  = date.getFullYear();
    let month = date.getMonth() + 1;
    let day   = date.getDate();

    month = month < 10 ? "0" + month : month;
    day   = day   < 10 ? "0" + day : day;

    return year + "-" + month + "-" + day;
};

const dateToYear = ( date = new Date() ) => {
    let year  = date.getFullYear();
    return year;
};

const validateEmail = ( value ) => {
    let email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( !email.test(value) ) return false;
    return true;
};

const validatePassword = ( value ) => {
    let password = /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    if ( !password.test(value) ) return false;
    return true;
};

const dateCurrentToString = ( date = new Date() ) => {
    let year  = date.getFullYear();
    let month = date.getMonth() + 1;
    let day   = date.getDate();

    month = month < 10 ? "0" + month : month;
    day   = day   < 10 ? "0" + day : day;

    return `${day}/${month}/${year}`;
};

export const Functions = {
    onDefaultDays,
    dateToString,
    dateCurrentToString,
    dateToYear,
    cleanObejct,
    getValueTipoEmpleado,
    getValueConfirmacion,
    getValueEstado,
    getValueGenero,
    getValueEstadoCivil,
    convertDMYToYMD,
    compareInitDateString,
    compareFinishDateString,
    validateEmail,
    validatePassword,
};
