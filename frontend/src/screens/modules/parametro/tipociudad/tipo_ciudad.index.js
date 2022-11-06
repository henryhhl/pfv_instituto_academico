
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
import TableComponent from '../../../../components/table';
import { TipoCiudadActions } from '../../../../redux/actions/parametros/tipo_ciudad.action';
 
function IndexTipoCiudad(props) {
    const navigate = useNavigate();

    useEffect( () => {
      props.onPageTipoCiudad();
      return () => {};
    }, [] );
    

    const onCreate = () => {
        navigate('/tipociudad/create');
    };

    const onEdit = (tipoCiudad) => {
        navigate(`/tipociudad/edit/${tipoCiudad.idtipociudad}`);
    };

    const onShow = (tipoCiudad) => {
        navigate(`/tipociudad/show/${tipoCiudad.idtipociudad}`);
    };

    const setPage = (page) => {
        props.onPageTipoCiudad(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPageTipoCiudad(1, paginate);
    };

    return (
        <>
            <PaperComponent
                title={"Listado Tipo Localidad"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnTipoCiudad}
                        dataSource={props.listTipoCiudad}
                        onShow={ ( tipoCiudad ) => onShow(tipoCiudad) }
                        onEditar={ ( tipoCiudad ) => onEdit(tipoCiudad) }
                        onDelete={ ( tipoCiudad ) => props.onDelete(tipoCiudad) }
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
    columnTipoCiudad: state.ColumnModule.columnTipoCiudad,
    listTipoCiudad: state.PaginationModule.listTipoCiudad,
    page: state.PaginationModule.pageTipoCiudad,
    pagination: state.PaginationModule.paginationTipoCiudad,
    paginate: state.PaginationModule.paginateTipoCiudad,
} );

const mapDispatchToProps = {
    onPageTipoCiudad: TipoCiudadActions.onPageTipoCiudad,
    onDelete: TipoCiudadActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexTipoCiudad);
