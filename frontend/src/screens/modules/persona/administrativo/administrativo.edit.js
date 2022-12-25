
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
import { ConfirmacionData } from '../../../../data/confirmacion.data';
import ListadoCiudadModal from '../../parametro/ciudad/modal/ciudad_listado.modal';
import ListadoTipoIdentificacionModal from '../tipoidentificacion/modal/tipo_identificacion_listado.modal';
import ListadoCategoriaDocumentoModal from '../categoriadocumento/modal/categoria_documento_listado.modal';
import ListadoNivelAcademicoModal from '../../parametro/nivelacademico/modal/nivel_academico_listado.modal';
import ListadoInstitucionModal from '../../estructurainstitucional/institucion/modal/institucion_listado.modal';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { AdministrativoActions } from '../../../../redux/actions/persona/administrativo.action';

function EditAdministrativo( props ) {
    const { administrativo } = props;
    
    const navigate = useNavigate();
    const params = useParams();

    const [ visibleTipoIdentificacion, setVisibleTipoIdentificacion ] = React.useState(false);
    const [ visibleCiudadNacimiento, setVisibleCiudadNacimiento ] = React.useState(false);
    const [ visibleCiudadResidencia, setVisibleCiudadResidencia ] = React.useState(false);

    const [ indexDetailsNacionalidad, setIndexDestailsNacionalidad ] = React.useState(-1);
    const [ visibleNacionalidad, setVisibleNacionalidad ] = React.useState(false);

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
                props.onEdit( params.idadministrativo );
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
                    props.setFKIDTipoIdentificacion(administrativo, tipoIdentificacion);
                    setVisibleTipoIdentificacion(false);
                } }
                valueSelect={administrativo?.fkidtipoidentificacion}
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
                    props.setFKIDCiudadNacimiento(administrativo, ciudad);
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
                    props.setFKIDCiudadResidencia(administrativo, ciudad);
                    setVisibleCiudadResidencia(false);
                } }
            />
        );
    };

    const existNacionalidad = ( idciudad ) => {
        for (let index = 0; index < administrativo.arraynacionalidad.length; index++) {
            const element = administrativo.arraynacionalidad[index];
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
                        let detalle = administrativo.arraynacionalidad[indexDetailsNacionalidad];
                        detalle.fkidnacionalidad = ciudad.idciudad;
                        detalle.nacionalidad = ciudad.descripcion;
                        props.onChange(administrativo);
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
                    let detalle = administrativo.arraycategoriadocumento[indexDetailsCategoriaDocumento];
                    detalle.fkidcategoriadocumento = categoriaDocumento.idcategoriadocumento;
                    detalle.categoriadocumento = categoriaDocumento.descripcion;
                    props.onChange(administrativo);
                    setVisibleCategoriaDocumento(false);
                } }
                valueSelect={administrativo.arraycategoriadocumento[indexDetailsCategoriaDocumento]?.fkidcategoriadocumento}
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
                    let detalle = administrativo.arrayestudio[indexDetailsInstitucion];
                    detalle.fkidinstitucion = institucion.idinstitucion;
                    detalle.institucion = institucion.descripcion;
                    props.onChange(administrativo);
                    setVisibleInstitucion(false);
                } }
                valueSelect={administrativo.arrayestudio[indexDetailsInstitucion]?.fkidinstitucion}
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
                    let detalle = administrativo.arrayestudio[indexDetailsNivelAcademico];
                    detalle.fkidnivelacademico = nivelAcademico.idnivelacademico;
                    detalle.nivelacademico = nivelAcademico.descripcion;
                    props.onChange(administrativo);
                    setVisibleNivelAcademico(false);
                } }
                valueSelect={administrativo.arrayestudio[indexDetailsNivelAcademico]?.fkidnivelacademico}
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
            { onComponentInstitucionDetalle() }
            { onComponentNivelAcademicoDetalle() }
            <PaperComponent>
                <CardComponent
                    header={"Editar Administrativo"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(administrativo, onBack) }
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
                            <a className="nav-link" id="estudio-tab" data-toggle="tab" href="#estudio" 
                                role="tab" aria-controls="estudio" aria-selected="false"
                            >
                                Estudios
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
                                        value={administrativo.nombreprincipal}
                                        onChange={ (value) => props.setNombrePrincipal(administrativo, value) }
                                        error={administrativo.error.nombreprincipal}
                                        message={administrativo.message.nombreprincipal}
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Nombre Adicional"
                                        value={administrativo.nombreadicional}
                                        onChange={ (value) => props.setNombreAdicional(administrativo, value) }
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Primer Apellido*"
                                        value={administrativo.apellidoprimero}
                                        onChange={ (value) => props.setApellidoPrimero(administrativo, value) }
                                        error={administrativo.error.apellidoprimero}
                                        message={administrativo.message.apellidoprimero}
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Segundo Apellido"
                                        value={administrativo.apellidosegundo}
                                        onChange={ (value) => props.setApellidoSegundo(administrativo, value) }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Tipo Identificación*"
                                        value={administrativo.tipoidentificacion}
                                        onClick={ () => {
                                            setVisibleTipoIdentificacion(true);
                                        } }
                                        readOnly
                                        error={administrativo.error.fkidtipoidentificacion}
                                        message={administrativo.message.fkidtipoidentificacion}
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR TIPO IDENTIFICACIÓN"
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Nro. Identificación*"
                                        value={administrativo.numeroidentificacion}
                                        onChange={ (value) => props.setNumeroIdentificacion(administrativo, value) }
                                        error={administrativo.error.numeroidentificacion}
                                        message={administrativo.message.numeroidentificacion}
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <SelectComponent 
                                        data={GeneroData}
                                        label={"Género*"}
                                        value={administrativo.genero}
                                        onChange={ (value) => props.setGenero(administrativo, value) }
                                        error={administrativo.error.genero}
                                        message={administrativo.message.genero}
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <SelectComponent 
                                        data={EstadoCivilData}
                                        label={"Estado Civil*"}
                                        value={administrativo.estadocivil}
                                        onChange={ (value) => props.setEstadoCivil(administrativo, value) }
                                        error={administrativo.error.estadocivil}
                                        message={administrativo.message.estadocivil}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-5">
                                    <InputComponent
                                        label="Lugar de Nacimiento*"
                                        value={administrativo.ciudadnacimiento}
                                        onClick={ () => setVisibleCiudadNacimiento(true) }
                                        error={administrativo.error.fkidciudadnacimiento}
                                        message={administrativo.message.fkidciudadnacimiento}
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR LUGAR DE NACIMIENTO"
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-5">
                                    <InputComponent
                                        label="Residencia*"
                                        value={administrativo.ciudadresidencia}
                                        onClick={ () => setVisibleCiudadResidencia(true) }
                                        error={administrativo.error.fkidciudadresidencia}
                                        message={administrativo.message.fkidciudadresidencia}
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR RESIDENCIA"
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-2">
                                    <DatePickerComponent
                                        label="Nacimiento*"
                                        value={administrativo.fechanacimiento}
                                        onChange={ (value) => props.setFechaNacimiento(administrativo, value) }
                                        error={administrativo.error.fechanacimiento}
                                        message={administrativo.message.fechanacimiento}
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
                            { administrativo.arraynacionalidad.length === 0 &&
                                <div className='card p-0 m-0'>
                                    <div className='card-header'>
                                        <h4>Sin Nacionalidades</h4>
                                    </div>
                                </div>
                            }
                            <div className='row' style={{ maxHeight: 350, overflowY: 'auto', overflowX: 'hidden', }}>
                                { administrativo.arraynacionalidad.map( ( item, key ) => {
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
                                        value={administrativo.email}
                                        onChange={ (value) => props.setEmail(administrativo, value) }
                                        error={administrativo.error.email}
                                        message={administrativo.message.email}
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Télefono"
                                        value={administrativo.telefono}
                                        onChange={ (value) => props.setTelefono(administrativo, value) }
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Celular"
                                        value={administrativo.celular}
                                        onChange={ (value) => props.setCelular(administrativo, value) }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12">
                                    <InputComponent
                                        label="Dirección"
                                        value={administrativo.direccion}
                                        onChange={ (value) => props.setDireccion(administrativo, value) }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-6">
                                    <InputComponent
                                        label="Barrio"
                                        value={administrativo.barrio}
                                        onChange={ (value) => props.setBarrio(administrativo, value) }
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Manzano"
                                        value={administrativo.manzano}
                                        onChange={ (value) => props.setManzano(administrativo, value) }
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="UV"
                                        value={administrativo.uv}
                                        onChange={ (value) => props.setUV(administrativo, value) }
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
                            { administrativo.arrayestudio.length === 0 &&
                                <div className='card p-0 m-0'>
                                    <div className='card-header'>
                                        <h4>Sin Información</h4>
                                    </div>
                                </div>
                            }
                            <div style={{ minWidth: '100%', width: '100%', maxWidth: '100%', maxHeight: 650, overflowY: 'auto', overflowX: 'hidden', }}>
                                <div className="row">
                                    { administrativo.arrayestudio.map( ( item, key ) => {
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
                                                                    props.onChange(administrativo);
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
                                                                    props.onChange(administrativo);
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
                                                                            props.onChange(administrativo);
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
                                                                    props.onChange(administrativo);
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
                            { administrativo.arraycategoriadocumento.length === 0 &&
                                <div className='card p-0 m-0'>
                                    <div className='card-header'>
                                        <h4>Sin Documento Digital</h4>
                                    </div>
                                </div>
                            }
                            <div style={{ minWidth: '100%', width: '100%', maxWidth: '100%', maxHeight: 450, overflowY: 'auto', overflowX: 'hidden', }}>
                                <div className="row">
                                    { administrativo.arraycategoriadocumento.map( ( item, key ) => {
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
                                                                    props.onChange(administrativo);
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
                                                                    props.onChange(administrativo);
                                                                } }
                                                                disabledDefault={true}
                                                                disabled={ (item.fkidcategoriadocumento === null) }
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 pl-1">
                                                            <InputFileComponent
                                                                label="Eligir Documento"
                                                                id={`administrativo-document-details-${key}`}
                                                                onChange={ (document) => {
                                                                    item.documento = document;
                                                                    props.onChange(administrativo);
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
    administrativo: state.Administrativo,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onEdit: AdministrativoActions.onEdit,
    onLimpiar: AdministrativoActions.onLimpiar,
    onChange: AdministrativoActions.onChange,
    onAddNacionalidad: AdministrativoActions.onAddNacionalidad,
    onDeleteNacionalidad: AdministrativoActions.onDeleteNacionalidad,
    onAddRowCategoriaDocumento: AdministrativoActions.onAddRowCategoriaDocumento,
    onDeleteRowCategoriaDocumento: AdministrativoActions.onDeleteRowCategoriaDocumento,
    onAddRowEstudio: AdministrativoActions.onAddRowEstudio,
    onDeleteRowEstudio: AdministrativoActions.onDeleteRowEstudio,
    setNombrePrincipal: AdministrativoActions.setNombrePrincipal,
    setNombreAdicional: AdministrativoActions.setNombreAdicional,
    setApellidoPrimero: AdministrativoActions.setApellidoPrimero,
    setApellidoSegundo: AdministrativoActions.setApellidoSegundo,
    setFKIDTipoIdentificacion: AdministrativoActions.setFKIDTipoIdentificacion,
    setNumeroIdentificacion: AdministrativoActions.setNumeroIdentificacion,
    setFechaNacimiento: AdministrativoActions.setFechaNacimiento,
    setGenero: AdministrativoActions.setGenero,
    setEstadoCivil: AdministrativoActions.setEstadoCivil,
    setFKIDCiudadNacimiento: AdministrativoActions.setFKIDCiudadNacimiento,
    setFKIDCiudadResidencia: AdministrativoActions.setFKIDCiudadResidencia,
    setDireccion: AdministrativoActions.setDireccion,
    setBarrio: AdministrativoActions.setBarrio,
    setManzano: AdministrativoActions.setManzano,
    setUV: AdministrativoActions.setUV,
    setTelefono: AdministrativoActions.setTelefono,
    setCelular: AdministrativoActions.setCelular,
    setEmail: AdministrativoActions.setEmail,
    onUpdate: AdministrativoActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditAdministrativo );
