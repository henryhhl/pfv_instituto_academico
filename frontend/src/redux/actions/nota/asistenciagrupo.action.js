import Constants from "../../constants/constans";
import { setHiddenSesion, setShowSesion } from "../common/sesion.action";
import { setHiddenLoading, setShowLoading } from "../common/loading.action";
import { AsistenciaGrupoService } from "../../services/nota/asistenciagrupo.service";
import { convertStringforDate, getLastDay } from "../../../utils/date";

const setLimpiar = () => ( {
    type: Constants.asistenciagrupo_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.asistenciagrupo_onChange,
    payload: data,
} );

const onLimpiar = () => {
    return ( dispatch ) => {
        dispatch( setLimpiar() );
    };
};

const getAllMateriaForGrupo = (asistenciaGrupo) => {
    return async ( dispatch ) => {
        dispatch( setShowLoading() );
        return await AsistenciaGrupoService.getAllMateriaForGrupo( {
            fkiddocente: asistenciaGrupo.fkiddocente,
        } ).then( async (result) => {
            console.log(result)
            if ( result.resp === 1 ) {
                asistenciaGrupo.arrayGrupoMateria = [ ...result.arrayGrupo ];
                dispatch( onChange(asistenciaGrupo) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {
            dispatch( setHiddenLoading() );
        } );
    };
};

const getAllStudentSignedUp = (asistenciaGrupo) => {
    return async ( dispatch ) => {
        dispatch( setShowLoading() );
        return await AsistenciaGrupoService.getAllStudentSignedUp( 
            asistenciaGrupo
        ).then( async (result) => {
            if ( result.resp === 1 ) {
                asistenciaGrupo.arrayEstudianteInscrito = [ ...result.arrayEstudianteInscrito ];
                dispatch( onChange(asistenciaGrupo) );
            } else if ( result.resp === -2 ) {
                await dispatch( setShowSesion() );
                await dispatch( setHiddenSesion() );
            }
        } ).finally( () => {
            dispatch( setHiddenLoading() );
        } );
    };
};

const setFkIDDocente = (asistenciaGrupo, docente) => {
    return ( dispatch ) => {
        asistenciaGrupo.fkiddocente = docente.iddocente;
        asistenciaGrupo.docente = `${docente.apellidoprimero} ${docente.apellidosegundo} ${docente.nombreprincipal} ${docente.nombreadicional} `;

        asistenciaGrupo.fkidgrupopensumdetalle = '';

        asistenciaGrupo.fkidunidadacademica = '';
        asistenciaGrupo.unidadacademica = '';

        asistenciaGrupo.fkidunidadadministrativa = '';
        asistenciaGrupo.unidadadministrativa = '';

        asistenciaGrupo.fkidunidadnegocio = '';
        asistenciaGrupo.unidadnegocio = '';

        asistenciaGrupo.fkidprograma = '';
        asistenciaGrupo.programa = '';

        asistenciaGrupo.fkidpensum = '';
        asistenciaGrupo.pensum = '';

        asistenciaGrupo.fkidturno = '';
        asistenciaGrupo.turno = '';

        asistenciaGrupo.fkidgestionperiodo = '';
        asistenciaGrupo.gestionperiodo = '';

        asistenciaGrupo.fechainicio = '';
        asistenciaGrupo.fechafinal = '';

        asistenciaGrupo.dayinit = '';
        asistenciaGrupo.dayfinish = '';
        asistenciaGrupo.lastday = '';
        
        asistenciaGrupo.monthselected = '';
        asistenciaGrupo.monthinit = '';
        asistenciaGrupo.monthfinish = '';

        asistenciaGrupo.yearselected = '';
        asistenciaGrupo.yearinit = '';
        asistenciaGrupo.yearfinish = '';

        asistenciaGrupo.fkidgrupo = '';
        asistenciaGrupo.grupo = '';

        asistenciaGrupo.arrayDia = [];

        asistenciaGrupo.fkidmateria = '';
        asistenciaGrupo.materia = '';

        asistenciaGrupo.fkidivisionacademica = '';
        asistenciaGrupo.divisionacademica = '';

        asistenciaGrupo.error.fkiddocente = false;
        asistenciaGrupo.message.fkiddocente = "";

        dispatch( onChange(asistenciaGrupo) );
        dispatch( getAllMateriaForGrupo(asistenciaGrupo) );
    };
};

const setFkIDGrupoMateria = (asistenciaGrupo, grupoMateria) => {
    return ( dispatch ) => {
        asistenciaGrupo.fkidgrupopensumdetalle = grupoMateria.idgrupopensumdetalle;

        asistenciaGrupo.fkidunidadacademica = grupoMateria.unidadAcademica.idunidadacademica;
        asistenciaGrupo.unidadacademica = grupoMateria.unidadAcademica.descripcion;

        asistenciaGrupo.fkidunidadadministrativa = grupoMateria.unidadAdministrativa.idunidadadministrativa;
        asistenciaGrupo.unidadadministrativa = grupoMateria.unidadAdministrativa.descripcion;

        asistenciaGrupo.fkidunidadnegocio = grupoMateria.unidadNegocio.idunidadnegocio;
        asistenciaGrupo.unidadnegocio = grupoMateria.unidadNegocio.descripcion;

        asistenciaGrupo.fkidprograma = grupoMateria.programa.idprograma;
        asistenciaGrupo.programa = grupoMateria.programa.descripcion;

        asistenciaGrupo.fkidpensum = grupoMateria.pensum.idpensum;
        asistenciaGrupo.pensum = grupoMateria.pensum.descripcion;

        asistenciaGrupo.fkidturno = grupoMateria.turno.idturno;
        asistenciaGrupo.turno = grupoMateria.turno.descripcion;

        asistenciaGrupo.fkidgestionperiodo = grupoMateria.gestionPeriodo.idgestionperiodo;
        asistenciaGrupo.gestionperiodo = grupoMateria.gestionPeriodo.descripcion;

        asistenciaGrupo.fkidmateria = grupoMateria.materia.idmateria;
        asistenciaGrupo.materia = grupoMateria.materia.nombrelargo;

        asistenciaGrupo.fkidgrupo = grupoMateria.grupo.idgrupo;
        asistenciaGrupo.grupo = grupoMateria.grupo.sigla;

        asistenciaGrupo.fkidivisionacademica = grupoMateria.divisionAcademica.iddivisionacademica;
        asistenciaGrupo.divisionacademica = grupoMateria.divisionAcademica.descripcion;

        asistenciaGrupo.fechainicio = grupoMateria.gestionPeriodo.fechainicio;
        asistenciaGrupo.fechafinal = grupoMateria.gestionPeriodo.fechafinal;

        asistenciaGrupo.dayinit = convertStringforDate(asistenciaGrupo.fechainicio).getDate();
        asistenciaGrupo.dayfinish = convertStringforDate(asistenciaGrupo.fechafinal).getDate();
        asistenciaGrupo.lastday = getLastDay(convertStringforDate(asistenciaGrupo.fechainicio));
        
        asistenciaGrupo.monthselected = convertStringforDate(asistenciaGrupo.fechainicio).getMonth() + 1;
        asistenciaGrupo.monthinit = convertStringforDate(asistenciaGrupo.fechainicio).getMonth() + 1;
        asistenciaGrupo.monthfinish = convertStringforDate(asistenciaGrupo.fechafinal).getMonth() + 1;

        asistenciaGrupo.yearselected = convertStringforDate(asistenciaGrupo.fechainicio).getFullYear();
        asistenciaGrupo.yearinit = convertStringforDate(asistenciaGrupo.fechainicio).getFullYear();
        asistenciaGrupo.yearfinish = convertStringforDate(asistenciaGrupo.fechafinal).getFullYear();

        asistenciaGrupo.arrayDia = grupoMateria.arrayGrupoMateriaDiaDetalle.filter( (item) => 
            (item.arrayGrupoMateriaDiaHorario.length > 0)
        );

        dispatch( onChange(asistenciaGrupo) );
        dispatch( getAllStudentSignedUp(asistenciaGrupo) );
    };
};

const setNextMounth = (asistenciaGrupo) => {
    return ( dispatch ) => {
        const dateInit = `${asistenciaGrupo.yearselected}-${asistenciaGrupo.monthselected}`;
        const dateFinish = `${asistenciaGrupo.yearfinish}-${asistenciaGrupo.monthfinish}`;
        if ( dateInit < dateFinish ) {
            const dateNext = new Date(parseInt(asistenciaGrupo.yearselected), parseInt(asistenciaGrupo.monthselected), 1);
            asistenciaGrupo.yearselected = dateNext.getFullYear();
            asistenciaGrupo.monthselected = dateNext.getMonth() + 1;

            const dateCurrent = `${dateNext.getFullYear()}-${dateNext.getMonth() + 1}`;

            if ( dateFinish === dateCurrent ) {
                asistenciaGrupo.lastday = asistenciaGrupo.dayfinish;
            } else {
                asistenciaGrupo.lastday = getLastDay(dateNext);
            }
            dispatch( onChange(asistenciaGrupo) );
            dispatch( getAllStudentSignedUp(asistenciaGrupo) );
        }
    }
};

const setBackMounth = (asistenciaGrupo) => {
    return ( dispatch ) => {
        const dateFinish = `${asistenciaGrupo.yearselected}-${asistenciaGrupo.monthselected}`;
        const dateInit = `${asistenciaGrupo.yearinit}-${asistenciaGrupo.monthinit}`;
        if ( dateFinish > dateInit ) {
            const dateNext = new Date(parseInt(asistenciaGrupo.yearselected), parseInt(asistenciaGrupo.monthselected) - 2, 1);
            asistenciaGrupo.yearselected = dateNext.getFullYear();
            asistenciaGrupo.monthselected = dateNext.getMonth() + 1;
            asistenciaGrupo.lastday = getLastDay(dateNext);
            dispatch( onChange(asistenciaGrupo) );
            dispatch( getAllStudentSignedUp(asistenciaGrupo) );
        }
    }
};

export const AsistenciaGrupoActions = {
    onLimpiar,
    onChange,
    setFkIDDocente,
    getAllMateriaForGrupo,
    setFkIDGrupoMateria,
    setNextMounth,
    setBackMounth,
};