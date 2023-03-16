
const days = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
];

const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
];

export const convertDMYForYMD = (dateToString = "") => {
    if ( dateToString.split('/').length < 3 ) return null;
    const [day, month, year] = dateToString.split('/');
    return `${year}-${month}-${day}`;
}

export const convertYMDForDMY = (dateToString = "") => {
    if ( dateToString.split('-').length < 3 ) return null;
    const [year, month, day] = dateToString.split('-');
    return `${day}/${month}/${year}`;
}

export const convertDateYearByMonthToString = ( date = new Date(), separator = '-' ) => {
    let year  = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    return year + separator + month;
};

export const convertDateToString = ( date = new Date(), separator = '-' ) => {
    let year  = date.getFullYear();
    let month = date.getMonth() + 1;
    let day   = date.getDate();

    month = month < 10 ? "0" + month : month;
    day   = day   < 10 ? "0" + day : day;

    return year + separator + month + separator+ day;
};

export const convertDateToDMYString = ( date = new Date(), separator = '-' ) => {
    let year  = date.getFullYear();
    let month = date.getMonth() + 1;
    let day   = date.getDate();

    month = month < 10 ? "0" + month : month;
    day   = day   < 10 ? "0" + day : day;

    return `${day}/${month}/${year}`
};

export const convertStringforDate = (dateToString = "") => {
    const [day, month, year] = dateToString.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

export const getLastDay = (date = new Date()) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const getWeekDay = (year, mounth, day) => {
    return new Date(year, mounth - 1, day).getDay();
};

export const getTextMonthForIndex = (index) => {
    if ( typeof index === 'number' ) {
        return months[index - 1];
    }
    return '';
};

export const getTextMonths = (date = new Date()) => {
    return months[date.getMonth() - 1];
};

export const getTextDay = (date = new Date()) => {
    return days[date.getDay()];
};

export const getTextDayforIndex = (index) => {
    return days[index];
};

export const getWeekDayByCode = (code) => {
    switch (code) {
        case 'lu':
            return 1;
        case 'ma':
            return 2;
        case 'mi':
            return 3;
        case 'ju':
            return 4;
        case 'vi':
            return 5;
        case 'sá':
            return 6;
        default:
            return 0;
    }
};
