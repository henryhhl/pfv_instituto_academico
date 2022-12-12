
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tag, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { IconButton, TablePagination, useTheme } from '@mui/material';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Functions } from '../utils/functions';

export default function TableComponent( props ) {
    const theme = useTheme();

    const handleChangePage = ( event, newPage ) => {
        props.setPage( newPage );
    };

    const handleChangeRowsPerPage = (event) => {
        props.setPaginate( event.target.value );
    };

    const showDataArray = ( array, row ) => {
        let string = "";
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            string += `${row[element]} `;
        }
        return string;
    };

    function onComponent() {
        return (
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover table-sm">
                    <tbody>
                        <tr>
                            <th align='left' style={{ width: 35, fontSize: 12, }}>
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
                                            fontSize: 12,
                                        }}
                                    >
                                        { column.label }
                                    </th>
                                );
                            } ) }
                            { props.option === true &&
                                <th align='left' style={{ fontSize: 12, }}>
                                    Opción
                                </th>
                            }
                        </tr>
                        {/* e0f3ff */}
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
                                    <td style={{ fontSize: 12, }}>
                                        { ( ( (props.page < 1 ? 0 : props.page) ) * props.paginate ) + ( index + 1 ) }
                                    </td>
                                    { props.columns.map( ( column, index ) => {
                                        let amountday = 'hace';
                                        if ( column.amountday === true ) {
                                            let datenow = Functions.dateToString();
                                            datenow = new Date(datenow);
                                            
                                            let array = row[column.id].split('/');
                                            let dateString = `${array[2]}-${array[1]}-${array[0]}`;
                                            let dateregister = new Date(dateString);

                                            let milisegundodia = 24 * 60 * 60 * 1000;

                                            let diferenciatime = datenow.getTime() - dateregister.getTime();
                                            if ( diferenciatime > 0 ) {
                                                let cantdia = Math.round( ( Math.abs( diferenciatime ) ) / milisegundodia );
                                                amountday = amountday + ` ${cantdia} días`;
                                            } else if ( diferenciatime === 0 ) {
                                                amountday = 'Hoy';
                                            } else {
                                                amountday = row[column.id];
                                            }
                                        }
                                        return (
                                            <td key={index}
                                                style={{
                                                    textAlign: `${column.numeric === true ? 'right' : 'left'}`,
                                                    paddingRight: 10,
                                                    paddingLeft: 10,
                                                    fontSize: 12,
                                                }}
                                            >
                                                { column.state === true ? 
                                                    <Tag color={`${ row[column.id] === 'A' ? 'geekblue' : '' }`}>
                                                        { `${ row[column.id] === 'A' ? 'Activo' : 'InActivo' }` }
                                                    </Tag> : 
                                                    Array.isArray( column.id ) ? 
                                                        showDataArray(column.id, row)
                                                    : column.tipooperacion === true ?
                                                        <Tag color={`${ row[column.id] === 'A' ? 'geekblue' : '' }`}>
                                                            { `${ row[column.id] === 'A' ? 
                                                                'Aperturado' : row[column.id] === 'N' ? 'Sin Aperturar o Cerrar' : 'Cerrado' 
                                                            }` }
                                                        </Tag>
                                                    : isNaN(row[column.id]) ? 
                                                        column.amountday === true ? amountday : row[column.id] : 
                                                    parseFloat(row[column.id]).toFixed(2) 
                                                }
                                                { column.suffix && column.suffix }
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
                { props.isPagination === true &&
                    <TablePagination 
                        style={{ float: 'right', position: 'relative', top: -10, paddingLeft: 0, marginLeft: 0, paddingBottom: 0, }}
                        component={"div"} 
                        count={props.pagination.total}
                        labelDisplayedRows={ ( paginationInfo ) => {
                            return (
                                <span style={{ position: 'relative', top: 5, }}>
                                    {`${paginationInfo.from} - ${paginationInfo.to} de ${paginationInfo.count}`}
                                </span>
                            );
                        } }
                        labelRowsPerPage={
                            <span style={{ position: 'relative', top: 5, }}>
                                { "Filas por página" }
                            </span>
                        }
                        page={props.page}
                        rowsPerPageOptions={ [ 1, 5, 25, 50, 100, 200 ] }
                        rowsPerPage={props.paginate}

                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}

                        ActionsComponent={
                            () => (
                                <div style={{
                                        flexShrink: 0,
                                        marginLeft: theme.spacing(2.5),
                                        marginTop: -10
                                    }}
                                >
                                    <IconButton
                                        onClick={ ( event ) => {
                                            handleChangePage( event, 0 );
                                        } }
                                        disabled={ props.page === 0 }
                                        aria-label="first page"
                                    >
                                        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                                    </IconButton>
                                    <IconButton 
                                        onClick={ ( event ) => {
                                            handleChangePage( event, props.page - 1 );
                                        } } 
                                        disabled={ props.page === 0 } 
                                        aria-label="previous page"
                                    >
                                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                    </IconButton>
                                    <IconButton
                                        onClick={ ( event ) => {
                                            handleChangePage( event, props.page + 1 );
                                        } }
                                        disabled={ props.page >= Math.ceil( props.pagination.total / props.paginate ) - 1 }
                                        aria-label="next page"
                                    >
                                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                    </IconButton>
                                    <IconButton
                                        onClick={ ( event ) => {
                                            handleChangePage( event, Math.max( 0, Math.ceil( props.pagination.total / props.paginate ) - 1 ) );
                                        } }
                                        disabled={ props.page >= Math.ceil( props.pagination.total / props.paginate ) - 1 }
                                        aria-label="last page"
                                    >
                                        { theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                                    </IconButton>
                                </div>
                            )
                        }
                    />
                }
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
    isPagination: PropTypes.bool,

    paginate: PropTypes.number,
    page: PropTypes.number,
    pagination: PropTypes.object,

    setPage: PropTypes.func,
    setPaginate: PropTypes.func,
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
    isPagination: false,

    paginate: 25,
    page: 0,
    pagination: {
        total: 100,
    },

    setPage: () => {},
    setPaginate: () => {},
}
