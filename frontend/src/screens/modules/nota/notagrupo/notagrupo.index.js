
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import InputComponent from '../../../../components/input';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { NotaGrupoActions } from '../../../../redux/actions/nota/notagrupo.action';
import ListadoDocenteModal from '../../persona/docente/modal/docente_listado.modal';
import ListNotaGrupoEstudiante from './components/listnotagrupoestudiante';

const IndexNotaGrupo = ( props ) => {
    const navigate = useNavigate();
    const { notaGrupo } = props;
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
                    props.setFkIDDocente(notaGrupo, docente);
                    setVisibleDocente(false);
                } }
                valueSelect={notaGrupo.fkiddocente}
            />
        );
    };
    
    return (
        <>
            { onComponentDocente() }
            <PaperComponent>
                <CardComponent
                    header={'Registrar Nota de Grupo'}
                >
                    <div>
                        <div className="row">
                            <div className="form-group col-2"></div>
                            <div className="form-group col-8">
                                <InputComponent
                                    label="Docente*"
                                    value={notaGrupo.docente}
                                    onClick={ () => {
                                        setVisibleDocente(true);
                                    } }
                                    readOnly
                                    style={{ background: 'white', cursor: 'pointer', }}
                                    placeholder="SELECCIONAR DOCENTE"
                                    message={notaGrupo.message.fkiddocente}
                                    error={notaGrupo.error.fkiddocente}
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
                                    dataSource={notaGrupo.arrayGrupoMateria}
                                    onSelect={(item) => props.setFkIDGrupoMateria(notaGrupo, item)}
                                    iddata={"idgrupopensumdetalle"}
                                    valueSelect={notaGrupo.fkidgrupopensumdetalle}
                                    isCheckbox={true}
                                />
                            </div>
                        </div>
                        <ListNotaGrupoEstudiante />
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
    notaGrupo: state.NotaGrupo,
} );
  
const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onLimpiar: NotaGrupoActions.onLimpiar,
    onChange: NotaGrupoActions.onChange,
    setFkIDDocente: NotaGrupoActions.setFkIDDocente,
    setFkIDGrupoMateria: NotaGrupoActions.setFkIDGrupoMateria,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexNotaGrupo);
