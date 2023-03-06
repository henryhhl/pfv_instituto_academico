
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { Functions } from '../../../../utils/functions';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { GrupoActions } from '../../../../redux/actions/ofertaacademica/grupo.action';
import FormHorarioGrupoModal from './modal/form_horario.modal';
import FormAddGrupoParametroCalificacionModal from './modal/form_add_parametrocalificacion.modal';

function ShowGrupo( props ) {
    const { grupo } = props;
    const navigate = useNavigate();
    const params = useParams();

    const [ indexDetailsHorario, setIndexDestailsHorario ] = React.useState(-1);
    const [ visibleDetailsHorario, setVisibleDetailsHorario ] = React.useState(false);

    const [ indexDetailsCalificacion, setIndexDetailsCalificacion ] = React.useState(-1);
    const [ visibleDetailsCalificacion, setVisibleDetailsCalificacion ] = React.useState(false);

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onShow( params.idgrupo );
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
    }

    const onComponentDetailsHorario = () => {
        if ( !visibleDetailsHorario ) return null;
        let detalle = grupo.arraypensum[indexDetailsHorario];
        return (
            <FormHorarioGrupoModal
                visible={visibleDetailsHorario}
                onClose={ () => setVisibleDetailsHorario(false) }
                arraydia={detalle ? detalle.arraydia: []}
                materia={ detalle ? detalle.materia : "" }
                disabled={true}
            />
        );
    };

    const onComponentDetailsParametroCalificacion = () => {
        if ( !visibleDetailsCalificacion ) return null;
        return (
            <FormAddGrupoParametroCalificacionModal 
                visible={visibleDetailsCalificacion}
                onClose={ () => setVisibleDetailsCalificacion(false) }
                arrayparametrocalificacion={grupo.arraypensum[indexDetailsCalificacion]?.arrayparametrocalificacion}
                disabled={true}
            />
        );
    };

    return (
        <>
            { onComponentDetailsHorario() }
            { onComponentDetailsParametroCalificacion() }
            <PaperComponent>
                <CardComponent
                    header={"Detalle Grupo"}
                >
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active show" id="home-tab" 
                                data-toggle="tab" href="#home" role="tab" 
                                aria-controls="home" aria-selected="true"
                            >
                                Información General
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="materiapensum-tab" data-toggle="tab" href="#materiapensum" 
                                role="tab" aria-controls="materiapensum" aria-selected="false"
                            >
                                Detalle Materias
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade pt-4 active show" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="row">
                                <div className='form-group col-2'></div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Grupo*"
                                        value={grupo.sigla}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Estado"
                                        value={ Functions.getValueEstado( grupo.estado ) }
                                        readOnly={true}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className='form-group col-12'>
                                    <ButtonComponent
                                        onClick={onBack}
                                    >
                                        Aceptar
                                    </ButtonComponent>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade pt-4 active" id="materiapensum" role="tabpanel" aria-labelledby="materiapensum-tab">
                            { grupo.arraypensum?.length === 0 &&
                                <div className='card p-0 m-0'>
                                    <div className='card-header'>
                                        <h4>Sin Información</h4>
                                    </div>
                                </div>
                            }
                            <div style={{ minWidth: '100%', width: '100%', maxWidth: '100%', maxHeight: 650, overflowY: 'auto', overflowX: 'hidden', }}>
                                <div className="row">
                                    { grupo.arraypensum?.map( ( item, key ) => {
                                        return (
                                            <div className="col-12 col-sm-6 col-md-12 col-lg-12" key={key}>
                                                <div className="card card-primary position-relative">
                                                    <i className="card-icon text-danger ion ion-ios-paper-outline"
                                                        style={ { position: 'absolute', left: 4, top: 8, fontSize: 20, } }
                                                    ></i>
                                                    <div className="card-body pl-1 pr-1 mt-2">
                                                        <div className='row'>
                                                            <div className="form-group col-4">
                                                                <InputComponent
                                                                    label="Unidad Administrativa"
                                                                    value={item.unidadadministrativa}
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div className="form-group col-2">
                                                                <InputComponent
                                                                    label="Unidad Negocio"
                                                                    value={item.unidadnegocio}
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div className="form-group col-6">
                                                                <InputComponent
                                                                    label="Unidad Academica"
                                                                    value={item.unidadacademica}
                                                                    readOnly
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className="form-group col-6">
                                                                <InputComponent
                                                                    label="Programa"
                                                                    value={item.programa}
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div className="form-group col-6">
                                                                <InputComponent
                                                                    label="Pensum*"
                                                                    value={item.pensum}
                                                                    readOnly
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className="form-group col-6">
                                                                <InputComponent
                                                                    label="Docente*"
                                                                    value={item.docente}
                                                                    readOnly
                                                                /> 
                                                            </div>
                                                            <div className="form-group col-3">
                                                                <InputComponent
                                                                    label="Turno*"
                                                                    value={item.turno}
                                                                    readOnly
                                                                /> 
                                                            </div>
                                                            <div className="form-group col-3">
                                                                <InputComponent
                                                                    label="Periodo*"
                                                                    value={item.gestionperiodo}
                                                                    readOnly
                                                                /> 
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className="form-group col-6">
                                                                <InputComponent
                                                                    label="Materia*"
                                                                    value={item.materia}
                                                                    readOnly
                                                                /> 
                                                            </div>
                                                            <div className="form-group col-3">
                                                                <InputComponent
                                                                    label="Nivel*"
                                                                    value={item.divisionacademica}
                                                                    readOnly
                                                                /> 
                                                            </div>
                                                            <div className="form-group col-3">
                                                                <InputComponent
                                                                    label="Cupo Máximo*"
                                                                    value={item.cupomaximo}
                                                                    readOnly
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className="form-group col-12">
                                                                <ButtonComponent
                                                                    onClick={ () => {
                                                                        setVisibleDetailsHorario(true);
                                                                        setIndexDestailsHorario(key);
                                                                    } }
                                                                >
                                                                    Ver Horarios
                                                                </ButtonComponent>
                                                                <ButtonComponent
                                                                    onClick={ () => {
                                                                        setVisibleDetailsCalificacion(true);
                                                                        setIndexDetailsCalificacion(key);
                                                                    } }
                                                                >
                                                                    Ver Parametros de Calificaciones
                                                                </ButtonComponent>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    } ) }
                                </div>
                            </div>
                            <div className="row">
                                <div className='form-group col-12'>
                                    <ButtonComponent
                                        onClick={onBack}
                                    >
                                        Aceptar
                                    </ButtonComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    grupo: state.Grupo,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onShow: GrupoActions.onShow,
    onLimpiar: GrupoActions.onLimpiar,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowGrupo );
