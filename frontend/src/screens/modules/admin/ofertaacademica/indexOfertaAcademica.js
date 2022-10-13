
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { OfertaAcademicaActions } from '../../../../redux/actions/ofertaAcademicaActions';
import TableComponent from '../../../../components/table';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
 
function IndexOfertaAcademica(props) {
    const navigate = useNavigate();

    useEffect(() => {
      props.getAllOfertaAcademica();
      return () => {};
    }, [])
    

    function onCreate() {
        navigate('/ofertaacademica/create');
    }

    function onEdit(ofertaAcademica) {
        navigate(`/ofertaacademica/edit/${ofertaAcademica.idofertaacademica}`);
    }

    function onShow(ofertaAcademica) {
        navigate(`/ofertaacademica/show/${ofertaAcademica.idofertaacademica}`);
    }

    return (
        <>
            <PaperComponent
                title={"Listado Oferta Academica"}
                create
                onCreate={onCreate}
            >
                <CardComponent
                    isSearch
                >
                    <TableComponent 
                        columns={props.columnOfertaAcademica}
                        dataSource={props.listOfertaAcademica}
                        onShow={ ( ofertaAcademica ) => onShow(ofertaAcademica) }
                        onEditar={ ( ofertaAcademica ) => onEdit(ofertaAcademica) }
                        onDelete={ ( ofertaAcademica ) => props.onDelete(ofertaAcademica) }
                    />
                </CardComponent>
            </PaperComponent>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
    columnOfertaAcademica: state.ColumnModule.columnOfertaAcademica,
    listOfertaAcademica: state.ListModule.listOfertaAcademica,
} );

const mapDispatchToProps = {
    getAllOfertaAcademica: OfertaAcademicaActions.getAllOfertaAcademica,
    onDelete: OfertaAcademicaActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexOfertaAcademica);
