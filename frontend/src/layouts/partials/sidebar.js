
import React from 'react';
import { Link } from 'react-router-dom';

export default function SidebarComponent() {
    const [ subMenu, setSubMenu ] = React.useState( {
        oportunidad: {
            active: false,
        },
        ofertaacademica: {
            active: false,
        },
        persona: {
            active: false,
        },
        estructurainstitucional: {
            active: false,
        },
        estructuraacademica: {
            active: false,
        },
        parametros: {
            active: false,
        },
        seguridad: {
            active: false,
        },
    } );
    
    return (
        <div className="main-sidebar">
            <aside id="sidebar-wrapper">
                <div className="sidebar-brand">
                    <Link to={"/"}>
                        SolverTic SRL
                    </Link>
                </div>
                <div className="sidebar-user">
                    <div className="sidebar-user-picture">
                        <img alt="image" src="/assets/img/photo_ericka.jpeg" />
                    </div>
                    <div className="sidebar-user-details">
                        <div className="user-name">Ericka Lopez</div>
                        <div className="user-role">
                            Administrador
                        </div>
                    </div>
                </div>
                <ul className="sidebar-menu">
                    <li className="menu-header">Dashboard</li>
                    <li className="active">
                        <Link to={"/"}>
                            <i className="ion ion-speedometer"></i><span>Dashboard</span>
                        </Link>
                    </li>

                    <li className="menu-header">Componentes</li>

                    <li className={`${ (subMenu.oportunidad.active === true ) && 'active' }`}>
                        <a href="#" className="has-dropdown pl-3"
                            onClick={ (evt) => {
                                evt.preventDefault();
                                subMenu.oportunidad.active = !subMenu.oportunidad.active;
                                setSubMenu( { ...subMenu } );
                            } }
                        >
                            <i className="ion ion-ios-albums-outline"></i>
                            <span style={{ fontSize: 13, }}>Oportunidad</span>
                        </a>
                        <ul className="menu-dropdown">
                            <li>
                                <Link to={"/tipoactividad/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Tipo Actividad
                                </Link>
                            </li>
                            <li>
                                <Link to={"/tipomediopublicitario/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Tipo Medio Publicitario
                                </Link>
                            </li>
                            <li>
                                <Link to={"/tipocontacto/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Tipo Contacto
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className={`${ (subMenu.ofertaacademica.active === true ) && 'active' }`}>
                        <a href="#" className="has-dropdown pl-3"
                            onClick={ (evt) => {
                                evt.preventDefault();
                                subMenu.ofertaacademica.active = !subMenu.ofertaacademica.active;
                                setSubMenu( { ...subMenu } );
                            } }
                        >
                            <i className="ion ion-ios-albums-outline"></i>
                            <span style={{ fontSize: 13, }}>Oferta Academica</span>
                        </a>
                        <ul className="menu-dropdown">
                            <li>
                                <Link to={"/grupo/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Grupo
                                </Link>
                            </li>
                            <li>
                                <Link to={"/curso/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Curso
                                </Link>
                            </li>
                            <li>
                                <Link to={"/aperturacierrecurso/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Apertura Cierre Curso
                                </Link>
                            </li>
                            <li>
                                <Link to={"/cierrecurso/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Cerrar Curso
                                </Link>
                            </li>
                            <li>
                                <Link to={"/curso_horario/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Horario
                                </Link>
                            </li>
                            <li>
                                <Link to={"/motivoaperturacierrecurso/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Motivo Apertura Cierre
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className={`${ (subMenu.persona.active === true ) && 'active' }`}>
                        <a href="#" className="has-dropdown pl-3"
                            onClick={ (evt) => {
                                evt.preventDefault();
                                subMenu.persona.active = !subMenu.persona.active;
                                setSubMenu( { ...subMenu } );
                            } }
                        >
                            <i className="ion ion-ios-albums-outline"></i>
                            <span style={{ fontSize: 13, }}>Persona</span>
                        </a>
                        <ul className="menu-dropdown">
                            <li>
                                <Link to={"/administrativo/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Administrativo
                                </Link>
                            </li>
                            <li>
                                <Link to={"/docente/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Docente
                                </Link>
                            </li>
                            <li>
                                <Link to={"/estudiante/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Estudiante
                                </Link>
                            </li>
                            <li>
                                <Link to={"/cargo/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Cargo
                                </Link>
                            </li>
                            <li>
                                <Link to={"/tipoidentificacion/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Tipo Identificación
                                </Link>
                            </li>
                            <li>
                                <Link to={"/categoriadocumento/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Categoria Documento
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className={`${ (subMenu.estructurainstitucional.active === true ) && 'active' }`}>
                        <a href="#" className="has-dropdown pl-3"
                            onClick={ (evt) => {
                                evt.preventDefault();
                                subMenu.estructurainstitucional.active = !subMenu.estructurainstitucional.active;
                                setSubMenu( { ...subMenu } );
                            } }
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
                                <Link to={"/aula/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Aula
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
                    <li className={`${ (subMenu.estructuraacademica.active === true ) && 'active' }`}>
                        <a href="#" className="has-dropdown pl-3"
                            onClick={ (evt) => {
                                evt.preventDefault();
                                subMenu.estructuraacademica.active = !subMenu.estructuraacademica.active;
                                setSubMenu( { ...subMenu } );
                            } }
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
                            {/* <li>
                                <Link to={"/responsable/index"}>
                                    <i className="ion ion-ios-circle-outline"></i> Responsable
                                </Link>
                            </li> */}
                        </ul>
                    </li>
                    <li className={`${ (subMenu.parametros.active === true ) && 'active' }`}>
                        <a href="#" className="has-dropdown pl-3"
                            onClick={ (evt) => {
                                evt.preventDefault();
                                subMenu.parametros.active = !subMenu.parametros.active;
                                setSubMenu( { ...subMenu } );
                            } }
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
                    <li className={`${ (subMenu.seguridad.active === true ) && 'active' }`}>
                        <a href="#" className="has-dropdown pl-3"
                            onClick={ (evt) => {
                                evt.preventDefault();
                                subMenu.seguridad.active = !subMenu.seguridad.active;
                                setSubMenu( { ...subMenu } );
                            } }
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
