
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { CargoActions } from '../../../../redux/actions/persona/cargo.action';
 
function IndexCargo(props) {
    const navigate = useNavigate();

    React.useEffect( () => {
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onPageCargo();
            }
        } );
        return () => {};
    }, [] );

    const onLogin = () => {
        navigate( '/login' );
    };

    const onCreate = () => {
        navigate('/cargo/create');
    };

    const onEdit = (cargo) => {
        navigate(`/cargo/edit/${cargo.idcargo}`);
    };

    const onShow = (cargo) => {
        navigate(`/cargo/show/${cargo.idcargo}`);
    };

    const setPage = (page) => {
        props.onPageCargo(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPageCargo(1, paginate);
    };

    return (
        <>
            <PaperComponent
                title={"Listado Cargo"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnCargo}
                        dataSource={props.listCargo}
                        onShow={ ( cargo ) => onShow(cargo) }
                        onEditar={ ( cargo ) => onEdit(cargo) }
                        onDelete={ ( cargo ) => props.onDelete(cargo) }
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
    columnCargo: state.ColumnModule.columnCargo,
    listCargo: state.PaginationModule.listCargo,
    page: state.PaginationModule.pageCargo,
    pagination: state.PaginationModule.paginationCargo,
    paginate: state.PaginationModule.paginateCargo,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPageCargo: CargoActions.onPageCargo,
    onDelete: CargoActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexCargo);
