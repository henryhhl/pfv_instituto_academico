
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UsuarioActions } from '../../../../redux/actions/seguridad/usuario.action';
import TableComponent from '../../../../components/table';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
 
function IndexUsuario(props) {
    const navigate = useNavigate();

    useEffect( () => {
      props.onPageUsuario();
      return () => {};
    }, [] );
    

    const onCreate = () => {
        navigate('/usuario/create');
    };

    const onEdit = (usuario) => {
        navigate(`/usuario/edit/${usuario.idusuario}`);
    };

    const onShow = (usuario) => {
        navigate(`/usuario/show/${usuario.idusuario}`);
    };

    const setPage = (page) => {
        props.onPageUsuario(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPageUsuario(1, paginate);
    };

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
    columnUsuario: state.ColumnModule.columnUsuario,
    listUsuario: state.PaginationModule.listUsuario,
    page: state.PaginationModule.pageUsuario,
    pagination: state.PaginationModule.paginationUsuario,
    paginate: state.PaginationModule.paginateUsuario,
} );

const mapDispatchToProps = {
    onPageUsuario: UsuarioActions.onPageUsuario,
    onDelete: UsuarioActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexUsuario);
