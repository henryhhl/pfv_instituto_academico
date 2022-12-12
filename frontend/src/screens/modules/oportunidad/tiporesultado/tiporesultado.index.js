
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { TipoResultadoActions } from '../../../../redux/actions/oportunidad/tiporesultado.action';
 
function IndexTipoResultado(props) {
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
        navigate('/tiporesultado/create');
    };

    const onEdit = (item) => {
        navigate(`/tiporesultado/edit/${item.idtiporesultado}`);
    };

    const onShow = (item) => {
        navigate(`/tiporesultado/show/${item.idtiporesultado}`);
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
                title={"Listado Tipo Resultado"}
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
    column: state.ColumnModule.columnTipoResultado,
    list: state.PaginationModule.listTipoResultado,
    page: state.PaginationModule.pageTipoResultado,
    pagination: state.PaginationModule.paginationTipoResultado,
    paginate: state.PaginationModule.paginateTipoResultado,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPage: TipoResultadoActions.onPageTipoResultado,
    onDelete: TipoResultadoActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexTipoResultado);
