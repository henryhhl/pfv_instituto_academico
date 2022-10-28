
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
      props.onPagePeriodo();
      return () => {};
    }, [])
    

    const onCreate = () => {
        navigate('/periodo/create');
    }

    const onEdit = (periodo) => {
        navigate(`/periodo/edit/${periodo.idperiodo}`);
    }

    const onShow = (periodo) => {
        navigate(`/periodo/show/${periodo.idperiodo}`);
    }

    const setPage = (page) => {
        props.onPagePeriodo(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPagePeriodo(1, paginate);
    };

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
                        isPagination={true}
                        pagination={props.pagination}
                        paginate={props.paginate}
                        page={props.page - 1}
                        setPage={setPage}
                        setPaginate={setPaginate}
                    />
                </CardComponent>
            </PaperComponent>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
    columnPeriodo: state.ColumnModule.columnPeriodo,
    listPeriodo: state.PaginationModule.listPeriodo,
    page: state.PaginationModule.pagePeriodo,
    pagination: state.PaginationModule.paginationPeriodo,
    paginate: state.PaginationModule.paginatePeriodo,
} );

const mapDispatchToProps = {
    onPagePeriodo: PeriodoActions.onPagePeriodo,
    onDelete: PeriodoActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexPeriodo);
