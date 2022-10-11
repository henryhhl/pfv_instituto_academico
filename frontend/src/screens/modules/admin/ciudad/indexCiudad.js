
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CiudadActions } from '../../../../redux/actions/parametros/ciudad.action';
import ModalComponent from '../../../../components/modal';
import TreeComponent from '../../../../components/tree';
import CreateCiudad from './ciudad.create';
import ShowCiudad from './ciudad.show';
import EditCiudad from './ciudad.edit';
 
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
            <div className="main-content">
                <section className="section">
                    <h1 className="section-header">
                        <div>Ciudad</div>
                        <div className='float-right'>
                            <button type='button' className='btn btn-sm btn-primary'
                                onClick={onCreate}
                            >
                                Nuevo
                            </button>
                        </div>
                    </h1>
                    <div className="row">
                        <div className="col-12" style={{ marginBottom: 50, }}>
                            <div className="card">
                                <div className="card-header">
                                    <h4>Advanced Table</h4>
                                </div>
                                <div className="card-body">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
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
