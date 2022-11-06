
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import InputFileComponent from '../../../../components/inputfile';
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
                        </div>
                        <div className="tab-pane fade pt-4" id="asignaturaespecialidad" role="tabpanel" aria-labelledby="asignaturaespecialidad-tab">
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
                            <div style={{ minWidth: '100%', width: '100%', maxWidth: '100%', maxHeight: 450, overflowY: 'auto', overflowX: 'hidden', }}>
                                { docente.arraycategoriadocumento.map( ( item, key ) => {
                                    return (
                                        <div key={key} 
                                            style={{ 
                                                border: '1px solid #E8E8E8', 
                                            }}
                                        >
                                            <div className='row'>
                                                <div className="form-group col-1"></div>
                                                <div className="form-group col-6">
                                                    <InputComponent
                                                        label="Nombre Documento"
                                                        value={item.descripcion}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="form-group col-4">
                                                    <InputComponent
                                                        label="Categoría"
                                                        value={item.categoriadocumento}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className="form-group col-2"></div>
                                                <div className="form-group col-8">
                                                    <div className='input-group'>
                                                        <InputFileComponent
                                                            label="Documento"
                                                            id={`docente-document-details-${key}`}
                                                            readOnly
                                                            documento={item.documento}
                                                            edit={true}
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
