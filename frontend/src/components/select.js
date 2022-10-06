
import React from 'react';
import PropTypes from 'prop-types';

export default function SelectComponent( props ) {

    function onComponent() {
        return (
            <>
                <label className={`${props.error && 'text-danger'}`}>
                    { props.label }
                </label>
                <select className={`form-control ${props.error && 'border-danger'}`} 
                    value={ (props.value !== null) ? props.value : ""}
                    onChange={ (evt) => {
                        if ( props.onChange ) {
                            props.onChange(evt.target.value);
                        }
                    } }
                    disabled={ props.disabled }
                >
                    <option value={""}>
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
                <div className={`invalid-feedback ${props.error ? 'd-block' : 'd-none'}`}>
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
    value: PropTypes.any,
    onChange: PropTypes.func,
    data: PropTypes.array,
    option: PropTypes.object,
}

SelectComponent.defaultProps = {
    label: "",
    message: "Campo requerido.",
    error: false,
    disabled: false,
    value: null,
    onChange: null,
    data: [],
    option: {
        value: 'value',
        title: 'title',
    },
}
