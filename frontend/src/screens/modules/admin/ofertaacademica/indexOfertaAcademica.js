
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { OfertaAcademicaActions } from '../../../../redux/actions/ofertaAcademicaActions';
import TableComponent from '../../../../components/table';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
 
function IndexOfertaAcademica(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.onPageOfertaAcademica();
      return () => {};
    }, [])
    

    const onCreate = () => {
        navigate('/ofertaacademica/create');
    };

    const onEdit = (ofertaAcademica) => {
        navigate(`/ofertaacademica/edit/${ofertaAcademica.idofertaacademica}`);
    };

    const onShow = (ofertaAcademica) => {
        navigate(`/ofertaacademica/show/${ofertaAcademica.idofertaacademica}`);
    };

    const setPage = (page) => {
        props.onPageOfertaAcademica(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPageOfertaAcademica(1, paginate);
    };

    return (
        <>
            <PaperComponent
                title={"Listado Oferta Academica"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnOfertaAcademica}
                        dataSource={props.listOfertaAcademica}
                        onShow={ ( ofertaAcademica ) => onShow(ofertaAcademica) }
                        onEditar={ ( ofertaAcademica ) => onEdit(ofertaAcademica) }
                        onDelete={ ( ofertaAcademica ) => props.onDelete(ofertaAcademica) }
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
    columnOfertaAcademica: state.ColumnModule.columnOfertaAcademica,
    listOfertaAcademica: state.PaginationModule.listOfertaAcademica,
    page: state.PaginationModule.pageOfertaAcademica,
    pagination: state.PaginationModule.paginationOfertaAcademica,
    paginate: state.PaginationModule.paginateOfertaAcademica,
} );

const mapDispatchToProps = {
    onPageOfertaAcademica: OfertaAcademicaActions.onPageOfertaAcademica,
    onDelete: OfertaAcademicaActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexOfertaAcademica);
