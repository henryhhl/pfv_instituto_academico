import Constants from "../../constants/constans";
import { AsistenciaCursoService } from "../../services/nota/asistenciacurso.service";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { setHiddenSesion, setShowSesion } from "../common/sesion.action";

const setLimpiar = () => ( {
    type: Constants.asistenciacurso_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.asistenciacurso_onChange,
    payload: data,
} );

const onLimpiar = () => {
    return ( dispatch ) => {
        dispatch( setLimpiar() );
    };
};

const onUpdateAsistencia = (asistenciaCurso) => {
    return ( dispatch ) => {
        console.log(asistenciaCurso)
        asistenciaCurso.arrayAsistenciaEstudianteSelected = asistenciaCurso.arrayEstudianteInscrito.map( (item) => {
            return item.arrayAsistenciaCurso.find( (data) => {
                return (data.fechaasistencia === asistenciaCurso.feachaasistenciaseleted);
            } );
        } );


        dispatch( setShowLoading() );
        AsistenciaCursoService.onUpdate( 
            asistenciaCurso
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                console.log(result)
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {
            dispatch( setHiddenLoading() );
        } );
    };
};

const getAllStudentSignedUp = (asistenciaCurso) => {
    return async ( dispatch ) => {
        dispatch( setShowLoading() );
        return await AsistenciaCursoService.getAllStudentSignedUp( 
            asistenciaCurso
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                console.log(result)
                asistenciaCurso.arrayEstudianteInscrito = [ ...result.arrayEstudianteInscrito ];
                dispatch( onChange(asistenciaCurso) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {
            dispatch( setHiddenLoading() );
        } );
    };
};

const getAllMateriaForDocente = ( asistenciaCurso ) => {
    return async ( dispatch ) => {
        dispatch( setShowLoading() );
        return await AsistenciaCursoService.getAllMateriaForDocente( {
            fkiddocente: asistenciaCurso.fkiddocente,
        } ).then( async (result) => {
            console.log(result)
            if ( result.resp === 1 ) {
                asistenciaCurso.arrayMateria = [ ...result.arrayMateria ];
                dispatch( onChange(asistenciaCurso) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {
            dispatch( setHiddenLoading() );
        } );
    };
};

const setFkIDCurso = (asistenciaCurso, curso) => {
    return ( dispatch ) => {
        console.log(curso)
        asistenciaCurso.fkidcurso = curso.idcurso;
        asistenciaCurso.siglacurso = curso.sigla;
        asistenciaCurso.curso = curso.descripcion;

        asistenciaCurso.fechainicio = curso.fechainicio;
        asistenciaCurso.fechafinal = curso.fechafinal;

        asistenciaCurso.fkidgestionperiodo = curso.gestionPeriodo.idgestionperiodo;
        asistenciaCurso.gestionperiodo = curso.gestionPeriodo.descripcion;

        asistenciaCurso.fkidmodalidadacademica = curso.modalidadAcademica.idmodalidadacademica;
        asistenciaCurso.modalidadacademica = curso.modalidadAcademica.descripcion;

        asistenciaCurso.fkidmateria = curso.materia.idmateria;
        asistenciaCurso.materia = curso.materia.nombrelargo;

        asistenciaCurso.fkidturno = curso.turno.idturno;
        asistenciaCurso.turno = curso.turno.descripcion;

        asistenciaCurso.fkidunidadacademica = curso.unidadAcademica.idunidadacademica;
        asistenciaCurso.unidadacademica = curso.unidadAcademica.descripcion;

        asistenciaCurso.fkidunidadadministrativa = curso.unidadAdministrativa.descripcion;
        asistenciaCurso.unidadadministrativa = curso.unidadAdministrativa.idunidadadministrativa;

        dispatch( onChange(asistenciaCurso) );
        dispatch( getAllStudentSignedUp(asistenciaCurso) );
    };
};

const setFkIDDocente = (asistenciaCurso, docente) => {
    return ( dispatch ) => {
        asistenciaCurso.fkiddocente = docente.iddocente;
        asistenciaCurso.docente = `${docente.apellidoprimero} ${docente.apellidosegundo} ${docente.nombreprincipal} ${docente.nombreadicional}`;
        asistenciaCurso.arrayEstudianteInscrito = [];

        asistenciaCurso.fkidcurso = '';
        asistenciaCurso.siglacurso = '';
        asistenciaCurso.curso = '';

        asistenciaCurso.fechainicio = '';
        asistenciaCurso.fechafinal = '';

        asistenciaCurso.fkidgestionperiodo = '';
        asistenciaCurso.gestionperiodo = '';

        asistenciaCurso.fkidmodalidadacademica = '';
        asistenciaCurso.modalidadacademica = '';

        asistenciaCurso.fkidmateria = '';
        asistenciaCurso.materia = '';

        asistenciaCurso.fkidturno = '';
        asistenciaCurso.turno = '';

        asistenciaCurso.fkidunidadacademica = '';
        asistenciaCurso.unidadacademica = '';

        asistenciaCurso.fkidunidadadministrativa = '';
        asistenciaCurso.unidadadministrativa = '';

        dispatch( onChange(asistenciaCurso) );
        dispatch( getAllMateriaForDocente(asistenciaCurso) );
    };
};

export const AsistenciaCursoActions = {
    onLimpiar,
    onChange,
    setFkIDDocente,
    setFkIDCurso,
    onUpdateAsistencia,
};
