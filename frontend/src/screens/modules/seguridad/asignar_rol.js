
import React from 'react';
import { Avatar, List } from 'antd';
import { AuditOutlined, CloseOutlined } from '@ant-design/icons';
import toastr from 'toastr';
import CardComponent from '../../../components/card';
import PaperComponent from '../../../components/paper';
import InputComponent from '../../../components/input';
import ButtonComponent from '../../../components/button';
import UsuarioListadoModal from './usuario/modal/usuario_listado.modal';
import RolListadoModal from './rol/modal/rol_listado.modal';

import "toastr";
import { httpRequest } from '../../../utils/httpRequest';
import apiServices from '../../../utils/apiservices';
import ConfirmationComponent from '../../../components/confirmation';

export default function AsignarRol( props ) {
    const [ visibleUsuario, setVisibleUsuario ] = React.useState(false);
    const [ visibleRol, setVisibleRol ] = React.useState(false);
    const [ rol, setRol ] = React.useState(null);
    const [ usuario, setUsuario ] = React.useState(null);
    const [ listRolUsuarioDetalle, setListRolUsuarioDetalle ] = React.useState([]);

    function onAsignar() {
        let rolUsuario = listRolUsuarioDetalle.find( (item) => item.fkidrol === rol.idrol );
        if ( rolUsuario ) {
            return toastr.warning('', 'Rol ya asignado.', { progressBar: true, });
        }
        let onAsignar = () => { 
            httpRequest( 'post', apiServices.apiseguridadusuarioroldetalle_store, {
                fkidusuario: usuario.idusuario,
                fkidrol: rol.idrol,
                rol: rol.descripcion,
                tiporol: rol.tiporol,
                notarol: rol.nota,
            } ) . then( (result) => {
                if ( result.resp === 1 ) {
                    setListRolUsuarioDetalle([...listRolUsuarioDetalle, result.usuarioroldetalle]);
                    setRol(null);
                };
            } );
        };
        ConfirmationComponent( {
            title: "Asignar Rol", onOk: onAsignar,
            okType: "primary", content: "Estás seguro de asignar información?",
        } );
    };

    function onDeleteRolAsigando( rolasignado ) {
        let onQuitar = () => { 
            httpRequest( 'delete', apiServices.apiseguridadusuarioroldetalle_delete + `/${rolasignado.idusuarioroldetalle}`, {
            } ) . then( (result) => {
                if ( result.resp === 1 ) {
                    setListRolUsuarioDetalle([...result.arrayUsuarioRolDetalle]);
                };
            } );
        };
        ConfirmationComponent( {
            title: "Quitar Rol", onOk: onQuitar,
            content: "Estás seguro de quitar información?",
        } );
    }

    function onComponentUsuario() {
        if ( !visibleUsuario ) return null;
        return (
            <UsuarioListadoModal
                visible={visibleUsuario}
                onClose={ () => setVisibleUsuario(false) }
                onSelect={ (usuario) => {
                    httpRequest( 'get', apiServices.apiseguridadusuarioroldetalle_rolusuario + `/${usuario.idusuario}`, {
                    } ) . then( (result) => {
                        if ( result.resp === 1 ) {
                            setUsuario(usuario);
                            setVisibleUsuario(false);
                            setListRolUsuarioDetalle( result.arrayRol );
                        };
                    } );
                } }
            />
        );
    };

    function onComponentRol() {
        if ( !visibleRol ) return null;
        return (
            <RolListadoModal
                visible={visibleRol}
                onClose={ () => setVisibleRol(false) }
                onSelect={ (rol) => {
                    setRol(rol);
                    setVisibleRol(false);
                } }
            />
        );
    };

    return (
        <>
            { onComponentUsuario() }
            { onComponentRol() }
            <PaperComponent>
                <CardComponent
                    header={"Asignar Rol"}
                >
                    <div className="row">
                        <div className="form-group col-2"></div>
                        <div className="form-group col-4">
                            <InputComponent
                                placeholder="SELECCIONAR USUARIO"
                                value={usuario?.login}
                                onClick={ () => setVisibleUsuario(true) }
                                readOnly
                                style={{ background: 'white', cursor: 'pointer', }}
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                placeholder="SELECCIONAR ROL"
                                value={rol?.descripcion}
                                onClick={ () => setVisibleRol(true) }
                                readOnly
                                style={{ background: 'white', cursor: 'pointer', }}
                            />
                        </div>
                        <div className="form-group col-12">
                            <ButtonComponent
                                fullWidth
                                onClick={onAsignar}
                                disabled={(rol === null || usuario === null)}
                            >
                                Asignar
                            </ButtonComponent>
                        </div>
                    </div>
                    <CardComponent
                        header={"ROL DEL USUARIO"}
                    >
                        <List
                            size='small'
                            style={{ 
                                width: '100%', maxWidth: '100%', padding: 0,
                                maxHeight: 400, overflowY: 'auto', overflowX: 'hidden',
                            }}
                            itemLayout="horizontal"
                            dataSource={listRolUsuarioDetalle}
                            grid={{ gutter: 4, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 4, }}
                            renderItem={ (item) => (
                                <List.Item
                                    style={{ 
                                        border: '1px solid #adc6ff', marginBottom: 8, 
                                        paddingTop: 4, paddingBottom: 4, borderRadius: 5,
                                        background: '#f0f5ff',
                                    }}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <div style={{ textAlign: 'center', }}>
                                                <div style={{ marginBottom: 8, marginTop: 8, }}>
                                                    <Avatar icon={<AuditOutlined />} />
                                                </div>
                                            </div>
                                        }
                                        title={
                                            <>
                                                <a style={{ color: '#1d39c4', }}>
                                                    { item.rol }
                                                </a>
                                                <CloseOutlined 
                                                    style={{
                                                        padding: 6, borderRadius: 50, background: 'white', fontSize: 12, fontWeight: 'bold', 
                                                        boxShadow: '0 0 7px 0 #222', position: 'relative', left: 8, top: 2, cursor: 'pointer',
                                                    }}
                                                    onClick={ () => onDeleteRolAsigando(item) }
                                                    className="fa-pull-right"
                                                />
                                            </>
                                        }
                                        description={
                                            <>
                                                <div style={{ color: '#1d39c4', }}>
                                                    {item.tiporol}
                                                </div>
                                            </>
                                        }
                                    />
                                </List.Item>
                            ) }
                        />
                    </CardComponent>
                </CardComponent>
            </PaperComponent>
        </>
    );
};
