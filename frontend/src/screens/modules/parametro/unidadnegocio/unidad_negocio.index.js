
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { UnidadNegocioActions } from '../../../../redux/actions/parametros/unidad_negocio.action';
 
function IndexUnidadNegocio(props) {
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
        navigate('/unidadnegocio/create');
    };

    const onEdit = (item) => {
        navigate(`/unidadnegocio/edit/${item.idunidadnegocio}`);
    };

    const onShow = (item) => {
        navigate(`/unidadnegocio/show/${item.idunidadnegocio}`);
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
                title={"Listado Unidad Negocio"}
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
    column: state.ColumnModule.columnUnidadNegocio,
    list: state.PaginationModule.listUnidadNegocio,
    page: state.PaginationModule.pageUnidadNegocio,
    pagination: state.PaginationModule.paginationUnidadNegocio,
    paginate: state.PaginationModule.paginateUnidadNegocio,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPage: UnidadNegocioActions.onPageUnidadNegocio,
    onDelete: UnidadNegocioActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexUnidadNegocio);
