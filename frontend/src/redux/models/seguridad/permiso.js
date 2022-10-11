
const Permiso = {
    idpermiso: "",
    fkidtipopermiso: "",
    tipopermiso: "",
    fkidpermisopadre: "",
    descripcion: "",
    estado: "",
    concurrencia: "",
    isdelete: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",

    error: {
        fkidtipopermiso: false,
        descripcion: false,
        estado: false,
        isdelete: false,
    },

    message: {
        fkidtipopermiso: "",
        descripcion: "",
        estado: "",
        isdelete: "",
    },
};

export default Permiso;
