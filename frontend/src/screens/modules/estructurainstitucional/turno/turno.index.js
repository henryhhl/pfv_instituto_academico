
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import TableComponent from '../../../../components/table';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { TurnoActions } from '../../../../redux/actions/estructurainstitucional/turno.action';
 
function IndexTurno(props) {
    const navigate = useNavigate();

    React.useEffect( () => {
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onPageTurno();
            }
        } );
        return () => {};
    }, [] );

    const onLogin = () => {
        navigate( '/login' );
    };

    const onCreate = () => {
        navigate('/turno/create');
    };

    const onEdit = (turno) => {
        navigate(`/turno/edit/${turno.idturno}`);
    };

    const onShow = (turno) => {
        navigate(`/turno/show/${turno.idturno}`);
    };

    const setPage = (page) => {
        props.onPageTurno(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPageTurno(1, paginate);
    };
    
    return (
        <>
            <PaperComponent
                title={"Listado Turno"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnTurno}
                        dataSource={props.listTurno}
                        onShow={ ( turno ) => onShow(turno) }
                        onEditar={ ( turno ) => onEdit(turno) }
                        onDelete={ ( turno ) => props.onDelete(turno) }
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
    columnTurno: state.ColumnModule.columnTurno,
    listTurno: state.PaginationModule.listTurno,
    page: state.PaginationModule.pageTurno,
    pagination: state.PaginationModule.paginationTurno,
    paginate: state.PaginationModule.paginateTurno,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPageTurno: TurnoActions.onPageTurno,
    onDelete: TurnoActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexTurno);
