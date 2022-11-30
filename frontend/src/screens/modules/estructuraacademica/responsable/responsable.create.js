
import React from 'react';
import { connect } from 'react-redux';
import { Button, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import DatePickerComponent from '../../../../components/date';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import { GeneroData } from '../../../../data/genero.data';
import ListadoUnidadAcademicaModal from '../unidadacademica/modal/unidad_academica_listado.modal';
import ListadoTipoContactoModal from '../../oportunidad/tipocontacto/modal/tipocontacto_listado.modal';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { ResponsableActions } from '../../../../redux/actions/estructuraacademica/responsable.action';

function CreateResponsable( props ) {
    const { responsable } = props;
    const navigate = useNavigate();
    const [visibleReferenciaContacto, setVisibleReferenciaContacto] = React.useState(false);
    const [visibleUnidadAcademica, setVisibleUnidadAcademica] = React.useState(false);
    const [dataReferenciaContacto, setDataReferenciaContacto] = React.useState(null);
    const [dataUnidadAcademica, setDataUnidadAcademica] = React.useState(null);

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
    }

    const onComponentReferenciaContacto = () => {
        if ( !visibleReferenciaContacto ) return null;
        return (
            <ListadoTipoContactoModal
                visible={visibleReferenciaContacto}
                onClose={ () => setVisibleReferenciaContacto(false) }
                onSelect={ (referenciaContacto) => {
                    let index = dataReferenciaContacto.index;
                    let detalle = responsable.arrayResponsableReferenciaContactoDetalle[index];
                    detalle.fkidreferenciacontacto = referenciaContacto.idreferenciacontacto;
                    detalle.referenciacontacto = referenciaContacto.descripcion;
                    detalle.disabled = false;
                    props.onChange(responsable);
                    setVisibleReferenciaContacto(false);
                } }
            />
        );
    };

    const onComponentUnidadAcademica = () => {
        if ( !visibleUnidadAcademica ) return null;
        return (
            <ListadoUnidadAcademicaModal
                visible={visibleUnidadAcademica}
                onClose={ () => setVisibleUnidadAcademica(false) }
                onSelect={ (unidadAcademica) => {
                    let index = dataUnidadAcademica.index;
                    let detalle = responsable.arrayResponsableUnidadAcademicaDetalle[index];
                    detalle.fkidunidadacademica = unidadAcademica.idunidadacademica;
                    detalle.unidadacademica = unidadAcademica.descripcion;
                    detalle.fkidunidadadministrativa = unidadAcademica.fkidunidadadministrativa;
                    detalle.unidadadministrativa = unidadAcademica.unidadadministrativa;
                    detalle.fkidunidadnegocio = unidadAcademica.fkidunidadnegocio;
                    detalle.unidadnegocio = unidadAcademica.unidadnegocio;
                    props.onChange(responsable);
                    setVisibleUnidadAcademica(false);
                } }
            />
        );
    };

    return (
        <>
            { onComponentReferenciaContacto() }
            { onComponentUnidadAcademica() }
            <PaperComponent>
                <CardComponent
                    header={"Nuevo Responsable"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(responsable, onBack) }
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
                    <ul className="nav nav-pills" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active show" id="home-tab" 
                                data-toggle="tab" href="#home" role="tab" 
                                aria-controls="home" aria-selected="true"
                            >
                                Información General
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="referenciacontacto-tab" data-toggle="tab" href="#referenciacontacto" 
                                role="tab" aria-controls="referenciacontacto" aria-selected="false"
                            >
                                Referencia Contacto
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="unidadacademica-tab" 
                                data-toggle="tab" href="#unidadacademica" role="tab" aria-controls="unidadacademica" aria-selected="false"
                            >
                                Unidad Academica
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade pt-4 active show" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="row">
                                <div className="form-group col-2"></div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Código"
                                        value={responsable.codigo}
                                        onChange={ (value) => props.setCodigo(responsable, value) }
                                        error={responsable.error.codigo}
                                        message={responsable.message.codigo}
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Nro Documento"
                                        value={responsable.nrodocumento}
                                        onChange={ (value) => props.setNroDocumento(responsable, value) }
                                        error={responsable.error.nrodocumento}
                                        message={responsable.message.nrodocumento}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Nombre"
                                        value={responsable.nombre}
                                        onChange={ (value) => props.setNombre(responsable, value) }
                                        error={responsable.error.nombre}
                                        message={responsable.message.nombre}
                                    />
                                </div>
                                <div className="form-group col-8">
                                    <InputComponent
                                        label="Apellido"
                                        value={responsable.apellido}
                                        onChange={ (value) => props.setApellido(responsable, value) }
                                        error={responsable.error.apellido}
                                        message={responsable.message.apellido}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Ciudad"
                                        value={responsable.ciudad}
                                        onChange={ (value) => props.setCiudad(responsable, value) }
                                        error={responsable.error.ciudad}
                                        message={responsable.message.ciudad}
                                    />
                                </div>
                                <div className="form-group col-8">
                                    <InputComponent
                                        label="Dirección"
                                        value={responsable.direccion}
                                        onChange={ (value) => props.setDireccion(responsable, value) }
                                        error={responsable.error.direccion}
                                        message={responsable.message.direccion}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-2"></div>
                                <div className="form-group col-4">
                                    <SelectComponent 
                                        data={GeneroData}
                                        label={"Genero"}
                                        value={responsable.genero}
                                        onChange={ (value) => props.setGenero(responsable, value) }
                                        error={responsable.error.genero}
                                        message={responsable.message.genero}
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <DatePickerComponent
                                        label="Fecha Nacimiento"
                                        value={responsable.fechanacimiento}
                                        onChange={ (value) => props.setFechaNacimiento(responsable, value) }
                                        error={responsable.error.fechanacimiento}
                                        message={responsable.message.fechanacimiento}
                                        placeholder="SELECCIONAR FECHA"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade pt-4" id="referenciacontacto" role="tabpanel" aria-labelledby="referenciacontacto-tab">
                            <div className="row">
                                <div className="form-group col-12">
                                    <ButtonComponent
                                        fullWidth
                                        onClick={props.onAddReferenciaContacto}
                                    >
                                        Agregar
                                    </ButtonComponent>
                                </div>
                            </div>
                            <div style={{ minWidth: '100%', width: '100%', maxWidth: '100%', maxHeight: 350, overflowY: 'auto', overflowX: 'hidden', }}>
                                { responsable.arrayResponsableReferenciaContactoDetalle.map( ( item, key ) => {
                                    return (
                                        <div className="row" key={key} style={{ justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid #E8E8E8' }}>
                                            <div className="form-group col-6">
                                                <InputComponent
                                                    label="Referencia"
                                                    value={item.referenciacontacto}
                                                    onClick={ () => {
                                                        item.index = key;
                                                        setDataReferenciaContacto(item);
                                                        setVisibleReferenciaContacto(true);
                                                    } }
                                                    readOnly
                                                    style={{ background: 'white', cursor: 'pointer', }}
                                                    placeholder="SELECCIONAR REFERENCIA CONTACTO"
                                                />
                                            </div>
                                            <div className="form-group col-5">
                                                <InputComponent
                                                    label="Detalle"
                                                    value={item.detalle}
                                                    readOnly={item.disabled}
                                                    onChange={ (value) => {
                                                        item.detalle = value;
                                                        props.onChange(responsable);
                                                    } }
                                                />
                                            </div>
                                            <div className="form-group col-1 pt-4">
                                                <Tooltip placement="top" title={"Eliminar"}>
                                                    <Button 
                                                        onClick={() => {
                                                            props.onDeleteRowReferenciaContacto(key);
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
                        <div className="tab-pane fade pt-4" id="unidadacademica" role="tabpanel" aria-labelledby="unidadacademica-tab">
                            <div className="row">
                                <div className="form-group col-12">
                                    <ButtonComponent
                                        fullWidth
                                        onClick={props.onAddUnidadAcademica}
                                    >
                                        Agregar
                                    </ButtonComponent>
                                </div>
                            </div>
                            <div style={{ minWidth: '100%', width: '100%', maxWidth: '100%', maxHeight: 350, overflowY: 'auto', overflowX: 'hidden', }}>
                                { responsable.arrayResponsableUnidadAcademicaDetalle.map( ( item, key ) => {
                                    return (
                                        <div className="row" key={key} style={{ justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid #E8E8E8' }}>
                                            <div className="form-group col-4">
                                                <InputComponent
                                                    label="Unidad Academica"
                                                    value={item.unidadacademica}
                                                    onClick={ () => {
                                                        item.index = key;
                                                        setDataUnidadAcademica(item);
                                                        setVisibleUnidadAcademica(true);
                                                    } }
                                                    readOnly
                                                    style={{ background: 'white', cursor: 'pointer', }}
                                                    placeholder="SELECCIONAR UNIDAD ACADEMICA"
                                                />
                                            </div>
                                            <div className="form-group col-4">
                                                <InputComponent
                                                    label="Unidad Administrativa"
                                                    value={item.unidadadministrativa}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="form-group col-3">
                                                <InputComponent
                                                    label="Unidad Negocio"
                                                    value={item.unidadnegocio}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="form-group col-1 pt-4">
                                                <Tooltip placement="top" title={"Eliminar"}>
                                                    <Button 
                                                        onClick={() => {
                                                            props.onDeleteRowUnidadAcademica(key);
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
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    responsable: state.Responsable,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onAddReferenciaContacto: ResponsableActions.onAddReferenciaContacto,
    onDeleteRowReferenciaContacto: ResponsableActions.onDeleteRowReferenciaContacto,
    onAddUnidadAcademica: ResponsableActions.onAddUnidadAcademica,
    onDeleteRowUnidadAcademica: ResponsableActions.onDeleteRowUnidadAcademica,
    onChange: ResponsableActions.onChange,
    onLimpiar: ResponsableActions.onLimpiar,
    onCreate: ResponsableActions.onCreate,
    setCodigo: ResponsableActions.setCodigo,
    setNroDocumento: ResponsableActions.setNroDocumento,
    setNombre: ResponsableActions.setNombre,
    setApellido: ResponsableActions.setApellido,
    setCiudad: ResponsableActions.setCiudad,
    setDireccion: ResponsableActions.setDireccion,
    setGenero: ResponsableActions.setGenero,
    setFechaNacimiento: ResponsableActions.setFechaNacimiento,
    onStore: ResponsableActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateResponsable );
