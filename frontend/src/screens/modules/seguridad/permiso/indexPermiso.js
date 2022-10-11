
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PermisoActions } from '../../../../redux/actions/seguridad/permiso.action';
import TreeComponent from '../../../../components/tree';
import ModalComponent from '../../../../components/modal';
import CreatePermiso from './permiso.create';
import ShowPermiso from'./permiso.show';
import EditPermiso from './permiso.edit';
 
function IndexPermiso(props) {
    const [ visibleCreate, setVisibleCreate ] = React.useState( false );
    const [ visibleShow, setVisibleShow ] = React.useState( false );
    const [ visibleEdit, setVisibleEdit ] = React.useState( false );

    useEffect(() => {
      props.getAllPermiso();
      return () => {};
    }, [])
    

    function onCreate() {
        props.onCreate();
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
                title={"CREAR PERMISO"}
            >
                <CreatePermiso 
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
                title={"DETALLE PERMISO"}
            >
                <ShowPermiso 
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
                title={"EDITAR PERMISO"}
            >
                <EditPermiso 
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
                        <div>Permisos</div>
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
                                        treeData={props.listPermiso}
                                        option={ {
                                            title: "descripcion",
                                            value: "idpermiso",
                                            fkidpadre: "fkidpermisopadre",
                                        } }
                                        onCreate={ ( permiso ) => {
                                            props.onCreate( permiso.idpermiso );
                                            setTimeout(() => {
                                                setVisibleCreate( true );
                                            }, 500);
                                        } }
                                        onShow={ ( permiso ) => {
                                            props.onShow( permiso.idpermiso );
                                            setVisibleShow( true );
                                        } }
                                        onEdit={ ( permiso ) => {
                                            props.onEdit( permiso.idpermiso );
                                            setVisibleEdit( true );
                                        } }
                                        onDelete={ ( permiso ) => props.onDelete(permiso) }
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
    listPermiso: state.ListModule.listPermiso,
    permiso: state.Permiso,
} );

const mapDispatchToProps = {
    getAllPermiso: PermisoActions.getAllPermiso,
    onLimpiar: PermisoActions.onLimpiar,
    onCreate: PermisoActions.onCreate,
    onEdit: PermisoActions.onEdit,
    onShow: PermisoActions.onShow,
    onDelete: PermisoActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexPermiso);
