
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { OfertaAcademicaActions } from '../../../../redux/actions/ofertaAcademicaActions';
import TableComponent from '../../../../components/table';
 
function IndexOfertaAcademica(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllOfertaAcademica();
      return () => {};
    }, [])
    

    function onCreate() {
        navigate('/ofertaacademica/create');
    }

    function onEdit(ofertaAcademica) {
        navigate(`/ofertaacademica/edit/${ofertaAcademica.idofertaacademica}`);
    }

    function onShow(ofertaAcademica) {
        navigate(`/ofertaacademica/show/${ofertaAcademica.idofertaacademica}`);
    }

    return (
        <>
            <div className="main-content">
                <section className="section">
                    <h1 className="section-header">
                        <div>Listado Oferta Academica</div>
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
                                        columns={props.columnOfertaAcademica}
                                        dataSource={props.listOfertaAcademica}
                                        onShow={ ( ofertaAcademica ) => onShow(ofertaAcademica) }
                                        onEditar={ ( ofertaAcademica ) => onEdit(ofertaAcademica) }
                                        onDelete={ ( ofertaAcademica ) => props.onDelete(ofertaAcademica) }
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
    columnOfertaAcademica: state.ColumnModule.columnOfertaAcademica,
    listOfertaAcademica: state.ListModule.listOfertaAcademica,
} );

const mapDispatchToProps = {
    getAllOfertaAcademica: OfertaAcademicaActions.getAllOfertaAcademica,
    onDelete: OfertaAcademicaActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexOfertaAcademica);
