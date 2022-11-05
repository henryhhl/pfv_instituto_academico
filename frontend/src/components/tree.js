
import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Switch, Tag, Tooltip, Tree } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';

export default function TreeComponent( props ) {
    const [ treeData, setTreeData ] = React.useState( [] );
    const [ expandedKeys, setExpandedKeys ] = React.useState( [] );
    const [ expanded, setExpanded ] = React.useState( false );
    const [ arrayKeys, setArrayKeys ] = React.useState( [] );

    React.useEffect( () => {
        if ( Array.isArray( props.treeData ) ) {
            loadTree( props.treeData );
        }
    }, [ props.treeData ] );

    function loadTree( treeData = [] ) {
        let array_treeData = [];
        let keys = [];
        for ( let index = 0; index < treeData.length; index++ ) {
            let element = treeData[index];
            keys.push(element[props.option.value]);
            if ( element[props.option.fkidpadre] === null ) {
                element.arrayFamily = [];
                let obj = {
                    title: onComponentTitle(element),
                    key:   element[props.option.value],
                    value: element[props.option.value],
                    data: element,
                    children: [],
                };
                array_treeData.push(obj);
            }
        }
        if ( props.fkidpadre === false ) {
            treeFamily(treeData, array_treeData);
        }
        setTreeData(array_treeData);
        setArrayKeys(keys);
        setExpandedKeys(keys);
        setExpanded(true);
        // if ( Functions.esBoolean(props.expanded) ) {
        //     setExpandedKeys(keys);
        //     setExpanded(true);
        // }
    };

    function treeFamily( treeData = [], array_treeData = [] ) {
        if (array_treeData.length === 0) {
            return;
        }
        for ( let i = 0; i < array_treeData.length; i++ ) {
            let children = childrenFamily( treeData, array_treeData[i] );
            array_treeData[i].children = children;
            treeFamily(treeData, children);
        }
    };

    function childrenFamily(treeData = [], tree) {
        let children = [];
        let cantidad = 0;
        for ( let index = 0; index < treeData.length; index++ ) {
            let element = treeData[index];
            if ( element[props.option.fkidpadre] === tree.value ) {
                    if ( !Array.isArray(element.arrayFamily) ) {
                        element.arrayFamily = [];
                    }
                    if ( tree.data.arrayFamily.length > 0 ) {
                        // element.arrayFamily = [...element.arrayFamily, tree.data.arrayFamily[tree.data.arrayFamily.length - 1]];
                        element.arrayFamily = element.arrayFamily.concat(tree.data.arrayFamily);
                    }
                    element.arrayFamily = [...element.arrayFamily, tree.data[props.option.title]];
                
                let obj = {
                    title: onComponentTitle(element),
                    key:   element[props.option.value],
                    value: element[props.option.value],
                    data: element,
                    children: [],
                };
                children.push(obj);
            }
        }
        return children;
    }

    function onComponentTitle(obj) {
        return (
            <span style={{ position: 'relative', }} 
                onClick={ () => props.onSelect(obj) }
            >
                { obj[props.option.title] } 
                { props.create === true &&
                    <Tooltip placement="top" title={"Agregar"}>
                        <Tag 
                            style={{ lineHeight: 0, padding: 3, marginLeft: 8, marginRight: 2, }} 
                            // color="processing"
                            onClick={ () => props.onCreate(obj) }
                        >
                            <PlusOutlined />
                        </Tag>
                    </Tooltip>
                }
                { props.show === true &&
                    <Tooltip placement="top" title={"Ver"}>
                        <Tag 
                            style={{ lineHeight: 0, padding: 3, marginLeft: 2, marginRight: 2, }} 
                            // color="green"
                            onClick={ () => props.onShow(obj) }
                        >
                            <EyeOutlined />
                        </Tag>
                    </Tooltip>
                }
                { props.edit === true &&
                    <Tooltip placement="top" title={"Editar"}>
                        <Tag 
                            style={{ lineHeight: 0, padding: 3, marginLeft: 2, marginRight: 2, }} 
                            // color="geekblue"
                            onClick={ () => props.onEdit(obj) }
                        >
                            <EditOutlined />
                        </Tag>
                    </Tooltip>
                }
                { props.delete === true &&
                    <Tooltip placement="top" title={"Eliminar"}>
                        <Tag 
                            style={{ lineHeight: 0, padding: 3, marginLeft: 2, marginRight: 2, }} 
                            // color="red"
                            onClick={ () => props.onDelete(obj) }
                        >
                            <DeleteOutlined />
                        </Tag>
                    </Tooltip>
                }
            </span>
        );
    };

    function onCheckedExpanded(checked) {
        if ( checked ) {
            setExpandedKeys( arrayKeys );
        } else {
            setExpandedKeys( [] );
        }
        setExpanded(checked);
    };

    return (
        <>
            <Row gutter={ [12, 8] }>
                <Col xs={{ span: 24, }}>
                    <Tree 
                        // onSelect={props.onSelect}
                        style={ { 
                            width: '100%', maxWidth: '100%', 
                        } }
                        showIcon={props.showIcon}
                        showLine={props.showLine}
                        multiple={props.multiple}
                        blockNode={props.blockNode}
                        draggable={props.draggable}
                        checkable={props.checkable}
                        selectable={props.selectable}
                        height={props.height}
                        treeData={treeData}
                        expandedKeys={expandedKeys}
                        onExpand={ ( expandedKeys ) => setExpandedKeys(expandedKeys) }
                    />
                </Col>
            </Row>
            { ( treeData.length > 0 ) &&
                <Row gutter={ [12, 8] } justify={"end"}>
                    <Switch style={{ height: 30, lineHeight: 'normal', paddingRight: 5, }}
                        unCheckedChildren={'MOSTRAR TODOS'}
                        checkedChildren={'OCULTAR TODOS'}
                        checked={expanded}
                        onChange={ onCheckedExpanded }
                    />
                </Row>
            }
        </>
    );
};

TreeComponent.propTypes = {
    showIcon: PropTypes.bool,
    showLine: PropTypes.bool,
    multiple: PropTypes.bool,
    blockNode: PropTypes.bool,
    draggable: PropTypes.bool,
    checkable: PropTypes.bool,
    fkidpadre: PropTypes.bool,
    selectable: PropTypes.bool,
    create: PropTypes.bool,
    show: PropTypes.bool,
    edit: PropTypes.bool,
    delete: PropTypes.bool,

    height: PropTypes.number,
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    
    treeData: PropTypes.array,
    option:   PropTypes.object,

    onSelect: PropTypes.func,
    onCreate: PropTypes.func,
    onShow: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onSelect: PropTypes.func,
}

TreeComponent.defaultProps = {
    showIcon: true,
    showLine: true,
    multiple: true,
    blockNode: true,
    draggable: true,
    checkable: false,
    selectable: true,
    fkidpadre: false,
    create: true,
    show: true,
    edit: true,
    delete: true,

    height: 400,

    treeData: [],
    option: {
        title: "title",
        value: "value",
        fkidpadre: "fkidpadre",
    },
    prefix: "",
    suffix: "",

    onSelect: () => {},
    onCreate: () => {},
    onShow: () => {},
    onEdit: () => {},
    onDelete: () => {},
}
