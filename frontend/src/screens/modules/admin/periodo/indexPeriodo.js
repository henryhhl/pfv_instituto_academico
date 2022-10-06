
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PeriodoActions } from '../../../../redux/actions/periodoActions';
import TableComponent from '../../../../components/table';
 
function IndexPeriodo(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllPeriodo();
      return () => {};
    }, [])
    

    function onCreate() {
        navigate('/periodo/create');
    }

    function onEdit(periodo) {
        navigate(`/periodo/edit/${periodo.idperiodo}`);
    }

    function onShow(periodo) {
        navigate(`/periodo/show/${periodo.idperiodo}`);
    }

    return (
        <>
            <div className="main-content">
                <section className="section">
                    <h1 className="section-header">
                        <div>Listado Periodo</div>
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
                                    <TableComponent 
                                        columns={props.columnPeriodo}
                                        dataSource={props.listPeriodo}
                                        onShow={ ( periodo ) => onShow(periodo) }
                                        onEditar={ ( periodo ) => onEdit(periodo) }
                                        onDelete={ ( periodo ) => props.onDelete(periodo) }
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
    columnPeriodo: state.ColumnModule.columnPeriodo,
    listPeriodo: state.ListModule.listPeriodo,
} );

const mapDispatchToProps = {
    getAllPeriodo: PeriodoActions.getAllPeriodo,
    onDelete: PeriodoActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexPeriodo);
