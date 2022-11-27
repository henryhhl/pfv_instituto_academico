
import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, TimePicker } from 'antd';
import moment from 'moment';

import 'moment/locale/es';
import locale from 'antd/es/locale/es_ES';

export default function TimePickerComponent( props ) {
    return (
        <ConfigProvider locale={locale}>
            { props.label &&
                <label className={`${props.error && 'text-danger'}`}>
                    { props.label }
                </label>
            }
            <TimePicker 
                className={`form-control ${props.error && 'border-danger'}`}
                value={ 
                    (props.value === "" || props.value === null || typeof props.value === "undefined") ? 
                        null : moment(props.value, props.format)
                }
                format={props.format}
                disabled={props.disabled}
                style={{ width: '100%', maxWidth: '100%', minWidth: '100%', }}
                onClick={props.onClick}
                placeholder={props.placeholder}
                onChange={ (time, timeString) => {
                    props.onChange(timeString);
                } }
            />
            <div className={`invalid-feedback ${props.error ? 'd-block' : 'd-none'}`}
                style={{ fontSize: 10, }}
            >
                { props.message }
            </div>
        </ConfigProvider>
    );
};

TimePickerComponent.propTypes = {
    label: PropTypes.node,
    message: PropTypes.node,
    error: PropTypes.bool,
    disabled: PropTypes.bool,
    disabledDateNowBack: PropTypes.bool,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    format: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    style: PropTypes.object,
}

TimePickerComponent.defaultProps = {
    placeholder: "",
    message: "Campo requerido.",
    error: false,
    disabled: false,
    format: "HH:mm:ss",
    disabledDateNowBack: false,
    type: "text",
    value: null,
    onChange: () => {},
    style: {},
}
