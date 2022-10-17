
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaperComponent from '../../../../components/paper';
import { UnidadAcademicaActions } from '../../../../redux/actions/estructuraacademica/unidad_academica.action';
import CardComponent from '../../../../components/card';
import TableComponent from '../../../../components/table';
 
function IndexUnidadAcademica(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllUnidadAcademica();
      return () => {};
    }, [])
    

    function onCreate() {
        navigate('/unidadacademica/create');
    }

    function onEdit(unidadAcademica) {
        navigate(`/unidadacademica/edit/${unidadAcademica.idunidadacademica}`);
    }

    function onShow(unidadAcademica) {
        navigate(`/unidadacademica/show/${unidadAcademica.idunidadacademica}`);
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
                        columns={props.columnUnidadAcademica}
                        dataSource={props.listUnidadAcademica}
                        onShow={ ( unidadAcademica ) => onShow(unidadAcademica) }
                        onEditar={ ( unidadAcademica ) => onEdit(unidadAcademica) }
                        onDelete={ ( unidadAcademica ) => props.onDelete(unidadAcademica) }
                    />
                </CardComponent>
            </PaperComponent>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
    columnUnidadAcademica: state.ColumnModule.columnUnidadAcademica,
    listUnidadAcademica: state.ListModule.listUnidadAcademica,
} );

const mapDispatchToProps = {
    getAllUnidadAcademica: UnidadAcademicaActions.getAllUnidadAcademica,
    onDelete: UnidadAcademicaActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexUnidadAcademica);
