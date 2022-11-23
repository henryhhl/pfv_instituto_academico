
import React from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import DatePickerComponent from '../../../../components/date';
import InputFileComponent from '../../../../components/inputfile';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import { EstadoData } from '../../../../data/estado.data';
import { GeneroData } from '../../../../data/genero.data';
import { EstadoCivilData } from '../../../../data/estado_civil.data';
import { TipoEmpleadoData } from '../../../../data/tipo_empleado.data';
import { TipoFamiliarData } from '../../../../data/tipo_familiar.data';
import ListadoCiudadModal from '../../parametro/ciudad/modal/ciudad_listado.modal';
import ListadoTipoIdentificacionModal from '../tipoidentificacion/modal/tipo_identificacion_listado.modal';
import ListadoCategoriaDocumentoModal from '../categoriadocumento/modal/categoria_documento_listado.modal';
import ListadoNivelAcademicoModal from '../../parametro/nivelacademico/modal/nivel_academico_listado.modal';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { EstudianteActions } from '../../../../redux/actions/persona/estudiante.action';

function EditEstudiante( props ) {
    const { estudiante } = props;
    
    const navigate = useNavigate();
    const params = useParams();

    const [ visibleTipoIdentificacion, setVisibleTipoIdentificacion ] = React.useState(false);
    const [ visibleCiudadNacimiento, setVisibleCiudadNacimiento ] = React.useState(false);
    const [ visibleCiudadResidencia, setVisibleCiudadResidencia ] = React.useState(false);

    const [ indexDetailsNacionalidad, setIndexDestailsNacionalidad ] = React.useState(-1);
    const [ visibleNacionalidad, setVisibleNacionalidad ] = React.useState(false);

    const [ indexDetailsCategoriaDocumento, setIndexDestailsCategoriaDocumento ] = React.useState(-1);
    const [ visibleCategoriaDocumento, setVisibleCategoriaDocumento ] = React.useState(false);

    const [ indexDetailsTipoIdentificacionDetalle, setIndexDestailsTipoIdentificacionDetalle ] = React.useState(-1);
    const [ visibleTipoIdentificacionDetalle, setVisibleTipoIdentificacionDetalle ] = React.useState(false);

    const [ indexDetailsCiudadNacimientoDetalle, setIndexDestailsCiudadNacimientoDetalle ] = React.useState(-1);
    const [ visibleCiudadNacimientoDetalle, setVisibleCiudadNacimientoDetalle ] = React.useState(false);

    const [ indexDetailsCiudadResidenciaDetalle, setIndexDestailsCiudadResidenciaDetalle ] = React.useState(-1);
    const [ visibleCiudadResidenciaDetalle, setVisibleCiudadResidenciaDetalle ] = React.useState(false);

    const [ indexDetailsNivelAcademico, setIndexDestailsNivelAcademico ] = React.useState(-1);
    const [ visibleNivelAcademicoDetalle, setVisibleNivelAcademicoDetalle ] = React.useState(false);

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onEdit( params.idestudiante );
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
                    props.setFKIDTipoIdentificacion(estudiante, tipoIdentificacion);
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
                    props.setFKIDCiudadNacimiento(estudiante, ciudad);
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
                    props.setFKIDCiudadResidencia(estudiante, ciudad);
                    setVisibleCiudadResidencia(false);
                } }
            />
        );
    };

    const existNacionalidad = ( idciudad ) => {
        for (let index = 0; index < estudiante.arraynacionalidad.length; index++) {
            const element = estudiante.arraynacionalidad[index];
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
                        let detalle = estudiante.arraynacionalidad[indexDetailsNacionalidad];
                        detalle.fkidnacionalidad = ciudad.idciudad;
                        detalle.nacionalidad = ciudad.descripcion;
                        props.onChange(estudiante);
                        setVisibleNacionalidad(false);
                    } else {
                        toastr.warning( 'Nacionalidad ya seleccionado.', '', { closeButton: true, progressBar: true, } );
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
                    let detalle = estudiante.arraycategoriadocumento[indexDetailsCategoriaDocumento];
                    detalle.fkidcategoriadocumento = categoriaDocumento.idcategoriadocumento;
                    detalle.categoriadocumento = categoriaDocumento.descripcion;
                    props.onChange(estudiante);
                    setVisibleCategoriaDocumento(false);
                } }
            />
        );
    };

    const onComponentTipoIdentificacionDetalle = () => {
        if ( !visibleTipoIdentificacionDetalle ) return null;
        return (
            <ListadoTipoIdentificacionModal
                visible={visibleTipoIdentificacionDetalle}
                onClose={ () => setVisibleTipoIdentificacionDetalle(false) }
                onSelect={ (tipoIdentificacion) => {
                    let detalle = estudiante.arrayfamiliar[indexDetailsTipoIdentificacionDetalle];
                    detalle.fkidtipoidentificacion = tipoIdentificacion.idtipoidentificacion;
                    detalle.tipoidentificacion = tipoIdentificacion.descripcion;
                    detalle.error.fkidtipoidentificacion = false;
                    detalle.message.fkidtipoidentificacion = "";
                    props.onChange(estudiante);
                    setVisibleTipoIdentificacionDetalle(false);
                } }
            />
        );
    };

    const getCiudadByDescripcion = ( array = [] ) => {
        let ciudades = "";
        for (let index = array.length; index > 0; index--) {
            const element = array[index - 1];
            if ( index === 1 ) { 
                ciudades += `${element}`;
            } else {
                ciudades += `${element}, `;
            }
        }
        return ciudades;
    }

    const onComponentCiudadNacimientoDetalle = () => {
        if ( !visibleCiudadNacimientoDetalle ) return null;
        return (
            <ListadoCiudadModal
                visible={visibleCiudadNacimientoDetalle}
                onClose={ () => setVisibleCiudadNacimientoDetalle(false) }
                onSelect={ (ciudad) => {
                    ciudad.arrayFamily = [ ...ciudad.arrayFamily, ciudad.descripcion ];
                    let detalle = estudiante.arrayfamiliar[indexDetailsCiudadNacimientoDetalle];
                    detalle.fkidciudadnacimiento = ciudad.idciudad;
                    detalle.ciudadnacimiento = `${getCiudadByDescripcion(ciudad.arrayFamily)}`;
                    detalle.error.fkidciudadnacimiento = false;
                    detalle.message.fkidciudadnacimiento = "";
                    props.onChange(estudiante);
                    setVisibleCiudadNacimientoDetalle(false);
                } }
            />
        );
    };

    const onComponentCiudadResidenciaDetalle = () => {
        if ( !visibleCiudadResidenciaDetalle ) return null;
        return (
            <ListadoCiudadModal
                visible={visibleCiudadResidenciaDetalle}
                onClose={ () => setVisibleCiudadResidenciaDetalle(false) }
                onSelect={ (ciudad) => {
                    ciudad.arrayFamily = [ ...ciudad.arrayFamily, ciudad.descripcion ];
                    let detalle = estudiante.arrayfamiliar[indexDetailsCiudadResidenciaDetalle];
                    detalle.fkidciudadresidencia = ciudad.idciudad;
                    detalle.ciudadresidencia = `${getCiudadByDescripcion(ciudad.arrayFamily)}`;
                    detalle.error.fkidciudadresidencia = false;
                    detalle.message.fkidciudadresidencia = "";
                    props.onChange(estudiante);
                    setVisibleCiudadResidenciaDetalle(false);
                } }
            />
        );
    };

    const onComponentNivelAcademicoDetalle = () => {
        if ( !visibleNivelAcademicoDetalle ) return null;
        return (
            <ListadoNivelAcademicoModal
                visible={visibleNivelAcademicoDetalle}
                onClose={ () => setVisibleNivelAcademicoDetalle(false) }
                onSelect={ (nivelAcademico) => {
                    let detalle = estudiante.arrayfamiliar[indexDetailsNivelAcademico];
                    detalle.fkidnivelacademico = nivelAcademico.idnivelacademico;
                    detalle.nivelacademico = nivelAcademico.descripcion;
                    props.onChange(estudiante);
                    setVisibleNivelAcademicoDetalle(false);
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
            { onComponentCategoriaDocumentoDetalle() }
            { onComponentTipoIdentificacionDetalle() }
            { onComponentCiudadNacimientoDetalle() }
            { onComponentCiudadResidenciaDetalle() }
            { onComponentNivelAcademicoDetalle() }
            <PaperComponent>
                <CardComponent
                    header={"Editar Estudiante"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(estudiante, onBack) }
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
                            <a className="nav-link" id="familiar-tab" data-toggle="tab" href="#familiar" 
                                role="tab" aria-controls="familiar" aria-selected="false"
                            >
                                Familiar
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
                                        value={estudiante.nombreprincipal}
                                        onChange={ (value) => props.setNombrePrincipal(estudiante, value) }
                                        error={estudiante.error.nombreprincipal}
                                        message={estudiante.message.nombreprincipal}
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Nombre Adicional"
                                        value={estudiante.nombreadicional}
                                        onChange={ (value) => props.setNombreAdicional(estudiante, value) }
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Primer Apellido*"
                                        value={estudiante.apellidoprimero}
                                        onChange={ (value) => props.setApellidoPrimero(estudiante, value) }
                                        error={estudiante.error.apellidoprimero}
                                        message={estudiante.message.apellidoprimero}
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Segundo Apellido"
                                        value={estudiante.apellidosegundo}
                                        onChange={ (value) => props.setApellidoSegundo(estudiante, value) }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Tipo Identificación*"
                                        value={estudiante.tipoidentificacion}
                                        onClick={ () => {
                                            setVisibleTipoIdentificacion(true);
                                        } }
                                        readOnly
                                        error={estudiante.error.fkidtipoidentificacion}
                                        message={estudiante.message.fkidtipoidentificacion}
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR TIPO IDENTIFICACIÓN"
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Nro. Identificación*"
                                        value={estudiante.numeroidentificacion}
                                        onChange={ (value) => props.setNumeroIdentificacion(estudiante, value) }
                                        error={estudiante.error.numeroidentificacion}
                                        message={estudiante.message.numeroidentificacion}
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <SelectComponent 
                                        data={GeneroData}
                                        label={"Género*"}
                                        value={estudiante.genero}
                                        onChange={ (value) => props.setGenero(estudiante, value) }
                                        error={estudiante.error.genero}
                                        message={estudiante.message.genero}
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <SelectComponent 
                                        data={EstadoCivilData}
                                        label={"Estado Civil*"}
                                        value={estudiante.estadocivil}
                                        onChange={ (value) => props.setEstadoCivil(estudiante, value) }
                                        error={estudiante.error.estadocivil}
                                        message={estudiante.message.estadocivil}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-2"></div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Nro. Registro"
                                        value={estudiante.numeroregistro}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <SelectComponent 
                                        data={EstadoData}
                                        label={"Estado"}
                                        value={estudiante.estado}
                                        onChange={ (value) => props.setEstado(estudiante, value) }
                                        error={estudiante.error.estado}
                                        message={estudiante.message.estado}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-5">
                                    <InputComponent
                                        label="Lugar de Nacimiento*"
                                        value={estudiante.ciudadnacimiento}
                                        onClick={ () => setVisibleCiudadNacimiento(true) }
                                        error={estudiante.error.fkidciudadnacimiento}
                                        message={estudiante.message.fkidciudadnacimiento}
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR LUGAR DE NACIMIENTO"
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-5">
                                    <InputComponent
                                        label="Residencia*"
                                        value={estudiante.ciudadresidencia}
                                        onClick={ () => setVisibleCiudadResidencia(true) }
                                        error={estudiante.error.fkidciudadresidencia}
                                        message={estudiante.message.fkidciudadresidencia}
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR RESIDENCIA"
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-2">
                                    <DatePickerComponent
                                        label="Nacimiento*"
                                        value={estudiante.fechanacimiento}
                                        onChange={ (value) => props.setFechaNacimiento(estudiante, value) }
                                        error={estudiante.error.fechanacimiento}
                                        message={estudiante.message.fechanacimiento}
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
                                        onClick={props.onAddRowNacionalidad}
                                    >
                                        Agregar Nacionalidad
                                    </ButtonComponent>
                                </div>
                            </div>
                            { estudiante.arraynacionalidad.length === 0 &&
                                <div className='card p-0 m-0'>
                                    <div className='card-header'>
                                        <h4>Sin Nacionalidades</h4>
                                    </div>
                                </div>
                            }
                            <div className='row' style={{ maxHeight: 350, overflowY: 'auto', overflowX: 'hidden', }}>
                                { estudiante.arraynacionalidad.map( ( item, key ) => {
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
                                                onClose={ () => props.onDeleteRowNacionalidad(key) }
                                            />
                                        </div>
                                    );
                                } ) }
                            </div>
                            <div className="row">
                                <div className="form-group col-6">
                                    <InputComponent
                                        label="Email"
                                        value={estudiante.email}
                                        onChange={ (value) => props.setEmail(estudiante, value) }
                                        error={estudiante.error.email}
                                        message={estudiante.message.email}
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Télefono"
                                        value={estudiante.telefono}
                                        onChange={ (value) => props.setTelefono(estudiante, value) }
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Celular"
                                        value={estudiante.celular}
                                        onChange={ (value) => props.setCelular(estudiante, value) }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12">
                                    <InputComponent
                                        label="Dirección"
                                        value={estudiante.direccion}
                                        onChange={ (value) => props.setDireccion(estudiante, value) }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-6">
                                    <InputComponent
                                        label="Barrio"
                                        value={estudiante.barrio}
                                        onChange={ (value) => props.setBarrio(estudiante, value) }
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Manzano"
                                        value={estudiante.manzano}
                                        onChange={ (value) => props.setManzano(estudiante, value) }
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="UV"
                                        value={estudiante.uv}
                                        onChange={ (value) => props.setUV(estudiante, value) }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade pt-4" id="familiar" role="tabpanel" aria-labelledby="familiar-tab">
                            <div className="row">
                                <div className="form-group col-12">
                                    <ButtonComponent
                                        fullWidth
                                        onClick={props.onAddRowFamiliar}
                                    >
                                        Agregar
                                    </ButtonComponent>
                                </div>
                            </div>
                            { estudiante.arrayfamiliar?.length === 0 &&
                                <div className='card p-0 m-0'>
                                    <div className='card-header'>
                                        <h4>Sin Información</h4>
                                    </div>
                                </div>
                            }
                            <div className="row">
                                { estudiante.arrayfamiliar?.map( ( item, key ) => {
                                    return (
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12" key={key}>
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
                                                            props.onDeleteRowFamiliar(key);
                                                        } }
                                                    />
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="form-group col-3">
                                                            <InputComponent
                                                                label="Nombre Principal*"
                                                                value={item.nombreprincipal}
                                                                onChange={ (value) => {
                                                                    item.nombreprincipal = value;
                                                                    item.error.nombreprincipal = false;
                                                                    item.message.nombreprincipal = "";
                                                                    props.onChange(estudiante);
                                                                } }
                                                                error={item.error?.nombreprincipal}
                                                                message={item.message?.nombreprincipal}
                                                            />
                                                        </div>
                                                        <div className="form-group col-3">
                                                            <InputComponent
                                                                label="Nombre Adicional"
                                                                value={item.nombreadicional}
                                                                onChange={ (value) => {
                                                                    item.nombreadicional = value;
                                                                    props.onChange(estudiante);
                                                                } }
                                                            />
                                                        </div>
                                                        <div className="form-group col-3">
                                                            <InputComponent
                                                                label="Primer Apellido*"
                                                                value={item.apellidoprimero}
                                                                onChange={ (value) => {
                                                                    item.apellidoprimero = value;
                                                                    item.error.apellidoprimero = false;
                                                                    item.message.apellidoprimero = "";
                                                                    props.onChange(estudiante);
                                                                } }
                                                                error={item.error?.apellidoprimero}
                                                                message={item.message?.apellidoprimero}
                                                            />
                                                        </div>
                                                        <div className="form-group col-3">
                                                            <InputComponent
                                                                label="Segundo Apellido"
                                                                value={item.apellidosegundo}
                                                                onChange={ (value) => {
                                                                    item.apellidosegundo = value;
                                                                    props.onChange(estudiante);
                                                                } }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-3">
                                                            <InputComponent
                                                                label="Tipo Identificación*"
                                                                value={item.tipoidentificacion}
                                                                onClick={ () => {
                                                                    setIndexDestailsTipoIdentificacionDetalle(key);
                                                                    setVisibleTipoIdentificacionDetalle(true);
                                                                } }
                                                                readOnly
                                                                error={item.error?.fkidtipoidentificacion}
                                                                message={item.message?.fkidtipoidentificacion}
                                                                style={{ background: 'white', cursor: 'pointer', }}
                                                                placeholder="SELECCIONAR TIPO IDENTIFICACIÓN"
                                                            />
                                                        </div>
                                                        <div className="form-group col-3">
                                                            <InputComponent
                                                                label="Nro. Identificación*"
                                                                value={item.numeroidentificacion}
                                                                onChange={ (value) => {
                                                                    item.numeroidentificacion = value;
                                                                    item.error.numeroidentificacion = false;
                                                                    item.message.numeroidentificacion = "";
                                                                    props.onChange(estudiante);
                                                                } }
                                                                error={item.error?.numeroidentificacion}
                                                                message={item.message?.numeroidentificacion}
                                                            />
                                                        </div>
                                                        <div className="form-group col-3">
                                                            <SelectComponent 
                                                                data={GeneroData}
                                                                label={"Género*"}
                                                                value={item.genero}
                                                                onChange={ (value) => {
                                                                    item.genero = value;
                                                                    item.error.genero = false;
                                                                    item.message.genero = "";
                                                                    props.onChange(estudiante);
                                                                } }
                                                                error={item.error?.genero}
                                                                message={item.message?.genero}
                                                            />
                                                        </div>
                                                        <div className="form-group col-3">
                                                            <SelectComponent 
                                                                data={EstadoCivilData}
                                                                label={"Estado Civil*"}
                                                                value={item.estadocivil}
                                                                onChange={ (value) => {
                                                                    item.estadocivil = value;
                                                                    item.error.estadocivil = false;
                                                                    item.message.estadocivil = "";
                                                                    props.onChange(estudiante);
                                                                } }
                                                                error={item.error?.estadocivil}
                                                                message={item.message?.estadocivil}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-6">
                                                            <InputComponent
                                                                label="Lugar de Nacimiento*"
                                                                value={item.ciudadnacimiento}
                                                                onClick={ () => {
                                                                    setIndexDestailsCiudadNacimientoDetalle(key);
                                                                    setVisibleCiudadNacimientoDetalle(true);
                                                                } }
                                                                error={item.error?.fkidciudadnacimiento}
                                                                message={item.message?.fkidciudadnacimiento}
                                                                style={{ background: 'white', cursor: 'pointer', }}
                                                                placeholder="SELECCIONAR LUGAR DE NACIMIENTO"
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="form-group col-6">
                                                            <InputComponent
                                                                label="Residencia*"
                                                                value={item.ciudadresidencia}
                                                                onClick={ () => {
                                                                    setIndexDestailsCiudadResidenciaDetalle(key);
                                                                    setVisibleCiudadResidenciaDetalle(true);
                                                                } }
                                                                error={item.error?.fkidciudadresidencia}
                                                                message={item.message?.fkidciudadresidencia}
                                                                style={{ background: 'white', cursor: 'pointer', }}
                                                                placeholder="SELECCIONAR RESIDENCIA"
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-4">
                                                            <DatePickerComponent
                                                                label="Fecha Nacimiento*"
                                                                value={item.fechanacimiento}
                                                                onChange={ (value) => {
                                                                    item.fechanacimiento = value;
                                                                    item.error.fechanacimiento = false;
                                                                    item.message.fechanacimiento = "";
                                                                    props.onChange(estudiante);
                                                                } }
                                                                error={item.error?.fechanacimiento}
                                                                message={item.message?.fechanacimiento}
                                                                placeholder="SELECCIONAR FECHA NACIMIENTO"
                                                                disabledDateNowBack
                                                            />
                                                        </div>
                                                        <div className="form-group col-4">
                                                            <SelectComponent 
                                                                data={TipoFamiliarData}
                                                                label={"Tipo relación Familiar*"}
                                                                value={item.tiporelacion}
                                                                onChange={ (value) => {
                                                                    item.tiporelacion = value;
                                                                    item.error.tiporelacion = false;
                                                                    item.message.tiporelacion = "";
                                                                    props.onChange(estudiante);
                                                                } }
                                                                error={item.error?.tiporelacion}
                                                                message={item.message?.tiporelacion}
                                                            />
                                                        </div>
                                                        <div className="form-group col-4">
                                                            <InputComponent
                                                                label="Tipo Sangre"
                                                                value={item.tiposangre}
                                                                onChange={ (value) => {
                                                                    item.tiposangre = value;
                                                                    props.onChange(estudiante);
                                                                } }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-6">
                                                            <InputComponent
                                                                label="Email"
                                                                value={item.email}
                                                                onChange={ (value) => {
                                                                    item.email = value;
                                                                    item.error.email = false;
                                                                    item.message.email = "";
                                                                    props.onChange(estudiante);
                                                                } }
                                                                error={item.error?.email}
                                                                message={item.message?.email}
                                                            />
                                                        </div>
                                                        <div className="form-group col-3">
                                                            <InputComponent
                                                                label="Télefono"
                                                                value={item.telefono}
                                                                onChange={ (value) => {
                                                                    item.telefono = value;
                                                                    props.onChange(estudiante);
                                                                } }
                                                            />
                                                        </div>
                                                        <div className="form-group col-3">
                                                            <InputComponent
                                                                label="Celular"
                                                                value={item.celular}
                                                                onChange={ (value) => {
                                                                    item.celular = value;
                                                                    props.onChange(estudiante);
                                                                } }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-12">
                                                            <InputComponent
                                                                label="Dirección"
                                                                value={item.direccion}
                                                                onChange={ (value) => {
                                                                    item.direccion = value;
                                                                    props.onChange(estudiante);
                                                                } }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-6">
                                                            <InputComponent
                                                                label="Barrio"
                                                                value={item.barrio}
                                                                onChange={ (value) => {
                                                                    item.barrio = value;
                                                                    props.onChange(estudiante);
                                                                } }
                                                            />
                                                        </div>
                                                        <div className="form-group col-3">
                                                            <InputComponent
                                                                label="Manzano"
                                                                value={item.manzano}
                                                                onChange={ (value) => {
                                                                    item.manzano = value;
                                                                    props.onChange(estudiante);
                                                                } }
                                                            />
                                                        </div>
                                                        <div className="form-group col-3">
                                                            <InputComponent
                                                                label="UV"
                                                                value={item.uv}
                                                                onChange={ (value) => {
                                                                    item.uv = value;
                                                                    props.onChange(estudiante);
                                                                } }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='card p-0 m-0 pl-1'>
                                                        <div className='card-header'>
                                                            <h4>Detalle Laboral</h4>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-4">
                                                            <InputComponent
                                                                label="Profesión"
                                                                value={item.profesion}
                                                                onChange={ (value) => {
                                                                    item.profesion = value;
                                                                    props.onChange(estudiante);
                                                                } }
                                                            />
                                                        </div>
                                                        <div className="form-group col-4">
                                                            <SelectComponent 
                                                                data={TipoEmpleadoData}
                                                                label={"Tipo Laboral"}
                                                                value={item.tipoempleado}
                                                                onChange={ (value) => {
                                                                    item.tipoempleado = value;
                                                                    props.onChange(estudiante);
                                                                } }
                                                                disabledDefault
                                                            />
                                                        </div>
                                                        <div className="form-group col-4">
                                                            <InputComponent
                                                                label="Nivel Academico"
                                                                value={item.nivelacademico}
                                                                onClick={ () => {
                                                                    setIndexDestailsNivelAcademico(key);
                                                                    setVisibleNivelAcademicoDetalle(true);
                                                                } }
                                                                readOnly
                                                                style={{ background: 'white', cursor: 'pointer', }}
                                                                placeholder="SELECCIONAR NIVEL ACADEMICO"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-4">
                                                            <InputComponent
                                                                label="Especialidad"
                                                                value={item.especialidad}
                                                                onChange={ (value) => {
                                                                    item.especialidad = value;
                                                                    props.onChange(estudiante);
                                                                } }
                                                            />
                                                        </div>
                                                        <div className="form-group col-8">
                                                            <InputComponent
                                                                label="Dirección Empresa"
                                                                value={item.direccionempresa}
                                                                onChange={ (value) => {
                                                                    item.direccionempresa = value;
                                                                    props.onChange(estudiante);
                                                                } }
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
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
                            { estudiante.arraycategoriadocumento?.length === 0 &&
                                <div className='card p-0 m-0'>
                                    <div className='card-header'>
                                        <h4>Sin Documento Digital</h4>
                                    </div>
                                </div>
                            }
                            <div style={{ minWidth: '100%', width: '100%', maxWidth: '100%', maxHeight: 450, overflowY: 'auto', overflowX: 'hidden', }}>
                                <div className="row">
                                    { estudiante.arraycategoriadocumento?.map( ( item, key ) => {
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
                                                                    props.onChange(estudiante);
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
                                                                    props.onChange(estudiante);
                                                                } }
                                                                disabledDefault={true}
                                                                disabled={ (item.fkidcategoriadocumento === null) }
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 pl-1">
                                                            <InputFileComponent
                                                                label="Eligir Documento"
                                                                id={`estudiante-document-details-${key}`}
                                                                onChange={ (document) => {
                                                                    item.documento = document;
                                                                    props.onChange(estudiante);
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
    estudiante: state.Estudiante,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onEdit: EstudianteActions.onEdit,
    onLimpiar: EstudianteActions.onLimpiar,
    onChange: EstudianteActions.onChange,
    onAddRowNacionalidad: EstudianteActions.onAddRowNacionalidad,
    onDeleteRowNacionalidad: EstudianteActions.onDeleteRowNacionalidad,
    onAddRowCategoriaDocumento: EstudianteActions.onAddRowCategoriaDocumento,
    onDeleteRowCategoriaDocumento: EstudianteActions.onDeleteRowCategoriaDocumento,
    onAddRowFamiliar: EstudianteActions.onAddRowFamiliar,
    onDeleteRowFamiliar: EstudianteActions.onDeleteRowFamiliar,
    setNombrePrincipal: EstudianteActions.setNombrePrincipal,
    setNombreAdicional: EstudianteActions.setNombreAdicional,
    setApellidoPrimero: EstudianteActions.setApellidoPrimero,
    setApellidoSegundo: EstudianteActions.setApellidoSegundo,
    setFKIDTipoIdentificacion: EstudianteActions.setFKIDTipoIdentificacion,
    setNumeroIdentificacion: EstudianteActions.setNumeroIdentificacion,
    setFechaNacimiento: EstudianteActions.setFechaNacimiento,
    setGenero: EstudianteActions.setGenero,
    setEstadoCivil: EstudianteActions.setEstadoCivil,
    setFKIDCiudadNacimiento: EstudianteActions.setFKIDCiudadNacimiento,
    setFKIDCiudadResidencia: EstudianteActions.setFKIDCiudadResidencia,
    setDireccion: EstudianteActions.setDireccion,
    setBarrio: EstudianteActions.setBarrio,
    setManzano: EstudianteActions.setManzano,
    setUV: EstudianteActions.setUV,
    setTelefono: EstudianteActions.setTelefono,
    setCelular: EstudianteActions.setCelular,
    setEmail: EstudianteActions.setEmail,
    setEstado: EstudianteActions.setEstado,
    onUpdate: EstudianteActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditEstudiante );
