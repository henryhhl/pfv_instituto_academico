
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
import TableComponent from '../../../../components/table';
import { PensumActions } from '../../../../redux/actions/estructuraacademica/pensum.action';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
 
function IndexPensum(props) {
    const navigate = useNavigate();

    React.useEffect( () => {
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onPagePensum();
            }
        } );
        return () => {};
    }, [] );

    const onLogin = () => {
        navigate( '/login' );
    };
    

    const onCreate = () => {
        navigate('/pensum/create');
    };

    const onEdit = (pensum) => {
        navigate(`/pensum/edit/${pensum.idpensum}`);
    };

    const onShow = (pensum) => {
        navigate(`/pensum/show/${pensum.idpensum}`);
    };

    const setPage = (page) => {
        props.onPagePensum(page + 1, props.paginate);
    };

    const setPaginate = (paginate) => {
        props.onPagePensum(1, paginate);
    };

    return (
        <>
            <PaperComponent
                title={"Listado Pensum"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnPensum}
                        dataSource={props.listPensum}
                        onShow={ ( pensum ) => onShow(pensum) }
                        onEditar={ ( pensum ) => onEdit(pensum) }
                        onDelete={ ( pensum ) => props.onDelete(pensum) }
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
    columnPensum: state.ColumnModule.columnPensum,
    listPensum: state.PaginationModule.listPensum,
    page: state.PaginationModule.pagePensum,
    pagination: state.PaginationModule.paginationPensum,
    paginate: state.PaginationModule.paginatePensum,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onPagePensum: PensumActions.onPagePensum,
    onDelete: PensumActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexPensum);
