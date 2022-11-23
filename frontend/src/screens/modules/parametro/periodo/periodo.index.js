
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { PeriodoActions } from '../../../../redux/actions/parametros/periodo.action';
 
function IndexPeriodo(props) {
    const navigate = useNavigate();

    React.useEffect( () => {
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onPagePeriodo();
            }
        } );
        return () => {};
    }, [] );

    const onLogin = () => {
        navigate( '/login' );
    };

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
    onValidateToken: AuthActions.onValidateToken,
    onPagePeriodo: PeriodoActions.onPagePeriodo,
    onDelete: PeriodoActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexPeriodo);
