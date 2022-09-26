
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Tag, Tooltip, Tree } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { TipoPermisoActions } from '../../../../redux/actions/tipoPermisoActions';
 
function IndexCiudad(props) {
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

    const onSelect = (keys, info) => {
        console.log('Trigger Select', keys, info);
    };

    return (
        <>
            <div className="main-content">
                <section className="section">
                    <h1 className="section-header">
                        <div>Ciudad</div>
                        <div className='float-right'>
                            <button type='button' className='btn btn-sm btn-primary'>
                                Nuevo
                            </button>
                        </div>
                    </h1>
                    <div className="row">
                        <div className="col-12" style={{ marginBottom: 50, }}>
                            <div className="card">
                                <div className="card-header">
                                    <h4>Advanced Table</h4>
                                </div>
                                <div className="card-body">
                                    <Tree 
                                        onSelect={onSelect}
                                        style={{ width: '100%', maxWidth: '100%', }}
                                        showIcon={true}
                                        showLine={true}
                                        multiple={true}
                                        defaultExpandAll={true}
                                        blockNode
                                        draggable
                                        checkable={false}
                                        height={400}
                                        selectable={true}
                                        treeData={
                                            [
                                                {
                                                    title: <span style={{ position: 'relative', }}>
                                                        {'Santa Cruz de la Sierra'} 
                                                        <Tooltip placement="top" title={"Agregar"}>
                                                            <Tag style={{ lineHeight: 0, padding: 3, marginLeft: 2, marginRight: 2, }} color="processing">
                                                                <PlusOutlined />
                                                            </Tag>
                                                        </Tooltip>
                                                        <Tooltip placement="top" title={"Ver"}>
                                                            <Tag style={{ lineHeight: 0, padding: 3, marginLeft: 2, marginRight: 2, }} color="green">
                                                                <EyeOutlined />
                                                            </Tag>
                                                        </Tooltip>
                                                        <Tooltip placement="top" title={"Editar"}>
                                                            <Tag style={{ lineHeight: 0, padding: 3, marginLeft: 2, marginRight: 2, }} color="geekblue">
                                                                <EditOutlined />
                                                            </Tag>
                                                        </Tooltip>
                                                        <Tooltip placement="top" title={"Eliminar"}>
                                                            <Tag style={{ lineHeight: 0, padding: 3, marginLeft: 2, marginRight: 2, }} color="red">
                                                                <DeleteOutlined />
                                                            </Tag>
                                                        </Tooltip>
                                                    </span>,
                                                    key: '0-0',
                                                    children: [
                                                        {
                                                            title: <span style={{ position: 'relative', }}>
                                                                {'Andres Ibañez'} 
                                                                <Tooltip placement="top" title={"Agregar"}>
                                                                    <Tag style={{ lineHeight: 0, padding: 3, marginLeft: 2, marginRight: 2, }} color="processing">
                                                                        <PlusOutlined />
                                                                    </Tag>
                                                                </Tooltip>
                                                                <Tooltip placement="top" title={"Ver"}>
                                                                    <Tag style={{ lineHeight: 0, padding: 3, marginLeft: 2, marginRight: 2, }} color="green">
                                                                        <EyeOutlined />
                                                                    </Tag>
                                                                </Tooltip>
                                                                <Tooltip placement="top" title={"Editar"}>
                                                                    <Tag style={{ lineHeight: 0, padding: 3, marginLeft: 2, marginRight: 2, }} color="geekblue">
                                                                        <EditOutlined />
                                                                    </Tag>
                                                                </Tooltip>
                                                                <Tooltip placement="top" title={"Eliminar"}>
                                                                    <Tag style={{ lineHeight: 0, padding: 3, marginLeft: 2, marginRight: 2, }} color="red">
                                                                        <DeleteOutlined />
                                                                    </Tag>
                                                                </Tooltip>
                                                            </span>,
                                                            key: '0-0-0',
                                                            children: [],
                                                        },
                                                        {
                                                            title: <span style={{ position: 'relative', }}>
                                                                {'Montero'} 
                                                                <Tooltip placement="top" title={"Agregar"}>
                                                                    <Tag style={{ lineHeight: 0, padding: 3, marginLeft: 2, marginRight: 2, }} color="processing">
                                                                        <PlusOutlined />
                                                                    </Tag>
                                                                </Tooltip>
                                                                <Tooltip placement="top" title={"Ver"}>
                                                                    <Tag style={{ lineHeight: 0, padding: 3, marginLeft: 2, marginRight: 2, }} color="green">
                                                                        <EyeOutlined />
                                                                    </Tag>
                                                                </Tooltip>
                                                                <Tooltip placement="top" title={"Editar"}>
                                                                    <Tag style={{ lineHeight: 0, padding: 3, marginLeft: 2, marginRight: 2, }} color="geekblue">
                                                                        <EditOutlined />
                                                                    </Tag>
                                                                </Tooltip>
                                                                <Tooltip placement="top" title={"Eliminar"}>
                                                                    <Tag style={{ lineHeight: 0, padding: 3, marginLeft: 2, marginRight: 2, }} color="red">
                                                                        <DeleteOutlined />
                                                                    </Tag>
                                                                </Tooltip>
                                                            </span>,
                                                            key: '0-0-1',
                                                            children: [],
                                                        },
                                                    ],
                                                },
                                                {
                                                    title: <span style={{ position: 'relative', }}>
                                                        {'La Paz'} 
                                                        <Tooltip placement="top" title={"Agregar"}>
                                                            <Tag style={{ lineHeight: 0, padding: 3, marginLeft: 2, marginRight: 2, }} color="processing">
                                                                <PlusOutlined />
                                                            </Tag>
                                                        </Tooltip>
                                                        <Tooltip placement="top" title={"Ver"}>
                                                            <Tag style={{ lineHeight: 0, padding: 3, marginLeft: 2, marginRight: 2, }} color="green">
                                                                <EyeOutlined />
                                                            </Tag>
                                                        </Tooltip>
                                                        <Tooltip placement="top" title={"Editar"}>
                                                            <Tag style={{ lineHeight: 0, padding: 3, marginLeft: 2, marginRight: 2, }} color="geekblue">
                                                                <EditOutlined />
                                                            </Tag>
                                                        </Tooltip>
                                                        <Tooltip placement="top" title={"Eliminar"}>
                                                            <Tag style={{ lineHeight: 0, padding: 3, marginLeft: 2, marginRight: 2, }} color="red">
                                                                <DeleteOutlined />
                                                            </Tag>
                                                        </Tooltip>
                                                    </span>,
                                                    key: '0-1',
                                                    children: []
                                                },
                                                {
                                                    title: <span style={{ position: 'relative', }}>
                                                        {'Cochabamba'} 
                                                        <Tooltip placement="top" title={"Agregar"}>
                                                            <Tag style={{ lineHeight: 0, padding: 3, marginLeft: 2, marginRight: 2, }} color="processing">
                                                                <PlusOutlined />
                                                            </Tag>
                                                        </Tooltip>
                                                        <Tooltip placement="top" title={"Ver"}>
                                                            <Tag style={{ lineHeight: 0, padding: 3, marginLeft: 2, marginRight: 2, }} color="green">
                                                                <EyeOutlined />
                                                            </Tag>
                                                        </Tooltip>
                                                        <Tooltip placement="top" title={"Editar"}>
                                                            <Tag style={{ lineHeight: 0, padding: 3, marginLeft: 2, marginRight: 2, }} color="geekblue">
                                                                <EditOutlined />
                                                            </Tag>
                                                        </Tooltip>
                                                        <Tooltip placement="top" title={"Eliminar"}>
                                                            <Tag style={{ lineHeight: 0, padding: 3, marginLeft: 2, marginRight: 2, }} color="red">
                                                                <DeleteOutlined />
                                                            </Tag>
                                                        </Tooltip>
                                                    </span>,
                                                    key: '0-2',
                                                    children: []
                                                },
                                            ]
                                        }
                                    />
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


export default connect(mapStateToProps, mapDispatchToProps)(IndexCiudad);
