
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import apiServices from '../../../../../utils/apiservices';
import { httpRequest } from '../../../../../utils/httpRequest';
import ModalComponent from '../../../../../components/modal';
import TableComponent from '../../../../../components/table';

export default function ListadoMateriaForGrupoModal( props ) {
    const [ array_data, setArrayData ] = React.useState( [] );
    const navigate = useNavigate();

    React.useEffect( () => {
        get_data();
        return () => {};
    }, [] );

    function get_data() {
        httpRequest( 'get', apiServices.apiofertaacademicagrupo_findmateriaforgrupo, {
            fkidpensum: props.fkidpensum,
            fkidgrupo: props.fkidgrupo,
        } ) . then( (result) => {
            console.log(result)
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

    return (
        <>
            <ModalComponent
                visible={props.visible}
                onClose={props.onClose}
                footer={null} width={650} centered
                title={"LISTA MATERIA"}
            >
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body pb-0">
                                <TableComponent 
                                    option={false}
                                    columns={ [
                                        {
                                            id: 'materia',
                                            label: 'Código',
                                            object: true,
                                            value: 'codigo',
                                        },
                                        {
                                            id: 'materia',
                                            label: 'Sigla',
                                            object: true,
                                            value: 'sigla',
                                        },
                                        {
                                            id: 'materia',
                                            label: 'Materia',
                                            object: true,
                                            value: 'nombrelargo',
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

ListadoMateriaForGrupoModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onSelect: PropTypes.func,
    fkidpensum: PropTypes.any,
    fkidgrupo: PropTypes.any,
};

ListadoMateriaForGrupoModal.defaultProps = {
    onSelect: () => {},
    visible: false,
    fkidpensum: null,
    fkidgrupo: null,
};
