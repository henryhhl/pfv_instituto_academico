
import React from 'react';
import PropTypes from 'prop-types';
import { CloseOutlined, EyeOutlined } from '@ant-design/icons';
import toastr from 'toastr';
import { Image } from 'antd';

export default function InputFileComponent( props ) {
    const [ deleteimg, setDeleteImg ] = React.useState(false);
    const [ visible, setVisibleImg ] = React.useState(false);

    const style = Object.assign( { textAlign: 'left', paddingLeft: 10, paddingRight: 24, } , props.style );
    if ( props.edit === true ) {
        var img = document.getElementById(props.id);
        setTimeout(() => {
            img.value = 'Documento Seleccionado.';
        }, 1500);
    }
    return (
        <>
            { props.label &&
                <label className={`${props.error && 'text-danger'}`}>
                    { props.label }
                </label>
            }
            <div className="input-group d-flex justify-content-center align-items-center">
                <input type={`${(props.edit === false) ? 'file' : 'text'}`} className={`form-control ${props.error && 'border-danger'}`} 
                    onChange={ (evt) => {
                        if ( props.onChange ) {
                            let files = evt.target.files;
                            if (
                                (files[0].type === 'image/png') || 
                                (files[0].type === 'image/jpg') || 
                                (files[0].type === 'image/jpeg') || (files[0].type === 'image/bmp')
                            ) {
                                let reader = new FileReader();
                                reader.onload = (e) => {
                                    // props.onChange(files[0]);
                                    props.onChange(e.target.result);
                                    setDeleteImg(true);
                                };
                                reader.readAsDataURL(evt.target.files[0]);
                            } else {
                                setTimeout( () => {
                                    var img = document.getElementById(props.id);
                                    img.value = '';
                                    toastr.warning( 'Archivo Invalido', '', { closeButton: true, progressBar: true, } );
                                    props.onChange("");
                                    setDeleteImg(false);
                                }, 500);
                            }
                        }
                    } }
                    id={props.id}
                    readOnly={props.readOnly}
                    style={style}
                    onClick={props.onClick}
                    disabled={props.disabled}
                    
                />
                { ( props.documento !== null && props.documento?.toString().trim().length > 0 ) &&
                    <>
                        <EyeOutlined
                            style={{
                                padding: 4, borderRadius: 50, background: 'white', fontSize: 10, cursor: 'pointer',
                                fontWeight: 'bold', boxShadow: '0 0 3px 0 #222', position: 'absolute', right: 28,
                            }}
                            onClick={ () => {
                                setVisibleImg(true);
                            } }
                        />
                        { props.edit === false &&
                            <CloseOutlined
                                style={{
                                    padding: 4, borderRadius: 50, background: 'white', fontSize: 10, cursor: 'pointer',
                                    fontWeight: 'bold', boxShadow: '0 0 3px 0 #222', position: 'absolute', right: 4,
                                }}
                                onClick={ () => {
                                    var img = document.getElementById(props.id);
                                    img.value = '';
                                    props.onChange("");
                                    setDeleteImg(false);
                                } }
                            />
                        }
                    </>
                }
            </div>
            <div className={`invalid-feedback ${props.error ? 'd-block' : 'd-none'}`}>
                { props.message }
            </div>
            <Image
                width={200}
                style={ {
                    display: 'none',
                } }
                src={'/assets/img/default.png'}
                preview={ {
                    visible,
                    scaleStep: 0.5,
                    src: props.documento,
                    onVisibleChange: (value) => {
                        setVisibleImg(value);
                    },
                } }
            />
        </>
    );
};

InputFileComponent.propTypes = {
    label: PropTypes.node,
    message: PropTypes.node,
    error: PropTypes.bool,
    readOnly: PropTypes.bool,
    edit: PropTypes.bool,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    id: PropTypes.string,
    documento: PropTypes.any,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onClose: PropTypes.func,
    style: PropTypes.object,
}

InputFileComponent.defaultProps = {
    message: "Campo requerido.",
    error: false,
    readOnly: false,
    edit: false,
    disabled: false,
    type: "text",
    id: "component-img",
    value: null,
    onChange: null,
    onClose: null,
    style: {},
}
