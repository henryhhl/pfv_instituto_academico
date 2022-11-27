
import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { CloseOutlined } from '@ant-design/icons';

function ModalComponent( props ) {
    const [ draggable, setDraggable ] = React.useState( false );
    const [ bounds, setBounds ] = React.useState( { left: 0, top: 0, bottom: 0, right: 0, } );
    const draggleRef = React.useRef(null);

    let bodyStyle = { padding: '2px 3px 6px 3px', paddingLeft: 8, paddingRight: 8, };
    bodyStyle = Object.assign( bodyStyle, props.bodyStyle );

    return (
        <>
            <Modal
                footer={props.footer}
                onOk={props.onOk}
                onCancel={props.onClose}
                width={ props.width }
                zIndex={ props.zIndex }

                open={ props.visible }
                keyboard={ props.keyboard }
                centered={ props.centered }
                maskClosable={ props.maskClosable }
                closable={ props.closable }

                modalRender={
                    ( modal ) => {
                        return (
                            <Draggable
                                disabled={ draggable }
                                bounds={ bounds }
                                onStart={ ( event, uiData ) => {
                                    const { clientWidth, clientHeight } = window?.document?.documentElement;
                                    const targetRect = draggleRef?.current?.getBoundingClientRect();
                                    if (!targetRect) {
                                        return;
                                    }
                                    setBounds( {
                                        left:   -targetRect?.left + uiData?.x,
                                        right:  clientWidth       - ( targetRect?.right - uiData?.x ),
                                        top:    -targetRect?.top  + uiData?.y,
                                        bottom: clientHeight      - ( targetRect?.bottom - uiData?.y ),
                                    } );
                                } }
                            >
                                <div ref={ draggleRef }>
                                    { modal }
                                </div>
                            </Draggable>
                        );
                    }
                }
                title={
                    <div
                        style={ {
                            width: '100%', minWidth: '100%', 
                            cursor: 'move',
                        } }
                        onMouseOver={ () => {
                            if ( draggable ) {
                                setDraggable( false );
                            }
                        } }
                        onMouseOut={ () => {
                            setDraggable( true );
                        } }
                        onFocus={() => {}}
                        onBlur={() => {}}
                    >
                        { props.title }
                    </div>
                }
                closeIcon={
                    <CloseOutlined
                        style={{
                            padding: 6, borderRadius: 50, background: 'white', fontSize: 12, fontWeight: 'bold', boxShadow: '0 0 7px 0 #222',
                            position: 'relative', top: -5, left: 4,
                        }}
                    />
                }
                bodyStyle={ bodyStyle }
                maskStyle={ props.maskStyle }
                style={ props.style }

                cancelText={ props.cancelText }
                okText={ props.okText }
            >
                { props.children }
            </Modal>
        </>
    );
};

ModalComponent.propTypes = {
    visible:      PropTypes.bool,
    centered:     PropTypes.bool,
    maskClosable: PropTypes.bool,
    keyboard:     PropTypes.bool,
    closable:     PropTypes.bool,

    zIndex: PropTypes.number,

    width:  PropTypes.any,
    title:  PropTypes.any,
    footer: PropTypes.any,

    onClose: PropTypes.func,
    onOK:    PropTypes.func,

    maskStyle: PropTypes.object,
    style:     PropTypes.object,
    bodyStyle: PropTypes.object,

    cancelText: PropTypes.node,
    okText:     PropTypes.node,
    footer:     PropTypes.node,

    okType: PropTypes.string,
};

ModalComponent.defaultProps = {
    visible:      false,
    centered:     false,
    maskClosable: false,
    keyboard:     false,
    closable:     true,

    width:  520,
    zIndex: 1000,

    title:      'Modal Title',
    cancelText: 'Cancel',
    okText:     'OK',

    footer: null,

    maskStyle: {},
    style:     {},
    bodyStyle: {},

    onClose: () => {},
    onOK:    () => {},
};

export default ModalComponent;
