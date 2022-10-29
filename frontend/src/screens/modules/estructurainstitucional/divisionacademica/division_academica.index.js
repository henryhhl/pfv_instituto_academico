
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
import TableComponent from '../../../../components/table';
import { DivisionAcademicaActions } from '../../../../redux/actions/estructurainstitucional/division_academica.action';
 
function IndexDivisionAcademica(props) {
    const navigate = useNavigate();

    useEffect( () => {
      props.onPageDivisionAcademica();
      return () => {};
    }, [] );
    

    const onCreate = () => {
        navigate('/divisionacademica/create');
    };

    const onEdit = (divisionacademica) => {
        navigate(`/divisionacademica/edit/${divisionacademica.iddivisionacademica}`);
    };

    const onShow = (divisionacademica) => {
        navigate(`/divisionacademica/show/${divisionacademica.iddivisionacademica}`);
    };

    const setPage = (page) => {
        props.onPageDivisionAcademica(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPageDivisionAcademica(1, paginate);
    };

    return (
        <>
            <PaperComponent
                title={"Listado Division Academica"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnDivisionAcademica}
                        dataSource={props.listDivisionAcademica}
                        onShow={ ( divisionAcademica ) => onShow(divisionAcademica) }
                        onEditar={ ( divisionAcademica ) => onEdit(divisionAcademica) }
                        onDelete={ ( divisionAcademica ) => props.onDelete(divisionAcademica) }
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
    columnDivisionAcademica: state.ColumnModule.columnDivisionAcademica,
    listDivisionAcademica: state.PaginationModule.listDivisionAcademica,
    page: state.PaginationModule.pageDivisionAcademica,
    pagination: state.PaginationModule.paginationDivisionAcademica,
    paginate: state.PaginationModule.paginateDivisionAcademica,
} );

const mapDispatchToProps = {
    onPageDivisionAcademica: DivisionAcademicaActions.onPageDivisionAcademica,
    onDelete: DivisionAcademicaActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexDivisionAcademica);
