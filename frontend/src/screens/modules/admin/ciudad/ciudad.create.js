
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonComponent from '../../../../components/button';
import InputComponent from '../../../../components/input';
import { CiudadActions } from '../../../../redux/actions/parametros/ciudad.action';

function CreateCiudad( props ) {
    const { ciudad } = props;
    
    return (
        <>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                    <div className="card">
                        <div className="card-body">
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
                        </div>
                        <div className="card-footer">
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
                        </div>
                    </div>
                </div>
            </div>
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
