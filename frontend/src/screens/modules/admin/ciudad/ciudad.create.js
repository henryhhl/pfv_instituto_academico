
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonComponent from '../../../../components/button';
import InputComponent from '../../../../components/input';
import { CiudadActions } from '../../../../redux/actions/parametros/ciudad.action';
import CardComponent from '../../../../components/card';

function CreateCiudad( props ) {
    const { ciudad } = props;
    
    return (
        <>
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
                            label="Sigla"
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
                            label="Descripción"
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
    setSigla: CiudadActions.setSigla,
    setDescripcion: CiudadActions.setDescripcion,
    onStore: CiudadActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateCiudad );
