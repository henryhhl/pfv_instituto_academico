
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { UnidadAcademicaActions } from '../../../../redux/actions/estructuraacademica/unidad_academica.action';
 
function IndexUnidadAcademica(props) {
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
        navigate('/unidadacademica/create');
    };

    const onEdit = (item) => {
        navigate(`/unidadacademica/edit/${item.idunidadacademica}`);
    };

    const onShow = (item) => {
        navigate(`/unidadacademica/show/${item.idunidadacademica}`);
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
                title={"Listado Unidad Academica"}
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
    column: state.ColumnModule.columnUnidadAcademica,
    list: state.PaginationModule.listUnidadAcademica,
    page: state.PaginationModule.pageUnidadAcademica,
    pagination: state.PaginationModule.paginationUnidadAcademica,
    paginate: state.PaginationModule.paginateUnidadAcademica,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPage: UnidadAcademicaActions.onPageUnidadAcademica,
    onDelete: UnidadAcademicaActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexUnidadAcademica);
