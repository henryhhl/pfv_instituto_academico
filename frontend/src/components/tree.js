
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
        treeFamily(treeData, array_treeData);
        console.log('array_treeData: ', array_treeData);
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
            let children = childrenFamily( treeData, array_treeData[i].value );
            array_treeData[i].children = children;
            treeFamily(treeData, children);
        }
    };

    function childrenFamily(treeData = [], idpadre) {
        let children = [];
        for ( let index = 0; index < treeData.length; index++ ) {
            let element = treeData[index];
            if ( element[props.option.fkidpadre] == idpadre ) {
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
            <span style={{ position: 'relative', }}>
                { obj[props.option.title] } 
                <Tooltip placement="top" title={"Agregar"}>
                    <Tag 
                        style={{ lineHeight: 0, padding: 3, marginLeft: 8, marginRight: 2, }} 
                        // color="processing"
                        onClick={ () => props.onCreate(obj) }
                    >
                        <PlusOutlined />
                    </Tag>
                </Tooltip>
                <Tooltip placement="top" title={"Ver"}>
                    <Tag 
                        style={{ lineHeight: 0, padding: 3, marginLeft: 2, marginRight: 2, }} 
                        // color="green"
                        onClick={ () => props.onShow(obj) }
                    >
                        <EyeOutlined />
                    </Tag>
                </Tooltip>
                <Tooltip placement="top" title={"Editar"}>
                    <Tag 
                        style={{ lineHeight: 0, padding: 3, marginLeft: 2, marginRight: 2, }} 
                        // color="geekblue"
                        onClick={ () => props.onEdit(obj) }
                    >
                        <EditOutlined />
                    </Tag>
                </Tooltip>
                <Tooltip placement="top" title={"Eliminar"}>
                    <Tag 
                        style={{ lineHeight: 0, padding: 3, marginLeft: 2, marginRight: 2, }} 
                        // color="red"
                        onClick={ () => props.onDelete(obj) }
                    >
                        <DeleteOutlined />
                    </Tag>
                </Tooltip>
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
                        onSelect={props.onSelect}
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
    selectable: PropTypes.bool,

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
}

TreeComponent.defaultProps = {
    showIcon: true,
    showLine: true,
    multiple: true,
    blockNode: true,
    draggable: true,
    checkable: false,
    selectable: true,

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
