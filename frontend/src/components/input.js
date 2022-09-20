
import React from 'react';
import PropTypes from 'prop-types';

export default function InputComponent( props ) {
    return (
        <>
            <label>
                { props.label }
            </label>
            <input type={props.type} className="form-control" 
                value={ props.value ? props.value : ""}
                onChange={ (evt) => {
                    if ( props.onChange ) {
                        props.onChange(evt.target.value);
                    }
                } }
            />
        </>
    );
};

InputComponent.propTypes = {
    label: PropTypes.node,
    type: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
}

InputComponent.defaultProps = {
    label: "",
    type: "text",
    value: null,
    onChange: null,
}
