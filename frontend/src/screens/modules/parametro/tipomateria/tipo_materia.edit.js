
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { EstadoData } from '../../../../data/estado.data';
import { TipoMateriaActions } from '../../../../redux/actions/parametros/tipo_materia.action';

function EditTipoMateria( props ) {
    const { tipoMateria } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onEdit( params.idtipomateria );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Editar Tipo Materia"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(tipoMateria, onBack) }
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
                                label="Sigla*"
                                value={tipoMateria.sigla}
                                onChange={ (value) => props.setSigla(tipoMateria, value) }
                                error={tipoMateria.error.sigla}
                                message={tipoMateria.message.sigla}
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Nombre Tipo Materia*"
                                value={tipoMateria.descripcion}
                                onChange={ (value) => props.setDescripcion(tipoMateria, value) }
                                error={tipoMateria.error.descripcion}
                                message={tipoMateria.message.descripcion}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4"></div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado*"}
                                value={tipoMateria.estado}
                                onChange={ (value) => props.setEstado(tipoMateria, value) }
                                error={tipoMateria.error.estado}
                                message={tipoMateria.message.estado}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    tipoMateria: state.TipoMateria,
} );

const mapDispatchToProps = {
    onLimpiar: TipoMateriaActions.onLimpiar,
    setSigla: TipoMateriaActions.setSigla,
    setDescripcion: TipoMateriaActions.setDescripcion,
    setEstado: TipoMateriaActions.setEstado,
    onEdit: TipoMateriaActions.onEdit,
    onUpdate: TipoMateriaActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditTipoMateria );
