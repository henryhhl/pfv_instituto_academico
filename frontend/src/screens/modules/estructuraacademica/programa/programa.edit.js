
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { EstadoData } from '../../../../data/estado.data';
import { ProgramaActions } from '../../../../redux/actions/estructuraacademica/programa.action';
import ListadoModalidadAcademicaModal from '../../admin/modalidad/modal/modalidad_academica_listado.modal';
import ListadoNivelAcademicoModal from '../../admin/nivelacademico/modal/nivel_academico_listado.modal';
import ListadoUnidadAcademicaModal from '../unidadacademica/modal/unidad_academica_listado.modal';

function EditPrograma( props ) {
    const { programa } = props;
    const navigate = useNavigate();
    const params = useParams();
    const [ visibleUnidadAcademica, setVisibleUnidadAcademica ] = React.useState( false );
    const [ visibleNivelAcademico, setVisibleNivelAcademico ] = React.useState( false );
    const [ visibleModalidadAcademica, setVisibleModalidadAcademica ] = React.useState( false );

    React.useEffect( () => {
        props.onEdit( params.idprograma );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    function onComponentUnidadAcademica() {
        if ( !visibleUnidadAcademica ) return null;
        return (
            <ListadoUnidadAcademicaModal
                visible={visibleUnidadAcademica}
                onClose={ () => setVisibleUnidadAcademica(false) }
                onSelect={ (unidadAcademica) => {
                    props.setFKIDUnidadAcademica(programa, unidadAcademica);
                    setVisibleUnidadAcademica(false);
                } }
            />
        );
    };

    function onComponentNivelAcademico() {
        if ( !visibleNivelAcademico ) return null;
        return (
            <ListadoNivelAcademicoModal
                visible={visibleNivelAcademico}
                onClose={ () => setVisibleNivelAcademico(false) }
                onSelect={ (nivelAcademico) => {
                    props.setFKIDNivelAcademico(programa, nivelAcademico);
                    setVisibleNivelAcademico(false);
                } }
            />
        );
    };

    function onComponentmodalidadAcademica() {
        if ( !visibleModalidadAcademica ) return null;
        return (
            <ListadoModalidadAcademicaModal
                visible={visibleModalidadAcademica}
                onClose={ () => setVisibleModalidadAcademica(false) }
                onSelect={ (modalidadAcademica) => {
                    props.setFKIDModalidadAcademica(programa, modalidadAcademica);
                    setVisibleModalidadAcademica(false);
                } }
            />
        );
    };

    return (
        <>
            { onComponentUnidadAcademica() }
            { onComponentNivelAcademico() }
            { onComponentmodalidadAcademica() }
            <PaperComponent>
                <CardComponent
                    header={"Nuevo Programa"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(programa, onBack) }
                            >
                                Editar
                            </ButtonComponent>
                            <ButtonComponent
                                type='danger' onClick={onBack}
                            >
                                Cancelar
                            </ButtonComponent>
                        </>
                    }
                >
                    <div className="row">
                        <div className="form-group col-2"></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Código"
                                value={programa.codigo}
                                onChange={ (value) => props.setCodigo(programa, value) }
                                error={programa.error.codigo}
                                message={programa.message.codigo}
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Sigla"
                                value={programa.sigla}
                                onChange={ (value) => props.setSigla(programa, value) }
                                error={programa.error.sigla}
                                message={programa.message.sigla}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-12">
                            <InputComponent
                                label="Nombre de Programa"
                                value={programa.descripcion}
                                onChange={ (value) => props.setDescripcion(programa, value) }
                                error={programa.error.descripcion}
                                message={programa.message.descripcion}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4">
                            <InputComponent
                                label="Unidad Academica"
                                value={programa.unidadacademica}
                                onClick={ () => setVisibleUnidadAcademica(true) }
                                error={programa.error.fkidunidadacademica}
                                message={programa.message.fkidunidadacademica}
                                readOnly
                                style={{ background: 'white', cursor: 'pointer', }}
                                placeholder="SELECCIONAR UNIDAD ACADEMICA"
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Unidad Administrativa"
                                value={programa.unidadadministrativa}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Unidad Negocio"
                                value={programa.unidadnegocio}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-2"></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Nivel Academico"
                                value={programa.nivelacademico}
                                onClick={ () => setVisibleNivelAcademico(true) }
                                error={programa.error.fkidnivelacademico}
                                message={programa.message.fkidnivelacademico}
                                readOnly
                                style={{ background: 'white', cursor: 'pointer', }}
                                placeholder="SELECCIONAR NIVEL ACADEMICO"
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Modalidad Academica"
                                value={programa.modalidadacademica}
                                onClick={ () => setVisibleModalidadAcademica(true) }
                                error={programa.error.fkidmodalidadacademica}
                                message={programa.message.fkidmodalidadacademica}
                                readOnly
                                style={{ background: 'white', cursor: 'pointer', }}
                                placeholder="SELECCIONAR MODALIDAD ACADEMICA"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4"></div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado"}
                                value={programa.estado}
                                onChange={ (value) => props.setEstado(programa, value) }
                                error={programa.error.estado}
                                message={programa.message.estado}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    programa: state.Programa,
} );

const mapDispatchToProps = {
    onEdit: ProgramaActions.onEdit,
    onLimpiar: ProgramaActions.onLimpiar,
    setCodigo: ProgramaActions.setCodigo,
    setSigla: ProgramaActions.setSigla,
    setDescripcion: ProgramaActions.setDescripcion,
    setFKIDUnidadAcademica: ProgramaActions.setFKIDUnidadAcademica,
    setFKIDNivelAcademico: ProgramaActions.setFKIDNivelAcademico,
    setFKIDModalidadAcademica: ProgramaActions.setFKIDModalidadAcademica,
    setEstado: ProgramaActions.setEstado,
    onUpdate: ProgramaActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditPrograma );
