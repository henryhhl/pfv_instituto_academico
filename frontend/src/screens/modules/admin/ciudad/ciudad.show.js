
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonComponent from '../../../../components/button';
import InputComponent from '../../../../components/input';
import { CiudadActions } from '../../../../redux/actions/parametros/ciudad.action';
import { Functions } from '../../../../utils/functions';

function ShowCiudad( props ) {
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
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12">
                                    <InputComponent
                                        label="Descripción"
                                        value={ciudad.descripcion}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12">
                                    <InputComponent
                                        label="Estado"
                                        value={Functions.getValueEstado( ciudad.estado )}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <ButtonComponent
                                onClick={props.onClose}
                            >
                                Aceptar
                            </ButtonComponent>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

ShowCiudad.propTypes = {
    onClose: PropTypes.func,
};

ShowCiudad.defaultProps = {
    onClose: () => {},
};

const mapStateToProps = ( state ) => ( {
    ciudad: state.Ciudad,
} );

const mapDispatchToProps = {
    onLimpiar: CiudadActions.onLimpiar,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowCiudad );
