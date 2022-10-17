
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { EstadoData } from '../../../../data/estado.data';
import { UnidadAcademicaActions } from '../../../../redux/actions/estructuraacademica/unidad_academica.action';
import ListadoUnidadAdministrativaModal from '../unidadadministrativa/modal/unidad_administrativa_listado.modal';

function EditUnidadAcademica( props ) {
    const { unidadAcademica } = props;
    const navigate = useNavigate();
    const params = useParams();
    const [ visibleUnidadAdministrativa, setVisibleUnidadAdministrativa ] = React.useState( false );

    React.useEffect( () => {
        props.onEdit( params.idunidadacademica );
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
                                onClick={ () => props.onUpdate(unidadAcademica, onBack) }
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
                        <div className="form-group col-4">
                            <InputComponent
                                label="Código"
                                value={unidadAcademica.codigo}
                                onChange={ (value) => props.setCodigo(unidadAcademica, value) }
                                error={unidadAcademica.error.codigo}
                                message={unidadAcademica.message.codigo}
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Sigla"
                                value={unidadAcademica.sigla}
                                onChange={ (value) => props.setSigla(unidadAcademica, value) }
                                error={unidadAcademica.error.sigla}
                                message={unidadAcademica.message.sigla}
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Descripción"
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
                                label="Unidad Administrativa"
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
                    <div className="row">
                        <div className="form-group col-4"></div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado"}
                                value={unidadAcademica.estado}
                                onChange={ (value) => props.setEstado(unidadAcademica, value) }
                                error={unidadAcademica.error.estado}
                                message={unidadAcademica.message.estado}
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
    onEdit: UnidadAcademicaActions.onEdit,
    onLimpiar: UnidadAcademicaActions.onLimpiar,
    setCodigo: UnidadAcademicaActions.setCodigo,
    setSigla: UnidadAcademicaActions.setSigla,
    setDescripcion: UnidadAcademicaActions.setDescripcion,
    setFKIDUnidadAdministrativa: UnidadAcademicaActions.setFKIDUnidadAdministrativa,
    setEstado: UnidadAcademicaActions.setEstado,
    onUpdate: UnidadAcademicaActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditUnidadAcademica );