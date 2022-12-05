
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent, TextAreaComponent } from '../../../../components/components';
import { Functions } from '../../../../utils/functions';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { UnidadAdministrativaActions } from '../../../../redux/actions/estructuraacademica/unidad_administrativa.action';

function ShowUnidadAdministrativa( props ) {
    const { unidadAdministrativa } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onShow( params.idunidadadministrativa );
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

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Detalle Unidad Administrativa"}
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
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active show" id="home-tab" 
                                data-toggle="tab" href="#home" role="tab" 
                                aria-controls="home" aria-selected="true"
                            >
                                Información General
                            </a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" id="aula-tab" data-toggle="tab" href="#aula" 
                                role="tab" aria-controls="aula" aria-selected="false"
                            >
                                Aula
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="turno-tab" data-toggle="tab" href="#turno" 
                                role="tab" aria-controls="turno" aria-selected="false"
                            >
                                Turno
                            </a>
                        </li> */}
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade pt-4 active show" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="row">
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Sigla"
                                        value={unidadAdministrativa.sigla}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-5">
                                    <InputComponent
                                        label="Nombre Unidad Administrativa"
                                        value={unidadAdministrativa.descripcion}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Unidad Negocio"
                                        value={unidadAdministrativa.unidadnegocio}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='form-group col-4'></div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Estado"
                                        value={ Functions.getValueEstado( unidadAdministrativa.estado ) }
                                        readOnly={true}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane fade pt-4" id="aula" role="tabpanel" aria-labelledby="aula-tab">
                            <div style={{ minWidth: '100%', width: '100%', maxWidth: '100%', maxHeight: 450, overflowY: 'auto', overflowX: 'hidden', }}>
                                <div className="row">
                                    { unidadAdministrativa.arrayaula.map( ( item, key ) => {
                                        return (
                                            <div className="col-12 col-sm-6 col-md-4 col-lg-4" key={key}>
                                                <div className="card card-sm position-relative card-success">
                                                    <i className="card-icon text-danger ion ion-ios-paper-outline"
                                                        style={ { position: 'absolute', left: -20, top: -28, } }
                                                    ></i>
                                                    <div className="card-body">
                                                        <div className="form-group col-12 pl-1">
                                                            <InputComponent
                                                                label="Aula"
                                                                value={item.aula}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 pl-1">
                                                            <InputComponent
                                                                label="Cupo"
                                                                value={item.cupo}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 pl-1">
                                                            <InputComponent
                                                                label="Estado"
                                                                value={ Functions.getValueEstado( item.estado ) }
                                                                readOnly={true}
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 pl-1">
                                                            <TextAreaComponent
                                                                label="Nota"
                                                                value={item.nota}
                                                                readOnly
                                                                rows={1}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    } ) }
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane fade pt-4" id="turno" role="tabpanel" aria-labelledby="turno-tab">
                            <div style={{ minWidth: '100%', width: '100%', maxWidth: '100%', maxHeight: 450, overflowY: 'auto', overflowX: 'hidden', }}>
                                { unidadAdministrativa.arrayturno.map( ( item, key ) => {
                                    return (
                                        <div className="row" key={key} 
                                            style={{ 
                                                justifyContent: 'center', alignItems: 'center', 
                                                borderBottom: '1px solid #E8E8E8', 
                                            }}
                                        >
                                            <div className="form-group col-1"></div>
                                            <div className="form-group col-6">
                                                <InputComponent
                                                    label="Turno"
                                                    value={item.turno}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="form-group col-4">
                                                <InputComponent
                                                    label="Estado"
                                                    value={ Functions.getValueEstado( item.estado ) }
                                                    readOnly={true}
                                                />
                                            </div>
                                        </div>
                                    );
                                } ) }
                            </div>
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
    onValidateToken: AuthActions.onValidateToken,
    onLimpiar: UnidadAdministrativaActions.onLimpiar,
    onShow: UnidadAdministrativaActions.onShow,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowUnidadAdministrativa );
