
import React from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { Button, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import DatePickerComponent from '../../../../components/date';
import InputFileComponent from '../../../../components/inputfile';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import { EstadoData } from '../../../../data/estado.data';
import { GeneroData } from '../../../../data/genero.data';
import { EstadoCivilData } from '../../../../data/estado_civil.data';
import { ConfirmacionData } from '../../../../data/confirmacion.data';
import ListadoCiudadModal from '../../parametro/ciudad/modal/ciudad_listado.modal';
import ListadoMateriaModal from '../../parametro/materia/modal/materia_listado.modal';
import ListadoCategoriaDocumentoModal from '../categoriadocumento/modal/categoria_documento_listado.modal';
import ListadoTipoIdentificacionModal from '../tipoidentificacion/modal/tipo_identificacion_listado.modal';
import ListadoNivelAcademicoModal from '../../parametro/nivelacademico/modal/nivel_academico_listado.modal';
import ListadoInstitucionModal from '../../estructurainstitucional/institucion/modal/institucion_listado.modal';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { DocenteActions } from '../../../../redux/actions/persona/docente.action';

function CreateDocente( props ) {
    const { docente } = props;
    const navigate = useNavigate();

    const [ visibleTipoIdentificacion, setVisibleTipoIdentificacion ] = React.useState(false);
    const [ visibleCiudadNacimiento, setVisibleCiudadNacimiento ] = React.useState(false);
    const [ visibleCiudadResidencia, setVisibleCiudadResidencia ] = React.useState(false);

    const [ indexDetailsNacionalidad, setIndexDestailsNacionalidad ] = React.useState(-1);
    const [ visibleNacionalidad, setVisibleNacionalidad ] = React.useState(false);

    const [ indexDetailsMateria, setIndexDestailsMateria ] = React.useState(-1);
    const [ visibleMateria, setVisibleMateria ] = React.useState(false);

    const [ indexDetailsCategoriaDocumento, setIndexDestailsCategoriaDocumento ] = React.useState(-1);
    const [ visibleCategoriaDocumento, setVisibleCategoriaDocumento ] = React.useState(false);

    const [ indexDetailsInstitucion, setIndexDestailsInstitucion ] = React.useState(-1);
    const [ visibleInstitucion, setVisibleInstitucion ] = React.useState(false);

    const [ indexDetailsNivelAcademico, setIndexDestailsNivelAcademico ] = React.useState(-1);
    const [ visibleNivelAcademico, setVisibleNivelAcademico ] = React.useState(false);

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

    const onComponentTipoIdentificacion = () => {
        if ( !visibleTipoIdentificacion ) return null;
        return (
            <ListadoTipoIdentificacionModal
                visible={visibleTipoIdentificacion}
                onClose={ () => setVisibleTipoIdentificacion(false) }
                onSelect={ (tipoIdentificacion) => {
                    props.setFKIDTipoIdentificacion(docente, tipoIdentificacion);
                    setVisibleTipoIdentificacion(false);
                } }
            />
        );
    };

    const onComponentCiudadNacimiento = () => {
        if ( !visibleCiudadNacimiento ) return null;
        return (
            <ListadoCiudadModal
                visible={visibleCiudadNacimiento}
                onClose={ () => setVisibleCiudadNacimiento(false) }
                onSelect={ (ciudad) => {
                    props.setFKIDCiudadNacimiento(docente, ciudad);
                    setVisibleCiudadNacimiento(false);
                } }
            />
        );
    };

    const onComponentCiudadResidencia = () => {
        if ( !visibleCiudadResidencia ) return null;
        return (
            <ListadoCiudadModal
                visible={visibleCiudadResidencia}
                onClose={ () => setVisibleCiudadResidencia(false) }
                onSelect={ (ciudad) => {
                    props.setFKIDCiudadResidencia(docente, ciudad);
                    setVisibleCiudadResidencia(false);
                } }
            />
        );
    };

    const existNacionalidad = ( idciudad ) => {
        for (let index = 0; index < docente.arraynacionalidad.length; index++) {
            const element = docente.arraynacionalidad[index];
            if ( element.fkidnacionalidad === idciudad ) return true;
        }
        return false;
    };

    const onComponentNacionalidadDetalle = () => {
        if ( !visibleNacionalidad ) return null;
        return (
            <ListadoCiudadModal
                fkidpadre={true}
                visible={visibleNacionalidad}
                onClose={ () => setVisibleNacionalidad(false) }
                onSelect={ (ciudad) => {
                    if ( !existNacionalidad( ciudad.idciudad ) ) {
                        let detalle = docente.arraynacionalidad[indexDetailsNacionalidad];
                        detalle.fkidnacionalidad = ciudad.idciudad;
                        detalle.nacionalidad = ciudad.descripcion;
                        props.onChange(docente);
                        setVisibleNacionalidad(false);
                    } else {
                        toastr.warning( 'Nacionalidad ya seleccionado.', '', { closeButton: true, progressBar: true, } );
                    }
                } }
            />
        );
    };

    const existMateria = ( idmateria ) => {
        for (let index = 0; index < docente.arraymateria.length; index++) {
            const element = docente.arraymateria[index];
            if ( element.fkidmateria === idmateria ) return true;
        }
        return false;
    };

    const onComponentMateriaDetalle = () => {
        if ( !visibleMateria ) return null;
        return (
            <ListadoMateriaModal
                visible={visibleMateria}
                onClose={ () => setVisibleMateria(false) }
                onSelect={ (materia) => {
                    if ( !existMateria( materia.idmateria ) ) {
                        let detalle = docente.arraymateria[indexDetailsMateria];
                        detalle.fkidmateria = materia.idmateria;
                        detalle.materia = materia.nombrelargo;
                        props.onChange(docente);
                        setVisibleMateria(false);
                    } else {
                        toastr.warning( 'Materia ya seleccionado.', '', { closeButton: true, progressBar: true, } );
                    }
                } }
            />
        );
    };

    const onComponentCategoriaDocumentoDetalle = () => {
        if ( !visibleCategoriaDocumento ) return null;
        return (
            <ListadoCategoriaDocumentoModal
                visible={visibleCategoriaDocumento}
                onClose={ () => setVisibleCategoriaDocumento(false) }
                onSelect={ (categoriaDocumento) => {
                    let detalle = docente.arraycategoriadocumento[indexDetailsCategoriaDocumento];
                    detalle.fkidcategoriadocumento = categoriaDocumento.idcategoriadocumento;
                    detalle.categoriadocumento = categoriaDocumento.descripcion;
                    props.onChange(docente);
                    setVisibleCategoriaDocumento(false);
                } }
            />
        );
    };

    const onComponentInstitucionDetalle = () => {
        if ( !visibleInstitucion ) return null;
        return (
            <ListadoInstitucionModal
                visible={visibleInstitucion}
                onClose={ () => setVisibleInstitucion(false) }
                onSelect={ (institucion) => {
                    let detalle = docente.arrayestudio[indexDetailsInstitucion];
                    detalle.fkidinstitucion = institucion.idinstitucion;
                    detalle.institucion = institucion.descripcion;
                    props.onChange(docente);
                    setVisibleInstitucion(false);
                } }
            />
        );
    };

    const onComponentNivelAcademicoDetalle = () => {
        if ( !visibleNivelAcademico ) return null;
        return (
            <ListadoNivelAcademicoModal
                visible={visibleNivelAcademico}
                onClose={ () => setVisibleNivelAcademico(false) }
                onSelect={ (nivelAcademico) => {
                    let detalle = docente.arrayestudio[indexDetailsNivelAcademico];
                    detalle.fkidnivelacademico = nivelAcademico.idnivelacademico;
                    detalle.nivelacademico = nivelAcademico.descripcion;
                    props.onChange(docente);
                    setVisibleNivelAcademico(false);
                } }
            />
        );
    };

    return (
        <>
            { onComponentTipoIdentificacion() }
            { onComponentCiudadNacimiento() }
            { onComponentCiudadResidencia() }
            { onComponentNacionalidadDetalle() }
            { onComponentMateriaDetalle() }
            { onComponentCategoriaDocumentoDetalle() }
            { onComponentInstitucionDetalle() }
            { onComponentNivelAcademicoDetalle() }
            <PaperComponent>
                <CardComponent
                    header={"Nuevo Docente"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(docente, onBack) }
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
                        <li className="nav-item">
                            <a className="nav-link" id="estudio-tab" data-toggle="tab" href="#estudio" 
                                role="tab" aria-controls="estudio" aria-selected="false"
                            >
                                Estudios
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="asignaturaespecialidad-tab" data-toggle="tab" href="#asignaturaespecialidad" 
                                role="tab" aria-controls="asignaturaespecialidad" aria-selected="false"
                            >
                                Asignatura de Especialidad
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="documentodigital-tab" data-toggle="tab" href="#documentodigital" 
                                role="tab" aria-controls="documentodigital" aria-selected="false"
                            >
                                Documento Digital
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade pt-4 active show" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="row">
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Nombre Principal*"
                                        value={docente.nombreprincipal}
                                        onChange={ (value) => props.setNombrePrincipal(docente, value) }
                                        error={docente.error.nombreprincipal}
                                        message={docente.message.nombreprincipal}
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Nombre Adicional"
                                        value={docente.nombreadicional}
                                        onChange={ (value) => props.setNombreAdicional(docente, value) }
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Primer Apellido*"
                                        value={docente.apellidoprimero}
                                        onChange={ (value) => props.setApellidoPrimero(docente, value) }
                                        error={docente.error.apellidoprimero}
                                        message={docente.message.apellidoprimero}
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Segundo Apellido"
                                        value={docente.apellidosegundo}
                                        onChange={ (value) => props.setApellidoSegundo(docente, value) }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Tipo Identificación*"
                                        value={docente.tipoidentificacion}
                                        onClick={ () => {
                                            setVisibleTipoIdentificacion(true);
                                        } }
                                        readOnly
                                        error={docente.error.fkidtipoidentificacion}
                                        message={docente.message.fkidtipoidentificacion}
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR TIPO IDENTIFICACIÓN"
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Nro. Identificación*"
                                        value={docente.numeroidentificacion}
                                        onChange={ (value) => props.setNumeroIdentificacion(docente, value) }
                                        error={docente.error.numeroidentificacion}
                                        message={docente.message.numeroidentificacion}
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <SelectComponent 
                                        data={GeneroData}
                                        label={"Género*"}
                                        value={docente.genero}
                                        onChange={ (value) => props.setGenero(docente, value) }
                                        error={docente.error.genero}
                                        message={docente.message.genero}
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <SelectComponent 
                                        data={EstadoCivilData}
                                        label={"Estado Civil*"}
                                        value={docente.estadocivil}
                                        onChange={ (value) => props.setEstadoCivil(docente, value) }
                                        error={docente.error.estadocivil}
                                        message={docente.message.estadocivil}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-5">
                                    <InputComponent
                                        label="Lugar de Nacimiento*"
                                        value={docente.ciudadnacimiento}
                                        onClick={ () => setVisibleCiudadNacimiento(true) }
                                        error={docente.error.fkidciudadnacimiento}
                                        message={docente.message.fkidciudadnacimiento}
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR LUGAR DE NACIMIENTO"
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-5">
                                    <InputComponent
                                        label="Residencia*"
                                        value={docente.ciudadresidencia}
                                        onClick={ () => setVisibleCiudadResidencia(true) }
                                        error={docente.error.fkidciudadresidencia}
                                        message={docente.message.fkidciudadresidencia}
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR RESIDENCIA"
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-2">
                                    <DatePickerComponent
                                        label="Nacimiento*"
                                        value={docente.fechanacimiento}
                                        onChange={ (value) => props.setFechaNacimiento(docente, value) }
                                        error={docente.error.fechanacimiento}
                                        message={docente.message.fechanacimiento}
                                        placeholder="SELECCIONAR FECHA NACIMIENTO"
                                        disabledDateNowBack
                                    />
                                </div>
                            </div>
                            <div className='card p-0 m-0'>
                                <div className='card-header p-0'>
                                    <h4>Nacionalidades</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12">
                                    <ButtonComponent
                                        fullWidth
                                        onClick={props.onAddNacionalidad}
                                    >
                                        Agregar Nacionalidad
                                    </ButtonComponent>
                                </div>
                            </div>
                            { docente.arraynacionalidad.length === 0 &&
                                <div className='card p-0 m-0'>
                                    <div className='card-header'>
                                        <h4>Sin Nacionalidades</h4>
                                    </div>
                                </div>
                            }
                            <div className='row' style={{ maxHeight: 350, overflowY: 'auto', overflowX: 'hidden', }}>
                                { docente.arraynacionalidad.map( ( item, key ) => {
                                    return (
                                        <div className="form-group col-4" key={key}>
                                            <InputComponent
                                                label={`Nacionalidad ${key + 1}`}
                                                value={item.nacionalidad}
                                                onClick={ () => {
                                                    setIndexDestailsNacionalidad(key);
                                                    setVisibleNacionalidad(true);
                                                } }
                                                readOnly
                                                style={{ background: 'white', cursor: 'pointer', }}
                                                placeholder="SELECCIONAR NACIONALIDAD"
                                                close
                                                onClose={ () => props.onDeleteNacionalidad(key) }
                                            />
                                        </div>
                                    );
                                } ) }
                            </div>
                            <div className="row">
                                <div className="form-group col-6">
                                    <InputComponent
                                        label="Email"
                                        value={docente.email}
                                        onChange={ (value) => props.setEmail(docente, value) }
                                        error={docente.error.email}
                                        message={docente.message.email}
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Télefono"
                                        value={docente.telefono}
                                        onChange={ (value) => props.setTelefono(docente, value) }
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Celular"
                                        value={docente.celular}
                                        onChange={ (value) => props.setCelular(docente, value) }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12">
                                    <InputComponent
                                        label="Dirección"
                                        value={docente.direccion}
                                        onChange={ (value) => props.setDireccion(docente, value) }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-6">
                                    <InputComponent
                                        label="Barrio"
                                        value={docente.barrio}
                                        onChange={ (value) => props.setBarrio(docente, value) }
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Manzano"
                                        value={docente.manzano}
                                        onChange={ (value) => props.setManzano(docente, value) }
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="UV"
                                        value={docente.uv}
                                        onChange={ (value) => props.setUV(docente, value) }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade pt-4" id="estudio" role="tabpanel" aria-labelledby="estudio-tab">
                            <div className="row">
                                <div className="form-group col-12">
                                    <ButtonComponent
                                        fullWidth
                                        onClick={props.onAddRowEstudio}
                                    >
                                        Agregar
                                    </ButtonComponent>
                                </div>
                            </div>
                            { docente.arrayestudio.length === 0 &&
                                <div className='card p-0 m-0'>
                                    <div className='card-header'>
                                        <h4>Sin Información</h4>
                                    </div>
                                </div>
                            }
                            <div style={{ minWidth: '100%', width: '100%', maxWidth: '100%', maxHeight: 650, overflowY: 'auto', overflowX: 'hidden', }}>
                                <div className="row">
                                    { docente.arrayestudio.map( ( item, key ) => {
                                        return (
                                            <div className="col-12 col-sm-6 col-md-4 col-lg-4" key={key}>
                                                <div className="card card-sm position-relative card-success">
                                                    <i className="card-icon text-danger ion ion-ios-paper-outline"
                                                        style={ { position: 'absolute', left: -20, top: -28, } }
                                                    ></i>
                                                    <div className="card-options dropdown">
                                                        <CloseOutlined
                                                            style={ {
                                                                padding: 4, borderRadius: 50, background: 'white', 
                                                                fontSize: 12, fontWeight: 'bold', boxShadow: '0 0 5px 0 #222',
                                                                position: 'relative', top: -8, left: 8, cursor: 'pointer',
                                                            } }
                                                            onClick={() => {
                                                                props.onDeleteRowEstudio(key);
                                                            } }
                                                        />
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="form-group col-12 pl-1">
                                                            <InputComponent
                                                                label="Institución"
                                                                value={item.institucion}
                                                                onClick={ () => {
                                                                    setIndexDestailsInstitucion(key);
                                                                    setVisibleInstitucion(true);
                                                                } }
                                                                readOnly
                                                                style={{ background: 'white', cursor: 'pointer', }}
                                                                placeholder="SELECCIONAR INSTITUCIÓN"
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 pl-1">
                                                            <InputComponent
                                                                label="Nivel Academico"
                                                                value={item.nivelacademico}
                                                                onClick={ () => {
                                                                    setIndexDestailsNivelAcademico(key);
                                                                    setVisibleNivelAcademico(true);
                                                                } }
                                                                readOnly
                                                                style={{ background: 'white', cursor: 'pointer', }}
                                                                placeholder="SELECCIONAR NIVEL ACADEMICO"
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 pl-1">
                                                            <InputComponent
                                                                label="Nombre de Título"
                                                                value={item.descripcion}
                                                                onChange={ (value) => {
                                                                    item.descripcion = value;
                                                                    props.onChange(docente);
                                                                } }
                                                                readOnly={ (item.fkidinstitucion === null && item.fkidnivelacademico === null) }
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 pl-1">
                                                            <SelectComponent 
                                                                data={ConfirmacionData}
                                                                label={"Es Graduado"}
                                                                value={item.estado}
                                                                onChange={ (value) => {
                                                                    item.estado = value;
                                                                    props.onChange(docente);
                                                                } }
                                                                disabledDefault={true}
                                                                disabled={ (item.fkidinstitucion === null && item.fkidnivelacademico === null) }
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 pl-1">
                                                            <InputComponent
                                                                label="Año Cursado"
                                                                value={item.ultimoyearcursado}
                                                                onChange={ (value) => {
                                                                    if ( value === "" ) value = 0;
                                                                    if ( !isNaN( value ) ) {
                                                                        if ( parseInt( value ) >= 0 ) {
                                                                            item.ultimoyearcursado = parseInt(value);
                                                                            props.onChange(docente);
                                                                        }
                                                                    }
                                                                } }
                                                                readOnly={ (item.fkidinstitucion === null && item.fkidnivelacademico === null) }
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 pl-1">
                                                            <SelectComponent 
                                                                data={EstadoData}
                                                                label={"Estado"}
                                                                value={item.estado}
                                                                onChange={ (value) => {
                                                                    item.estado = value;
                                                                    props.onChange(docente);
                                                                } }
                                                                disabledDefault={true}
                                                                disabled={ (item.fkidinstitucion === null && item.fkidnivelacademico === null) }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    } ) }
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade pt-4" id="asignaturaespecialidad" role="tabpanel" aria-labelledby="asignaturaespecialidad-tab">
                            <div className="row">
                                <div className="form-group col-12">
                                    <ButtonComponent
                                        fullWidth
                                        onClick={props.onAddRowMateria}
                                    >
                                        Agregar
                                    </ButtonComponent>
                                </div>
                            </div>
                            { docente.arraymateria.length === 0 &&
                                <div className='card p-0 m-0'>
                                    <div className='card-header'>
                                        <h4>Sin Documento Digital</h4>
                                    </div>
                                </div>
                            }
                            <div style={{ minWidth: '100%', width: '100%', maxWidth: '100%', maxHeight: 450, overflowY: 'auto', overflowX: 'hidden', }}>
                                { docente.arraymateria.map( ( item, key ) => {
                                    return (
                                        <div className="row" key={key} 
                                            style={{ 
                                                justifyContent: 'center', alignItems: 'center', 
                                                borderBottom: '1px solid #E8E8E8', 
                                            }}
                                        >
                                            <div className="form-group col-5">
                                                <InputComponent
                                                    label="Materia"
                                                    value={item.materia}
                                                    onClick={ () => {
                                                        setIndexDestailsMateria(key);
                                                        setVisibleMateria(true);
                                                    } }
                                                    readOnly
                                                    style={{ background: 'white', cursor: 'pointer', }}
                                                    placeholder="SELECCIONAR MATERIA"
                                                />
                                            </div>
                                            <div className="form-group col-3">
                                                <InputComponent
                                                    label="Tipo Prioridad"
                                                    value={item.tipoprioridad}
                                                    onChange={ (value) => {
                                                        item.tipoprioridad = value;
                                                        props.onChange(docente);
                                                    } }
                                                    readOnly={ (item.fkidmateria === null) }
                                                />
                                            </div>
                                            <div className="form-group col-3">
                                                <SelectComponent 
                                                    data={EstadoData}
                                                    label={"Estado"}
                                                    value={item.estado}
                                                    onChange={ (value) => {
                                                        item.estado = value;
                                                        props.onChange(docente);
                                                    } }
                                                    disabled={ (item.fkidmateria === null) }
                                                />
                                            </div>
                                            <div className="form-group col-1 pt-4">
                                                <Tooltip placement="top" title={"Eliminar"}>
                                                    <Button 
                                                        onClick={() => {
                                                            props.onDeleteRowMateria(key);
                                                        } }
                                                        size={"small"}
                                                        style={{ position: 'relative', right: 15, }}
                                                    >
                                                        <DeleteOutlined />
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    );
                                } ) }
                            </div>
                        </div>
                        <div className="tab-pane fade pt-4" id="documentodigital" role="tabpanel" aria-labelledby="documentodigital-tab">
                            <div className="row">
                                <div className="form-group col-12">
                                    <ButtonComponent
                                        fullWidth
                                        onClick={props.onAddRowCategoriaDocumento}
                                    >
                                        Agregar
                                    </ButtonComponent>
                                </div>
                            </div>
                            { docente.arraycategoriadocumento.length === 0 &&
                                <div className='card p-0 m-0'>
                                    <div className='card-header'>
                                        <h4>Sin Documento Digital</h4>
                                    </div>
                                </div>
                            }
                            <div style={{ minWidth: '100%', width: '100%', maxWidth: '100%', maxHeight: 450, overflowY: 'auto', overflowX: 'hidden', }}>
                                <div className="row">
                                    { docente.arraycategoriadocumento.map( ( item, key ) => {
                                        return (
                                            <div className="col-12 col-sm-6 col-md-4 col-lg-4" key={key}>
                                                <div className="card card-sm position-relative card-success">
                                                    <i className="card-icon text-danger ion ion-ios-paper-outline"
                                                        style={ { position: 'absolute', left: -20, top: -28, } }
                                                    ></i>
                                                    <div className="card-options dropdown">
                                                        <CloseOutlined
                                                            style={ {
                                                                padding: 4, borderRadius: 50, background: 'white', 
                                                                fontSize: 12, fontWeight: 'bold', boxShadow: '0 0 5px 0 #222',
                                                                position: 'relative', top: -8, left: 8, cursor: 'pointer',
                                                            } }
                                                            onClick={() => {
                                                                props.onDeleteRowCategoriaDocumento(key);
                                                            } }
                                                        />
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="form-group col-12 pl-1">
                                                            <InputComponent
                                                                label="Categoría"
                                                                value={item.categoriadocumento}
                                                                onClick={ () => {
                                                                    setIndexDestailsCategoriaDocumento(key);
                                                                    setVisibleCategoriaDocumento(true);
                                                                } }
                                                                readOnly
                                                                style={{ background: 'white', cursor: 'pointer', }}
                                                                placeholder="SELECCIONAR CATEGORÍA"
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 pl-1">
                                                            <InputComponent
                                                                label="Nombre Documento"
                                                                value={item.descripcion}
                                                                onChange={ (value) => {
                                                                    item.descripcion = value;
                                                                    props.onChange(docente);
                                                                } }
                                                                readOnly={ (item.fkidcategoriadocumento === null) }
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 pl-1">
                                                            <SelectComponent 
                                                                data={EstadoData}
                                                                label={"Estado"}
                                                                value={item.estado}
                                                                onChange={ (value) => {
                                                                    item.estado = value;
                                                                    props.onChange(docente);
                                                                } }
                                                                disabledDefault={true}
                                                                disabled={ (item.fkidcategoriadocumento === null) }
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 pl-1">
                                                            <InputFileComponent
                                                                label="Eligir Documento"
                                                                id={`docente-document-details-${key}`}
                                                                onChange={ (document) => {
                                                                    item.documento = document;
                                                                    props.onChange(docente);
                                                                } }
                                                                documento={item.documento}
                                                                disabled={ (item.fkidcategoriadocumento === null) }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    } ) }
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    docente: state.Docente,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onCreate: DocenteActions.onCreate,
    onLimpiar: DocenteActions.onLimpiar,
    onChange: DocenteActions.onChange,
    onAddNacionalidad: DocenteActions.onAddNacionalidad,
    onDeleteNacionalidad: DocenteActions.onDeleteNacionalidad,
    onAddRowMateria: DocenteActions.onAddRowMateria,
    onDeleteRowMateria: DocenteActions.onDeleteRowMateria,
    onAddRowCategoriaDocumento: DocenteActions.onAddRowCategoriaDocumento,
    onDeleteRowCategoriaDocumento: DocenteActions.onDeleteRowCategoriaDocumento,
    onAddRowEstudio: DocenteActions.onAddRowEstudio,
    onDeleteRowEstudio: DocenteActions.onDeleteRowEstudio,
    setNombrePrincipal: DocenteActions.setNombrePrincipal,
    setNombreAdicional: DocenteActions.setNombreAdicional,
    setApellidoPrimero: DocenteActions.setApellidoPrimero,
    setApellidoSegundo: DocenteActions.setApellidoSegundo,
    setFKIDTipoIdentificacion: DocenteActions.setFKIDTipoIdentificacion,
    setNumeroIdentificacion: DocenteActions.setNumeroIdentificacion,
    setFechaNacimiento: DocenteActions.setFechaNacimiento,
    setGenero: DocenteActions.setGenero,
    setEstadoCivil: DocenteActions.setEstadoCivil,
    setFKIDCiudadNacimiento: DocenteActions.setFKIDCiudadNacimiento,
    setFKIDCiudadResidencia: DocenteActions.setFKIDCiudadResidencia,
    setDireccion: DocenteActions.setDireccion,
    setBarrio: DocenteActions.setBarrio,
    setManzano: DocenteActions.setManzano,
    setUV: DocenteActions.setUV,
    setTelefono: DocenteActions.setTelefono,
    setCelular: DocenteActions.setCelular,
    setEmail: DocenteActions.setEmail,
    onStore: DocenteActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateDocente );
