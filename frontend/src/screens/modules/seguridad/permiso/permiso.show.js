
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonComponent from '../../../../components/button';
import InputComponent from '../../../../components/input';
import { Functions } from '../../../../utils/functions';
import CardComponent from '../../../../components/card';

function ShowPermiso( props ) {
    const { permiso } = props;
    
    return (
        <>
            <CardComponent
                style={{ marginTop: 10, }} isHeader={false}
                footer={
                    <>
                        <ButtonComponent
                            onClick={props.onClose}
                        >
                            Aceptar
                        </ButtonComponent>
                    </>
                }
            >
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
            </CardComponent>
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
