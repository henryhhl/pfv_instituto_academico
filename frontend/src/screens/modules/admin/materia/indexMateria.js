
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Tag, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { TipoPermisoActions } from '../../../../redux/actions/seguridad/tipoPermiso.action';
import { MateriaActions } from '../../../../redux/actions/materiaActions';
import TableComponent from '../../../../components/table';
 
function IndexMateria(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllMateria();
      return () => {};
    }, [])
    

    function onCreate() {
        navigate('/materia/create');
    }

    function onEdit(materia) {
        navigate(`/materia/edit/${materia.idmateria}`);
    }

    function onShow(materia) {
        navigate(`/materia/show/${materia.idmateria}`);
    }

    return (
        <>
            <div className="main-content">
                <section className="section">
                    <h1 className="section-header">
                        <div>Listado Materia</div>
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
                                        columns={props.columnMateria}
                                        dataSource={props.listMateria}
                                        onShow={ ( materia ) => onShow(materia) }
                                        onEditar={ ( materia ) => onEdit(materia) }
                                        onDelete={ ( materia ) => props.onDelete(materia) }
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
    columnMateria: state.ColumnModule.columnMateria,
    listMateria: state.ListModule.listMateria,
} );

const mapDispatchToProps = {
    getAllMateria: MateriaActions.getAllMateria,
    onDelete: MateriaActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexMateria);
