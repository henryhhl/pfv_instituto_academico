
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { TipoMedioPublicitarioActions } from '../../../../redux/actions/oportunidad/tipomediopublicitario.action';
 
function IndexTipoMedioPublicitario(props) {
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
        navigate('/tipomediopublicitario/create');
    };

    const onEdit = (item) => {
        navigate(`/tipomediopublicitario/edit/${item.idtipomediopublicitario}`);
    };

    const onShow = (item) => {
        navigate(`/tipomediopublicitario/show/${item.idtipomediopublicitario}`);
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
                title={"Listado Tipo Medio Publicitario"}
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
    column: state.ColumnModule.columnTipoMedioPublicitario,
    list: state.PaginationModule.listTipoMedioPublicitario,
    page: state.PaginationModule.pageTipoMedioPublicitario,
    pagination: state.PaginationModule.paginationTipoMedioPublicitario,
    paginate: state.PaginationModule.paginateTipoMedioPublicitario,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPage: TipoMedioPublicitarioActions.onPageTipoMedioPublicitario,
    onDelete: TipoMedioPublicitarioActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexTipoMedioPublicitario);
