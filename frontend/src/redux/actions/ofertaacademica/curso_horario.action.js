
import Swal from 'sweetalert2';
import Constants from "../../constants/constans";
import ConfirmationComponent from "../../../components/confirmation";
import { setHiddenSesion, setShowSesion } from '../common/sesion.action';
import { setHiddenLoading, setShowLoading } from "../common/loading.action";

const setLimpiar = () => ( {
    type: Constants.cursohorario_onLimpiar,
} );

const onChange = ( data ) => ( {
    type: Constants.cursohorario_onChange,
    payload: data,
} );

const onAddRowHorario = ( data ) => ( {
    type: Constants.cursohorario_onAddRowHorario,
    payload: data,
} );

const onDeleteRowHorario = ( index ) => ( {
    type: Constants.cursohorario_onDeleteRowHorario,
    payload: index,
} );

const onLimpiar = () => {
    return ( dispatch ) => {
        dispatch( setLimpiar() );
    };
};

const setFKIDCurso = (cursoHorario, curso) => {
    return ( dispatch ) => {
        cursoHorario.fkidcurso = curso.idcurso;
        cursoHorario.curso = curso.descripcion;

        cursoHorario.fkidmateria = curso.fkidmateria;
        cursoHorario.materia = curso.materia;

        cursoHorario.fkidturno = curso.fkidturno;
        cursoHorario.turno = curso.turno;

        cursoHorario.fkidmodalidadacademica = curso.fkidmodalidadacademica;
        cursoHorario.modalidadacademica = curso.modalidadacademica;

        cursoHorario.fkidgestionperiodo = curso.fkidgestionperiodo;
        cursoHorario.gestionperiodo = curso.gestionperiodo;

        cursoHorario.arraydocente = [...curso.arraydocente];

        cursoHorario.fechainicio = curso.fechainicio;
        cursoHorario.fechafinal = curso.fechafinal;

        cursoHorario.error.fkidcurso = false;
        cursoHorario.message.fkidcurso = "";
        dispatch( onChange(cursoHorario) );
    };
};

export const CursoHorarioActions = {
    onLimpiar,
    onChange,
    onAddRowHorario,
    onDeleteRowHorario,
    setFKIDCurso,
};
