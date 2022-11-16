
import React from 'react';
import PropTypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';

export default function InputComponent( props ) {
    const style = Object.assign( props.close === true ? { paddingRight: 30, } : {}, props.style );
    return (
        <>
            { props.label &&
                <label className={`${props.error && 'text-danger'}`}>
                    { props.label }
                </label>
            }
            <div className="input-group d-flex justify-content-center align-items-center">
                <input type={props.type} className={`form-control ${props.error && 'border-danger'}`} 
                    value={ ((props.value !== null) && (typeof props.value !== "undefined")) ? props.value : ""}
                    onChange={ (evt) => {
                        if ( props.onChange ) {
                            props.onChange(evt.target.value);
                        }
                    } }
                    readOnly={props.readOnly}
                    style={style}
                    onClick={props.onClick}
                    placeholder={props.placeholder}
                    
                />
                { props.close === true &&
                    <CloseOutlined
                        style={{
                            padding: 4, borderRadius: 50, background: 'white', fontSize: 10, cursor: 'pointer',
                            fontWeight: 'bold', boxShadow: '0 0 3px 0 #222', position: 'absolute', right: 4,
                        }}
                        onClick={props.onClose}
                    />
                }
                <div className={`invalid-feedback ${props.error ? 'd-block' : 'd-none'}`}
                    style={{ fontSize: 10, }}
                >
                    { props.message }
                </div>
            </div>
        </>
    );
};

InputComponent.propTypes = {
    label: PropTypes.node,
    message: PropTypes.node,
    error: PropTypes.bool,
    readOnly: PropTypes.bool,
    close: PropTypes.bool,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onClose: PropTypes.func,
    style: PropTypes.object,
}

InputComponent.defaultProps = {
    placeholder: "",
    message: "Campo requerido.",
    error: false,
    readOnly: false,
    close: false,
    type: "text",
    value: null,
    onChange: null,
    onClose: null,
    style: {},
}
