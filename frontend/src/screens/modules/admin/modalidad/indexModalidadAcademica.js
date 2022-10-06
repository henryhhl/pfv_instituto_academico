
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ModalidadAcademicaActions } from '../../../../redux/actions/modalidadAcademicaActions';
import TableComponent from '../../../../components/table';
 
function IndexModalidadAcademica(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllModalidadAcademica();
      return () => {};
    }, [])
    

    function onCreate() {
        navigate('/modalidadacademica/create');
    }

    function onEdit(modalidadAcademica) {
        navigate(`/modalidadacademica/edit/${modalidadAcademica.idmodalidadacademica}`);
    }

    function onShow(modalidadAcademica) {
        navigate(`/modalidadacademica/show/${modalidadAcademica.idmodalidadacademica}`);
    }

    return (
        <>
            <div className="main-content">
                <section className="section">
                    <h1 className="section-header">
                        <div>Listado Modalidad Academica</div>
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
                                        columns={props.columnModalidadAcademica}
                                        dataSource={props.listModalidadAcademica}
                                        onShow={ ( modalidadAcademica ) => onShow(modalidadAcademica) }
                                        onEditar={ ( modalidadAcademica ) => onEdit(modalidadAcademica) }
                                        onDelete={ ( modalidadAcademica ) => props.onDelete(modalidadAcademica) }
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
    columnModalidadAcademica: state.ColumnModule.columnModalidadAcademica,
    listModalidadAcademica: state.ListModule.listModalidadAcademica,
} );

const mapDispatchToProps = {
    getAllModalidadAcademica: ModalidadAcademicaActions.getAllModalidadAcademica,
    onDelete: ModalidadAcademicaActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexModalidadAcademica);
