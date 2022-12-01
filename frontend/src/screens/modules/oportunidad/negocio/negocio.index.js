
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { NegocioActions } from '../../../../redux/actions/oportunidad/negocio.action';
 
function IndexNegocio(props) {
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
        navigate('/negocio/create');
    };

    const onEdit = (item) => {
        navigate(`/negocio/edit/${item.idnegocio}`);
    };

    const onShow = (item) => {
        navigate(`/negocio/show/${item.idnegocio}`);
    };

    const setPage = (page) => {
        props.onPage(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPage(1, paginate);
    };

    return (
        <>
            <PaperComponent
                title={"Listado Negocio"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
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
    column: state.ColumnModule.columnNegocio,
    list: state.PaginationModule.listNegocio,
    page: state.PaginationModule.pageNegocio,
    pagination: state.PaginationModule.paginationNegocio,
    paginate: state.PaginationModule.paginateNegocio,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPage: NegocioActions.onPageNegocio,
    onDelete: NegocioActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexNegocio);
