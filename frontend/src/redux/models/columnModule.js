
const ColumnModules = {

    columnParametroCalificacion: [
        {
            id: 'sigla',
            label: 'Sigla',
            visible: true,
        },
        {
            id: 'descripcion',
            label: 'Descripción',
            visible: true,
        },

        {
            id: 'valorporcentaje',
            label: '%Porcentaje',
            numeric: true,
            suffix: '%',
            visible: true,
        },
        {
            id: 'estado',
            label: 'Estado',
            visible: true,
            state: true,
        },
    ],



    columnInscripcionPrograma: [
        {
            id: 'registroestudiante',
            label: 'Registro',
        },
        {
            id: 'nameestudiante',
            label: 'Estudiante',
        },
    ],

    columnInscripcionCurso: [
        {
            id: 'registroestudiante',
            label: 'Registro',
        },
        {
            id: 'nameestudiante',
            label: 'Estudiante',
        },
    ],

    columnInscripcionGrupo: [
        {
            id: 'registroestudiante',
            label: 'Registro',
        },
        {
            id: 'nameestudiante',
            label: 'Estudiante',
        },
    ],


    columnUnidadNegocio: [
        {
            id: 'sigla',
            label: 'Sigla',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'descripcion',
            label: 'Descripción',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnTipoCiudad: [
        {
            id: 'descripcion',
            label: 'Descripción',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnOfertaAcademica: [
        {
            id: 'sigla',
            label: 'Sigla',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'descripcion',
            label: 'Descripción',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnNivelAcademico: [
        {
            id: 'sigla',
            label: 'Sigla',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'descripcion',
            label: 'Descripción',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnModalidadAcademica: [
        {
            id: 'sigla',
            label: 'Sigla',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'descripcion',
            label: 'Descripción',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],
    
    columnPeriodo: [
        {
            id: 'sigla',
            label: 'Sigla',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'descripcion',
            label: 'Descripción',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnMateria: [
        {
            id: 'codigo',
            label: 'Código',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'sigla',
            label: 'Sigla',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'nombrecorto',
            label: 'Nombre Corto',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'nombrelargo',
            label: 'Nombre Largo',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnTipoMateria: [
        {
            id: 'sigla',
            label: 'Sigla',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'descripcion',
            label: 'Descripción',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],



    columnBitacora: [
        {
            id: 'usuario',
            label: 'Usuario',
            object: true,
            value: 'nombreprincipal',
        },
        {
            id: 'ip',
            label: 'IP',
        },
        {
            id: 'accion',
            label: 'Acción',
        },
        {
            id: 'x_fecha',
            label: 'Fecha',
        },
        {
            id: 'x_hora',
            label: 'Hora',
        },
    ],

    columnTipoPermiso: [
        {
            id: 'descripcion',
            label: 'Descripción',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnTipoRol: [
        {
            id: 'descripcion',
            label: 'Descripción',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnRol: [
        {
            id: 'descripcion',
            label: 'Descripción',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'tiporol',
            label: 'Tipo',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnUsuario: [
        {
            id: 'login',
            label: 'Login',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'email',
            label: 'Email',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnUnidadAdministrativa: [
        {
            id: 'sigla',
            label: 'Sigla',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'descripcion',
            label: 'Descripción',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'unidadnegocio',
            label: 'Unidad Negocio',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnUnidadAcademica: [
        {
            id: 'codigo',
            label: 'Código',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'sigla',
            label: 'Sigla',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'descripcion',
            label: 'Descripción',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'unidadadministrativa',
            label: 'Unidad Administrativa',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'unidadnegocio',
            label: 'Unidad Negocio',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnPrograma: [
        {
            id: 'nivelacademico',
            label: 'Nivel',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'modalidadacademica',
            label: 'Modalidad',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'codigo',
            label: 'Código',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'sigla',
            label: 'Sigla',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'descripcion',
            label: 'Descripción',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'unidadadministrativa',
            label: 'Unidad Administrativa',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'unidadnegocio',
            label: 'Unidad Negocio',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'unidadacademica',
            label: 'Unidad Academica',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnPensum: [
        {
            id: 'unidadadministrativa',
            label: 'Unidad Administrativa',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'unidadnegocio',
            label: 'Unidad Negocio',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'unidadacademica',
            label: 'Unidad Academica',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'programa',
            label: 'Programa',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'descripcion',
            label: 'Pensum',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'fechaaprobacion',
            label: 'Fecha',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnResponsable: [
        {
            id: 'nombre',
            label: 'Nombre',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'apellido',
            label: 'Apellido',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'nrodocumento',
            label: 'Nro documento',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'ciudad',
            label: 'Ciudad',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'direccion',
            label: 'Dirección',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnAula: [
        {
            id: 'sigla',
            label: 'Sigla',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'descripcion',
            label: 'Aula',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnTurno: [
        {
            id: 'sigla',
            label: 'Sigla',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'descripcion',
            label: 'Jornada',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnDivisionAcademica: [
        {
            id: 'sigla',
            label: 'Sigla',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'descripcion',
            label: 'Descripción',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'orden',
            label: 'Orden',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnInstitucion: [
        {
            id: 'sigla',
            label: 'Sigla',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'descripcion',
            label: 'Nombre',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'nit',
            label: 'Nit',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'ciudad',
            label: 'Ciudad',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnGestionPeriodo: [
        {
            id: 'orden',
            label: 'Orden',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'descripcion',
            label: 'Periodo',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'fechainicio',
            label: 'Fecha Inicio',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'fechafinal',
            label: 'Fecha Final',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],


    columnTipoIdentificacion: [
        {
            id: 'sigla',
            label: 'Sigla',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'descripcion',
            label: 'Tipo',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnCargo: [
        {
            id: 'descripcion',
            label: 'Nombre',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnDocente: [
        {
            id: ['nombreprincipal', 'nombreadicional', 'apellidoprimero', 'apellidosegundo'],
            label: 'Docente',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'tipoidentificacion',
            label: 'Tipo Identificación',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'numeroidentificacion',
            label: 'Nro. Identificación',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'ciudadnacimiento',
            label: 'Lugar Nacimiento',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnAdministrativo: [
        {
            id: ['nombreprincipal', 'nombreadicional', 'apellidoprimero', 'apellidosegundo'],
            label: 'Administrativo',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'tipoidentificacion',
            label: 'Tipo Identificación',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'numeroidentificacion',
            label: 'Nro. Identificación',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'ciudadnacimiento',
            label: 'Lugar Nacimiento',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnEstudiante: [
        {
            id: ['nombreprincipal', 'nombreadicional', 'apellidoprimero', 'apellidosegundo'],
            label: 'Estudiante',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'tipoidentificacion',
            label: 'Tipo Identificación',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'numeroidentificacion',
            label: 'Nro. Identificación',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'ciudadnacimiento',
            label: 'Lugar Nacimiento',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnCategoriaDocumento: [
        {
            id: 'descripcion',
            label: 'Nombre',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnGrupo: [
        {
            id: 'sigla',
            label: 'Grupo',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],


    columnCurso: [
        {
            id: 'sigla',
            label: 'Sigla',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'descripcion',
            label: 'Curso',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'modalidadAcademica',
            label: 'Modalidad',
            object: true,
            value: 'descripcion'
        },
        {
            id: 'gestionPeriodo',
            label: 'Periodo',
            object: true,
            value: 'descripcion',
        },
        {
            id: 'estadoproceso',
            label: 'Tipo Op.',
            numeric: false,
            visible: true,
            width: null,
            tipooperacion: true,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnMotivoAperturaCierreCurso: [
        {
            id: 'sigla',
            label: 'Sigla',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'descripcion',
            label: 'Motivo',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],



    columnTipoActividad: [
        {
            id: 'sigla',
            label: 'Sigla',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'descripcion',
            label: 'Tipo',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnTipoMedioPublicitario: [
        {
            id: 'sigla',
            label: 'Sigla',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'descripcion',
            label: 'Tipo',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnTipoContacto: [
        {
            id: 'sigla',
            label: 'Sigla',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'descripcion',
            label: 'Tipo',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnTipoResultado: [
        {
            id: 'sigla',
            label: 'Sigla',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'descripcion',
            label: 'Tipo',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnEstadoNegocio: [
        {
            id: 'sigla',
            label: 'Sigla',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'descripcion',
            label: 'Tipo',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },

        {
            id: 'valorporcentaje',
            label: '%Porcentaje',
            numeric: true,
            suffix: '%',
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnAsesorResponsable: [
        {
            id: ['nombreprincipal', 'nombreadicional', 'apellidoprimero', 'apellidosegundo'],
            label: 'Asesor Responsable',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'tipoidentificacion',
            label: 'Tipo Identificación',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'numeroidentificacion',
            label: 'Nro. Identificación',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'ciudadnacimiento',
            label: 'Lugar Nacimiento',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnNegocio: [
        {
            id: 'oportunidad',
            label: 'Negocio',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'programa',
            label: 'Programa',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'turno',
            label: 'Turno',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estadonegocio',
            label: 'Estado Negocio',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnActividad: [
        {
            id: 'negocio',
            label: 'Actividad',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'tipoactividad',
            label: 'Tipo',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'asesorresponsable',
            label: 'Asesor Administrativo',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: ['fechaprogramada', 'horaprogramada'],
            label: 'Tiempo Prog.',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

    columnOportunidad: [
        {
            id: 'descripcion',
            label: 'Oportunidad',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'identificacion',
            label: 'Identificación',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'asesorresponsable',
            label: 'Asesor',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'ciudadorigen',
            label: 'Origen',
            numeric: false,
            visible: true,
            width: null,
            state: false,
        },
        {
            id: 'fecharegistro',
            label: 'Fecha Registro',
            numeric: false,
            visible: true,
            amountday: true,
            width: null,
            state: false,
        },
        {
            id: 'estado',
            label: 'Estado',
            numeric: false,
            visible: true,
            width: null,
            state: true,
        },
    ],

};

export default ColumnModules;
