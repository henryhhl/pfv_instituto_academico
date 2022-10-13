
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UsuarioActions } from '../../../../redux/actions/seguridad/usuario.action';
import TableComponent from '../../../../components/table';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
 
function IndexUsuario(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllUsuario();
      return () => {};
    }, [])
    

    function onCreate() {
        navigate('/usuario/create');
    }

    function onEdit(usuario) {
        navigate(`/usuario/edit/${usuario.idusuario}`);
    }

    function onShow(usuario) {
        navigate(`/usuario/show/${usuario.idusuario}`);
    }

    return (
        <>
            <PaperComponent
                title={"Listado Usuario"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnUsuario}
                        dataSource={props.listUsuario}
                        onShow={ ( usuario ) => onShow(usuario) }
                        onEditar={ ( usuario ) => onEdit(usuario) }
                        onDelete={ ( usuario ) => props.onDelete(usuario) }
                    />
                </CardComponent>
            </PaperComponent>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
    columnUsuario: state.ColumnModule.columnUsuario,
    listUsuario: state.ListModule.listUsuario,
} );

const mapDispatchToProps = {
    getAllUsuario: UsuarioActions.getAllUsuario,
    onDelete: UsuarioActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexUsuario);
