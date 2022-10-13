
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PeriodoActions } from '../../../../redux/actions/periodoActions';
import TableComponent from '../../../../components/table';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
 
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
            <PaperComponent
                title={"Listado Periodo"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnPeriodo}
                        dataSource={props.listPeriodo}
                        onShow={ ( periodo ) => onShow(periodo) }
                        onEditar={ ( periodo ) => onEdit(periodo) }
                        onDelete={ ( periodo ) => props.onDelete(periodo) }
                    />
                </CardComponent>
            </PaperComponent>
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
