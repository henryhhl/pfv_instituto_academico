
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { DivisionAcademicaActions } from '../../../../redux/actions/estructurainstitucional/division_academica.action';
 
function IndexDivisionAcademica(props) {
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
        navigate('/divisionacademica/create');
    };

    const onEdit = (item) => {
        navigate(`/divisionacademica/edit/${item.iddivisionacademica}`);
    };

    const onShow = (item) => {
        navigate(`/divisionacademica/show/${item.iddivisionacademica}`);
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
                title={"Listado Division Academica"}
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
    column: state.ColumnModule.columnDivisionAcademica,
    list: state.PaginationModule.listDivisionAcademica,
    page: state.PaginationModule.pageDivisionAcademica,
    pagination: state.PaginationModule.paginationDivisionAcademica,
    paginate: state.PaginationModule.paginateDivisionAcademica,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPage: DivisionAcademicaActions.onPageDivisionAcademica,
    onDelete: DivisionAcademicaActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexDivisionAcademica);
