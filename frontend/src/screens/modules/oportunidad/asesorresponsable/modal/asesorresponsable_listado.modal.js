
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import apiServices from '../../../../../utils/apiservices';
import { httpRequest } from '../../../../../utils/httpRequest';
import ModalComponent from '../../../../../components/modal';
import TableComponent from '../../../../../components/table';
import CardComponent from '../../../../../components/card';

export default function ListadoAsesorResponsableModal( props ) {
    const [ array_data, setArrayData ] = React.useState( [] );
    const navigate = useNavigate();

    React.useEffect( () => {
        get_data();
        return () => {};
    }, [] );

    const get_data = (search = "") => {
        httpRequest( 'get', apiServices.apioportunidadasesorresponsable_index, {
            search: search,
        } ) . then( (result) => {
            if ( result.resp === 1 ) {
                setArrayData( result.arrayAsesorResponsable );
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
                footer={null} width={'90%'} centered
                title={"LISTA ASESOR ADMINISTRATIVO"}
            >
                <div className="row">
                    <div className="col-12">
                        <CardComponent
                            isSearch
                            onSearch={ setSearch }
                        >
                            <TableComponent 
                                option={false}
                                columns={ [
                                    {
                                        id: ['nombreprincipal', 'nombreadicional', 'apellidoprimero', 'apellidosegundo'],
                                        label: 'Asesor Administrativo',
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
                                ] } select
                                dataSource={array_data}
                                onSelect={ props.onSelect }
                                iddata={"idasesorresponsable"}
                                valueSelect={props.valueSelect}
                            />
                        </CardComponent>
                    </div>
                </div>
            </ModalComponent>
        </>
    );
};

ListadoAsesorResponsableModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onSelect: PropTypes.func,
    valueSelect: PropTypes.any,
};

ListadoAsesorResponsableModal.defaultProps = {
    onSelect: () => {},
    visible: false,
    valueSelect: null,
};
