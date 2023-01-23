
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CardComponent from '../../../../../components/card';
import ModalComponent from '../../../../../components/modal';
import { EstadoData } from '../../../../../data/estado.data';
import ButtonComponent from '../../../../../components/button';
import SelectComponent from '../../../../../components/select';
import TextAreaComponent from '../../../../../components/textarea';
import { CalendarioAcademicoActions } from '../../../../../redux/actions/nota/calendarioacademico.action';
import { TipoFeriadoData } from '../../../../../data/tipo_feriado.data';
import { TipoActividadData } from '../../../../../data/tipo_actividad.data';
import { Badge, Empty, Tag, Tooltip } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const CalendarioAcademicoDetailModal = ( props ) => {
    const { calendarioAcademico } = props;
    const [ create, setCreate ] = React.useState(false);

    const onDataActivityCalendar = () => {
        const arrayCalendarioAcademico = props.arrayCalendarioAcademico.filter(item => item.fechanota === calendarioAcademico.fechanota);
        if ( arrayCalendarioAcademico.length === 0 ) {
            return (
                <Empty 
                    description={'Actividades sin registradas.'}
                />
            );
        }
        return arrayCalendarioAcademico.map( (item, key) => {
            return (
                <div className='row' key={key}>
                    <div className='col-12'>
                        <Tag color={'geekblue'} style={ { width: '100%', marginBottom: 5, paddingTop: 5, paddingBottom: 0, position: 'relative', } }
                            closable
                            onClose={ (e) => {
                                e.preventDefault();
                                props.onDelete(calendarioAcademico, item.idcalendarioacademico);
                            } }
                            closeIcon={ 
                                <Tooltip color={'red'} title={'Eliminar'}>
                                    <CloseCircleOutlined 
                                        style={{ 
                                            fontSize: 25, color: '#ffadd2', 
                                            position: 'absolute', top: 5, right: 5,
                                        }} 
                                    /> 
                                </Tooltip>
                            }
                        >
                            <p>
                                <Badge 
                                    color={'magenta'} 
                                    text={
                                        <>
                                            <strong>Tipo Actividad: </strong> {item.tipoactividad}
                                        </>
                                    } 
                                />
                            </p>
                            <p>
                                <Badge 
                                    color={'red'} 
                                    text={
                                        <>
                                            <strong>Tipo Feriado: </strong> {item.tipoferiado}
                                        </>
                                    } 
                                />
                            </p>
                            <p>
                                <Badge 
                                    color={'green'} 
                                    text={
                                        <>
                                            <strong>Es Feriado: </strong> {item.existeclases}
                                        </>
                                    } 
                                />
                            </p>
                            <p>
                                { item.nota }
                            </p>
                        </Tag>
                    </div>
                </div>
            );
        } );
    };

    return (
        <>
            <ModalComponent
                visible={props.visible}
                onClose={props.onClose}
                footer={null} width={500} centered
                title={calendarioAcademico.fechanota}
            >
                <div className="row">
                    <div className="col-12 pt-3">
                        { create === false ? 
                            <>
                                <CardComponent
                                    header={'Actividades'}
                                    actions={
                                        <ButtonComponent
                                            onClick={ () => setCreate(true) }
                                        >
                                            Nuevo
                                        </ButtonComponent>
                                    }
                                >
                                    { onDataActivityCalendar() }
                                </CardComponent>
                            </> : 
                            <CardComponent
                                header={'Nueva Actividad'}
                                actions={
                                    <ButtonComponent
                                        onClick={ () => setCreate(false) }
                                    >
                                        Atras
                                    </ButtonComponent>
                                }  
                            >
                                <div className='row'>
                                    <div className="form-group col-12">
                                        <SelectComponent 
                                            data={TipoActividadData}
                                            label={"Tipo Actividad*"}
                                            value={calendarioAcademico.tipoactividad}
                                            onChange={ (value) => props.setTipoActividad(calendarioAcademico, value) }
                                            error={calendarioAcademico.error.tipoactividad}
                                            message={calendarioAcademico.message.tipoactividad}
                                            disabledDefault
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="form-group col-12">
                                        <SelectComponent 
                                            data={TipoFeriadoData}
                                            label={"Tipo Feriado*"}
                                            value={calendarioAcademico.tipoferiado}
                                            onChange={ (value) => props.setTipoFeriado(calendarioAcademico, value) }
                                            error={calendarioAcademico.error.tipoferiado}
                                            message={calendarioAcademico.message.tipoferiado}
                                            disabledDefault
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="form-group col-12">
                                        <SelectComponent 
                                            data={ [
                                                {
                                                    value: 'Si',
                                                    title: 'Si',
                                                },
                                                {
                                                    value: 'No',
                                                    title: 'No',
                                                },
                                            ] }
                                            label={"Es Feriado*"}
                                            value={calendarioAcademico.existeclases}
                                            onChange={ (value) => props.setExisteClases(calendarioAcademico, value) }
                                            error={calendarioAcademico.error.existeclases}
                                            message={calendarioAcademico.message.existeclases}
                                            disabledDefault
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="form-group col-12">
                                        <TextAreaComponent 
                                            label="Nota"
                                            value={calendarioAcademico.nota}
                                            onChange={ (value) => props.setNota(calendarioAcademico, value) }
                                            rows={2}
                                            error={calendarioAcademico.error.nota}
                                            message={calendarioAcademico.message.nota}
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="form-group col-12">
                                        <SelectComponent 
                                            data={EstadoData}
                                            label={"Estado*"}
                                            value={calendarioAcademico.estado}
                                            onChange={ (value) => props.setEstado(calendarioAcademico, value) }
                                            error={calendarioAcademico.error.estado}
                                            message={calendarioAcademico.message.estado}
                                            disabledDefault
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-12'>
                                        <ButtonComponent
                                            fullWidth
                                            onClick={ () => props.onStore(calendarioAcademico, props.onClose) }
                                        >
                                            Guardar
                                        </ButtonComponent>
                                    </div>
                                </div>
                            </CardComponent>
                        }
                        
                    </div>
                </div>
            </ModalComponent>
        </>
    );
};

CalendarioAcademicoDetailModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    title: PropTypes.string,
    arrayCalendarioAcademico: PropTypes.array,
};

CalendarioAcademicoDetailModal.defaultProps = {
    title: "",
    visible: false,
    onClose: () => {},
    arrayCalendarioAcademico: [],
};

const mapStateToProps = ( state ) => ( {
    calendarioAcademico: state.CalendarioAcademico,
} );

const mapDispatchToProps = {
    setNota: CalendarioAcademicoActions.setNota,
    setEstado: CalendarioAcademicoActions.setEstado,
    setTipoActividad: CalendarioAcademicoActions.setTipoActividad,
    setTipoFeriado: CalendarioAcademicoActions.setTipoFeriado,
    setExisteClases: CalendarioAcademicoActions.setExisteClases,
    onStore: CalendarioAcademicoActions.onGrabar,
    onDelete: CalendarioAcademicoActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarioAcademicoDetailModal);
