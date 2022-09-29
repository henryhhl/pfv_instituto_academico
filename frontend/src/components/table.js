
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

export default function TableComponent( props ) {

    function onComponent() {
        return (
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover table-sm">
                    <tbody>
                        <tr>
                            { props.columns.map( ( column, index ) => {
                                return (
                                    <th key={index} 
                                        align={`${column.numeric ? 'right' : 'left'}`}
                                        style={{ width: column.width ? 'auto' : column.width }}
                                    >
                                        { column.label }
                                    </th>
                                );
                            } ) }
                            <th align='left'>
                                Opción
                            </th>
                        </tr>
                        { props.dataSource.map( ( row, index ) => {
                            return (
                                <tr key={index}>
                                    { props.columns.map( ( column, index ) => {
                                        return (
                                            <th key={index}
                                                align={`${column.numeric ? 'right' : 'left'}`}
                                            >
                                                { row[column.id] }
                                            </th>
                                        );
                                    } ) }
                                    <th>
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
                                    </th>
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
}

TableComponent.defaultProps = {
    columns: [],
    dataSource: [],
    onShow: () => {},
    onEditar: () => {},
    onDelete: () => {},
    onReport: () => {},
}
