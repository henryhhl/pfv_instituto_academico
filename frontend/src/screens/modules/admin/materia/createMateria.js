
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { MateriaActions } from '../../../../redux/actions/materiaActions';
import ListadoTipoMateriaModal from '../tipomateria/modal/listado.modal';

function CreateMateria( props ) {
    const { materia } = props;
    const navigate = useNavigate();
    const [ visibleTipoMateria, setVisibleTipoMateria ] = React.useState( false );

    React.useEffect( () => {
        props.onCreate();
        return () => {};
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    function onComponentTipoMateria() {
        if ( !visibleTipoMateria ) return null;
        return (
            <ListadoTipoMateriaModal
                visible={visibleTipoMateria}
                onClose={ () => setVisibleTipoMateria(false) }
                onSelect={ (tipoMateria) => {
                    props.setFKIDTipoMateria(materia, tipoMateria);
                    setVisibleTipoMateria(false);
                } }
            />
        );
    };

    return (
        <>
            { onComponentTipoMateria() }
            <div className="main-content">
                <section className="section">
                    <h1 className="section-header">
                        <div>
                        </div>
                    </h1>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Nuevo Materia</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Código"
                                                value={materia.codigo}
                                                onChange={ (value) => props.setCodigo(materia, value) }
                                                error={materia.error.codigo}
                                                message={materia.message.codigo}
                                            />
                                        </div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Sigla"
                                                value={materia.sigla}
                                                onChange={ (value) => props.setSigla(materia, value) }
                                                error={materia.error.sigla}
                                                message={materia.message.sigla}
                                            />
                                        </div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Tipo"
                                                value={materia.tipomateria}
                                                onClick={ () => setVisibleTipoMateria(true) }
                                                error={materia.error.fkidtipomateria}
                                                message={materia.message.fkidtipomateria}
                                                readOnly
                                                style={{ background: 'white', cursor: 'pointer', }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Nombre Largo"
                                                value={materia.nombrelargo}
                                                onChange={ (value) => props.setNombreLargo(materia, value) }
                                                error={materia.error.nombrelargo}
                                                message={materia.message.nombrelargo}
                                            />
                                        </div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Nombre Corto"
                                                value={materia.nombrecorto}
                                                onChange={ (value) => props.setNombreCorto(materia, value) }
                                                error={materia.error.nombrecorto}
                                                message={materia.message.nombrecorto}
                                            />
                                        </div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Nombre Alternativo"
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
                                                label="Créditos"
                                                value={materia.creditos}
                                                onChange={ (value) => props.setCredito(materia, value) }
                                                error={materia.error.creditos}
                                                message={materia.message.creditos}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    materia: state.Materia,
} );

const mapDispatchToProps = {
    onLimpiar: MateriaActions.onLimpiar,
    onCreate: MateriaActions.onCreate,
    setFKIDTipoMateria: MateriaActions.setFKIDTipoMateria,
    setCodigo: MateriaActions.setCodigo,
    setSigla: MateriaActions.setSigla,
    setNombreLargo: MateriaActions.setNombreLargo,
    setNombreCorto: MateriaActions.setNombreCorto,
    setNombreAlternativo: MateriaActions.setNombreAlternativo,
    setCredito: MateriaActions.setCredito,
    onStore: MateriaActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateMateria );
