
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
import TableComponent from '../../../../components/table';
import { PensumActions } from '../../../../redux/actions/estructuraacademica/pensum.action';
 
function IndexPensum(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllPensum();
      return () => {};
    }, [])
    

    function onCreate() {
        navigate('/pensum/create');
    }

    function onEdit(pensum) {
        navigate(`/pensum/edit/${pensum.idpensum}`);
    }

    function onShow(pensum) {
        navigate(`/pensum/show/${pensum.idpensum}`);
    }

    return (
        <>
            <PaperComponent
                title={"Listado Unidad Academica"}
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
                    />
                </CardComponent>
            </PaperComponent>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
    columnPensum: state.ColumnModule.columnPensum,
    listPensum: state.ListModule.listPensum,
} );

const mapDispatchToProps = {
    getAllPensum: PensumActions.getAllPensum,
    onDelete: PensumActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexPensum);
