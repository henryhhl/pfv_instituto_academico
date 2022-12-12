
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ModalComponent from '../../../../../components/modal';
import InputComponent from '../../../../../components/input';
import SelectComponent from '../../../../../components/select';
import ButtonComponent from '../../../../../components/button';
import TimePickerComponent from '../../../../../components/time';
import DatePickerComponent from '../../../../../components/date';
import TextAreaComponent from '../../../../../components/textarea';
import { ActividadActions } from '../../../../../redux/actions/oportunidad/actividad.action';
import ListadoTipoActividadModal from '../../tipoactividad/modal/tipoactividad_listado.modal';
import ListadoTipoResultadoModal from '../../tiporesultado/modal/tiporesultado_listado.modal';
import ListadoAsesorResponsableModal from '../../asesorresponsable/modal/asesorresponsable_listado.modal';

const FormAddActividadModal = ( props ) => {
    const { actividad } = props;

    const [ visibleAsesorResponsable, setVisibleAsesorResponsable ] = React.useState(false);
    const [ visibleTipoActividad, setVisibleTipoActividad ] = React.useState(false);
    const [ visibleTipoResultado, setVisibleTipoResultado ] = React.useState(false);

    React.useEffect( () => {
        init_data();
        return () => {};
    }, [] );

    const init_data = () => {
        props.onLimpiar();
        props.onCreate(props.fkidnegocio);
    };

    const onComponentTipoActividad = () => {
        if ( !visibleTipoActividad ) return null;
        return (
            <ListadoTipoActividadModal
                visible={visibleTipoActividad}
                onClose={ () => setVisibleTipoActividad(false) }
                onSelect={ (tipoActividad) => {
                    props.setFKIDTipoActividad(actividad, tipoActividad);
                    setVisibleTipoActividad(false);
                } }
            />
        );
    };

    const onComponentTipoResultado = () => {
        if ( !visibleTipoResultado ) return null;
        return (
            <ListadoTipoResultadoModal
                visible={visibleTipoResultado}
                onClose={ () => setVisibleTipoResultado(false) }
                onSelect={ (tipoActividad) => {
                    props.setFKIDTipoResultado(actividad, tipoActividad);
                    setVisibleTipoResultado(false);
                } }
            />
        );
    };

    const onComponentAsesorResponsable = () => {
        if ( !visibleAsesorResponsable ) return null;
        return (
            <ListadoAsesorResponsableModal
                visible={visibleAsesorResponsable}
                onClose={ () => setVisibleAsesorResponsable(false) }
                onSelect={ (asesorResponsable) => {
                    props.setFKIDAsesorResponsable(actividad, asesorResponsable);
                    setVisibleAsesorResponsable(false);
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
                title={"REGISTRAR ACTIVIDAD"}
                style={{ marginBottom: 30, marginTop: 30, }}
                centered
            >
                { onComponentTipoActividad() }
                { onComponentTipoResultado() }
                { onComponentAsesorResponsable() }
                <div className='card'>
                    <div className='card-body'>
                        <div className="row">
                            <div className="form-group col-12">
                                <InputComponent
                                    label="Nombre Actividad*"
                                    value={actividad.nroactividad}
                                    readOnly
                                />
                            </div>
                            <div className="form-group col-12">
                                <SelectComponent 
                                    data={ [
                                        {
                                            value: 'PROGRAMADA',
                                            title: 'PROGRAMADA',
                                        },
                                        {
                                            value: 'COMPLETADA',
                                            title: 'COMPLETADA',
                                        },
                                    ] }
                                    label={"Actividad*"}
                                    value={actividad.descripcion}
                                    onChange={ (value) => props.setActividad(actividad, value) }
                                    error={actividad.error.descripcion}
                                    message={actividad.message.descripcion}
                                    disabledDefault
                                />
                            </div>
                            { (actividad.descripcion === "PROGRAMADA") ?
                                <div className="form-group col-12">
                                    <InputComponent
                                        label="Tipo Actividad*"
                                        value={actividad.tipoactividad}
                                        onClick={ () => setVisibleTipoActividad(true) }
                                        error={actividad.error.fkidtipoactividad}
                                        message={actividad.message.fkidtipoactividad}
                                        readOnly
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR TIPO ACTIVIDAD"
                                    />
                                </div> : actividad.descripcion === "COMPLETADA" ? 
                                    <>
                                        <div className="form-group col-12">
                                        <InputComponent
                                            label="Tipo Actividad*"
                                            value={actividad.tipoactividad}
                                            onClick={ () => setVisibleTipoActividad(true) }
                                            error={actividad.error.fkidtipoactividad}
                                            message={actividad.message.fkidtipoactividad}
                                            readOnly
                                            style={{ background: 'white', cursor: 'pointer', }}
                                            placeholder="SELECCIONAR TIPO ACTIVIDAD"
                                        />
                                    </div>
                                        <div className="form-group col-12">
                                            <InputComponent
                                                label="Tipo Resultado*"
                                                value={actividad.tiporesultado}
                                                onClick={ () => setVisibleTipoResultado(true) }
                                                error={actividad.error.fkidtiporesultado}
                                                message={actividad.message.fkidtiporesultado}
                                                readOnly
                                                style={{ background: 'white', cursor: 'pointer', }}
                                                placeholder="SELECCIONAR TIPO RESULTADO"
                                            />
                                        </div>
                                    </> : null
                            }
                            <div className="form-group col-12">
                                <InputComponent
                                    label="Asesor Administrativo*"
                                    value={actividad.asesorresponsable}
                                    onClick={ () => setVisibleAsesorResponsable(true) }
                                    error={actividad.error.fkidasesorresponsable}
                                    message={actividad.message.fkidasesorresponsable}
                                    readOnly
                                    style={{ background: 'white', cursor: 'pointer', }}
                                    placeholder="SELECCIONAR ASESOR RESPONSABLE"
                                />
                            </div>
                            <div className="form-group col-12">
                                <DatePickerComponent
                                    label="Fecha Programada*"
                                    value={actividad.fechaprogramada}
                                    onChange={ (value) => props.setFechaProgramada(actividad, value) }
                                    error={actividad.error.fechaprogramada}
                                    message={actividad.message.fechaprogramada}
                                    placeholder="SELECCIONAR FECHA PROGRAMADA"
                                />
                            </div>
                            <div className="form-group col-12">
                                <TimePickerComponent
                                    label="Hora Programada*"
                                    value={actividad.horaprogramada}
                                    onChange={ (value) => props.setHoraProgramada(actividad, value) }
                                    error={actividad.error.horaprogramada}
                                    message={actividad.message.horaprogramada}
                                    placeholder="SELECCIONAR HORA PROGRAMADA"
                                    format='HH:mm'
                                />
                            </div>
                            <div className="form-group col-12">
                                <TextAreaComponent 
                                    label="Nota"
                                    value={actividad.nota}
                                    onChange={ (value) => props.setNota(actividad, value) }
                                    rows={2}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='card-footer'>
                        <ButtonComponent
                            onClick={ () => props.onStore(actividad, props.onOk) }
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

FormAddActividadModal.propTypes = {
    fkidnegocio: PropTypes.string,
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onOk: PropTypes.func,
};

FormAddActividadModal.defaultProps = {
    onOk: () => {},
    visible: false,
    fkidnegocio: null,
};

const mapStateToProps = ( state ) => ( {
    actividad: state.Actividad,
} );

const mapDispatchToProps = {
    onLimpiar: ActividadActions.onLimpiar,
    onCreate: ActividadActions.onCreateActividad,
    setActividad: ActividadActions.setActividad,
    setFKIDTipoActividad: ActividadActions.setFKIDTipoActividad,
    setFKIDTipoResultado: ActividadActions.setFKIDTipoResultado,
    setFKIDAsesorResponsable: ActividadActions.setFKIDAsesorResponsable,
    setFechaProgramada: ActividadActions.setFechaProgramada,
    setHoraProgramada: ActividadActions.setHoraProgramada,
    setNota: ActividadActions.setNota,
    onStore: ActividadActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( FormAddActividadModal );
