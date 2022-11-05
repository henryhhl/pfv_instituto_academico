
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import DatePickerComponent from '../../../../components/date';
import PaperComponent from '../../../../components/paper';
import { EstadoCivilData } from '../../../../data/estado_civil.data';
import { GeneroData } from '../../../../data/genero.data';
import { AdministrativoActions } from '../../../../redux/actions/persona/administrativo.action';
import ListadoCiudadModal from '../../parametro/ciudad/modal/ciudad_listado.modal';
import ListadoTipoIdentificacionModal from '../tipoidentificacion/modal/tipo_identificacion_listado.modal';

function EditAdministrativo( props ) {
    const { administrativo } = props;
    const [visibleTipoIdentificacion, setVisibleTipoIdentificacion] = React.useState(false);
    const [ visibleCiudadNacimiento, setVisibleCiudadNacimiento ] = React.useState( false );
    const [ visibleCiudadResidencia, setVisibleCiudadResidencia ] = React.useState( false );
    const [ indexDetailsNacionalidad, setIndexDestailsNacionalidad ] = React.useState( -1 );
    const [ visibleNacionalidad, setVisibleNacionalidad ] = React.useState( false );
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onEdit( params.idadministrativo );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

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

    const onComponentNacionalidadDetalle = () => {
        if ( !visibleNacionalidad ) return null;
        return (
            <ListadoCiudadModal
                fkidpadre={true}
                visible={visibleNacionalidad}
                onClose={ () => setVisibleNacionalidad(false) }
                onSelect={ (ciudad) => {
                    let detalle = administrativo.arraynacionalidad[indexDetailsNacionalidad];
                    detalle.fkidnacionalidad = ciudad.idciudad;
                    detalle.nacionalidad = ciudad.descripcion;
                    props.onChange(administrativo);
                    setVisibleNacionalidad(false);
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
                                label="Fecha Nacimiento*"
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
                                        placeholder="SELECCIONAR Nacionalidad"
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
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    administrativo: state.Administrativo,
} );

const mapDispatchToProps = {
    onEdit: AdministrativoActions.onEdit,
    onLimpiar: AdministrativoActions.onLimpiar,
    onChange: AdministrativoActions.onChange,
    onAddNacionalidad: AdministrativoActions.onAddNacionalidad,
    onDeleteNacionalidad: AdministrativoActions.onDeleteNacionalidad,
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
