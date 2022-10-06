
const linkBackend = 'http://localhost:5000';

const module = {
    // seguridad: linkBackend + '/seguridad',
    seguridad: linkBackend + '',
    admin: linkBackend + '',
};

const apiServices = {
    apiseguridadtiporol_index:  `${module.seguridad}/tiporol/index`,
    apiseguridadtiporol_create: `${module.seguridad}/tiporol/create`,
    apiseguridadtiporol_store:  `${module.seguridad}/tiporol/store`,
    apiseguridadtiporol_edit:   `${module.seguridad}/tiporol/edit`,
    apiseguridadtiporol_show:   `${module.seguridad}/tiporol/show`,
    apiseguridadtiporol_update: `${module.seguridad}/tiporol/update`,
    apiseguridadtiporol_delete: `${module.seguridad}/tiporol/delete`,

    apiseguridadrol_index:  `${module.seguridad}/rol/index`,
    apiseguridadrol_create: `${module.seguridad}/rol/create`,
    apiseguridadrol_store:  `${module.seguridad}/rol/store`,
    apiseguridadrol_edit:   `${module.seguridad}/rol/edit`,
    apiseguridadrol_show:   `${module.seguridad}/rol/show`,
    apiseguridadrol_update: `${module.seguridad}/rol/update`,
    apiseguridadrol_delete: `${module.seguridad}/rol/delete`,

    apiseguridadtipopermiso_index:  `${module.seguridad}/tipopermiso/index`,
    apiseguridadtipopermiso_create: `${module.seguridad}/tipopermiso/create`,
    apiseguridadtipopermiso_store:  `${module.seguridad}/tipopermiso/store`,
    apiseguridadtipopermiso_edit:   `${module.seguridad}/tipopermiso/edit`,
    apiseguridadtipopermiso_show:   `${module.seguridad}/tipopermiso/show`,
    apiseguridadtipopermiso_update: `${module.seguridad}/tipopermiso/update`,
    apiseguridadtipopermiso_delete: `${module.seguridad}/tipopermiso/delete`,

    apiseguridadusuario_index:  `${module.seguridad}/usuario/index`,
    apiseguridadusuario_create: `${module.seguridad}/usuario/create`,
    apiseguridadusuario_store:  `${module.seguridad}/usuario/store`,
    apiseguridadusuario_edit:   `${module.seguridad}/usuario/edit`,
    apiseguridadusuario_show:   `${module.seguridad}/usuario/show`,
    apiseguridadusuario_update: `${module.seguridad}/usuario/update`,
    apiseguridadusuario_delete: `${module.seguridad}/usuario/delete`,

    apiadminunidadnegocio_index:  `${module.admin}/unidadnegocio/index`,
    apiadminunidadnegocio_create: `${module.admin}/unidadnegocio/create`,
    apiadminunidadnegocio_store:  `${module.admin}/unidadnegocio/store`,
    apiadminunidadnegocio_edit:   `${module.admin}/unidadnegocio/edit`,
    apiadminunidadnegocio_show:   `${module.admin}/unidadnegocio/show`,
    apiadminunidadnegocio_update: `${module.admin}/unidadnegocio/update`,
    apiadminunidadnegocio_delete: `${module.admin}/unidadnegocio/delete`,

    apiadminofertaacademica_index:  `${module.admin}/ofertaacademica/index`,
    apiadminofertaacademica_create: `${module.admin}/ofertaacademica/create`,
    apiadminofertaacademica_store:  `${module.admin}/ofertaacademica/store`,
    apiadminofertaacademica_edit:   `${module.admin}/ofertaacademica/edit`,
    apiadminofertaacademica_show:   `${module.admin}/ofertaacademica/show`,
    apiadminofertaacademica_update: `${module.admin}/ofertaacademica/update`,
    apiadminofertaacademica_delete: `${module.admin}/ofertaacademica/delete`,

    apiadminnivelacademico_index:  `${module.admin}/nivelacademico/index`,
    apiadminnivelacademico_create: `${module.admin}/nivelacademico/create`,
    apiadminnivelacademico_store:  `${module.admin}/nivelacademico/store`,
    apiadminnivelacademico_edit:   `${module.admin}/nivelacademico/edit`,
    apiadminnivelacademico_show:   `${module.admin}/nivelacademico/show`,
    apiadminnivelacademico_update: `${module.admin}/nivelacademico/update`,
    apiadminnivelacademico_delete: `${module.admin}/nivelacademico/delete`,

    apiadminmodalidadacademica_index:  `${module.admin}/modalidadacademica/index`,
    apiadminmodalidadacademica_create: `${module.admin}/modalidadacademica/create`,
    apiadminmodalidadacademica_store:  `${module.admin}/modalidadacademica/store`,
    apiadminmodalidadacademica_edit:   `${module.admin}/modalidadacademica/edit`,
    apiadminmodalidadacademica_show:   `${module.admin}/modalidadacademica/show`,
    apiadminmodalidadacademica_update: `${module.admin}/modalidadacademica/update`,
    apiadminmodalidadacademica_delete: `${module.admin}/modalidadacademica/delete`,

    apiadminperiodo_index:  `${module.admin}/periodo/index`,
    apiadminperiodo_create: `${module.admin}/periodo/create`,
    apiadminperiodo_store:  `${module.admin}/periodo/store`,
    apiadminperiodo_edit:   `${module.admin}/periodo/edit`,
    apiadminperiodo_show:   `${module.admin}/periodo/show`,
    apiadminperiodo_update: `${module.admin}/periodo/update`,
    apiadminperiodo_delete: `${module.admin}/periodo/delete`,

    apiadmintipomateria_index:  `${module.admin}/tipomateria/index`,
    apiadmintipomateria_create: `${module.admin}/tipomateria/create`,
    apiadmintipomateria_store:  `${module.admin}/tipomateria/store`,
    apiadmintipomateria_edit:   `${module.admin}/tipomateria/edit`,
    apiadmintipomateria_show:   `${module.admin}/tipomateria/show`,
    apiadmintipomateria_update: `${module.admin}/tipomateria/update`,
    apiadmintipomateria_delete: `${module.admin}/tipomateria/delete`,

    apiadminmateria_index:  `${module.admin}/materia/index`,
    apiadminmateria_create: `${module.admin}/materia/create`,
    apiadminmateria_store:  `${module.admin}/materia/store`,
    apiadminmateria_edit:   `${module.admin}/materia/edit`,
    apiadminmateria_show:   `${module.admin}/materia/show`,
    apiadminmateria_update: `${module.admin}/materia/update`,
    apiadminmateria_delete: `${module.admin}/materia/delete`,
};

export default apiServices;
