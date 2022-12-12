
import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ModalComponent from '../../../../../components/modal';
import ButtonComponent from '../../../../../components/button';
import { Functions } from '../../../../../utils/functions';
import FormAddAulaHorarioModal from './form_add_aulahorario.modal';
import '../../../../../public/css/horario.css';

const getListStyle = isDraggingOver => ( {
    background: isDraggingOver ? "rgba(255, 235, 230)" : "transparent",
} );

const getItemStyle = (isDragging, draggableStyle) => ( {
    userSelect: "none",
    margin: `0 0 8px 0`,
    background: isDragging ? "rgba(255, 250, 230)" : "white",
    ...draggableStyle
} );

export default function FormHorarioGrupoModal( props ) {

    const [ visibleHorarioAula, setVisibleHorarioAula ] = React.useState(false);
    const [ indexDetailsHorarioAula, setIndexDetailsHorarioAula ] = React.useState(-1);

    const onComponentFormAddAulaHorario = () => {
        if ( !visibleHorarioAula ) return null;
        let detalle = props.arraydia[indexDetailsHorarioAula];
        return (
            <FormAddAulaHorarioModal
                visible={visibleHorarioAula}
                onClose={ () => setVisibleHorarioAula(false) }
                onAsignar={ (data) => {
                    const obj = {
                        horainicio: data.horainicio,
                        horafinal: data.horafinal,
                        aula: data.aula,
                        dia: detalle.descripcion,
                        coddia: detalle.codigo,
                    };
                    props.onAsignar(obj, indexDetailsHorarioAula);
                    setVisibleHorarioAula(false);
                } }
                arrayhorario={detalle.arrayhorario}
            />
        );
    };

    return (
        <ModalComponent
            visible={props.visible}
            onClose={props.onClose}
            footer={null} width={'98%'}
            title={"ASIGNAR HORARIO"}
            style={{ top: 20, }}
        >
            { onComponentFormAddAulaHorario() }
            <div className="row">
                <div className='col-12'>
                    <div className='card p-0 m-0'>
                        <div className='card-header'>
                            <h4> 
                                <span className='text-danger'>MATERIA: </span>
                                {props.materia && props.materia} 
                            </h4>
                        </div>
                    </div>
                </div>
                {/* <div className='col-12'>
                    <div className='card p-0 m-0'>
                        <div className='card-header'>
                            <h4> 
                                <span className='text-danger'>DOCENTE: </span>
                                {props.docente && props.docente} 
                            </h4>
                        </div>
                    </div>
                </div> */}
                <div className="col-12">
                    <div className='w-100 p-1' 
                        style={{ 
                            overflowY: 'hidden', overflowX: 'auto', 
                            whiteSpace: 'nowrap', backgroundColor: 'rgb(76, 154, 255)', 
                        }}
                    >
                        <div>
                            { props.arraydia?.map( (item, key) => {
                                return (
                                    <div className='d-inline-block' style={{ width: 200, }} key={key}>
                                        <div className='card card-danger mr-1 mb-1'>
                                            <div className="card-header pt-0 pb-0">
                                                <h4> { item.descripcion } </h4>
                                            </div>
                                        </div>
                                    </div>
                                );
                            } ) }
                        </div>
                        <div>
                            { props.arraydia?.map( (item, key) => {
                                return (
                                    <div className='d-inline-block' style={{ width: 200, }} key={key}>
                                        <div className="card card-primary mr-1 pb-0" 
                                            style={ {  backgroundColor: '#ececec', } }
                                        >
                                            <div className='card-body p-1'></div>
                                            <DragDropContext>
                                                <Droppable droppableId={`asignar_aula_grupo-${key}`}>
                                                    {( provided, snapshot ) => (
                                                        <div className="card-body p-2" {...provided.droppableProps} ref={provided.innerRef}
                                                            style={ getListStyle(snapshot.isDraggingOver) }
                                                        >
                                                            { item.arrayhorario?.map( (detalle, index) => {
                                                                return (
                                                                    <Draggable key={index} draggableId={`details-${index.toString()}`} index={index}>
                                                                        { ( provided, snapshot ) => (
                                                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} 
                                                                                className="card card-info mb-2 pt-1 pb-1 height_100"
                                                                                style={ getItemStyle(
                                                                                    snapshot.isDragging,
                                                                                    provided.draggableProps.style
                                                                                ) }
                                                                            >
                                                                                <div className='w-100 h-100 position-relative'>
                                                                                    <div className='card-header p-0'>
                                                                                        <div className="card-header pt-0 pb-0">
                                                                                            <h4 style={{ display: 'flex', fontSize: 9, justifyContent: 'space-between', }}> 
                                                                                                <span className='text-danger'>HORA INICIO: </span>
                                                                                                {detalle.horainicio} 
                                                                                            </h4>
                                                                                        </div>
                                                                                        <div className="card-header pt-0 pb-0">
                                                                                            <h4 style={{ display: 'flex', fontSize: 9, justifyContent: 'space-between', marginTop: -5, }}> 
                                                                                                <span className='text-danger'>HORA FINAL: </span>
                                                                                                {detalle.horafinal} 
                                                                                            </h4>
                                                                                        </div>
                                                                                        <div className="card-header pt-0 pb-0">
                                                                                            <h4 style={{ display: 'flex', fontSize: 9, justifyContent: 'space-between', marginTop: -5, }}> 
                                                                                                <span className='text-danger'>AULA: </span>
                                                                                                {detalle.aula.descripcion} 
                                                                                            </h4>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='card-footer p-0 pr-1 position-absolute' 
                                                                                        style={{ fontSize: 8, bottom: -3, right: 8 }}
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
                                            <div className='card-footer pl-1 pr-1' style={{ height: 45 }}>
                                                <ButtonComponent
                                                    fullWidth
                                                    onClick={ () => {
                                                        setIndexDetailsHorarioAula(key);
                                                        setVisibleHorarioAula(true);
                                                    } }
                                                >
                                                    Agregar Horario y Aula
                                                </ButtonComponent>
                                            </div>
                                        </div>
                                    </div>
                                );
                            } ) }
                        </div>
                    </div>
                </div>
            </div>
        </ModalComponent>
    );
};

FormHorarioGrupoModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onAsignar: PropTypes.func,
    arraydia: PropTypes.array,
    materia: PropTypes.string,
    docente: PropTypes.string,
};

FormHorarioGrupoModal.defaultProps = {
    visible: false,
    onAsignar: () => {},
    arraydia: [],
    materia: "",
    docente: "",
};
