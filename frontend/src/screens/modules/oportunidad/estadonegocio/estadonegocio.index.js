
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { EstadoNegocioActions } from '../../../../redux/actions/oportunidad/estadonegocio.action';
 
function IndexEstadoNegocio(props) {
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
        navigate('/estadonegocio/create');
    };

    const onEdit = (item) => {
        navigate(`/estadonegocio/edit/${item.idestadonegocio}`);
    };

    const onShow = (item) => {
        navigate(`/estadonegocio/show/${item.idestadonegocio}`);
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
                title={"Listado Estado Negocio"}
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
    column: state.ColumnModule.columnEstadoNegocio,
    list: state.PaginationModule.listEstadoNegocio,
    page: state.PaginationModule.pageEstadoNegocio,
    pagination: state.PaginationModule.paginationEstadoNegocio,
    paginate: state.PaginationModule.paginateEstadoNegocio,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPage: EstadoNegocioActions.onPageEstadoNegocio,
    onDelete: EstadoNegocioActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexEstadoNegocio);
