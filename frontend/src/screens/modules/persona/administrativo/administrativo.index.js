
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
import TableComponent from '../../../../components/table';
import { AdministrativoActions } from '../../../../redux/actions/persona/administrativo.action';
 
function IndexAdministrativo(props) {
    const navigate = useNavigate();

    useEffect( () => {
      props.onPageAdministrativo();
      return () => {};
    }, [] );
    

    const onCreate = () => {
        navigate('/administrativo/create');
    };

    const onEdit = (administrativo) => {
        navigate(`/administrativo/edit/${administrativo.idadministrativo}`);
    };

    const onShow = (administrativo) => {
        navigate(`/administrativo/show/${administrativo.idadministrativo}`);
    };

    const setPage = (page) => {
        props.onPageAdministrativo(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPageAdministrativo(1, paginate);
    };

    return (
        <>
            <PaperComponent
                title={"Listado Administrativo"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnAdministrativo}
                        dataSource={props.listAdministrativo}
                        onShow={ ( administrativo ) => onShow(administrativo) }
                        onEditar={ ( administrativo ) => onEdit(administrativo) }
                        onDelete={ ( administrativo ) => props.onDelete(administrativo) }
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
    columnAdministrativo: state.ColumnModule.columnAdministrativo,
    listAdministrativo: state.PaginationModule.listAdministrativo,
    page: state.PaginationModule.pageAdministrativo,
    pagination: state.PaginationModule.paginationAdministrativo,
    paginate: state.PaginationModule.paginateAdministrativo,
} );

const mapDispatchToProps = {
    onPageAdministrativo: AdministrativoActions.onPageAdministrativo,
    onDelete: AdministrativoActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexAdministrativo);
