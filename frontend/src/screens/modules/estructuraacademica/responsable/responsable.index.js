
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import TableComponent from '../../../../components/table';
import PaperComponent from '../../../../components/paper';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { ResponsableActions } from '../../../../redux/actions/estructuraacademica/responsable.action';
 
function IndexResponsable(props) {
    const navigate = useNavigate();

    React.useEffect( () => {
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.getAllResponsable();
            }
        } );
        return () => {};
    }, [] );

    const onLogin = () => {
        navigate( '/login' );
    };
    

    const onCreate = () => {
        navigate('/responsable/create');
    }

    const onEdit = (responsable) => {
        navigate(`/responsable/edit/${responsable.idresponsable}`);
    }

    const onShow = (responsable) => {
        navigate(`/responsable/show/${responsable.idresponsable}`);
    }

    return (
        <>
            <PaperComponent
                title={"Listado Responsable"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnResponsable}
                        dataSource={props.listResponsable}
                        onShow={ ( responsable ) => onShow(responsable) }
                        onEditar={ ( responsable ) => onEdit(responsable) }
                        onDelete={ ( responsable ) => props.onDelete(responsable) }
                    />
                </CardComponent>
            </PaperComponent>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
    columnResponsable: state.ColumnModule.columnResponsable,
    listResponsable: state.ListModule.listResponsable,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    getAllResponsable: ResponsableActions.getAllResponsable,
    onDelete: ResponsableActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexResponsable);
