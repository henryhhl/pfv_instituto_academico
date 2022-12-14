
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { TipoPermisoActions } from '../../../../redux/actions/seguridad/tipoPermiso.action';
 
function IndexTipoPermiso(props) {
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
        navigate('/tipo_permiso/create');
    };

    const onEdit = (item) => {
        navigate(`/tipo_permiso/edit/${item.idtipopermiso}`);
    };

    const onShow = (item) => {
        navigate(`/tipo_permiso/show/${item.idtipopermiso}`);
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
                title={"Listado Tipo Permiso"}
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
    column: state.ColumnModule.columnTipoPermiso,
    list: state.PaginationModule.listTipoPermiso,
    page: state.PaginationModule.pageTipoPermiso,
    pagination: state.PaginationModule.paginationTipoPermiso,
    paginate: state.PaginationModule.paginateTipoPermiso,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPage: TipoPermisoActions.onPageTipoPermiso,
    onDelete: TipoPermisoActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexTipoPermiso);
