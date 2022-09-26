
import React from 'react';
import PropTypes from 'prop-types';

export default function TextAreaComponent( props ) {
    return (
        <>
            <label className={`${props.error && 'text-danger'}`}>
                { props.label }
            </label>
            <textarea className={`form-control ${props.error && 'border-danger'}`} 
                value={ props.value ? props.value : ""}
                onChange={ (evt) => {
                    if ( props.onChange ) {
                        props.onChange(evt.target.value);
                    }
                } }
                readOnly={props.readOnly}
            />
            <div className={`invalid-feedback ${props.error ? 'd-block' : 'd-none'}`}>
                { props.message }
            </div>
        </>
    );
};

TextAreaComponent.propTypes = {
    label: PropTypes.node,
    message: PropTypes.node,
    error: PropTypes.bool,
    readOnly: PropTypes.bool,
    value: PropTypes.any,
    onChange: PropTypes.func,
}

TextAreaComponent.defaultProps = {
    label: "",
    message: "Campo requerido.",
    error: false,
    readOnly: false,
    value: null,
    onChange: null,
}
