
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
                props.onPage();
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

    const onEdit = (item) => {
        navigate(`/periodo/edit/${item.idperiodo}`);
    }

    const onShow = (item) => {
        navigate(`/periodo/show/${item.idperiodo}`);
    }

    const setPage = (page) => {
        props.onPage(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPage(1, paginate);
    };

    const setSearch = ( value ) => {
        props.onPage(1, props.paginate, value);
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
                    onSearch={ setSearch }
                >
                    <TableComponent 
                        columns={props.column}
                        dataSource={props.list}
                        onShow={ ( item ) => onShow(item) }
                        onEditar={ ( item ) => onEdit(item) }
                        onDelete={ ( item ) => props.onDelete(item) }
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
    column: state.ColumnModule.columnPeriodo,
    list: state.PaginationModule.listPeriodo,
    page: state.PaginationModule.pagePeriodo,
    pagination: state.PaginationModule.paginationPeriodo,
    paginate: state.PaginationModule.paginatePeriodo,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPage: PeriodoActions.onPagePeriodo,
    onDelete: PeriodoActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexPeriodo);
