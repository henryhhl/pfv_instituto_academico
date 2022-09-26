
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Tree } from 'antd';
import { useNavigate } from 'react-router-dom';
import { TipoPermisoActions } from '../../../../redux/actions/tipoPermisoActions';
 
function IndexPermiso(props) {
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
                        <div>Permisos</div>
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
                                        treeData={
                                            [
                                                {
                                                    title: 'Seguridad',
                                                    key: '0-0',
                                                    children: [
                                                        {
                                                            title: 'Rol',
                                                            key: '0-0-0',
                                                            children: [
                                                                { title: 'Crear', key: '0-0-0-0', },
                                                                {
                                                                    title: 'Editar',
                                                                    key: '0-0-0-1',
                                                                },
                                                                { title: 'Ver', key: '0-0-0-2', },
                                                            ],
                                                        },
                                                        {
                                                            title: 'Tipo Rol',
                                                            key: '0-0-1',
                                                            children: [{ title: 'Crear', key: '0-0-1-0', }],
                                                        },
                                                    ],
                                                },
                                                {
                                                    title: 'Administración',
                                                    key: '0-1',
                                                    children: [
                                                        {
                                                            title: 'Materia',
                                                            key: '0-1-0',
                                                            children: [
                                                                { title: 'Crear', key: '0-1-0-0', },
                                                                { title: 'Editar', key: '0-1-0-1', },
                                                            ],
                                                        },
                                                        {
                                                            title: 'Nivel Academico',
                                                            key: '0-2-0',
                                                            children: [
                                                                { title: 'Crear', key: '0-2-0-0', },
                                                                { title: 'Editar', key: '0-2-0-1', },
                                                            ],
                                                        },
                                                        {
                                                            title: 'Modalidad Academica',
                                                            key: '0-3-0',
                                                            children: [
                                                                { title: 'Crear', key: '0-3-0-0', },
                                                                { title: 'Editar', key: '0-3-0-1', },
                                                            ],
                                                        },
                                                        {
                                                            title: 'Periodo',
                                                            key: '0-4-0',
                                                            children: [
                                                                { title: 'Crear', key: '0-4-0-0', },
                                                                { title: 'Editar', key: '0-4-0-1', },
                                                            ],
                                                        },
                                                    ]
                                                }
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


export default connect(mapStateToProps, mapDispatchToProps)(IndexPermiso);
