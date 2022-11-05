
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { AdministrativoActions } from '../../../../redux/actions/persona/administrativo.action';
import { Functions } from '../../../../utils/functions';

function ShowAdministrativo( props ) {
    const { administrativo } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onShow( params.idadministrativo );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Detalle Administrativo"}
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
                        <div className="form-group col-3">
                            <InputComponent
                                label="Nombre Principal"
                                value={administrativo.nombreprincipal}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Nombre Adicional"
                                value={administrativo.nombreadicional}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Primer Apellido"
                                value={administrativo.apellidoprimero}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Segundo Apellido"
                                value={administrativo.apellidosegundo}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-3">
                            <InputComponent
                                label="Tipo Identificación"
                                value={administrativo.tipoidentificacion}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Nro. Identificación"
                                value={administrativo.numeroidentificacion}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Género"
                                value={ Functions.getValueGenero( administrativo.genero ) }
                                readOnly={true}
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Estado Civil"
                                value={ Functions.getValueEstadoCivil( administrativo.estadocivil ) }
                                readOnly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-5">
                            <InputComponent
                                label="Lugar de Nacimiento*"
                                value={administrativo.ciudadnacimiento}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-5">
                            <InputComponent
                                label="Residencia*"
                                value={administrativo.ciudadresidencia}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-2">
                            <InputComponent
                                label="Fecha Nacimiento"
                                value={administrativo.fechanacimiento}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='card p-0 m-0'>
                        <div className='card-header p-0'>
                            <h4>Nacionalidades</h4>
                        </div>
                    </div>
                    <div className='row' style={{ maxHeight: 350, overflowY: 'auto', overflowX: 'hidden', }}>
                        { administrativo.arraynacionalidad.map( ( item, key ) => {
                            return (
                                <div className="form-group col-4" key={key}>
                                    <InputComponent
                                        label={`Nacionalidad ${key + 1}`}
                                        value={item.nacionalidad}
                                        readOnly
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
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Télefono"
                                value={administrativo.telefono}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Celular"
                                value={administrativo.celular}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-12">
                            <InputComponent
                                label="Dirección"
                                value={administrativo.direccion}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <InputComponent
                                label="Barrio"
                                value={administrativo.barrio}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Manzano"
                                value={administrativo.manzano}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="UV"
                                value={administrativo.uv}
                                readOnly
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
    onShow: AdministrativoActions.onShow,
    onLimpiar: AdministrativoActions.onLimpiar,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowAdministrativo );
