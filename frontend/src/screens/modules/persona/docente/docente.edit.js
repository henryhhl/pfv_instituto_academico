
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import DatePickerComponent from '../../../../components/date';
import PaperComponent from '../../../../components/paper';
import { EstadoCivilData } from '../../../../data/estado_civil.data';
import { GeneroData } from '../../../../data/genero.data';
import { DocenteActions } from '../../../../redux/actions/persona/docente.action';
import ListadoCiudadModal from '../../parametro/ciudad/modal/ciudad_listado.modal';
import ListadoTipoIdentificacionModal from '../tipoidentificacion/modal/tipo_identificacion_listado.modal';

function EditDocente( props ) {
    const { docente } = props;
    const [visibleTipoIdentificacion, setVisibleTipoIdentificacion] = React.useState(false);
    const [ visibleCiudadNacimiento, setVisibleCiudadNacimiento ] = React.useState( false );
    const [ visibleCiudadResidencia, setVisibleCiudadResidencia ] = React.useState( false );
    const [ indexDetailsNacionalidad, setIndexDestailsNacionalidad ] = React.useState( -1 );
    const [ visibleNacionalidad, setVisibleNacionalidad ] = React.useState( false );
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onEdit( params.iddocente );
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

    const onComponentNacionalidadDetalle = () => {
        if ( !visibleNacionalidad ) return null;
        return (
            <ListadoCiudadModal
                fkidpadre={true}
                visible={visibleNacionalidad}
                onClose={ () => setVisibleNacionalidad(false) }
                onSelect={ (ciudad) => {
                    let detalle = docente.arraynacionalidad[indexDetailsNacionalidad];
                    detalle.fkidnacionalidad = ciudad.idciudad;
                    detalle.nacionalidad = ciudad.descripcion;
                    props.onChange(docente);
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
                    header={"Editar Docente"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(docente, onBack) }
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
                                label="Fecha Nacimiento*"
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
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    docente: state.Docente,
} );

const mapDispatchToProps = {
    onEdit: DocenteActions.onEdit,
    onLimpiar: DocenteActions.onLimpiar,
    onChange: DocenteActions.onChange,
    onAddNacionalidad: DocenteActions.onAddNacionalidad,
    onDeleteNacionalidad: DocenteActions.onDeleteNacionalidad,
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
    onUpdate: DocenteActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditDocente );
