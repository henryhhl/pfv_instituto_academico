
import React from 'react';
import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';
import LoadingComponent from '../components/loading';
import HeaderComponent from './partials/header';
import SidebarComponent from './partials/sidebar';


const AppMain = ( props ) => {
    const { loading } = props;

    const setLoading = () => {
        return (
            <LoadingComponent visible={loading.visible} />
        );
    };

    return (
        <>
            { setLoading() }
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

const mapStateToProps = ( state ) => ( {
    loading: state.Loading,
} );

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)( AppMain );;
