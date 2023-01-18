
import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'antd';

import { css } from "@emotion/react";
import { CircleLoader } from "react-spinners";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
  text-align: center;
`;

function LoadingComponent( props ) {

    return (
        <>
            <Modal
                title={null}
                open={props.visible}
                centered={ true }

                width={ props.width }
                zIndex={ props.zIndex }
                footer={ null }
                closable={false}

                bodyStyle={{ padding: '20px 15px 20px 15px', }}
            >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                    <div style={{ display: 'block', }}>
                        <CircleLoader
                            color='#36d7b7' 
                            css={override}
                        />
                        <div style={{ paddingTop: 10, }}>Cargando...</div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

LoadingComponent.propTypes = {
    visible: PropTypes.bool,
    zIndex: PropTypes.number,
    width: PropTypes.any,
};

LoadingComponent.defaultProps = {
    visible: false,
    width:  300,
    zIndex: 999999,
};

export default LoadingComponent;
