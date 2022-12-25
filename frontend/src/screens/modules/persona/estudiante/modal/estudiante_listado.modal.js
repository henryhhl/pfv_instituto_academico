
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import apiServices from '../../../../../utils/apiservices';
import { httpRequest } from '../../../../../utils/httpRequest';
import ModalComponent from '../../../../../components/modal';
import TableComponent from '../../../../../components/table';
import CardComponent from '../../../../../components/card';

export default function ListadoEstudianteModal( props ) {
    const [ array_data, setArrayData ] = React.useState( [] );
    const navigate = useNavigate();

    React.useEffect( () => {
        get_data();
        return () => {};
    }, [] );

    function get_data(search = "") {
        httpRequest( 'get', apiServices.apipersonaestudiante_index, {
            search: search,
        } ) . then( (result) => {
            if ( result.resp === 1 ) {
                setArrayData( result.arrayEstudiante );
            } else if ( result.error === true && result.resp === -2 ) {
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
                footer={null} width={'95%'} 
                style={{ top: 40, }}
                title={"LISTA ESTUDIANTE"}
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
                                        id: 'numeroregistro',
                                        label: 'Nro. Registro',
                                    },
                                    {
                                        id: ['nombreprincipal', 'nombreadicional', 'apellidoprimero', 'apellidosegundo'],
                                        label: 'Estudiante',
                                    },
                                    {
                                        id: 'tipoidentificacion',
                                        label: 'Tipo Identificación',
                                    },
                                    {
                                        id: 'numeroidentificacion',
                                        label: 'Nro. Identificación',
                                    },
                                    {
                                        id: 'ciudadnacimiento',
                                        label: 'Lugar Nacimiento',
                                    },
                                    {
                                        id: 'ciudadresidencia',
                                        label: 'Residencia',
                                    },
                                    {
                                        id: 'fechanacimiento',
                                        label: 'F. Nacimiento',
                                    },
                                ] } select
                                dataSource={array_data}
                                onSelect={ props.onSelect }
                                iddata={"idestudiante"}
                                valueSelect={props.valueSelect}
                            />
                        </CardComponent>
                    </div>
                </div>
            </ModalComponent>
        </>
    );
};

ListadoEstudianteModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onSelect: PropTypes.func,
    valueSelect: PropTypes.any,
};

ListadoEstudianteModal.defaultProps = {
    onSelect: () => {},
    visible: false,
    valueSelect: null,
};
