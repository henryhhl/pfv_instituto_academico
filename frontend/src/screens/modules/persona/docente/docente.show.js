
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { DocenteActions } from '../../../../redux/actions/persona/docente.action';
import { Functions } from '../../../../utils/functions';

function ShowDocente( props ) {
    const { docente } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onShow( params.iddocente );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Detalle Docente"}
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
                                value={docente.nombreprincipal}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Nombre Adicional"
                                value={docente.nombreadicional}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Primer Apellido"
                                value={docente.apellidoprimero}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Segundo Apellido"
                                value={docente.apellidosegundo}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-3">
                            <InputComponent
                                label="Tipo Identificación"
                                value={docente.tipoidentificacion}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Nro. Identificación"
                                value={docente.numeroidentificacion}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Género"
                                value={ Functions.getValueGenero( docente.genero ) }
                                readOnly={true}
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Estado Civil"
                                value={ Functions.getValueEstadoCivil( docente.estadocivil ) }
                                readOnly={true}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-5">
                            <InputComponent
                                label="Lugar de Nacimiento*"
                                value={docente.ciudadnacimiento}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-5">
                            <InputComponent
                                label="Residencia*"
                                value={docente.ciudadresidencia}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-2">
                            <InputComponent
                                label="Fecha Nacimiento"
                                value={docente.fechanacimiento}
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
                        { docente.arraynacionalidad.map( ( item, key ) => {
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
                                value={docente.email}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Télefono"
                                value={docente.telefono}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Celular"
                                value={docente.celular}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-12">
                            <InputComponent
                                label="Dirección"
                                value={docente.direccion}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <InputComponent
                                label="Barrio"
                                value={docente.barrio}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Manzano"
                                value={docente.manzano}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="UV"
                                value={docente.uv}
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
    docente: state.Docente,
} );

const mapDispatchToProps = {
    onShow: DocenteActions.onShow,
    onLimpiar: DocenteActions.onLimpiar,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowDocente );
