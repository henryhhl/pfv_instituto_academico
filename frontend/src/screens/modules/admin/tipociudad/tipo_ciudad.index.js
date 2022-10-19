
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
import TableComponent from '../../../../components/table';
import { TipoCiudadActions } from '../../../../redux/actions/parametros/tipo_ciudad.action';
 
function IndexTipoCiudad(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllTipoCiudad();
      return () => {};
    }, [])
    

    function onCreate() {
        navigate('/tipociudad/create');
    }

    function onEdit(tipoCiudad) {
        navigate(`/tipociudad/edit/${tipoCiudad.idtipociudad}`);
    }

    function onShow(tipoCiudad) {
        navigate(`/tipociudad/show/${tipoCiudad.idtipociudad}`);
    }

    return (
        <>
            <PaperComponent
                title={"Listado Tipo Ciudad"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnTipoCiudad}
                        dataSource={props.listTipoCiudad}
                        onShow={ ( tipoCiudad ) => onShow(tipoCiudad) }
                        onEditar={ ( tipoCiudad ) => onEdit(tipoCiudad) }
                        onDelete={ ( tipoCiudad ) => props.onDelete(tipoCiudad) }
                    />
                </CardComponent>
            </PaperComponent>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
    columnTipoCiudad: state.ColumnModule.columnTipoCiudad,
    listTipoCiudad: state.ListModule.listTipoCiudad,
} );

const mapDispatchToProps = {
    getAllTipoCiudad: TipoCiudadActions.getAllTipoCiudad,
    onDelete: TipoCiudadActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexTipoCiudad);
