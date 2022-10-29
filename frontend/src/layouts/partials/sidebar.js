
import React from 'react';
import { Link } from 'react-router-dom';

export default function SidebarComponent() {
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

                    <li className="menu-header">Componentes</li>
                    <li>
                        <a href="#" className="has-dropdown pl-3"
                            onClick={ (evt) => evt.preventDefault() }
                        >
                            <i className="ion ion-ios-albums-outline"></i>
                            <span style={{ fontSize: 13, }}>Estructura Institucional</span>
                        </a>
                        <ul className="menu-dropdown">
                            <li>
                                <Link to={"/institucion/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Institución
                                </Link>
                            </li>
                            <li>
                                <Link to={"/gestionperiodo/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Periodo
                                </Link>
                            </li>
                            <li>
                                <Link to={"/divisionacademica/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> División Academica
                                </Link>
                            </li>
                            <li>
                                <Link to={"/turno/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Turno
                                </Link>
                            </li>
                            {/* <li>
                                <Link to={"/aula/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Aula
                                </Link>
                            </li> */}
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="has-dropdown pl-3"
                            onClick={ (evt) => evt.preventDefault() }
                        >
                            <i className="ion ion-ios-albums-outline"></i>
                            <span style={{ fontSize: 13, }}>Estructura Academica</span>
                        </a>
                        <ul className="menu-dropdown">
                            <li>
                                <Link to={"/unidadadministrativa/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Unidad Administrativa
                                </Link>
                            </li>
                            <li>
                                <Link to={"/unidadacademica/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Unidad Academica
                                </Link>
                            </li>
                            <li>
                                <Link to={"/programa/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Programa 
                                </Link>
                            </li>
                            <li>
                                <Link to={"/pensum/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Pensum
                                </Link>
                            </li>
                            <li>
                                <Link to={"/responsable/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Responsable
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="has-dropdown pl-3"
                            onClick={ (evt) => evt.preventDefault() }
                        >
                            <i className="ion ion-ios-albums-outline"></i>
                            <span style={{ fontSize: 13, }}>Parametros</span>
                        </a>
                        <ul className="menu-dropdown">
                            <li>
                                <Link to={"/unidadnegocio/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Unidad Negocio
                                </Link>
                            </li>
                            <li>
                                <Link to={"/ofertaacademica/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Oferta Academica
                                </Link>
                            </li>
                            <li>
                                <Link to={"/nivelacademico/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Nivel Academico
                                </Link>
                            </li>
                            <li>
                                <Link to={"/modalidadacademica/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Modalidad Academica
                                </Link>
                            </li>
                            <li>
                                <Link to={"/periodo/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Periodo
                                </Link>
                            </li>
                            <li>
                                <Link to={"/materia/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Materia
                                </Link>
                            </li>
                            <li>
                                <Link to={"/tipomateria/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Tipo Materia
                                </Link>
                            </li>
                            <li>
                                <Link to={"/referenciacontacto/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Referencia Contacto
                                </Link>
                            </li>
                            <li>
                                <Link to={"/ciudad/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Ciudad
                                </Link>
                            </li>
                            <li>
                                <Link to={"/tipociudad/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Tipo Ciudad
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="has-dropdown pl-3"
                            onClick={ (evt) => evt.preventDefault() }
                        >
                            <i className="ion ion-ios-albums-outline"></i>
                            <span style={{ fontSize: 13, }}>Seguridad</span>
                        </a>
                        <ul className="menu-dropdown">
                            <li>
                                <Link to={"/usuario/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Usuario
                                </Link>
                            </li>
                            <li>
                                <Link to={"/asignar_rol"}>
                                    <i className="ion ion-ios-circle-outline"></i> Asignar Rol
                                </Link>
                            </li>
                            <li>
                                <Link to={"/asignar_permiso"}>
                                    <i className="ion ion-ios-circle-outline"></i> Asignar Permiso
                                </Link>
                            </li>
                            <li>
                                <Link to={"/rol/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Rol
                                </Link>
                            </li>
                            <li>
                                <Link to={"/tipo_rol/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Tipo Rol
                                </Link>
                            </li>
                            <li>
                                <Link to={"/permiso/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Permiso
                                </Link>
                            </li>
                            <li>
                                <Link to={"/tipo_permiso/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Tipo Permiso
                                </Link>
                            </li>
                        </ul>
                    </li>        
                </ul>
            </aside>
        </div>
    );
};
