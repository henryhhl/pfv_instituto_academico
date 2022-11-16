
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { EstadoData } from '../../../../data/estado.data';
import { TipoPermisoActions } from '../../../../redux/actions/seguridad/tipoPermiso.action';

function EditTipoPermiso( props ) {
    const { tipoPermiso } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onEdit( params.idtipopermiso );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Editar Tipo Permiso"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(tipoPermiso, onBack) }
                            >
                                Editar
                            </ButtonComponent>
                            <ButtonComponent
                                type='danger' onClick={onBack}
                            >
                                Cancelar
                            </ButtonComponent>
                        </>
                    }
                >
                    <div className="row">
                        <div className="form-group col-2"></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Nombre Tipo Permiso*"
                                value={tipoPermiso.descripcion}
                                onChange={ (value) => props.setDescripcion(tipoPermiso, value) }
                                error={tipoPermiso.error.descripcion}
                                message={tipoPermiso.message.descripcion}
                            />
                        </div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado*"}
                                value={tipoPermiso.estado}
                                onChange={ (value) => props.setEstado(tipoPermiso, value) }
                                error={tipoPermiso.error.estado}
                                message={tipoPermiso.message.estado}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    tipoPermiso: state.TipoPermiso,
} );

const mapDispatchToProps = {
    onEdit: TipoPermisoActions.onEdit,
    onLimpiar: TipoPermisoActions.onLimpiar,
    setDescripcion: TipoPermisoActions.setDescripcion,
    setEstado: TipoPermisoActions.setEstado,
    onUpdate: TipoPermisoActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditTipoPermiso );
