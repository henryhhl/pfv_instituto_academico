
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TipoMateriaActions } from '../../../../redux/actions/tipoMateriaActions';
import TableComponent from '../../../../components/table';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
 
function IndexTipoMateria(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllTipoMateria();
      return () => {};
    }, [])
    

    function onCreate() {
        navigate('/tipomateria/create');
    }

    function onEdit(tipoMateria) {
        navigate(`/tipomateria/edit/${tipoMateria.idtipomateria}`);
    }

    function onShow(tipoMateria) {
        navigate(`/tipomateria/show/${tipoMateria.idtipomateria}`);
    }

    return (
        <>
            <PaperComponent
                title={"Listado Tipo Materia"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnTipoMateria}
                        dataSource={props.listTipoMateria}
                        onShow={ ( tipoMateria ) => onShow(tipoMateria) }
                        onEditar={ ( tipoMateria ) => onEdit(tipoMateria) }
                        onDelete={ ( tipoMateria ) => props.onDelete(tipoMateria) }
                    />
                </CardComponent>
            </PaperComponent>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
    columnTipoMateria: state.ColumnModule.columnTipoMateria,
    listTipoMateria: state.ListModule.listTipoMateria,
} );

const mapDispatchToProps = {
    getAllTipoMateria: TipoMateriaActions.getAllTipoMateria,
    onDelete: TipoMateriaActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexTipoMateria);
