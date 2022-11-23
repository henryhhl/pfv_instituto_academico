
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import TableComponent from '../../../../components/table';
import PaperComponent from '../../../../components/paper';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { UnidadAdministrativaActions } from '../../../../redux/actions/estructuraacademica/unidad_administrativa.action';
 
function IndexUnidadAdministrativa(props) {
    const navigate = useNavigate();

    React.useEffect( () => {
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onPageUnidadAdministrativa();
            }
        } );
        return () => {};
    }, [] );

    const onLogin = () => {
        navigate( '/login' );
    };

    const onCreate = () => {
        navigate('/unidadadministrativa/create');
    }

    const onEdit = (unidadAdministrativa) => {
        navigate(`/unidadadministrativa/edit/${unidadAdministrativa.idunidadadministrativa}`);
    }

    const onShow = (unidadAdministrativa) => {
        navigate(`/unidadadministrativa/show/${unidadAdministrativa.idunidadadministrativa}`);
    }

    const setPage = (page) => {
        props.onPageUnidadAdministrativa(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPageUnidadAdministrativa(1, paginate);
    };

    return (
        <>
            <PaperComponent
                title={"Listado Unidad Administrativa"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnUnidadAdministrativa}
                        dataSource={props.listUnidadAdministrativa}
                        onShow={ ( unidadAdministrativa ) => onShow(unidadAdministrativa) }
                        onEditar={ ( unidadAdministrativa ) => onEdit(unidadAdministrativa) }
                        onDelete={ ( unidadAdministrativa ) => props.onDelete(unidadAdministrativa) }
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
    columnUnidadAdministrativa: state.ColumnModule.columnUnidadAdministrativa,
    listUnidadAdministrativa: state.PaginationModule.listUnidadAdministrativa,
    page: state.PaginationModule.pageUnidadAdministrativa,
    pagination: state.PaginationModule.paginationUnidadAdministrativa,
    paginate: state.PaginationModule.paginateUnidadAdministrativa,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPageUnidadAdministrativa: UnidadAdministrativaActions.onPageUnidadAdministrativa,
    onDelete: UnidadAdministrativaActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexUnidadAdministrativa);
