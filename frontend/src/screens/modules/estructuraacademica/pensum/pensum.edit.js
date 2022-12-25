
import React from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import DatePickerComponent from '../../../../components/date';
import { ButtonComponent ,InputComponent, SelectComponent, TextAreaComponent } from '../../../../components/components';
import { EstadoData } from '../../../../data/estado.data';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { PensumActions } from '../../../../redux/actions/estructuraacademica/pensum.action';
import FormMateriaPensumModal from './modal/form_materia.modal';
import ListadoProgramaModal from '../programa/modal/programa_listado.modal';
import ListadoDivisionAcademicaModal from '../../estructurainstitucional/divisionacademica/modal/division-academica_listado.modal';

function EditPensum( props ) {
    const { pensum } = props;
    const navigate = useNavigate();
    const params = useParams();
    
    const [ visiblePrograma, setVisiblePrograma ] = React.useState(false);
    const [ visibleDivisionAcademica, setVisibleDivisionAcademica ] = React.useState(false);

    const [ indexDetailsFormMateria, setIndexDestailsFormMateria ] = React.useState(-1);
    const [ visibleFormMateriaDetalle, setVisibleFormMateriaDetalle ] = React.useState(false);

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onEdit( params.idpensum );
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
    }

    function onComponentPrograma() {
        if ( !visiblePrograma ) return null;
        return (
            <ListadoProgramaModal
                visible={visiblePrograma}
                onClose={ () => setVisiblePrograma(false) }
                onSelect={ (programa) => {
                    props.setFKIDPrograma(pensum, programa);
                    setVisiblePrograma(false);
                } }
                valueSelect={pensum?.fkidprograma}
            />
        );
    };

    const existDivisionAcademica = (iddivisionacademica) => {
        for (let index = 0; index < pensum.arraydivisionacademica?.length; index++) {
            const element = pensum.arraydivisionacademica[index];
            if ( element.divisionacademica.iddivisionacademica === iddivisionacademica ) return true;
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
                        props.onAddRowDivisionAcademica(divisionAcademica);
                        setVisibleDivisionAcademica(false);
                    } else {
                        toastr.warning( 'División Academica ya seleccionado.', '', { closeButton: true, progressBar: true, } );
                    }
                } }
            />
        );
    };

    const onComponentFormMateria = () => {
        if ( !visibleFormMateriaDetalle ) return null;
        return (
            <FormMateriaPensumModal
                visible={visibleFormMateriaDetalle}
                onClose={ () => setVisibleFormMateriaDetalle(false) }
                onOk={ (materia) => {
                    props.onAddRowMateriaDetails( indexDetailsFormMateria, materia );
                    setVisibleFormMateriaDetalle(false);
                } }
                arraydivisionacademica={pensum.arraydivisionacademica}
            />
        );
    };

    return (
        <>
            { onComponentPrograma() }
            { onComponentDivisionAcademica() }
            { onComponentFormMateria() }
            <PaperComponent>
                <CardComponent
                    header={"Editar Pensum"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(pensum, onBack) }
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
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active show" id="home-tab" 
                                data-toggle="tab" href="#home" role="tab" 
                                aria-controls="home" aria-selected="true"
                            >
                                Información General
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="mallacurricular-tab" data-toggle="tab" href="#mallacurricular" 
                                role="tab" aria-controls="mallacurricular" aria-selected="false"
                            >
                                Adicionar Materias
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade pt-4 active show" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="row">
                                <div className="form-group col-1"></div>
                                <div className="form-group col-3">
                                    <DatePickerComponent
                                        label="Fecha Aprobación*"
                                        value={pensum.fechaaprobacion}
                                        onChange={ (value) => props.setFechaAprobacion(pensum, value) }
                                        error={pensum.error.fechaaprobacion}
                                        message={pensum.message.fechaaprobacion}
                                        placeholder="SELECCIONAR FECHA"
                                    />
                                </div>
                                <div className="form-group col-7">
                                    <InputComponent
                                        label="Nombre de Pensum*"
                                        value={pensum.descripcion}
                                        onChange={ (value) => props.setDescripcion(pensum, value) }
                                        error={pensum.error.descripcion}
                                        message={pensum.message.descripcion}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12">
                                    <TextAreaComponent 
                                        label="Nota"
                                        value={pensum.nota}
                                        onChange={ (value) => props.setNota(pensum, value) }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12">
                                    <InputComponent
                                        label="Nombre de Programa*"
                                        value={pensum.programa}
                                        onClick={ () => setVisiblePrograma(true) }
                                        error={pensum.error.fkidprograma}
                                        message={pensum.message.fkidprograma}
                                        readOnly
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR PROGRAMA"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Unidad Academica"
                                        value={pensum.unidadacademica}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Unidad Negocio"
                                        value={pensum.unidadnegocio}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Unidad Administrativa"
                                        value={pensum.unidadadministrativa}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-2"></div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Estado Proceso"
                                        value={pensum.estadoproceso}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <SelectComponent 
                                        data={EstadoData}
                                        label={"Estado*"}
                                        value={pensum.estado}
                                        onChange={ (value) => props.setEstado(pensum, value) }
                                        error={pensum.error.estado}
                                        message={pensum.message.estado}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade pt-4" id="mallacurricular" role="tabpanel" aria-labelledby="mallacurricular-tab">
                            <div className="row">
                                <div className="form-group col-12">
                                    <ButtonComponent
                                        fullWidth
                                        onClick={ () => setVisibleDivisionAcademica(true) }
                                    >
                                        Agregar División Academica
                                    </ButtonComponent>
                                </div>
                            </div>
                            <div className="row">
                                { pensum.arraydivisionacademica?.map( ( item, key ) => {
                                    const last = pensum.arraydivisionacademica.length - 1 - key;
                                    const arrayMateria = pensum.arraydivisionacademica[last].arraymateria;
                                    const element = pensum.arraydivisionacademica[last];
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
                                                            props.onDeleteRowDivisionAcademica(last);
                                                        } }
                                                    />
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="form-group col-1">
                                                            <div
                                                                style={ {
                                                                    width: 20, writingMode: 'vertical-lr',
                                                                    transform: 'rotate(180deg)',
                                                                    textAlign: 'center', fontSize: 15,
                                                                } }
                                                            >
                                                                { element.divisionacademica.descripcion }
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
                                                                                        width: 240, display: 'inline-block', 
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
                                                                                                props.onDeleteRowMateriaDetails(last, index);
                                                                                            } }
                                                                                        />
                                                                                    </div>
                                                                                    <div className="card-header pb-2">
                                                                                        <h4 className='text-primary'> 
                                                                                            {" "} 
                                                                                        </h4>
                                                                                    </div>
                                                                                    <div className="card-header pt-2 pb-2 border-success">
                                                                                        <h4 style={{ display: 'block', whiteSpace: 'initial', fontSize: 9, }}> 
                                                                                            <span className='text-danger'>TIPO MATERIA: </span>
                                                                                            {detalle.tipomateria.descripcion} 
                                                                                        </h4>
                                                                                    </div>
                                                                                    <div className="card-header pt-2 pb-2 border-success">
                                                                                        <h4 style={{ display: 'block', whiteSpace: 'initial', fontSize: 9, }}> 
                                                                                            <span className='text-danger'>CÓDIGO: </span>
                                                                                            {detalle.materia.codigo} 
                                                                                        </h4>
                                                                                    </div>
                                                                                    <div className="card-header pt-2 pb-2 border-success">
                                                                                        <h4 style={{ display: 'block', whiteSpace: 'initial', fontSize: 9, }}> 
                                                                                            <span className='text-danger'>SIGLA: </span>
                                                                                            {detalle.materia.sigla} 
                                                                                        </h4>
                                                                                    </div>
                                                                                    <div className="card-header pt-2 pb-2">
                                                                                        <h4 style={{ display: 'block', whiteSpace: 'initial', fontSize: 9, }}> 
                                                                                            <span className='text-danger'>MATERIA: </span>
                                                                                            {detalle.materia.nombrelargo} 
                                                                                        </h4>
                                                                                    </div>
                                                                                    <div className="card-header pt-2 pb-2">
                                                                                        <h4 style={{ display: 'block', whiteSpace: 'initial', fontSize: 9, }}> 
                                                                                            <span className='float-left'>
                                                                                                <span className='text-danger'>NOTA MIN.: </span>
                                                                                                {detalle.notaminima} 
                                                                                            </span>
                                                                                            <span className='float-right'>
                                                                                                <span className='text-danger'>NOTA MAX.: </span>
                                                                                                {detalle.notamaxima} 
                                                                                            </span>
                                                                                        </h4>
                                                                                    </div>
                                                                                    <div className="card-header pt-2 pb-2">
                                                                                        <h4 style={{ display: 'block', whiteSpace: 'initial', fontSize: 9, }}> 
                                                                                            <span className='float-left'>
                                                                                                <span className='text-danger'>H. T.: </span>
                                                                                                {detalle.horateorica} 
                                                                                            </span>
                                                                                            <span className='float-right'>
                                                                                                <span className='text-danger'>H. P.: </span>
                                                                                                {detalle.horapractica} 
                                                                                            </span>
                                                                                        </h4>
                                                                                    </div>
                                                                                    <div className="card-header pt-2 pb-2">
                                                                                        <h4 style={{ display: 'block', whiteSpace: 'initial', fontSize: 9, }}> 
                                                                                            <span className='float-left'>
                                                                                                <span className='text-danger'>H. S.: </span>
                                                                                                {detalle.horasociales} 
                                                                                            </span>
                                                                                            <span className='float-right'>
                                                                                                <span className='text-danger'>CUPO.: </span>
                                                                                                {detalle.cuporequerido} 
                                                                                            </span>
                                                                                        </h4>
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
                                                                    setIndexDestailsFormMateria(last);
                                                                    setVisibleFormMateriaDetalle(true);
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
    pensum: state.Pensum,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onEdit: PensumActions.onEdit,
    onLimpiar: PensumActions.onLimpiar,
    setDescripcion: PensumActions.setDescripcion,
    setFechaAprobacion: PensumActions.setFechaAprobacion,
    setNota: PensumActions.setNota,
    setFKIDPrograma: PensumActions.setFKIDPrograma,
    setEstado: PensumActions.setEstado,
    onUpdate: PensumActions.onUpdate,
    onAddRowDivisionAcademica: PensumActions.onAddRowDivisionAcademica,
    onDeleteRowDivisionAcademica: PensumActions.onDeleteRowDivisionAcademica,
    onAddRowMateriaDetails: PensumActions.onAddRowMateriaDetails,
    onDeleteRowMateriaDetails: PensumActions.onDeleteRowMateriaDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditPensum );
