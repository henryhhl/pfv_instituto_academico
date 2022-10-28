
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReferenciaContactoActions } from '../../../../redux/actions/parametros/referencia_contacto.action';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
import TableComponent from '../../../../components/table';
 
function IndexReferenciaContacto(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.onPageReferenciaContacto();
      return () => {};
    }, [])
    

    const onCreate = () => {
        navigate('/referenciacontacto/create');
    }

    const onEdit = (referenciaContacto) => {
        navigate(`/referenciacontacto/edit/${referenciaContacto.idreferenciacontacto}`);
    }

    const onShow = (referenciaContacto) => {
        navigate(`/referenciacontacto/show/${referenciaContacto.idreferenciacontacto}`);
    }

    const setPage = (page) => {
        props.onPageReferenciaContacto(page + 1, props.paginate);
    }

    const setPaginate = (paginate) => {
        props.onPageReferenciaContacto(1, paginate);
    }

    return (
        <>
            <PaperComponent
                title={"Listado Referencia Contacto"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnReferenciaContacto}
                        dataSource={props.listReferenciaContacto}
                        onShow={ ( referenciaContacto ) => onShow(referenciaContacto) }
                        onEditar={ ( referenciaContacto ) => onEdit(referenciaContacto) }
                        onDelete={ ( referenciaContacto ) => props.onDelete(referenciaContacto) }
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
    columnReferenciaContacto: state.ColumnModule.columnReferenciaContacto,
    listReferenciaContacto: state.PaginationModule.listReferenciaContacto,
    page: state.PaginationModule.pageReferenciaContacto,
    pagination: state.PaginationModule.paginationReferenciaContacto,
    paginate: state.PaginationModule.paginateReferenciaContacto,
} );

const mapDispatchToProps = {
    onPageReferenciaContacto: ReferenciaContactoActions.onPageReferenciaContacto,
    onDelete: ReferenciaContactoActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexReferenciaContacto);
