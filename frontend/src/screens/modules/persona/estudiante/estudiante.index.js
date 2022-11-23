
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { EstudianteActions } from '../../../../redux/actions/persona/estudiante.action';
 
function IndexEstudiante(props) {
    const navigate = useNavigate();

    React.useEffect( () => {
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onPageEstudiante();
            }
        } );
        return () => {};
    }, [] );

    const onLogin = () => {
        navigate( '/login' );
    };

    const onCreate = () => {
        navigate('/estudiante/create');
    };

    const onEdit = (estudiante) => {
        navigate(`/estudiante/edit/${estudiante.idestudiante}`);
    };

    const onShow = (estudiante) => {
        navigate(`/estudiante/show/${estudiante.idestudiante}`);
    };

    const setPage = (page) => {
        props.onPageEstudiante(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPageEstudiante(1, paginate);
    };

    return (
        <>
            <PaperComponent
                title={"Listado Estudiante"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnEstudiante}
                        dataSource={props.listEstudiante}
                        onShow={ ( estudiante ) => onShow(estudiante) }
                        onEditar={ ( estudiante ) => onEdit(estudiante) }
                        onDelete={ ( estudiante ) => props.onDelete(estudiante) }
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
    columnEstudiante: state.ColumnModule.columnEstudiante,
    listEstudiante: state.PaginationModule.listEstudiante,
    page: state.PaginationModule.pageEstudiante,
    pagination: state.PaginationModule.paginationEstudiante,
    paginate: state.PaginationModule.paginateEstudiante,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPageEstudiante: EstudianteActions.onPageEstudiante,
    onDelete: EstudianteActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexEstudiante);
