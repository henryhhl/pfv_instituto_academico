
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { GrupoActions } from '../../../../redux/actions/ofertaacademica/grupo.action';
 
function IndexGrupo(props) {
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
        navigate('/grupo/create');
    };

    const onEdit = (grupo) => {
        navigate(`/grupo/edit/${grupo.idgrupo}`);
    };

    const onShow = (grupo) => {
        navigate(`/grupo/show/${grupo.idgrupo}`);
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
                title={"Listado Grupo"}
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
                        onShow={ ( grupo ) => onShow(grupo) }
                        onEditar={ ( grupo ) => onEdit(grupo) }
                        onDelete={ ( grupo ) => props.onDelete(grupo) }
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
    column: state.ColumnModule.columnGrupo,
    list: state.PaginationModule.listGrupo,
    page: state.PaginationModule.pageGrupo,
    pagination: state.PaginationModule.paginationGrupo,
    paginate: state.PaginationModule.paginateGrupo,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPage: GrupoActions.onPageGrupo,
    onDelete: GrupoActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexGrupo);
