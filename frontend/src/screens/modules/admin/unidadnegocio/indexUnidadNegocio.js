
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UnidadNegocioActions } from '../../../../redux/actions/unidadNegocioActions';
import TableComponent from '../../../../components/table';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
 
function IndexUnidadNegocio(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllUnidadNegocio();
      return () => {};
    }, [])
    

    function onCreate() {
        navigate('/unidadnegocio/create');
    }

    function onEdit(unidadNegocio) {
        navigate(`/unidadnegocio/edit/${unidadNegocio.idunidadnegocio}`);
    }

    function onShow(unidadNegocio) {
        navigate(`/unidadnegocio/show/${unidadNegocio.idunidadnegocio}`);
    }

    return (
        <>
            <PaperComponent
                title={"Listado Unidad Negocio"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnUnidadNegocio}
                        dataSource={props.listUnidadNegocio}
                        onShow={ ( unidadNegocio ) => onShow(unidadNegocio) }
                        onEditar={ ( unidadNegocio ) => onEdit(unidadNegocio) }
                        onDelete={ ( unidadNegocio ) => props.onDelete(unidadNegocio) }
                    />
                </CardComponent>
            </PaperComponent>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
    columnUnidadNegocio: state.ColumnModule.columnUnidadNegocio,
    listUnidadNegocio: state.ListModule.listUnidadNegocio,
} );

const mapDispatchToProps = {
    getAllUnidadNegocio: UnidadNegocioActions.getAllUnidadNegocio,
    onDelete: UnidadNegocioActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexUnidadNegocio);
