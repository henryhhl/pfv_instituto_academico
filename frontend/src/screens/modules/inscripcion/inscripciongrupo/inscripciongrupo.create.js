
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent, SelectComponent, TableComponent, TextAreaComponent } from '../../../../components/components';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import ListadoPensumModal from '../../estructuraacademica/pensum/modal/pensum_listado.modal';
import ListadoEstudianteModal from '../../persona/estudiante/modal/estudiante_listado.modal';
import ListadoGestionPeriodoModal from '../../estructurainstitucional/gestionperiodo/modal/gestionperiodo_listado.modal';
import DatePickerComponent from '../../../../components/date';
import ListadoProgramaModal from '../../estructuraacademica/programa/modal/programa_listado.modal';
import { InscripcionGrupoActions } from '../../../../redux/actions/inscripcion/inscripciongrupo.action';
import ListadoGrupoPensumModal from '../../ofertaacademica/grupo/modal/grupopensum_listado.modal';

function CreateInscripcionGrupo( props ) {
    const { inscripcionGrupo } = props;
    const navigate = useNavigate();

    const [ programa, setPrograma ] = React.useState(null);
    const [ gestionperiodo, setGestionPeriodo ] = React.useState(null);
    const [ visibleProgramaSearch, setVisibleProgramaSearch ] = React.useState(false);
    const [ visibleGestionPeriodoSearch, setVisibleGestionPeriodoSearch ] = React.useState(false);

    const [ visiblePensum, setVisiblePensum ] = React.useState(false);
    const [ visibleEstudiante, setVisibleEstudiante ] = React.useState(false);
    const [ visibleGestionPeriodo, setVisibleGestionPeriodo ] = React.useState(false);
    const [ visibleGrupo, setVisibleGrupo ] = React.useState(false);
    const [ visibleMateria, setVisibleMateria ] = React.useState(false);

    React.useEffect( () => {
        props.onLimpiar();
        setPrograma(null);
        setGestionPeriodo(null);
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

    const onComponentPensum = () => {
        if ( !visiblePensum ) return null;
        return (
            <ListadoPensumModal
                visible={visiblePensum}
                onClose={ () => setVisiblePensum(false) }
                onSelect={ (pensum) => {
                    console.log(pensum)
                    props.setFKIDPensum(inscripcionGrupo, pensum);
                    setVisiblePensum(false);
                } }
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
                    props.setFKIDEstudiante(inscripcionGrupo, estudiante);
                    setVisibleEstudiante(false);
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
                    props.setFKIDGestionPeriodo(inscripcionGrupo, gestionPeriodo);
                    setVisibleGestionPeriodo(false);
                } }
            />
        );
    };

    const onComponentProgramaSearch = () => {
        if ( !visibleProgramaSearch ) return null;
        return (
            <ListadoProgramaModal
                visible={visibleProgramaSearch}
                onClose={ () => setVisibleProgramaSearch(false) }
                onSelect={ (programa) => {
                    setPrograma(programa);
                    setVisibleProgramaSearch(false);
                } }
            />
        );
    };

    const onComponentGestionPeriodoSearch = () => {
        if ( !visibleGestionPeriodoSearch ) return null;
        return (
            <ListadoGestionPeriodoModal
                visible={visibleGestionPeriodoSearch}
                onClose={ () => setVisibleGestionPeriodoSearch(false) }
                onSelect={ (gestionPeriodo) => {
                    setGestionPeriodo(gestionPeriodo);
                    setVisibleGestionPeriodoSearch(false);
                } }
            />
        );
    };

    const onComponentGrupo = () => {
        if ( !visibleGrupo ) return null;
        return (
            <ListadoGrupoPensumModal 
                visible={visibleGrupo}
                onClose={ () => setVisibleGrupo(false) }
                onSelect={ (grupoPensum) => {
                    console.log(grupoPensum);
                    // setGestionPeriodo(gestionPeriodo);
                    // setVisibleGestionPeriodoSearch(false);
                } }
                fkidpensum={inscripcionGrupo.fkidpensum}
            />
        );
    };

    const onComponentMateria = () => {
        if ( !visibleMateria ) return null;
    };

    const setPage = (page) => {
        props.onPage(page + 1, props.paginate, programa?.idprograma, gestionperiodo?.idgestionperiodo);
    };

    const setPaginate = (paginate) => {
        props.onPage(1, paginate, programa?.idprograma, gestionperiodo?.idgestionperiodo);
    };

    return (
        <>
            { onComponentGrupo() }
            { onComponentMateria() }
            { onComponentPensum() }
            { onComponentEstudiante() }
            { onComponentGestionPeriodo() }
            { onComponentProgramaSearch() }
            { onComponentGestionPeriodoSearch() }
            <PaperComponent>
                <CardComponent
                    header={"Registrar Inscripción Grupo"}
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
                                        label="Programa"
                                        value={programa?.descripcion}
                                        onClick={ () => {
                                            setVisibleProgramaSearch(true);
                                        } }
                                        readOnly
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR PROGRAMA"
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-12">
                                    <InputComponent
                                        label="Periodo"
                                        value={gestionperiodo?.descripcion}
                                        onClick={ () => {
                                            setVisibleGestionPeriodoSearch(true);
                                        } }
                                        readOnly
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR PERIODO"
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12 mt-2'>
                                    <ButtonComponent fullWidth
                                        onClick={ () => {
                                            props.onPage(1, 25, '', programa?.idprograma, gestionperiodo?.idgestionperiodo);
                                        } }
                                        disabled={ (programa === null || gestionperiodo === null) }
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
                                        onDelete={ (item) => props.onDelete( item, programa?.idprograma, gestionperiodo?.idgestionperiodo ) }
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
                                        label="Pensum*"
                                        value={inscripcionGrupo.pensum}
                                        onClick={ () => {
                                            setVisiblePensum(true);
                                        } }
                                        error={inscripcionGrupo.error?.fkidpensum}
                                        message={inscripcionGrupo.message?.fkidpensum}
                                        readOnly
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR PENSUM"
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-5">
                                    <InputComponent
                                        label="Und. Administrativa*"
                                        value={inscripcionGrupo.unidadadministrativa}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-7">
                                    <InputComponent
                                        label="Und. Academica*"
                                        value={inscripcionGrupo.unidadacademica}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-7">
                                    <InputComponent
                                        label="Programa*"
                                        value={inscripcionGrupo.programa}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-5">
                                    <InputComponent
                                        label="Und. Negocio*"
                                        value={inscripcionGrupo.unidadnegocio}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-7">
                                    <InputComponent
                                        label="Estudiante*"
                                        value={inscripcionGrupo.estudiante}
                                        onClick={ () => {
                                            setVisibleEstudiante(true);
                                        } }
                                        error={inscripcionGrupo.error?.fkidestudiante}
                                        message={inscripcionGrupo.message?.fkidestudiante}
                                        readOnly
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR ESTUDIANTE"
                                    />
                                </div>
                                <div className="form-group col-5">
                                    <InputComponent
                                        label="Nro. Registro*"
                                        value={inscripcionGrupo.numeroregistro}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-5">
                                    { (inscripcionGrupo.fkidpensum !== '' && inscripcionGrupo.fkidpensum !== null) ?
                                        <InputComponent
                                            label="Grupo*"
                                            value={inscripcionGrupo.grupo}
                                            onClick={ () => {
                                                setVisibleGrupo(true);
                                            } }
                                            error={inscripcionGrupo.error?.fkidgrupo}
                                            message={inscripcionGrupo.message?.fkidgrupo}
                                            readOnly
                                            style={{ background: 'white', cursor: 'pointer', }}
                                            placeholder="SELECCIONAR GRUPO"
                                        /> : 
                                        <InputComponent
                                            label="Grupo*"
                                            value={inscripcionGrupo.grupo}
                                            readOnly
                                        />
                                    }
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Periodo*"
                                        value={inscripcionGrupo.gestionperiodo}
                                        onClick={ () => {
                                            setVisibleGestionPeriodo(true);
                                        } }
                                        error={inscripcionGrupo.error?.fkidgestionperiodo}
                                        message={inscripcionGrupo.message?.fkidgestionperiodo}
                                        readOnly
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR PERIODO"
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <DatePickerComponent
                                        label="Fecha*"
                                        value={inscripcionGrupo.fechainscripcion}
                                        onChange={ (value) => props.setFechaInscripcion(inscripcionGrupo, value) }
                                        error={inscripcionGrupo.error.fechainscripcion}
                                        message={inscripcionGrupo.message.fechainscripcion}
                                        placeholder="SELECCIONAR FECHA"
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
                                        value={inscripcionGrupo.estado}
                                        onChange={ (value) => props.setEstado(inscripcionGrupo, value) }
                                        error={inscripcionGrupo.error.estado}
                                        message={inscripcionGrupo.message.estado}
                                        disabledDefault
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-12">
                                    <TextAreaComponent 
                                        label="Observaciones"
                                        value={inscripcionGrupo.nota}
                                        onChange={ (value) => props.setNota(inscripcionGrupo, value) }
                                        rows={2}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12'>
                                    <ButtonComponent
                                        fullWidth
                                        onClick={ () => props.onStore(inscripcionGrupo) }
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
    inscripcionGrupo: state.InscripcionGrupo,
    column: state.ColumnModule.columnInscripcionPrograma,
    list: state.PaginationModule.listInscripcionPrograma,
    page: state.PaginationModule.pageInscripcionPrograma,
    pagination: state.PaginationModule.paginationInscripcionPrograma,
    paginate: state.PaginationModule.paginateInscripcionPrograma,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onDelete: InscripcionGrupoActions.onDelete,
    onLimpiar: InscripcionGrupoActions.onLimpiar,
    onCreate: InscripcionGrupoActions.onCreate,
    onPage: InscripcionGrupoActions.onPageInscripcionGrupo,
    setFKIDPensum: InscripcionGrupoActions.setFKIDPensum,
    setFKIDEstudiante: InscripcionGrupoActions.setFKIDEstudiante,
    setFKIDGestionPeriodo: InscripcionGrupoActions.setFKIDGestionPeriodo,
    setFechaInscripcion: InscripcionGrupoActions.setFechaInscripcion,
    setEstado: InscripcionGrupoActions.setEstado,
    setNota: InscripcionGrupoActions.setNota,
    onStore: InscripcionGrupoActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateInscripcionGrupo );
