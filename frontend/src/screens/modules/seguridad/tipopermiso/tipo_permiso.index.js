
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TipoPermisoActions } from '../../../../redux/actions/seguridad/tipoPermiso.action';
import TableComponent from '../../../../components/table';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
 
function IndexTipoPermiso(props) {
    const navigate = useNavigate();

    useEffect( () => {
      props.onPageTipoPermiso();
      return () => {};
    }, [] );
    

    const onCreate = () => {
        navigate('/tipo_permiso/create');
    };

    const onEdit = (tipoPermiso) => {
        navigate(`/tipo_permiso/edit/${tipoPermiso.idtipopermiso}`);
    };

    const onShow = (tipoPermiso) => {
        navigate(`/tipo_permiso/show/${tipoPermiso.idtipopermiso}`);
    };

    const setPage = (page) => {
        props.onPageTipoPermiso(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPageTipoPermiso(1, paginate);
    };

    return (
        <>
            <PaperComponent
                title={"Listado Tipo Permiso"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnTipoPermiso}
                        dataSource={props.listTipoPermiso}
                        onShow={ ( tipoPermiso ) => onShow(tipoPermiso) }
                        onEditar={ ( tipoPermiso ) => onEdit(tipoPermiso) }
                        onDelete={ ( tipoPermiso ) => props.onDelete(tipoPermiso) }
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
    columnTipoPermiso: state.ColumnModule.columnTipoPermiso,
    listTipoPermiso: state.PaginationModule.listTipoPermiso,
    page: state.PaginationModule.pageTipoPermiso,
    pagination: state.PaginationModule.paginationTipoPermiso,
    paginate: state.PaginationModule.paginateTipoPermiso,
} );

const mapDispatchToProps = {
    onPageTipoPermiso: TipoPermisoActions.onPageTipoPermiso,
    onDelete: TipoPermisoActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexTipoPermiso);
