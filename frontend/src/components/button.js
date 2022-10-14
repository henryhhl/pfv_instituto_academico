
import React from 'react';
import PropTypes from 'prop-types';

export default function ButtonComponent( props ) {

    function onComponent() {
        let { size } = props;
        if ( size == "small" ) {
            size = "btn-sm";
        } else if ( size == "large" ) {
            size = "btn-lg";
        } else {
            size = "";
        }
        return (
            <button 
                type={props.htmlType} 
                className={`btn ${size} btn-${props.type} mr-1 ${props.className} ${props.fullWidth && 'btn-block'}`} 
                onClick={props.onClick}
                style={props.style}
                disabled={props.disabled}
            >
                { props.children }
            </button>
        );
    }

    return (
        <>
            { onComponent() }
        </>
    );
};

ButtonComponent.propTypes = {
    children: PropTypes.node,
    htmlType: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
}

ButtonComponent.defaultProps = {
    className: "",
    htmlType: "button",
    type: "primary",
    size: "small",
    onClick: null,
    style: {},
    fullWidth: false,
    disabled: false,
}
