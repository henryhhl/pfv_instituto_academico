
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { MateriaActions } from '../../../../redux/actions/parametros/materia.action';

function CreateMateria( props ) {
    const { materia } = props;
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
                    header={"Nuevo Materia"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(materia, onBack) }
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
                                label="Código*"
                                value={materia.codigo}
                                onChange={ (value) => props.setCodigo(materia, value) }
                                error={materia.error.codigo}
                                message={materia.message.codigo}
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Sigla*"
                                value={materia.sigla}
                                onChange={ (value) => props.setSigla(materia, value) }
                                error={materia.error.sigla}
                                message={materia.message.sigla}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4">
                            <InputComponent
                                label="Nombre Largo*"
                                value={materia.nombrelargo}
                                onChange={ (value) => props.setNombreLargo(materia, value) }
                                error={materia.error.nombrelargo}
                                message={materia.message.nombrelargo}
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Nombre Corto*"
                                value={materia.nombrecorto}
                                onChange={ (value) => props.setNombreCorto(materia, value) }
                                error={materia.error.nombrecorto}
                                message={materia.message.nombrecorto}
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Nombre Alternativo*"
                                value={materia.nombrealternativo}
                                onChange={ (value) => props.setNombreAlternativo(materia, value) }
                                error={materia.error.nombrealternativo}
                                message={materia.message.nombrealternativo}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4"></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Créditos*"
                                value={materia.creditos}
                                onChange={ (value) => props.setCredito(materia, value) }
                                error={materia.error.creditos}
                                message={materia.message.creditos}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    materia: state.Materia,
} );

const mapDispatchToProps = {
    onLimpiar: MateriaActions.onLimpiar,
    onCreate: MateriaActions.onCreate,
    setCodigo: MateriaActions.setCodigo,
    setSigla: MateriaActions.setSigla,
    setNombreLargo: MateriaActions.setNombreLargo,
    setNombreCorto: MateriaActions.setNombreCorto,
    setNombreAlternativo: MateriaActions.setNombreAlternativo,
    setCredito: MateriaActions.setCredito,
    onStore: MateriaActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateMateria );
