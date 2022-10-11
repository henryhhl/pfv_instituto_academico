
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RolActions } from '../../../../redux/actions/seguridad/rol.action';
import TableComponent from '../../../../components/table';
 
function IndexRol(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllRol();
      return () => {};
    }, [])
    

    function onCreate() {
        navigate('/rol/create');
    }

    function onEdit(rol) {
        navigate(`/rol/edit/${rol.idrol}`);
    }

    function onShow(rol) {
        navigate(`/rol/show/${rol.idrol}`);
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
                                        columns={props.columnRol}
                                        dataSource={props.listRol}
                                        onShow={ ( rol ) => onShow(rol) }
                                        onEditar={ ( rol ) => onEdit(rol) }
                                        onDelete={ ( rol ) => props.onDelete(rol) }
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
    columnRol: state.ColumnModule.columnRol,
    listRol: state.ListModule.listRol,
} );

const mapDispatchToProps = {
    getAllRol: RolActions.getAllRol,
    onDelete: RolActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexRol);
