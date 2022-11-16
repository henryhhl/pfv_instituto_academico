
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
import TableComponent from '../../../../components/table';
import { EstudianteActions } from '../../../../redux/actions/persona/estudiante.action';
 
function IndexEstudiante(props) {
    const navigate = useNavigate();

    useEffect( () => {
      props.onPageEstudiante();
      return () => {};
    }, [] );
    

    const onCreate = () => {
        navigate('/estudiante/create');
    };

    const onEdit = (estudiante) => {
        navigate(`/estudiante/edit/${estudiante.idestudiante}`);
    };

    const onShow = (estudiante) => {
        navigate(`/estudiante/show/${estudiante.idestudiante}`);
    };

    const setPage = (page) => {
        props.onPageEstudiante(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPageEstudiante(1, paginate);
    };

    return (
        <>
            <PaperComponent
                title={"Listado Estudiante"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnEstudiante}
                        dataSource={props.listEstudiante}
                        onShow={ ( estudiante ) => onShow(estudiante) }
                        onEditar={ ( estudiante ) => onEdit(estudiante) }
                        onDelete={ ( estudiante ) => props.onDelete(estudiante) }
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
    columnEstudiante: state.ColumnModule.columnEstudiante,
    listEstudiante: state.PaginationModule.listEstudiante,
    page: state.PaginationModule.pageEstudiante,
    pagination: state.PaginationModule.paginationEstudiante,
    paginate: state.PaginationModule.paginateEstudiante,
} );

const mapDispatchToProps = {
    onPageEstudiante: EstudianteActions.onPageEstudiante,
    onDelete: EstudianteActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexEstudiante);
