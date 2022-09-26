
const Usuario = {
    idusuario: "",
    email: "",
    login: "",
    password: "",
    api_token: "",
    intentos: "",
    timeout: "",
    estado: "",
    concurrencia: "",
    isdelete: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",

    error: {
        email: false,
        login: false,
        password: false,
        estado: false,
        isdelete: false,
    },

    message: {
        email: "",
        login: "",
        password: "",
        estado: "",
        isdelete: "",
    },
};

export default Usuario;
