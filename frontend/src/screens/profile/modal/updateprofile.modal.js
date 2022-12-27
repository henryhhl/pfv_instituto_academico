
import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import ModalComponent from '../../../components/modal';
import CardComponent from '../../../components/card';
import InputComponent from '../../../components/input';
import DatePickerComponent from '../../../components/date';
import ButtonComponent from '../../../components/button';
import { Functions } from '../../../utils/functions';

export default function UpdateProfileModal( props ) {
    const [ profile, setProfile ] = React.useState( {
        fkidciudadorigen: "",
        ciudadorigen: "",
        nombreprincipal: "",
        nombreadicional: "",
        apellidoprimero: "",
        apellidosegundo: "",
        email: "",
        telefonomobile: "",
        fechanacimiento: "",
    } );

    React.useEffect( () => {
        setProfile( { ...props.profile } );
        return () => {};
    }, [] );

    const onValidate = () => {
        if ( profile?.email.toString().length > 0 ) {
            if ( !Functions.validateEmail(profile?.email) ) {
                toastr.warning('Email incorrecto');
                return;
            }
            props.onOk(profile);
        }
    };

    return (
        <>
            <ModalComponent
                visible={props.visible}
                onClose={props.onClose}
                footer={null} width={550} centered
                title={"EDITAR PERFIL"}
                style={{ marginTop: 30, marginBottom: 30, }}
            >
                <div className="row">
                    <div className="col-12 pt-3">
                        <CardComponent>
                            <div className="row">
                                <div className="form-group col-12">
                                    <InputComponent
                                        label="Nompre Principal"
                                        value={profile?.nombreprincipal}
                                        onChange={ (value) => {
                                            setProfile( {
                                                ...profile,
                                                nombreprincipal: value,
                                            } );
                                        } }
                                        placeholder={'INGRESAR NOMBRE PRINCIPAL'}
                                    />
                                </div>
                                <div className="form-group col-12">
                                    <InputComponent
                                        label="Nompre Adicional"
                                        value={profile?.nombreadicional}
                                        onChange={ (value) => {
                                            setProfile( {
                                                ...profile,
                                                nombreadicional: value,
                                            } );
                                        } }
                                        placeholder={'INGRESAR NOMBRE ADICIONAL'}
                                    />
                                </div>
                                <div className="form-group col-12">
                                    <InputComponent
                                        label="Primer Apellido"
                                        value={profile?.apellidoprimero}
                                        onChange={ (value) => {
                                            setProfile( {
                                                ...profile,
                                                apellidoprimero: value,
                                            } );
                                        } }
                                        placeholder={'INGRESAR PRIMER APELLIDO'}
                                    />
                                </div>
                                <div className="form-group col-12">
                                    <InputComponent
                                        label="Segundo Apellido"
                                        value={profile?.apellidosegundo}
                                        onChange={ (value) => {
                                            setProfile( {
                                                ...profile,
                                                apellidosegundo: value,
                                            } );
                                        } }
                                        placeholder={'INGRESAR SEGUNDO APELLIDO'}
                                    />
                                </div>
                                <div className="form-group col-12">
                                    <InputComponent
                                        label="Email"
                                        value={profile?.email}
                                        onChange={ (value) => {
                                            setProfile( {
                                                ...profile,
                                                email: value,
                                            } );
                                        } }
                                        placeholder={'INGRESAR EMAIL'}
                                    />
                                </div>
                                <div className="form-group col-12">
                                    <InputComponent
                                        label="Teléfono Movil"
                                        value={profile?.telefonomobile}
                                        onChange={ (value) => {
                                            setProfile( {
                                                ...profile,
                                                telefonomobile: value,
                                            } );
                                        } }
                                        placeholder={'INGRESAR TELÉFONO MOVIL'}
                                    />
                                </div>
                                <div className="form-group col-12">
                                    <DatePickerComponent
                                        label="Fecha Nacimiento"
                                        value={profile?.fechanacimiento}
                                        onChange={ (value) => {
                                            setProfile( {
                                                ...profile,
                                                fechanacimiento: value,
                                            } );
                                        } }
                                        placeholder={'INGRESAR FECHA NACIMIENTO'}
                                    />
                                </div>
                                <div className="form-group col-12">
                                    <ButtonComponent
                                        fullWidth
                                        onClick={onValidate}
                                    >
                                        EDITAR PERFIL
                                    </ButtonComponent>
                                </div>
                            </div>
                        </CardComponent>
                    </div>
                </div>
            </ModalComponent>
        </>
    );
};

UpdateProfileModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onOk: PropTypes.func,
    profile: PropTypes.object,
};

UpdateProfileModal.defaultProps = {
    onOk: () => {},
    visible: false,
    profile: null,
};
