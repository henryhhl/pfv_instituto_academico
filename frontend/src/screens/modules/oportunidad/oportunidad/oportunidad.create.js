
import React from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import DatePickerComponent from '../../../../components/date';
import TimePickerComponent from '../../../../components/time';
import { ButtonComponent ,InputComponent, TextAreaComponent } from '../../../../components/components';
import ListadoCiudadModal from '../../parametro/ciudad/modal/ciudad_listado.modal';
import ListadoTipoContactoModal from '../tipocontacto/modal/tipocontacto_listado.modal';
import ListadoAsesorResponsableModal from '../asesorresponsable/modal/asesorresponsable_listado.modal';
import ListadoTipoMedioPublicitarioModal from '../tipomediopublicitario/modal/tipomediopublicitario_listado.modal';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { OportunidadActions } from '../../../../redux/actions/oportunidad/oportunidad.action';

function CreateOportunidad( props ) {
    const { oportunidad } = props;
    const navigate = useNavigate();

    const [ visibleAsesorResponsable, setVisibleAsesorResponsable ] = React.useState(false);
    const [ visibleCiudadOrigen, setVisibleCiudadOrigen ] = React.useState(false);

    const [ indexDetailsTipoContacto, setIndexDestailsTipoContacto ] = React.useState(-1);
    const [ visibleTipoContacto, setVisibleTipoContacto ] = React.useState(false);

    const [ indexDetailsTipoMedioPublicitario, setIndexDestailsTipoMedioPublicitario ] = React.useState(-1);
    const [ visibleTipoMedioPublicitario, setVisibleTipoMedioPublicitario ] = React.useState(false);

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
            />
        );
    };

    const existTipoMedioPublicitario = ( idtipomediopublicitario ) => {
        for (let index = 0; index < oportunidad.arraytipocontacto.length; index++) {
            const element = oportunidad.arraytipocontacto[index];
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
            />
        );
    };

    return (
        <>
            { onComponentAsesorResponsable() }
            { onComponentCiudadOrigen() }
            { onComponentTipoContactoDetalle() }
            { onComponentTipoMedioPublicitarioDetalle() }
            <PaperComponent>
                <CardComponent
                    header={"Nueva Oportunidad"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(oportunidad, onBack) }
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
                        <div className="form-group col-2"></div>
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
    onCreate: OportunidadActions.onCreate,
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
    onAddRowTipoContacto: OportunidadActions.onAddRowTipoContacto,
    onDeleteRowTipoContacto: OportunidadActions.onDeleteRowTipoContacto,
    onAddRowTipoMedioPublicitario: OportunidadActions.onAddRowTipoMedioPublicitario,
    onDeleteRowTipoMedioPublicitario: OportunidadActions.onDeleteRowTipoMedioPublicitario,
    onStore: OportunidadActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateOportunidad );
