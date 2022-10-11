
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { TipoRolActions } from '../../../../redux/actions/seguridad/tipoRol.action';
import TableComponent from '../../../../components/table';
 
function IndexTipoRol(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllTipoRol();
      return () => {};
    }, [])
    

    function onCreate() {
        navigate('/tipo_rol/create');
    }

    function onEdit(tipoRol) {
        navigate(`/tipo_rol/edit/${tipoRol.idtiporol}`);
    }

    function onShow(tipoRol) {
        navigate(`/tipo_rol/show/${tipoRol.idtiporol}`);
    }

    return (
        <>
            <div className="main-content">
                <section className="section">
                    <h1 className="section-header">
                        <div>Listado Tipo Rol</div>
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
                                        columns={props.columnTipoRol}
                                        dataSource={props.listTipoRol}
                                        onShow={ ( tipoRol ) => onShow(tipoRol) }
                                        onEditar={ ( tipoRol ) => onEdit(tipoRol) }
                                        onDelete={ ( tipoRol ) => props.onDelete(tipoRol) }
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
    columnTipoRol: state.ColumnModule.columnTipoRol,
    listTipoRol: state.ListModule.listTipoRol,
} );

const mapDispatchToProps = {
    getAllTipoRol: TipoRolActions.getAllTipoRol,
    onDelete: TipoRolActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexTipoRol);
