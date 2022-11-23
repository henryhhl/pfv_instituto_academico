
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import TableComponent from '../../../../components/table';
import PaperComponent from '../../../../components/paper';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { ProgramaActions } from '../../../../redux/actions/estructuraacademica/programa.action';
 
function IndexPrograma(props) {
    const navigate = useNavigate();

    React.useEffect( () => {
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onPagePrograma();
            }
        } );
        return () => {};
    }, [] );

    const onLogin = () => {
        navigate( '/login' );
    };

    const onCreate = () => {
        navigate('/programa/create');
    };

    const onEdit = (programa) => {
        navigate(`/programa/edit/${programa.idprograma}`);
    };

    const onShow = (programa) => {
        navigate(`/programa/show/${programa.idprograma}`);
    };

    const setPage = (page) => {
        props.onPagePrograma(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPagePrograma(1, paginate);
    };

    return (
        <>
            <PaperComponent
                title={"Listado de Programa"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnPrograma}
                        dataSource={props.listPrograma}
                        onShow={ ( programa ) => onShow(programa) }
                        onEditar={ ( programa ) => onEdit(programa) }
                        onDelete={ ( programa ) => props.onDelete(programa) }
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
    columnPrograma: state.ColumnModule.columnPrograma,
    listPrograma: state.PaginationModule.listPrograma,
    page: state.PaginationModule.pagePrograma,
    pagination: state.PaginationModule.paginationPrograma,
    paginate: state.PaginationModule.paginatePrograma,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPagePrograma: ProgramaActions.onPagePrograma,
    onDelete: ProgramaActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexPrograma);
