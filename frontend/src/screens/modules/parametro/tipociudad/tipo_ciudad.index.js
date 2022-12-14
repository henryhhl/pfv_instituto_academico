
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { TipoCiudadActions } from '../../../../redux/actions/parametros/tipo_ciudad.action';
 
function IndexTipoCiudad(props) {
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
        navigate('/tipociudad/create');
    };

    const onEdit = (item) => {
        navigate(`/tipociudad/edit/${item.idtipociudad}`);
    };

    const onShow = (item) => {
        navigate(`/tipociudad/show/${item.idtipociudad}`);
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
                title={"Listado Tipo Localidad"}
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
    column: state.ColumnModule.columnTipoCiudad,
    list: state.PaginationModule.listTipoCiudad,
    page: state.PaginationModule.pageTipoCiudad,
    pagination: state.PaginationModule.paginationTipoCiudad,
    paginate: state.PaginationModule.paginateTipoCiudad,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPage: TipoCiudadActions.onPageTipoCiudad,
    onDelete: TipoCiudadActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexTipoCiudad);
