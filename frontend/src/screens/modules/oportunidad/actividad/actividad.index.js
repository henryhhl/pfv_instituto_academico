
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { ActividadActions } from '../../../../redux/actions/oportunidad/actividad.action';
 
function IndexActividad(props) {
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
        navigate('/actividad/create');
    };

    const onEdit = (item) => {
        navigate(`/actividad/edit/${item.idactividad}`);
    };

    const onShow = (item) => {
        navigate(`/actividad/show/${item.idactividad}`);
    };

    const setPage = (page) => {
        props.onPage(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPage(1, paginate);
    };

    return (
        <>
            <PaperComponent
                title={"Listado Actividad"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
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
    column: state.ColumnModule.columnActividad,
    list: state.PaginationModule.listActividad,
    page: state.PaginationModule.pageActividad,
    pagination: state.PaginationModule.paginationActividad,
    paginate: state.PaginationModule.paginateActividad,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPage: ActividadActions.onPageActividad,
    onDelete: ActividadActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexActividad);
