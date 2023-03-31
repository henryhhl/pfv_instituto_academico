import Constants from "../../constants/constans";
import { NotaGrupoService } from "../../services/nota/notagrupo.service";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { setHiddenSesion, setShowSesion } from "../common/sesion.action";

const setLimpiar = () => ( {
    type: Constants.notagrupo_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.notagrupo_onChange,
    payload: data,
} );

const onLimpiar = () => {
    return ( dispatch ) => {
        dispatch( setLimpiar() );
    };
};

const getAllMateriaForGrupo = (notaGrupo) => {
    return async ( dispatch ) => {
        dispatch( setShowLoading() );
        return await NotaGrupoService.getAllMateriaForGrupo( {
            fkiddocente: notaGrupo.fkiddocente,
        } ).then( async (result) => {
            console.log(result)
            if ( result.resp === 1 ) {
                notaGrupo.arrayGrupoMateria = [ ...result.arrayGrupo ];
                dispatch( onChange(notaGrupo) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {
            dispatch( setHiddenLoading() );
        } );
    };
};

const getAllStudentSignedUp = (notaGrupo) => {
    return async ( dispatch ) => {
        dispatch( setShowLoading() );
        return await NotaGrupoService.getAllStudentSignedUp( 
            notaGrupo
        ).then( async (result) => {
            console.log(result)
            if ( result.resp === 1 ) {
                notaGrupo.arrayEstudianteInscrito = [ ...result.arrayEstudianteInscrito ];
                dispatch( onChange(notaGrupo) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {
            dispatch( setHiddenLoading() );
        } );
    };
};

const setFkIDDocente = (notaGrupo, docente) => {
    return async ( dispatch ) => {
        await dispatch( setLimpiar() );
        notaGrupo.fkiddocente = docente.iddocente;
        notaGrupo.docente = `${docente.apellidoprimero} ${docente.apellidosegundo} ${docente.nombreprincipal} ${docente.nombreadicional} `;

        await dispatch( onChange(notaGrupo) );
        await dispatch( getAllMateriaForGrupo(notaGrupo) );
    };
};

const setFkIDGrupoMateria = (notaGrupo, grupoMateria) => {
    return ( dispatch ) => {
        notaGrupo.fkidgrupopensumdetalle = grupoMateria.idgrupopensumdetalle;

        notaGrupo.fkidunidadacademica = grupoMateria.unidadAcademica.idunidadacademica;
        notaGrupo.unidadacademica = grupoMateria.unidadAcademica.descripcion;

        notaGrupo.fkidunidadadministrativa = grupoMateria.unidadAdministrativa.idunidadadministrativa;
        notaGrupo.unidadadministrativa = grupoMateria.unidadAdministrativa.descripcion;

        notaGrupo.fkidunidadnegocio = grupoMateria.unidadNegocio.idunidadnegocio;
        notaGrupo.unidadnegocio = grupoMateria.unidadNegocio.descripcion;

        notaGrupo.fkidprograma = grupoMateria.programa.idprograma;
        notaGrupo.programa = grupoMateria.programa.descripcion;

        notaGrupo.fkidpensum = grupoMateria.pensum.idpensum;
        notaGrupo.pensum = grupoMateria.pensum.descripcion;

        notaGrupo.fkidturno = grupoMateria.turno.idturno;
        notaGrupo.turno = grupoMateria.turno.descripcion;

        notaGrupo.fkidgestionperiodo = grupoMateria.gestionPeriodo.idgestionperiodo;
        notaGrupo.gestionperiodo = grupoMateria.gestionPeriodo.descripcion;

        notaGrupo.fkidmateria = grupoMateria.materia.idmateria;
        notaGrupo.materia = grupoMateria.materia.nombrelargo;

        notaGrupo.fkidgrupo = grupoMateria.grupo.idgrupo;
        notaGrupo.grupo = grupoMateria.grupo.sigla;

        notaGrupo.fkidivisionacademica = grupoMateria.divisionAcademica.iddivisionacademica;
        notaGrupo.divisionacademica = grupoMateria.divisionAcademica.descripcion;

        notaGrupo.fechainicio = grupoMateria.gestionPeriodo.fechainicio;
        notaGrupo.fechafinal = grupoMateria.gestionPeriodo.fechafinal;

        notaGrupo.arrayDia = grupoMateria.arrayGrupoMateriaDiaDetalle.filter( (item) => 
            (item.arrayGrupoMateriaDiaHorario.length > 0)
        );

        dispatch( onChange(notaGrupo) );
        dispatch( getAllStudentSignedUp(notaGrupo) );
    };
};

const onUpdateAllNota= (notaGrupo) => {
    return ( dispatch ) => {
        const arrayNotaGrupoEstudiante = [];
        for (let index = 0; index < notaGrupo.arrayEstudianteInscrito.length; index++) {
            const estudiante = notaGrupo.arrayEstudianteInscrito[index];
            for (let pos = 0; pos < estudiante.arrayNotaGrupo.length; pos++) {
                const notaGrupo = estudiante.arrayNotaGrupo[pos];
                arrayNotaGrupoEstudiante.push( {
                    idnotagrupo: notaGrupo.idnotagrupo,
                    nota: notaGrupo.nota,
                    calificacion: notaGrupo.calificacion,
                } );
            }
        }

        dispatch( setShowLoading() );
        NotaGrupoService.onUpdate( 
            arrayNotaGrupoEstudiante
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

export const NotaGrupoActions = {
    onLimpiar,
    onChange,
    setFkIDDocente,
    setFkIDGrupoMateria,
    onUpdateAllNota,
};
