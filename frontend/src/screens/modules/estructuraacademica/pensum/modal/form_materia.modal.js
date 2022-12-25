
import React from 'react';
import toastr from 'toastr';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import ModalComponent from '../../../../../components/modal';
import InputComponent from '../../../../../components/input';
import ButtonComponent from '../../../../../components/button';
import ListadoMateriaModal from '../../../parametro/materia/modal/materia_listado.modal';
import ListadoTipoMateriaModal from '../../../parametro/tipomateria/modal/listado.modal';

export default function FormMateriaPensumModal( props ) {
    const [ visibleMateria, setVisibleMateria ] = React.useState(false);
    const [ visibleTipoMateria, setVisibleTipoMateria ] = React.useState(false);
    const [ data, setData ] = React.useState( {
        materia: null, tipomateria: null,
        notaminima: 0, notamaxima: 0,
        horateorica: 0, horapractica: 0,
        horasociales: 0, cuporequerido: 0,
    } );

    const [ error, setError ] = React.useState( {
        materia: false, tipomateria: false,
        notaminima: false, notamaxima: false,
        horateorica: false, horapractica: false,
        horasociales: false, cuporequerido: false,
    } );

    const [ message, setMessage ] = React.useState( {
        materia: "", tipomateria: "",
        notaminima: "", notamaxima: "",
        horateorica: "", horapractica: "",
        horasociales: "", cuporequerido: "",
    } );

    const onValidate = () => {
        let bandera = false;
        if ( data.materia === null ) {
            error.materia = true;
            message.materia = "Campo requerido";
            bandera = true;
        }
        if ( data.tipomateria === null ) {
            error.tipomateria = true;
            message.tipomateria = "Campo requerido";
            bandera = true;
        }
        if ( data.notaminima.toString().trim().length === 0 || parseInt( data.notaminima ) < 0 ) {
            error.notaminima = true;
            message.notaminima = "Campo requerido y mayor a -1";
            bandera = true;
        }
        if ( data.notamaxima.toString().trim().length === 0 || parseInt( data.notamaxima ) < 0 ) {
            error.notamaxima = true;
            message.notamaxima = "Campo requerido y mayor a -1";
            bandera = true;
        }
        if ( data.horateorica.toString().trim().length === 0 || parseInt( data.horateorica ) < 0 ) {
            error.horateorica = true;
            message.horateorica = "Campo requerido y mayor a -1";
            bandera = true;
        }
        if ( data.horapractica.toString().trim().length === 0 || parseInt( data.horapractica ) < 0 ) {
            error.horapractica = true;
            message.horapractica = "Campo requerido y mayor a -1";
            bandera = true;
        }
        if ( data.horasociales.toString().trim().length === 0 || parseInt( data.horasociales ) < 0 ) {
            error.horasociales = true;
            message.horasociales = "Campo requerido y mayor a -1";
            bandera = true;
        }
        if ( data.cuporequerido.toString().trim().length === 0 || parseInt( data.cuporequerido ) < 0 ) {
            error.cuporequerido = true;
            message.cuporequerido = "Campo requerido y mayor a -1";
            bandera = true;
        }
        if ( bandera === true ) {
            setError( { ...error } );
            setMessage( { ...message } );
            Swal.fire( {
                position: 'top-end', icon: 'warning',
                title: "No se pudo realizar la Funcionalidad",
                text: "Favor llenar los campos requeridos.",
                showConfirmButton: false, timer: 3000,
            } );
        } else {
            props.onOk( data );
        }
    };

    const existsMateria = ( idmateria ) => {
        for (let index = 0; index < props.arraydivisionacademica.length; index++) {
            const element = props.arraydivisionacademica[index];
            for (let pos = 0; pos < element.arraymateria.length; pos++) {
                const materia = element.arraymateria[pos].materia;
                if ( materia.idmateria === idmateria ) return true;
            }
        }
        return false;
    };

    const onComponentMateria = () => {
        if ( !visibleMateria ) return null;
        return (
            <ListadoMateriaModal
                visible={visibleMateria}
                onClose={ () => setVisibleMateria(false) }
                onSelect={ (materia) => {
                    if ( !existsMateria( materia.idmateria ) ) {
                        setData( { ...data, materia: materia, } );
                        setError( { ...error, materia: false, } );
                        setMessage( { ...message, materia: "", } );
                        setVisibleMateria(false);
                    } else {
                        toastr.warning( 'Materia ya seleccionado.', '', { closeButton: true, progressBar: true, } );
                    }
                } }
                valueSelect={data.materia?.idmateria}
            />
        );
    };

    const onComponentTipoMateria = () => {
        if ( !visibleTipoMateria ) return null;
        return (
            <ListadoTipoMateriaModal
                visible={visibleTipoMateria}
                onClose={ () => setVisibleTipoMateria(false) }
                onSelect={ (tipoMateria) => {
                    setData( { ...data, tipomateria: tipoMateria, } );
                    setError( { ...error, tipomateria: false, } );
                    setMessage( { ...message, tipomateria: "", } );
                    setVisibleTipoMateria(false);
                } }
                valueSelect={data.tipomateria?.idtipomateria}
            />
        );
    };

    return (
        <>
            <ModalComponent
                visible={props.visible}
                onClose={props.onClose}
                footer={null} width={500} centered
                title={"ADICIÓN MATERIA"}
                style={{ marginBottom: 30, marginTop: 30, }}
            >
                { onComponentMateria() }
                { onComponentTipoMateria() }
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body pb-0">
                                <div className="row">
                                    <div className="form-group col-12">
                                        <InputComponent
                                            label="Materia*"
                                            onClick={ () => setVisibleMateria(true) }
                                            value={data.materia?.nombrelargo}
                                            readOnly
                                            style={{ background: 'white', cursor: 'pointer', }}
                                            placeholder="SELECCIONAR MATERIA"
                                            error={error.materia}
                                            message={message.materia}
                                        />
                                    </div>
                                    <div className="form-group col-12">
                                        <InputComponent
                                            label="Tipo Materia*"
                                            onClick={ () => setVisibleTipoMateria(true) }
                                            value={data.tipomateria?.descripcion}
                                            readOnly
                                            style={{ background: 'white', cursor: 'pointer', }}
                                            placeholder="SELECCIONAR TIPO MATERIA"
                                            error={error.tipomateria}
                                            message={message.tipomateria}
                                        />
                                    </div>
                                    <div className="form-group col-12">
                                        <InputComponent
                                            label="Nota Mínima*"
                                            value={data.notaminima}
                                            onChange={ (value) => {
                                                if ( value === "" ) value = 0;  
                                                if ( !isNaN( value ) && parseInt( value ) >= 0 ) {
                                                    setData( { ...data, notaminima: parseInt(value), } );
                                                    setError( { ...error, notaminima: false, } );
                                                    setMessage( { ...message, notaminima: "", } );
                                                }
                                            } }
                                            error={error.notaminima}
                                            message={message.notaminima}
                                        />
                                    </div>
                                    <div className="form-group col-12">
                                        <InputComponent
                                            label="Nota Máxima*"
                                            value={data.notamaxima}
                                            onChange={ (value) => {
                                                if ( value === "" ) value = 0;  
                                                if ( !isNaN( value ) && parseInt( value ) >= 0 ) {
                                                    setData( { ...data, notamaxima: parseInt(value), } );
                                                    setError( { ...error, notamaxima: false, } );
                                                    setMessage( { ...message, notamaxima: "", } );
                                                }
                                            } }
                                            error={error.notamaxima}
                                            message={message.notamaxima}
                                        />
                                    </div>
                                    <div className="form-group col-12">
                                        <InputComponent
                                            label="Horas Teóricas*"
                                            value={data.horateorica}
                                            onChange={ (value) => {
                                                if ( value === "" ) value = 0;  
                                                if ( !isNaN( value ) && parseInt( value ) >= 0 ) {
                                                    setData( { ...data, horateorica: parseInt(value), } );
                                                    setError( { ...error, horateorica: false, } );
                                                    setMessage( { ...message, horateorica: "", } );
                                                }
                                            } }
                                            error={error.horateorica}
                                            message={message.horateorica}
                                        />
                                    </div>
                                    <div className="form-group col-12">
                                        <InputComponent
                                            label="Horas Prácticas*"
                                            value={data.horapractica}
                                            onChange={ (value) => {
                                                if ( value === "" ) value = 0;  
                                                if ( !isNaN( value ) && parseInt( value ) >= 0 ) {
                                                    setData( { ...data, horapractica: parseInt(value), } );
                                                    setError( { ...error, horapractica: false, } );
                                                    setMessage( { ...message, horapractica: "", } );
                                                }
                                            } }
                                            error={error.horapractica}
                                            message={message.horapractica}
                                        />
                                    </div>
                                    <div className="form-group col-12">
                                        <InputComponent
                                            label="Hora Sociales*"
                                            value={data.horasociales}
                                            onChange={ (value) => {
                                                if ( value === "" ) value = 0;  
                                                if ( !isNaN( value ) && parseInt( value ) >= 0 ) {
                                                    setData( { ...data, horasociales: parseInt(value), } );
                                                    setError( { ...error, horasociales: false, } );
                                                    setMessage( { ...message, horasociales: "", } );
                                                }
                                            } }
                                            error={error.horasociales}
                                            message={message.horasociales}
                                        />
                                    </div>
                                    <div className="form-group col-12">
                                        <InputComponent
                                            label="Cupos*"
                                            value={data.cuporequerido}
                                            onChange={ (value) => {
                                                if ( value === "" ) value = 0;  
                                                if ( !isNaN( value ) && parseInt( value ) >= 0 ) {
                                                    setData( { ...data, cuporequerido: parseInt(value), } );
                                                    setError( { ...error, cuporequerido: false, } );
                                                    setMessage( { ...message, cuporequerido: "", } );
                                                }
                                            } }
                                            error={error.cuporequerido}
                                            message={message.cuporequerido}
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

FormMateriaPensumModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onOk: PropTypes.func,
    arraydivisionacademica: PropTypes.array,
};

FormMateriaPensumModal.defaultProps = {
    visible: false,
    arraydivisionacademica: [],
    onOk: () => {},
};
