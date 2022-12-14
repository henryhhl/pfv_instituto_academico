
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { CategoriaDocumentoActions } from '../../../../redux/actions/persona/categoria_documento.action';
 
function IndexCategoriaDocumento(props) {
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
        navigate('/categoriadocumento/create');
    };

    const onEdit = (item) => {
        navigate(`/categoriadocumento/edit/${item.idcategoriadocumento}`);
    };

    const onShow = (item) => {
        navigate(`/categoriadocumento/show/${item.idcategoriadocumento}`);
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
                title={"Listado Categoria Documento"}
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
    column: state.ColumnModule.columnCategoriaDocumento,
    list: state.PaginationModule.listCategoriaDocumento,
    page: state.PaginationModule.pageCategoriaDocumento,
    pagination: state.PaginationModule.paginationCategoriaDocumento,
    paginate: state.PaginationModule.paginateCategoriaDocumento,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPage: CategoriaDocumentoActions.onPageCategoriaDocumento,
    onDelete: CategoriaDocumentoActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexCategoriaDocumento);
