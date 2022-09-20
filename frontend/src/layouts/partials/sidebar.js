
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SidebarComponent() {
    const navigate = useNavigate();
    return (
        <div className="main-sidebar">
            <aside id="sidebar-wrapper">
                <div className="sidebar-brand">
                    <a href="index.html">Stisla Lite</a>
                </div>
                <div className="sidebar-user">
                    <div className="sidebar-user-picture">
                        <img alt="image" src="/assets/dist/img/avatar/avatar-1.jpeg" />
                    </div>
                    <div className="sidebar-user-details">
                        <div className="user-name">Ujang Maman</div>
                        <div className="user-role">
                            Administrator
                        </div>
                    </div>
                </div>
                <ul className="sidebar-menu">
                    <li className="menu-header">Dashboard</li>
                    <li className="active">
                        <a href="index.html"><i className="ion ion-speedometer"></i><span>Dashboard</span></a>
                    </li>

                    <li className="menu-header">Components</li>
                    <li>
                        <a href="#" className="has-dropdown"><i className="ion ion-ios-albums-outline"></i><span>Components</span></a>
                        <ul className="menu-dropdown">
                            <li><a href="general.html"><i className="ion ion-ios-circle-outline"></i> Basic</a></li>
                            <li><a href="components.html"><i className="ion ion-ios-circle-outline"></i> Main Components</a></li>
                            <li><a href="buttons.html"><i className="ion ion-ios-circle-outline"></i> Buttons</a></li>
                            <li><a href="toastr.html"><i className="ion ion-ios-circle-outline"></i> Toastr</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="has-dropdown"><i className="ion ion-flag"></i><span>Icons</span></a>
                        <ul className="menu-dropdown">
                            <li><a href="ion-icons.html"><i className="ion ion-ios-circle-outline"></i> Ion Icons</a></li>
                            <li><a href="fontawesome.html"><i className="ion ion-ios-circle-outline"></i> Font Awesome</a></li>
                            <li><a href="flag.html"><i className="ion ion-ios-circle-outline"></i> Flag</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="table.html"><i className="ion ion-clipboard"></i><span>Tables</span></a>
                    </li>
                    <li>
                        <a href="chartjs.html"><i className="ion ion-stats-bars"></i><span>Chart.js</span></a>
                    </li>
                    <li>
                        <a href="simple.html"><i className="ion ion-ios-location-outline"></i><span>Google Maps</span></a>
                    </li>
                    <li>
                        <a href="#" className="has-dropdown"><i className="ion ion-ios-copy-outline"></i><span>Seguridad</span></a>
                        <ul className="menu-dropdown">
                            <li>
                                <a href="#" onClick={(evt) => {
                                    evt.preventDefault();
                                    navigate('/rol/index');
                                } }>
                                    <i className="ion ion-ios-circle-outline"></i> Rol
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(evt) => {
                                    evt.preventDefault();
                                    navigate('/tipo_rol/index');
                                } }>
                                    <i className="ion ion-ios-circle-outline"></i> Tipo Rol
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li className="menu-header">More</li>
                    <li>
                        <a href="#" className="has-dropdown"><i className="ion ion-ios-nutrition"></i> Click Me</a>
                        <ul className="menu-dropdown">
                            <li><a href="#"><i className="ion ion-ios-circle-outline"></i> Menu 1</a></li>
                            <li><a href="#" className="has-dropdown"><i className="ion ion-ios-circle-outline"></i> Menu 2</a>
                                <ul className="menu-dropdown">
                                    <li><a href="#"><i className="ion ion-ios-circle-outline"></i> Child Menu 1</a></li>
                                    <li><a href="#"><i className="ion ion-ios-circle-outline"></i> Child Menu 2</a></li>
                                    <li><a href="#" className="has-dropdown"><i className="ion ion-ios-circle-outline"></i> Child Menu 3</a>
                                        <ul className="menu-dropdown">
                                            <li><a href="#"><i className="ion ion-ios-circle-outline"></i> Child Menu 1</a></li>
                                            <li><a href="#"><i className="ion ion-ios-circle-outline"></i> Child Menu 2</a></li>
                                            <li><a href="#"><i className="ion ion-ios-circle-outline"></i> Child Menu 3</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="#"><i className="ion ion-ios-circle-outline"></i> Child Menu 4</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#"><i className="ion ion-heart"></i> Badges <div className="badge badge-primary">10</div></a>
                    </li>
                    <li>
                        <a href="credits.html"><i className="ion ion-ios-information-outline"></i> Credits</a>
                    </li>          
                </ul>
                <div className="p-3 mt-4 mb-4">
                    <a href="http://stisla.multinity.com/" className="btn btn-danger btn-shadow btn-round has-icon has-icon-nofloat btn-block">
                        <i className="ion ion-help-buoy"></i> <div>Go PRO!</div>
                    </a>
                </div>
            </aside>
        </div>
    );
};
