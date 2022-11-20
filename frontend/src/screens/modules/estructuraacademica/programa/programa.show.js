
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Functions } from '../../../../utils/functions';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { ProgramaActions } from '../../../../redux/actions/estructuraacademica/programa.action';

function ShowPrograma( props ) {
    const { programa } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onShow( params.idprograma );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Detalle Programa"}
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
                            <a className="nav-link" id="mallacurricular-tab" data-toggle="tab" href="#mallacurricular" 
                                role="tab" aria-controls="mallacurricular" aria-selected="false"
                            >
                                Malla Curricular
                            </a>
                        </li> */}
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade pt-4 active show" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="row">
                                <div className="form-group col-2"></div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Código"
                                        value={programa.codigo}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Sigla"
                                        value={programa.sigla}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12">
                                    <InputComponent
                                        label="Nombre de Programa"
                                        value={programa.descripcion}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Unidad Academica"
                                        value={programa.unidadacademica}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Unidad Administrativa"
                                        value={programa.unidadadministrativa}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Unidad Negocio"
                                        value={programa.unidadnegocio}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-2"></div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Nivel Academico"
                                        value={programa.nivelacademico}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Modalidad Academica"
                                        value={programa.modalidadacademica}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='form-group col-4'></div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Estado"
                                        value={ Functions.getValueEstado( programa.estado ) }
                                        readOnly={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade pt-4" id="mallacurricular" role="tabpanel" aria-labelledby="mallacurricular-tab">
                            <div className="row">
                                { programa.arraymallacurricular?.map( ( item, key ) => {
                                    const indexMallaCurricular = programa.arraymallacurricular.length - 1 - key;
                                    const arrayMateria = programa.arraymallacurricular[indexMallaCurricular].arraymateria;
                                    const mallaCurricular = programa.arraymallacurricular[indexMallaCurricular];
                                    return (
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12" key={key}>
                                            <div className="card card-sm position-relative card-success" draggable>
                                                <div className="card-options dropdown">
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="form-group col-1">
                                                            <div
                                                                style={ {
                                                                    width: 20,
                                                                    writingMode: 'vertical-lr',
                                                                    transform: 'rotate(180deg)',
                                                                    textAlign: 'center',
                                                                    fontSize: 15,
                                                                } }
                                                            >
                                                                { mallaCurricular.divisionacademica }
                                                            </div>
                                                        </div>
                                                        <div className="form-group col-11">
                                                            <div className="row">
                                                                <div className='col-12'>
                                                                    <div style={{ maxHeight: 300, width: '100%', overflowY: 'hidden', overflowX: 'auto', whiteSpace: 'nowrap', }}>
                                                                        { arrayMateria.map( (detalle, index) => {
                                                                            return (
                                                                                <div className="card p-2 card-primary mr-2" 
                                                                                    key={index} 
                                                                                    style={{ 
                                                                                        width: 200, display: 'inline-block', 
                                                                                        cursor: 'pointer', border: '2px solid #574B90',
                                                                                    }}
                                                                                    draggable
                                                                                >
                                                                                    <div className="card-header pb-2 border-success">
                                                                                        <h4 className='text-primary'> 
                                                                                            Materia 
                                                                                        </h4>
                                                                                    </div>
                                                                                    <div className="card-header pb-2 border-success">
                                                                                        <h4> 
                                                                                            <span className='text-danger'>SIGLA: </span>
                                                                                            {detalle.siglamateria} 
                                                                                        </h4>
                                                                                    </div>
                                                                                    <div className="card-header pt-2 pb-2">
                                                                                        <h4> {detalle.materia} </h4>
                                                                                    </div>
                                                                                </div>
                                                                            ); 
                                                                        } ) }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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
    programa: state.Programa,
} );

const mapDispatchToProps = {
    onShow: ProgramaActions.onShow,
    onLimpiar: ProgramaActions.onLimpiar,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowPrograma );
