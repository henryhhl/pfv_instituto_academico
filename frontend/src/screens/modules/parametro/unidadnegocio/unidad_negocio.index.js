
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
                props.onPageUnidadNegocio();
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
    onValidateToken: AuthActions.onValidateToken,
    onPageUnidadNegocio: UnidadNegocioActions.onPageUnidadNegocio,
    onDelete: UnidadNegocioActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexUnidadNegocio);
