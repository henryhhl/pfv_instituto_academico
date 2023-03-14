
import React from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import DatePickerComponent from '../../../../components/date';
import { ButtonComponent ,InputComponent, TextAreaComponent } from '../../../../components/components';
import { existsData } from '../../../../utils/functions';
import FormHorarioCursoModal from './modal/form_horario.modal';
import FormAddCursoCalificacion from './modal/form_add_cursocalificacion.modal';
import FormAddDocenteCursoModal from './modal/form_add_docente.modal';
import ListadoMateriaModal from '../../parametro/materia/modal/materia_listado.modal';
import ListadoTurnoModal from '../../estructurainstitucional/turno/modal/turno_listado.modal';
import ListadoModalidadAcademicaModal from '../../parametro/modalidad/modal/modalidad_academica_listado.modal';
import ListadoUnidadAcademicaModal from '../../estructuraacademica/unidadacademica/modal/unidad_academica_listado.modal';
import ListadoGestionPeriodoModal from '../../estructurainstitucional/gestionperiodo/modal/gestionperiodo_listado.modal';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { CursoActions } from '../../../../redux/actions/ofertaacademica/curso.action';

function CreateCurso( props ) {
    const { curso } = props;
    const navigate = useNavigate();

    const [ visibleUnidadAcademica, setVisibleUnidadAcademica ] = React.useState(false);
    const [ visibleModalidadAcademica, setVisibleModalidadAcademica ] = React.useState(false);
    const [ visibleMateria, setVisibleMateria ] = React.useState(false);
    const [ visibleTurno, setVisibleTurno ] = React.useState(false);
    const [ visibleGestionPeriodo, setVisibleGestionPeriodo ] = React.useState(false);

    const [ visibleHorario, setVisibleHorario ] = React.useState(false);
    const [ visibleFormAddDocente, setVisibleFormAddDocente ] = React.useState(false);
    const [ visibleParametroCalificacion, setVisibleParametroCalificacion ] = React.useState(false);

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onCreate();
            }
        } );
        return () => {};
    }, [] );

    const onLogin = () => {
        navigate( '/login' );
    };

    const onBack = () => {
        props.onLimpiar();
        navigate(-1);
    };

    const onComponentUnidadAcademica = () => {
        if ( !visibleUnidadAcademica ) return null;
        return (
            <ListadoUnidadAcademicaModal
                visible={visibleUnidadAcademica}
                onClose={ () => setVisibleUnidadAcademica(false) }
                onSelect={ (unidadAcademica) => {
                    props.setFKIDUnidadAcademica(curso, unidadAcademica);
                    setVisibleUnidadAcademica(false);
                } }
                valueSelect={curso?.fkidunidadacademica}
            />
        );
    };

    const onComponentModalidadAcademica = () => {
        if ( !visibleModalidadAcademica ) return null;
        return (
            <ListadoModalidadAcademicaModal
                visible={visibleModalidadAcademica}
                onClose={ () => setVisibleModalidadAcademica(false) }
                onSelect={ (modalidadAcademica) => {
                    props.setFKIDModalidadAcademica(curso, modalidadAcademica);
                    setVisibleModalidadAcademica(false);
                } }
                valueSelect={curso?.fkidmodalidadacademica}
            />
        );
    };

    const onComponentMateria = () => {
        if ( !visibleMateria ) return null;
        return (
            <ListadoMateriaModal
                visible={visibleMateria}
                onClose={ () => setVisibleMateria(false) }
                onSelect={ (materia) => {
                    props.setFKIDMateria(curso, materia);
                    setVisibleMateria(false);
                } }
                valueSelect={curso?.fkidmateria}
            />
        );
    };

    const onComponentTurno = () => {
        if ( !visibleTurno ) return null;
        return (
            <ListadoTurnoModal
                visible={visibleTurno}
                onClose={ () => setVisibleTurno(false) }
                onSelect={ (turno) => {
                    props.setFKIDTurno(curso, turno);
                    setVisibleTurno(false);
                } }
                valueSelect={curso?.fkidturno}
            />
        );
    };

    const onComponentGestionPeriodo = () => {
        if ( !visibleGestionPeriodo ) return null;
        return (
            <ListadoGestionPeriodoModal
                visible={visibleGestionPeriodo}
                onClose={ () => setVisibleGestionPeriodo(false) }
                onSelect={ (gestionPeriodo) => {
                    props.setFKIDGestionPeriodo(curso, gestionPeriodo);
                    setVisibleGestionPeriodo(false);
                } }
                valueSelect={curso?.fkidgestionperiodo}
            />
        );
    };

    const onComponentHorario = () => {
        if ( !visibleHorario ) return null;
        return (
            <FormHorarioCursoModal
                visible={visibleHorario}
                onClose={ () => setVisibleHorario(false) }
            />
        );
    };

    const onComponentFormAddParametroCalificacion = () => {
        if ( !visibleParametroCalificacion ) return null;
        return (
            <FormAddCursoCalificacion
                visible={visibleParametroCalificacion}
                onClose={ () => setVisibleParametroCalificacion(false) }
            />
        );
    };

    const onComponentFormAddDocente = () => {
        if ( !visibleFormAddDocente ) return null;
        return (
            <FormAddDocenteCursoModal
                visible={visibleFormAddDocente}
                onClose={ () => setVisibleFormAddDocente(false) }
            />
        );
    };

    return (
        <>
            { onComponentUnidadAcademica() }
            { onComponentModalidadAcademica() }
            { onComponentMateria() }
            { onComponentTurno() }
            { onComponentGestionPeriodo() }
            { onComponentHorario() }
            { onComponentFormAddParametroCalificacion() }
            { onComponentFormAddDocente() }
            <PaperComponent>
                <CardComponent
                    header={"Nuevo Curso"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(curso, onBack) }
                            >
                                Guardar
                            </ButtonComponent>
                            <ButtonComponent
                                type='danger' onClick={onBack}
                            >
                                Cancelar
                            </ButtonComponent>
                        </>
                    }
                >
                    <div className="row">
                        <div className="form-group col-6">
                            <InputComponent
                                label="Unidad Academica*"
                                value={curso.unidadacademica}
                                onClick={ () => setVisibleUnidadAcademica(true) }
                                error={curso.error.fkidunidadacademica}
                                message={curso.message.fkidunidadacademica}
                                readOnly
                                style={{ background: 'white', cursor: 'pointer', }}
                                placeholder="SELECCIONAR UNIDAD ACADEMICA"
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Unidad Administrativa"
                                value={curso.unidadadministrativa}
                                error={curso.error.fkidunidadadministrativa}
                                message={curso.message.fkidunidadadministrativa}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Unidad Negocio"
                                value={curso.unidadnegocio}
                                error={curso.error.fkidunidadnegocio}
                                message={curso.message.fkidunidadnegocio}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-3">
                            <InputComponent
                                label="Sigla*"
                                value={curso.sigla}
                                onChange={ (value) => props.setSigla(curso, value) }
                                error={curso.error.sigla}
                                message={curso.message.sigla}
                            />
                        </div>
                        <div className="form-group col-6">
                            <InputComponent
                                label="Nombre de Curso*"
                                value={curso.descripcion}
                                onChange={ (value) => props.setDescripcion(curso, value) }
                                error={curso.error.descripcion}
                                message={curso.message.descripcion}
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Modalidad Academica*"
                                value={curso.modalidadacademica}
                                onClick={ () => setVisibleModalidadAcademica(true) }
                                error={curso.error.fkidmodalidadacademica}
                                message={curso.message.fkidmodalidadacademica}
                                readOnly
                                style={{ background: 'white', cursor: 'pointer', }}
                                placeholder="SELECCIONAR MODALIDAD ACADEMICA"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <InputComponent
                                label="Materia*"
                                onClick={ () => setVisibleMateria(true) }
                                value={curso.materia}
                                readOnly
                                style={{ background: 'white', cursor: 'pointer', }}
                                placeholder="SELECCIONAR MATERIA"
                                error={curso.error.fkidmateria}
                                message={curso.message.fkidmateria}
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Turno*"
                                onClick={ () => setVisibleTurno(true) }
                                value={curso.turno}
                                readOnly
                                style={{ background: 'white', cursor: 'pointer', }}
                                placeholder="SELECCIONAR TURNO"
                                error={curso.error.fkidturno}
                                message={curso.message.fkidturno}
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Cupo*"
                                value={curso.cupo}
                                onChange={ (value) => props.setCupo(curso, value) }
                                error={curso.error.cupo}
                                message={curso.message.cupo}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-3">
                            <InputComponent
                                label="Periodo*"
                                onClick={ () => setVisibleGestionPeriodo(true) }
                                value={curso.gestionperiodo}
                                readOnly
                                style={{ background: 'white', cursor: 'pointer', }}
                                placeholder="SELECCIONAR PERIODO"
                                error={curso.error.fkidgestionperiodo}
                                message={curso.message.fkidgestionperiodo}
                            />
                        </div>
                        <div className="form-group col-3">
                            <DatePickerComponent
                                label="Fecha Inicio*"
                                value={curso.fechainicio}
                                onChange={ (value) => props.setFechaInicio(curso, value) }
                                error={curso.error.fechainicio}
                                message={curso.message.fechainicio}
                                placeholder="SELECCIONAR FECHA INICIO"
                            />
                        </div>
                        <div className="form-group col-3">
                            <DatePickerComponent
                                label="Fecha Final*"
                                value={curso.fechafinal}
                                onChange={ (value) => props.setFechaFinal(curso, value) }
                                error={curso.error.fechafinal}
                                message={curso.message.fechafinal}
                                placeholder="SELECCIONAR FECHA FINAL"
                                disabled={curso.fechainicio.length === 0}
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Cant. Hora*"
                                value={curso.cantidadhora}
                                onChange={ (value) => props.setCantidadHora(curso, value) }
                                error={curso.error.cantidadhora}
                                message={curso.message.cantidadhora}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4"></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Inversión Base*"
                                value={curso.inversionbase}
                                onChange={ (value) => props.setInversionBase(curso, value) }
                                error={curso.error.inversionbase}
                                message={curso.message.inversionbase}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-12">
                            <ButtonComponent
                                onClick={ () => {
                                    setVisibleFormAddDocente(true);
                                } }
                            >
                                Asignar Docente
                            </ButtonComponent>
                            <ButtonComponent
                                onClick={ () => {
                                    if ( existsData( curso.fkidgestionperiodo ) && existsData( curso.fechainicio ) && existsData( curso.fechafinal ) ) {
                                        setVisibleHorario( true );
                                    } else {
                                        toastr.warning( 'Campo periodo, fecha inicio y fecha final requerido.', '', { closeButton: true, progressBar: true, } );
                                    }
                                } }
                            >
                                Asignar Horarios
                            </ButtonComponent>
                            <ButtonComponent
                                onClick={ () => {
                                    setVisibleParametroCalificacion(true);
                                } }
                            >
                                Asignar Calificaciones
                            </ButtonComponent>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <TextAreaComponent
                                label="Pre Requisito"
                                value={curso.prerequisito}
                                onChange={ (value) => props.setPreRequisito(curso, value) }
                                rows={2}
                            />
                        </div>
                        <div className="form-group col-6">
                            <TextAreaComponent
                                label="Objetivo"
                                value={curso.objetivo}
                                onChange={ (value) => props.setObjetivo(curso, value) }
                                rows={2}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    curso: state.Curso,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onCreate: CursoActions.onCreate,
    onLimpiar: CursoActions.onLimpiar,
    onChange: CursoActions.onChange,
    onAddRowDocente: CursoActions.onAddRowDocente,
    onDeleteRowDocente: CursoActions.onDeleteRowDocente,
    setFKIDUnidadAcademica: CursoActions.setFKIDUnidadAcademica,
    setFKIDModalidadAcademica: CursoActions.setFKIDModalidadAcademica,
    setFKIDMateria: CursoActions.setFKIDMateria,
    setFKIDTurno: CursoActions.setFKIDTurno,
    setFKIDGestionPeriodo: CursoActions.setFKIDGestionPeriodo,
    setSigla: CursoActions.setSigla,
    setDescripcion: CursoActions.setDescripcion,
    setCupo: CursoActions.setCupo,
    setFechaInicio: CursoActions.setFechaInicio,
    setFechaFinal: CursoActions.setFechaFinal,
    setCantidadHora: CursoActions.setCantidadHora,
    setInversionBase: CursoActions.setInversionBase,
    setPreRequisito: CursoActions.setPreRequisito,
    setObjetivo: CursoActions.setObjetivo,
    onStore: CursoActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateCurso  );
