
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import DatePickerComponent from '../../../../components/date';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import { EstadoData } from '../../../../data/estado.data';
import ListadoOportunidadModal from '../oportunidad/modal/oportunidad_listado.modal';
import ListadoEstadoNegocioModal from '../estadonegocio/modal/estadonegocio_listado.modal';
import ListadoTurnoModal from '../../estructurainstitucional/turno/modal/turno_listado.modal';
import ListadoProgramaModal from '../../estructuraacademica/programa/modal/programa_listado.modal';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { NegocioActions } from '../../../../redux/actions/oportunidad/negocio.action';

function EditNegocio( props ) {
    const { negocio } = props;
    const navigate = useNavigate();
    const params = useParams();

    const [ visiblePrograma, setVisiblePrograma ] = React.useState(false);
    const [ visibleTurno, setVisibleTurno ] = React.useState(false);
    const [ visibleEstadoNegocio, setVisibleEstadoNegocio ] = React.useState(false);
    const [ visibleOportunidad, setVisibleOportunidad ] = React.useState(false);

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onEdit( params.idnegocio );
            }
        } );
        return () => {};
    }, [] );

    const onLogin = () => {
        navigate( '/login' );
    };

    const onBack = () => {
        props.onLimpiar();
        navigate(-1);
    };

    const onComponentPrograma = () => {
        if ( !visiblePrograma ) return null;
        return (
            <ListadoProgramaModal
                visible={visiblePrograma}
                onClose={ () => setVisiblePrograma(false) }
                onSelect={ (programa) => {
                    props.setFKIDPrograma(negocio, programa);
                    setVisiblePrograma(false);
                } }
            />
        );
    };

    const onComponentTurno = () => {
        if ( !visibleTurno ) return null;
        return (
            <ListadoTurnoModal
                visible={visibleTurno}
                onClose={ () => setVisibleTurno(false) }
                onSelect={ (turno) => {
                    props.setFKIDTurno(negocio, turno);
                    setVisibleTurno(false);
                } }
            />
        );
    };

    const onComponentEstadoNegocio = () => {
        if ( !visibleEstadoNegocio ) return null;
        return (
            <ListadoEstadoNegocioModal
                visible={visibleEstadoNegocio}
                onClose={ () => setVisibleEstadoNegocio(false) }
                onSelect={ (estadoNegocio) => {
                    props.setFKIDTurno(negocio, estadoNegocio);
                    setVisibleEstadoNegocio(false);
                } }
            />
        );
    };

    const onComponentOportunidad = () => {
        if ( !visibleOportunidad ) return null;
        return (
            <ListadoOportunidadModal
                visible={visibleOportunidad}
                onClose={ () => setVisibleOportunidad(false) }
                onSelect={ (oportunidad) => {
                    props.setFKIDOportunidad(negocio, oportunidad);
                    setVisibleOportunidad(false);
                } }
            />
        );
    };

    return (
        <>
            { onComponentPrograma() }
            { onComponentTurno() }
            { onComponentEstadoNegocio() }
            { onComponentOportunidad() }
            <PaperComponent>
                <CardComponent
                    header={"Editar Negocio"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(negocio, onBack) }
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
                        <div className="form-group col-6">
                            <InputComponent
                                label="Programa*"
                                value={negocio.programa}
                                onClick={ () => setVisiblePrograma(true) }
                                error={negocio.error.fkidprograma}
                                message={negocio.message.fkidprograma}
                                readOnly
                                style={{ background: 'white', cursor: 'pointer', }}
                                placeholder="SELECCIONAR PROGRAMA"
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Turno*"
                                value={negocio.turno}
                                onClick={ () => setVisibleTurno(true) }
                                error={negocio.error.fkidturno}
                                message={negocio.message.fkidturno}
                                readOnly
                                style={{ background: 'white', cursor: 'pointer', }}
                                placeholder="SELECCIONAR TURNO"
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Estado Negocio*"
                                value={negocio.estadonegocio}
                                onClick={ () => setVisibleEstadoNegocio(true) }
                                error={negocio.error.fkidestadonegocio}
                                message={negocio.message.fkidestadonegocio}
                                readOnly
                                style={{ background: 'white', cursor: 'pointer', }}
                                placeholder="SELECCIONAR ESTADO NEGOCIO"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-12">
                            <InputComponent
                                label="Oportunidad*"
                                value={negocio.oportunidad}
                                onClick={ () => setVisibleOportunidad(true) }
                                error={negocio.error.fkidoportunidad}
                                message={negocio.message.fkidoportunidad}
                                readOnly
                                style={{ background: 'white', cursor: 'pointer', }}
                                placeholder="SELECCIONAR OPORTUNIDAD"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4">
                            <DatePickerComponent
                                label="Fecha Inicio*"
                                value={negocio.fechainicio}
                                onChange={ (value) => props.setFechaInicio(negocio, value) }
                                error={negocio.error.fechainicio}
                                message={negocio.message.fechainicio}
                                placeholder="SELECCIONAR FECHA INICIO"
                            />
                        </div>
                        <div className="form-group col-4">
                            <DatePickerComponent
                                label="Fecha CIERRE*"
                                value={negocio.fechacierre}
                                onChange={ (value) => props.setFechaCierre(negocio, value) }
                                error={negocio.error.fechacierre}
                                message={negocio.message.fechacierre}
                                placeholder="SELECCIONAR FECHA CIERRE"
                                disabled={negocio.fechainicio.length === 0}
                            />
                        </div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado*"}
                                value={negocio.estado}
                                onChange={ (value) => props.setEstado(negocio, value) }
                                error={negocio.error.estado}
                                message={negocio.message.estado}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    negocio: state.Negocio,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onEdit: NegocioActions.onEdit,
    onLimpiar: NegocioActions.onLimpiar,
    setFKIDPrograma: NegocioActions.setFKIDPrograma,
    setFKIDTurno: NegocioActions.setFKIDTurno,
    setFKIDEstadoNegocio: NegocioActions.setFKIDEstadoNegocio,
    setFKIDOportunidad: NegocioActions.setFKIDOportunidad,
    setFechaInicio: NegocioActions.setFechaInicio,
    setFechaCierre: NegocioActions.setFechaCierre,
    setEstado: NegocioActions.setEstado,
    onUpdate: NegocioActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditNegocio );
