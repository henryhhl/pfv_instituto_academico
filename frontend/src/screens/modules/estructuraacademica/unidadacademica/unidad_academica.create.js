
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { UnidadAcademicaActions } from '../../../../redux/actions/estructuraacademica/unidad_academica.action';
import ListadoUnidadAdministrativaModal from '../unidadadministrativa/modal/unidad_administrativa_listado.modal';

function CreateUnidadAcademica( props ) {
    const { unidadAcademica } = props;
    const navigate = useNavigate();
    const [ visibleUnidadAdministrativa, setVisibleUnidadAdministrativa ] = React.useState( false );

    React.useEffect( () => {
        props.onCreate();
        return () => {};
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    function onComponentUnidadAdministrativa() {
        if ( !visibleUnidadAdministrativa ) return null;
        return (
            <ListadoUnidadAdministrativaModal
                visible={visibleUnidadAdministrativa}
                onClose={ () => setVisibleUnidadAdministrativa(false) }
                onSelect={ (unidadAdminitrativa) => {
                    props.setFKIDUnidadAdministrativa(unidadAcademica, unidadAdminitrativa);
                    setVisibleUnidadAdministrativa(false);
                } }
            />
        );
    };

    return (
        <>
            { onComponentUnidadAdministrativa() }
            <PaperComponent>
                <CardComponent
                    header={"Nueva Unidad Academica"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(unidadAcademica, onBack) }
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
                                label="Código*"
                                value={unidadAcademica.codigo}
                                onChange={ (value) => props.setCodigo(unidadAcademica, value) }
                                error={unidadAcademica.error.codigo}
                                message={unidadAcademica.message.codigo}
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Sigla*"
                                value={unidadAcademica.sigla}
                                onChange={ (value) => props.setSigla(unidadAcademica, value) }
                                error={unidadAcademica.error.sigla}
                                message={unidadAcademica.message.sigla}
                            />
                        </div>
                        <div className="form-group col-6">
                            <InputComponent
                                label="Nombre Unidad Academica*"
                                value={unidadAcademica.descripcion}
                                onChange={ (value) => props.setDescripcion(unidadAcademica, value) }
                                error={unidadAcademica.error.descripcion}
                                message={unidadAcademica.message.descripcion}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-2"></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Unidad Administrativa*"
                                value={unidadAcademica.unidadadministrativa}
                                onClick={ () => setVisibleUnidadAdministrativa(true) }
                                error={unidadAcademica.error.fkidunidadadministrativa}
                                message={unidadAcademica.message.fkidunidadadministrativa}
                                readOnly
                                style={{ background: 'white', cursor: 'pointer', }}
                                placeholder="SELECCIONAR UNIDAD ADMINISTRATIVA"
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Unidad Negocio"
                                value={unidadAcademica.unidadnegocio}
                                readOnly
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    unidadAcademica: state.UnidadAcademica,
} );

const mapDispatchToProps = {
    onCreate: UnidadAcademicaActions.onCreate,
    onLimpiar: UnidadAcademicaActions.onLimpiar,
    setCodigo: UnidadAcademicaActions.setCodigo,
    setSigla: UnidadAcademicaActions.setSigla,
    setDescripcion: UnidadAcademicaActions.setDescripcion,
    setFKIDUnidadAdministrativa: UnidadAcademicaActions.setFKIDUnidadAdministrativa,
    onStore: UnidadAcademicaActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateUnidadAcademica );
