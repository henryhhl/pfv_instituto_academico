
import React from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import { EstadoData } from '../../../../data/estado.data';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { GrupoActions } from '../../../../redux/actions/ofertaacademica/grupo.action';
import FormDivisionAcademicaModal from './modal/form_divisionacademica.modal';
import ListadoDocenteModal from '../../persona/docente/modal/docente_listado.modal';
import ListadoPensumModal from '../../estructuraacademica/pensum/modal/pensum_listado.modal';
import ListadoTurnoModal from '../../estructurainstitucional/turno/modal/turno_listado.modal';
import ListadoGestionPeriodoModal from '../../estructurainstitucional/gestionperiodo/modal/gestionperiodo_listado.modal';
import FormHorarioGrupoModal from './modal/form_horario.modal';
import FormAddGrupoParametroCalificacionModal from './modal/form_add_parametrocalificacion.modal';

function EditGrupo( props ) {
    const { grupo } = props;
    const navigate = useNavigate();
    const params = useParams();

    const [ indexDetailsPensum, setIndexDestailsPensum ] = React.useState(-1);
    const [ visibleDetailsPensum, setVisibleDetailsPensum ] = React.useState(false);

    const [ indexDetailsDocente, setIndexDestailsDocente ] = React.useState(-1);
    const [ visibleDetailsDocente, setVisibleDetailsDocente ] = React.useState(false);

    const [ indexDetailsTurno, setIndexDestailsTurno ] = React.useState(-1);
    const [ visibleDetailsTurno, setVisibleDetailsTurno ] = React.useState(false);

    const [ indexDetailsGestionPeriodo, setIndexDestailsGestionPeriodo ] = React.useState(-1);
    const [ visibleDetailsGestionPeriodo, setVisibleDetailsGestionPeriodo ] = React.useState(false);

    const [ indexDetailsMateria, setIndexDestailsMateria ] = React.useState(-1);
    const [ visibleDetailsMateria, setVisibleDetailsMateria ] = React.useState(false);

    const [ indexDetailsHorario, setIndexDestailsHorario ] = React.useState(-1);
    const [ visibleDetailsHorario, setVisibleDetailsHorario ] = React.useState(false);

    const [ indexDetailsCalificacion, setIndexDetailsCalificacion ] = React.useState(-1);
    const [ visibleDetailsCalificacion, setVisibleDetailsCalificacion ] = React.useState(false);

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onEdit( params.idgrupo );
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

    const onComponentDetailsPensum = () => {
        if ( !visibleDetailsPensum ) return null;
        return (
            <ListadoPensumModal
                visible={visibleDetailsPensum}
                onClose={ () => setVisibleDetailsPensum(false) }
                onSelect={ (pensum) => {
                    let detalle = grupo.arraypensum[indexDetailsPensum];
                    detalle.fkidpensum = pensum.idpensum;
                    detalle.pensum = pensum.descripcion;

                    detalle.fkidunidadadministrativa = pensum.fkidunidadadministrativa;
                    detalle.unidadadministrativa = pensum.unidadadministrativa;

                    detalle.fkidunidadnegocio = pensum.fkidunidadnegocio;
                    detalle.unidadnegocio = pensum.unidadnegocio;

                    detalle.fkidunidadacademica = pensum.fkidunidadacademica;
                    detalle.unidadacademica = pensum.unidadacademica;

                    detalle.fkidprograma = pensum.fkidprograma;
                    detalle.programa = pensum.programa;

                    detalle.error.fkidpensum = false;
                    detalle.message.fkidpensum = "";

                    detalle.arraydivisionacademica = [ ...pensum.arraydivisionacademica ];
                    props.onChange(grupo);
                    setVisibleDetailsPensum(false);
                } }
                valueSelect={grupo.arraypensum[indexDetailsPensum]?.fkidpensum}
            />
        );
    };

    const onComponentDetailsDocente = () => {
        if ( !visibleDetailsDocente ) return null;
        return (
            <ListadoDocenteModal
                visible={visibleDetailsDocente}
                onClose={ () => setVisibleDetailsDocente(false) }
                onSelect={ (docente) => {
                    let detalle = grupo.arraypensum[indexDetailsDocente];

                    detalle.fkiddocente = docente.iddocente;
                    detalle.docente = `${docente.nombreprincipal} ${docente.nombreadicional} ${docente.apellidoprimero} ${docente.apellidosegundo}`;
                    detalle.error.fkiddocente = false;
                    detalle.message.fkiddocente = "";

                    props.onChange(grupo);
                    setVisibleDetailsDocente(false);
                } }
                valueSelect={grupo.arraypensum[indexDetailsDocente]?.fkiddocente}
            />
        );
    };

    const onComponentDetailsTurno = () => {
        if ( !visibleDetailsTurno ) return null;
        return (
            <ListadoTurnoModal
                visible={visibleDetailsTurno}
                onClose={ () => setVisibleDetailsTurno(false) }
                onSelect={ (turno) => {
                    let detalle = grupo.arraypensum[indexDetailsTurno];

                    detalle.fkidturno = turno.idturno;
                    detalle.turno = `${turno.descripcion}`;

                    detalle.error.fkidturno = false;
                    detalle.message.fkidturno = "";

                    props.onChange(grupo);
                    setVisibleDetailsTurno(false);
                } }
                valueSelect={grupo.arraypensum[indexDetailsTurno]?.fkidturno}
            />
        );
    };

    const onComponentDetailsGestionPeriodo = () => {
        if ( !visibleDetailsGestionPeriodo ) return null;
        return (
            <ListadoGestionPeriodoModal
                visible={visibleDetailsGestionPeriodo}
                onClose={ () => setVisibleDetailsGestionPeriodo(false) }
                onSelect={ (gestionPeriodo) => {
                    let detalle = grupo.arraypensum[indexDetailsGestionPeriodo];

                    detalle.fkidgestionperiodo = gestionPeriodo.idgestionperiodo;
                    detalle.gestionperiodo = `${gestionPeriodo.descripcion}`;

                    detalle.error.fkidgestionperiodo = false;
                    detalle.message.fkidgestionperiodo = "";

                    props.onChange(grupo);
                    setVisibleDetailsGestionPeriodo(false);
                } }
                valueSelect={grupo.arraypensum[indexDetailsGestionPeriodo]?.fkidgestionperiodo}
            />
        );
    };

    const existsMateria = ( idmateria ) => {
        for (let index = 0; index < grupo.arraypensum?.length; index++) {
            const element = grupo.arraypensum[index];
            if ( element.fkidmateria === idmateria ) return true;
        }
        return false;
    };

    const onComponentDetailsMateria = () => {
        if ( !visibleDetailsMateria ) return null;
        let detalle = grupo.arraypensum[indexDetailsMateria];
        return (
            <FormDivisionAcademicaModal
                visible={visibleDetailsMateria}
                onClose={ () => setVisibleDetailsMateria(false) }
                onSelect={ (item, details) => {
                    if ( !existsMateria( details.materia.idmateria ) ) {
                        detalle.fkiddivisionacademica = item.divisionacademica.iddivisionacademica;
                        detalle.divisionacademica = `${item.divisionacademica.descripcion}`;

                        detalle.fkidmateria = details.materia.idmateria;
                        detalle.materia = `${details.materia.nombrelargo}`;

                        detalle.error.fkidmateria = false;
                        detalle.message.fkidmateria = "";

                        detalle.error.fkiddivisionacademica = false;
                        detalle.message.fkiddivisionacademica = "";

                        props.onChange(grupo);
                        setVisibleDetailsMateria(false);
                    } else {
                        toastr.warning( 'Materia ya seleccionado.', '', { closeButton: true, progressBar: true, } );
                    }
                } }
                arraydivisionacademica={ detalle ? detalle.arraydivisionacademica : []}
            />
        );
    };

    const onComponentDetailsHorario = () => {
        if ( !visibleDetailsHorario ) return null;
        let detalle = grupo.arraypensum[indexDetailsHorario];
        return (
            <FormHorarioGrupoModal
                visible={visibleDetailsHorario}
                onClose={ () => setVisibleDetailsHorario(false) }
                onAsignar={ (data, index) => {
                    detalle.arraydia[index].arrayhorario = [ ...detalle.arraydia[index].arrayhorario, data ];
                    props.onChange(grupo);
                } }
                onChange={ () => {
                    props.onChange(grupo);
                } }
                arraydia={detalle ? detalle.arraydia: []}
                materia={ detalle ? detalle.materia : "" }
                docente={ detalle ? detalle.docente : "" }
            />
        );
    };

    const onComponentDetailsParametroCalificacion = () => {
        if ( !visibleDetailsCalificacion ) return null;
        return (
            <FormAddGrupoParametroCalificacionModal 
                visible={visibleDetailsCalificacion}
                onClose={ () => setVisibleDetailsCalificacion(false) }
                arrayparametrocalificacion={grupo.arraypensum[indexDetailsCalificacion]?.arrayparametrocalificacion}
                onChange={ () => props.onChange(grupo) }
                onAddRow={ () => {
                    if ( Array.isArray(grupo.arraypensum[indexDetailsCalificacion]?.arrayparametrocalificacion) ) {
                        grupo.arraypensum[indexDetailsCalificacion].arrayparametrocalificacion = [
                            ...grupo.arraypensum[indexDetailsCalificacion].arrayparametrocalificacion,
                            {
                                fkidparametrocalificacion: null,
                                parametrocalificacion: null,
                                valorporcentaje: null,
                            }
                        ];
                        props.onChange(grupo);
                    }
                } }
                onDeleteRow={ (index) => {
                    if ( Array.isArray(grupo.arraypensum[indexDetailsCalificacion]?.arrayparametrocalificacion) ) {
                        grupo.arraypensum[indexDetailsCalificacion].arrayparametrocalificacion = grupo.arraypensum[indexDetailsCalificacion].arrayparametrocalificacion
                        .filter( 
                            (item, pos) => pos !== index 
                        );
                        props.onChange(grupo)
                    }
                } }
            />
        );
    };

    return (
        <>
            { onComponentDetailsPensum() }
            { onComponentDetailsDocente() }
            { onComponentDetailsTurno() }
            { onComponentDetailsGestionPeriodo() }
            { onComponentDetailsMateria() }
            { onComponentDetailsHorario() }
            { onComponentDetailsParametroCalificacion() }
            <PaperComponent>
                <CardComponent
                    header={"Editar Grupo"}
                >
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active show" id="home-tab" 
                                data-toggle="tab" href="#home" role="tab" 
                                aria-controls="home" aria-selected="true"
                            >
                                Información General
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="materiapensum-tab" data-toggle="tab" href="#materiapensum" 
                                role="tab" aria-controls="materiapensum" aria-selected="false"
                            >
                                Asignar Materias de Pensum
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade pt-4 active show" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="row">
                                <div className="form-group col-2"></div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Grupo*"
                                        value={grupo.sigla}
                                        onChange={ (value) => props.setSigla(grupo, value) }
                                        error={grupo.error.sigla}
                                        message={grupo.message.sigla}
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <SelectComponent 
                                        data={EstadoData}
                                        label={"Estado*"}
                                        value={grupo.estado}
                                        onChange={ (value) => props.setEstado(grupo, value) }
                                        error={grupo.error.estado}
                                        message={grupo.message.estado}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className='form-group col-12'>
                                    <ButtonComponent
                                        onClick={ () => props.onUpdate(grupo, onBack) }
                                    >
                                        Editar
                                    </ButtonComponent>
                                    <ButtonComponent
                                        type='danger' onClick={onBack}
                                    >
                                        Cancelar
                                    </ButtonComponent>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade pt-4 active" id="materiapensum" role="tabpanel" aria-labelledby="materiapensum-tab">
                            <div className="row">
                                <div className="form-group col-12">
                                    <ButtonComponent
                                        fullWidth
                                        onClick={props.onAddRowPensum}
                                    >
                                        Agregar
                                    </ButtonComponent>
                                </div>
                            </div>
                            { grupo.arraypensum?.length === 0 &&
                                <div className='card p-0 m-0'>
                                    <div className='card-header'>
                                        <h4>Sin Información</h4>
                                    </div>
                                </div>
                            }
                            <div style={{ minWidth: '100%', width: '100%', maxWidth: '100%', maxHeight: 650, overflowY: 'auto', overflowX: 'hidden', }}>
                                <div className="row">
                                    { grupo.arraypensum?.map( ( item, key ) => {
                                        return (
                                            <div className="col-12 col-sm-6 col-md-12 col-lg-12" key={key}>
                                                <div className="card card-primary position-relative">
                                                    <i className="card-icon text-danger ion ion-ios-paper-outline"
                                                        style={ { position: 'absolute', left: 4, top: 8, fontSize: 20, } }
                                                    ></i>
                                                    <div className="card-options dropdown">
                                                        <CloseOutlined
                                                            style={ {
                                                                padding: 4, borderRadius: 50, background: 'white', 
                                                                fontSize: 12, fontWeight: 'bold', boxShadow: '0 0 5px 0 #222',
                                                                position: 'absolute', top: 8, right: 4, cursor: 'pointer',
                                                            } }
                                                            onClick={() => {
                                                                props.onDeleteRowPensum(key);
                                                            } }
                                                        />
                                                    </div>
                                                    <div className="card-body pl-1 pr-1 mt-2">
                                                        <div className='row'>
                                                            <div className="form-group col-4">
                                                                <InputComponent
                                                                    label="Unidad Administrativa"
                                                                    value={item.unidadadministrativa}
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div className="form-group col-2">
                                                                <InputComponent
                                                                    label="Unidad Negocio"
                                                                    value={item.unidadnegocio}
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div className="form-group col-6">
                                                                <InputComponent
                                                                    label="Unidad Academica"
                                                                    value={item.unidadacademica}
                                                                    readOnly
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className="form-group col-6">
                                                                <InputComponent
                                                                    label="Programa"
                                                                    value={item.programa}
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div className="form-group col-6">
                                                                <InputComponent
                                                                    label="Pensum*"
                                                                    value={item.pensum}
                                                                    onClick={ () => {
                                                                        setIndexDestailsPensum(key);
                                                                        setVisibleDetailsPensum(true);
                                                                    } }
                                                                    error={item.error?.fkidpensum}
                                                                    message={item.message?.fkidpensum}
                                                                    readOnly
                                                                    style={{ background: 'white', cursor: 'pointer', }}
                                                                    placeholder="SELECCIONAR PENSUM"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className="form-group col-6">
                                                                { item.fkidpensum === null ? 
                                                                    <InputComponent
                                                                        label="Docente*"
                                                                        value={item.docente}
                                                                        readOnly
                                                                    /> : 
                                                                    <InputComponent
                                                                        label="Docente*"
                                                                        value={item.docente}
                                                                        onClick={ () => {
                                                                            setIndexDestailsDocente(key);
                                                                            setVisibleDetailsDocente(true);
                                                                        } }
                                                                        error={item.error?.fkiddocente}
                                                                        message={item.message?.fkiddocente}
                                                                        readOnly
                                                                        style={{ background: 'white', cursor: 'pointer', }}
                                                                        placeholder="SELECCIONAR DOCENTE"
                                                                    />
                                                                }
                                                            </div>
                                                            <div className="form-group col-3">
                                                                { item.fkidpensum === null ? 
                                                                    <InputComponent
                                                                        label="Turno*"
                                                                        value={item.turno}
                                                                        readOnly
                                                                    /> : 
                                                                    <InputComponent
                                                                        label="Turno*"
                                                                        value={item.turno}
                                                                        onClick={ () => {
                                                                            setIndexDestailsTurno(key);
                                                                            setVisibleDetailsTurno(true);
                                                                        } }
                                                                        error={item.error?.fkidturno}
                                                                        message={item.message?.fkidturno}
                                                                        readOnly
                                                                        style={{ background: 'white', cursor: 'pointer', }}
                                                                        placeholder="SELECCIONAR TURNO"
                                                                    />
                                                                }
                                                            </div>
                                                            <div className="form-group col-3">
                                                                { item.fkidpensum === null ? 
                                                                    <InputComponent
                                                                        label="Periodo*"
                                                                        value={item.gestionperiodo}
                                                                        readOnly
                                                                    /> : 
                                                                    <InputComponent
                                                                        label="Periodo*"
                                                                        value={item.gestionperiodo}
                                                                        onClick={ () => {
                                                                            setIndexDestailsGestionPeriodo(key);
                                                                            setVisibleDetailsGestionPeriodo(true);
                                                                        } }
                                                                        error={item.error?.fkidgestionperiodo}
                                                                        message={item.message?.fkidgestionperiodo}
                                                                        readOnly
                                                                        style={{ background: 'white', cursor: 'pointer', }}
                                                                        placeholder="SELECCIONAR PERIODO"
                                                                    />
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className="form-group col-6">
                                                                { (item.fkidpensum === null) ? 
                                                                    <InputComponent
                                                                        label="Materia*"
                                                                        value={item.materia}
                                                                        readOnly
                                                                    /> : 
                                                                    <InputComponent
                                                                        label="Materia*"
                                                                        value={item.materia}
                                                                        onClick={ () => {
                                                                            setIndexDestailsMateria(key);
                                                                            setVisibleDetailsMateria(true);
                                                                        } }
                                                                        readOnly
                                                                        error={item.error?.fkidmateria}
                                                                        message={item.message?.fkidmateria}
                                                                        style={{ background: 'white', cursor: 'pointer', }}
                                                                        placeholder="SELECCIONAR MATERIA"
                                                                    />
                                                                }
                                                            </div>
                                                            <div className="form-group col-3">
                                                                <InputComponent
                                                                    label="Nivel*"
                                                                    value={item.divisionacademica}
                                                                    readOnly
                                                                /> 
                                                            </div>
                                                            <div className="form-group col-3">
                                                                <InputComponent
                                                                    label="Cupo Máximo*"
                                                                    value={item.cupomaximo}
                                                                    onChange={ (value) => {
                                                                        if ( !isNaN( value ) || value === "" ) {
                                                                            if ( parseInt( value ) >= 0 ) {
                                                                                item.cupomaximo = parseInt(value);
                                                                                item.error.cupomaximo = false;
                                                                                item.message.cupomaximo = "";
                                                                                props.onChange(grupo);
                                                                            }
                                                                        }
                                                                    } }
                                                                    error={item.error?.cupomaximo}
                                                                    message={item.message?.cupomaximo}
                                                                    readOnly={ (item.fkidpensum === null) }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className="form-group col-12">
                                                                <ButtonComponent
                                                                    onClick={ () => {
                                                                        if ( item.fkidpensum !== null ) {
                                                                            setVisibleDetailsHorario(true);
                                                                            setIndexDestailsHorario(key);
                                                                        } else {
                                                                            toastr.warning( 'Pensum No Seleccionado.', '' );
                                                                        }
                                                                    } }
                                                                    disabled={ (item.fkidpensum === null) }
                                                                >
                                                                    Asignar Horarios
                                                                </ButtonComponent>
                                                                <ButtonComponent
                                                                    onClick={ () => {
                                                                        if ( item.fkidpensum !== null ) {
                                                                            setVisibleDetailsCalificacion(true);
                                                                            setIndexDetailsCalificacion(key);
                                                                        } else {
                                                                            toastr.warning( 'Pensum No Seleccionado.', '' );
                                                                        }
                                                                    } }
                                                                    disabled={ (item.fkidpensum === null) }
                                                                >
                                                                    Asignar Calificaciones
                                                                </ButtonComponent>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    } ) }
                                </div>
                            </div>
                            <div className="row">
                                <div className='form-group col-12'>
                                    <ButtonComponent
                                        onClick={ () => props.onUpdate(grupo, onBack) }
                                    >
                                        Editar
                                    </ButtonComponent>
                                    <ButtonComponent
                                        type='danger' onClick={onBack}
                                    >
                                        Cancelar
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
    grupo: state.Grupo,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onEdit: GrupoActions.onEdit,
    onLimpiar: GrupoActions.onLimpiar,
    onChange: GrupoActions.onChange,
    setSigla: GrupoActions.setSigla,
    setEstado: GrupoActions.setEstado,
    onAddRowPensum: GrupoActions.onAddRowPensum,
    onDeleteRowPensum: GrupoActions.onDeleteRowPensum,
    onUpdate: GrupoActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditGrupo );
