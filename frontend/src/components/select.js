
import React from 'react';
import PropTypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';

export default function SelectComponent( props ) {

    function onComponent() {
        const style = Object.assign( props.close === true ? { paddingRight: 30, } : {}, props.style );
        return (
            <>
                <label className={`${props.error && 'text-danger'}`}>
                    { props.label }
                </label>
                <div className="input-group d-flex justify-content-center align-items-center">
                    <select className={`form-control ${props.error && 'border-danger'}`} 
                        value={ (props.value !== null) ? props.value : ""}
                        onChange={ (evt) => {
                            if ( props.onChange ) {
                                props.onChange(evt.target.value);
                            }
                        } }
                        disabled={ props.disabled }
                        style={style}
                    >
                        <option value={""} disabled={props.disabledDefault}>
                            { "SELECCIONAR..." }
                        </option>
                        { props.data.map( ( item, index ) => {
                            return (
                                <option
                                    key={index}
                                    value={ item[props.option.value] }
                                    disabled={ item.disabled === true }
                                >
                                    { item[props.option.title] }
                                </option>
                            );
                        } ) }
                    </select>
                    { props.close === true &&
                        <CloseOutlined
                            style={{
                                padding: 4, borderRadius: 50, background: 'white', fontSize: 10, cursor: 'pointer',
                                fontWeight: 'bold', boxShadow: '0 0 3px 0 #222', position: 'absolute', right: 4,
                            }}
                        />
                    }
                </div>
                <div className={`invalid-feedback ${props.error ? 'd-block' : 'd-none'}`}
                    style={{ fontSize: 10, }}
                >
                    { props.message }
                </div>
            </>
        );
    };

    return (
        <>
            { onComponent() }
        </>
    );
};

SelectComponent.propTypes = {
    label: PropTypes.node,
    message: PropTypes.node,
    error: PropTypes.bool,
    disabled: PropTypes.bool,
    close: PropTypes.bool,
    disabledDefault: PropTypes.bool,
    value: PropTypes.any,
    onChange: PropTypes.func,
    data: PropTypes.array,
    option: PropTypes.object,
    style: PropTypes.object,
}

SelectComponent.defaultProps = {
    label: "",
    message: "Campo requerido.",
    error: false,
    disabled: false,
    close: false,
    disabledDefault: false,
    value: null,
    onChange: null,
    data: [],
    option: {
        value: 'value',
        title: 'title',
    },
    style: {},
}
