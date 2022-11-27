
import React from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import DatePickerComponent from '../../../../components/date';
import { ButtonComponent ,InputComponent, TextAreaComponent, SelectComponent } from '../../../../components/components';
import { EstadoData } from '../../../../data/estado.data';
import ListadoDocenteModal from '../../persona/docente/modal/docente_listado.modal';
import ListadoMateriaModal from '../../parametro/materia/modal/materia_listado.modal';
import ListadoTurnoModal from '../../estructurainstitucional/turno/modal/turno_listado.modal';
import ListadoModalidadAcademicaModal from '../../parametro/modalidad/modal/modalidad_academica_listado.modal';
import ListadoUnidadAcademicaModal from '../../estructuraacademica/unidadacademica/modal/unidad_academica_listado.modal';
import ListadoGestionPeriodoModal from '../../estructurainstitucional/gestionperiodo/modal/gestionperiodo_listado.modal';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { CursoActions } from '../../../../redux/actions/ofertaacademica/curso.action';

function EditCurso( props ) {
    const { curso } = props;
    const params = useParams();
    const navigate = useNavigate();

    const [ visibleUnidadAcademica, setVisibleUnidadAcademica ] = React.useState(false);
    const [ visibleModalidadAcademica, setVisibleModalidadAcademica ] = React.useState(false);
    const [ visibleMateria, setVisibleMateria ] = React.useState(false);
    const [ visibleTurno, setVisibleTurno ] = React.useState(false);
    const [ visibleGestionPeriodo, setVisibleGestionPeriodo ] = React.useState(false);

    const [ visibleDocente, setVisibleDocente ] = React.useState(false);
    const [ indexDetailsDocente, setIndexDetailsDocente ] = React.useState(false);

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onEdit( params.idcurso );
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
            />
        );
    };

    const existDocente = ( iddocente ) => {
        for (let index = 0; index < curso.arraydocente.length; index++) {
            const element = curso.arraydocente[index];
            if ( element.fkiddocente === iddocente ) return true;
        }
        return false;
    };

    const onComponentDocenteDetails = () => {
        if ( !visibleDocente ) return null;
        return (
            <ListadoDocenteModal
                visible={visibleDocente}
                onClose={ () => setVisibleDocente(false) }
                onSelect={ (docente) => {
                    if ( !existDocente( docente.iddocente ) ) {
                        let detalle = curso.arraydocente[indexDetailsDocente];
                        detalle.fkiddocente = docente.iddocente;
                        detalle.docente = `${docente.nombreprincipal} ${docente.nombreadicional} ${docente.apellidoprimero} ${docente.apellidosegundo}`;
                        props.onChange(curso);
                        setVisibleDocente(false);
                    } else {
                        toastr.warning( 'Docente ya seleccionado.', '', { closeButton: true, progressBar: true, } );
                    }
                } }
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
            />
        );
    };

    return (
        <>
            { onComponentUnidadAcademica() }
            { onComponentModalidadAcademica() }
            { onComponentDocenteDetails() }
            { onComponentMateria() }
            { onComponentTurno() }
            { onComponentGestionPeriodo() }
            <PaperComponent>
                <CardComponent
                    header={"Editar Curso"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(curso, onBack) }
                            >
                                Editar
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
                    <div className='card p-0 m-0'>
                        <div className='card-header p-0'>
                            <h4>Docente</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-12">
                            <ButtonComponent
                                fullWidth
                                onClick={props.onAddRowDocente}
                            >
                                Agregar Docente
                            </ButtonComponent>
                        </div>
                    </div>
                    { curso.arraydocente.length === 0 &&
                        <div className='card p-0 m-0'>
                            <div className='card-header'>
                                <h4>Sin Información</h4>
                            </div>
                        </div>
                    }
                    <div style={{ minWidth: '100%', width: '100%', maxWidth: '100%', maxHeight: 380, overflowY: 'auto', overflowX: 'hidden', }}>
                        <div className="row">
                            { curso.arraydocente.map( ( item, key ) => {
                                return (
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4" key={key}>
                                        <div className="card card-sm position-relative card-success">
                                            <i className="card-icon text-danger ion ion-ios-paper-outline"
                                                style={ { position: 'absolute', left: -20, top: -28, } }
                                            ></i>
                                            <div className="card-options dropdown">
                                                <CloseOutlined
                                                    style={ {
                                                        padding: 4, borderRadius: 50, background: 'white', 
                                                        fontSize: 12, fontWeight: 'bold', boxShadow: '0 0 5px 0 #222',
                                                        position: 'relative', top: -8, left: 8, cursor: 'pointer',
                                                    } }
                                                    onClick={() => {
                                                        props.onDeleteRowDocente(key);
                                                    } }
                                                />
                                            </div>
                                            <div className="card-body">
                                                <div className="form-group col-12 pl-1">
                                                    <InputComponent
                                                        label={`Docente*`}
                                                        value={item.docente}
                                                        onClick={ () => {
                                                            setIndexDetailsDocente(key);
                                                            setVisibleDocente(true);
                                                        } }
                                                        readOnly
                                                        style={{ background: 'white', cursor: 'pointer', }}
                                                        placeholder="SELECCIONAR DOCENTE"
                                                        error={item.error.fkiddocente}
                                                        message={item.message.fkiddocente}
                                                    />
                                                </div>
                                                <div className="form-group col-12 pl-1">
                                                    <TextAreaComponent
                                                        label="Contenido"
                                                        value={item.contenido}
                                                        onChange={ (value) => {
                                                            item.contenido = value;
                                                            props.onChange(curso);
                                                        } }
                                                        rows={2}
                                                        readOnly={ (item.fkiddocente === null) }
                                                    />
                                                </div>
                                                <div className="form-group col-12 pl-1">
                                                    <SelectComponent 
                                                        data={EstadoData}
                                                        label={"Estado"}
                                                        value={item.estado}
                                                        onChange={ (value) => {
                                                            item.estado = value;
                                                            props.onChange(curso);
                                                        } }
                                                        disabledDefault={true}
                                                        disabled={ (item.fkiddocente === null) }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            } ) }
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
                        <div className="form-group col-2"></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Inversión Base*"
                                value={curso.inversionbase}
                                onChange={ (value) => props.setInversionBase(curso, value) }
                                error={curso.error.inversionbase}
                                message={curso.message.inversionbase}
                            />
                        </div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado*"}
                                value={curso.estado}
                                onChange={ (value) => props.setEstado(curso, value) }
                                error={curso.error.estado}
                                message={curso.message.estado}
                            />
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
    onEdit: CursoActions.onEdit,
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
    setEstado: CursoActions.setEstado,
    onUpdate: CursoActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditCurso  );
