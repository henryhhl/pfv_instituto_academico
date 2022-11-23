
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { TipoRolActions } from '../../../../redux/actions/seguridad/tipoRol.action';
 
function IndexTipoRol(props) {
    const navigate = useNavigate();

    React.useEffect( () => {
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onPageTipoRol();
            }
        } );
        return () => {};
    }, [] );

    const onLogin = () => {
        navigate( '/login' );
    };

    const onCreate = () => {
        navigate('/tipo_rol/create');
    };

    const onEdit = (tipoRol) => {
        navigate(`/tipo_rol/edit/${tipoRol.idtiporol}`);
    };

    const onShow = (tipoRol) => {
        navigate(`/tipo_rol/show/${tipoRol.idtiporol}`);
    };

    const setPage = (page) => {
        props.onPageTipoRol(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPageTipoRol(1, paginate);
    };

    return (
        <>
            <PaperComponent
                title={"Listado Tipo Rol"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnTipoRol}
                        dataSource={props.listTipoRol}
                        onShow={ ( tipoRol ) => onShow(tipoRol) }
                        onEditar={ ( tipoRol ) => onEdit(tipoRol) }
                        onDelete={ ( tipoRol ) => props.onDelete(tipoRol) }
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
    columnTipoRol: state.ColumnModule.columnTipoRol,
    listTipoRol: state.PaginationModule.listTipoRol,
    page: state.PaginationModule.pageTipoRol,
    pagination: state.PaginationModule.paginationTipoRol,
    paginate: state.PaginationModule.paginateTipoRol,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPageTipoRol: TipoRolActions.onPageTipoRol,
    onDelete: TipoRolActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexTipoRol);
