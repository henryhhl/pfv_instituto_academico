
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import DatePickerComponent from '../../../../components/date';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import { GeneroData } from '../../../../data/genero.data';
import { EstadoCivilData } from '../../../../data/estado_civil.data';
import ListadoCiudadModal from '../../parametro/ciudad/modal/ciudad_listado.modal';
import ListadoTipoIdentificacionModal from '../../persona/tipoidentificacion/modal/tipo_identificacion_listado.modal';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { AsesorResponsableActions } from '../../../../redux/actions/oportunidad/asesorresponsable.action';

function EditAsesorResponsable( props ) {
    const { asesorResponsable } = props;
    
    const navigate = useNavigate();
    const params = useParams();

    const [ visibleTipoIdentificacion, setVisibleTipoIdentificacion ] = React.useState(false);
    const [ visibleCiudadNacimiento, setVisibleCiudadNacimiento ] = React.useState(false);
    const [ visibleCiudadResidencia, setVisibleCiudadResidencia ] = React.useState(false);

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onEdit( params.idasesorresponsable );
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
                    props.setFKIDTipoIdentificacion(asesorResponsable, tipoIdentificacion);
                    setVisibleTipoIdentificacion(false);
                } }
                valueSelect={asesorResponsable?.fkidtipoidentificacion}
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
                    props.setFKIDCiudadNacimiento(asesorResponsable, ciudad);
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
                    props.setFKIDCiudadResidencia(asesorResponsable, ciudad);
                    setVisibleCiudadResidencia(false);
                } }
            />
        );
    };

    return (
        <>
            { onComponentTipoIdentificacion() }
            { onComponentCiudadNacimiento() }
            { onComponentCiudadResidencia() }
            <PaperComponent>
                <CardComponent
                    header={"Editar Asesor Administrativo"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(asesorResponsable, onBack) }
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
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade pt-4 active show" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="row">
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Nombre Principal*"
                                        value={asesorResponsable.nombreprincipal}
                                        onChange={ (value) => props.setNombrePrincipal(asesorResponsable, value) }
                                        error={asesorResponsable.error.nombreprincipal}
                                        message={asesorResponsable.message.nombreprincipal}
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Nombre Adicional"
                                        value={asesorResponsable.nombreadicional}
                                        onChange={ (value) => props.setNombreAdicional(asesorResponsable, value) }
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Primer Apellido*"
                                        value={asesorResponsable.apellidoprimero}
                                        onChange={ (value) => props.setApellidoPrimero(asesorResponsable, value) }
                                        error={asesorResponsable.error.apellidoprimero}
                                        message={asesorResponsable.message.apellidoprimero}
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Segundo Apellido"
                                        value={asesorResponsable.apellidosegundo}
                                        onChange={ (value) => props.setApellidoSegundo(asesorResponsable, value) }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Tipo Identificación*"
                                        value={asesorResponsable.tipoidentificacion}
                                        onClick={ () => {
                                            setVisibleTipoIdentificacion(true);
                                        } }
                                        readOnly
                                        error={asesorResponsable.error.fkidtipoidentificacion}
                                        message={asesorResponsable.message.fkidtipoidentificacion}
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR TIPO IDENTIFICACIÓN"
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Nro. Identificación*"
                                        value={asesorResponsable.numeroidentificacion}
                                        onChange={ (value) => props.setNumeroIdentificacion(asesorResponsable, value) }
                                        error={asesorResponsable.error.numeroidentificacion}
                                        message={asesorResponsable.message.numeroidentificacion}
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <SelectComponent 
                                        data={GeneroData}
                                        label={"Género*"}
                                        value={asesorResponsable.genero}
                                        onChange={ (value) => props.setGenero(asesorResponsable, value) }
                                        error={asesorResponsable.error.genero}
                                        message={asesorResponsable.message.genero}
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <SelectComponent 
                                        data={EstadoCivilData}
                                        label={"Estado Civil*"}
                                        value={asesorResponsable.estadocivil}
                                        onChange={ (value) => props.setEstadoCivil(asesorResponsable, value) }
                                        error={asesorResponsable.error.estadocivil}
                                        message={asesorResponsable.message.estadocivil}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-6">
                                    <InputComponent
                                        label="Lugar de Nacimiento*"
                                        value={asesorResponsable.ciudadnacimiento}
                                        onClick={ () => setVisibleCiudadNacimiento(true) }
                                        error={asesorResponsable.error.fkidciudadnacimiento}
                                        message={asesorResponsable.message.fkidciudadnacimiento}
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR LUGAR DE NACIMIENTO"
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-6">
                                    <InputComponent
                                        label="Residencia*"
                                        value={asesorResponsable.ciudadresidencia}
                                        onClick={ () => setVisibleCiudadResidencia(true) }
                                        error={asesorResponsable.error.fkidciudadresidencia}
                                        message={asesorResponsable.message.fkidciudadresidencia}
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR RESIDENCIA"
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-3">
                                    <DatePickerComponent
                                        label="Nacimiento*"
                                        value={asesorResponsable.fechanacimiento}
                                        onChange={ (value) => props.setFechaNacimiento(asesorResponsable, value) }
                                        error={asesorResponsable.error.fechanacimiento}
                                        message={asesorResponsable.message.fechanacimiento}
                                        placeholder="SELECCIONAR FECHA NACIMIENTO"
                                        disabledDateNowBack
                                    />
                                </div>
                                <div className="form-group col-6">
                                    <InputComponent
                                        label="Nombre Comision*"
                                        value={asesorResponsable.comision}
                                        onChange={ (value) => props.setComision(asesorResponsable, value) }
                                        error={asesorResponsable.error.comision}
                                        message={asesorResponsable.message.comision}
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="%Comisión*"
                                        value={asesorResponsable.valorporcentaje}
                                        onChange={ (value) => props.setValorPorcentaje(asesorResponsable, value) }
                                        error={asesorResponsable.error.valorporcentaje}
                                        message={asesorResponsable.message.valorporcentaje}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-6">
                                    <InputComponent
                                        label="Email"
                                        value={asesorResponsable.email}
                                        onChange={ (value) => props.setEmail(asesorResponsable, value) }
                                        error={asesorResponsable.error.email}
                                        message={asesorResponsable.message.email}
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Télefono"
                                        value={asesorResponsable.telefono}
                                        onChange={ (value) => props.setTelefono(asesorResponsable, value) }
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Celular"
                                        value={asesorResponsable.celular}
                                        onChange={ (value) => props.setCelular(asesorResponsable, value) }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12">
                                    <InputComponent
                                        label="Dirección"
                                        value={asesorResponsable.direccion}
                                        onChange={ (value) => props.setDireccion(asesorResponsable, value) }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-6">
                                    <InputComponent
                                        label="Barrio"
                                        value={asesorResponsable.barrio}
                                        onChange={ (value) => props.setBarrio(asesorResponsable, value) }
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Manzano"
                                        value={asesorResponsable.manzano}
                                        onChange={ (value) => props.setManzano(asesorResponsable, value) }
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="UV"
                                        value={asesorResponsable.uv}
                                        onChange={ (value) => props.setUV(asesorResponsable, value) }
                                    />
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
    asesorResponsable: state.AsesorResponsable,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onEdit: AsesorResponsableActions.onEdit,
    onLimpiar: AsesorResponsableActions.onLimpiar,
    onChange: AsesorResponsableActions.onChange,
    setComision: AsesorResponsableActions.setComision,
    setValorPorcentaje: AsesorResponsableActions.setValorPorcentaje,
    setNombrePrincipal: AsesorResponsableActions.setNombrePrincipal,
    setNombreAdicional: AsesorResponsableActions.setNombreAdicional,
    setApellidoPrimero: AsesorResponsableActions.setApellidoPrimero,
    setApellidoSegundo: AsesorResponsableActions.setApellidoSegundo,
    setFKIDTipoIdentificacion: AsesorResponsableActions.setFKIDTipoIdentificacion,
    setNumeroIdentificacion: AsesorResponsableActions.setNumeroIdentificacion,
    setFechaNacimiento: AsesorResponsableActions.setFechaNacimiento,
    setGenero: AsesorResponsableActions.setGenero,
    setEstadoCivil: AsesorResponsableActions.setEstadoCivil,
    setFKIDCiudadNacimiento: AsesorResponsableActions.setFKIDCiudadNacimiento,
    setFKIDCiudadResidencia: AsesorResponsableActions.setFKIDCiudadResidencia,
    setDireccion: AsesorResponsableActions.setDireccion,
    setBarrio: AsesorResponsableActions.setBarrio,
    setManzano: AsesorResponsableActions.setManzano,
    setUV: AsesorResponsableActions.setUV,
    setTelefono: AsesorResponsableActions.setTelefono,
    setCelular: AsesorResponsableActions.setCelular,
    setEmail: AsesorResponsableActions.setEmail,
    onUpdate: AsesorResponsableActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditAsesorResponsable );
