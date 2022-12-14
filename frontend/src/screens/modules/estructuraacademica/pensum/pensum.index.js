
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
import TableComponent from '../../../../components/table';
import { PensumActions } from '../../../../redux/actions/estructuraacademica/pensum.action';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
 
function IndexPensum(props) {
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
        navigate('/pensum/create');
    };

    const onEdit = (item) => {
        navigate(`/pensum/edit/${item.idpensum}`);
    };

    const onShow = (item) => {
        navigate(`/pensum/show/${item.idpensum}`);
    };

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
                title={"Listado Pensum"}
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
    column: state.ColumnModule.columnPensum,
    list: state.PaginationModule.listPensum,
    page: state.PaginationModule.pagePensum,
    pagination: state.PaginationModule.paginationPensum,
    paginate: state.PaginationModule.paginatePensum,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPage: PensumActions.onPagePensum,
    onDelete: PensumActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexPensum);
