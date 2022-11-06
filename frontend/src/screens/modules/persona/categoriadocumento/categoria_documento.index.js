
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
import TableComponent from '../../../../components/table';
import { CategoriaDocumentoActions } from '../../../../redux/actions/persona/categoria_documento.action';
 
function IndexCategoriaDocumento(props) {
    const navigate = useNavigate();

    useEffect( () => {
      props.onPageCategoriaDocumento();
      return () => {};
    }, [] );
    

    const onCreate = () => {
        navigate('/categoriadocumento/create');
    };

    const onEdit = (categoriaDocumento) => {
        navigate(`/categoriadocumento/edit/${categoriaDocumento.idcategoriadocumento}`);
    };

    const onShow = (categoriaDocumento) => {
        navigate(`/categoriadocumento/show/${categoriaDocumento.idcategoriadocumento}`);
    };

    const setPage = (page) => {
        props.onPageCategoriaDocumento(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPageCategoriaDocumento(1, paginate);
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
                >
                    <TableComponent 
                        columns={props.columnCategoriaDocumento}
                        dataSource={props.listCategoriaDocumento}
                        onShow={ ( categoriaDocumento ) => onShow(categoriaDocumento) }
                        onEditar={ ( categoriaDocumento ) => onEdit(categoriaDocumento) }
                        onDelete={ ( categoriaDocumento ) => props.onDelete(categoriaDocumento) }
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
    columnCategoriaDocumento: state.ColumnModule.columnCategoriaDocumento,
    listCategoriaDocumento: state.PaginationModule.listCategoriaDocumento,
    page: state.PaginationModule.pageCategoriaDocumento,
    pagination: state.PaginationModule.paginationCategoriaDocumento,
    paginate: state.PaginationModule.paginateCategoriaDocumento,
} );

const mapDispatchToProps = {
    onPageCategoriaDocumento: CategoriaDocumentoActions.onPageCategoriaDocumento,
    onDelete: CategoriaDocumentoActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexCategoriaDocumento);
