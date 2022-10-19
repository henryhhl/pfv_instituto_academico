
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReferenciaContactoActions } from '../../../../redux/actions/parametros/referencia_contacto.action';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
import TableComponent from '../../../../components/table';
 
function IndexReferenciaContacto(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllReferenciaContacto();
      return () => {};
    }, [])
    

    function onCreate() {
        navigate('/referenciacontacto/create');
    }

    function onEdit(referenciaContacto) {
        navigate(`/referenciacontacto/edit/${referenciaContacto.idreferenciacontacto}`);
    }

    function onShow(referenciaContacto) {
        navigate(`/referenciacontacto/show/${referenciaContacto.idreferenciacontacto}`);
    }

    return (
        <>
            <PaperComponent
                title={"Listado Referencia Contacto"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnReferenciaContacto}
                        dataSource={props.listReferenciaContacto}
                        onShow={ ( referenciaContacto ) => onShow(referenciaContacto) }
                        onEditar={ ( referenciaContacto ) => onEdit(referenciaContacto) }
                        onDelete={ ( referenciaContacto ) => props.onDelete(referenciaContacto) }
                    />
                </CardComponent>
            </PaperComponent>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
    columnReferenciaContacto: state.ColumnModule.columnReferenciaContacto,
    listReferenciaContacto: state.ListModule.listReferenciaContacto,
} );

const mapDispatchToProps = {
    getAllReferenciaContacto: ReferenciaContactoActions.getAllReferenciaContacto,
    onDelete: ReferenciaContactoActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexReferenciaContacto);
