
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { EstadoData } from '../../../../data/estado.data';
import { TipoIdentificacionActions } from '../../../../redux/actions/persona/tipo_identificacion.action';

function EditTipoIdentificacion( props ) {
    const { tipoIdentificacion } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onEdit( params.idtipoidentificacion );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Editar Tipo Identificación"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(tipoIdentificacion, onBack) }
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
                        <div className="form-group col-4">
                            <InputComponent
                                label="Sigla*"
                                value={tipoIdentificacion.sigla}
                                onChange={ (value) => props.setSigla(tipoIdentificacion, value) }
                                error={tipoIdentificacion.error.sigla}
                                message={tipoIdentificacion.message.sigla}
                            />
                        </div>
                        <div className="form-group col-8">
                            <InputComponent
                                label="Nombre Tipo Identificación*"
                                value={tipoIdentificacion.descripcion}
                                onChange={ (value) => props.setDescripcion(tipoIdentificacion, value) }
                                error={tipoIdentificacion.error.descripcion}
                                message={tipoIdentificacion.message.descripcion}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4"></div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado*"}
                                value={tipoIdentificacion.estado}
                                onChange={ (value) => props.setEstado(tipoIdentificacion, value) }
                                error={tipoIdentificacion.error.estado}
                                message={tipoIdentificacion.message.estado}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    tipoIdentificacion: state.TipoIdentificacion,
} );

const mapDispatchToProps = {
    onEdit: TipoIdentificacionActions.onEdit,
    onLimpiar: TipoIdentificacionActions.onLimpiar,
    setSigla: TipoIdentificacionActions.setSigla,
    setDescripcion: TipoIdentificacionActions.setDescripcion,
    setEstado: TipoIdentificacionActions.setEstado,
    onUpdate: TipoIdentificacionActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditTipoIdentificacion );
