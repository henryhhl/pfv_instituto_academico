
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
import TableComponent from '../../../../components/table';
import { ProgramaActions } from '../../../../redux/actions/estructuraacademica/programa.action';
 
function IndexPrograma(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllPrograma();
      return () => {};
    }, [])
    

    function onCreate() {
        navigate('/programa/create');
    }

    function onEdit(programa) {
        navigate(`/programa/edit/${programa.idprograma}`);
    }

    function onShow(programa) {
        navigate(`/programa/show/${programa.idprograma}`);
    }

    return (
        <>
            <PaperComponent
                title={"Listado de Programa"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnPrograma}
                        dataSource={props.listPrograma}
                        onShow={ ( programa ) => onShow(programa) }
                        onEditar={ ( programa ) => onEdit(programa) }
                        onDelete={ ( programa ) => props.onDelete(programa) }
                    />
                </CardComponent>
            </PaperComponent>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
    columnPrograma: state.ColumnModule.columnPrograma,
    listPrograma: state.ListModule.listPrograma,
} );

const mapDispatchToProps = {
    getAllPrograma: ProgramaActions.getAllPrograma,
    onDelete: ProgramaActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexPrograma);
