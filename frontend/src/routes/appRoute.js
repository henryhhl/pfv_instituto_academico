
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import HomeRoute from './homeRoute';
import PrivateRoute from './privateRoute';

const AppRoute = ( props ) => {
    
    return (
        <>
            <BrowserRouter>
                <div>
                    <PrivateRoute path="/" component={ HomeRoute } />
                </div>
            </BrowserRouter>
        </>
    );
};

export default AppRoute;
