
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { TipoMateriaActions } from '../../../../redux/actions/parametros/tipo_materia.action';

function CreateTipoMateria( props ) {
    const { tipoMateria } = props;
    const navigate = useNavigate();

    React.useEffect( () => {
        props.onCreate();
        return () => {};
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Nuevo Tipo Materia"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(tipoMateria, onBack) }
                            >
                                Guardar
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
    onCreate: TipoMateriaActions.onCreate,
    setSigla: TipoMateriaActions.setSigla,
    setDescripcion: TipoMateriaActions.setDescripcion,
    onStore: TipoMateriaActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateTipoMateria );
