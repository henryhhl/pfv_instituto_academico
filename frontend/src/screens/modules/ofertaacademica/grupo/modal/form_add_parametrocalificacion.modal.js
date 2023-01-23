
import React from 'react';
import toastr from 'toastr';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';
import CardComponent from '../../../../../components/card';
import ModalComponent from '../../../../../components/modal';
import InputComponent from '../../../../../components/input';
import ButtonComponent from '../../../../../components/button';
import ListadoParametroCalificacionModal from '../../../nota/parametrocalificacion/modal/parametrocalificacion_listado.modal';

export default function FormAddGrupoParametroCalificacionModal( props ) {
    const [ indexParametroCalificacion, setIndexParametroCalificacion ] = React.useState(false);
    const [ visibleParametroCalificacion, setVisibleParametroCalificacion ] = React.useState(false);

    const existsParametroCalificacion = (idparametrocalificacion) => {
        for (let index = 0; index < props.arrayparametrocalificacion.length; index++) {
            const element = props.arrayparametrocalificacion[index];
            if ( element.fkidparametrocalificacion === idparametrocalificacion ) return true;
        }
        return false;
    };

    const onValidate = () => {
        let bandera = false;
        
    };

    const onComponentParametroCalificacion = () => {
        if ( !visibleParametroCalificacion ) return null;
        return (
            <ListadoParametroCalificacionModal
                visible={visibleParametroCalificacion}
                onClose={ () => setVisibleParametroCalificacion(false) }
                onSelect={ (parametroCalificacion) => {
                    if ( !existsParametroCalificacion(parametroCalificacion.idparametrocalificacion) ) {
                        const item = props.arrayparametrocalificacion[indexParametroCalificacion];
                        item.fkidparametrocalificacion = parametroCalificacion.idparametrocalificacion;
                        item.parametrocalificacion = parametroCalificacion.descripcion;
                        item.valorporcentaje = parametroCalificacion.valorporcentaje;
                        props.onChange();
                        setVisibleParametroCalificacion(false);
                    } else {
                        toastr.warning( 'Parametro ya seleccionado, favor intentar con uno nuevo.', '', { closeButton: true, progressBar: true, } );
                    }
                } }
                valueSelect={props.arrayparametrocalificacion[indexParametroCalificacion]?.fkidparametrocalificacion}
            />
        );
    };

    let promedioTotal = 0;
    return (
        <>
            <ModalComponent
                visible={props.visible}
                onClose={props.onClose}
                closable={ props.disabled === true ? true : false}
                footer={null} width={600} centered
                title={props.disabled === true ? "DETALLE PARAMETRO CALIFICACIÓN" : "ASIGNAR PARAMETRO CALIFICACIÓN"}
                style={{ marginBottom: 30, marginTop: 30, }}
            >
                { onComponentParametroCalificacion() }
                <CardComponent
                    actions={
                        props.disabled === true ? null : 
                        <ButtonComponent
                            onClick={ props.onAddRow }
                        >
                            Agregar Calificación
                        </ButtonComponent>
                    }
                >
                    <div className="row">
                        { props.arrayparametrocalificacion?.map( ( item, key ) => {
                            promedioTotal += item.valorporcentaje === null ? 0 : parseInt(item.valorporcentaje);
                            return (
                                <div className="col-12" key={key}>
                                    <div className="card card-sm position-relative card-success">
                                        { props.disabled === false &&
                                            <div className='card-header p-0 pt-2 position-relative'>
                                                <CloseOutlined
                                                    style={ {
                                                        padding: 4, borderRadius: 50, background: 'white', 
                                                        fontSize: 12, fontWeight: 'bold', boxShadow: '0 0 5px 0 #222',
                                                        position: 'absolute', top: 5, right: 5, cursor: 'pointer',
                                                    } }
                                                    onClick={() => props.onDeleteRow(key) }
                                                />
                                            </div>
                                        }
                                        <div className="card-body p-1">
                                            <div className="row">
                                                <div className="form-group col-9">
                                                    <InputComponent
                                                        label="Parametro Calificación"
                                                        value={item.parametrocalificacion}
                                                        onClick={ () => {
                                                            if ( props.disabled === true ) return;
                                                            setIndexParametroCalificacion(key);
                                                            setVisibleParametroCalificacion(true);
                                                        } }
                                                        readOnly
                                                        style={{ background: 'white', cursor: 'pointer', }}
                                                        placeholder="SELECCIONAR PARAMETRO CALIFICACIÓN"
                                                    />
                                                </div>
                                                <div className="form-group col-3">
                                                    <InputComponent
                                                        label="Valor*"
                                                        value={item.valorporcentaje}
                                                        onChange={ (value) => {
                                                            if ( props.disabled === true ) return;
                                                            if ( value === "" ) value = 0;
                                                            if ( !isNaN(value) ) {
                                                                if ( parseInt(value) >= 0 && parseInt(value) <= 100 ) {
                                                                    item.valorporcentaje = parseInt(value);
                                                                    props.onChange();
                                                                }
                                                            }
                                                        } }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        } ) }
                    </div>
                    <div className="row">
                        <div className="form-group col-12">
                            <InputComponent
                                label="Calificación Total"
                                value={parseFloat(promedioTotal).toFixed(2)}
                                readOnly
                                style={{ textAlign: 'right', }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-12">
                            <ButtonComponent
                                onClick={ () => {
                                    if ( props.disabled === true ) {
                                        props.onClose();
                                        return;
                                    }
                                    if ( promedioTotal === 0 || promedioTotal === 100 ) {
                                        toastr.success( 'Parametros registrados.', '', { closeButton: true, progressBar: true, } );
                                        props.onClose();
                                    } else {
                                        toastr.error( 'El total de calificación debe ser 100.', '', { closeButton: true, progressBar: true, } );
                                    }
                                } }
                                fullWidth
                            >
                                Aceptar
                            </ButtonComponent>
                        </div>
                    </div>
                </CardComponent>
            </ModalComponent>
        </>
    );
};

FormAddGrupoParametroCalificacionModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onChange: PropTypes.func,
    onAddRow: PropTypes.func,
    onDeleteRow: PropTypes.func,
    disabled: PropTypes.bool,
    arrayparametrocalificacion: PropTypes.array,
};

FormAddGrupoParametroCalificacionModal.defaultProps = {
    visible: false,
    onClose: () => {},
    onChange: () => {},
    onAddRow: () => {},
    onDeleteRow: () => {},
    arrayparametrocalificacion: [],
    disabled: false,
};
