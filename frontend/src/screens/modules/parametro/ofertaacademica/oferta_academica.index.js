
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { OfertaAcademicaActions } from '../../../../redux/actions/parametros/oferta_academica.action';
 
function IndexOfertaAcademica(props) {
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
        navigate('/ofertaacademica/create');
    };

    const onEdit = (item) => {
        navigate(`/ofertaacademica/edit/${item.idofertaacademica}`);
    };

    const onShow = (item) => {
        navigate(`/ofertaacademica/show/${item.idofertaacademica}`);
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
                title={"Listado Oferta Academica"}
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
    column: state.ColumnModule.columnOfertaAcademica,
    list: state.PaginationModule.listOfertaAcademica,
    page: state.PaginationModule.pageOfertaAcademica,
    pagination: state.PaginationModule.paginationOfertaAcademica,
    paginate: state.PaginationModule.paginateOfertaAcademica,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPage: OfertaAcademicaActions.onPageOfertaAcademica,
    onDelete: OfertaAcademicaActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexOfertaAcademica);
