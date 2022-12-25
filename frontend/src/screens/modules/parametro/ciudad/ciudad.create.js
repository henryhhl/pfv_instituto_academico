
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonComponent from '../../../../components/button';
import InputComponent from '../../../../components/input';
import { CiudadActions } from '../../../../redux/actions/parametros/ciudad.action';
import CardComponent from '../../../../components/card';
import ListadoTipoCiudadModal from '../tipociudad/modal/tipo_ciudad_listado.modal';

function CreateCiudad( props ) {
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
                            onClick={ () => props.onStore(ciudad, props.onClose) }
                        >
                            Guardar
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
            </CardComponent>
        </>
    );
};

CreateCiudad.propTypes = {
    onClose: PropTypes.func,
};

CreateCiudad.defaultProps = {
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
    onStore: CiudadActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateCiudad );
