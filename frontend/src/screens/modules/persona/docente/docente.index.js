
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { DocenteActions } from '../../../../redux/actions/persona/docente.action';
 
function IndexDocente(props) {
    const navigate = useNavigate();

    React.useEffect( () => {
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onPageDocente();
            }
        } );
        return () => {};
    }, [] );

    const onLogin = () => {
        navigate( '/login' );
    };

    const onCreate = () => {
        navigate('/docente/create');
    };

    const onEdit = (docente) => {
        navigate(`/docente/edit/${docente.iddocente}`);
    };

    const onShow = (docente) => {
        navigate(`/docente/show/${docente.iddocente}`);
    };

    const setPage = (page) => {
        props.onPageDocente(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPageDocente(1, paginate);
    };

    return (
        <>
            <PaperComponent
                title={"Listado Docente"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnDocente}
                        dataSource={props.listDocente}
                        onShow={ ( docente ) => onShow(docente) }
                        onEditar={ ( docente ) => onEdit(docente) }
                        onDelete={ ( docente ) => props.onDelete(docente) }
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
    columnDocente: state.ColumnModule.columnDocente,
    listDocente: state.PaginationModule.listDocente,
    page: state.PaginationModule.pageDocente,
    pagination: state.PaginationModule.paginationDocente,
    paginate: state.PaginationModule.paginateDocente,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPageDocente: DocenteActions.onPageDocente,
    onDelete: DocenteActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexDocente);
