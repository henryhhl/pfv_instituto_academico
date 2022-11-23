
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { OfertaAcademicaActions } from '../../../../redux/actions/parametros/oferta_academica.action';
 
function IndexOfertaAcademica(props) {
    const navigate = useNavigate();

    React.useEffect( () => {
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onPageOfertaAcademica();
            }
        } );
        return () => {};
    }, [] );

    const onLogin = () => {
        navigate( '/login' );
    };

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
    onValidateToken: AuthActions.onValidateToken,
    onPageOfertaAcademica: OfertaAcademicaActions.onPageOfertaAcademica,
    onDelete: OfertaAcademicaActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexOfertaAcademica);
