
import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Functions } from '../../../../../utils/functions';
import ModalComponent from '../../../../../components/modal';

export default function FormHorarioGrupoModal( props ) {

    return (
        <ModalComponent
            visible={props.visible}
            onClose={props.onClose}
            footer={null} width={'98%'}
            title={"ASIGNAR HORARIO"}
            style={{ top: 20, }}
        >
            <div className="row">
                <div className="col-12">
                    <div className='w-100 p-1' 
                        style={{ 
                            overflowY: 'hidden', overflowX: 'auto', 
                            whiteSpace: 'nowrap', backgroundColor: 'rgb(76, 154, 255)', 
                        }}
                    >
                        <div>
                            <div style={{ width: 180, display: 'inline-block', }}>
                                <div className='card card-danger mr-1 mb-1'>
                                    <div className="card-header pt-0 pb-0">
                                        <h4> Horario </h4>
                                    </div>
                                </div>
                            </div>
                            { Functions.onDefaultDays().map( (item, key) => {
                                return (
                                    <div style={{ width: 200, display: 'inline-block', }} key={key}>
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
                            <div style={{ width: 180, display: 'inline-block', }}>
                                <div className="card card-primary mr-2 pb-0" style={{ backgroundColor: '#ececec' }}>
                                    
                                </div>
                            </div>
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
    onSelect: PropTypes.func,
    arraydivisionacademica: PropTypes.array,
};

FormHorarioGrupoModal.defaultProps = {
    visible: false,
    onSelect: () => {},
    arraydivisionacademica: [],
};
