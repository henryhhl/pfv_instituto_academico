
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent, SelectComponent, TableComponent, TextAreaComponent } from '../../../../components/components';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import ListadoPensumModal from '../../estructuraacademica/pensum/modal/pensum_listado.modal';
import { InscripcionProgramaActions } from '../../../../redux/actions/inscripcion/inscripcionprograma.action';
import ListadoEstudianteModal from '../../persona/estudiante/modal/estudiante_listado.modal';
import ListadoGestionPeriodoModal from '../../estructurainstitucional/gestionperiodo/modal/gestionperiodo_listado.modal';
import DatePickerComponent from '../../../../components/date';
import ListadoProgramaModal from '../../estructuraacademica/programa/modal/programa_listado.modal';

function CreateInscripcionPrograma( props ) {
    const { inscripcionPrograma } = props;
    const navigate = useNavigate();

    const [ programa, setPrograma ] = React.useState(null);
    const [ gestionperiodo, setGestionPeriodo ] = React.useState(null);
    const [ visibleProgramaSearch, setVisibleProgramaSearch ] = React.useState(false);
    const [ visibleGestionPeriodoSearch, setVisibleGestionPeriodoSearch ] = React.useState(false);

    const [ visiblePensum, setVisiblePensum ] = React.useState(false);
    const [ visibleEstudiante, setVisibleEstudiante ] = React.useState(false);
    const [ visibleGestionPeriodo, setVisibleGestionPeriodo ] = React.useState(false);

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
                    props.setFKIDPensum(inscripcionPrograma, pensum);
                    setVisiblePensum(false);
                } }
                valueSelect={inscripcionPrograma?.fkidpensum}
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
                    props.setFKIDEstudiante(inscripcionPrograma, estudiante);
                    setVisibleEstudiante(false);
                } }
                valueSelect={inscripcionPrograma?.fkidestudiante}
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
                    props.setFKIDGestionPeriodo(inscripcionPrograma, gestionPeriodo);
                    setVisibleGestionPeriodo(false);
                } }
                valueSelect={inscripcionPrograma?.fkidgestionperiodo}
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
                valueSelect={programa?.idprograma}
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
                valueSelect={gestionperiodo?.idgestionperiodo}
            />
        );
    };

    const setPage = (page) => {
        props.onPage(page + 1, props.paginate, programa?.idprograma, gestionperiodo?.idgestionperiodo);
    };

    const setPaginate = (paginate) => {
        props.onPage(1, paginate, programa?.idprograma, gestionperiodo?.idgestionperiodo);
    };

    return (
        <>
            { onComponentPensum() }
            { onComponentEstudiante() }
            { onComponentGestionPeriodo() }
            { onComponentProgramaSearch() }
            { onComponentGestionPeriodoSearch() }
            <PaperComponent>
                <CardComponent
                    header={"Registrar Inscripción Programa"}
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
                                        value={inscripcionPrograma.pensum}
                                        onClick={ () => {
                                            setVisiblePensum(true);
                                        } }
                                        error={inscripcionPrograma.error?.fkidpensum}
                                        message={inscripcionPrograma.message?.fkidpensum}
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
                                        value={inscripcionPrograma.unidadadministrativa}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-7">
                                    <InputComponent
                                        label="Und. Academica*"
                                        value={inscripcionPrograma.unidadacademica}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-7">
                                    <InputComponent
                                        label="Programa*"
                                        value={inscripcionPrograma.programa}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-5">
                                    <InputComponent
                                        label="Und. Negocio*"
                                        value={inscripcionPrograma.unidadnegocio}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-7">
                                    <InputComponent
                                        label="Estudiante*"
                                        value={inscripcionPrograma.estudiante}
                                        onClick={ () => {
                                            setVisibleEstudiante(true);
                                        } }
                                        error={inscripcionPrograma.error?.fkidestudiante}
                                        message={inscripcionPrograma.message?.fkidestudiante}
                                        readOnly
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR ESTUDIANTE"
                                    />
                                </div>
                                <div className="form-group col-5">
                                    <InputComponent
                                        label="Nro. Registro*"
                                        value={inscripcionPrograma.numeroregistro}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Periodo*"
                                        value={inscripcionPrograma.gestionperiodo}
                                        onClick={ () => {
                                            setVisibleGestionPeriodo(true);
                                        } }
                                        error={inscripcionPrograma.error?.fkidgestionperiodo}
                                        message={inscripcionPrograma.message?.fkidgestionperiodo}
                                        readOnly
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR PERIODO"
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <DatePickerComponent
                                        label="Fecha*"
                                        value={inscripcionPrograma.fechainscripcion}
                                        onChange={ (value) => props.setFechaInscripcion(inscripcionPrograma, value) }
                                        error={inscripcionPrograma.error.fechainscripcion}
                                        message={inscripcionPrograma.message.fechainscripcion}
                                        placeholder="SELECCIONAR FECHA"
                                    />
                                </div>
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
                                        value={inscripcionPrograma.esinscripcionformalizada}
                                        onChange={ (value) => props.setEsInscripcionFormalizada(inscripcionPrograma, value) }
                                        error={inscripcionPrograma.error.esinscripcionformalizada}
                                        message={inscripcionPrograma.message.esinscripcionformalizada}
                                        disabledDefault
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-12">
                                    <TextAreaComponent 
                                        label="Observaciones"
                                        value={inscripcionPrograma.nota}
                                        onChange={ (value) => props.setNota(inscripcionPrograma, value) }
                                        rows={2}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12'>
                                    <ButtonComponent
                                        fullWidth
                                        onClick={ () => props.onStore(inscripcionPrograma) }
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
    inscripcionPrograma: state.InscripcionPrograma,
    column: state.ColumnModule.columnInscripcionPrograma,
    list: state.PaginationModule.listInscripcionPrograma,
    page: state.PaginationModule.pageInscripcionPrograma,
    pagination: state.PaginationModule.paginationInscripcionPrograma,
    paginate: state.PaginationModule.paginateInscripcionPrograma,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onDelete: InscripcionProgramaActions.onDelete,
    onLimpiar: InscripcionProgramaActions.onLimpiar,
    onCreate: InscripcionProgramaActions.onCreate,
    onPage: InscripcionProgramaActions.onPageInscripcionPrograma,
    setFKIDPensum: InscripcionProgramaActions.setFKIDPensum,
    setFKIDEstudiante: InscripcionProgramaActions.setFKIDEstudiante,
    setFKIDGestionPeriodo: InscripcionProgramaActions.setFKIDGestionPeriodo,
    setFechaInscripcion: InscripcionProgramaActions.setFechaInscripcion,
    setEsInscripcionFormalizada: InscripcionProgramaActions.setEsInscripcionFormalizada,
    setNota: InscripcionProgramaActions.setNota,
    onStore: InscripcionProgramaActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateInscripcionPrograma );
