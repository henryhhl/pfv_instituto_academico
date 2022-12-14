
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { TipoIdentificacionActions } from '../../../../redux/actions/persona/tipo_identificacion.action';
 
function IndexTipoIdentificacion(props) {
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
        navigate('/tipoidentificacion/create');
    };

    const onEdit = (item) => {
        navigate(`/tipoidentificacion/edit/${item.idtipoidentificacion}`);
    };

    const onShow = (item) => {
        navigate(`/tipoidentificacion/show/${item.idtipoidentificacion}`);
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
                title={"Listado Tipo Identificación"}
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
    column: state.ColumnModule.columnTipoIdentificacion,
    list: state.PaginationModule.listTipoIdentificacion,
    page: state.PaginationModule.pageTipoIdentificacion,
    pagination: state.PaginationModule.paginationTipoIdentificacion,
    paginate: state.PaginationModule.paginateTipoIdentificacion,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPage: TipoIdentificacionActions.onPageTipoIdentificacion,
    onDelete: TipoIdentificacionActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexTipoIdentificacion);
