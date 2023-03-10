
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ModalComponent from '../../../../../components/modal';
import ButtonComponent from '../../../../../components/button';
import FormAddHorarioCursoModal from './form_add_horario.modal';
import { convertDateToDMYString, convertDateToString, convertDMYForYMD, convertStringforDate, getTextDayforIndex, getWeekDay } from '../../../../../utils/date';
import { existsData } from '../../../../../utils/functions';
import { CursoActions } from '../../../../../redux/actions/ofertaacademica/curso.action';

const FormHorarioCursoModal = ( props ) => {
    const { curso } = props;
    const [ visibleHorarioAula, setVisibleHorarioAula ] = React.useState(false);

    const onComponentDate = () => {
        if ( !existsData( curso.fkidaula ) ) return null; 
        const dateStringFinish = convertDMYForYMD(curso.fechafinal);
        let dateInit = convertStringforDate(curso.fechainicio);
        let array = [];
        while ( convertDateToString(dateInit) <= dateStringFinish ) {
            array.push(
                <div className='d-inline-block mr-2' style={{ width: 200, }} key={convertDateToDMYString(dateInit)}>
                    <div className='card card-success mr-1 mb-1'>
                        <div className="card-header pt-0 pb-0">
                            <h4> {getTextDayforIndex(getWeekDay(dateInit.getFullYear(), dateInit.getMonth(), dateInit.getDate()))} - { convertDateToDMYString(dateInit) } </h4>
                        </div>
                        <div className="card-body p-2">
                            <div className='w-100 h-100 position-relative'>
                                <div className='card-header p-0'>
                                    <div className="card-header pt-0 pb-0">
                                        <h4 style={{ display: 'flex', fontSize: 9, justifyContent: 'space-between', }}> 
                                            <span className='text-danger'>HORA INICIO: </span>
                                            {curso.horainicio} 
                                        </h4>
                                    </div>
                                    <div className="card-header pt-0 pb-0">
                                        <h4 style={{ display: 'flex', fontSize: 9, justifyContent: 'space-between', marginTop: -5, }}> 
                                            <span className='text-danger'>HORA FINAL: </span>
                                            {curso.horafinal} 
                                        </h4>
                                    </div>
                                    <div className="card-header pt-0 pb-0">
                                        <h4 style={{ display: 'flex', fontSize: 9, justifyContent: 'space-between', marginTop: -5, }}> 
                                            <span className='text-danger'>AULA: </span>
                                            {curso.aula} 
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
            dateInit.setDate( dateInit.getDate() + 1 );
        }
        return array;
    };

    const onComponentFormAddHorario = () => {
        if ( !visibleHorarioAula ) return null;
        return (
            <FormAddHorarioCursoModal
                visible={visibleHorarioAula}
                onClose={ () => setVisibleHorarioAula(false) }
                onAsignar={ (data) => {
                    curso.horainicio = data.horainicio;
                    curso.horafinal = data.horafinal;
                    curso.fkidaula = data.aula.idaula;
                    curso.aula = data.aula.descripcion;
                    props.onChange(curso);
                    setVisibleHorarioAula(false);
                } }
            />
        );
    };

    return (
        <>
            <ModalComponent
                visible={props.visible}
                onClose={props.onClose}
                footer={null} width={'90%'} 
                title={"ASIGNAR HORARIO"}
                style={{ marginBottom: 30, marginTop: 30, }}
            >
                { onComponentFormAddHorario() }
                <div className="card card-primary mt-3 mb-3">
                    <div className="card-body pb-0">
                        <div className="row">
                            <div className='col-12'>
                                <div className='card p-0 m-0'>
                                    <div className='card-header'>
                                        <h4> 
                                            <span className='text-danger'>RANGO DE FECHAS: </span>
                                            { curso.fechainicio } - { curso.fechafinal }
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            { props.disabled === false && 
                                <div className='col-12 mb-2'>
                                    <ButtonComponent
                                        onClick={ () => {
                                            setVisibleHorarioAula(true);
                                        } }
                                    >
                                        Adicionar o actualizar horario y aula
                                    </ButtonComponent>
                                </div>
                            }
                            <div className="col-12">
                                <div className='w-100 p-1 pt-3 pb-3' 
                                    style={{ 
                                        borderRadius: 4, overflowY: 'hidden', overflowX: 'auto', 
                                        whiteSpace: 'nowrap', backgroundColor: 'rgb(235, 236, 240)', 
                                    }}
                                >
                                    { onComponentDate() }
                                </div>
                            </div>
                            <div className="form-group col-12 mt-3">
                                <ButtonComponent
                                    onClick={ props.onClose }
                                    fullWidth
                                >
                                    Aceptar
                                </ButtonComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalComponent>
        </>
    );
};

FormHorarioCursoModal.propTypes = {
    visible: PropTypes.bool,
    disabled: PropTypes.bool,
    onClose: PropTypes.func,
    onOk: PropTypes.func,
    arrayhorario: PropTypes.array,
};

FormHorarioCursoModal.defaultProps = {
    disabled: false,
    visible: false,
    onOk: () => {},
    arrayhorario: [],
};

const mapStateToProps = ( state ) => ( {
    curso: state.Curso,
} );

const mapDispatchToProps = {
    onChange: CursoActions.onChange,
};

export default connect(mapStateToProps, mapDispatchToProps)( FormHorarioCursoModal );
