
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
      props.onPageRol();
      return () => {};
    }, [])
    

    const onCreate = () => {
        navigate('/rol/create');
    }

    const onEdit = (rol) => {
        navigate(`/rol/edit/${rol.idrol}`);
    }

    const onShow = (rol) => {
        navigate(`/rol/show/${rol.idrol}`);
    }

    const setPage = (page) => {
        props.onPageRol(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPageRol(1, paginate);
    };

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
    columnRol: state.ColumnModule.columnRol,
    listRol: state.PaginationModule.listRol,
    page: state.PaginationModule.pageRol,
    pagination: state.PaginationModule.paginationRol,
    paginate: state.PaginationModule.paginateRol,
} );

const mapDispatchToProps = {
    onPageRol: RolActions.onPageRol,
    onDelete: RolActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexRol);
