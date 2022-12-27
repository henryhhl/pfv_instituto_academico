
import { CameraOutlined, EditOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaperComponent from '../../components/paper';
import { AuthActions } from '../../redux/actions/auth/auth.action';
import UpdateImageModal from './modal/updateimage.modal';
import UpdateProfileModal from './modal/updateprofile.modal';

const ProfilePage = ( props ) => {
    const { profile } = props;
    const { nombreprincipal, nombreadicional, apellidoprimero, apellidosegundo, imagen } = profile;
    const [ visibleEditProfile, setVisibleEditProfile ] = React.useState( false );
    const [ visibleEditPhoto, setVisibleEditPhoto ] = React.useState( false );
    const navigate = useNavigate();

    React.useEffect( () => {
        props.onValidateToken( onLogin );
        return () => {};
    }, [] );

    const onLogin = () => {
        navigate( '/login' );
    };

    const onCloseModalEditProfile = () => {
        setVisibleEditProfile(false);
        setVisibleEditPhoto(false);
    };

    const onComponentEditProfile = () => {
        if ( !visibleEditProfile ) return null;
        return (
            <UpdateProfileModal 
                visible={visibleEditProfile}
                onClose={ onCloseModalEditProfile }
                profile={profile}
                onOk={ (body) => {
                    props.updateProfile(body, onCloseModalEditProfile);
                } }
            />
        );
    };

    const onComponentEditPhotoProfile = () => {
        if ( !visibleEditPhoto ) return null;
        return (
            <UpdateImageModal 
                visible={visibleEditPhoto}
                onClose={ onCloseModalEditProfile }
                profile={profile}
                onOk={ (body) => {
                    props.updateProfile(body, onCloseModalEditProfile);
                } }
            />
        );
    };
    
    return (
        <>
            { onComponentEditProfile() }
            { onComponentEditPhotoProfile() }
            <PaperComponent>
                <div className='row'>
                    <div className='col-12'>
                        <div className="card card-success">
                            <div className="card-header">
                                <h4>Perfil de Usuario</h4>
                            </div>
                            <div className="card-body">             
                                <ul className="list-unstyled list-unstyled-border">
                                    <li className="media">
                                        <div className='position-relative'>
                                            <Tooltip title="Editar Foto" placement='bottom'>
                                                <CameraOutlined 
                                                    className='position-absolute'
                                                    style={{ 
                                                        bottom: -10, left: -4, 
                                                        fontSize: 24, padding: 6, 
                                                        cursor: 'pointer',
                                                        borderRadius: 50, background: 'white', 
                                                        fontWeight: 'bold', boxShadow: '0 0 7px 0 #222',
                                                        color: '#6610f2',
                                                    }}
                                                    onClick={ () => setVisibleEditPhoto(true) }
                                                />
                                            </Tooltip>
                                            <img className="mr-3" width="80" height={"80"} 
                                                src={ `${ (imagen !== null && imagen !== "") ? imagen : '/assets/img/profile.png'}` } 
                                                alt="avatar" 
                                                style={{ borderRadius: 10, }}
                                            />
                                        </div>
                                        <div className="media-body">
                                            <div className="media-title">
                                                { nombreprincipal ?? 'S/N' } { nombreadicional ?? '' } { apellidoprimero ?? '' } { apellidosegundo ?? '' }
                                            </div>
                                            <small>
                                                { profile.email ?? '' }
                                            </small>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4'>
                        <div className="card card-primary">
                            <div className="card-header">
                                <h4>
                                    Información de Perfil
                                    <div className="float-right">
                                        <Tooltip title="Editar Perfil">
                                            <EditOutlined 
                                                style={{ fontSize: 20, cursor: 'pointer', color: '#6610f2', }} 
                                                onClick={ () => setVisibleEditProfile(true) }
                                            />
                                        </Tooltip>
                                    </div>
                                </h4>
                            </div>
                            <div className="card-body pt-0 pb-0">
                                <ul className="list-unstyled list-unstyled-border">
                                    <li className="media pb-0">
                                        <div className="media-body">
                                            <div className="float-right">
                                                <small>
                                                    {profile.ciudadorigen ?? ''}
                                                </small>
                                            </div>
                                            <div className="media-title">
                                                Ciudad Origen:
                                            </div>
                                        </div>
                                    </li>
                                    <li className="media pb-0">
                                        <div className="media-body">
                                            <div className="float-right">
                                                <small>
                                                    {profile.nombreprincipal ?? ''}
                                                </small>
                                            </div>
                                            <div className="media-title">
                                                Nombre Principal:
                                            </div>
                                        </div>
                                    </li>
                                    <li className="media pb-0">
                                        <div className="media-body">
                                            <div className="float-right">
                                                <small>
                                                    {profile.nombreadicional ?? ''}
                                                </small>
                                            </div>
                                            <div className="media-title">
                                                Nombre Adicional:
                                            </div>
                                        </div>
                                    </li>
                                    <li className="media pb-0">
                                        <div className="media-body">
                                            <div className="float-right">
                                                <small>
                                                    {profile.apellidoprimero ?? ''}
                                                </small>
                                            </div>
                                            <div className="media-title">
                                                Primer Apellido:
                                            </div>
                                        </div>
                                    </li>
                                    <li className="media pb-0">
                                        <div className="media-body">
                                            <div className="float-right">
                                                <small>
                                                    {profile.apellidosegundo ?? ''}
                                                </small>
                                            </div>
                                            <div className="media-title">
                                                Segundo Apellido:
                                            </div>
                                        </div>
                                    </li>
                                    <li className="media pb-0">
                                        <div className="media-body">
                                            <div className="float-right">
                                                <small>
                                                    {profile.email ?? ''}
                                                </small>
                                            </div>
                                            <div className="media-title">
                                                Email:
                                            </div>
                                        </div>
                                    </li>
                                    <li className="media pb-0">
                                        <div className="media-body">
                                            <div className="float-right">
                                                <small>
                                                    {profile.telefonomobile ?? ''}
                                                </small>
                                            </div>
                                            <div className="media-title">
                                                Teléfono Movil:
                                            </div>
                                        </div>
                                    </li>
                                    <li className="media pb-0">
                                        <div className="media-body">
                                            <div className="float-right">
                                                <small>
                                                    {profile.fechanacimiento ?? ''}
                                                </small>
                                            </div>
                                            <div className="media-title">
                                                Fecha Nacimiento:
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="card card-primary">
                            <div className="card-header">
                                <h4>
                                    Actividades
                                </h4>
                            </div>
                            <div className="card-body">  
                                <div className="card p-0">
                                    <div className="card-header p-0">
                                        <h4>
                                            Sin Actividades
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="card card-primary">
                            <div className="card-header">
                                <h4>
                                    Conversaciones
                                </h4>
                            </div>
                            <div className="card-body">  
                                <div className="card p-0">
                                    <div className="card-header p-0">
                                        <h4>
                                            Sin Conversaciones
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    profile: state.Profile,
} );
  
const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    updateProfile: AuthActions.updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)( ProfilePage );
