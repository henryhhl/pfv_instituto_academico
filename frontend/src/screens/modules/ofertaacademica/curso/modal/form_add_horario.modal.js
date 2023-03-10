
import React from 'react';
import toastr from 'toastr';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import ModalComponent from '../../../../../components/modal';
import InputComponent from '../../../../../components/input';
import ButtonComponent from '../../../../../components/button';
import TimePickerComponent from '../../../../../components/time';
import ListadoAulaModal from '../../../estructurainstitucional/aula/modal/aula_listado.modal';

export default function FormAddHorarioCursoModal( props ) {
    const [ visibleAula, setVisibleAula ] = React.useState(false);

    const [ data, setData ] = React.useState( {
        horainicio: "", horafinal: "", aula: null,
        error: { horainicio: false, horafinal: false, aula: false, },
        message: { horainicio: "", horafinal: "", aula: "", },
    } );

    const onValidate = () => {
        let bandera = false;
        if ( data.horainicio.toString().trim().length === 0 ) {
            data.error.horainicio = true;
            data.message.horainicio = "Campo requerido.";
            bandera = true;
        }
        if ( data.horafinal.toString().trim().length === 0 ) {
            data.error.horafinal = true;
            data.message.horafinal = "Campo requerido.";
            bandera = true;
        }
        if ( data.aula === null ) {
            data.error.aula = true;
            data.message.aula = "Campo requerido.";
            bandera = true;
        }
        if ( bandera === true ) {
            setData( {
                ...data,
                error: data.error,
                message: data.message,
            } );
            Swal.fire( {
                position: 'top-end', icon: 'error',
                title: "No se pudo realizar la Funcionalidad",
                text: "Favor llenar los campos requeridos.",
                showConfirmButton: false, timer: 3000,
            } );
        } else {
            if ( data.horafinal === data.horainicio ) {
                Swal.fire( {
                    position: 'top-end', icon: 'warning',
                    title: "No se pudo realizar la Funcionalidad",
                    text: "No se permite Hora Inicio y Final identicos.",
                    showConfirmButton: false, timer: 3000,
                } );
                return;
            }
            props.onAsignar( data );
        }
    };

    const onComponentAula = () => {
        if ( !visibleAula ) return null;
        return (
            <ListadoAulaModal
                visible={visibleAula}
                onClose={ () => setVisibleAula(false) }
                onSelect={ (aula) => {
                    data.error.aula = false;
                    data.message.aula = "";
                    setData( {
                        ...data, aula: aula,
                        error: data.error, message: data.message,
                    } );
                    setVisibleAula(false);
                } }
            />
        );
    };

    return (
        <>
            <ModalComponent
                visible={props.visible}
                onClose={props.onClose}
                footer={null} width={350} centered
                title={"ADICIÓN DE HORARIO Y AULA"}
                style={{ marginBottom: 30, marginTop: 30, }}
            >
                { onComponentAula() }
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body pb-0">
                                <div className="row">
                                    <div className="form-group col-12">
                                        <TimePickerComponent
                                            label="Hora Inicio*"
                                            value={data.horainicio}
                                            onChange={ (value) => {
                                                if ( value <= data.horafinal || value === "" || data.horafinal === "" ) {
                                                    if ( value === "" ) data.horafinal = "";
                                                    data.error.horainicio = false;
                                                    data.message.horainicio = "";
                                                    setData( { 
                                                        ...data, horainicio: value, 
                                                        horafinal: data.horafinal,
                                                        error: data.error, message: data.message,
                                                    } );
                                                } else {
                                                    toastr.warning( 'no permitido Hora Inicio mayor a Hora Final.', '', { closeButton: true, progressBar: true, } );
                                                }
                                            } }
                                            placeholder="SELECCIONAR HORA INICIO"
                                            error={data.error.horainicio}
                                            message={data.message.horainicio}
                                            format={"HH:mm"}
                                        />
                                    </div>
                                    <div className="form-group col-12">
                                        <TimePickerComponent
                                            label="Hora Final*"
                                            value={data.horafinal}
                                            onChange={ (value) => {
                                                if ( value >= data.horainicio || value === "" ) {
                                                    data.error.horafinal = false;
                                                    data.message.horafinal = "";
                                                    setData( { 
                                                        ...data, horafinal: value,
                                                        error: data.error, message: data.message,
                                                    } );
                                                } else {
                                                    toastr.warning( 'no permitido Hora Final menor a Hora Inicio.', '', { closeButton: true, progressBar: true, } );
                                                }
                                            } }
                                            placeholder="SELECCIONAR HORA FINAL"
                                            error={data.error.horafinal}
                                            message={data.message.horafinal}
                                            format={"HH:mm"}
                                            disabled={ data.horainicio === "" }
                                        />
                                    </div>
                                    <div className="form-group col-12">
                                        <InputComponent
                                            label="Aula"
                                            value={data.aula?.descripcion}
                                            onClick={ () => {
                                                setVisibleAula(true);
                                            } }
                                            readOnly
                                            style={{ background: 'white', cursor: 'pointer', }}
                                            error={data.error.aula}
                                            message={data.message.aula}
                                            placeholder="SELECCIONAR AULA"
                                        />
                                    </div>
                                    <div className="form-group col-12">
                                        <ButtonComponent
                                            onClick={ onValidate }
                                            fullWidth
                                        >
                                            Asignar
                                        </ButtonComponent>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalComponent>
        </>
    );
};

FormAddHorarioCursoModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onAsignar: PropTypes.func,
};

FormAddHorarioCursoModal.defaultProps = {
    visible: false,
    onAsignar: () => {},
};
