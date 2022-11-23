
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
                props.onPageTipoMateria();
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

    const onEdit = (tipoMateria) => {
        navigate(`/tipomateria/edit/${tipoMateria.idtipomateria}`);
    };

    const onShow = (tipoMateria) => {
        navigate(`/tipomateria/show/${tipoMateria.idtipomateria}`);
    };

    const setPage = (page) => {
        props.onPageTipoMateria(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPageTipoMateria(1, paginate);
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
                >
                    <TableComponent 
                        columns={props.columnTipoMateria}
                        dataSource={props.listTipoMateria}
                        onShow={ ( tipoMateria ) => onShow(tipoMateria) }
                        onEditar={ ( tipoMateria ) => onEdit(tipoMateria) }
                        onDelete={ ( tipoMateria ) => props.onDelete(tipoMateria) }
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
    columnTipoMateria: state.ColumnModule.columnTipoMateria,
    listTipoMateria: state.PaginationModule.listTipoMateria,
    page: state.PaginationModule.pageTipoMateria,
    pagination: state.PaginationModule.paginationTipoMateria,
    paginate: state.PaginationModule.paginateTipoMateria,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPageTipoMateria: TipoMateriaActions.onPageTipoMateria,
    onDelete: TipoMateriaActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexTipoMateria);
