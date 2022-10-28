
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UnidadNegocioActions } from '../../../../redux/actions/unidadNegocioActions';
import TableComponent from '../../../../components/table';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
 
function IndexUnidadNegocio(props) {
    const navigate = useNavigate();

    useEffect( () => {
      props.onPageUnidadNegocio();
      return () => {};
    }, [] );
    

    const onCreate = () => {
        navigate('/unidadnegocio/create');
    };

    const onEdit = (unidadNegocio) => {
        navigate(`/unidadnegocio/edit/${unidadNegocio.idunidadnegocio}`);
    };

    const onShow = (unidadNegocio) => {
        navigate(`/unidadnegocio/show/${unidadNegocio.idunidadnegocio}`);
    };

    const setPage = (page) => {
        props.onPageUnidadNegocio(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPageUnidadNegocio(1, paginate);
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
                >
                    <TableComponent 
                        columns={props.columnUnidadNegocio}
                        dataSource={props.listUnidadNegocio}
                        onShow={ ( unidadNegocio ) => onShow(unidadNegocio) }
                        onEditar={ ( unidadNegocio ) => onEdit(unidadNegocio) }
                        onDelete={ ( unidadNegocio ) => props.onDelete(unidadNegocio) }
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
    columnUnidadNegocio: state.ColumnModule.columnUnidadNegocio,
    listUnidadNegocio: state.PaginationModule.listUnidadNegocio,
    page: state.PaginationModule.pageUnidadNegocio,
    pagination: state.PaginationModule.paginationUnidadNegocio,
    paginate: state.PaginationModule.paginateUnidadNegocio,
} );

const mapDispatchToProps = {
    onPageUnidadNegocio: UnidadNegocioActions.onPageUnidadNegocio,
    onDelete: UnidadNegocioActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexUnidadNegocio);
