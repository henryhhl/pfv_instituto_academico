
import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const SidebarComponent = (props) => {
    const { profile } = props;
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
                        <img alt="image" 
                            src={ `${ (profile.imagen !== null && profile.imagen !== "") ? profile.imagen : '/assets/img/profile.png'}` } 
                        />
                    </div>
                    <div className="sidebar-user-details">
                        <div className="user-name">
                            { props.profile.nombreprincipal ?? 'S/N' }
                        </div>
                        <div className="user-role">
                            Administrador
                        </div>
                    </div>
                </div>
                <Menu className='sidebar-menu w-100' mode='inline'
                    style={{ maxHeight: '75vh', overflowY: 'auto', overflowX: 'hidden', }}
                >
                    <Menu.Item className='menu-header d-flex align-items-center' style={{ height: 30, }}>
                        Dashboard
                    </Menu.Item>
                    <Menu.Item className='active p-0' style={{ lineHeight: 0, height: 50, }}>
                        <Link to={"/"} className="d-flex align-items-center">
                            <i className="ion ion-speedometer"></i><span>Dashboard</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item className='menu-header d-flex align-items-center' style={{ height: 30, }}>
                        Componentes
                    </Menu.Item>
                    <Menu.SubMenu 
                        title={
                            <a href="#" className="p-0 d-flex align-items-center"
                                onClick={ (evt) => {
                                    evt.preventDefault();
                                } }
                                style={{ lineHeight: 0, height: 50, }}
                            >
                                <i className="ion ion-ios-albums-outline"></i>
                                <span style={{ fontSize: 13, }}>CRM</span>
                            </a>
                        }
                        className="p-0"
                    >
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/oportunidad/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Oportunidad
                            </Link>
                        </Menu.Item>
                        {/* <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/negocio/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Negocio
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/actividad/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Actividad
                            </Link>
                        </Menu.Item> */}
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/asesorresponsable/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Asesor Administrativo
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/estadonegocio/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Estado Negocio
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/tipoactividad/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Tipo Actividad
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/tiporesultado/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Tipo Resultado
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/tipomediopublicitario/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Tipo Medio Publicitario
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/tipocontacto/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Tipo Contacto
                            </Link>
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu 
                        title={
                            <a href="#" className="p-0 d-flex align-items-center"
                                onClick={ (evt) => {
                                    evt.preventDefault();
                                } }
                                style={{ lineHeight: 0, height: 50, }}
                            >
                                <i className="ion ion-ios-albums-outline"></i>
                                <span style={{ fontSize: 13, }}>Inscripción</span>
                            </a>
                        }
                        className="p-0"
                    >
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/inscripcionprograma/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Programa
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/inscripciongrupo/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Grupo
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/inscripcioncurso/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Curso
                            </Link>
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu 
                        title={
                            <a href="#" className="p-0 d-flex align-items-center"
                                onClick={ (evt) => {
                                    evt.preventDefault();
                                } }
                                style={{ lineHeight: 0, height: 50, }}
                            >
                                <i className="ion ion-ios-albums-outline"></i>
                                <span style={{ fontSize: 13, }}>Oferta Academica</span>
                            </a>
                        }
                        className="p-0"
                    >
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/grupo/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Grupo
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/curso/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Curso
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/aperturacierrecurso/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Apertura Cierre Curso
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/cierrecurso/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Cierre Curso
                            </Link>
                        </Menu.Item>
                        {/* <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/curso_horario/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Horario
                            </Link>
                        </Menu.Item> */}
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/motivoaperturacierrecurso/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Motivo Apertura Cierre
                            </Link>
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu 
                        title={
                            <a href="#" className="p-0 d-flex align-items-center"
                                onClick={ (evt) => {
                                    evt.preventDefault();
                                } }
                                style={{ lineHeight: 0, height: 50, }}
                            >
                                <i className="ion ion-ios-albums-outline"></i>
                                <span style={{ fontSize: 13, }}>Persona</span>
                            </a>
                        }
                        className="p-0"
                    >
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/administrativo/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Administrativo
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/docente/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Docente
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/estudiante/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Estudiante
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/cargo/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Cargo
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/tipoidentificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Tipo Identificación
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/categoriadocumento/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Categoría Documento
                            </Link>
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu 
                        title={
                            <a href="#" className="p-0 d-flex align-items-center"
                                onClick={ (evt) => {
                                    evt.preventDefault();
                                } }
                                style={{ lineHeight: 0, height: 50, }}
                            >
                                <i className="ion ion-ios-albums-outline"></i>
                                <span style={{ fontSize: 13, }}>Estructura Institucional</span>
                            </a>
                        }
                        className="p-0"
                    >
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/institucion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Institución
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/aula/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Aula
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/gestionperiodo/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Periodo
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/divisionacademica/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> División Academica
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/turno/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Turno
                            </Link>
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu 
                        title={
                            <a href="#" className="p-0 d-flex align-items-center"
                                onClick={ (evt) => {
                                    evt.preventDefault();
                                } }
                                style={{ lineHeight: 0, height: 50, }}
                            >
                                <i className="ion ion-ios-albums-outline"></i>
                                <span style={{ fontSize: 13, }}>Estructura Academica</span>
                            </a>
                        }
                        className="p-0"
                    >
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/unidadadministrativa/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Unidad Administrativa
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/unidadacademica/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Unidad Academica
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/programa/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Programa
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/pensum/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Pensum
                            </Link>
                        </Menu.Item>
                    </Menu.SubMenu>

                    <Menu.SubMenu 
                        title={
                            <a href="#" className="p-0 d-flex align-items-center"
                                onClick={ (evt) => {
                                    evt.preventDefault();
                                } }
                                style={{ lineHeight: 0, height: 50, }}
                            >
                                <i className="ion ion-ios-albums-outline"></i>
                                <span style={{ fontSize: 13, }}>Notas</span>
                            </a>
                        }
                        className="p-0"
                    >
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Calificaciones
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/notadecurso/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Notas de Cursos
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/notadegrupo/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Notas de Grupos
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/asistenciadecurso/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Asistencias de Cursos
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/asistenciadegrupo/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Asistencias de Grupos
                            </Link>
                        </Menu.Item>
                    </Menu.SubMenu>

                    <Menu.SubMenu 
                        title={
                            <a href="#" className="p-0 d-flex align-items-center"
                                onClick={ (evt) => {
                                    evt.preventDefault();
                                } }
                                style={{ lineHeight: 0, height: 50, }}
                            >
                                <i className="ion ion-ios-albums-outline"></i>
                                <span style={{ fontSize: 13, }}>Titulación</span>
                            </a>
                        }
                        className="p-0"
                    >
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Tutores o Tribunales Evaluadores
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Presidente Colegio Profesionales
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Rectores o Directores
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Profesión de Tutores
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Colegio Profesionales
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Áreas Administrativas
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Salas
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Nivel Académico Tribunal Externo
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Perfil Graduación Postulante
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Recepción de Trabajo Finales
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Entrega Trabajo Revisores
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Recepción Trabajo Revisores
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Entrega Trabajo Estudiante
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Control Copia Trabajo Postulante
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Correspondencia Comunicación Estudiante
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Comunicación Interna
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Comunicación Externa
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Reportes/Informes
                            </Link>
                        </Menu.Item>
                    </Menu.SubMenu>

                    <Menu.SubMenu 
                        title={
                            <a href="#" className="p-0 d-flex align-items-center"
                                onClick={ (evt) => {
                                    evt.preventDefault();
                                } }
                                style={{ lineHeight: 0, height: 50, }}
                            >
                                <i className="ion ion-ios-albums-outline"></i>
                                <span style={{ fontSize: 13, }}>Encuesta</span>
                            </a>
                        }
                        className="p-0"
                    >
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Ponderación documento
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Criterio de Evaluación
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Escala Calificación
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Plantilla de Encuesta
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Responsable de Encuesta
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Evaluación de Estudiante
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Evaluación Encargados de Carreras
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> AutoEvaluaciones
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Evaluaciones Pendientes
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Resportes/Informes
                            </Link>
                        </Menu.Item>
                    </Menu.SubMenu>

                    <Menu.SubMenu 
                        title={
                            <a href="#" className="p-0 d-flex align-items-center"
                                onClick={ (evt) => {
                                    evt.preventDefault();
                                } }
                                style={{ lineHeight: 0, height: 50, }}
                            >
                                <i className="ion ion-ios-albums-outline"></i>
                                <span style={{ fontSize: 13, }}>Convalidación</span>
                            </a>
                        }
                        className="p-0"
                    >
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Departamento
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Tipo Documento Personal
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Tipo Documento solicitud
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Origen Externo Institución
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Tipo Presentación
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Nivel Programa Analítico
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Pensums Académico
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Tipo Carga Horaria
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Solicitud Convalidación
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Documento Evaluación
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Certificados
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Materia Evaluación
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Programa Analítico Origen
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Pre-Convalidación Pendiente
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Pre-Convalidación Realizada
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Convalidación Oficial
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Informe Técnico
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Histórico Convalidación
                            </Link>
                        </Menu.Item>
                    </Menu.SubMenu>

                    <Menu.SubMenu 
                        title={
                            <a href="#" className="p-0 d-flex align-items-center"
                                onClick={ (evt) => {
                                    evt.preventDefault();
                                } }
                                style={{ lineHeight: 0, height: 50, }}
                            >
                                <i className="ion ion-ios-albums-outline"></i>
                                <span style={{ fontSize: 13, }}>Parámetros</span>
                            </a>
                        }
                        className="p-0"
                    >
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/unidadnegocio/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Unidad Negocio
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/ofertaacademica/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Oferta Academica
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/nivelacademico/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Nivel Academico
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/modalidadacademica/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Modalidad Academica
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/periodo/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Periodo
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/materia/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Materia
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/tipomateria/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Tipo Materia
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/ciudad/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Familia Ciudad
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/tipociudad/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Tipo Localidad
                            </Link>
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu 
                        title={
                            <a href="#" className="p-0 d-flex align-items-center"
                                onClick={ (evt) => {
                                    evt.preventDefault();
                                } }
                                style={{ lineHeight: 0, height: 50, }}
                            >
                                <i className="ion ion-ios-albums-outline"></i>
                                <span style={{ fontSize: 13, }}>Seguridad</span>
                            </a>
                        }
                        className="p-0"
                    >
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/usuario/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Usuario
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Usuario Conectado
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/bitacora/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Bitacora
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Configuración
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Backup
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/asignar_rol"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Asignar Rol
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/asignar_permiso"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Asignar Permiso
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/calificacion/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Activar Permiso
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/rol/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Rol
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/permiso/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Permiso
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/tipo_rol/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Tipo Rol
                            </Link>
                        </Menu.Item>
                        <Menu.Item className='p-1 pl-2' style={{ lineHeight: 0, height: 35, }}>
                            <Link to={"/tipo_permiso/index"} className="d-flex align-items-center" 
                                style={{ color: '#505c66', fontSize: 12, fontWeight: '400', }}
                            >
                                <i className="ion ion-ios-circle-outline" style={{ color: '#505c66', fontSize: 16, }}></i> Tipo Permiso
                            </Link>
                        </Menu.Item>
                    </Menu.SubMenu>
                </Menu>

            </aside>
        </div>
    );
};

const mapStateToProps = ( state ) => ( {
    profile: state.Profile,
} );
  
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)( SidebarComponent );
