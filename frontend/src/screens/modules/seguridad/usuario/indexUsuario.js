
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UsuarioActions } from '../../../../redux/actions/seguridad/usuario.action';
import TableComponent from '../../../../components/table';
 
function IndexUsuario(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllUsuario();
      return () => {};
    }, [])
    

    function onCreate() {
        navigate('/usuario/create');
    }

    function onEdit(usuario) {
        navigate(`/usuario/edit/${usuario.idusuario}`);
    }

    function onShow(usuario) {
        navigate(`/usuario/show/${usuario.idusuario}`);
    }

    return (
        <>
            <div className="main-content">
                <section className="section">
                    <h1 className="section-header">
                        <div>Listado Usuario</div>
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
                                        columns={props.columnUsuario}
                                        dataSource={props.listUsuario}
                                        onShow={ ( usuario ) => onShow(usuario) }
                                        onEditar={ ( usuario ) => onEdit(usuario) }
                                        onDelete={ ( usuario ) => props.onDelete(usuario) }
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
    columnUsuario: state.ColumnModule.columnUsuario,
    listUsuario: state.ListModule.listUsuario,
} );

const mapDispatchToProps = {
    getAllUsuario: UsuarioActions.getAllUsuario,
    onDelete: UsuarioActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexUsuario);
