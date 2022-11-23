
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import TreeComponent from '../../../../components/tree';
import ModalComponent from '../../../../components/modal';
import PaperComponent from '../../../../components/paper';
import EditCiudad from './ciudad.edit';
import ShowCiudad from './ciudad.show';
import CreateCiudad from './ciudad.create';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { CiudadActions } from '../../../../redux/actions/parametros/ciudad.action';
 
function IndexCiudad(props) {
    const navigate = useNavigate();
    const [ visibleCreate, setVisibleCreate ] = React.useState( false );
    const [ visibleShow, setVisibleShow ] = React.useState( false );
    const [ visibleEdit, setVisibleEdit ] = React.useState( false );

    React.useEffect( () => {
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.getAllCiudad();
            }
        } );
        return () => {};
    }, [] );

    const onLogin = () => {
        navigate( '/login' );
    };

    const onCreate = () => {
        props.onCreate( );
        setTimeout(() => {
            setVisibleCreate( true );
        }, 500);
    };

    const onCloseCreate = () => {
        props.onLimpiar();
        setVisibleCreate( false );
    };

    const onComponentCreate = () => {
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

    const onCloseShow = () => {
        props.onLimpiar();
        setVisibleShow( false );
    };

    const onComponentShow = () => {
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

    const onCloseEdit = () => {
        props.onLimpiar();
        setVisibleEdit( false );
    };

    const onComponentEdit = () => {
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
    onValidateToken: AuthActions.onValidateToken,
    getAllCiudad: CiudadActions.getAllCiudad,
    onLimpiar: CiudadActions.onLimpiar,
    onCreate: CiudadActions.onCreate,
    onEdit: CiudadActions.onEdit,
    onShow: CiudadActions.onShow,
    onDelete: CiudadActions.onDelete,
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexCiudad);
