
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { TipoRolActions } from '../../../../redux/actions/seguridad/tipoRol.action';
import TableComponent from '../../../../components/table';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
 
function IndexTipoRol(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllTipoRol();
      return () => {};
    }, [])
    

    function onCreate() {
        navigate('/tipo_rol/create');
    }

    function onEdit(tipoRol) {
        navigate(`/tipo_rol/edit/${tipoRol.idtiporol}`);
    }

    function onShow(tipoRol) {
        navigate(`/tipo_rol/show/${tipoRol.idtiporol}`);
    }

    return (
        <>
            <PaperComponent
                title={"Listado Tipo Rol"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnTipoRol}
                        dataSource={props.listTipoRol}
                        onShow={ ( tipoRol ) => onShow(tipoRol) }
                        onEditar={ ( tipoRol ) => onEdit(tipoRol) }
                        onDelete={ ( tipoRol ) => props.onDelete(tipoRol) }
                    />
                </CardComponent>
            </PaperComponent>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
    columnTipoRol: state.ColumnModule.columnTipoRol,
    listTipoRol: state.ListModule.listTipoRol,
} );

const mapDispatchToProps = {
    getAllTipoRol: TipoRolActions.getAllTipoRol,
    onDelete: TipoRolActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexTipoRol);
