
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ModalComponent from '../../../../../components/modal';
import InputComponent from '../../../../../components/input';
import ButtonComponent from '../../../../../components/button';
import DatePickerComponent from '../../../../../components/date';
import TextAreaComponent from '../../../../../components/textarea';
import { NegocioActions } from '../../../../../redux/actions/oportunidad/negocio.action';
import ListadoEstadoNegocioModal from '../../estadonegocio/modal/estadonegocio_listado.modal';
import ListadoTurnoModal from '../../../estructurainstitucional/turno/modal/turno_listado.modal';
import ListadoProgramaModal from '../../../estructuraacademica/programa/modal/programa_listado.modal';

const FormAddNegocioModal = ( props ) => {
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
        props.onCreate(props.fkidoportunidad);
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
                valueSelect={negocio?.fkidprograma}
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
                valueSelect={negocio?.fkidturno}
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
                valueSelect={negocio?.fkidestadonegocio}
            />
        );
    };

    return (
        <>
            <ModalComponent
                visible={props.visible}
                onClose={props.onClose}
                footer={null} width={500}
                title={"REGISTRAR NEGOCIO"}
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
                            onClick={ () => props.onStore(negocio, props.onOk) }
                        >
                            Guardar
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

FormAddNegocioModal.propTypes = {
    fkidoportunidad: PropTypes.string,
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onOk: PropTypes.func,
};

FormAddNegocioModal.defaultProps = {
    onOk: () => {},
    visible: false,
    fkidoportunidad: null,
};

const mapStateToProps = ( state ) => ( {
    negocio: state.Negocio,
} );

const mapDispatchToProps = {
    onLimpiar: NegocioActions.onLimpiar,
    onCreate: NegocioActions.onCreateNegocio,
    setFKIDPrograma: NegocioActions.setFKIDPrograma,
    setFKIDTurno: NegocioActions.setFKIDTurno,
    setFKIDEstadoNegocio: NegocioActions.setFKIDEstadoNegocio,
    setFechaCierre: NegocioActions.setFechaCierre,
    setNota: NegocioActions.setNota,
    onStore: NegocioActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( FormAddNegocioModal );
