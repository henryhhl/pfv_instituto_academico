import Constants from "../../constants/constans";
import { NotaCursoService } from "../../services/nota/notacurso.service";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { setHiddenSesion, setShowSesion } from "../common/sesion.action";

const setLimpiar = () => ( {
    type: Constants.notacurso_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.notacurso_onChange,
    payload: data,
} );

const onLimpiar = () => {
    return ( dispatch ) => {
        dispatch( setLimpiar() );
    };
};

const getAllMateriaForDocente = ( notaCurso ) => {
    return async ( dispatch ) => {
        dispatch( setShowLoading() );
        return await NotaCursoService.getAllMateriaForDocente( {
            fkiddocente: notaCurso.fkiddocente,
        } ).then( async (result) => {
            console.log(result)
            if ( result.resp === 1 ) {
                notaCurso.arrayMateria = [ ...result.arrayMateria ];
                dispatch( onChange(notaCurso) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {
            dispatch( setHiddenLoading() );
        } );
    };
};

const getAllStudentSignedUp = (notaCurso) => {
    return async ( dispatch ) => {
        dispatch( setShowLoading() );
        return await NotaCursoService.getAllStudentSignedUp( 
            notaCurso
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                console.log(result)
                notaCurso.arrayEstudianteInscrito = [ ...result.arrayEstudianteInscrito ];
                dispatch( onChange(notaCurso) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {
            dispatch( setHiddenLoading() );
        } );
    };
};

const setFkIDDocente = (notaCurso, docente) => {
    return ( dispatch ) => {
        notaCurso.fkiddocente = docente.iddocente;
        notaCurso.docente = `${docente.apellidoprimero} ${docente.apellidosegundo} ${docente.nombreprincipal} ${docente.nombreadicional}`;
        notaCurso.arrayEstudianteInscrito = [];

        notaCurso.fkidcurso = '';
        notaCurso.siglacurso = '';
        notaCurso.curso = '';

        notaCurso.fechainicio = '';
        notaCurso.fechafinal = '';

        notaCurso.fkidgestionperiodo ='';
        notaCurso.gestionperiodo = '';

        notaCurso.fkidmodalidadacademica = '';
        notaCurso.modalidadacademica = '';

        notaCurso.fkidmateria = '';
        notaCurso.materia = '';

        notaCurso.fkidturno = '';
        notaCurso.turno = '';

        notaCurso.fkidunidadacademica = '';
        notaCurso.unidadacademica = '';

        notaCurso.fkidunidadadministrativa = '';
        notaCurso.unidadadministrativa = '';

        dispatch( onChange(notaCurso) );
        dispatch( getAllMateriaForDocente(notaCurso) );
    };
};

const setFkIDCurso = (notaCurso, curso) => {
    return ( dispatch ) => {
        console.log(curso)
        notaCurso.fkidcurso = curso.idcurso;
        notaCurso.siglacurso = curso.sigla;
        notaCurso.curso = curso.descripcion;

        notaCurso.fechainicio = curso.fechainicio;
        notaCurso.fechafinal = curso.fechafinal;

        notaCurso.fkidgestionperiodo = curso.gestionPeriodo.idgestionperiodo;
        notaCurso.gestionperiodo = curso.gestionPeriodo.descripcion;

        notaCurso.fkidmodalidadacademica = curso.modalidadAcademica.idmodalidadacademica;
        notaCurso.modalidadacademica = curso.modalidadAcademica.descripcion;

        notaCurso.fkidmateria = curso.materia.idmateria;
        notaCurso.materia = curso.materia.nombrelargo;

        notaCurso.fkidturno = curso.turno.idturno;
        notaCurso.turno = curso.turno.descripcion;

        notaCurso.fkidunidadacademica = curso.unidadAcademica.idunidadacademica;
        notaCurso.unidadacademica = curso.unidadAcademica.descripcion;

        notaCurso.fkidunidadadministrativa = curso.unidadAdministrativa.descripcion;
        notaCurso.unidadadministrativa = curso.unidadAdministrativa.idunidadadministrativa;

        dispatch( onChange(notaCurso) );
        dispatch( getAllStudentSignedUp(notaCurso) );
    };
};

const onUpdateAllNota= (notaCurso) => {
    return ( dispatch ) => {
        const arrayNotaCursoEstudiante = [];
        for (let index = 0; index < notaCurso.arrayEstudianteInscrito.length; index++) {
            const estudiante = notaCurso.arrayEstudianteInscrito[index];
            for (let pos = 0; pos < estudiante.arrayNotaCurso.length; pos++) {
                const notaCurso = estudiante.arrayNotaCurso[pos];
                arrayNotaCursoEstudiante.push( {
                    idnotacurso: notaCurso.idnotacurso,
                    nota: notaCurso.nota,
                } );
            }
        }

        dispatch( setShowLoading() );
        NotaCursoService.onUpdate( 
            arrayNotaCursoEstudiante
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

export const NotaCursoActions = {
    onLimpiar,
    onChange,
    setFkIDDocente,
    setFkIDCurso,
    onUpdateAllNota,
};