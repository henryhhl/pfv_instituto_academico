
import React from 'react';
import { connect } from 'react-redux';
import Paper from '@mui/material/Paper';
import { existsData } from '../../../../../utils/functions';
import EmptyComponent from '../../../../../components/empty';
import ButtonComponent from '../../../../../components/button';
import { NotaGrupoActions } from '../../../../../redux/actions/nota/notagrupo.action';

const ListNotaGrupoEstudiante = ( props ) => {
    const { notaGrupo } = props;

    return (
        <>
            <div className="row card card-info pt-1 pb-4">
                <div className="card-header pt-0 pb-0">
                    <h4> Lista de notas de estudiantes </h4>
                </div>
                { existsData(notaGrupo.fkidgrupopensumdetalle) &&
                    <div className='w-100 d-block p-2' 
                        style={ { 
                            overflowY: 'hidden', overflowX: 'auto', whiteSpace: 'nowrap',
                        } }
                    >
                        <div>
                            <div style={{ width: 150, display: 'inline-block', }}>
                                <div className='card card-primary mr-2 mb-0 mt-0 p-0'>
                                    <div className="card-header pt-0 pb-0 pl-1 text-left">
                                        <h4> Registro </h4>
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: 240, display: 'inline-block', }}>
                                <div className='card card-primary mr-2 mb-1 mt-0 p-0'>
                                    <div className="card-header pt-0 pb-0 pl-1 text-left">
                                        <h4> Estudiante </h4>
                                    </div>
                                </div>
                            </div>
                            { existsData( notaGrupo.fkidgrupopensumdetalle ) && notaGrupo.arrayEstudianteInscrito.length > 0 &&
                                notaGrupo.arrayEstudianteInscrito[0].arrayNotaGrupo.map( (item, key) => {
                                    return (
                                        <div style={{ width: 120, display: 'inline-block', }} key={key}>
                                            <div className='card card-success mr-2 mb-1 mt-0 p-0'>
                                                <div className="card-header pt-0 pb-0 pl-1 text-left">
                                                    <h4 className='text-primary'> 
                                                        { item.parametroCalificacion.sigla }
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                } )
                            }
                            { notaGrupo.arrayEstudianteInscrito.length > 0 &&
                                <div style={{ width: 60, display: 'inline-block', }}>
                                    <div className='card card-danger mr-2 mb-1 mt-0 p-0'>
                                        <div className="card-header pt-0 pb-0 pl-1 text-left">
                                            <h4> NF </h4>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        { notaGrupo.arrayEstudianteInscrito.map( (item, key) => {
                            let notaRow = 0;
                            return (
                                <div key={key}>
                                    <div style={{ width: 150, display: 'inline-block', }}>
                                        <div className='card mr-2 mb-1 mt-0 p-0'>
                                            <div className="card-header p-0 text-left m-0">
                                                <Paper style={{ width: '100%', paddingLeft: 6, margin: 0, }}>
                                                    <h4 style={{ fontSize: 7, }}>
                                                        { item.estudiante.numeroregistro }
                                                    </h4>
                                                </Paper>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ width: 240, display: 'inline-block', }}>
                                        <div className='card mr-2 mb-1 mt-0 p-0'>
                                            <div className="card-header p-0 text-left m-0">
                                                <Paper style={{ width: '100%', paddingLeft: 6, margin: 0, }}>
                                                    <h4 style={{ fontSize: 7, }}>
                                                        { `${item.estudiante.apellidoprimero} ${item.estudiante.apellidosegundo} ${item.estudiante.nombreprincipal} ${item.estudiante.nombreadicional}` }
                                                    </h4>
                                                </Paper>
                                            </div>
                                        </div>
                                    </div>
                                    { item.arrayNotaGrupo.map( (data, index) => {
                                        notaRow += parseFloat(data.nota);
                                        return (
                                            <div style={{ width: 120, display: 'inline-block', fontSize: 9, }} key={index}>
                                                <div className='card mr-2 mb-1 mt-0 p-0'>
                                                    <div className="card-header p-0 text-left m-0 d-flex">
                                                        <div style={{ width: '50%', }}>
                                                            <Paper style={{ width: '100%', paddingLeft: 6, margin: 0, }}>
                                                                {data.valorporcentaje}
                                                            </Paper>
                                                        </div>
                                                        <div style={{ width: '50%', }}>
                                                            <Paper style={{ width: '100%', paddingLeft: 6, margin: 0, }}>
                                                                <input type="text" maxLength={4} 
                                                                    style={{ marginBottom: 0, paddingLeft: 4, paddingRight: 1, border: '2px solid #1890ff' }}
                                                                    className="form-control show" placeholder="..."
                                                                    value={data.nota}
                                                                    onChange={ (evt) => {
                                                                        let value = evt.target.value;
                                                                        if ( value === "" ) {
                                                                            value = 0;
                                                                        }
                                                                        if ( !isNaN(value) ) {
                                                                            if ( parseFloat(value) >= 0 && parseFloat(value) <= parseFloat(data.valorporcentaje) ) {
                                                                                data.nota = parseFloat(value);
                                                                                props.onChange(notaGrupo);
                                                                            }
                                                                        }
                                                                    } }
                                                                /> 
                                                            </Paper>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    } ) }
                                    <div style={{ width: 60, display: 'inline-block', fontSize: 9, }}>
                                        <div className='card mr-2 mb-1 mt-0 p-0'>
                                            <div className="card-header p-0 text-left m-0 d-flex">
                                                <div style={{ width: '100%', }}>
                                                    <Paper style={{ width: '100%', paddingLeft: 6, margin: 0, background: '#3DC7BE', color: 'white', }}>
                                                        {parseFloat(notaRow).toFixed(2)}
                                                    </Paper>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        } ) }
                        <EmptyComponent 
                            data={notaGrupo.arrayEstudianteInscrito} 
                            text='Sin estudiantes registrados.'
                        />
                    </div>
                }
                { existsData(notaGrupo.fkidgrupopensumdetalle) &&
                    <div className='row'>
                        <div className='col-12 center'>
                            <ButtonComponent
                                fullWidth
                                onClick={ () => {
                                    props.onUpdateAllNota(notaGrupo);
                                } }
                            >
                                Guardar Nota
                            </ButtonComponent>
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
    notaGrupo: state.NotaGrupo,
} );
  
const mapDispatchToProps = {
    onChange: NotaGrupoActions.onChange,
    onUpdateAllNota: NotaGrupoActions.onUpdateAllNota,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListNotaGrupoEstudiante);
