
const linkBackend = 'http://localhost:5000/api/v1';
// const linkBackend = 'https://instituto-academico-backend.herokuapp.com/api/v1';

const module = {
    // seguridad: linkBackend + '/seguridad',
    seguridad: linkBackend + '',
    admin: linkBackend + '',
    parametros: linkBackend + '',
    estructuraacademica: linkBackend + '',
    estructurainstitucional: linkBackend + '',
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

    apiseguridadpermiso_index:  `${module.seguridad}/permiso/index`,
    apiseguridadpermiso_create: `${module.seguridad}/permiso/create`,
    apiseguridadpermiso_store:  `${module.seguridad}/permiso/store`,
    apiseguridadpermiso_edit:   `${module.seguridad}/permiso/edit`,
    apiseguridadpermiso_show:   `${module.seguridad}/permiso/show`,
    apiseguridadpermiso_update: `${module.seguridad}/permiso/update`,
    apiseguridadpermiso_delete: `${module.seguridad}/permiso/delete`,

    apiseguridadusuarioroldetalle_rolusuario:  `${module.seguridad}/usuarioroldetalle/rol_usuario`,
    apiseguridadusuarioroldetalle_store:  `${module.seguridad}/usuarioroldetalle/store`,
    apiseguridadusuarioroldetalle_delete:  `${module.seguridad}/usuarioroldetalle/delete`,

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

    apiparametrosadmintipociudad_index:  `${module.parametros}/tipociudad/index`,
    apiparametrosadmintipociudad_create: `${module.parametros}/tipociudad/create`,
    apiparametrosadmintipociudad_store:  `${module.parametros}/tipociudad/store`,
    apiparametrosadmintipociudad_edit:   `${module.parametros}/tipociudad/edit`,
    apiparametrosadmintipociudad_show:   `${module.parametros}/tipociudad/show`,
    apiparametrosadmintipociudad_update: `${module.parametros}/tipociudad/update`,
    apiparametrosadmintipociudad_delete: `${module.parametros}/tipociudad/delete`,

    apiparametrosadminciudad_index:  `${module.parametros}/ciudad/index`,
    apiparametrosadminciudad_create: `${module.parametros}/ciudad/create`,
    apiparametrosadminciudad_store:  `${module.parametros}/ciudad/store`,
    apiparametrosadminciudad_edit:   `${module.parametros}/ciudad/edit`,
    apiparametrosadminciudad_show:   `${module.parametros}/ciudad/show`,
    apiparametrosadminciudad_update: `${module.parametros}/ciudad/update`,
    apiparametrosadminciudad_delete: `${module.parametros}/ciudad/delete`,

    apiparametrosadminreferenciacontacto_index:  `${module.parametros}/referenciacontacto/index`,
    apiparametrosadminreferenciacontacto_create: `${module.parametros}/referenciacontacto/create`,
    apiparametrosadminreferenciacontacto_store:  `${module.parametros}/referenciacontacto/store`,
    apiparametrosadminreferenciacontacto_edit:   `${module.parametros}/referenciacontacto/edit`,
    apiparametrosadminreferenciacontacto_show:   `${module.parametros}/referenciacontacto/show`,
    apiparametrosadminreferenciacontacto_update: `${module.parametros}/referenciacontacto/update`,
    apiparametrosadminreferenciacontacto_delete: `${module.parametros}/referenciacontacto/delete`,

    apiestructuraacademicaunidadadministrativa_index:  `${module.estructuraacademica}/unidadadministrativa/index`,
    apiestructuraacademicaunidadadministrativa_create: `${module.estructuraacademica}/unidadadministrativa/create`,
    apiestructuraacademicaunidadadministrativa_store:  `${module.estructuraacademica}/unidadadministrativa/store`,
    apiestructuraacademicaunidadadministrativa_edit:   `${module.estructuraacademica}/unidadadministrativa/edit`,
    apiestructuraacademicaunidadadministrativa_show:   `${module.estructuraacademica}/unidadadministrativa/show`,
    apiestructuraacademicaunidadadministrativa_update: `${module.estructuraacademica}/unidadadministrativa/update`,
    apiestructuraacademicaunidadadministrativa_delete: `${module.estructuraacademica}/unidadadministrativa/delete`,

    apiestructuraacademicaunidadacademica_index:  `${module.estructuraacademica}/unidadacademica/index`,
    apiestructuraacademicaunidadacademica_create: `${module.estructuraacademica}/unidadacademica/create`,
    apiestructuraacademicaunidadacademica_store:  `${module.estructuraacademica}/unidadacademica/store`,
    apiestructuraacademicaunidadacademica_edit:   `${module.estructuraacademica}/unidadacademica/edit`,
    apiestructuraacademicaunidadacademica_show:   `${module.estructuraacademica}/unidadacademica/show`,
    apiestructuraacademicaunidadacademica_update: `${module.estructuraacademica}/unidadacademica/update`,
    apiestructuraacademicaunidadacademica_delete: `${module.estructuraacademica}/unidadacademica/delete`,

    apiestructuraacademicaprograma_index:  `${module.estructuraacademica}/programa/index`,
    apiestructuraacademicaprograma_create: `${module.estructuraacademica}/programa/create`,
    apiestructuraacademicaprograma_store:  `${module.estructuraacademica}/programa/store`,
    apiestructuraacademicaprograma_edit:   `${module.estructuraacademica}/programa/edit`,
    apiestructuraacademicaprograma_show:   `${module.estructuraacademica}/programa/show`,
    apiestructuraacademicaprograma_update: `${module.estructuraacademica}/programa/update`,
    apiestructuraacademicaprograma_delete: `${module.estructuraacademica}/programa/delete`,

    apiestructuraacademicapensum_index:  `${module.estructuraacademica}/pensum/index`,
    apiestructuraacademicapensum_create: `${module.estructuraacademica}/pensum/create`,
    apiestructuraacademicapensum_store:  `${module.estructuraacademica}/pensum/store`,
    apiestructuraacademicapensum_edit:   `${module.estructuraacademica}/pensum/edit`,
    apiestructuraacademicapensum_show:   `${module.estructuraacademica}/pensum/show`,
    apiestructuraacademicapensum_update: `${module.estructuraacademica}/pensum/update`,
    apiestructuraacademicapensum_delete: `${module.estructuraacademica}/pensum/delete`,

    apiestructuraacademicaresponsable_index:  `${module.estructuraacademica}/responsable/index`,
    apiestructuraacademicaresponsable_create: `${module.estructuraacademica}/responsable/create`,
    apiestructuraacademicaresponsable_store:  `${module.estructuraacademica}/responsable/store`,
    apiestructuraacademicaresponsable_edit:   `${module.estructuraacademica}/responsable/edit`,
    apiestructuraacademicaresponsable_show:   `${module.estructuraacademica}/responsable/show`,
    apiestructuraacademicaresponsable_update: `${module.estructuraacademica}/responsable/update`,
    apiestructuraacademicaresponsable_delete: `${module.estructuraacademica}/responsable/delete`,



    apiestructurainstitucionalturno_index:  `${module.estructurainstitucional}/turno/index`,
    apiestructurainstitucionalturno_create: `${module.estructurainstitucional}/turno/create`,
    apiestructurainstitucionalturno_store:  `${module.estructurainstitucional}/turno/store`,
    apiestructurainstitucionalturno_edit:   `${module.estructurainstitucional}/turno/edit`,
    apiestructurainstitucionalturno_show:   `${module.estructurainstitucional}/turno/show`,
    apiestructurainstitucionalturno_update: `${module.estructurainstitucional}/turno/update`,
    apiestructurainstitucionalturno_delete: `${module.estructurainstitucional}/turno/delete`,

    apiestructurainstitucionaldivisionacademica_index:  `${module.estructurainstitucional}/divisionacademica/index`,
    apiestructurainstitucionaldivisionacademica_create: `${module.estructurainstitucional}/divisionacademica/create`,
    apiestructurainstitucionaldivisionacademica_store:  `${module.estructurainstitucional}/divisionacademica/store`,
    apiestructurainstitucionaldivisionacademica_edit:   `${module.estructurainstitucional}/divisionacademica/edit`,
    apiestructurainstitucionaldivisionacademica_show:   `${module.estructurainstitucional}/divisionacademica/show`,
    apiestructurainstitucionaldivisionacademica_update: `${module.estructurainstitucional}/divisionacademica/update`,
    apiestructurainstitucionaldivisionacademica_delete: `${module.estructurainstitucional}/divisionacademica/delete`,

    apiestructurainstitucionalinstitucion_index:  `${module.estructurainstitucional}/institucion/index`,
    apiestructurainstitucionalinstitucion_create: `${module.estructurainstitucional}/institucion/create`,
    apiestructurainstitucionalinstitucion_store:  `${module.estructurainstitucional}/institucion/store`,
    apiestructurainstitucionalinstitucion_edit:   `${module.estructurainstitucional}/institucion/edit`,
    apiestructurainstitucionalinstitucion_show:   `${module.estructurainstitucional}/institucion/show`,
    apiestructurainstitucionalinstitucion_update: `${module.estructurainstitucional}/institucion/update`,
    apiestructurainstitucionalinstitucion_delete: `${module.estructurainstitucional}/institucion/delete`,

    apiestructurainstitucionalgestionperiodo_index:  `${module.estructurainstitucional}/gestionperiodo/index`,
    apiestructurainstitucionalgestionperiodo_create: `${module.estructurainstitucional}/gestionperiodo/create`,
    apiestructurainstitucionalgestionperiodo_store:  `${module.estructurainstitucional}/gestionperiodo/store`,
    apiestructurainstitucionalgestionperiodo_edit:   `${module.estructurainstitucional}/gestionperiodo/edit`,
    apiestructurainstitucionalgestionperiodo_show:   `${module.estructurainstitucional}/gestionperiodo/show`,
    apiestructurainstitucionalgestionperiodo_update: `${module.estructurainstitucional}/gestionperiodo/update`,
    apiestructurainstitucionalgestionperiodo_delete: `${module.estructurainstitucional}/gestionperiodo/delete`,
};

export default apiServices;
