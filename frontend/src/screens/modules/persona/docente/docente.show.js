
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import InputFileComponent from '../../../../components/inputfile';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { Functions } from '../../../../utils/functions';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { DocenteActions } from '../../../../redux/actions/persona/docente.action';

function ShowDocente( props ) {
    const { docente } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onShow( params.iddocente );
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
                            <a className="nav-link" id="estudio-tab" data-toggle="tab" href="#estudio" 
                                role="tab" aria-controls="estudio" aria-selected="false"
                            >
                                Estudios
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="asignaturaespecialidad-tab" data-toggle="tab" href="#asignaturaespecialidad" 
                                role="tab" aria-controls="asignaturaespecialidad" aria-selected="false"
                            >
                                Asignatura de Especialidad
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
                                        label="Nacimiento"
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
                            { docente.arraynacionalidad.length === 0 &&
                                <div className='card p-0 m-0'>
                                    <div className='card-header'>
                                        <h4>Sin Nacionalidades</h4>
                                    </div>
                                </div>
                            }
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
                        </div>
                        <div className="tab-pane fade pt-4" id="estudio" role="tabpanel" aria-labelledby="estudio-tab">
                            { docente.arrayestudio.length === 0 &&
                                <div className='card p-0 m-0'>
                                    <div className='card-header'>
                                        <h4>Sin Información</h4>
                                    </div>
                                </div>
                            }
                            <div style={{ minWidth: '100%', width: '100%', maxWidth: '100%', maxHeight: 650, overflowY: 'auto', overflowX: 'hidden', }}>
                                <div className="row">
                                    { docente.arrayestudio.map( ( item, key ) => {
                                        return (
                                            <div className="col-12 col-sm-6 col-md-4 col-lg-4" key={key}>
                                                <div className="card card-sm position-relative card-success">
                                                    <i className="card-icon text-danger ion ion-ios-paper-outline"
                                                        style={ { position: 'absolute', left: -20, top: -28, } }
                                                    ></i>
                                                    <div className="card-body">
                                                        <div className="form-group col-12 pl-1">
                                                            <InputComponent
                                                                label="Institución"
                                                                value={item.institucion}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 pl-1">
                                                            <InputComponent
                                                                label="Nivel Academico"
                                                                value={item.nivelacademico}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 pl-1">
                                                            <InputComponent
                                                                label="Nombre de Título"
                                                                value={item.descripcion}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 pl-1">
                                                            <InputComponent
                                                                label="Es Graduado"
                                                                value={ Functions.getValueConfirmacion( item.esgraduado ) }
                                                                readOnly={true}
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 pl-1">
                                                            <InputComponent
                                                                label="Año Cursado"
                                                                value={item.ultimoyearcursado}
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
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    } ) }
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade pt-4" id="asignaturaespecialidad" role="tabpanel" aria-labelledby="asignaturaespecialidad-tab">
                            { docente.arraymateria.length === 0 &&
                                <div className='card p-0 m-0'>
                                    <div className='card-header'>
                                        <h4>Sin Documento Digital</h4>
                                    </div>
                                </div>
                            }
                            <div style={{ minWidth: '100%', width: '100%', maxWidth: '100%', maxHeight: 450, overflowY: 'auto', overflowX: 'hidden', }}>
                                { docente.arraymateria.map( ( item, key ) => {
                                    return (
                                        <div className="row" key={key} 
                                            style={{ 
                                                justifyContent: 'center', alignItems: 'center', 
                                                borderBottom: '1px solid #E8E8E8', 
                                            }}
                                        >
                                            <div className="form-group col-6">
                                                <InputComponent
                                                    label="Materia"
                                                    value={item.materia}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="form-group col-3">
                                                <InputComponent
                                                    label="Tipo Prioridad"
                                                    value={item.tipoprioridad}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="form-group col-3">
                                                <InputComponent
                                                    label="Estado"
                                                    value={ Functions.getValueEstado( item.estado ) }
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    );
                                } ) }
                            </div>
                        </div>
                        <div className="tab-pane fade pt-4" id="documentodigital" role="tabpanel" aria-labelledby="documentodigital-tab">
                            { docente.arraycategoriadocumento.length === 0 &&
                                <div className='card p-0 m-0'>
                                    <div className='card-header'>
                                        <h4>Sin Documento Digital</h4>
                                    </div>
                                </div>
                            }
                            <div style={{ minWidth: '100%', width: '100%', maxWidth: '100%', maxHeight: 450, overflowY: 'auto', overflowX: 'hidden', }}>
                                <div className="row">
                                    { docente.arraycategoriadocumento.map( ( item, key ) => {
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
                                                                id={`docente-document-details-${key}`}
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
    docente: state.Docente,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onShow: DocenteActions.onShow,
    onLimpiar: DocenteActions.onLimpiar,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowDocente );
