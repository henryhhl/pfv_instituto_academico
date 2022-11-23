
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
                props.onPageGestionPeriodo();
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

    const onEdit = (gestionperiodo) => {
        navigate(`/gestionperiodo/edit/${gestionperiodo.idgestionperiodo}`);
    };

    const onShow = (gestionperiodo) => {
        navigate(`/gestionperiodo/show/${gestionperiodo.idgestionperiodo}`);
    };

    const setPage = (page) => {
        props.onPageGestionPeriodo(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPageGestionPeriodo(1, paginate);
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
                >
                    <TableComponent 
                        columns={props.columnGestionPeriodo}
                        dataSource={props.listGestionPeriodo}
                        onShow={ ( gestionPeriodo ) => onShow(gestionPeriodo) }
                        onEditar={ ( gestionPeriodo ) => onEdit(gestionPeriodo) }
                        onDelete={ ( gestionPeriodo ) => props.onDelete(gestionPeriodo) }
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
    columnGestionPeriodo: state.ColumnModule.columnGestionPeriodo,
    listGestionPeriodo: state.PaginationModule.listGestionPeriodo,
    page: state.PaginationModule.pageGestionPeriodo,
    pagination: state.PaginationModule.paginationGestionPeriodo,
    paginate: state.PaginationModule.paginateGestionPeriodo,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPageGestionPeriodo: GestionPeriodoActions.onPageGestionPeriodo,
    onDelete: GestionPeriodoActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexGestionPeriodo);
