
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import EmptyComponent from '../../../../components/empty';
import InputComponent from '../../../../components/input';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { NotaCursoActions } from '../../../../redux/actions/nota/notacurso.action';
import { existsData } from '../../../../utils/functions';
import ListadoDocenteModal from '../../persona/docente/modal/docente_listado.modal';
import ListNotaCursoEstudiante from './components/listnotaestudiante';

const IndexNotaCurso = ( props ) => {
    const navigate = useNavigate();
    const { notaCurso } = props;
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
                    props.setFkIDDocente(notaCurso, docente);
                    setVisibleDocente(false);
                } }
                valueSelect={notaCurso.fkiddocente}
            />
        );
    };

    return (
        <>
            { onComponentDocente() }
            <PaperComponent
                title={"Registrar Nota de Curso"}
            >
                <CardComponent>
                    <div>
                        <div className="row">
                            <div className="form-group col-2"></div>
                            <div className="form-group col-8">
                                <InputComponent
                                    label="Docente*"
                                    value={notaCurso.docente}
                                    onClick={ () => {
                                        setVisibleDocente(true);
                                    } }
                                    readOnly
                                    style={{ background: 'white', cursor: 'pointer', }}
                                    placeholder="SELECCIONAR DOCENTE"
                                    message={notaCurso.message.fkiddocente}
                                    error={notaCurso.error.fkiddocente}
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
                                    dataSource={notaCurso.arrayMateria}
                                    onSelect={(item) => props.setFkIDCurso(notaCurso, item)}
                                    iddata={"idcurso"}
                                    valueSelect={notaCurso.fkidcurso}
                                    isCheckbox={true}
                                />
                                { existsData(notaCurso.fkiddocente) &&
                                    <EmptyComponent 
                                        data={notaCurso.arrayMateria} 
                                        text='Sin cursos registrados'
                                    />
                                }
                            </div>
                        </div>
                        <ListNotaCursoEstudiante />
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
    notaCurso: state.NotaCurso,
} );
  
const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onLimpiar: NotaCursoActions.onLimpiar,
    onChange: NotaCursoActions.onChange,
    setFkIDDocente: NotaCursoActions.setFkIDDocente,
    setFkIDCurso: NotaCursoActions.setFkIDCurso,
};
  
export default connect(mapStateToProps, mapDispatchToProps)(IndexNotaCurso);
