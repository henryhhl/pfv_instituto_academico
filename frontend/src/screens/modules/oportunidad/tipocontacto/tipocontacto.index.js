
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { TipoContactoActions } from '../../../../redux/actions/oportunidad/tipocontacto.action';
 
function IndexTipoContacto(props) {
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
        navigate('/tipocontacto/create');
    }

    const onEdit = (tipoContacto) => {
        navigate(`/tipocontacto/edit/${tipoContacto.idtipocontacto}`);
    }

    const onShow = (tipoContacto) => {
        navigate(`/tipocontacto/show/${tipoContacto.idtipocontacto}`);
    }

    const setPage = (page) => {
        props.onPage(page + 1, props.paginate);
    }

    const setPaginate = (paginate) => {
        props.onPage(1, paginate);
    }

    return (
        <>
            <PaperComponent
                title={"Listado Tipo Contacto"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
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
    column: state.ColumnModule.columnTipoContacto,
    list: state.PaginationModule.listTipoContacto,
    page: state.PaginationModule.pageTipoContacto,
    pagination: state.PaginationModule.paginationTipoContacto,
    paginate: state.PaginationModule.paginateTipoContacto,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPage: TipoContactoActions.onPageTipoContacto,
    onDelete: TipoContactoActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexTipoContacto);
