
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent, TextAreaComponent } from '../../../../components/components';
import { Functions } from '../../../../utils/functions';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { CursoActions } from '../../../../redux/actions/ofertaacademica/curso.action';

function ShowCurso( props ) {
    const { curso } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onShow( params.idcurso );
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
                    header={"Detalle Curso"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={onBack}
                            >
                                Aceptar
                            </ButtonComponent>
                        </>
                    }
                >
                    <div className="row">
                        <div className="form-group col-6">
                            <InputComponent
                                label="Unidad Academica*"
                                value={curso.unidadacademica}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Unidad Administrativa"
                                value={curso.unidadadministrativa}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Unidad Negocio"
                                value={curso.unidadnegocio}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-3">
                            <InputComponent
                                label="Sigla*"
                                value={curso.sigla}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-6">
                            <InputComponent
                                label="Nombre de Curso*"
                                value={curso.descripcion}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Modalidad Academica*"
                                value={curso.modalidadacademica}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <InputComponent
                                label="Materia*"
                                value={curso.materia}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Turno*"
                                value={curso.turno}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Cupo*"
                                value={curso.cupo}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-3">
                            <InputComponent
                                label="Periodo*"
                                value={curso.gestionperiodo}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Fecha Inicio*"
                                value={curso.fechainicio}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Fecha Final*"
                                value={curso.fechafinal}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Cant. Hora*"
                                value={curso.cantidadhora}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-2"></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Inversión Base*"
                                value={curso.inversionbase}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Estado*"
                                value={ Functions.getValueEstado( curso.estado ) }
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='card p-0 m-0'>
                        <div className='card-header p-0'>
                            <h4>Docente</h4>
                        </div>
                    </div>
                    { curso.arraydocente.length === 0 &&
                        <div className='card p-0 m-0'>
                            <div className='card-header'>
                                <h4>Sin Información</h4>
                            </div>
                        </div>
                    }
                    <div style={{ minWidth: '100%', width: '100%', maxWidth: '100%', maxHeight: 380, overflowY: 'auto', overflowX: 'hidden', }}>
                        <div className="row">
                            { curso.arraydocente.map( ( item, key ) => {
                                return (
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-4" key={key}>
                                        <div className="card card-sm position-relative card-success">
                                            <i className="card-icon text-danger ion ion-ios-paper-outline"
                                                style={ { position: 'absolute', left: -20, top: -28, } }
                                            ></i>
                                            <div className="card-body">
                                                <div className="form-group col-12 pl-1">
                                                    <InputComponent
                                                        label={`Docente*`}
                                                        value={item.docente}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="form-group col-12 pl-1">
                                                    <TextAreaComponent
                                                        label="Contenido"
                                                        value={item.contenido}
                                                        readOnly
                                                        rows={2}
                                                    />
                                                </div>
                                                <div className="form-group col-12 pl-1">
                                                    <InputComponent
                                                        label="Estado"
                                                        value={ Functions.getValueEstado( item.estado ) }
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            } ) }
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <TextAreaComponent
                                label="Pre Requisito"
                                value={curso.prerequisito}
                                readOnly
                                rows={2}
                            />
                        </div>
                        <div className="form-group col-6">
                            <TextAreaComponent
                                label="Objetivo"
                                value={curso.objetivo}
                                readOnly
                                rows={2}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    curso: state.Curso,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onShow: CursoActions.onShow,
    onLimpiar: CursoActions.onLimpiar,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowCurso  );
