
import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../../../../components/button';
import CalendarComponent from '../../../../components/calendar';
import CardComponent from '../../../../components/card';
import InputComponent from '../../../../components/input';
import PaperComponent from '../../../../components/paper';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { CalendarioAcademicoActions } from '../../../../redux/actions/nota/calendarioacademico.action';
import ListadoUnidadAdministrativaModal from '../../estructuraacademica/unidadadministrativa/modal/unidad_administrativa_listado.modal';
import ListadoGestionPeriodoModal from '../../estructurainstitucional/gestionperiodo/modal/gestionperiodo_listado.modal';
import CalendarioAcademicoDetailModal from './modal/calendarioacademicodetail.modal';
 
function IndexCalendarioAcademico(props) {
    const { calendarioAcademico } = props;
    const navigate = useNavigate();
    const [dateNow, setDateNow] = React.useState( () => moment(new Date()) );

    const [ visibleUnidadAdministrativa, setVisibleUnidadAdministrativa ] = React.useState(false);
    const [ visibleGestionPeriodo, setVisibleGestionPeriodo ] = React.useState(false);
    const [ visibleDetailCalendar, setVisibleDetailCalendar ] = React.useState(false);

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onCreate();
            }
        } );
        return () => {};
    }, [] );

    const onLogin = () => {
        navigate( '/login' );
    };

    const onComponentUnidadAdministrativa = () => {
        if ( !visibleUnidadAdministrativa ) return null;
        return (
            <ListadoUnidadAdministrativaModal
                visible={visibleUnidadAdministrativa}
                onClose={ () => setVisibleUnidadAdministrativa(false) }
                onSelect={ (unidadAdminitrativa) => {
                    props.setFKIDUnidadAdministrativa(calendarioAcademico, unidadAdminitrativa);
                    setVisibleUnidadAdministrativa(false);
                } }
                valueSelect={calendarioAcademico?.fkidunidadadministrativa}
            />
        );
    };

    const onComponentGestionPeriodo = () => {
        if ( !visibleGestionPeriodo ) return null;
        return (
            <ListadoGestionPeriodoModal
                visible={visibleGestionPeriodo}
                onClose={ () => setVisibleGestionPeriodo(false) }
                onSelect={ (gestionPeriodo) => {
                    props.setFKIDGestionPeriodo(calendarioAcademico, gestionPeriodo);
                    setDateNow( moment(gestionPeriodo.fechainicio, "DD/MM/YYYY") );
                    setVisibleGestionPeriodo(false);
                } }
                valueSelect={calendarioAcademico?.fkidgestionperiodo}
            />
        );
    };

    const onComponentDetailsCalendar = () => {
        if ( !visibleDetailCalendar ) return null;
        return (
            <>
                <CalendarioAcademicoDetailModal 
                    visible={visibleDetailCalendar}
                    onClose={ () => setVisibleDetailCalendar(false)}
                    arrayCalendarioAcademico={calendarioAcademico.arrayCalendarioAcademico}
                />
            </>
        );
    };

    return (
        <>
            { onComponentUnidadAdministrativa() }
            { onComponentGestionPeriodo() }
            { onComponentDetailsCalendar() }
            <PaperComponent
                title={"Calendario Academico"}
            >
                <CardComponent>
                    <div className="row">
                        <div className="form-group col-8">
                            <InputComponent
                                label="Unidad administrativa*"
                                value={calendarioAcademico.unidadadministrativa}
                                onClick={ () => {
                                    setVisibleUnidadAdministrativa(true);
                                } }
                                readOnly
                                style={{ background: 'white', cursor: 'pointer', }}
                                placeholder="SELECCIONAR UNIDAD ADMINISTRATIVA"
                                error={calendarioAcademico.error.fkidunidadadministrativa}
                                message={calendarioAcademico.message.fkidunidadadministrativa}
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Periodo*"
                                value={calendarioAcademico.gestionperiodo}
                                onClick={ () => {
                                    setVisibleGestionPeriodo(true);
                                } }
                                readOnly
                                style={{ background: 'white', cursor: 'pointer', }}
                                placeholder="SELECCIONAR GESTIÓN PERIODO"
                                error={calendarioAcademico.error.fkidgestionperiodo}
                                message={calendarioAcademico.message.fkidgestionperiodo}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-3"></div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Fecha Inicio*"
                                value={calendarioAcademico.fechainicio}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Fecha Final*"
                                value={calendarioAcademico.fechafinal}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-12 mt-2'>
                            <ButtonComponent fullWidth
                                onClick={ () => props.getAll(calendarioAcademico) }
                            >
                                Visualizar Actividad del Calendario
                            </ButtonComponent>
                        </div>
                    </div>
                    <CalendarComponent 
                        disabled={!calendarioAcademico.showcalendar}
                        disabledDate={false}
                        startDate={calendarioAcademico.fechainicio}
                        endDate={calendarioAcademico.fechafinal}
                        onClickDay={ (day) => {
                            props.setFechaNota(calendarioAcademico, day);
                            setVisibleDetailCalendar(true);
                        } }
                        arrayCalendarioAcademico={calendarioAcademico.arrayCalendarioAcademico}
                        value={dateNow}
                        onChange={ (date) => setDateNow(date) }
                    />
                </CardComponent>
            </PaperComponent>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
    calendarioAcademico: state.CalendarioAcademico,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onCreate: CalendarioAcademicoActions.onCreate,
    onLimpiar: CalendarioAcademicoActions.onLimpiar,
    getAll: CalendarioAcademicoActions.getAll,
    setFKIDUnidadAdministrativa: CalendarioAcademicoActions.setFKIDUnidadAdministrativa,
    setFKIDGestionPeriodo: CalendarioAcademicoActions.setFKIDGestionPeriodo,
    setFechaNota: CalendarioAcademicoActions.setFechaNota,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexCalendarioAcademico);
