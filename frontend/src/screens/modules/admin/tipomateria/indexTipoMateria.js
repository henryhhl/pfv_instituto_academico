
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TipoMateriaActions } from '../../../../redux/actions/tipoMateriaActions';
import TableComponent from '../../../../components/table';
 
function IndexTipoMateria(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllTipoMateria();
      return () => {};
    }, [])
    

    function onCreate() {
        navigate('/tipomateria/create');
    }

    function onEdit(tipoMateria) {
        navigate(`/tipomateria/edit/${tipoMateria.idtipomateria}`);
    }

    function onShow(tipoMateria) {
        navigate(`/tipomateria/show/${tipoMateria.idtipomateria}`);
    }

    return (
        <>
            <div className="main-content">
                <section className="section">
                    <h1 className="section-header">
                        <div>Listado Tipo Materia</div>
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
                                        columns={props.columnTipoMateria}
                                        dataSource={props.listTipoMateria}
                                        onShow={ ( tipoMateria ) => onShow(tipoMateria) }
                                        onEditar={ ( tipoMateria ) => onEdit(tipoMateria) }
                                        onDelete={ ( tipoMateria ) => props.onDelete(tipoMateria) }
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
    columnTipoMateria: state.ColumnModule.columnTipoMateria,
    listTipoMateria: state.ListModule.listTipoMateria,
} );

const mapDispatchToProps = {
    getAllTipoMateria: TipoMateriaActions.getAllTipoMateria,
    onDelete: TipoMateriaActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexTipoMateria);
