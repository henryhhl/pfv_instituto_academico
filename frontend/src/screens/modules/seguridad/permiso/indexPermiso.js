
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PermisoActions } from '../../../../redux/actions/seguridad/permiso.action';
import TreeComponent from '../../../../components/tree';
import ModalComponent from '../../../../components/modal';
import CreatePermiso from './permiso.create';
import ShowPermiso from'./permiso.show';
import EditPermiso from './permiso.edit';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';
 
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
            <PaperComponent
                title={"Permisos"}
                create
                onCreate={onCreate}
            >
                <CardComponent>
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
                </CardComponent>
            </PaperComponent>
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
