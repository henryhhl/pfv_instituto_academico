
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CardComponent from '../../../../components/card';
import InputComponent from '../../../../components/input';
import PaperComponent from '../../../../components/paper';
import ButtonComponent from '../../../../components/button';
import ListadoCursoModal from '../curso/modal/curso_listado.modal';
import FormCursoHorarioModal from '../curso/modal/form_horario.modal';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { CursoHorarioActions } from '../../../../redux/actions/ofertaacademica/curso_horario.action';
import '../../../../public/css/horario.css';

const getListStyle = isDraggingOver => ( {
    background: isDraggingOver ? "rgba(255, 235, 230)" : "transparent",
} );

const getItemStyle = (isDragging, draggableStyle) => ( {
    userSelect: "none",
    margin: `0 0 8px 0`,
    background: isDragging ? "rgba(255, 250, 230)" : "white",
    ...draggableStyle
} );
 
function IndexCursoHorario(props) {
    const { cursoHorario } = props;
    const navigate = useNavigate();
    const [ visibleCurso, setVisibleCurso ] = React.useState(false);
    const [ visibleFormHorario, setVisibleFormHorario ] = React.useState(false);

  function handleOnDragEnd(result) {
    if ( !result.destination ) return;

    const items = Array.from(cursoHorario.arrayhorario);
    const [ reorderedItem ] = items.splice( result.source.index, 1 );
    items.splice( result.destination.index, 0, reorderedItem );
    cursoHorario.arrayhorario = [ ...items ];
    props.onChange(cursoHorario);
  }

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            // if ( item?.resp === 1 ) {
            //     props.onPageGestionPeriodo();
            // }
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
                    props.setFKIDCurso(cursoHorario, curso);
                    setVisibleCurso(false);
                } }
            />
        );
    };

    const onComponentFormHorario = () => {
        if ( !visibleFormHorario ) return null;
        return (
            <FormCursoHorarioModal
                visible={visibleFormHorario}
                onClose={ () => setVisibleFormHorario(false) }
                onOk={ (data) => {
                    props.onAddRowHorario(data);
                    setVisibleFormHorario(false);
                } }
                arrayhorario={cursoHorario.arrayhorario}
            />
        );
    };

    return (
        <>
            { onComponentCurso() }
            { onComponentFormHorario() }
            <PaperComponent
                title={"Horario Para Los Cursos"}
            >
                <CardComponent>
                    <div className="row">
                        <div className="form-group col-2"></div>
                        <div className="form-group col-8">
                            <InputComponent
                                label="Curso*"
                                value={cursoHorario.curso}
                                onClick={ () => setVisibleCurso(true) }
                                error={cursoHorario.error.fkidcurso}
                                message={cursoHorario.message.fkidcurso}
                                style={{ background: 'white', cursor: 'pointer', }}
                                placeholder="SELECCIONAR CURSO"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-2"></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Fecha Inicio"
                                value={cursoHorario.fechainicio}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Fecha Final"
                                value={cursoHorario.fechafinal}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <InputComponent
                                label="Materia"
                                value={cursoHorario.materia}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Turno"
                                value={cursoHorario.turno}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Modalidad"
                                value={cursoHorario.modalidadacademica}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='w-100 p-2' style={{ overflowY: 'hidden', overflowX: 'auto', whiteSpace: 'nowrap', backgroundColor: 'rgb(76, 154, 255)', }}>
                        <div>
                            <div style={{ width: 180, display: 'inline-block', }}>
                                <div className='card card-danger mr-2 mb-1'>
                                    <div className="card-header pt-0 pb-0">
                                        <h4> Horario </h4>
                                    </div>
                                </div>
                            </div>
                            { cursoHorario.arraydias.map( (item, key) => {
                                return (
                                    <div style={{ width: 180, display: 'inline-block', }} key={key}>
                                        <div className='card card-danger mr-2 mb-1'>
                                            <div className="card-header pt-0 pb-0">
                                                <h4> { item.descripcion } </h4>
                                            </div>
                                        </div>
                                    </div>
                                );
                            } ) }
                        </div>
                        <div>
                            <div style={{ width: 180, display: 'inline-block', }}>
                                <div className="card card-primary mr-2 pb-0" style={{ backgroundColor: '#ececec' }}>
                                    <DragDropContext onDragEnd={handleOnDragEnd}>
                                        <Droppable droppableId="asignar_horario_curso">
                                            { ( provided, snapshot ) => (
                                                <div className="card-body p-2" {...provided.droppableProps} ref={provided.innerRef}
                                                    style={ getListStyle(snapshot.isDraggingOver) }
                                                >
                                                    { cursoHorario.arrayhorario.map( (item, index) => {
                                                        return (
                                                            <Draggable key={index} draggableId={`item-${index.toString()}`} index={index}>
                                                                { ( provided, snapshot ) => (
                                                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} 
                                                                        className="card card-info mb-2 pt-3 pb-3 height_100"
                                                                        style={ getItemStyle(
                                                                            snapshot.isDragging,
                                                                            provided.draggableProps.style
                                                                        ) }
                                                                    >
                                                                        <div className='w-100 h-100 position-relative  d-flex justify-content-center align-items-center'>
                                                                            <CloseOutlined
                                                                                    style={ {
                                                                                        padding: 4, borderRadius: 50, background: 'white', 
                                                                                        fontSize: 12, fontWeight: 'bold', boxShadow: '0 0 5px 0 #222',
                                                                                        position: 'absolute', top: -6, right: 8, cursor: 'pointer',
                                                                                    } }
                                                                                    onClick={ () => {
                                                                                        props.onDeleteRowHorario(index);
                                                                                    } }
                                                                                />
                                                                            <div className='card-header p-0 text-center'>
                                                                                <h4> { `${item.horainicio} - ${item.horafinal}` } </h4>
                                                                            </div>
                                                                            <div className='card-footer p-0 pr-1 position-absolute' 
                                                                                style={{ fontSize: 8, bottom: -10, right: 8 }}
                                                                            >
                                                                                Nro. {index + 1}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) }
                                                            </Draggable>
                                                        );
                                                    } ) }
                                                    { provided.placeholder }
                                                </div>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
                                    <div className='card-footer' style={{ height: 45 }}>
                                        <ButtonComponent
                                            fullWidth
                                            onClick={ () => {
                                                if ( cursoHorario.fkidcurso === "" ) return;
                                                setVisibleFormHorario(true);
                                            } }
                                            disabled={ cursoHorario.fkidcurso === "" }
                                        >
                                            Agregar Horario
                                        </ButtonComponent>
                                    </div>
                                </div>
                            </div>
                            { cursoHorario.arraydias.map( (item, key) => {
                                return (
                                    <div style={{ width: 180, display: 'inline-block', }} key={key}>
                                        <div className="card card-primary mr-2 pb-0" 
                                            style={{ 
                                                backgroundColor: '#ececec',
                                            }}
                                        >
                                            <DragDropContext>
                                                <Droppable droppableId="asignar_aula_curso">
                                                    {( provided, snapshot ) => (
                                                        <div className="card-body p-2" {...provided.droppableProps} ref={provided.innerRef}
                                                            style={ getListStyle(snapshot.isDraggingOver) }
                                                        >
                                                            { cursoHorario.arrayhorario.map( (item, index) => {
                                                                return (
                                                                    <Draggable key={index} draggableId={`details-${index.toString()}`} index={index}>
                                                                        { ( provided, snapshot ) => (
                                                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} 
                                                                                className="card card-info mb-2 pt-3 pb-3 height_100"
                                                                                style={ getItemStyle(
                                                                                    snapshot.isDragging,
                                                                                    provided.draggableProps.style
                                                                                ) }
                                                                            >
                                                                                <div className='w-100 h-100 position-relative  d-flex justify-content-center align-items-center'>
                                                                                    <div className='card-header p-0 text-center'>
                                                                                        <h4> { `12` } </h4>
                                                                                        <h4> { `12` } </h4>
                                                                                        <h4> { `12` } </h4>
                                                                                        <h4> { `12` } </h4>
                                                                                    </div>
                                                                                    <div className='card-footer p-0 pr-1 position-absolute' 
                                                                                        style={{ fontSize: 8, bottom: -10, right: 8 }}
                                                                                    >
                                                                                        Nro. {index + 1}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ) }
                                                                    </Draggable>
                                                                );
                                                            } ) }
                                                            { provided.placeholder }
                                                        </div>
                                                    ) }
                                                </Droppable>
                                            </DragDropContext>
                                            <div className='card-footer' style={{ height: 45 }}></div>
                                        </div>
                                    </div>
                                );
                            } ) }
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
    cursoHorario: state.CursoHorario,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onLimpiar: CursoHorarioActions.onLimpiar,
    onChange: CursoHorarioActions.onChange,
    onAddRowHorario: CursoHorarioActions.onAddRowHorario,
    onDeleteRowHorario: CursoHorarioActions.onDeleteRowHorario,
    setFKIDCurso: CursoHorarioActions.setFKIDCurso,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexCursoHorario);
