
import React from 'react';
import PropTypes from 'prop-types';

export default function InputComponent( props ) {
    return (
        <>
            <label className={`${props.error && 'text-danger'}`}>
                { props.label }
            </label>
            <input type={props.type} className={`form-control ${props.error && 'border-danger'}`} 
                value={ props.value ? props.value : ""}
                onChange={ (evt) => {
                    if ( props.onChange ) {
                        props.onChange(evt.target.value);
                    }
                } }
                readOnly={props.readOnly}
                style={props.style}
                onClick={props.onClick}
            />
            <div className={`invalid-feedback ${props.error ? 'd-block' : 'd-none'}`}>
                { props.message }
            </div>
        </>
    );
};

InputComponent.propTypes = {
    label: PropTypes.node,
    message: PropTypes.node,
    error: PropTypes.bool,
    readOnly: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    style: PropTypes.object,
}

InputComponent.defaultProps = {
    label: "",
    message: "Campo requerido.",
    error: false,
    readOnly: false,
    type: "text",
    value: null,
    onChange: null,
    style: {},
}
