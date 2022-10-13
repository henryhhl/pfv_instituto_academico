
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Tag, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { NivelAcademicoActions } from '../../../../redux/actions/nivelAcademicoActions';
import TableComponent from '../../../../components/table';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
 
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
            <PaperComponent
                title={"Listado Nivel Academico"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnNivelAcademico}
                        dataSource={props.listNivelAcademico}
                        onShow={ ( nivelAcademico ) => onShow(nivelAcademico) }
                        onEditar={ ( nivelAcademico ) => onEdit(nivelAcademico) }
                        onDelete={ ( nivelAcademico ) => props.onDelete(nivelAcademico) }
                    />
                </CardComponent>
            </PaperComponent>
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
