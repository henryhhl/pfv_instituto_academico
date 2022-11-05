
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
import TableComponent from '../../../../components/table';
import { DocenteActions } from '../../../../redux/actions/persona/docente.action';
 
function IndexDocente(props) {
    const navigate = useNavigate();

    useEffect( () => {
      props.onPageDocente();
      return () => {};
    }, [] );
    

    const onCreate = () => {
        navigate('/docente/create');
    };

    const onEdit = (docente) => {
        navigate(`/docente/edit/${docente.iddocente}`);
    };

    const onShow = (docente) => {
        navigate(`/docente/show/${docente.iddocente}`);
    };

    const setPage = (page) => {
        props.onPageDocente(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPageDocente(1, paginate);
    };

    return (
        <>
            <PaperComponent
                title={"Listado Docente"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnDocente}
                        dataSource={props.listDocente}
                        onShow={ ( docente ) => onShow(docente) }
                        onEditar={ ( docente ) => onEdit(docente) }
                        onDelete={ ( docente ) => props.onDelete(docente) }
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
    columnDocente: state.ColumnModule.columnDocente,
    listDocente: state.PaginationModule.listDocente,
    page: state.PaginationModule.pageDocente,
    pagination: state.PaginationModule.paginationDocente,
    paginate: state.PaginationModule.paginateDocente,
} );

const mapDispatchToProps = {
    onPageDocente: DocenteActions.onPageDocente,
    onDelete: DocenteActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexDocente);
