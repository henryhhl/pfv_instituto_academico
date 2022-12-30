
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { BitacoraActions } from '../../../../redux/actions/seguridad/bitacora.action';
 
function IndexBitacora(props) {
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

    const onShow = (item) => {
        navigate(`/bitacora/show/${item.idbitacora}`);
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
                title={"Listado Bitacora"}
            >
                <CardComponent
                    isSearch
                    onSearch={ setSearch }
                >
                    <TableComponent 
                        columns={props.column}
                        dataSource={props.list}
                        onShow={ ( item ) => onShow(item) }
                        isEdit={false}
                        isDelete={false}
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
    column: state.ColumnModule.columnBitacora,
    list: state.PaginationModule.listBitacora,
    page: state.PaginationModule.pageBitacora,
    pagination: state.PaginationModule.paginationBitacora,
    paginate: state.PaginationModule.paginateBitacora,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPage: BitacoraActions.onPage,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexBitacora);
