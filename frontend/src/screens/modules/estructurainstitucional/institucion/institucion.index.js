
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
import TableComponent from '../../../../components/table';
import { InstitucionActions } from '../../../../redux/actions/estructurainstitucional/institucion.action';
 
function IndexInstitucion(props) {
    const navigate = useNavigate();

    useEffect( () => {
      props.onPageInstitucion();
      return () => {};
    }, [] );
    

    const onCreate = () => {
        navigate('/institucion/create');
    };

    const onEdit = (institucion) => {
        navigate(`/institucion/edit/${institucion.idinstitucion}`);
    };

    const onShow = (institucion) => {
        navigate(`/institucion/show/${institucion.idinstitucion}`);
    };

    const setPage = (page) => {
        props.onPageInstitucion(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPageInstitucion(1, paginate);
    };

    return (
        <>
            <PaperComponent
                title={"Listado Institución"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnInstitucion}
                        dataSource={props.listInstitucion}
                        onShow={ ( institucion ) => onShow(institucion) }
                        onEditar={ ( institucion ) => onEdit(institucion) }
                        onDelete={ ( institucion ) => props.onDelete(institucion) }
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
    columnInstitucion: state.ColumnModule.columnInstitucion,
    listInstitucion: state.PaginationModule.listInstitucion,
    page: state.PaginationModule.pageInstitucion,
    pagination: state.PaginationModule.paginationInstitucion,
    paginate: state.PaginationModule.paginateInstitucion,
} );

const mapDispatchToProps = {
    onPageInstitucion: InstitucionActions.onPageInstitucion,
    onDelete: InstitucionActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexInstitucion);
