
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonComponent from '../../../../components/button';
import InputComponent from '../../../../components/input';
import { CiudadActions } from '../../../../redux/actions/parametros/ciudad.action';
import { EstadoData } from '../../../../data/estado.data';
import SelectComponent from '../../../../components/select';
import CardComponent from '../../../../components/card';
import ListadoTipoCiudadModal from '../tipociudad/modal/tipo_ciudad_listado.modal';

function EditCiudad( props ) {
    const { ciudad } = props;
    const [ visibleTipoCiudad, setVisibleTipoCiudad ] = React.useState(false);

    function onComponentTipoCiudad() {
        if ( !visibleTipoCiudad ) return null;
        return (
            <ListadoTipoCiudadModal
                visible={visibleTipoCiudad}
                onClose={ () => setVisibleTipoCiudad(false) }
                onSelect={ (tipoCiudad) => {
                    props.setFkIDTipoCiudad(ciudad, tipoCiudad);
                    setVisibleTipoCiudad(false);
                } }
                valueSelect={ciudad?.fkidtipociudad}
            />
        );
    };
    
    return (
        <>
            { onComponentTipoCiudad() }
            <CardComponent
                style={{ marginTop: 10, }} isHeader={false}
                footer={
                    <>
                        <ButtonComponent
                            onClick={ () => props.onUpdate(ciudad, props.onClose) }
                        >
                            Editar
                        </ButtonComponent>
                        <ButtonComponent
                            type='danger' onClick={props.onClose}
                        >
                            Cancelar
                        </ButtonComponent>
                    </>
                }
            >
                <div className="row">
                    <div className="form-group col-12">
                        <InputComponent
                            label="Tipo Localidad*"
                            value={ciudad.tipociudad}
                            onClick={ () => setVisibleTipoCiudad(true) }
                            error={ciudad.error.fkidtipociudad}
                            message={ciudad.message.fkidtipociudad}
                            readOnly
                            placeholder='SELECCIONAR TIPO LOCALIDAD'
                            style={{ background: 'white', cursor: 'pointer', }}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-12">
                        <InputComponent
                            label="Sigla*"
                            value={ciudad.sigla}
                            onChange={ (value) => props.setSigla(ciudad, value) }
                            error={ciudad.error.sigla}
                            message={ciudad.message.sigla}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-12">
                        <InputComponent
                            label="Nombre Ciudad*"
                            value={ciudad.descripcion}
                            onChange={ (value) => props.setDescripcion(ciudad, value) }
                            error={ciudad.error.descripcion}
                            message={ciudad.message.descripcion}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-12">
                        <SelectComponent 
                            data={EstadoData}
                            label={"Estado*"}
                            value={ciudad.estado}
                            onChange={ (value) => props.setEstado(ciudad, value) }
                            error={ciudad.error.estado}
                            message={ciudad.message.estado}
                        />
                    </div>
                </div>
            </CardComponent>
        </>
    );
};

EditCiudad.propTypes = {
    onClose: PropTypes.func,
};

EditCiudad.defaultProps = {
    onClose: () => {},
};

const mapStateToProps = ( state ) => ( {
    ciudad: state.Ciudad,
} );

const mapDispatchToProps = {
    onLimpiar: CiudadActions.onLimpiar,
    setFkIDTipoCiudad: CiudadActions.setFkIDTipoCiudad,
    setSigla: CiudadActions.setSigla,
    setDescripcion: CiudadActions.setDescripcion,
    setEstado: CiudadActions.setEstado,
    onUpdate: CiudadActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditCiudad );
