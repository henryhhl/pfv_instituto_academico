
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent, TextAreaComponent } from '../../../../components/components';
import { Functions } from '../../../../utils/functions';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { OportunidadActions } from '../../../../redux/actions/oportunidad/oportunidad.action';

function ShowOportunidad( props ) {
    const { oportunidad } = props;
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

    return (
        <>
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
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowOportunidad );
