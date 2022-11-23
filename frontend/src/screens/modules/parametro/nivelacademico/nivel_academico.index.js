
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { NivelAcademicoActions } from '../../../../redux/actions/parametros/nivel_academico.action';
 
function IndexNivelAcademico(props) {
    const navigate = useNavigate();

    React.useEffect( () => {
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onPageNivelAcademico();
            }
        } );
        return () => {};
    }, [] );

    const onLogin = () => {
        navigate( '/login' );
    };

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
    onValidateToken: AuthActions.onValidateToken,
    onPageNivelAcademico: NivelAcademicoActions.onPageNivelAcademico,
    onDelete: NivelAcademicoActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexNivelAcademico);
