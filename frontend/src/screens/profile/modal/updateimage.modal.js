
import React from 'react';
import PropTypes from 'prop-types';
import ModalComponent from '../../../components/modal';
import CardComponent from '../../../components/card';
import ButtonComponent from '../../../components/button';
import InputFileComponent from '../../../components/inputfile';

export default function UpdateImageModal( props ) {
    const [ profile, setProfile ] = React.useState( { imagen: null, } );

    React.useEffect( () => {
        setProfile( { ...props.profile, } );
        return () => {};
    }, [] );

    const onValidate = () => {
        props.onOk(profile);
    };

    return (
        <>
            <ModalComponent
                visible={props.visible}
                onClose={props.onClose}
                footer={null} width={450} centered
                title={"EDITAR FOTO DE PERFIL"}
                style={{ marginTop: 30, marginBottom: 30, }}
            >
                <div className="row">
                    <div className="col-12 pt-3">
                        <CardComponent>
                            <div className="row">
                                <div className="form-group col-12">
                                    <InputFileComponent
                                        label="Eligir Imaden de Perfil"
                                        id={`image-profile`}
                                        onChange={ (document) => {
                                            if ( document === "" ) {
                                                setProfile( { ...profile, imagen: null, } );
                                            } else {
                                                setProfile( { ...profile, imagen: document, } );
                                            }
                                        } }
                                        documento={profile.imagen}
                                        showImage={true}
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

UpdateImageModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onOk: PropTypes.func,
    profile: PropTypes.object,
};

UpdateImageModal.defaultProps = {
    onOk: () => {},
    visible: false,
    profile: null,
};
