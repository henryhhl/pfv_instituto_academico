
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import DatePickerComponent from '../../../../components/date';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { GestionPeriodoActions } from '../../../../redux/actions/estructurainstitucional/gestion_periodo.action';

function CreateGestionPeriodo( props ) {
    const { gestionPeriodo } = props;
    const navigate = useNavigate();

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onCreate();
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

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Nuevo Gestión Periodo"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(gestionPeriodo, onBack) }
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
                        <div className="form-group col-3"></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Nombre Periodo*"
                                value={gestionPeriodo.descripcion}
                                onChange={ (value) => props.setDescripcion(gestionPeriodo, value) }
                                error={gestionPeriodo.error.descripcion}
                                message={gestionPeriodo.message.descripcion}
                            />
                        </div>
                        <div className="form-group col-2">
                            <InputComponent
                                label="Orden*"
                                value={gestionPeriodo.orden}
                                onChange={ (value) => props.setOrden(gestionPeriodo, value) }
                                error={gestionPeriodo.error.orden}
                                message={gestionPeriodo.message.orden}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-2"></div>
                        <div className="form-group col-4">
                            <DatePickerComponent
                                label="Fecha Inicio*"
                                value={gestionPeriodo.fechainicio}
                                onChange={ (value) => props.setFechaInicio(gestionPeriodo, value) }
                                error={gestionPeriodo.error.fechainicio}
                                message={gestionPeriodo.message.fechainicio}
                                placeholder="SELECCIONAR FECHA INICIO"
                            />
                        </div>
                        <div className="form-group col-4">
                            <DatePickerComponent
                                label="Fecha Final*"
                                value={gestionPeriodo.fechafinal}
                                onChange={ (value) => props.setFechaFinal(gestionPeriodo, value) }
                                error={gestionPeriodo.error.fechafinal}
                                message={gestionPeriodo.message.fechafinal}
                                placeholder="SELECCIONAR FECHA FINAL"
                                disabled={gestionPeriodo.fechainicio.length === 0}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    gestionPeriodo: state.GestionPeriodo,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onCreate: GestionPeriodoActions.onCreate,
    onLimpiar: GestionPeriodoActions.onLimpiar,
    setDescripcion: GestionPeriodoActions.setDescripcion,
    setOrden: GestionPeriodoActions.setOrden,
    setFechaInicio: GestionPeriodoActions.setFechaInicio,
    setFechaFinal: GestionPeriodoActions.setFechaFinal,
    onStore: GestionPeriodoActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateGestionPeriodo );
