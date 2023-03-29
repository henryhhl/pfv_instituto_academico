
import React from 'react';
import PropTypes from 'prop-types';
import { FrownOutlined } from '@ant-design/icons';

export default function EmptyComponent( props ) {

    if ( !Array.isArray(props.data) ) return null;

    if ( props.data.length > 0 ) return null;

    return (
        <div className='card p-0 m-0'>
            <div className='card-header'>
                <h4 className='text-info' style={props.style}>
                    {props.text} <FrownOutlined style={{ fontSize: 24, position: 'relative', top: 4, }} />
                </h4>
            </div>
        </div>
    );
}

EmptyComponent.propTypes = {
    style: PropTypes.object,
    data: PropTypes.array,
    text: PropTypes.string,
};

EmptyComponent.defaultProps = {
    style: {},
    data: [],
    text: 'Sin información incorporados',
};
