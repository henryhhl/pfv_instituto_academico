
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import apiServices from '../../../../../utils/apiservices';
import { httpRequest } from '../../../../../utils/httpRequest';
import ModalComponent from '../../../../../components/modal';
import TableComponent from '../../../../../components/table';

export default function ListadoUnidadAcademicaModal( props ) {
    const [ array_data, setArrayData ] = React.useState( [] );
    const navigate = useNavigate();

    React.useEffect( () => {
        get_data();
        return () => {};
    }, [] );

    function get_data() {
        httpRequest( 'get', apiServices.apiestructuraacademicaunidadacademica_index, {
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

    return (
        <>
            <ModalComponent
                visible={props.visible}
                onClose={props.onClose}
                footer={null} width={750} centered
                title={"LISTA UNIDAD ACADEMICA"}
            >
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
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
                                            label: 'Descripción',
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
                                />
                            </div>
                        </div>
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
};

ListadoUnidadAcademicaModal.defaultProps = {
    onSelect: () => {},
    visible: false,
};
