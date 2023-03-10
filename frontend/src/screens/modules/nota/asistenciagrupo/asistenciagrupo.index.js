import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import React from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../../../../components/button';
import CardComponent from '../../../../components/card';
import InputComponent from '../../../../components/input';
import PaperComponent from '../../../../components/paper';
import RadioComponent from '../../../../components/radio';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { AsistenciaGrupoActions } from '../../../../redux/actions/nota/asistenciagrupo.action';
import { getTextDayforIndex, getTextMonthForIndex, getWeekDay, getWeekDayByCode } from '../../../../utils/date';
import { existsData, Functions } from '../../../../utils/functions';
import ListadoDocenteModal from '../../persona/docente/modal/docente_listado.modal';

const IndexAsistenciaGrupo = (props) => {
    const navigate = useNavigate();
    const { asistenciaGrupo } = props;
    const [ visibleDocente, setVisibleDocente ] = React.useState(false);

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin );
        return () => {};
    }, [] );

    const onLogin = () => {
        navigate( '/login' );
    };

    const onComponentDocente = () => {
        if ( !visibleDocente ) return null;
        return (
            <ListadoDocenteModal
                visible={visibleDocente}
                onClose={ () => setVisibleDocente(false) }
                onSelect={ (docente) => {
                    props.setFkIDDocente(asistenciaGrupo, docente);
                    setVisibleDocente(false);
                } }
                valueSelect={asistenciaGrupo.fkiddocente}
            />
        );
    };

    const onValidateWeekDay = ( day ) => {
        const weekDay = getWeekDay(asistenciaGrupo.yearselected, asistenciaGrupo.monthselected, day);
        for (let index = 0; index < asistenciaGrupo.arrayDia.length; index++) {
            const element = asistenciaGrupo.arrayDia[index];
            const weekDayCurrent = getWeekDayByCode(element.dia.sigla);
            if ( weekDay === weekDayCurrent ) return true;
        }
        return false;
    };

    const onComponentDays = () => {
        let array = [];
        for (let index = asistenciaGrupo.dayinit; index <= asistenciaGrupo.lastday; index++) {
            if ( onValidateWeekDay(index) ) {
                array.push(
                    <div style={{ width: 132, display: 'inline-block', }} key={index}>
                        <div className='card card-success mr-2 mb-1'>
                            <div className="card-header pt-0 pb-0 pl-1 text-center">
                                <h4 className='text-primary'> 
                                    {getTextDayforIndex(getWeekDay(asistenciaGrupo.yearselected, asistenciaGrupo.monthselected, index))} {index}
                                </h4>
                            </div>
                            <div className="card-header p-0">
                                <div className='d-flex'>
                                    <div style={{ 
                                            width: 33, fontWeight: 'bold', fontSize: 14,
                                            color: 'white', height: 20, lineHeight: '20px', 
                                        }} className="bg-success text-center"
                                    >
                                        P
                                    </div>
                                    <div style={{ 
                                            width: 33, fontWeight: 'bold', fontSize: 14,
                                            color: 'white', height: 20, lineHeight: '20px', 
                                        }} className="bg-warning text-center"
                                    >
                                            L
                                        </div>
                                    <div style={{ 
                                            width: 33, fontWeight: 'bold', fontSize: 14,
                                            color: 'white', height: 20, lineHeight: '20px', 
                                        }} className="bg-danger text-center"
                                    >
                                        F
                                    </div>
                                    <div style={{ 
                                            width: 33, fontWeight: 'bold', fontSize: 14,
                                            color: 'white', height: 20, lineHeight: '20px', 
                                        }} className="bg-dark text-center"
                                    >
                                        R
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        return array;
    };

    const onComponentButtonAsistencia = () => {
        let array = [];
        if ( asistenciaGrupo.arrayEstudianteInscrito.length === 0 ) return null;
        for (let index = asistenciaGrupo.dayinit; index <= asistenciaGrupo.lastday; index++) {
            if ( onValidateWeekDay(index) ) {
                array.push(
                    <div style={{ width: 132, display: 'inline-block', }} key={index}>
                        <div className='row p-2'>
                                <div className='col-12'>
                                    <ButtonComponent
                                        fullWidth
                                        onClick={ () => {
                                            asistenciaGrupo.dayselected = index;
                                            props.onUpdateAsistencia(asistenciaGrupo);
                                        } }
                                    >
                                        Guardar
                                    </ButtonComponent>
                                </div>
                            </div>
                    </div>
                );
            }
        }
        return array;
    }

    return (
        <>
            { onComponentDocente() }
            <PaperComponent
                title={"Registrar Asistencia de Grupo"}
            >
                <CardComponent>
                    <div>
                        <div className="row">
                            <div className="form-group col-2"></div>
                            <div className="form-group col-8">
                                <InputComponent
                                    label="Docente*"
                                    value={asistenciaGrupo.docente}
                                    onClick={ () => {
                                        setVisibleDocente(true);
                                    } }
                                    readOnly
                                    style={{ background: 'white', cursor: 'pointer', }}
                                    placeholder="SELECCIONAR DOCENTE"
                                    message={asistenciaGrupo.message.fkiddocente}
                                    error={asistenciaGrupo.error.fkiddocente}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-12">
                                <TableComponent 
                                    option={false}
                                    columns={ [
                                        {
                                            id: 'pensum',
                                            value: 'descripcion',
                                            label: 'Pensum',
                                            object: true,
                                        },
                                        {
                                            id: 'programa',
                                            value: 'descripcion',
                                            label: 'Carrera',
                                            object: true,
                                        },
                                        {
                                            id: 'grupo',
                                            value: 'sigla',
                                            label: 'Grupo',
                                            object: true,
                                        },
                                        {
                                            id: 'materia',
                                            value: 'nombrelargo',
                                            label: 'Materia',
                                            object: true,
                                        },
                                        {
                                            id: 'gestionPeriodo',
                                            value: 'descripcion',
                                            label: 'Periodo',
                                            object: true,
                                        },
                                        {
                                            id: 'divisionAcademica',
                                            value: 'descripcion',
                                            label: 'Semestre',
                                            object: true,
                                        },
                                    ] } select
                                    dataSource={asistenciaGrupo.arrayGrupoMateria}
                                    onSelect={(item) => props.setFkIDGrupoMateria(asistenciaGrupo, item)}
                                    iddata={"idgrupopensumdetalle"}
                                    valueSelect={asistenciaGrupo.fkidgrupopensumdetalle}
                                    isCheckbox={true}
                                />
                            </div>
                        </div>
                        { existsData( asistenciaGrupo.fkidgrupopensumdetalle ) &&
                            <div className="row">
                                <div className='col-12'>
                                    <div className='card p-0'>
                                        <div className='card-body p-0'>
                                            <div className="statistic-details mt-sm-4">
                                                <div className="statistic-details-item">
                                                    <div className="detail-value">Semestre</div>
                                                    <div className="detail-name">
                                                        {asistenciaGrupo.divisionacademica}
                                                    </div>
                                                </div>
                                                <div className="statistic-details-item">
                                                    <div className="detail-value">Grupo</div>
                                                    <div className="detail-name">
                                                        {asistenciaGrupo.grupo}
                                                    </div>
                                                </div>
                                                <div className="statistic-details-item">
                                                    <div className="detail-value">Aula</div>
                                                    <div className="detail-name">This Month's Sales</div>
                                                </div>
                                                <div className="statistic-details-item">
                                                    <div className="detail-value">Materia</div>
                                                    <div className="detail-name">
                                                        {asistenciaGrupo.materia}
                                                    </div>
                                                </div>
                                                <div className="statistic-details-item">
                                                    <div className="detail-value">Mes</div>
                                                    <div className="detail-name">
                                                        <LeftOutlined 
                                                            style={{ 
                                                                color: 'black', marginRight: 5, cursor: 'pointer',
                                                                padding: 4, borderRadius: 50, background: 'white', fontSize: 10, 
                                                                fontWeight: 'bold', boxShadow: '0 0 7px 0 #222', 
                                                            }} 
                                                            onClick={ () => props.setBackMounth(asistenciaGrupo) }
                                                        />
                                                        {getTextMonthForIndex(asistenciaGrupo.monthselected)}
                                                        <RightOutlined 
                                                            style={{ 
                                                                color: 'black', marginLeft: 5, cursor: 'pointer',
                                                                padding: 4, borderRadius: 50, background: 'white', fontSize: 10, 
                                                                fontWeight: 'bold', boxShadow: '0 0 7px 0 #222', 
                                                            }} 
                                                            onClick={ () => props.setNextMounth(asistenciaGrupo) }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="statistic-details-item">
                                                    <div className="detail-value">Año</div>
                                                    <div className="detail-name">
                                                        {asistenciaGrupo.yearselected}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="row card card-info pt-1 pb-4">
                            <div className="card-header pt-0 pb-0">
                                <h4> Lista de Asistencia de estudiantes </h4>
                            </div>
                            <div className='w-100 d-block p-2' 
                                style={ { 
                                    overflowY: 'hidden', overflowX: 'auto', whiteSpace: 'nowrap',
                                } }
                            >
                                <div>
                                    <div style={{ width: 120, display: 'inline-block', }}>
                                        <div className='card card-primary mr-2 mb-1'>
                                            <div className="card-header pt-0 pb-0">
                                                <h4> &nbsp; </h4>
                                            </div>
                                            <div className="card-header pt-0 pb-0">
                                                <h4> Registro </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ width: 200, display: 'inline-block', }}>
                                        <div className='card card-primary mr-2 mb-1'>
                                            <div className="card-header pt-0 pb-0">
                                                <h4> &nbsp; </h4>
                                            </div>
                                            <div className="card-header pt-0 pb-0">
                                                <h4> Estudiante </h4>
                                            </div>
                                        </div>
                                    </div>
                                    { Functions.existsData(asistenciaGrupo.fkidgrupopensumdetalle) && onComponentDays() }
                                </div>
                                { asistenciaGrupo.arrayEstudianteInscrito.map( (item, key) => {
                                    return (
                                        <div key={key}>
                                            <div style={{ width: 120, display: 'inline-block', fontSize: 9, }} className='p-2'>
                                                { item.estudiante.numeroregistro }
                                            </div>
                                            <div style={{ width: 200, display: 'inline-block', fontSize: 9, }} className='p-2'>
                                                { `${item.estudiante.apellidoprimero} ${item.estudiante.apellidosegundo} ${item.estudiante.nombreprincipal} ${item.estudiante.nombreadicional}` }
                                            </div>
                                            { item.arrayAsistenciaGrupo.map( (data, index) => {
                                                return (
                                                    <div style={{ width: 132, display: 'inline-block', }} key={index}>
                                                        <div className='d-flex'>
                                                            <div style={{ width: 33, height: 20, }}
                                                            >
                                                                <RadioComponent 
                                                                    color="success"
                                                                    checked={data.asistencia === 'A'}
                                                                    onChange={ () => {
                                                                        data.asistencia = 'A';
                                                                        props.onChange(asistenciaGrupo);
                                                                    } }
                                                                />
                                                            </div>
                                                            <div style={{ width: 33, height: 20, }}
                                                            >
                                                                    <RadioComponent 
                                                                        color="warning"
                                                                        checked={data.asistencia === 'L'}
                                                                        onChange={ () => {
                                                                            data.asistencia = 'L';
                                                                            props.onChange(asistenciaGrupo);
                                                                        } }
                                                                    />
                                                                </div>
                                                            <div style={{ width: 33, height: 20, }}
                                                            >
                                                                <RadioComponent 
                                                                    color="error"
                                                                    checked={data.asistencia === 'F'}
                                                                    onChange={ () => {
                                                                        data.asistencia = 'F';
                                                                        props.onChange(asistenciaGrupo);
                                                                    } }
                                                                />
                                                            </div>
                                                            <div style={{ width: 33, height: 20, }}
                                                            >
                                                                <RadioComponent 
                                                                    color="default"
                                                                    checked={data.asistencia === 'R'}
                                                                    onChange={ () => {
                                                                        data.asistencia = 'R';
                                                                        props.onChange(asistenciaGrupo);
                                                                    } }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            } ) }
                                        </div>
                                    );
                                } ) }
                                <div>
                                    <div style={{ width: 120, display: 'inline-block', }}></div>
                                    <div style={{ width: 200, display: 'inline-block', }}></div>
                                    { onComponentButtonAsistencia() }
                                </div>
                            </div>
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
    asistenciaGrupo: state.AsistenciaGrupo,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onLimpiar: AsistenciaGrupoActions.onLimpiar,
    onChange: AsistenciaGrupoActions.onChange,
    setFkIDDocente: AsistenciaGrupoActions.setFkIDDocente,
    setFkIDGrupoMateria: AsistenciaGrupoActions.setFkIDGrupoMateria,
    setNextMounth: AsistenciaGrupoActions.setNextMounth,
    setBackMounth: AsistenciaGrupoActions.setBackMounth,
    onUpdateAsistencia: AsistenciaGrupoActions.onUpdateAsistencia,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexAsistenciaGrupo);
