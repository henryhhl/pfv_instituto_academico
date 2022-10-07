
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tag, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

export default function TableComponent( props ) {

    function onComponent() {
        return (
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover table-sm">
                    <tbody>
                        <tr>
                            <th align='left' style={{ width: 35, }}>
                                #
                            </th>
                            { props.columns.map( ( column, index ) => {
                                return (
                                    <th key={index}
                                        style={{ 
                                            width: column.width ? 'auto' : column.width,
                                            textAlign: `${column.numeric === true ? 'right' : 'left'}`,
                                            paddingRight: 10,
                                            paddingLeft: 10,
                                        }}
                                    >
                                        { column.label }
                                    </th>
                                );
                            } ) }
                            { props.option === true &&
                                <th align='left'>
                                    Opción
                                </th>
                            }
                        </tr>
                        { props.dataSource.map( ( row, index ) => {
                            let style = {};
                            if ( props.select === true ) style = { cursor: 'pointer', };
                            return (
                                <tr key={index}
                                    onClick={ () => {
                                        if ( props.select === true ) {
                                            props.onSelect(row);
                                        }
                                    } }
                                    style={style}
                                >
                                    <td>
                                        { index + 1 }
                                    </td>
                                    { props.columns.map( ( column, index ) => {
                                        return (
                                            <td key={index}
                                                style={{
                                                    textAlign: `${column.numeric === true ? 'right' : 'left'}`,
                                                    paddingRight: 10,
                                                    paddingLeft: 10,
                                                }}
                                            >
                                                { column.state === true ? 
                                                    <Tag color={`${ row[column.id] === 'A' ? 'geekblue' : '' }`}>
                                                        { `${ row[column.id] === 'A' ? 'Activo' : 'InActivo' }` }
                                                    </Tag> : 
                                                    row[column.id] 
                                                }
                                            </td>
                                        );
                                    } ) }
                                    { props.option === true &&
                                        <td>
                                            <Tooltip placement="top" title={"Ver"}>
                                                <Button 
                                                    onClick={ () => props.onShow( row ) }
                                                    size={"small"}
                                                    style={{ marginLeft: 1, marginRight: 1, }}
                                                >
                                                    <EyeOutlined />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip placement="top" title={"Editar"}>
                                                <Button 
                                                    onClick={() => props.onEditar( row )}
                                                    size={"small"}
                                                    style={{ marginLeft: 1, marginRight: 1, }}
                                                >
                                                    <EditOutlined />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip placement="top" title={"Eliminar"}>
                                                <Button 
                                                    onClick={() => props.onDelete( row )}
                                                    size={"small"}
                                                    style={{ marginLeft: 1, marginRight: 1, }}
                                                >
                                                    <DeleteOutlined />
                                                </Button>
                                            </Tooltip>
                                        </td>
                                    }
                                </tr>
                            );
                        } ) }
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <>
            { onComponent() }
        </>
    );
};

TableComponent.propTypes = {
    columns: PropTypes.array,
    dataSource: PropTypes.array,
    onShow: PropTypes.func,
    onEditar: PropTypes.func,
    onDelete: PropTypes.func,
    onReport: PropTypes.func,
    onSelect: PropTypes.func,
    option: PropTypes.bool,
    select: PropTypes.bool,
}

TableComponent.defaultProps = {
    columns: [],
    dataSource: [],
    onShow: () => {},
    onEditar: () => {},
    onDelete: () => {},
    onReport: () => {},
    onSelect: () => {},
    option: true,
    select: false,
}
