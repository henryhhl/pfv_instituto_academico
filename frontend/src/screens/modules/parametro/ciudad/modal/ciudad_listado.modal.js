
import React from 'react';
import PropTypes from 'prop-types';
import apiServices from '../../../../../utils/apiservices';
import { httpRequest } from '../../../../../utils/httpRequest';
import ModalComponent from '../../../../../components/modal';
import TreeComponent from '../../../../../components/tree';

export default function ListadoCiudadModal( props ) {
    const [ array_data, setArrayData ] = React.useState( [] );

    React.useEffect( () => {
        get_data();
        return () => {};
    }, [] );

    function get_data() {
        httpRequest( 'get', apiServices.apiparametrosadminciudad_index, {
        } ) . then( (result) => {
            if ( result.resp === 1 ) {
                setArrayData( result.arrayCiudad );
            };
        } );
    };

    return (
        <>
            <ModalComponent
                visible={props.visible}
                onClose={props.onClose}
                footer={null} width={'70%'} centered
                title={"LISTA CIUDAD"}
            >
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <TreeComponent 
                                    treeData={array_data}
                                    option={ {
                                        title: "descripcion",
                                        value: "idciudad",
                                        fkidpadre: "fkidciudadpadre",
                                    } } selectable={false}
                                    create={false} show={false}
                                    edit={false} delete={false}
                                    onSelect={props.onSelect}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </ModalComponent>
        </>
    );
};

ListadoCiudadModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onSelect: PropTypes.func,
};

ListadoCiudadModal.defaultProps = {
    onSelect: () => {},
    visible: false,
};
