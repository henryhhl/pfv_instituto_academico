
import React from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { ProgramaActions } from '../../../../redux/actions/estructuraacademica/programa.action';
import ListadoMateriaModal from '../../parametro/materia/modal/materia_listado.modal';
import ListadoUnidadAcademicaModal from '../unidadacademica/modal/unidad_academica_listado.modal';
import ListadoNivelAcademicoModal from '../../parametro/nivelacademico/modal/nivel_academico_listado.modal';
import ListadoModalidadAcademicaModal from '../../parametro/modalidad/modal/modalidad_academica_listado.modal';
import ListadoDivisionAcademicaModal from '../../estructurainstitucional/divisionacademica/modal/division-academica_listado.modal';

function CreatePrograma( props ) {
    const { programa } = props;
    const navigate = useNavigate();
    const [ visibleUnidadAcademica, setVisibleUnidadAcademica ] = React.useState(false);
    const [ visibleNivelAcademico, setVisibleNivelAcademico ] = React.useState(false);
    const [ visibleModalidadAcademica, setVisibleModalidadAcademica ] = React.useState(false);
    const [ visibleDivisionAcademica, setVisibleDivisionAcademica ] = React.useState(false);

    const [ indexDetailsMateria, setIndexDestailsMateria ] = React.useState(-1);
    const [ visibleMateriaDetalle, setVisibleMateriaDetalle ] = React.useState(false);

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

    const onBack = () => {
        props.onLimpiar();
        navigate(-1);
    };

    const onComponentUnidadAcademica = () => {
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

    const onComponentNivelAcademico = () => {
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

    const onComponentModalidadAcademica = () => {
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

    const existDivisionAcademica = (iddivisionacademica) => {
        for (let index = 0; index < programa.arraymallacurricular?.length; index++) {
            const element = programa.arraymallacurricular[index];
            if ( element.fkiddivisionacademica === iddivisionacademica ) return true;
        }
        return false;
    };

    const onComponentDivisionAcademica = () => {
        if ( !visibleDivisionAcademica ) return null;
        return (
            <ListadoDivisionAcademicaModal
                visible={visibleDivisionAcademica}
                onClose={ () => setVisibleDivisionAcademica(false) }
                onSelect={ (divisionAcademica) => {
                    if ( !existDivisionAcademica(divisionAcademica.iddivisionacademica) ) {
                        props.setFKIDDivisionAcademica(programa, divisionAcademica);
                        setVisibleDivisionAcademica(false);
                    } else {
                        toastr.warning( 'División Academica ya seleccionado.', '', { closeButton: true, progressBar: true, } );
                    }
                } }
            />
        );
    };

    const existsMateriaDetails = ( idmateria ) => {
        for (let index = 0; index < programa.arraymallacurricular.length; index++) {
            const element = programa.arraymallacurricular[index];
            for (let pos = 0; pos < element.arraymateria.length; pos++) {
                const materia = element.arraymateria[pos];
                if ( materia.fkidmateria === idmateria ) return true;
            }
        }
        return false;
    };

    const onComponentMateria = () => {
        if ( !visibleMateriaDetalle ) return null;
        return (
            <ListadoMateriaModal
                visible={visibleMateriaDetalle}
                onClose={ () => setVisibleMateriaDetalle(false) }
                onSelect={ (materia) => {
                    if ( !existsMateriaDetails( materia.idmateria ) ) {
                        props.onAddRowMateriaDetails(indexDetailsMateria, materia);
                        setVisibleMateriaDetalle(false);
                    } else {
                        toastr.warning( 'Materia ya seleccionado.', '', { closeButton: true, progressBar: true, } );
                    }
                } }
            />
        );
    };

    return (
        <>
            { onComponentUnidadAcademica() }
            { onComponentNivelAcademico() }
            { onComponentModalidadAcademica() }
            { onComponentDivisionAcademica() }
            { onComponentMateria() }
            <PaperComponent>
                <CardComponent
                    header={"Nuevo Programa"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(programa, onBack) }
                            >
                                Guardar
                            </ButtonComponent>
                            <ButtonComponent
                                type='danger' onClick={onBack}
                            >
                                Cancelar
                            </ButtonComponent>
                        </>
                    }
                >
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active show" id="home-tab" 
                                data-toggle="tab" href="#home" role="tab" 
                                aria-controls="home" aria-selected="true"
                            >
                                Información General
                            </a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" id="mallacurricular-tab" data-toggle="tab" href="#mallacurricular" 
                                role="tab" aria-controls="mallacurricular" aria-selected="false"
                            >
                                Malla Curricular
                            </a>
                        </li> */}
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade pt-4 active show" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="row">
                                <div className="form-group col-2"></div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Código*"
                                        value={programa.codigo}
                                        onChange={ (value) => props.setCodigo(programa, value) }
                                        error={programa.error.codigo}
                                        message={programa.message.codigo}
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Sigla*"
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
                                        label="Nombre de Programa*"
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
                                        label="Unidad Academica*"
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
                                        label="Nivel Academico*"
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
                                        label="Modalidad Academica*"
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
                        </div>
                        <div className="tab-pane fade pt-4" id="mallacurricular" role="tabpanel" aria-labelledby="mallacurricular-tab">
                            <div className="row">
                                <div className="form-group col-1"></div>
                                <div className="form-group col-6">
                                    <InputComponent
                                        label="División Academica"
                                        value={programa.divisionacademica}
                                        onClick={ () => setVisibleDivisionAcademica(true) }
                                        readOnly
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR DIVISION ACADEMICA"
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <ButtonComponent
                                        fullWidth
                                        onClick={ props.onAddRowMallaCurricular }
                                        style={{ position: 'relative', top: 30, }}
                                        disabled={ (programa.fkiddivisionacademica === "" || programa.fkiddivisionacademica === null) }
                                    >
                                        Agregar División Academica
                                    </ButtonComponent>
                                </div>
                            </div>
                            <div className="row">
                                { programa.arraymallacurricular?.map( ( item, key ) => {
                                    const indexMallaCurricular = programa.arraymallacurricular.length - 1 - key;
                                    const arrayMateria = programa.arraymallacurricular[indexMallaCurricular].arraymateria;
                                    const mallaCurricular = programa.arraymallacurricular[indexMallaCurricular];
                                    return (
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12" key={key}>
                                            <div className="card card-sm position-relative card-success" draggable>
                                                <div className="card-options dropdown">
                                                    <CloseOutlined
                                                        style={ {
                                                            padding: 4, borderRadius: 50, background: 'white', 
                                                            fontSize: 12, fontWeight: 'bold', boxShadow: '0 0 5px 0 #222',
                                                            position: 'relative', top: -8, left: 8, cursor: 'pointer',
                                                        } }
                                                        onClick={() => {
                                                            props.onDeleteRowMallaCurricular(indexMallaCurricular);
                                                        } }
                                                    />
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="form-group col-1">
                                                            <div
                                                                style={ {
                                                                    width: 20,
                                                                    writingMode: 'vertical-lr',
                                                                    transform: 'rotate(180deg)',
                                                                    textAlign: 'center',
                                                                    fontSize: 15,
                                                                } }
                                                            >
                                                                { mallaCurricular.divisionacademica }
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-11">
                                                            <div className="row">
                                                                <div className='col-12'>
                                                                    <div style={{ maxHeight: 300, width: '100%', overflowY: 'hidden', overflowX: 'auto', whiteSpace: 'nowrap', }}>
                                                                        { arrayMateria.map( (detalle, index) => {
                                                                            return (
                                                                                <div className="card p-2 card-primary mr-2" 
                                                                                    key={index} 
                                                                                    style={{ 
                                                                                        width: 200, display: 'inline-block', 
                                                                                        cursor: 'pointer', border: '2px solid #574B90',
                                                                                    }}
                                                                                    draggable
                                                                                >
                                                                                    <div className="card-options dropdown">
                                                                                        <CloseOutlined
                                                                                            style={ {
                                                                                                padding: 4, borderRadius: 50, background: 'white', 
                                                                                                fontSize: 12, fontWeight: 'bold', boxShadow: '0 0 5px 0 #222',
                                                                                                position: 'relative', top: -20, left: 20, cursor: 'pointer',
                                                                                            } }
                                                                                            onClick={ () => {
                                                                                                props.onDeleteRowMateriaDetails(indexMallaCurricular, index);
                                                                                            } }
                                                                                        />
                                                                                    </div>
                                                                                    <div className="card-header pb-2 border-success">
                                                                                        <h4 className='text-primary'> 
                                                                                            Materia 
                                                                                        </h4>
                                                                                    </div>
                                                                                    <div className="card-header pb-2 border-success">
                                                                                        <h4> 
                                                                                            <span className='text-danger'>SIGLA: </span>
                                                                                            {detalle.siglamateria} 
                                                                                        </h4>
                                                                                    </div>
                                                                                    <div className="card-header pt-2 pb-2">
                                                                                        <h4> {detalle.materia} </h4>
                                                                                    </div>
                                                                                </div>
                                                                            ); 
                                                                        } ) }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-12">
                                                            <ButtonComponent
                                                                fullWidth
                                                                onClick={ () => {
                                                                    setIndexDestailsMateria(indexMallaCurricular);
                                                                    setVisibleMateriaDetalle(true);
                                                                } }
                                                            >
                                                                Agregar Materia
                                                            </ButtonComponent>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                } ) }
                            </div>
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
    onValidateToken: AuthActions.onValidateToken,
    onCreate: ProgramaActions.onCreate,
    onLimpiar: ProgramaActions.onLimpiar,
    onChange: ProgramaActions.onChange,
    setCodigo: ProgramaActions.setCodigo,
    setSigla: ProgramaActions.setSigla,
    setDescripcion: ProgramaActions.setDescripcion,
    setFKIDUnidadAcademica: ProgramaActions.setFKIDUnidadAcademica,
    setFKIDNivelAcademico: ProgramaActions.setFKIDNivelAcademico,
    setFKIDModalidadAcademica: ProgramaActions.setFKIDModalidadAcademica,
    setFKIDDivisionAcademica: ProgramaActions.setFKIDDivisionAcademica,
    onAddRowMallaCurricular: ProgramaActions.onAddRowMallaCurricular,
    onDeleteRowMallaCurricular: ProgramaActions.onDeleteRowMallaCurricular,
    onAddRowMateriaDetails: ProgramaActions.onAddRowMateriaDetails,
    onDeleteRowMateriaDetails: ProgramaActions.onDeleteRowMateriaDetails,
    onStore: ProgramaActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreatePrograma );
