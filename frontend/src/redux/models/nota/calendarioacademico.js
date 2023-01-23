
const CalendarioAcademico = {
    idcalendarioacademico: "",

    fkidunidadadministrativa: "",
    unidadadministrativa: "",

    fkidgestionperiodo: "",
    gestionperiodo: "",
    fechainicio: "",
    fechafinal: "",

    arrayCalendarioAcademico: [],

    showcalendar: false,

    fechanota: "",
    nota: "",
    tipoactividad: "",
    tipoferiado: "",
    existeclases: "",

    estado: "",
    concurrencia: "",
    isdelete: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",

    error: {
        fkidunidadadministrativa: false,
        fkidgestionperiodo: false,
        
        fechanota: false,
        nota: false,
        tipoactividad: false,
        tipoferiado: false,
        existeclases: false,
        
        estado: false,
        isdelete: false,
    },

    message: {
        fkidunidadadministrativa: "",
        fkidgestionperiodo: "",

        fechanota: "",
        nota: "",
        tipoactividad: "",
        tipoferiado: "",
        existeclases: "",
        
        estado: "",
        isdelete: "",
    },
};

export default CalendarioAcademico;
