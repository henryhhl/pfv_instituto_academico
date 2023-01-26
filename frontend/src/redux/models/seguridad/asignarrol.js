
const AsignarRol = {
    idasignarrol: "",

    fkidusuario: "",
    usuario: "",

    fkidrol: "",
    rol: "",

    arrayGrupo: [],

    estado: "",
    concurrencia: "",
    isdelete: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",

    error: {
        fkidusuario: false,
        fkidrol: false,
        
        estado: false,
        isdelete: false,
    },

    message: {
        fkidusuario: "",
        fkidrol: "",
        
        estado: "",
        isdelete: "",
    },
};

export default AsignarRol;
