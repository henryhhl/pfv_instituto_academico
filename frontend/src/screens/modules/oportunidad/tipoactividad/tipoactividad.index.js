
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { TipoActividadActions } from '../../../../redux/actions/oportunidad/tipoactividad.action';
 
function IndexTipoActividad(props) {
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
        navigate('/tipoactividad/create');
    };

    const onEdit = (item) => {
        navigate(`/tipoactividad/edit/${item.idtipoactividad}`);
    };

    const onShow = (item) => {
        navigate(`/tipoactividad/show/${item.idtipoactividad}`);
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
                title={"Listado Tipo Actividad"}
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
    column: state.ColumnModule.columnTipoActividad,
    list: state.PaginationModule.listTipoActividad,
    page: state.PaginationModule.pageTipoActividad,
    pagination: state.PaginationModule.paginationTipoActividad,
    paginate: state.PaginationModule.paginateTipoActividad,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPage: TipoActividadActions.onPageTipoActividad,
    onDelete: TipoActividadActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexTipoActividad);
