
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
                props.onPageTipoIdentificacion();
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

    const onEdit = (tipoIdentificacion) => {
        navigate(`/tipoidentificacion/edit/${tipoIdentificacion.idtipoidentificacion}`);
    };

    const onShow = (tipoIdentificacion) => {
        navigate(`/tipoidentificacion/show/${tipoIdentificacion.idtipoidentificacion}`);
    };

    const setPage = (page) => {
        props.onPageTipoIdentificacion(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPageTipoIdentificacion(1, paginate);
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
                >
                    <TableComponent 
                        columns={props.columnTipoIdentificacion}
                        dataSource={props.listTipoIdentificacion}
                        onShow={ ( tipoIdentificacion ) => onShow(tipoIdentificacion) }
                        onEditar={ ( tipoIdentificacion ) => onEdit(tipoIdentificacion) }
                        onDelete={ ( tipoIdentificacion ) => props.onDelete(tipoIdentificacion) }
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
    columnTipoIdentificacion: state.ColumnModule.columnTipoIdentificacion,
    listTipoIdentificacion: state.PaginationModule.listTipoIdentificacion,
    page: state.PaginationModule.pageTipoIdentificacion,
    pagination: state.PaginationModule.paginationTipoIdentificacion,
    paginate: state.PaginationModule.paginateTipoIdentificacion,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPageTipoIdentificacion: TipoIdentificacionActions.onPageTipoIdentificacion,
    onDelete: TipoIdentificacionActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexTipoIdentificacion);
