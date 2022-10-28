
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ModalidadAcademicaActions } from '../../../../redux/actions/modalidadAcademicaActions';
import TableComponent from '../../../../components/table';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
 
function IndexModalidadAcademica(props) {
    const navigate = useNavigate();

    useEffect( () => {
      props.onPageModalidadAcademica();
      return () => {};
    }, [] );
    

    const onCreate = () => {
        navigate('/modalidadacademica/create');
    };

    const onEdit = (modalidadAcademica) => {
        navigate(`/modalidadacademica/edit/${modalidadAcademica.idmodalidadacademica}`);
    };

    const onShow = (modalidadAcademica) => {
        navigate(`/modalidadacademica/show/${modalidadAcademica.idmodalidadacademica}`);
    };

    const setPage = (page) => {
        props.onPageModalidadAcademica(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPageModalidadAcademica(1, paginate);
    };

    return (
        <>
            <PaperComponent
                title={"Listado Modalidad Academica"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnModalidadAcademica}
                        dataSource={props.listModalidadAcademica}
                        onShow={ ( modalidadAcademica ) => onShow(modalidadAcademica) }
                        onEditar={ ( modalidadAcademica ) => onEdit(modalidadAcademica) }
                        onDelete={ ( modalidadAcademica ) => props.onDelete(modalidadAcademica) }
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
    columnModalidadAcademica: state.ColumnModule.columnModalidadAcademica,
    listModalidadAcademica: state.PaginationModule.listModalidadAcademica,
    page: state.PaginationModule.pageModalidadAcademica,
    pagination: state.PaginationModule.paginationModalidadAcademica,
    paginate: state.PaginationModule.paginateModalidadAcademica,
} );

const mapDispatchToProps = {
    onPageModalidadAcademica: ModalidadAcademicaActions.onPageModalidadAcademica,
    onDelete: ModalidadAcademicaActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexModalidadAcademica);
