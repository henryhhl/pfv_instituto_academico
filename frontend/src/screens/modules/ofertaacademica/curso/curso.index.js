
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { CursoActions } from '../../../../redux/actions/ofertaacademica/curso.action';
 
function IndexCurso(props) {
    const navigate = useNavigate();

    React.useEffect( () => {
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onPageCurso();
            }
        } );
        return () => {};
    }, [] );

    const onLogin = () => {
        navigate( '/login' );
    };

    const onCreate = () => {
        navigate('/curso/create');
    };

    const onEdit = (curso) => {
        navigate(`/curso/edit/${curso.idcurso}`);
    };

    const onShow = (curso) => {
        navigate(`/curso/show/${curso.idcurso}`);
    };

    const setPage = (page) => {
        props.onPageCurso(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPageCurso(1, paginate);
    };

    return (
        <>
            <PaperComponent
                title={"Listado Curso"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnCurso}
                        dataSource={props.listCurso}
                        onShow={ ( curso ) => onShow(curso) }
                        onEditar={ ( curso ) => onEdit(curso) }
                        onDelete={ ( curso ) => props.onDelete(curso) }
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
    columnCurso: state.ColumnModule.columnCurso,
    listCurso: state.PaginationModule.listCurso,
    page: state.PaginationModule.pageCurso,
    pagination: state.PaginationModule.paginationCurso,
    paginate: state.PaginationModule.paginateCurso,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPageCurso: CursoActions.onPageCurso,
    onDelete: CursoActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexCurso);
