
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import TableComponent from '../../../../components/table';
import PaperComponent from '../../../../components/paper';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { ModalidadAcademicaActions } from '../../../../redux/actions/parametros/modalidad_academica.action';
 
function IndexModalidadAcademica(props) {
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
        navigate('/modalidadacademica/create');
    };

    const onEdit = (item) => {
        navigate(`/modalidadacademica/edit/${item.idmodalidadacademica}`);
    };

    const onShow = (item) => {
        navigate(`/modalidadacademica/show/${item.idmodalidadacademica}`);
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
                title={"Listado Modalidad Academica"}
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
    column: state.ColumnModule.columnModalidadAcademica,
    list: state.PaginationModule.listModalidadAcademica,
    page: state.PaginationModule.pageModalidadAcademica,
    pagination: state.PaginationModule.paginationModalidadAcademica,
    paginate: state.PaginationModule.paginateModalidadAcademica,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPage: ModalidadAcademicaActions.onPageModalidadAcademica,
    onDelete: ModalidadAcademicaActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexModalidadAcademica);
