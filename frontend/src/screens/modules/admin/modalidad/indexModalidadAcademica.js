
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ModalidadAcademicaActions } from '../../../../redux/actions/modalidadAcademicaActions';
import TableComponent from '../../../../components/table';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
 
function IndexModalidadAcademica(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllModalidadAcademica();
      return () => {};
    }, [])
    

    function onCreate() {
        navigate('/modalidadacademica/create');
    }

    function onEdit(modalidadAcademica) {
        navigate(`/modalidadacademica/edit/${modalidadAcademica.idmodalidadacademica}`);
    }

    function onShow(modalidadAcademica) {
        navigate(`/modalidadacademica/show/${modalidadAcademica.idmodalidadacademica}`);
    }

    return (
        <>
            <PaperComponent
                title={"Listado Modalidad Academica"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnModalidadAcademica}
                        dataSource={props.listModalidadAcademica}
                        onShow={ ( modalidadAcademica ) => onShow(modalidadAcademica) }
                        onEditar={ ( modalidadAcademica ) => onEdit(modalidadAcademica) }
                        onDelete={ ( modalidadAcademica ) => props.onDelete(modalidadAcademica) }
                    />
                </CardComponent>
            </PaperComponent>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
    columnModalidadAcademica: state.ColumnModule.columnModalidadAcademica,
    listModalidadAcademica: state.ListModule.listModalidadAcademica,
} );

const mapDispatchToProps = {
    getAllModalidadAcademica: ModalidadAcademicaActions.getAllModalidadAcademica,
    onDelete: ModalidadAcademicaActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexModalidadAcademica);
