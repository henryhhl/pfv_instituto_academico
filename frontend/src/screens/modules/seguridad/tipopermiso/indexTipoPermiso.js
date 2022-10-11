
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TipoPermisoActions } from '../../../../redux/actions/seguridad/tipoPermiso.action';
import TableComponent from '../../../../components/table';
 
function IndexTipoPermiso(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllTipoPermiso();
    //   return () => {};
    }, [])
    

    function onCreate() {
        navigate('/tipo_permiso/create');
    }

    function onEdit(tipoPermiso) {
        navigate(`/tipo_permiso/edit/${tipoPermiso.idtipopermiso}`);
    }

    function onShow(tipoPermiso) {
        navigate(`/tipo_permiso/show/${tipoPermiso.idtipopermiso}`);
    }

    return (
        <>
            <div className="main-content">
                <section className="section">
                    <h1 className="section-header">
                        <div>Listado Tipo Permiso</div>
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
                                                <input type="text" className="form-control" placeholder="Buscar..." />
                                            <div className="input-group-btn">
                                                <button className="btn btn-secondary"><i className="ion ion-search"></i></button>
                                            </div>
                                            </div>
                                        </form>
                                    </div>
                                    <h4>Advanced Table</h4>
                                </div>
                                <div className="card-body">
                                    <TableComponent 
                                        columns={props.columnTipoPermiso}
                                        dataSource={props.listTipoPermiso}
                                        onShow={ ( tipoPermiso ) => onShow(tipoPermiso) }
                                        onEditar={ ( tipoPermiso ) => onEdit(tipoPermiso) }
                                        onDelete={ ( tipoPermiso ) => props.onDelete(tipoPermiso) }
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
    columnTipoPermiso: state.ColumnModule.columnTipoPermiso,
    listTipoPermiso: state.ListModule.listTipoPermiso,
} );

const mapDispatchToProps = {
    getAllTipoPermiso: TipoPermisoActions.getAllTipoPermiso,
    onDelete: TipoPermisoActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexTipoPermiso);
