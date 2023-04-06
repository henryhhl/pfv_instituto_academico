
import React from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import CardComponent from '../../../../../components/card';
import ModalComponent from '../../../../../components/modal';
import InputComponent from '../../../../../components/input';
import ButtonComponent from '../../../../../components/button';
import { CursoActions } from '../../../../../redux/actions/ofertaacademica/curso.action';
import ListadoParametroCalificacionModal from '../../../nota/parametrocalificacion/modal/parametrocalificacion_listado.modal';

const FormAddCursoCalificacion = ( props ) => {
    const { curso } = props;
    const [ indexParametroCalificacion, setIndexParametroCalificacion ] = React.useState(-1);
    const [ visibleParametroCalificacion, setVisibleParametroCalificacion ] = React.useState(false);

    const existsParametroCalificacion = (idparametrocalificacion) => {
        for (let index = 0; index < curso.arrayparametrocalificacion.length; index++) {
            const element = curso.arrayparametrocalificacion[index];
            if ( element.fkidparametrocalificacion === idparametrocalificacion ) return true;
        }
        return false;
    };

    const onComponentParametroCalificacion = () => {
        if ( !visibleParametroCalificacion ) return null;
        return (
            <ListadoParametroCalificacionModal
                visible={visibleParametroCalificacion}
                onClose={ () => setVisibleParametroCalificacion(false) }
                onSelect={ (parametroCalificacion) => {
                    if ( !existsParametroCalificacion(parametroCalificacion.idparametrocalificacion) ) {
                        const item = curso.arrayparametrocalificacion[indexParametroCalificacion];
                        item.fkidparametrocalificacion = parametroCalificacion.idparametrocalificacion;
                        item.parametrocalificacion = parametroCalificacion.descripcion;
                        item.valorporcentaje = parametroCalificacion.valorporcentaje;
                        props.onChange(curso);
                        setVisibleParametroCalificacion(false);
                    } else {
                        toastr.warning( 'Calificación ya seleccionado, favor intentar con uno nuevo.' );
                    }
                } }
                valueSelect={curso.arrayparametrocalificacion[indexParametroCalificacion].fkidparametrocalificacion}
            />
        );
    };

    let promedioTotal = 0;
    return (
        <ModalComponent
            visible={props.visible}
            onClose={ () => {
                if ( props.disabled === true ) {
                    props.onClose();
                    return;
                }
                if ( promedioTotal > 100 ) {
                    toastr.error( 'El total de calificación debe ser igual a 100.' );
                } else {
                    props.onClose();
                }
            } }
            footer={null} width={600} centered
            title={props.disabled === true ? "DETALLE PARAMETRO CALIFICACIÓN" : "ASIGNAR CALIFICACIÓN"}
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
                <div className="row pt-2" 
                    style={{ 
                        maxHeight: 400, overflowX: 'hidden', overflowY: 'auto', backgroundColor: 'rgb(235, 236, 240)', 
                    }}
                >
                    { curso.arrayparametrocalificacion.map( ( item, key ) => {
                        promedioTotal += item.valorporcentaje === null ? 0 : parseInt(item.valorporcentaje);
                        return (
                            <div className="col-12" key={key}>
                                <div className="card card-sm position-relative card-success">
                                    { props.disabled === false &&
                                        <CloseOutlined
                                            className='float-right'
                                            style={ {
                                                padding: 4, borderRadius: 50, background: 'white', 
                                                fontSize: 12, fontWeight: 'bold', boxShadow: '0 0 5px 0 #222',
                                                cursor: 'pointer', marginTop: 8, marginRight: 5,
                                            } }
                                            onClick={ () =>  props.onDeleteRow(key) }
                                        />
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
                                                                props.onChange(curso);
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
                                if ( promedioTotal > 100 ) {
                                    toastr.error( 'El total de calificación debe ser igual a100.' ); 
                                } else {
                                    props.onClose(); 
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
    );
};

FormAddCursoCalificacion.propTypes = {
    disabled: PropTypes.bool,
    visible: PropTypes.bool,
    onClose: PropTypes.func,
};

FormAddCursoCalificacion.defaultProps = {
    disabled: false,
    visible: false,
    onClose: () => {},
};

const mapStateToProps = ( state ) => ( {
    curso: state.Curso,
} );

const mapDispatchToProps = {
    onChange: CursoActions.onChange,
    onAddRow: CursoActions.onAddRowParametroCalificacion,
    onDeleteRow: CursoActions.onDeleteRowParametroCalificacion,
};

export default connect(mapStateToProps, mapDispatchToProps)( FormAddCursoCalificacion );
