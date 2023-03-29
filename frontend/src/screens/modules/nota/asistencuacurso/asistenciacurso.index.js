
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import CardComponent from '../../../../components/card';
import InputComponent from '../../../../components/input';
import PaperComponent from '../../../../components/paper';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import ListadoDocenteModal from '../../persona/docente/modal/docente_listado.modal';
import { AsistenciaCursoActions } from '../../../../redux/actions/nota/asistenciacurso.action';
import TableComponent from '../../../../components/table';
import { existsData } from '../../../../utils/functions';
import { convertDateToDMYString, convertDateToString, convertDMYForYMD, convertStringforDate, convertYMDForDMY, getTextDayforIndex, getWeekDay } from '../../../../utils/date';
import RadioComponent from '../../../../components/radio';
import ButtonComponent from '../../../../components/button';
import EmptyComponent from '../../../../components/empty';

const IndexAsistenciaCurso = ( props ) => {
  const navigate = useNavigate();
  const { asistenciaCurso } = props;
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
                props.setFkIDDocente(asistenciaCurso, docente);
                setVisibleDocente(false);
            } }
            valueSelect={asistenciaCurso.fkiddocente}
        />
    );
  };

  const onComponentDate = () => {
    const dateStringFinish = convertDMYForYMD(asistenciaCurso.fechafinal);
    let dateInit = convertStringforDate(asistenciaCurso.fechainicio);
    let array = [];
    let index = 0;
    while ( convertDateToString(dateInit) <= dateStringFinish ) {
      array.push(
        <div style={{ width: 160, display: 'inline-block', }} key={index}>
          <div className='card card-success mr-2 mb-1'>
            <div className="card-header pt-0 pb-0 pl-1 text-center">
              <h4 className='text-primary'> 
                { getTextDayforIndex(getWeekDay(dateInit.getFullYear(), dateInit.getMonth(), dateInit.getDate()))} - { convertDateToDMYString(dateInit) }
              </h4>
            </div>
            <div className="card-header p-0">
              <div className='d-flex'>
                  <div style={{ 
                      width: 40, fontWeight: 'bold', fontSize: 14,
                      color: 'white', height: 20, lineHeight: '20px', 
                    }} className="bg-success text-center"
                  >
                    P
                  </div>
                  <div style={{ 
                      width: 40, fontWeight: 'bold', fontSize: 14,
                      color: 'white', height: 20, lineHeight: '20px', 
                    }} className="bg-warning text-center"
                  >
                    L
                  </div>
                  <div style={{ 
                      width: 40, fontWeight: 'bold', fontSize: 14,
                      color: 'white', height: 20, lineHeight: '20px', 
                    }} className="bg-danger text-center"
                  >
                    F
                  </div>
                  <div style={{ 
                      width: 40, fontWeight: 'bold', fontSize: 14,
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
      index++;
      dateInit.setDate( dateInit.getDate() + 1 );
    }
    return array;
  };

  const onComponentButtonAsistencia = () => {
    if ( asistenciaCurso.arrayEstudianteInscrito.length === 0 ) return null;
    let array = [];
    const dateStringFinish = convertDMYForYMD(asistenciaCurso.fechafinal);

    let momentInit = moment(convertDMYForYMD(asistenciaCurso.fechainicio));
    let momentFinish = moment(convertDMYForYMD(asistenciaCurso.fechafinal));
    
    let diffDays = momentFinish.diff(momentInit, 'days');

    // for (let index = convertDateToString(dateInit); index <= dateStringFinish; index = dateInit.setDate( dateInit.getDate() + 1 )) {
    for (let index = 0; index <= diffDays; index++) {
      array.push(
        <div style={{ width: 160, display: 'inline-block', }} key={index}>
          <div className='row p-2'>
            <div className='col-12'>
              <ButtonComponent
                fullWidth
                onClick={ () => {
                  let dateInit = convertStringforDate(asistenciaCurso.fechainicio);
                  dateInit.setDate( dateInit.getDate() + index );
                  console.log(convertYMDForDMY(convertDateToString(dateInit)))
                  asistenciaCurso.feachaasistenciaseleted = convertYMDForDMY(convertDateToString(dateInit));
                  props.onUpdateAsistencia(asistenciaCurso);
                } }
              >
                Guardar
              </ButtonComponent>
            </div>
          </div>
        </div>
      );
    }
    return array;
  }

  return (
    <>
      { onComponentDocente() }
      <PaperComponent
        title={"Registrar Asistencia de Curso"}
      >
        <CardComponent>
          <div>
            <div className="row">
              <div className="form-group col-2"></div>
              <div className="form-group col-8">
                <InputComponent
                  label="Docente*"
                  value={asistenciaCurso.docente}
                  onClick={ () => {
                      setVisibleDocente(true);
                  } }
                  readOnly
                  style={{ background: 'white', cursor: 'pointer', }}
                  placeholder="SELECCIONAR DOCENTE"
                  message={asistenciaCurso.message.fkiddocente}
                  error={asistenciaCurso.error.fkiddocente}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-12">
                <TableComponent 
                  option={false}
                  columns={ [
                      {
                        id: 'sigla',
                        label: 'Sigla',
                      },
                      {
                        id: 'descripcion',
                        label: 'Curso',
                      },
                      {
                        id: 'modalidadAcademica',
                        value: 'descripcion',
                        label: 'Modalidad',
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
                        id: 'turno',
                        value: 'descripcion',
                        label: 'Turno',
                        object: true,
                      },
                  ] } select
                  dataSource={asistenciaCurso.arrayMateria}
                  onSelect={(item) => props.setFkIDCurso(asistenciaCurso, item)}
                  iddata={"idcurso"}
                  valueSelect={asistenciaCurso.fkidcurso}
                  isCheckbox={true}
                />
                { existsData(asistenciaCurso.fkiddocente) &&
                  <EmptyComponent 
                    data={asistenciaCurso.arrayMateria} 
                    text='Sin cursos registrados'
                  />
                }
              </div>
            </div>
            <div className="row card card-info pt-1 pb-4">
              <div className="card-header pt-0 pb-0">
                <h4> Lista de Asistencia de estudiantes </h4>
              </div>
              { existsData(asistenciaCurso.fkidcurso) &&
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
                    { existsData( asistenciaCurso.fkidcurso ) && onComponentDate() }
                  </div>
                  { asistenciaCurso.arrayEstudianteInscrito.map( (item, key) => {
                    return (
                      <div key={key}>
                        <div style={{ width: 120, display: 'inline-block', fontSize: 9, }} className='p-2'>
                          { item.estudiante.numeroregistro }
                        </div>
                        <div style={{ width: 200, display: 'inline-block', fontSize: 9, }} className='p-2'>
                          { `${item.estudiante.apellidoprimero} ${item.estudiante.apellidosegundo} ${item.estudiante.nombreprincipal} ${item.estudiante.nombreadicional}` }
                        </div>
                        { item.arrayAsistenciaCurso.map( (data, index) => {
                          return (
                            <div style={{ width: 160, display: 'inline-block', }} key={index}>
                              <div className='d-flex'>
                                <div style={{ width: 40, height: 20, }}>
                                  <RadioComponent 
                                    color="success"
                                    checked={data.asistencia === 'A'}
                                    onChange={ () => {
                                      data.asistencia = 'A';
                                      props.onChange(asistenciaCurso);
                                    } }
                                  />
                                </div>
                                <div style={{ width: 40, height: 20, }}>
                                  <RadioComponent 
                                    color="warning"
                                    checked={data.asistencia === 'L'}
                                    onChange={ () => {
                                      data.asistencia = 'L';
                                      props.onChange(asistenciaCurso);
                                    } }
                                  />
                                </div>
                                <div style={{ width: 40, height: 20, }}>
                                  <RadioComponent 
                                    color="error"
                                    checked={data.asistencia === 'F'}
                                    onChange={ () => {
                                      data.asistencia = 'F';
                                      props.onChange(asistenciaCurso);
                                    } }
                                  />
                                </div>
                                <div style={{ width: 33, height: 20, }}>
                                  <RadioComponent 
                                    color="default"
                                    checked={data.asistencia === 'R'}
                                    onChange={ () => {
                                      data.asistencia = 'R';
                                      props.onChange(asistenciaCurso);
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
                  <EmptyComponent 
                    data={asistenciaCurso.arrayEstudianteInscrito} 
                    text='Sin estudiantes registrados.'
                  />
                  <div>
                    <div style={{ width: 120, display: 'inline-block', }}></div>
                    <div style={{ width: 200, display: 'inline-block', }}></div>
                    { onComponentButtonAsistencia() }
                  </div>
                </div>
              }
            </div>
          </div>
        </CardComponent>
      </PaperComponent>
    </>
  );
};

const mapStateToProps = ( state ) => ( {
  asistenciaCurso: state.AsistenciaCurso,
} );

const mapDispatchToProps = {
  onValidateToken: AuthActions.onValidateToken,
  onLimpiar: AsistenciaCursoActions.onLimpiar,
  onChange: AsistenciaCursoActions.onChange,
  setFkIDDocente: AsistenciaCursoActions.setFkIDDocente,
  setFkIDCurso: AsistenciaCursoActions.setFkIDCurso,
  onUpdateAsistencia: AsistenciaCursoActions.onUpdateAsistencia,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexAsistenciaCurso);
