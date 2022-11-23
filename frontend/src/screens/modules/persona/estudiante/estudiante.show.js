
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import InputFileComponent from '../../../../components/inputfile';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { Functions } from '../../../../utils/functions';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { EstudianteActions } from '../../../../redux/actions/persona/estudiante.action';

function ShowEstudiante( props ) {
    const { estudiante } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onShow( params.idestudiante );
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

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Detalle Estudiante"}
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
                            <a className="nav-link" id="familiar-tab" data-toggle="tab" href="#familiar" 
                                role="tab" aria-controls="familiar" aria-selected="false"
                            >
                                Familiar
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="documentodigital-tab" data-toggle="tab" href="#documentodigital" 
                                role="tab" aria-controls="documentodigital" aria-selected="false"
                            >
                                Documento Digital
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade pt-4 active show" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="row">
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Nombre Principal"
                                        value={estudiante.nombreprincipal}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Nombre Adicional"
                                        value={estudiante.nombreadicional}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Primer Apellido"
                                        value={estudiante.apellidoprimero}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Segundo Apellido"
                                        value={estudiante.apellidosegundo}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Tipo Identificación"
                                        value={estudiante.tipoidentificacion}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Nro. Identificación"
                                        value={estudiante.numeroidentificacion}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Género"
                                        value={ Functions.getValueGenero( estudiante.genero ) }
                                        readOnly={true}
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Estado Civil"
                                        value={ Functions.getValueEstadoCivil( estudiante.estadocivil ) }
                                        readOnly={true}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-2"></div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Nro. Registro"
                                        value={estudiante.numeroregistro}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Estado"
                                        value={ Functions.getValueEstado( estudiante.estado ) }
                                        readOnly={true}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-5">
                                    <InputComponent
                                        label="Lugar de Nacimiento*"
                                        value={estudiante.ciudadnacimiento}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-5">
                                    <InputComponent
                                        label="Residencia*"
                                        value={estudiante.ciudadresidencia}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-2">
                                    <InputComponent
                                        label="Nacimiento"
                                        value={estudiante.fechanacimiento}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className='card p-0 m-0'>
                                <div className='card-header p-0'>
                                    <h4>Nacionalidades</h4>
                                </div>
                            </div>
                            { estudiante.arraynacionalidad?.length === 0 &&
                                <div className='card p-0 m-0'>
                                    <div className='card-header'>
                                        <h4>Sin Nacionalidades</h4>
                                    </div>
                                </div>
                            }
                            <div className='row' style={{ maxHeight: 350, overflowY: 'auto', overflowX: 'hidden', }}>
                                { estudiante.arraynacionalidad?.map( ( item, key ) => {
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
                                        value={estudiante.email}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Télefono"
                                        value={estudiante.telefono}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Celular"
                                        value={estudiante.celular}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12">
                                    <InputComponent
                                        label="Dirección"
                                        value={estudiante.direccion}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-6">
                                    <InputComponent
                                        label="Barrio"
                                        value={estudiante.barrio}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Manzano"
                                        value={estudiante.manzano}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="UV"
                                        value={estudiante.uv}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade pt-4" id="familiar" role="tabpanel" aria-labelledby="familiar-tab">
                            { estudiante.arrayfamiliar?.length === 0 &&
                                <div className='card p-0 m-0'>
                                    <div className='card-header'>
                                        <h4>Sin Información</h4>
                                    </div>
                                </div>
                            }
                            <div className="row">
                                { estudiante.arrayfamiliar?.map( ( item, key ) => {
                                    return (
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12" key={key}>
                                            <div className="card card-sm position-relative card-success">
                                                <i className="card-icon text-danger ion ion-ios-paper-outline"
                                                    style={ { position: 'absolute', left: -20, top: -28, } }
                                                ></i>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="form-group col-3">
                                                            <InputComponent
                                                                label="Nombre Principal*"
                                                                value={item.nombreprincipal}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="form-group col-3">
                                                            <InputComponent
                                                                label="Nombre Adicional"
                                                                value={item.nombreadicional}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="form-group col-3">
                                                            <InputComponent
                                                                label="Primer Apellido*"
                                                                value={item.apellidoprimero}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="form-group col-3">
                                                            <InputComponent
                                                                label="Segundo Apellido"
                                                                value={item.apellidosegundo}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-3">
                                                            <InputComponent
                                                                label="Tipo Identificación*"
                                                                value={item.tipoidentificacion}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="form-group col-3">
                                                            <InputComponent
                                                                label="Nro. Identificación*"
                                                                value={item.numeroidentificacion}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="form-group col-3">
                                                            <InputComponent
                                                                label="Género*"
                                                                value={ Functions.getValueGenero( item.estado ) }
                                                                readOnly={true}
                                                            />
                                                        </div>
                                                        <div className="form-group col-3">
                                                            <InputComponent
                                                                label="Estado Civil*"
                                                                value={ Functions.getValueEstadoCivil( item.estado ) }
                                                                readOnly={true}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-6">
                                                            <InputComponent
                                                                label="Lugar de Nacimiento*"
                                                                value={item.ciudadnacimiento}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="form-group col-6">
                                                            <InputComponent
                                                                label="Residencia*"
                                                                value={item.ciudadresidencia}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-4">
                                                            <InputComponent
                                                                label="Fecha Nacimiento*"
                                                                value={item.fechanacimiento}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="form-group col-4">
                                                            <InputComponent
                                                                label="Tipo relación Familiar*"
                                                                value={item.tiporelacion}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="form-group col-4">
                                                            <InputComponent
                                                                label="Tipo Sangre"
                                                                value={item.tiposangre}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-6">
                                                            <InputComponent
                                                                label="Email"
                                                                value={item.email}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="form-group col-3">
                                                            <InputComponent
                                                                label="Télefono"
                                                                value={item.telefono}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="form-group col-3">
                                                            <InputComponent
                                                                label="Celular"
                                                                value={item.celular}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-12">
                                                            <InputComponent
                                                                label="Dirección"
                                                                value={item.direccion}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-6">
                                                            <InputComponent
                                                                label="Barrio"
                                                                value={item.barrio}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="form-group col-3">
                                                            <InputComponent
                                                                label="Manzano"
                                                                value={item.manzano}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="form-group col-3">
                                                            <InputComponent
                                                                label="UV"
                                                                value={item.uv}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='card p-0 m-0 pl-1'>
                                                        <div className='card-header'>
                                                            <h4>Detalle Laboral</h4>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-4">
                                                            <InputComponent
                                                                label="Profesión"
                                                                value={item.profesion}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="form-group col-4">
                                                            <InputComponent
                                                                label="Tipo Laboral*"
                                                                value={ Functions.getValueTipoEmpleado( item.tipoempleado ) }
                                                                readOnly={true}
                                                            />
                                                        </div>
                                                        <div className="form-group col-4">
                                                            <InputComponent
                                                                label="Nivel Academico"
                                                                value={item.nivelacademico}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="form-group col-4">
                                                            <InputComponent
                                                                label="Especialidad"
                                                                value={item.especialidad}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="form-group col-8">
                                                            <InputComponent
                                                                label="Dirección Empresa"
                                                                value={item.direccionempresa}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                } ) }
                            </div>
                        </div>
                        <div className="tab-pane fade pt-4" id="documentodigital" role="tabpanel" aria-labelledby="documentodigital-tab">
                            { estudiante.arraycategoriadocumento?.length === 0 &&
                                <div className='card p-0 m-0'>
                                    <div className='card-header'>
                                        <h4>Sin Documento Digital</h4>
                                    </div>
                                </div>
                            }
                            <div style={{ minWidth: '100%', width: '100%', maxWidth: '100%', maxHeight: 450, overflowY: 'auto', overflowX: 'hidden', }}>
                                <div className="row">
                                    { estudiante.arraycategoriadocumento?.map( ( item, key ) => {
                                        return (
                                            <div className="col-12 col-sm-6 col-md-4 col-lg-4" key={key}>
                                                <div className="card card-sm position-relative card-success">
                                                    <i className="card-icon text-danger ion ion-ios-paper-outline"
                                                        style={ { position: 'absolute', left: -20, top: -28, } }
                                                    ></i>
                                                    <div className="card-body">
                                                        <div className="form-group col-12 pl-1">
                                                            <InputComponent
                                                                label="Categoría"
                                                                value={item.categoriadocumento}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 pl-1">
                                                            <InputComponent
                                                                label="Nombre Documento"
                                                                value={item.descripcion}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 pl-1">
                                                            <InputComponent
                                                                label="Estado"
                                                                value={ Functions.getValueEstado( item.estado ) }
                                                                readOnly={true}
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 pl-1">
                                                            <InputFileComponent
                                                                label="Eligir Documento"
                                                                id={`estudiante-document-details-${key}`}
                                                                disabled
                                                                documento={item.documento}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    } ) }
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
    estudiante: state.Estudiante,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onShow: EstudianteActions.onShow,
    onLimpiar: EstudianteActions.onLimpiar,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowEstudiante );
