
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaperComponent from '../../../../components/paper';
import { UnidadAdministrativaActions } from '../../../../redux/actions/estructuraacademica/unidad_administrativa.action';
import CardComponent from '../../../../components/card';
import TableComponent from '../../../../components/table';
 
function IndexUnidadAdministrativa(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllUnidadAdministrativa();
      return () => {};
    }, [])
    

    function onCreate() {
        navigate('/unidadadministrativa/create');
    }

    function onEdit(unidadAdministrativa) {
        navigate(`/unidadadministrativa/edit/${unidadAdministrativa.idunidadadministrativa}`);
    }

    function onShow(unidadAdministrativa) {
        navigate(`/unidadadministrativa/show/${unidadAdministrativa.idunidadadministrativa}`);
    }

    return (
        <>
            <PaperComponent
                title={"Listado Unidad Administrativa"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnUnidadAdministrativa}
                        dataSource={props.listUnidadAdministrativa}
                        onShow={ ( unidadAdministrativa ) => onShow(unidadAdministrativa) }
                        onEditar={ ( unidadAdministrativa ) => onEdit(unidadAdministrativa) }
                        onDelete={ ( unidadAdministrativa ) => props.onDelete(unidadAdministrativa) }
                    />
                </CardComponent>
            </PaperComponent>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
    columnUnidadAdministrativa: state.ColumnModule.columnUnidadAdministrativa,
    listUnidadAdministrativa: state.ListModule.listUnidadAdministrativa,
} );

const mapDispatchToProps = {
    getAllUnidadAdministrativa: UnidadAdministrativaActions.getAllUnidadAdministrativa,
    onDelete: UnidadAdministrativaActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexUnidadAdministrativa);
