
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RolActions } from '../../../../redux/actions/seguridad/rol.action';
import TableComponent from '../../../../components/table';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
 
function IndexRol(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllRol();
      return () => {};
    }, [])
    

    function onCreate() {
        navigate('/rol/create');
    }

    function onEdit(rol) {
        navigate(`/rol/edit/${rol.idrol}`);
    }

    function onShow(rol) {
        navigate(`/rol/show/${rol.idrol}`);
    }

    return (
        <>
            <PaperComponent
                title={"Listado Rol"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnRol}
                        dataSource={props.listRol}
                        onShow={ ( rol ) => onShow(rol) }
                        onEditar={ ( rol ) => onEdit(rol) }
                        onDelete={ ( rol ) => props.onDelete(rol) }
                    />
                </CardComponent>
            </PaperComponent>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
    columnRol: state.ColumnModule.columnRol,
    listRol: state.ListModule.listRol,
} );

const mapDispatchToProps = {
    getAllRol: RolActions.getAllRol,
    onDelete: RolActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexRol);
