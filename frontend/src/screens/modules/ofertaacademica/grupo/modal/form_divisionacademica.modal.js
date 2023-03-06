
import React from 'react';
import toastr from 'toastr';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import ModalComponent from '../../../../../components/modal';
import ButtonComponent from '../../../../../components/button';

export default function FormDivisionAcademicaModal( props ) {
    return (
        <>
            <ModalComponent
                visible={props.visible}
                onClose={props.onClose}
                footer={null} width={'90%'}
                title={"ASIGNAR MATERIA"}
                style={{ top: 20, }}
            >
                <div className="card">
                    <div className="card-body pb-0">
                        <div className="row">
                            { props.arraydivisionacademica?.map( ( item, key ) => {
                                const last = props.arraydivisionacademica.length - 1 - key;
                                const arrayMateria = props.arraydivisionacademica[last].arraymateria;
                                const element = props.arraydivisionacademica[last];
                                return (
                                    <div className="col-12" key={key}>
                                        <div className="card card-sm position-relative card-success">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="form-group col-1 d-flex justify-content-center align-content-end">
                                                        <div
                                                            style={ {
                                                                width: 20, writingMode: 'vertical-lr',
                                                                transform: 'rotate(180deg)',
                                                                fontSize: 15,
                                                            } }
                                                        >
                                                            { element.divisionacademica.descripcion }
                                                        </div>
                                                    </div>
                                                    <div className="form-group col-11">
                                                        <div className="row">
                                                            <div className='col-12'>
                                                                <div style={{ maxHeight: 300, width: '100%', overflowY: 'hidden', overflowX: 'auto', whiteSpace: 'nowrap', }}>
                                                                    { arrayMateria.map( (detalle, index) => {
                                                                        return (
                                                                            <div className="card p-2 card-primary mr-2" 
                                                                                key={index} 
                                                                                style={{ 
                                                                                    width: 240, display: 'inline-block', 
                                                                                    cursor: 'pointer', border: '2px solid #574B90',
                                                                                }}
                                                                                onClick={ () => props.onSelect(element, detalle) }
                                                                            >
                                                                                <div className="card-header pb-2">
                                                                                    <h4 className='text-primary'> 
                                                                                        {" "} 
                                                                                    </h4>
                                                                                </div>
                                                                                <div className="card-header pt-2 pb-2 border-success">
                                                                                    <h4 style={{ display: 'block', whiteSpace: 'initial', fontSize: 9, }}> 
                                                                                        <span className='text-danger'>TIPO MATERIA: </span>
                                                                                        {detalle.tipomateria.descripcion} 
                                                                                    </h4>
                                                                                </div>
                                                                                <div className="card-header pt-2 pb-2 border-success">
                                                                                    <h4 style={{ display: 'block', whiteSpace: 'initial', fontSize: 9, }}> 
                                                                                        <span className='text-danger'>CÓDIGO: </span>
                                                                                        {detalle.materia.codigo} 
                                                                                    </h4>
                                                                                </div>
                                                                                <div className="card-header pt-2 pb-2 border-success">
                                                                                    <h4 style={{ display: 'block', whiteSpace: 'initial', fontSize: 9, }}> 
                                                                                        <span className='text-danger'>SIGLA: </span>
                                                                                        {detalle.materia.sigla} 
                                                                                    </h4>
                                                                                </div>
                                                                                <div className="card-header pt-2 pb-2">
                                                                                    <h4 style={{ display: 'block', whiteSpace: 'initial', fontSize: 9, }}> 
                                                                                        <span className='text-danger'>MATERIA: </span>
                                                                                        {detalle.materia.nombrelargo} 
                                                                                    </h4>
                                                                                </div>
                                                                                <div className="card-header pt-2 pb-2">
                                                                                    <h4 style={{ display: 'block', whiteSpace: 'initial', fontSize: 9, }}> 
                                                                                        <span className='float-left'>
                                                                                            <span className='text-danger'>NOTA MIN.: </span>
                                                                                            {detalle.notaminima} 
                                                                                        </span>
                                                                                        <span className='float-right'>
                                                                                            <span className='text-danger'>NOTA MAX.: </span>
                                                                                            {detalle.notamaxima} 
                                                                                        </span>
                                                                                    </h4>
                                                                                </div>
                                                                                <div className="card-header pt-2 pb-2">
                                                                                    <h4 style={{ display: 'block', whiteSpace: 'initial', fontSize: 9, }}> 
                                                                                        <span className='float-left'>
                                                                                            <span className='text-danger'>H. T.: </span>
                                                                                            {detalle.horateorica} 
                                                                                        </span>
                                                                                        <span className='float-right'>
                                                                                            <span className='text-danger'>H. P.: </span>
                                                                                            {detalle.horapractica} 
                                                                                        </span>
                                                                                    </h4>
                                                                                </div>
                                                                                <div className="card-header pt-2 pb-2">
                                                                                    <h4 style={{ display: 'block', whiteSpace: 'initial', fontSize: 9, }}> 
                                                                                        <span className='float-left'>
                                                                                            <span className='text-danger'>H. S.: </span>
                                                                                            {detalle.horasociales} 
                                                                                        </span>
                                                                                        <span className='float-right'>
                                                                                            <span className='text-danger'>CUPO.: </span>
                                                                                            {detalle.cuporequerido} 
                                                                                        </span>
                                                                                    </h4>
                                                                                </div>
                                                                            </div>
                                                                        ); 
                                                                    } ) }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            } ) }
                        </div>
                    </div>
                </div>
            </ModalComponent>
        </>
    );
};

FormDivisionAcademicaModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onSelect: PropTypes.func,
    arraydivisionacademica: PropTypes.array,
};

FormDivisionAcademicaModal.defaultProps = {
    visible: false,
    onSelect: () => {},
    arraydivisionacademica: [],
};
