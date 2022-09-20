
import React from 'react';

const PrivateRoute = ( props ) => {
    const { component: Component, } = props;

    return (
        <>
            <Component { ...props } />
        </>
    );
};

export default PrivateRoute;
