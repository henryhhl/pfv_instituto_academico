
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeAllData } from '../../utils/toolsStorage';

const HeaderComponent = (props) => {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg main-navbar">
            <form className="form-inline mr-auto">
                <ul className="navbar-nav mr-3">
                    <li>
                        <a href="#" data-toggle="sidebar" className="nav-link nav-link-lg" 
                            onClick={ (evt) => {
                                evt.preventDefault();
                                let body = document.querySelector('body');
                                if ( body.className === "sidebar-show" ) {
                                    body.className = "";
                                    body.className = "sidebar-gone";
                                } else {
                                    body.className = "";
                                    body.className = "sidebar-show";
                                }
                            } }
                        >
                            <i className="ion ion-navicon-round"></i>
                        </a>
                    </li>
                    {/* <li><a href="#" data-toggle="search" className="nav-link nav-link-lg d-sm-none">
                        <i className="ion ion-search"></i></a>
                    </li> */}
                </ul>
            </form>
            <ul className="navbar-nav navbar-right">
                <li className="dropdown dropdown-list-toggle">
                    <a href="#" data-toggle="dropdown" className="nav-link notification-toggle nav-link-lg beep">
                        <i className="ion ion-ios-bell-outline"></i>
                    </a>
                    <div className="dropdown-menu dropdown-list dropdown-menu-right">
                        <div className="dropdown-header">Notifications
                            <div className="float-right">
                                <a href="#">View All</a>
                            </div>
                        </div>
                        <div className="dropdown-list-content">
                            <a href="#" className="dropdown-item dropdown-item-unread">
                                <img alt="image" src="/assets/dist/img/avatar/avatar-1.jpeg" className="rounded-circle dropdown-item-img" />
                                <div className="dropdown-item-desc">
                                    <b>Kusnaedi</b> has moved task <b>Fix bug header</b> to <b>Done</b>
                                    <div className="time">10 Hours Ago</div>
                                </div>
                            </a>
                            <a href="#" className="dropdown-item dropdown-item-unread">
                                <img alt="image" src="/assets/dist/img/avatar/avatar-2.jpeg" className="rounded-circle dropdown-item-img" />
                                <div className="dropdown-item-desc">
                                    <b>Ujang Maman</b> has moved task <b>Fix bug footer</b> to <b>Progress</b>
                                    <div className="time">12 Hours Ago</div>
                                </div>
                            </a>
                            <a href="#" className="dropdown-item">
                                <img alt="image" src="/assets/dist/img/avatar/avatar-3.jpeg" className="rounded-circle dropdown-item-img" />
                                <div className="dropdown-item-desc">
                                    <b>Agung Ardiansyah</b> has moved task <b>Fix bug sidebar</b> to <b>Done</b>
                                    <div className="time">12 Hours Ago</div>
                                </div>
                            </a>
                            <a href="#" className="dropdown-item">
                                <img alt="image" src="/assets/dist/img/avatar/avatar-4.jpeg" className="rounded-circle dropdown-item-img" />
                                <div className="dropdown-item-desc">
                                    <b>Ardian Rahardiansyah</b> has moved task <b>Fix bug navbar</b> to <b>Done</b>
                                    <div className="time">16 Hours Ago</div>
                                </div>
                            </a>
                            <a href="#" className="dropdown-item">
                                <img alt="image" src="/assets/dist/img/avatar/avatar-5.jpeg" className="rounded-circle dropdown-item-img" />
                                <div className="dropdown-item-desc">
                                    <b>Alfa Zulkarnain</b> has moved task <b>Add logo</b> to <b>Done</b>
                                    <div className="time">Yesterday</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </li>
                <li className="dropdown">
                    <a href="#" data-toggle="dropdown" className="nav-link dropdown-toggle nav-link-lg">
                        <i className="ion ion-android-person d-lg-none"></i>
                        <div className="d-sm-none d-lg-inline-block">
                            { props.profile.showSaludo }, { props.profile.nombreprincipal ?? 'S/N' }
                        </div>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a href="#" className="dropdown-item has-icon"
                            onClick={ (evt) => {
                                evt.preventDefault();
                                navigate('/profile');
                            } }
                        >
                            <i className="ion ion-android-person"></i> Profile
                        </a>
                        <a href="#" className="dropdown-item has-icon"
                            onClick={ (evt) => {
                                evt.preventDefault();
                                removeAllData();
                                navigate('/login');
                            } }
                        >
                            <i className="ion ion-log-out"></i> Logout
                        </a>
                    </div>
                </li>
            </ul>
        </nav>
    );
}

const mapStateToProps = ( state ) => ( {
    profile: state.Profile,
} );
  
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)( HeaderComponent );
