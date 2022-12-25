
import React from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import apiServices from '../../../../../utils/apiservices';
import { httpRequest } from '../../../../../utils/httpRequest';
import CardComponent from '../../../../../components/card';
import ModalComponent from '../../../../../components/modal';
import TableComponent from '../../../../../components/table';

export default function ListadoGrupoModal( props ) {
    const [ array_data, setArrayData ] = React.useState( [] );
    const navigate = useNavigate();

    React.useEffect( () => {
        get_data();
        return () => {};
    }, [] );

    const get_data = (search = "") => {
        httpRequest( 'get', apiServices.apiofertaacademicagrupo_index, {
            search: search,
        } ) . then( (result) => {
            if ( result.resp === 1 ) {
                setArrayData( result.arrayGrupo );
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
                footer={null} width={400} 
                centered
                title={"LISTA GRUPO"}
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
                                        id: 'sigla',
                                        label: 'Grupo',
                                    },
                                ] } select
                                dataSource={array_data}
                                onSelect={ props.onSelect }
                                iddata={"idgrupo"}
                                valueSelect={props.valueSelect}
                            />
                        </CardComponent>
                    </div>
                </div>
            </ModalComponent>
        </>
    );
};

ListadoGrupoModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onSelect: PropTypes.func,
    valueSelect: PropTypes.any,
};

ListadoGrupoModal.defaultProps = {
    onSelect: () => {},
    visible: false,
    valueSelect: null,
};
