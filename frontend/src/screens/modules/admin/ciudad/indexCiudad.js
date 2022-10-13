
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CiudadActions } from '../../../../redux/actions/parametros/ciudad.action';
import ModalComponent from '../../../../components/modal';
import TreeComponent from '../../../../components/tree';
import CreateCiudad from './ciudad.create';
import ShowCiudad from './ciudad.show';
import EditCiudad from './ciudad.edit';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
 
function IndexCiudad(props) {
    const [ visibleCreate, setVisibleCreate ] = React.useState( false );
    const [ visibleShow, setVisibleShow ] = React.useState( false );
    const [ visibleEdit, setVisibleEdit ] = React.useState( false );

    useEffect(() => {
      props.getAllCiudad();
      return () => {};
    }, [])
    

    function onCreate() {
        props.onCreate( );
        setTimeout(() => {
            setVisibleCreate( true );
        }, 500);
    }

    function onCloseCreate() {
        props.onLimpiar();
        setVisibleCreate( false );
    };

    function onComponentCreate() {
        if ( !visibleCreate ) return null;
        return (
            <ModalComponent
                visible={visibleCreate}
                onClose={ onCloseCreate }
                footer={null} width={450} centered
                title={"CREAR CIUDAD"}
            >
                <CreateCiudad 
                    onClose={ onCloseCreate }
                />
            </ModalComponent>
        );
    };

    function onCloseShow() {
        props.onLimpiar();
        setVisibleShow( false );
    };

    function onComponentShow() {
        if ( !visibleShow ) return null;
        return (
            <ModalComponent
                visible={visibleShow}
                onClose={ onCloseShow }
                footer={null} width={450} centered
                title={"DETALLE CIUDAD"}
            >
                <ShowCiudad 
                    onClose={ onCloseShow }
                />
            </ModalComponent>
        );
    };

    function onCloseEdit() {
        props.onLimpiar();
        setVisibleEdit( false );
    };

    function onComponentEdit() {
        if ( !visibleEdit ) return null;
        return (
            <ModalComponent
                visible={visibleEdit}
                onClose={ onCloseEdit }
                footer={null} width={450} centered
                title={"EDITAR CIUDAD"}
            >
                <EditCiudad 
                    onClose={ onCloseEdit }
                />
            </ModalComponent>
        );
    };

    return (
        <>
            { onComponentCreate() }
            { onComponentShow() }
            { onComponentEdit() }
            <PaperComponent
                title={"Ciudad"}
                create
                onCreate={onCreate}
            >
                <CardComponent>
                    <TreeComponent 
                        treeData={props.listCiudad}
                        option={ {
                            title: "descripcion",
                            value: "idciudad",
                            fkidpadre: "fkidciudadpadre",
                        } }
                        onCreate={ ( ciudad ) => {
                            props.onCreate( ciudad.idciudad );
                            setTimeout(() => {
                                setVisibleCreate( true );
                            }, 500);
                        } }
                        onShow={ ( ciudad ) => {
                            props.onShow( ciudad.idciudad );
                            setVisibleShow( true );
                        } }
                        onEdit={ ( ciudad ) => {
                            props.onEdit( ciudad.idciudad );
                            setVisibleEdit( true );
                        } }
                        onDelete={ ( ciudad ) => props.onDelete(ciudad) }
                    />
                </CardComponent>
            </PaperComponent>
        </>
    );
};

const mapStateToProps = ( state ) => ( {
    listCiudad: state.ListModule.listCiudad,
    ciudad: state.Ciudad,
} );

const mapDispatchToProps = {
    getAllCiudad: CiudadActions.getAllCiudad,
    onLimpiar: CiudadActions.onLimpiar,
    onCreate: CiudadActions.onCreate,
    onEdit: CiudadActions.onEdit,
    onShow: CiudadActions.onShow,
    onDelete: CiudadActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexCiudad);
