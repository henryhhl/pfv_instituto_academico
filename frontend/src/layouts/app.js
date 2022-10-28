
import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderComponent from './partials/header';
import SidebarComponent from './partials/sidebar';


const AppMain = ( props ) => {
    return (
        <>
            <div id="app">
                <div className="main-wrapper position-relative">
                    <div className="navbar-bg"></div>
                    <HeaderComponent />
                    <SidebarComponent />
                    <Outlet />
                    <footer className="main-footer card card-body" style={{ width: '100%', position: 'fixed', bottom: -30, right: 0, zIndex: 10, }}>
                        <div className="footer-left">
                            Copyright &copy; 2018 <div className="bullet"></div> Design By <a href="https://multinity.com/">Multinity</a>
                        </div>
                        <div className="footer-right"></div>
                    </footer>
                </div>
            </div>
        </>
    )
};

export default AppMain;
