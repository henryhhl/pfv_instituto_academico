
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Tag, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { NivelAcademicoActions } from '../../../../redux/actions/nivelAcademicoActions';
import TableComponent from '../../../../components/table';
 
function IndexNivelAcademico(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllNivelAcademico();
      return () => {};
    }, [])
    

    function onCreate() {
        navigate('/nivelacademico/create');
    }

    function onEdit(nivelAcademico) {
        navigate(`/nivelacademico/edit/${nivelAcademico.idnivelacademico}`);
    }

    function onShow(nivelAcademico) {
        navigate(`/nivelacademico/show/${nivelAcademico.idnivelacademico}`);
    }

    return (
        <>
            <div className="main-content">
                <section className="section">
                    <h1 className="section-header">
                        <div>Listado Nivel Academico</div>
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
                                        columns={props.columnNivelAcademico}
                                        dataSource={props.listNivelAcademico}
                                        onShow={ ( nivelAcademico ) => onShow(nivelAcademico) }
                                        onEditar={ ( nivelAcademico ) => onEdit(nivelAcademico) }
                                        onDelete={ ( nivelAcademico ) => props.onDelete(nivelAcademico) }
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
    columnNivelAcademico: state.ColumnModule.columnNivelAcademico,
    listNivelAcademico: state.ListModule.listNivelAcademico,
} );

const mapDispatchToProps = {
    getAllNivelAcademico: NivelAcademicoActions.getAllNivelAcademico,
    onDelete: NivelAcademicoActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexNivelAcademico);
