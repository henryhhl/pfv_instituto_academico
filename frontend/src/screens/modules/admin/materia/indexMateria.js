
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MateriaActions } from '../../../../redux/actions/materiaActions';
import TableComponent from '../../../../components/table';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
 
function IndexMateria(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllMateria();
      return () => {};
    }, [])
    

    function onCreate() {
        navigate('/materia/create');
    }

    function onEdit(materia) {
        navigate(`/materia/edit/${materia.idmateria}`);
    }

    function onShow(materia) {
        navigate(`/materia/show/${materia.idmateria}`);
    }

    return (
        <>
            <PaperComponent
                title={"Listado Materia"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnMateria}
                        dataSource={props.listMateria}
                        onShow={ ( materia ) => onShow(materia) }
                        onEditar={ ( materia ) => onEdit(materia) }
                        onDelete={ ( materia ) => props.onDelete(materia) }
                    />
                </CardComponent>
            </PaperComponent>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
    columnMateria: state.ColumnModule.columnMateria,
    listMateria: state.ListModule.listMateria,
} );

const mapDispatchToProps = {
    getAllMateria: MateriaActions.getAllMateria,
    onDelete: MateriaActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexMateria);
