
import React from 'react';
import PropTypes from 'prop-types';
import apiServices from '../../../../../utils/apiservices';
import { httpRequest } from '../../../../../utils/httpRequest';
import ModalComponent from '../../../../../components/modal';
import TableComponent from '../../../../../components/table';

export default function ListadoProgramaModal( props ) {
    const [ array_data, setArrayData ] = React.useState( [] );

    React.useEffect( () => {
        get_data();
        return () => {};
    }, [] );

    function get_data() {
        httpRequest( 'get', apiServices.apiestructuraacademicaprograma_index, {
        } ) . then( (result) => {
            if ( result.resp === 1 ) {
                setArrayData( result.arrayPrograma );
            };
        } );
    };

    return (
        <>
            <ModalComponent
                visible={props.visible}
                onClose={props.onClose}
                footer={null} width={'90%'} centered
                title={"LISTA DE PROGRAMA"}
            >
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <TableComponent 
                                    option={false}
                                    columns={ [
                                        {
                                            id: 'unidadadministrativa',
                                            label: 'Unidad Administrativa',
                                        },
                                        {
                                            id: 'unidadnegocio',
                                            label: 'Unidad Nagocio',
                                        },
                                        {
                                            id: 'unidadacademica',
                                            label: 'Unidad Academica',
                                        },
                                        {
                                            id: 'descripcion',
                                            label: 'Descripción',
                                        },
                                        {
                                            id: 'nivelacademico',
                                            label: 'Nivel',
                                        },
                                        {
                                            id: 'modalidadacademica',
                                            label: 'Modalidad',
                                        },
                                        {
                                            id: 'codigo',
                                            label: 'Código',
                                        },
                                        {
                                            id: 'sigla',
                                            label: 'Sigla',
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

ListadoProgramaModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onSelect: PropTypes.func,
};

ListadoProgramaModal.defaultProps = {
    onSelect: () => {},
    visible: false,
};
