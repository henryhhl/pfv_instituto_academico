
import React from 'react';
import { connect } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import LoadingComponent from '../components/loading';
import { Functions } from '../utils/functions';
import HeaderComponent from './partials/header';
import SidebarComponent from './partials/sidebar';


const AppMain = ( props ) => {
    const { loading, sesion } = props;
    const navigate = useNavigate();

    const setLoading = () => {
        return (
            <LoadingComponent visible={loading.visible} />
        );
    };

    if ( sesion.isSesion ) {
        navigate('/login');
    }

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
                            Copyright &copy; { Functions.dateToYear() } <div className="bullet"></div> Design By <a href="https://multinity.com/">Solvertic SRL</a>
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
    sesion: state.Sesion,
} );

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)( AppMain );;
