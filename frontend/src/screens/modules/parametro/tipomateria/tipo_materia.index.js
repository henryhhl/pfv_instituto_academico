
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { TipoMateriaActions } from '../../../../redux/actions/parametros/tipo_materia.action';
 
function IndexTipoMateria(props) {
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
        navigate('/tipomateria/create');
    };

    const onEdit = (item) => {
        navigate(`/tipomateria/edit/${item.idtipomateria}`);
    };

    const onShow = (item) => {
        navigate(`/tipomateria/show/${item.idtipomateria}`);
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
                title={"Listado Tipo Materia"}
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
    column: state.ColumnModule.columnTipoMateria,
    list: state.PaginationModule.listTipoMateria,
    page: state.PaginationModule.pageTipoMateria,
    pagination: state.PaginationModule.paginationTipoMateria,
    paginate: state.PaginationModule.paginateTipoMateria,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPage: TipoMateriaActions.onPageTipoMateria,
    onDelete: TipoMateriaActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexTipoMateria);
