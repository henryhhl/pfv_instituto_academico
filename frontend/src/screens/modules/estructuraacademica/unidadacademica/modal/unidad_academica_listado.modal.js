
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import apiServices from '../../../../../utils/apiservices';
import { httpRequest } from '../../../../../utils/httpRequest';
import ModalComponent from '../../../../../components/modal';
import TableComponent from '../../../../../components/table';
import CardComponent from '../../../../../components/card';

export default function ListadoUnidadAcademicaModal( props ) {
    const [ array_data, setArrayData ] = React.useState( [] );
    const navigate = useNavigate();

    React.useEffect( () => {
        get_data();
        return () => {};
    }, [] );

    const get_data = (search = "") => {
        httpRequest( 'get', apiServices.apiestructuraacademicaunidadacademica_index, {
            search: search
        } ) . then( (result) => {
            if ( result.resp === 1 ) {
                setArrayData( result.arrayUnidadAcademica );
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
                footer={null} width={'80%'} centered
                title={"LISTA UNIDAD ACADEMICA"}
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
                                        id: 'codigo',
                                        label: 'Código',
                                    },
                                    {
                                        id: 'sigla',
                                        label: 'Sigla',
                                    },
                                    {
                                        id: 'descripcion',
                                        label: 'Unidad Academica',
                                    },
                                    {
                                        id: 'unidadadministrativa',
                                        label: 'Unidad Administrativa',
                                    },
                                    {
                                        id: 'unidadnegocio',
                                        label: 'Unidad Negocio',
                                    },
                                ] } select
                                dataSource={array_data}
                                onSelect={ props.onSelect }
                                iddata={"idunidadacademica"}
                                valueSelect={props.valueSelect}
                            />
                        </CardComponent>
                    </div>
                </div>
            </ModalComponent>
        </>
    );
};

ListadoUnidadAcademicaModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onSelect: PropTypes.func,
    valueSelect: PropTypes.any,
};

ListadoUnidadAcademicaModal.defaultProps = {
    onSelect: () => {},
    visible: false,
    valueSelect: null,
};
