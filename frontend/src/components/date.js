
import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, DatePicker } from 'antd';
import moment from 'moment';

import 'moment/locale/es';
import locale from 'antd/es/locale/es_ES';

const customFormat = (value) => `${value.format("DD/MM/YYYY")}`;
export default function DatePickerComponent( props ) {
    return (
        <ConfigProvider locale={locale}>
            { props.label &&
                <label className={`${props.error && 'text-danger'}`}>
                    { props.label }
                </label>
            }
            <DatePicker 
                className={`form-control ${props.error && 'border-danger'}`}
                value={ 
                    (props.value === "" || props.value === null || typeof props.value === "undefined") ? 
                        null : moment(props.value, "DD/MM/YYYY")
                }
                format={"DD/MM/YYYY"}
                disabled={props.disabled}
                style={{ width: '100%', maxWidth: '100%', minWidth: '100%', }}
                onClick={props.onClick}
                placeholder={props.placeholder}
                onChange={ (value, dateString) => {
                    props.onChange(dateString);
                } }
                disabledDate={ ( date ) => {
                    if ( props.disabledDateNowBack === true ) {
                        return date && date > moment().endOf('day');
                    }
                    return false;
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

DatePickerComponent.propTypes = {
    label: PropTypes.node,
    message: PropTypes.node,
    error: PropTypes.bool,
    disabled: PropTypes.bool,
    disabledDateNowBack: PropTypes.bool,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    style: PropTypes.object,
}

DatePickerComponent.defaultProps = {
    placeholder: "",
    message: "Campo requerido.",
    error: false,
    disabled: false,
    disabledDateNowBack: false,
    type: "text",
    value: null,
    onChange: () => {},
    style: {},
}
