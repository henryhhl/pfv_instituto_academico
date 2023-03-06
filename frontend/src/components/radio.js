import React from 'react';
import PropTypes from 'prop-types';
import { Radio, withStyles } from '@mui/material';

export default function RadioComponent( props ) {
    return (
        <Radio
            checked={props.checked}
            onChange={ (checked) => {
                // console.log(checked)
            } }
            color={props.color}
            onClick={ () => {
                if ( props.onChange ) {
                    props.onChange( !props.checked );
                }
            } }
            style={{
                padding: 2, 
            }}
            // color={'primary'}
        />
    )
}

RadioComponent.propTypes = {
    checked: PropTypes.bool,
    color: PropTypes.string,
    onChange: PropTypes.func,
}

RadioComponent.defaultProps = {
    color: 'primary',
}
