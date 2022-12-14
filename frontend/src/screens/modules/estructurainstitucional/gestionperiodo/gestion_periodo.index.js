
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { GestionPeriodoActions } from '../../../../redux/actions/estructurainstitucional/gestion_periodo.action';
 
function IndexGestionPeriodo(props) {
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
        navigate('/gestionperiodo/create');
    };

    const onEdit = (item) => {
        navigate(`/gestionperiodo/edit/${item.idgestionperiodo}`);
    };

    const onShow = (item) => {
        navigate(`/gestionperiodo/show/${item.idgestionperiodo}`);
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
                title={"Listado Gestión Periodo"}
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
    column: state.ColumnModule.columnGestionPeriodo,
    list: state.PaginationModule.listGestionPeriodo,
    page: state.PaginationModule.pageGestionPeriodo,
    pagination: state.PaginationModule.paginationGestionPeriodo,
    paginate: state.PaginationModule.paginateGestionPeriodo,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPage: GestionPeriodoActions.onPageGestionPeriodo,
    onDelete: GestionPeriodoActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexGestionPeriodo);
