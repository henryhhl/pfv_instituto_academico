
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import InputComponent from '../../../../components/input';
import PaperComponent from '../../../../components/paper';
import SelectComponent from '../../../../components/select';
import ButtonComponent from '../../../../components/button';
import DatePickerComponent from '../../../../components/date';
import TextAreaComponent from '../../../../components/textarea';
import { TipoOperacionData } from '../../../../data/estado.data';
import ListadoCursoModal from '../curso/modal/curso_listado.modal';
import ListadoAdministrativoModal from '../../persona/administrativo/modal/administrativo_listado.modal';
import ListadoMotivoAperturaCierreCursoModal from '../motivoaperturacierrecurso/modal/motivoaperturacierrecurso_listado.modal';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { CursoActions } from '../../../../redux/actions/ofertaacademica/curso.action';
 
function IndexAperturaCierreCurso(props) {
    const { curso } = props;
    const navigate = useNavigate();

    const [ visibleCurso, setVisibleCurso ] = React.useState(false);
    const [ visibleMotivoAperturaCierre, setVisibleMotivoAperturaCierre ] = React.useState(false);
    const [ visibleAdministrativo, setVisibleAdministrativo ] = React.useState(false);

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
            />
        );
    };

    const onComponentMotivoAperturaCierre = () => {
        if ( !visibleMotivoAperturaCierre ) return null;
        return (
            <ListadoMotivoAperturaCierreCursoModal
                visible={visibleMotivoAperturaCierre}
                onClose={ () => setVisibleMotivoAperturaCierre(false) }
                onSelect={ (motivoAperturaCierre) => {
                    props.setFKIDMotivoAperturaCierre(curso, motivoAperturaCierre);
                    setVisibleMotivoAperturaCierre(false);
                } }
            />
        );
    };

    const onComponentAdministrativo = () => {
        if ( !visibleAdministrativo ) return null;
        return (
            <ListadoAdministrativoModal
                visible={visibleAdministrativo}
                onClose={ () => setVisibleAdministrativo(false) }
                onSelect={ (administrativo) => {
                    props.setFKIDAdminitrativo(curso, administrativo);
                    setVisibleAdministrativo(false);
                } }
            />
        );
    };

    return (
        <>
            { onComponentCurso() }
            { onComponentMotivoAperturaCierre() }
            { onComponentAdministrativo() }
            <PaperComponent
                title={"Apertura o Cierre de Curso"}
            >
                <CardComponent
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onAperturaCierre(curso) }
                            >
                                Aperturar o Cerrar Curso
                            </ButtonComponent>
                        </>
                    }
                >
                    <div className="row">
                        <div className="form-group col-4">
                            <InputComponent
                                label="Sigla"
                                value={curso.sigla}
                                readOnly
                            />
                        </div>
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
                        <div className="form-group col-6">
                            <InputComponent
                                label="Materia"
                                value={curso.materia}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Turno"
                                value={curso.turno}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Modalidad"
                                value={curso.modalidadacademica}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-3">
                            <SelectComponent 
                                data={TipoOperacionData}
                                label={"Tipo Operación*"}
                                value={curso.estadoproceso}
                                onChange={ (value) => props.setEstadoProceso(curso, value) }
                                error={curso.error.estadoproceso}
                                message={curso.message.estadoproceso}
                                disabledDefault
                            />
                        </div>
                        <div className="form-group col-6">
                            <InputComponent
                                label="Motivo Operación*"
                                value={curso.motivoaperturacierrecurso}
                                onClick={ () => setVisibleMotivoAperturaCierre(true) }
                                error={curso.error.fkidmotivoaperturacierrecurso}
                                message={curso.message.fkidmotivoaperturacierrecurso}
                                style={{ background: 'white', cursor: 'pointer', }}
                                placeholder="SELECCIONAR MOTIVO APERTURA O CIERRE"
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <DatePickerComponent
                                label="Fecha Operación*"
                                value={curso.fechaoperacion}
                                onChange={ (value) => props.setFechaOperacion(curso, value) }
                                error={curso.error.fechaoperacion}
                                message={curso.message.fechaoperacion}
                                placeholder="SELECCIONAR FECHA"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-8">
                            <InputComponent
                                label="Administrativo Autorizado*"
                                value={curso.administrativo}
                                onClick={ () => setVisibleAdministrativo(true) }
                                error={curso.error.fkidadministrativo}
                                message={curso.message.fkidadministrativo}
                                style={{ background: 'white', cursor: 'pointer', }}
                                placeholder="SELECCIONAR ADMINISTRATIVO"
                                readOnly
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
    setEstadoProceso: CursoActions.setEstadoProceso,
    setFKIDMotivoAperturaCierre: CursoActions.setFKIDMotivoAperturaCierre,
    setFechaOperacion: CursoActions.setFechaOperacion,
    setFKIDAdminitrativo: CursoActions.setFKIDAdminitrativo,
    setObservacion: CursoActions.setObservacion,
    setData: CursoActions.setShowData,
    onAperturaCierre: CursoActions.onAperturaCierre,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexAperturaCierreCurso);
