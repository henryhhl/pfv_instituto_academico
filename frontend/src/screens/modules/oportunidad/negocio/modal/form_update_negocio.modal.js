
import React from 'react';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import apiServices from '../../../../../utils/apiservices';
import ModalComponent from '../../../../../components/modal';
import { httpRequest } from '../../../../../utils/httpRequest';
import { NegocioActions } from '../../../../../redux/actions/oportunidad/negocio.action';
import ListadoProgramaModal from '../../../estructuraacademica/programa/modal/programa_listado.modal';
import ListadoTurnoModal from '../../../estructurainstitucional/turno/modal/turno_listado.modal';
import ListadoEstadoNegocioModal from '../../estadonegocio/modal/estadonegocio_listado.modal';
import InputComponent from '../../../../../components/input';
import DatePickerComponent from '../../../../../components/date';
import TextAreaComponent from '../../../../../components/textarea';
import ButtonComponent from '../../../../../components/button';

const FormUpdateNegocioModal = ( props ) => {
    const { negocio } = props;
    
    const [ visiblePrograma, setVisiblePrograma ] = React.useState(false);
    const [ visibleTurno, setVisibleTurno ] = React.useState(false);
    const [ visibleEstadoNegocio, setVisibleEstadoNegocio ] = React.useState(false);

    React.useEffect( () => {
        init_data();
        return () => {};
    }, [] );

    const init_data = () => {
        props.onLimpiar();
        props.onEdit( props.idnegocio );
    };

    const onComponentPrograma = () => {
        if ( !visiblePrograma ) return null;
        return (
            <ListadoProgramaModal
                visible={visiblePrograma}
                onClose={ () => setVisiblePrograma(false) }
                onSelect={ (programa) => {
                    props.setFKIDPrograma(negocio, programa);
                    setVisiblePrograma(false);
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
                    props.setFKIDTurno(negocio, turno);
                    setVisibleTurno(false);
                } }
            />
        );
    };

    const onComponentEstadoNegocio = () => {
        if ( !visibleEstadoNegocio ) return null;
        return (
            <ListadoEstadoNegocioModal
                visible={visibleEstadoNegocio}
                onClose={ () => setVisibleEstadoNegocio(false) }
                onSelect={ (estadoNegocio) => {
                    props.setFKIDEstadoNegocio(negocio, estadoNegocio);
                    setVisibleEstadoNegocio(false);
                } }
            />
        );
    };

    return (
        <>
            <ModalComponent
                visible={props.visible}
                onClose={props.onClose}
                footer={null} width={500}
                title={"EDITAR NEGOCIO"}
                centered
            >
                { onComponentPrograma() }
                { onComponentTurno() }
                { onComponentEstadoNegocio() }
                <div className='card'>
                    <div className='card-body'>
                        <div className="row">
                            <div className="form-group col-12">
                                <InputComponent
                                    label="Nombre Negocio*"
                                    value={negocio.descripcion}
                                    readOnly
                                />
                            </div>
                            <div className="form-group col-12">
                                <InputComponent
                                    label="Programa*"
                                    value={negocio.programa}
                                    onClick={ () => setVisiblePrograma(true) }
                                    error={negocio.error.fkidprograma}
                                    message={negocio.message.fkidprograma}
                                    readOnly
                                    style={{ background: 'white', cursor: 'pointer', }}
                                    placeholder="SELECCIONAR PROGRAMA"
                                />
                            </div>
                            <div className="form-group col-12">
                                <InputComponent
                                    label="Turno*"
                                    value={negocio.turno}
                                    onClick={ () => setVisibleTurno(true) }
                                    error={negocio.error.fkidturno}
                                    message={negocio.message.fkidturno}
                                    readOnly
                                    style={{ background: 'white', cursor: 'pointer', }}
                                    placeholder="SELECCIONAR TURNO"
                                />
                            </div>
                            <div className="form-group col-12">
                                <InputComponent
                                    label="Estado Negocio*"
                                    value={negocio.estadonegocio}
                                    onClick={ () => setVisibleEstadoNegocio(true) }
                                    error={negocio.error.fkidestadonegocio}
                                    message={negocio.message.fkidestadonegocio}
                                    readOnly
                                    style={{ background: 'white', cursor: 'pointer', }}
                                    placeholder="SELECCIONAR ESTADO NEGOCIO"
                                />
                            </div>
                            <div className="form-group col-12">
                                <DatePickerComponent
                                    label="Fecha CIERRE*"
                                    value={negocio.fechacierre}
                                    onChange={ (value) => props.setFechaCierre(negocio, value) }
                                    error={negocio.error.fechacierre}
                                    message={negocio.message.fechacierre}
                                    placeholder="SELECCIONAR FECHA CIERRE"
                                    disabled={negocio.fechainicio.length === 0}
                                />
                            </div>
                            <div className="form-group col-12">
                                <TextAreaComponent 
                                    label="Nota"
                                    value={negocio.nota}
                                    onChange={ (value) => props.setNota(negocio, value) }
                                    rows={2}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='card-footer'>
                        <ButtonComponent
                            onClick={ () => props.onUpdate(negocio, props.onOk) }
                        >
                            Editar
                        </ButtonComponent>
                        <ButtonComponent
                            type='danger' onClick={props.onClose}
                        >
                            Cancelar
                        </ButtonComponent>
                    </div>
                </div>
            </ModalComponent>
        </>
    );
};

FormUpdateNegocioModal.propTypes = {
    idnegocio: PropTypes.string,
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onOk: PropTypes.func,
};

FormUpdateNegocioModal.defaultProps = {
    onOk: () => {},
    visible: false,
    idnegocio: null,
};

const mapStateToProps = ( state ) => ( {
    negocio: state.Negocio,
} );

const mapDispatchToProps = {
    onLimpiar: NegocioActions.onLimpiar,
    onEdit: NegocioActions.onEdit,
    setFKIDPrograma: NegocioActions.setFKIDPrograma,
    setFKIDTurno: NegocioActions.setFKIDTurno,
    setFKIDEstadoNegocio: NegocioActions.setFKIDEstadoNegocio,
    setFechaCierre: NegocioActions.setFechaCierre,
    setNota: NegocioActions.setNota,
    onUpdate: NegocioActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( FormUpdateNegocioModal );
