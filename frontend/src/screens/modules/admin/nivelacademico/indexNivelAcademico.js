
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NivelAcademicoActions } from '../../../../redux/actions/nivelAcademicoActions';
import TableComponent from '../../../../components/table';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
 
function IndexNivelAcademico(props) {
    const navigate = useNavigate();

    useEffect( () => {
      props.onPageNivelAcademico();
      return () => {};
    }, [] );
    

    const onCreate = () => {
        navigate('/nivelacademico/create');
    };

    const onEdit = (nivelAcademico) => {
        navigate(`/nivelacademico/edit/${nivelAcademico.idnivelacademico}`);
    };

    const onShow = (nivelAcademico) => {
        navigate(`/nivelacademico/show/${nivelAcademico.idnivelacademico}`);
    };

    const setPage = (page) => {
        props.onPageNivelAcademico(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPageNivelAcademico(1, paginate);
    };

    return (
        <>
            <PaperComponent
                title={"Listado Nivel Academico"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnNivelAcademico}
                        dataSource={props.listNivelAcademico}
                        onShow={ ( nivelAcademico ) => onShow(nivelAcademico) }
                        onEditar={ ( nivelAcademico ) => onEdit(nivelAcademico) }
                        onDelete={ ( nivelAcademico ) => props.onDelete(nivelAcademico) }
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
    columnNivelAcademico: state.ColumnModule.columnNivelAcademico,
    listNivelAcademico: state.PaginationModule.listNivelAcademico,
    page: state.PaginationModule.pageNivelAcademico,
    pagination: state.PaginationModule.paginationNivelAcademico,
    paginate: state.PaginationModule.paginateNivelAcademico,
} );

const mapDispatchToProps = {
    onPageNivelAcademico: NivelAcademicoActions.onPageNivelAcademico,
    onDelete: NivelAcademicoActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexNivelAcademico);
