
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { UnidadAdministrativaActions } from '../../../../redux/actions/estructuraacademica/unidad_administrativa.action';
import ListadoUnidadNegocioModal from '../../parametro/unidadnegocio/modal/unidad_negocio_listado.modal';

function CreateUnidadAdministrativa( props ) {
    const { unidadAdministrativa } = props;
    const navigate = useNavigate();
    const [ visibleUnidadNegocio, setVisibleUnidadNegocio ] = React.useState( false );

    React.useEffect( () => {
        props.onCreate();
        return () => {};
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    function onComponentUnidadNegocio() {
        if ( !visibleUnidadNegocio ) return null;
        return (
            <ListadoUnidadNegocioModal
                visible={visibleUnidadNegocio}
                onClose={ () => setVisibleUnidadNegocio(false) }
                onSelect={ (unidadNegocio) => {
                    props.setFKIDUnidadNegocio(unidadAdministrativa, unidadNegocio);
                    setVisibleUnidadNegocio(false);
                } }
            />
        );
    };

    return (
        <>
            { onComponentUnidadNegocio() }
            <PaperComponent>
                <CardComponent
                    header={"Nueva Unidad Administrativa"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(unidadAdministrativa, onBack) }
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
                        <div className="form-group col-3">
                            <InputComponent
                                label="Sigla"
                                value={unidadAdministrativa.sigla}
                                onChange={ (value) => props.setSigla(unidadAdministrativa, value) }
                                error={unidadAdministrativa.error.sigla}
                                message={unidadAdministrativa.message.sigla}
                            />
                        </div>
                        <div className="form-group col-5">
                            <InputComponent
                                label="Nombre Unidad Administrativa"
                                value={unidadAdministrativa.descripcion}
                                onChange={ (value) => props.setDescripcion(unidadAdministrativa, value) }
                                error={unidadAdministrativa.error.descripcion}
                                message={unidadAdministrativa.message.descripcion}
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Unidad Negocio"
                                value={unidadAdministrativa.unidadnegocio}
                                onClick={ () => setVisibleUnidadNegocio(true) }
                                error={unidadAdministrativa.error.fkidunidadnegocio}
                                message={unidadAdministrativa.message.fkidunidadnegocio}
                                readOnly
                                style={{ background: 'white', cursor: 'pointer', }}
                                placeholder="SELECCIONAR UNIDAD NEGOCIO"
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    unidadAdministrativa: state.UnidadAdministrativa,
} );

const mapDispatchToProps = {
    onCreate: UnidadAdministrativaActions.onCreate,
    onLimpiar: UnidadAdministrativaActions.onLimpiar,
    setSigla: UnidadAdministrativaActions.setSigla,
    setDescripcion: UnidadAdministrativaActions.setDescripcion,
    setFKIDUnidadNegocio: UnidadAdministrativaActions.setFKIDUnidadNegocio,
    onStore: UnidadAdministrativaActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateUnidadAdministrativa );
