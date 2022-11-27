
import React from 'react';
import toastr from 'toastr';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import ModalComponent from '../../../../../components/modal';
import ButtonComponent from '../../../../../components/button';
import TimePickerComponent from '../../../../../components/time';

export default function FormCursoHorarioModal( props ) {
    const [ data, setData ] = React.useState( {
        horainicio: "", horafinal: "",
        error: { horainicio: false, horafinal: false, },
        message: { horainicio: "", horafinal: "", },
    } );

    const existsHorario = () => {
        for (let index = 0; index < props.arrayhorario.length; index++) {
            const element = props.arrayhorario[index];
            if ( data.horainicio < element.horafinal && data.horainicio >= element.horainicio ) return true;
            if ( data.horafinal > element.horainicio && data.horafinal <= element.horafinal ) return true;
        }
        return false;
    };

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
            if ( existsHorario() ) {
                toastr.warning( 'Horario ya establecido, favor intentar con uno nuevo.', '', { closeButton: true, progressBar: true, } );
                return;
            }
            props.onOk( data );
        }
    };

    return (
        <>
            <ModalComponent
                visible={props.visible}
                onClose={props.onClose}
                footer={null} width={320} centered
                title={"ADICIÓN HORARIO"}
                style={{ marginBottom: 30, marginTop: 30, }}
            >
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
                                                        ...data,
                                                        horainicio: value,
                                                        error: data.error,
                                                        message: data.message,
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
                                                        ...data,
                                                        horafinal: value,
                                                        error: data.error,
                                                        message: data.message,
                                                    } );
                                                } else {
                                                    toastr.warning( 'no permitido Hora Final menor a Hora Inicio.', '', { closeButton: true, progressBar: true, } );
                                                }
                                            } }
                                            placeholder="SELECCIONAR HORA FINAL"
                                            error={data.error.horafinal}
                                            message={data.message.horafinal}
                                            disabled={ data.horainicio === "" }
                                            format={"HH:mm"}
                                        />
                                    </div>
                                    <div className="form-group col-12">
                                        <ButtonComponent
                                            fullWidth
                                            onClick={ onValidate }
                                        >
                                            Adicionar
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

FormCursoHorarioModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onOk: PropTypes.func,
    arrayhorario: PropTypes.array,
};

FormCursoHorarioModal.defaultProps = {
    visible: false,
    onOk: () => {},
    arrayhorario: [],
};
