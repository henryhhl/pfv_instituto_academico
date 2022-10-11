
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonComponent from '../../../../components/button';
import InputComponent from '../../../../components/input';
import { Functions } from '../../../../utils/functions';

function ShowPermiso( props ) {
    const { permiso } = props;
    
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
                                        value={permiso.tipopermiso}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12">
                                    <InputComponent
                                        label="Descripción"
                                        value={permiso.descripcion}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12">
                                    <InputComponent
                                        label="Estado"
                                        value={Functions.getValueEstado( permiso.estado )}
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

ShowPermiso.propTypes = {
    onClose: PropTypes.func,
};

ShowPermiso.defaultProps = {
    onClose: () => {},
};

const mapStateToProps = ( state ) => ( {
    permiso: state.Permiso,
} );

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowPermiso );
