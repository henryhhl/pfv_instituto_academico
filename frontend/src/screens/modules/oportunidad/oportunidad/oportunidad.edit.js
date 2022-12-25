
import React from 'react';
import toastr from 'toastr';
import { Steps } from 'antd';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import DatePickerComponent from '../../../../components/date';
import TimePickerComponent from '../../../../components/time';
import { ButtonComponent ,InputComponent, TextAreaComponent, SelectComponent } from '../../../../components/components';
import { EstadoData } from '../../../../data/estado.data';
import FormAddNegocioModal from '../negocio/modal/form_add_negocio.modal';
import FormAddActividadModal from '../actividad/modal/form_add_actividad.modal';
import FormUpdateNegocioModal from '../negocio/modal/form_update_negocio.modal';
import ListadoCiudadModal from '../../parametro/ciudad/modal/ciudad_listado.modal';
import ListadoTipoContactoModal from '../tipocontacto/modal/tipocontacto_listado.modal';
import ListadoAsesorResponsableModal from '../asesorresponsable/modal/asesorresponsable_listado.modal';
import ListadoTipoMedioPublicitarioModal from '../tipomediopublicitario/modal/tipomediopublicitario_listado.modal';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { NegocioActions } from '../../../../redux/actions/oportunidad/negocio.action';
import { OportunidadActions } from '../../../../redux/actions/oportunidad/oportunidad.action';
import { ActividadActions } from '../../../../redux/actions/oportunidad/actividad.action';
import FormUpdateActividadModal from '../actividad/modal/form_update_actividad.modal';

const { Step } = Steps;

function EditOportunidad( props ) {
    const { oportunidad } = props;
    const navigate = useNavigate();
    const params = useParams();

    const [ visibleAsesorResponsable, setVisibleAsesorResponsable ] = React.useState(false);
    const [ visibleCiudadOrigen, setVisibleCiudadOrigen ] = React.useState(false);

    const [ indexDetailsTipoContacto, setIndexDestailsTipoContacto ] = React.useState(-1);
    const [ visibleTipoContacto, setVisibleTipoContacto ] = React.useState(false);

    const [ indexDetailsTipoMedioPublicitario, setIndexDestailsTipoMedioPublicitario ] = React.useState(-1);
    const [ visibleTipoMedioPublicitario, setVisibleTipoMedioPublicitario ] = React.useState(false);

    const [ idNegocio, setIdNegocio ] = React.useState(null);
    const [ visibleFormAddNegocio, setVisibleFormAddNegocio ] = React.useState(false);
    const [ visibleFormUpdateNegocio, setVisibleFormUpdateNegocio ] = React.useState(false);

    const [ idActividad, setIdActividad ] = React.useState(null);
    const [ visibleFormAddActividad, setVisibleFormAddActividad ] = React.useState(false);
    const [ visibleFormUpdateActividad, setVisibleFormUpdateActividad ] = React.useState(false);

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onEdit(params.idoportunidad);
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

    const onComponentAsesorResponsable = () => {
        if ( !visibleAsesorResponsable ) return null;
        return (
            <ListadoAsesorResponsableModal
                visible={visibleAsesorResponsable}
                onClose={ () => setVisibleAsesorResponsable(false) }
                onSelect={ (asesorResponsable) => {
                    props.setFKIDAsesorResponsable(oportunidad, asesorResponsable);
                    setVisibleAsesorResponsable(false);
                } }
                valueSelect={oportunidad?.fkidasesorresponsable}
            />
        );
    };

    const onComponentCiudadOrigen = () => {
        if ( !visibleCiudadOrigen ) return null;
        return (
            <ListadoCiudadModal
                visible={visibleCiudadOrigen}
                onClose={ () => setVisibleCiudadOrigen(false) }
                onSelect={ (ciudad) => {
                    props.setFKIDCiudadOrigen(oportunidad, ciudad);
                    setVisibleCiudadOrigen(false);
                } }
            />
        );
    };

    const existTipoContacto = ( idtipocontacto ) => {
        for (let index = 0; index < oportunidad.arraytipocontacto.length; index++) {
            const element = oportunidad.arraytipocontacto[index];
            if ( element.fkidtipocontacto === idtipocontacto ) return true;
        }
        return false;
    };

    const onComponentTipoContactoDetalle = () => {
        if ( !visibleTipoContacto ) return null;
        return (
            <ListadoTipoContactoModal
                visible={visibleTipoContacto}
                onClose={ () => setVisibleTipoContacto(false) }
                onSelect={ (tipoContacto) => {
                    if ( !existTipoContacto( tipoContacto.idtipocontacto ) ) {
                        let detalle = oportunidad.arraytipocontacto[indexDetailsTipoContacto];
                        detalle.fkidtipocontacto = tipoContacto.idtipocontacto;
                        detalle.tipocontacto = tipoContacto.descripcion;
                        props.onChange(oportunidad);
                        setVisibleTipoContacto(false);
                    } else {
                        toastr.warning( 'Contacto ya seleccionado.', '', { closeButton: true, progressBar: true, } );
                    }
                } }
                valueSelect={oportunidad.arraytipocontacto[indexDetailsTipoContacto]?.fkidtipocontacto}
            />
        );
    };

    const existTipoMedioPublicitario = ( idtipomediopublicitario ) => {
        for (let index = 0; index < oportunidad.arraytipomediopublicitario.length; index++) {
            const element = oportunidad.arraytipomediopublicitario[index];
            if ( element.fkidtipomediopublicitario === idtipomediopublicitario ) return true;
        }
        return false;
    };

    const onComponentTipoMedioPublicitarioDetalle = () => {
        if ( !visibleTipoMedioPublicitario ) return null;
        return (
            <ListadoTipoMedioPublicitarioModal
                visible={visibleTipoMedioPublicitario}
                onClose={ () => setVisibleTipoMedioPublicitario(false) }
                onSelect={ (tipoMedioPublicitario) => {
                    if ( !existTipoMedioPublicitario( tipoMedioPublicitario.idtipomediopublicitario ) ) {
                        let detalle = oportunidad.arraytipomediopublicitario[indexDetailsTipoMedioPublicitario];
                        detalle.fkidtipomediopublicitario = tipoMedioPublicitario.idtipomediopublicitario;
                        detalle.tipomediopublicitario = tipoMedioPublicitario.descripcion;
                        props.onChange(oportunidad);
                        setVisibleTipoMedioPublicitario(false);
                    } else {
                        toastr.warning( 'Medio Publicitario ya seleccionado.', '', { closeButton: true, progressBar: true, } );
                    }
                } }
                valueSelect={oportunidad.arraytipomediopublicitario[indexDetailsTipoMedioPublicitario]?.fkidtipomediopublicitario}
            />
        );
    };

    const onComponentFormAddNegocio = () => {
        if ( !visibleFormAddNegocio ) return null;
        return (
            <FormAddNegocioModal
                visible={visibleFormAddNegocio}
                onClose={ () => setVisibleFormAddNegocio(false) }
                onOk={ (negocioFirst) => {
                    props.setData(negocioFirst.oportunidad);
                    setVisibleFormAddNegocio(false);
                } }
                fkidoportunidad={params.idoportunidad}
            />
        );
    };

    const onComponentFormUpdateNegocio = () => {
        if ( !visibleFormUpdateNegocio ) return null;
        return (
            <FormUpdateNegocioModal
                visible={visibleFormUpdateNegocio}
                onClose={ () => setVisibleFormUpdateNegocio(false) }
                onOk={ (negocioUpdate) => {
                    props.setData(negocioUpdate.oportunidad);
                    setVisibleFormUpdateNegocio(false);
                } }
                idnegocio={idNegocio}
            />
        );
    };

    const onComponentFormAddActividad = () => {
        if ( !visibleFormAddActividad ) return null;
        return (
            <FormAddActividadModal
                visible={visibleFormAddActividad}
                onClose={ () => setVisibleFormAddActividad(false) }
                onOk={ (actividadUpdate) => {
                    props.setData(actividadUpdate.oportunidad);
                    setVisibleFormAddActividad(false);
                } }
                fkidnegocio={idNegocio}
            />
        );
    };

    const onComponentFormUpdateActividad = () => {
        if ( !visibleFormUpdateActividad ) return null;
        return (
            <FormUpdateActividadModal
                visible={visibleFormUpdateActividad}
                onClose={ () => setVisibleFormUpdateActividad(false) }
                onOk={ (actividadUpdate) => {
                    props.setData(actividadUpdate.oportunidad);
                    setVisibleFormUpdateActividad(false);
                } }
                fkidactividad={idActividad}
            />
        );
    };

    return (
        <>
            { onComponentAsesorResponsable() }
            { onComponentCiudadOrigen() }
            { onComponentTipoContactoDetalle() }
            { onComponentTipoMedioPublicitarioDetalle() }
            { onComponentFormAddNegocio() }
            { onComponentFormUpdateNegocio() }
            { onComponentFormAddActividad() }
            { onComponentFormUpdateActividad() }
            <PaperComponent>
                <CardComponent
                    header={"Editar Oportunidad"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(oportunidad, onBack) }
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
                            <a className="nav-link" id="negociooportunidad-tab" data-toggle="tab" href="#negociooportunidad" 
                                role="tab" aria-controls="negociooportunidad" aria-selected="false"
                            >
                                Negocio
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade pt-4 active show" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="row">
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Identificación*"
                                        value={oportunidad.identificacion}
                                        onChange={ (value) => props.setIdentificacion(oportunidad, value) }
                                        error={oportunidad.error.identificacion}
                                        message={oportunidad.message.identificacion}
                                    />
                                </div>
                                <div className="form-group col-8">
                                    <InputComponent
                                        label="Oportunidad*"
                                        value={oportunidad.descripcion}
                                        onChange={ (value) => props.setDescripcion(oportunidad, value) }
                                        error={oportunidad.error.descripcion}
                                        message={oportunidad.message.descripcion}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-6">
                                    <InputComponent
                                        label="Asesor Responsable*"
                                        value={oportunidad.asesorresponsable}
                                        onClick={ () => setVisibleAsesorResponsable(true) }
                                        error={oportunidad.error.fkidasesorresponsable}
                                        message={oportunidad.message.fkidasesorresponsable}
                                        readOnly
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR ASESOR RESPONSABLE"
                                    />
                                </div>
                                <div className="form-group col-2">
                                    <InputComponent
                                        label="Celular*"
                                        value={oportunidad.celular}
                                        onChange={ (value) => props.setCelular(oportunidad, value) }
                                        error={oportunidad.error.celular}
                                        message={oportunidad.message.celular}
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Email*"
                                        value={oportunidad.email}
                                        onChange={ (value) => props.setEmail(oportunidad, value) }
                                        error={oportunidad.error.email}
                                        message={oportunidad.message.email}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12">
                                    <InputComponent
                                        label="Ciudad Origen*"
                                        value={oportunidad.ciudadorigen}
                                        onClick={ () => setVisibleCiudadOrigen(true) }
                                        error={oportunidad.error.fkidciudadorigen}
                                        message={oportunidad.message.fkidciudadorigen}
                                        readOnly
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR CIUDAD ORIGEN"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-8">
                                    <InputComponent
                                        label="Dirección*"
                                        value={oportunidad.direccion}
                                        onChange={ (value) => props.setDireccion(oportunidad, value) }
                                        error={oportunidad.error.direccion}
                                        message={oportunidad.message.direccion}
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Barrio*"
                                        value={oportunidad.barrio}
                                        onChange={ (value) => props.setBarrio(oportunidad, value) }
                                        error={oportunidad.error.barrio}
                                        message={oportunidad.message.barrio}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-4">
                                    <DatePickerComponent
                                        label="Fecha*"
                                        value={oportunidad.fecharegistro}
                                        onChange={ (value) => props.setFechaRegistro(oportunidad, value) }
                                        error={oportunidad.error.fecharegistro}
                                        message={oportunidad.message.fecharegistro}
                                        placeholder="SELECCIONAR FECHA PROGRAMADA"
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <TimePickerComponent
                                        label="Hora*"
                                        value={oportunidad.horaregistro}
                                        onChange={ (value) => props.setHoraRegistro(oportunidad, value) }
                                        error={oportunidad.error.horaregistro}
                                        message={oportunidad.message.horaregistro}
                                        placeholder="SELECCIONAR HORA PROGRAMADA"
                                        format='HH:mm'
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <SelectComponent 
                                        data={EstadoData}
                                        label={"Estado*"}
                                        value={oportunidad.estado}
                                        onChange={ (value) => props.setEstado(oportunidad, value) }
                                        error={oportunidad.error.estado}
                                        message={oportunidad.message.estado}
                                    />
                                </div>
                            </div>
                            <div className='card p-0 m-0'>
                                <div className='card-header p-0'>
                                    <h4>Medio de Contacto</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12">
                                    <ButtonComponent
                                        fullWidth
                                        onClick={props.onAddRowTipoContacto}
                                    >
                                        Agregar Medio Contacto
                                    </ButtonComponent>
                                </div>
                            </div>
                            { oportunidad.arraytipocontacto?.length === 0 &&
                                <div className='card p-0 m-0'>
                                    <div className='card-header'>
                                        <h4>Sin Información</h4>
                                    </div>
                                </div>
                            }
                            <div className='row' style={{ maxHeight: 140, overflowY: 'auto', overflowX: 'hidden', border: '1px solid #E8E8E8' }}>
                                { oportunidad.arraytipocontacto?.map( ( item, key ) => {
                                    return (
                                        <div className="form-group col-4" key={key}>
                                            <InputComponent
                                                label={`Contacto ${key + 1}`}
                                                value={item.tipocontacto}
                                                onClick={ () => {
                                                    setIndexDestailsTipoContacto(key);
                                                    setVisibleTipoContacto(true);
                                                } }
                                                readOnly
                                                style={{ background: 'white', cursor: 'pointer', }}
                                                placeholder="SELECCIONAR TIPO CONTACTO"
                                                close
                                                onClose={ () => props.onDeleteRowTipoContacto(key) }
                                            />
                                        </div>
                                    );
                                } ) }
                            </div>

                            <div className='card p-0 m-0'>
                                <div className='card-header p-0'>
                                    <h4>Medio Publicitario</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12">
                                    <ButtonComponent
                                        fullWidth
                                        onClick={props.onAddRowTipoMedioPublicitario}
                                    >
                                        Agregar Medio Publicitario
                                    </ButtonComponent>
                                </div>
                            </div>
                            { oportunidad.arraytipomediopublicitario?.length === 0 &&
                                <div className='card p-0 m-0'>
                                    <div className='card-header'>
                                        <h4>Sin Información</h4>
                                    </div>
                                </div>
                            }
                            <div className='row' style={{ maxHeight: 140, overflowY: 'auto', overflowX: 'hidden', border: '1px solid #E8E8E8' }}>
                                { oportunidad.arraytipomediopublicitario?.map( ( item, key ) => {
                                    return (
                                        <div className="form-group col-4" key={key}>
                                            <InputComponent
                                                label={`Medio Publicitario ${key + 1}`}
                                                value={item.tipomediopublicitario}
                                                onClick={ () => {
                                                    setIndexDestailsTipoMedioPublicitario(key);
                                                    setVisibleTipoMedioPublicitario(true);
                                                } }
                                                readOnly
                                                style={{ background: 'white', cursor: 'pointer', }}
                                                placeholder="SELECCIONAR TIPO MEDIO PUBLICITARIO"
                                                close
                                                onClose={ () => props.onDeleteRowTipoMedioPublicitario(key) }
                                            />
                                        </div>
                                    );
                                } ) }
                            </div>

                            <div className="row">
                                <div className="form-group col-12">
                                    <TextAreaComponent 
                                        label="Nota"
                                        value={oportunidad.nota}
                                        onChange={ (value) => props.setNota(oportunidad, value) }
                                        rows={2}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade pt-4" id="negociooportunidad" role="tabpanel" aria-labelledby="negociooportunidad-tab">
                            <div className="row">
                                <div className="form-group col-12">
                                    <ButtonComponent
                                        fullWidth
                                        onClick={ () => setVisibleFormAddNegocio(true) }
                                    >
                                        Agregar Negocio
                                    </ButtonComponent>
                                </div>
                            </div>
                            <div className='card p-0 m-0'>
                                <div className='card-header p-0'>
                                    <h4>Negocio Registrados</h4>
                                </div>
                            </div>
                            { oportunidad.arraynegocio?.length === 0 &&
                                <div className='card p-0 m-0'>
                                    <div className='card-header'>
                                        <h4>Sin Información</h4>
                                    </div>
                                </div>
                            }
                            <div className='row' style={{ maxHeight: 550, overflowY: 'auto', overflowX: 'hidden', }}>
                                { oportunidad.arraynegocio?.map( ( item, key ) => {
                                    const arrayactividad = item.arrayactividad;
                                    return (
                                        <div key={key} className='card p-2' style={{ width: '100%', border: '4px solid #574B90', }}>
                                            <div className='card-body'>
                                                <div className="row">
                                                    <div className="form-group col-6">
                                                        <InputComponent
                                                            label="Programa"
                                                            value={item.programa}
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div className="form-group col-3">
                                                        <InputComponent
                                                            label="Turno"
                                                            value={item.turno}
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div className="form-group col-3">
                                                        <InputComponent
                                                            label="Estado Negocio"
                                                            value={item.estadonegocio}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group col-6">
                                                        <InputComponent
                                                            label="Fecha Nombre Negocio"
                                                            value={item.descripcion}
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div className="form-group col-3">
                                                        <InputComponent
                                                            label="Fecha Inicio"
                                                            value={item.fechainicio}
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div className="form-group col-3">
                                                        <InputComponent
                                                            label="Fecha Cierre"
                                                            value={item.fechacierre}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group col-12">
                                                        <TextAreaComponent 
                                                            label="Nota"
                                                            value={item.nota}
                                                            readOnly
                                                            rows={2}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row float-right">
                                                    { ( (key + 1) === oportunidad.arraynegocio?.length ) &&
                                                        <ButtonComponent
                                                            type='danger'
                                                            onClick={ () => props.onDeleteNegocio(item, (negocioUpdate) => {
                                                                if ( negocioUpdate.oportunidad ) {
                                                                    props.setData(negocioUpdate.oportunidad);
                                                                }
                                                            } ) }
                                                        >
                                                            Eliminar Negocio
                                                        </ButtonComponent>
                                                    }
                                                    <ButtonComponent
                                                        onClick={ () => {
                                                            setIdNegocio(item.idnegocio);
                                                            setVisibleFormUpdateNegocio(true);
                                                        } }
                                                        className={''}
                                                    >
                                                        Editar Negocio
                                                    </ButtonComponent>
                                                </div>
                                            </div>
                                            <div className='card-body p-4'>
                                                <div className='card-body mb-2 p-2' style={{ width: '100%', border: '4px solid #17a2b8', }}>
                                                    <div className='card p-0 m-0'>
                                                        <div className='card-header'>
                                                            <h4>Actividades
                                                            <div className="float-right">
                                                                <ButtonComponent
                                                                    fullWidth
                                                                    type='info'
                                                                    onClick={ () => {
                                                                        setIdNegocio(item.idnegocio);
                                                                        setVisibleFormAddActividad(true);
                                                                    } }
                                                                >
                                                                    Agregar Actividad
                                                                </ButtonComponent>
                                                            </div>
                                                            </h4>
                                                        </div>
                                                    </div>
                                                    { item.arrayactividad?.length === 0 &&
                                                        <div className='card p-0 m-0'>
                                                            <div className='card-header'>
                                                                <h4>Sin Información</h4>
                                                            </div>
                                                        </div>
                                                    }
                                                    <Steps className='w-100' 
                                                        style={{ 
                                                            maxHeight: 300, overflowY: 'auto', overflowX: 'hidden', 
                                                            padding: 15, paddingBottom: 20, 
                                                        }}
                                                        current={item.arrayactividad?.length}
                                                        direction="vertical"
                                                        percent={60}
                                                    >
                                                        { item.arrayactividad?.map( ( item, index ) => {
                                                            return (
                                                                <Step 
                                                                    key={index} 
                                                                    title={
                                                                        <div 
                                                                            className='w-100 position-relative' 
                                                                            style={{ borderTop: '2px solid #E8E8E8', fontWeight: 'bold', }}
                                                                        >
                                                                            {`${item.descripcion} - ${item.nroactividad}` }
                                                                        </div>
                                                                    }
                                                                    status={`${(item.descripcion === "COMPLETADA") ? 'finish': 'process'}`}
                                                                    description={
                                                                        <>
                                                                            <div>
                                                                                { `${item.asesorresponsable} - ${item.fechaprogramada} ${item.horaprogramada}` }
                                                                            </div>
                                                                            { (item.nota !== null && item.nota.toString().length > 0) &&
                                                                                <div>
                                                                                    { `${item.nota}` }
                                                                                </div>
                                                                            }
                                                                            <div>
                                                                                { `${item.tipoactividad}` } 
                                                                                { (item.tiporesultado !== null && item.tiporesultado.toString().length > 0) &&
                                                                                    ` - ${item.tiporesultado}`
                                                                                }
                                                                            </div>
                                                                            <div className='w-100 text-right pb-1' style={{ borderBottom: '2px solid #E8E8E8', }}>
                                                                                <ButtonComponent
                                                                                    onClick={ () => {
                                                                                        setIdActividad(item.idactividad);
                                                                                        setVisibleFormUpdateActividad(true);
                                                                                    } }
                                                                                >
                                                                                    Editar Actividad
                                                                                </ButtonComponent>
                                                                                { ((index + 1) === arrayactividad?.length) &&
                                                                                    <ButtonComponent
                                                                                        type='danger'
                                                                                        onClick={ () => props.onDeleteActividad(item, (actividadUpdate) => {
                                                                                            if ( actividadUpdate.oportunidad ) {
                                                                                                props.setData(actividadUpdate.oportunidad);
                                                                                            }
                                                                                        } ) }
                                                                                    >
                                                                                        Eliminar Actividad
                                                                                    </ButtonComponent>
                                                                                }
                                                                            </div>
                                                                        </>
                                                                    }
                                                                />
                                                            );
                                                        } ) }
                                                    </Steps>
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
    oportunidad: state.Oportunidad,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onLimpiar: OportunidadActions.onLimpiar,
    onChange: OportunidadActions.onChange,
    onEdit: OportunidadActions.onEdit,
    setData: OportunidadActions.setShowData,
    onChange: OportunidadActions.onChange,
    setIdentificacion: OportunidadActions.setIdentificacion,
    setDescripcion: OportunidadActions.setDescripcion,
    setFKIDAsesorResponsable: OportunidadActions.setFKIDAsesorResponsable,
    setCelular: OportunidadActions.setCelular,
    setEmail: OportunidadActions.setEmail,
    setFKIDCiudadOrigen: OportunidadActions.setFKIDCiudadOrigen,
    setDireccion: OportunidadActions.setDireccion,
    setBarrio: OportunidadActions.setBarrio,
    setFechaRegistro: OportunidadActions.setFechaRegistro,
    setHoraRegistro: OportunidadActions.setHoraRegistro,
    setNota: OportunidadActions.setNota,
    setEstado: OportunidadActions.setEstado,
    onAddRowTipoContacto: OportunidadActions.onAddRowTipoContacto,
    onDeleteRowTipoContacto: OportunidadActions.onDeleteRowTipoContacto,
    onAddRowTipoMedioPublicitario: OportunidadActions.onAddRowTipoMedioPublicitario,
    onDeleteRowTipoMedioPublicitario: OportunidadActions.onDeleteRowTipoMedioPublicitario,
    onUpdate: OportunidadActions.onUpdate,
    onDeleteNegocio: NegocioActions.onDelete,
    onDeleteActividad: ActividadActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditOportunidad );
