
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaperComponent from '../../../../components/paper';
import { UnidadAcademicaActions } from '../../../../redux/actions/estructuraacademica/unidad_academica.action';
import CardComponent from '../../../../components/card';
import TableComponent from '../../../../components/table';
 
function IndexUnidadAcademica(props) {
    const navigate = useNavigate();

    useEffect( () => {
      props.onPageUnidadAcademica();
      return () => {};
    }, [] );
    

    const onCreate = () => {
        navigate('/unidadacademica/create');
    };

    const onEdit = (unidadAcademica) => {
        navigate(`/unidadacademica/edit/${unidadAcademica.idunidadacademica}`);
    };

    const onShow = (unidadAcademica) => {
        navigate(`/unidadacademica/show/${unidadAcademica.idunidadacademica}`);
    };

    const setPage = (page) => {
        props.onPageUnidadAcademica(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPageUnidadAcademica(1, paginate);
    };

    return (
        <>
            <PaperComponent
                title={"Listado Unidad Academica"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnUnidadAcademica}
                        dataSource={props.listUnidadAcademica}
                        onShow={ ( unidadAcademica ) => onShow(unidadAcademica) }
                        onEditar={ ( unidadAcademica ) => onEdit(unidadAcademica) }
                        onDelete={ ( unidadAcademica ) => props.onDelete(unidadAcademica) }
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
    columnUnidadAcademica: state.ColumnModule.columnUnidadAcademica,
    listUnidadAcademica: state.PaginationModule.listUnidadAcademica,
    page: state.PaginationModule.pageUnidadAcademica,
    pagination: state.PaginationModule.paginationUnidadAcademica,
    paginate: state.PaginationModule.paginateUnidadAcademica,
} );

const mapDispatchToProps = {
    onPageUnidadAcademica: UnidadAcademicaActions.onPageUnidadAcademica,
    onDelete: UnidadAcademicaActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexUnidadAcademica);
