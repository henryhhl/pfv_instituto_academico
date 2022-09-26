
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Tag, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { TipoPermisoActions } from '../../../../redux/actions/tipoPermisoActions';
 
function IndexRol(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllTipoPermiso();
    //   return () => {};
    }, [])
    

    function onCreate() {
        navigate('/rol/create');
    }

    function onEdit(rol) {
        // navigate(`/tipo_rol/edit/${tipoRol.idtiporol}`);
        navigate(`/rol/edit/1`);
    }

    function onShow(rol) {
        // navigate(`/tipo_rol/edit/${tipoRol.idtiporol}`);
        navigate(`/rol/show/1`);
    }

    return (
        <>
            <div className="main-content">
                <section className="section">
                    <h1 className="section-header">
                        <div>Listado Rol</div>
                        <div className='float-right'>
                            <button type='button' className='btn btn-sm btn-primary' onClick={onCreate}>
                                Nuevo
                            </button>
                        </div>
                    </h1>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="float-right">
                                        <form>
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Search" />
                                            <div className="input-group-btn">
                                                <button className="btn btn-secondary"><i className="ion ion-search"></i></button>
                                            </div>
                                            </div>
                                        </form>
                                    </div>
                                    <h4>Advanced Table</h4>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped table-bordered table-hover table-sm">
                                            <tbody>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Descripción</th>
                                                    <th>Tipo</th>
                                                    <th>Estado</th>
                                                    <th>Concurrencia</th>
                                                    <th>Opción</th>
                                                </tr>
                                                <tr>
                                                    <td>1</td>
                                                    <td>SuperAdmin</td>
                                                    <td>Tipo Rol 1</td>
                                                    <td>
                                                        <Tag color={"geekblue"}>Activo</Tag>
                                                    </td>
                                                    <td>1</td>
                                                    <td>
                                                        <Tooltip placement="top" title={"Ver"}>
                                                            <Button 
                                                                onClick={onShow}
                                                                size={"small"}
                                                                style={{ marginLeft: 1, marginRight: 1, }}
                                                            >
                                                                <EyeOutlined />
                                                            </Button>
                                                        </Tooltip>
                                                        <Tooltip placement="top" title={"Editar"}>
                                                            <Button 
                                                                onClick={onEdit}
                                                                size={"small"}
                                                                style={{ marginLeft: 1, marginRight: 1, }}
                                                            >
                                                                <EditOutlined />
                                                            </Button>
                                                        </Tooltip>
                                                        <Tooltip placement="top" title={"Eliminar"}>
                                                            <Button 
                                                                onClick={onEdit}
                                                                size={"small"}
                                                                style={{ marginLeft: 1, marginRight: 1, }}
                                                            >
                                                                <DeleteOutlined />
                                                            </Button>
                                                        </Tooltip>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Admin</td>
                                                    <td>Tipo Rol 2</td>
                                                    <td>
                                                        <Tag>InActivo</Tag>
                                                    </td>
                                                    <td>1</td>
                                                    <td>
                                                        <Tooltip placement="top" title={"Ver"}>
                                                            <Button 
                                                                onClick={onShow}
                                                                size={"small"}
                                                                style={{ marginLeft: 1, marginRight: 1, }}
                                                            >
                                                                <EyeOutlined />
                                                            </Button>
                                                        </Tooltip>
                                                        <Tooltip placement="top" title={"Editar"}>
                                                            <Button 
                                                                onClick={onEdit}
                                                                size={"small"}
                                                                style={{ marginLeft: 1, marginRight: 1, }}
                                                            >
                                                                <EditOutlined />
                                                            </Button>
                                                        </Tooltip>
                                                        <Tooltip placement="top" title={"Eliminar"}>
                                                            <Button 
                                                                onClick={onEdit}
                                                                size={"small"}
                                                                style={{ marginLeft: 1, marginRight: 1, }}
                                                            >
                                                                <DeleteOutlined />
                                                            </Button>
                                                        </Tooltip>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
} );

const mapDispatchToProps = {
    getAllTipoPermiso: TipoPermisoActions.getAllTipoPermiso,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexRol);
