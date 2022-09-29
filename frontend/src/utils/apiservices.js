
const linkBackend = 'http://localhost:5000';

const module = {
    // seguridad: linkBackend + '/seguridad',
    seguridad: linkBackend + '',
};

const apiServices = {
    apiseguridadtiporol_index:  `${module.seguridad}/tiporol/index`,
    apiseguridadtiporol_create: `${module.seguridad}/tiporol/create`,
    apiseguridadtiporol_store:  `${module.seguridad}/tiporol/store`,
    apiseguridadtiporol_edit:   `${module.seguridad}/tiporol/edit`,
    apiseguridadtiporol_update: `${module.seguridad}/tiporol/update`,
    apiseguridadtiporol_delete: `${module.seguridad}/tiporol/delete`,
};

export default apiServices;
