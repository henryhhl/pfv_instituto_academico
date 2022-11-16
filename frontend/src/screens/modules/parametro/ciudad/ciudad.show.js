
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonComponent from '../../../../components/button';
import InputComponent from '../../../../components/input';
import { CiudadActions } from '../../../../redux/actions/parametros/ciudad.action';
import { Functions } from '../../../../utils/functions';
import CardComponent from '../../../../components/card';

function ShowCiudad( props ) {
    const { ciudad } = props;
    
    return (
        <>
            <CardComponent
                style={{ marginTop: 10, }} isHeader={false}
                footer={
                    <ButtonComponent
                        onClick={props.onClose}
                    >
                        Aceptar
                    </ButtonComponent>
                }
            >
                <div className="row">
                    <div className="form-group col-12">
                        <InputComponent
                            label="Tipo Localidad"
                            value={ciudad.tipociudad}
                            readOnly
                        />
                    </div>
                </div>
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
                            label="Nombre Ciudad"
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
            </CardComponent>
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
