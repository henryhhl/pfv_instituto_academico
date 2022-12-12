
import React from 'react';
import { Steps } from 'antd';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent, TextAreaComponent } from '../../../../components/components';
import { Functions } from '../../../../utils/functions';
import FormAddNegocioModal from '../negocio/modal/form_add_negocio.modal';
import FormAddActividadModal from '../actividad/modal/form_add_actividad.modal';
import FormUpdateNegocioModal from '../negocio/modal/form_update_negocio.modal';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { NegocioActions } from '../../../../redux/actions/oportunidad/negocio.action';
import { ActividadActions } from '../../../../redux/actions/oportunidad/actividad.action';
import { OportunidadActions } from '../../../../redux/actions/oportunidad/oportunidad.action';

const { Step } = Steps;

function ShowOportunidad( props ) {
    const { oportunidad } = props;

    const [ visibleFormAddNegocio, setVisibleFormAddNegocio ] = React.useState(false);

    const [ idNegocio, setIdNegocio ] = React.useState(null);
    const [ visibleFormUpdateNegocio, setVisibleFormUpdateNegocio ] = React.useState(false);
    const [ visibleFormAddActividad, setVisibleFormAddActividad ] = React.useState(false);

    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onShow(params.idoportunidad);
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

    return (
        <>
            { onComponentFormAddNegocio() }
            { onComponentFormUpdateNegocio() }
            { onComponentFormAddActividad() }
            <PaperComponent>
                <CardComponent
                    header={"Detalle Oportunidad"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={onBack}
                            >
                                Aceptar
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
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-8">
                                    <InputComponent
                                        label="Oportunidad*"
                                        value={oportunidad.descripcion}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-6">
                                    <InputComponent
                                        label="Asesor Responsable*"
                                        value={oportunidad.asesorresponsable}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-2">
                                    <InputComponent
                                        label="Celular*"
                                        value={oportunidad.celular}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Email*"
                                        value={oportunidad.email}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12">
                                    <InputComponent
                                        label="Ciudad Origen*"
                                        value={oportunidad.ciudadorigen}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-8">
                                    <InputComponent
                                        label="Dirección*"
                                        value={oportunidad.direccion}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Barrio*"
                                        value={oportunidad.barrio}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Fecha*"
                                        value={oportunidad.fecharegistro}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Hora*"
                                        value={oportunidad.horaregistro}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Estado"
                                        value={ Functions.getValueEstado( oportunidad.estado ) }
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className='card p-0 m-0'>
                                <div className='card-header p-0'>
                                    <h4>Medio de Contacto</h4>
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
                                                readOnly
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
                                                readOnly
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
                                        readOnly
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
                            <div className='row' style={{ maxHeight: 450, overflowY: 'auto', overflowX: 'hidden', }}>
                                { oportunidad.arraynegocio?.map( ( item, key ) => {
                                    const arrayactividad = item.arrayactividad;
                                    return (
                                        <div key={key} className='card' style={{ width: '100%', border: '4px solid #574B90', }}>
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
                                            <div className='card card-primary p-0 m-0'>
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
                                            <div className='card-body mb-2' style={{ width: '100%', border: '4px solid #17a2b8', }}>
                                                { item.arrayactividad?.length === 0 &&
                                                    <div className='card p-0 m-0'>
                                                        <div className='card-header'>
                                                            <h4>Sin Información</h4>
                                                        </div>
                                                    </div>
                                                }
                                                <Steps className='w-100' 
                                                    style={{ maxHeight: 300, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 20, }}
                                                    current={item.arrayactividad?.length}
                                                    direction="vertical"
                                                    percent={60}
                                                    status='finish'
                                                >
                                                    { item.arrayactividad?.map( ( item, index ) => {
                                                        return (
                                                            <Step 
                                                                key={index} 
                                                                title={
                                                                    <div className='w-100 position-relative' style={{ borderTop: '1px solid #E8E8E8', }}>
                                                                        {`${item.descripcion} - ${item.nroactividad}` }
                                                                    </div>
                                                                }
                                                                status={"process"}
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
                                                                        { ((index + 1) === arrayactividad?.length) &&
                                                                            <div className='float-right'>
                                                                                <ButtonComponent
                                                                                    type='danger'
                                                                                    onClick={ () => props.onDeleteActividad(item, (actividadUpdate) => {
                                                                                        console.log(actividadUpdate)
                                                                                        if ( actividadUpdate.oportunidad ) {
                                                                                            props.setData(actividadUpdate.oportunidad);
                                                                                        }
                                                                                    } ) }
                                                                                >
                                                                                    Eliminar Actividad
                                                                                </ButtonComponent>
                                                                            </div>
                                                                        }
                                                                    </>
                                                                }
                                                            />
                                                        );
                                                    } ) }
                                                </Steps>
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
    onShow: OportunidadActions.onShow,
    setData: OportunidadActions.setShowData,
    onDeleteNegocio: NegocioActions.onDelete,
    onDeleteActividad: ActividadActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowOportunidad );
