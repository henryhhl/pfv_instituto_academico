
import React from 'react';
import PropTypes from 'prop-types';
import apiServices from '../../../../../utils/apiservices';
import { httpRequest } from '../../../../../utils/httpRequest';
import ModalComponent from '../../../../../components/modal';
import TableComponent from '../../../../../components/table';

export default function ListadoNivelAcademicoModal( props ) {
    const [ array_data, setArrayData ] = React.useState( [] );

    React.useEffect( () => {
        get_data();
        return () => {};
    }, [] );

    function get_data() {
        httpRequest( 'get', apiServices.apiadminnivelacademico_index, {
        } ) . then( (result) => {
            if ( result.resp === 1 ) {
                setArrayData( result.arrayNivelAcademico );
            };
        } );
    };

    return (
        <>
            <ModalComponent
                visible={props.visible}
                onClose={props.onClose}
                footer={null} width={550} centered
                title={"LISTA NIVEL ACADEMICO"}
            >
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <TableComponent 
                                    option={false}
                                    columns={ [
                                        {
                                            id: 'sigla',
                                            label: 'Sigla',
                                        },
                                        {
                                            id: 'descripcion',
                                            label: 'Descripción',
                                        },
                                    ] } select
                                    dataSource={array_data}
                                    onSelect={ props.onSelect }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </ModalComponent>
        </>
    );
};

ListadoNivelAcademicoModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onSelect: PropTypes.func,
};

ListadoNivelAcademicoModal.defaultProps = {
    onSelect: () => {},
    visible: false,
};
