
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import TableComponent from '../../../../components/table';
import PaperComponent from '../../../../components/paper';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { UnidadAdministrativaActions } from '../../../../redux/actions/estructuraacademica/unidad_administrativa.action';
 
function IndexUnidadAdministrativa(props) {
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
        navigate('/unidadadministrativa/create');
    }

    const onEdit = (item) => {
        navigate(`/unidadadministrativa/edit/${item.idunidadadministrativa}`);
    }

    const onShow = (item) => {
        navigate(`/unidadadministrativa/show/${item.idunidadadministrativa}`);
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
                title={"Listado Unidad Administrativa"}
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
    column: state.ColumnModule.columnUnidadAdministrativa,
    list: state.PaginationModule.listUnidadAdministrativa,
    page: state.PaginationModule.pageUnidadAdministrativa,
    pagination: state.PaginationModule.paginationUnidadAdministrativa,
    paginate: state.PaginationModule.paginateUnidadAdministrativa,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPage: UnidadAdministrativaActions.onPageUnidadAdministrativa,
    onDelete: UnidadAdministrativaActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexUnidadAdministrativa);
