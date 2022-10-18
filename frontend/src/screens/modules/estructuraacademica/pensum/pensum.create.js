
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import DatePickerComponent from '../../../../components/date';
import PaperComponent from '../../../../components/paper';
import { PensumActions } from '../../../../redux/actions/estructuraacademica/pensum.action';
import ListadoProgramaModal from '../programa/modal/programa_listado.modal';

function CreatePensum( props ) {
    const { pensum } = props;
    const navigate = useNavigate();
    const [ visiblePrograma, setVisiblePrograma ] = React.useState( false );

    React.useEffect( () => {
        props.onCreate();
        return () => {};
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    function onComponentPrograma() {
        if ( !visiblePrograma ) return null;
        return (
            <ListadoProgramaModal
                visible={visiblePrograma}
                onClose={ () => setVisiblePrograma(false) }
                onSelect={ (programa) => {
                    props.setFKIDPrograma(pensum, programa);
                    setVisiblePrograma(false);
                } }
            />
        );
    };

    return (
        <>
            { onComponentPrograma() }
            <PaperComponent>
                <CardComponent
                    header={"Nuevo Pensum"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(pensum, onBack) }
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
                            <DatePickerComponent
                                label="Fecha Aprobación"
                                value={pensum.fechaaprobacion}
                                onChange={ (value) => props.setFechaAprobacion(pensum, value) }
                                error={pensum.error.fechaaprobacion}
                                message={pensum.message.fechaaprobacion}
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Descripción"
                                value={pensum.descripcion}
                                onChange={ (value) => props.setDescripcion(pensum, value) }
                                error={pensum.error.descripcion}
                                message={pensum.message.descripcion}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-12">
                            <InputComponent
                                label="Programa"
                                value={pensum.programa}
                                onClick={ () => setVisiblePrograma(true) }
                                error={pensum.error.fkidprograma}
                                message={pensum.message.fkidprograma}
                                readOnly
                                style={{ background: 'white', cursor: 'pointer', }}
                                placeholder="SELECCIONAR PROGRAMA"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4">
                            <InputComponent
                                label="Unidad Academica"
                                value={pensum.unidadacademica}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Unidad Negocio"
                                value={pensum.unidadnegocio}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Unidad Administrativa"
                                value={pensum.unidadadministrativa}
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
    pensum: state.Pensum,
} );

const mapDispatchToProps = {
    onCreate: PensumActions.onCreate,
    onLimpiar: PensumActions.onLimpiar,
    setDescripcion: PensumActions.setDescripcion,
    setFechaAprobacion: PensumActions.setFechaAprobacion,
    setFKIDPrograma: PensumActions.setFKIDPrograma,
    onStore: PensumActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreatePensum );
