
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
import TableComponent from '../../../../components/table';
import { ResponsableActions } from '../../../../redux/actions/estructuraacademica/responsable.action';
 
function IndexResponsable(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllResponsable();
      return () => {};
    }, [])
    

    function onCreate() {
        navigate('/responsable/create');
    }

    function onEdit(responsable) {
        navigate(`/responsable/edit/${responsable.idresponsable}`);
    }

    function onShow(responsable) {
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
    getAllResponsable: ResponsableActions.getAllResponsable,
    onDelete: ResponsableActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexResponsable);
