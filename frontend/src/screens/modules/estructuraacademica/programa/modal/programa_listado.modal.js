
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import apiServices from '../../../../../utils/apiservices';
import { httpRequest } from '../../../../../utils/httpRequest';
import ModalComponent from '../../../../../components/modal';
import TableComponent from '../../../../../components/table';
import CardComponent from '../../../../../components/card';

export default function ListadoProgramaModal( props ) {
    const [ array_data, setArrayData ] = React.useState( [] );
    const navigate = useNavigate();

    React.useEffect( () => {
        get_data();
        return () => {};
    }, [] );

    const get_data = (search = "") => {
        httpRequest( 'get', apiServices.apiestructuraacademicaprograma_index, {
            search: search,
        } ) . then( (result) => {
            if ( result.resp === 1 ) {
                setArrayData( result.arrayPrograma );
            } if ( result.error === true && result.resp === -2 ) {
                Swal.fire( {
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Usuario no Autorizado',
                    text: result.message,
                    showConfirmButton: false,
                    timer: 3000,
                } );
                setTimeout(() => {
                    navigate('/login');
                }, 500);
            }
        } );
    };

    const setSearch = ( value ) => {
        get_data(value);
    };

    return (
        <>
            <ModalComponent
                visible={props.visible}
                onClose={props.onClose}
                footer={null} width={'95%'} centered
                title={"LISTA DE PROGRAMA"}
            >
                <div className="row">
                    <div className="col-12 pt-3">
                        <CardComponent
                            isSearch
                            onSearch={ setSearch }
                        >
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
                                        label: 'Programa',
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
                                iddata={"idprograma"}
                                valueSelect={props.valueSelect}
                            />
                        </CardComponent>
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
    valueSelect: PropTypes.any,
};

ListadoProgramaModal.defaultProps = {
    onSelect: () => {},
    visible: false,
    valueSelect: null,
};
