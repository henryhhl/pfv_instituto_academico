
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UnidadNegocioActions } from '../../../../redux/actions/unidadNegocioActions';
import TableComponent from '../../../../components/table';
 
function IndexUnidadNegocio(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllUnidadNegocio();
      return () => {};
    }, [])
    

    function onCreate() {
        navigate('/unidadnegocio/create');
    }

    function onEdit(unidadNegocio) {
        navigate(`/unidadnegocio/edit/${unidadNegocio.idunidadnegocio}`);
    }

    function onShow(unidadNegocio) {
        navigate(`/unidadnegocio/show/${unidadNegocio.idunidadnegocio}`);
    }

    return (
        <>
            <div className="main-content">
                <section className="section">
                    <h1 className="section-header">
                        <div>Listado Unidad Negocio</div>
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
                                        columns={props.columnUnidadNegocio}
                                        dataSource={props.listUnidadNegocio}
                                        onShow={ ( unidadNegocio ) => onShow(unidadNegocio) }
                                        onEditar={ ( unidadNegocio ) => onEdit(unidadNegocio) }
                                        onDelete={ ( unidadNegocio ) => props.onDelete(unidadNegocio) }
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
    columnUnidadNegocio: state.ColumnModule.columnUnidadNegocio,
    listUnidadNegocio: state.ListModule.listUnidadNegocio,
} );

const mapDispatchToProps = {
    getAllUnidadNegocio: UnidadNegocioActions.getAllUnidadNegocio,
    onDelete: UnidadNegocioActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexUnidadNegocio);
