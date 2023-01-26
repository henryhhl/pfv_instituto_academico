
import React from 'react';
import { Avatar, Empty, List } from 'antd';
import PropTypes from 'prop-types';
import { AuditOutlined, CloseOutlined } from '@ant-design/icons';

export default function ListComponent( props ) {

    const onComponent = () => {

        if ( props.dataSource.length === 0 ) {
            return (
                <Empty 
                    description={'Sin registros asignados.'}
                />
            );
        }

        return (
            <>
                <List
                    size='small'
                    style={ { 
                        width: '100%', maxWidth: '100%', padding: 0,
                        maxHeight: 400, overflowY: 'auto', overflowX: 'hidden',
                    } }
                    itemLayout="horizontal"
                    grid={ { 
                        gutter: 4, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 4, 
                    } }
                    bordered
                    dataSource={props.dataSource}
                    renderItem={ (item) => (
                        <List.Item
                            style={ { 
                                border: '1px solid #adc6ff', marginBottom: 8, 
                                paddingTop: 4, paddingBottom: 4, borderRadius: 5,
                                background: '#f0f5ff',
                            } }
                        >
                            <List.Item.Meta
                                avatar={
                                    <div style={{ textAlign: 'center', }}>
                                        <div style={{ marginBottom: 8, marginTop: 8, }}>
                                            { props.avatar !== null ? props.avatar : <Avatar icon={<AuditOutlined />} /> }
                                        </div>
                                    </div>
                                }
                                title={
                                    <>
                                        <a style={{ color: '#1d39c4', }}>
                                            { props.isisObjectTitle === false ? item[props.title] : item[props.idTitle][props.title] }
                                        </a>
                                        { props.closable === true &&
                                            <CloseOutlined 
                                                style={{
                                                    padding: 6, borderRadius: 50, background: 'white', fontSize: 12, fontWeight: 'bold', 
                                                    boxShadow: '0 0 7px 0 #222', position: 'relative', left: 8, top: 2, cursor: 'pointer',
                                                }}
                                                onClick={ () => props.onClose(item) }
                                                className="fa-pull-right"
                                            />
                                        }
                                    </>
                                }
                                // description={
                                //     <div style={{ color: '#1d39c4', }}>
                                //         {item[props.description]}
                                //     </div>
                                // }
                            />
                        </List.Item>
                    ) }
                />
            </>
        );
    };

    return (
        <>
            { onComponent() }
        </>
    );
};

ListComponent.propTypes = {
    dataSource: PropTypes.array,
    avatar: PropTypes.node,
    closable: PropTypes.bool,
    isObjectTitle: PropTypes.bool,
    onClose: PropTypes.func,
    idTitle: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
}

ListComponent.defaultProps = {
    avatar: null,
    dataSource: [],
    closable: true,
    isObjectTitle: false,
    onClose: () => {},
    idTitle: 'id',
    title: 'title',
    description: 'description',
}
