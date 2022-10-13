
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TipoPermisoActions } from '../../../../redux/actions/seguridad/tipoPermiso.action';
import TableComponent from '../../../../components/table';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
 
function IndexTipoPermiso(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllTipoPermiso();
    //   return () => {};
    }, [])
    

    function onCreate() {
        navigate('/tipo_permiso/create');
    }

    function onEdit(tipoPermiso) {
        navigate(`/tipo_permiso/edit/${tipoPermiso.idtipopermiso}`);
    }

    function onShow(tipoPermiso) {
        navigate(`/tipo_permiso/show/${tipoPermiso.idtipopermiso}`);
    }

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
                    />
                </CardComponent>
            </PaperComponent>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
    columnTipoPermiso: state.ColumnModule.columnTipoPermiso,
    listTipoPermiso: state.ListModule.listTipoPermiso,
} );

const mapDispatchToProps = {
    getAllTipoPermiso: TipoPermisoActions.getAllTipoPermiso,
    onDelete: TipoPermisoActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexTipoPermiso);
