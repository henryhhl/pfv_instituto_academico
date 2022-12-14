
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { AsesorResponsableActions } from '../../../../redux/actions/oportunidad/asesorresponsable.action';
 
function IndexAsesorResponsable(props) {
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
        navigate('/asesorresponsable/create');
    };

    const onEdit = (item) => {
        navigate(`/asesorresponsable/edit/${item.idasesorresponsable}`);
    };

    const onShow = (item) => {
        navigate(`/asesorresponsable/show/${item.idasesorresponsable}`);
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
                title={"Listado Asesor Administrativo"}
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
    column: state.ColumnModule.columnAsesorResponsable,
    list: state.PaginationModule.listAsesorResponsable,
    page: state.PaginationModule.pageAsesorResponsable,
    pagination: state.PaginationModule.paginationAsesorResponsable,
    paginate: state.PaginationModule.paginateAsesorResponsable,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPage: AsesorResponsableActions.onPageAsesorResponsable,
    onDelete: AsesorResponsableActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexAsesorResponsable);
