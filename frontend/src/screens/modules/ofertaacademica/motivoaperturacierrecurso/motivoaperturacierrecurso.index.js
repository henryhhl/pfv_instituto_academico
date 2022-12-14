
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { MotivoAperturaCierreCursoActions } from '../../../../redux/actions/ofertaacademica/motivoaperturacierrecurso.action';
 
function IndexMotivoAperturaCierreCurso(props) {
    const navigate = useNavigate();

    React.useEffect( () => {
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onPage();
            }
        } );
        return () => {};
    }, [] );

    const onLogin = () => {
        navigate( '/login' );
    };
    
    const onCreate = () => {
        navigate('/motivoaperturacierrecurso/create');
    };

    const onEdit = (item) => {
        navigate(`/motivoaperturacierrecurso/edit/${item.idmotivoaperturacierrecurso}`);
    };

    const onShow = (item) => {
        navigate(`/motivoaperturacierrecurso/show/${item.idmotivoaperturacierrecurso}`);
    };

    const setPage = (page) => {
        props.onPage(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPage(1, paginate);
    };

    const setSearch = ( value ) => {
        props.onPage(1, props.paginate, value);
    };

    return (
        <>
            <PaperComponent
                title={"Listado Motivo Apertura o Cierre"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                    onSearch={ setSearch }
                >
                    <TableComponent 
                        columns={props.column}
                        dataSource={props.list}
                        onShow={ ( item ) => onShow(item) }
                        onEditar={ ( item ) => onEdit(item) }
                        onDelete={ ( item ) => props.onDelete(item) }
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
    column: state.ColumnModule.columnMotivoAperturaCierreCurso,
    list: state.PaginationModule.listMotivoAperturaCierreCurso,
    page: state.PaginationModule.pageMotivoAperturaCierreCurso,
    pagination: state.PaginationModule.paginationMotivoAperturaCierreCurso,
    paginate: state.PaginationModule.paginateMotivoAperturaCierreCurso,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPage: MotivoAperturaCierreCursoActions.onPageMotivoAperturaCierreCurso,
    onDelete: MotivoAperturaCierreCursoActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexMotivoAperturaCierreCurso);
