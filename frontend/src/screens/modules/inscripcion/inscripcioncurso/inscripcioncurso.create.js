
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import DatePickerComponent from '../../../../components/date';
import { ButtonComponent ,InputComponent, SelectComponent, TableComponent, TextAreaComponent } from '../../../../components/components';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { InscripcionCursoActions } from '../../../../redux/actions/inscripcion/inscripcioncurso.action';
import { InscripcionProgramaActions } from '../../../../redux/actions/inscripcion/inscripcionprograma.action';
import ListadoCursoModal from '../../ofertaacademica/curso/modal/curso_listado.modal';
import ListadoEstudianteModal from '../../persona/estudiante/modal/estudiante_listado.modal';

function CreateInscripcionCurso( props ) {
    const { inscripcionCurso } = props;
    const navigate = useNavigate();

    const [ curso, setCurso ] = React.useState(null);
    const [ visibleCursoSearch, setVisibleCursoSearch ] = React.useState(false);

    const [ visibleCurso, setVisibleCurso ] = React.useState(false);
    const [ visibleEstudiante, setVisibleEstudiante ] = React.useState(false);

    React.useEffect( () => {
        props.onLimpiar();
        setCurso(null);
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

    const onComponentCurso = () => {
        if ( !visibleCurso ) return null;
        return (
            <ListadoCursoModal
                visible={visibleCurso}
                onClose={ () => setVisibleCurso(false) }
                onSelect={ (curso) => {
                    props.setFKIDCurso(inscripcionCurso, curso);
                    setVisibleCurso(false);
                } }
                valueSelect={inscripcionCurso?.fkidcurso}
            />
        );
    };

    const onComponentEstudiante = () => {
        if ( !visibleEstudiante ) return null;
        return (
            <ListadoEstudianteModal
                visible={visibleEstudiante}
                onClose={ () => setVisibleEstudiante(false) }
                onSelect={ (estudiante) => {
                    props.setFKIDEstudiante(inscripcionCurso, estudiante);
                    setVisibleEstudiante(false);
                } }
                valueSelect={inscripcionCurso?.fkidestudiante}
            />
        );
    };

    const onComponentCursoSearch = () => {
        if ( !visibleCursoSearch ) return null;
        return (
            <ListadoCursoModal
                visible={visibleCursoSearch}
                onClose={ () => setVisibleCursoSearch(false) }
                onSelect={ (curso) => {
                    setCurso(curso);
                    setVisibleCursoSearch(false);
                } }
                valueSelect={curso?.idcurso}
            />
        );
    };

    const setPage = (page) => {
        props.onPage(page + 1, props.paginate, curso?.idcurso);
    };

    const setPaginate = (paginate) => {
        props.onPage(1, paginate, curso?.idcurso,);
    };

    return (
        <>
            { onComponentCurso() }
            { onComponentEstudiante() }
            { onComponentCursoSearch() }
            <PaperComponent>
                <CardComponent
                    header={"Registrar Inscripción Curso"}
                >
                    <div className="row">
                        <div className='col-5'>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className='card p-0 m-0'>
                                        <div className='card-header p-0'>
                                            <h4>Estudiante Inscritos</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-12">
                                    <InputComponent
                                        label="Curso"
                                        value={ curso && `${curso?.sigla} - ${curso?.descripcion}`}
                                        onClick={ () => {
                                            setVisibleCursoSearch(true);
                                        } }
                                        readOnly
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR CURSO"
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12 mt-2'>
                                    <ButtonComponent fullWidth
                                        onClick={ () => {
                                            props.onPage(1, 25, '', curso?.idcurso);
                                        } }
                                        disabled={ (curso === null) }
                                    >
                                        Aplicar Filtros
                                    </ButtonComponent>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12 mt-2'>
                                    <TableComponent 
                                        isSearch={false}
                                        isEdit={false}
                                        onDelete={ (item) => props.onDelete( item, curso?.idcurso ) }
                                        columns={props.column}
                                        dataSource={props.list}
                                        isPagination={true}
                                        pagination={props.pagination}
                                        paginate={props.paginate}
                                        page={props.page - 1}
                                        setPage={setPage}
                                        setPaginate={setPaginate}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col-7'>
                            <div className='row'>
                                <div className="form-group col-12">
                                    <InputComponent
                                        label="Curso*"
                                        value={inscripcionCurso.curso}
                                        onClick={ () => {
                                            setVisibleCurso(true);
                                        } }
                                        error={inscripcionCurso.error?.fkidcurso}
                                        message={inscripcionCurso.message?.fkidcurso}
                                        readOnly
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR CURSO"
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-5">
                                    <InputComponent
                                        label="Und. Administrativa*"
                                        value={inscripcionCurso.unidadadministrativa}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-7">
                                    <InputComponent
                                        label="Und. Academica*"
                                        value={inscripcionCurso.unidadacademica}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-7">
                                    <InputComponent
                                        label="Modalidad Academica*"
                                        value={inscripcionCurso.modalidadacademica}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-5">
                                    <InputComponent
                                        label="Und. Negocio*"
                                        value={inscripcionCurso.unidadnegocio}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-7">
                                    <InputComponent
                                        label="Estudiante*"
                                        value={inscripcionCurso.estudiante}
                                        onClick={ () => {
                                            setVisibleEstudiante(true);
                                        } }
                                        error={inscripcionCurso.error?.fkidestudiante}
                                        message={inscripcionCurso.message?.fkidestudiante}
                                        readOnly
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR ESTUDIANTE"
                                    />
                                </div>
                                <div className="form-group col-5">
                                    <InputComponent
                                        label="Nro. Registro*"
                                        value={inscripcionCurso.numeroregistro}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Periodo*"
                                        value={inscripcionCurso.gestionperiodo}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Turno*"
                                        value={inscripcionCurso.turno}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <DatePickerComponent
                                        label="Fecha*"
                                        value={inscripcionCurso.fechainscripcion}
                                        onChange={ (value) => props.setFechaInscripcion(inscripcionCurso, value) }
                                        error={inscripcionCurso.error.fechainscripcion}
                                        message={inscripcionCurso.message.fechainscripcion}
                                        placeholder="SELECCIONAR FECHA"
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-4">
                                    <SelectComponent
                                        data={ [
                                            {
                                                value: 'S',
                                                title: 'SI',
                                            },
                                            {
                                                value: 'N',
                                                title: 'NO',
                                            },
                                        ] }
                                        label={"Inscripción Formalizada*"}
                                        value={inscripcionCurso.esinscripcionformalizada}
                                        onChange={ (value) => props.setEsInscripcionFormalizada(inscripcionCurso, value) }
                                        error={inscripcionCurso.error.esinscripcionformalizada}
                                        message={inscripcionCurso.message.esinscripcionformalizada}
                                        disabledDefault
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <SelectComponent
                                        data={ [
                                            {
                                                value: 'A',
                                                title: 'ANTIGUO',
                                            },
                                            {
                                                value: 'N',
                                                title: 'NUEVO',
                                            },
                                        ] }
                                        label={"Condición*"}
                                        value={inscripcionCurso.condicion}
                                        onChange={ (value) => props.setCondicion(inscripcionCurso, value) }
                                        error={inscripcionCurso.error.condicion}
                                        message={inscripcionCurso.message.condicion}
                                        disabledDefault
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <SelectComponent
                                        data={ [
                                            {
                                                value: 'A',
                                                title: 'ACTIVO',
                                            },
                                            {
                                                value: 'N',
                                                title: 'INACTIVO',
                                            },
                                        ] }
                                        label={"Estado*"}
                                        value={inscripcionCurso.estado}
                                        onChange={ (value) => props.setEstado(inscripcionCurso, value) }
                                        error={inscripcionCurso.error.estado}
                                        message={inscripcionCurso.message.estado}
                                        disabledDefault
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-12">
                                    <TextAreaComponent 
                                        label="Observaciones"
                                        value={inscripcionCurso.nota}
                                        onChange={ (value) => props.setNota(inscripcionCurso, value) }
                                        rows={2}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12'>
                                    <ButtonComponent
                                        fullWidth
                                        onClick={ () => props.onStore(inscripcionCurso) }
                                    >
                                        Inscribir
                                    </ButtonComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    inscripcionCurso: state.InscripcionCurso,
    column: state.ColumnModule.columnInscripcionCurso,
    list: state.PaginationModule.listInscripcionCurso,
    page: state.PaginationModule.pageInscripcionCurso,
    pagination: state.PaginationModule.paginationInscripcionCurso,
    paginate: state.PaginationModule.paginateInscripcionCurso,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onDelete: InscripcionCursoActions.onDelete,
    onLimpiar: InscripcionCursoActions.onLimpiar,
    onCreate: InscripcionCursoActions.onCreate,
    onPage: InscripcionCursoActions.onPageInscripcionCurso,
    setFKIDCurso: InscripcionCursoActions.setFKIDCurso,
    setFKIDEstudiante: InscripcionCursoActions.setFKIDEstudiante,
    setFechaInscripcion: InscripcionCursoActions.setFechaInscripcion,
    setEsInscripcionFormalizada: InscripcionCursoActions.setEsInscripcionFormalizada,
    setCondicion: InscripcionCursoActions.setCondicion,
    setEstado: InscripcionCursoActions.setEstado,
    setNota: InscripcionCursoActions.setNota,
    onStore: InscripcionCursoActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateInscripcionCurso );
