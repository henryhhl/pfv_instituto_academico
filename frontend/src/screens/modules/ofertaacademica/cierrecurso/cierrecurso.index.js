
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../../../../components/button';
import CardComponent from '../../../../components/card';
import DatePickerComponent from '../../../../components/date';
import InputComponent from '../../../../components/input';
import PaperComponent from '../../../../components/paper';
import TextAreaComponent from '../../../../components/textarea';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { CursoActions } from '../../../../redux/actions/ofertaacademica/curso.action';
import ListadoCursoModal from '../curso/modal/curso_listado.modal';
 
function IndexCierreCurso(props) {
    const { curso } = props;
    const navigate = useNavigate();

    const [ visibleCurso, setVisibleCurso ] = React.useState(false);

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin );
        return () => {};
    }, [] );

    const onLogin = () => {
        navigate( '/login' );
    };

    const onComponentCurso = () => {
        if ( !visibleCurso ) return null;
        return (
            <ListadoCursoModal
                visible={visibleCurso}
                onClose={ () => setVisibleCurso(false) }
                onSelect={ (cursoFirst) => {
                    props.setData(cursoFirst);
                    setVisibleCurso(false);
                } }
                valueSelect={curso?.idcurso}
            />
        );
    };

    return (
        <>
            { onComponentCurso() }
            <PaperComponent
                title={"Cierre de Curso"}
            >
                <CardComponent
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onCierre(curso) }
                            >
                                Cerrar Curso
                            </ButtonComponent>
                        </>
                    }
                >
                    <div className="row">
                        <div className="form-group col-2"></div>
                        <div className="form-group col-8">
                            <InputComponent
                                label="Curso*"
                                value={curso.descripcion}
                                onClick={ () => setVisibleCurso(true) }
                                error={curso.error.idcurso}
                                message={curso.message.idcurso}
                                style={{ background: 'white', cursor: 'pointer', }}
                                placeholder="SELECCIONAR CURSO"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4"></div>
                        <div className="form-group col-3">
                            <DatePickerComponent
                                label="Fecha Cierre*"
                                value={curso.fechaoperacion}
                                onChange={ (value) => props.setFechaOperacion(curso, value) }
                                error={curso.error.fechaoperacion}
                                message={curso.message.fechaoperacion}
                                placeholder="SELECCIONAR FECHA"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-12 pl-1">
                            <TextAreaComponent
                                label="Observaciones"
                                value={curso.observaciones}
                                onChange={ (value) => props.setObservacion(curso, value) }
                                rows={2}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
    curso: state.Curso,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onLimpiar: CursoActions.onLimpiar,
    setData: CursoActions.setShowData,
    setFechaOperacion: CursoActions.setFechaOperacion,
    setObservacion: CursoActions.setObservacion,
    onCierre: CursoActions.onCierre,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexCierreCurso);
