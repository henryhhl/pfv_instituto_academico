
import React from 'react';
import { connect } from 'react-redux';
import CardComponent from '../../../../components/card';
import { useNavigate, useParams } from 'react-router-dom';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent, TextAreaComponent } from '../../../../components/components';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { PensumActions } from '../../../../redux/actions/estructuraacademica/pensum.action';
import { Functions } from '../../../../utils/functions';

function ShowPensum( props ) {
    const { pensum } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onShow( params.idpensum );
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
                    header={"Detalle Pensum"}
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
                        <li className="nav-item">
                            <a className="nav-link" id="mallacurricular-tab" data-toggle="tab" href="#mallacurricular" 
                                role="tab" aria-controls="mallacurricular" aria-selected="false"
                            >
                                Materias
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade pt-4 active show" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="row">
                                <div className="form-group col-1"></div>
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Fecha Aprobación"
                                        value={pensum.fechaaprobacion}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group col-7">
                                    <InputComponent
                                        label="Nombre de Pensum"
                                        value={pensum.descripcion}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12">
                                    <TextAreaComponent 
                                        label="Nota"
                                        value={pensum.nota}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12">
                                    <InputComponent
                                        label="Nombre de Programa"
                                        value={pensum.programa}
                                        readOnly
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
                            <div className='row'>
                                <div className='form-group col-2'></div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Estado Proceso"
                                        value={ pensum.estadoproceso }
                                        readOnly={true}
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Estado"
                                        value={ Functions.getValueEstado( pensum.estado ) }
                                        readOnly={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade pt-4" id="mallacurricular" role="tabpanel" aria-labelledby="mallacurricular-tab">
                            <div className="row">
                                { pensum.arraydivisionacademica?.map( ( item, key ) => {
                                    const last = pensum.arraydivisionacademica.length - 1 - key;
                                    const arrayMateria = pensum.arraydivisionacademica[last].arraymateria;
                                    const element = pensum.arraydivisionacademica[last];
                                    return (
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12" key={key}>
                                            <div className="card card-sm position-relative card-success" draggable>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="form-group col-1">
                                                            <div
                                                                style={ {
                                                                    width: 20, writingMode: 'vertical-lr',
                                                                    transform: 'rotate(180deg)',
                                                                    textAlign: 'center', fontSize: 15,
                                                                } }
                                                            >
                                                                { element.divisionacademica.descripcion }
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
                                                                                        width: 240, display: 'inline-block', 
                                                                                        cursor: 'pointer', border: '2px solid #574B90',
                                                                                    }}
                                                                                    draggable
                                                                                >
                                                                                    <div className="card-header pb-2">
                                                                                        <h4 className='text-primary'> 
                                                                                            {" "} 
                                                                                        </h4>
                                                                                    </div>
                                                                                    <div className="card-header pt-2 pb-2 border-success">
                                                                                        <h4 style={{ display: 'block', whiteSpace: 'initial', fontSize: 9, }}> 
                                                                                            <span className='text-danger'>TIPO MATERIA: </span>
                                                                                            {detalle.tipomateria.descripcion} 
                                                                                        </h4>
                                                                                    </div>
                                                                                    <div className="card-header pt-2 pb-2 border-success">
                                                                                        <h4 style={{ display: 'block', whiteSpace: 'initial', fontSize: 9, }}> 
                                                                                            <span className='text-danger'>CÓDIGO: </span>
                                                                                            {detalle.materia.codigo} 
                                                                                        </h4>
                                                                                    </div>
                                                                                    <div className="card-header pt-2 pb-2 border-success">
                                                                                        <h4 style={{ display: 'block', whiteSpace: 'initial', fontSize: 9, }}> 
                                                                                            <span className='text-danger'>SIGLA: </span>
                                                                                            {detalle.materia.sigla} 
                                                                                        </h4>
                                                                                    </div>
                                                                                    <div className="card-header pt-2 pb-2">
                                                                                        <h4 style={{ display: 'block', whiteSpace: 'initial', fontSize: 9, }}> 
                                                                                            <span className='text-danger'>MATERIA: </span>
                                                                                            {detalle.materia.nombrelargo} 
                                                                                        </h4>
                                                                                    </div>
                                                                                    <div className="card-header pt-2 pb-2">
                                                                                        <h4 style={{ display: 'block', whiteSpace: 'initial', fontSize: 9, }}> 
                                                                                            <span className='float-left'>
                                                                                                <span className='text-danger'>NOTA MIN.: </span>
                                                                                                {detalle.notaminima} 
                                                                                            </span>
                                                                                            <span className='float-right'>
                                                                                                <span className='text-danger'>NOTA MAX.: </span>
                                                                                                {detalle.notamaxima} 
                                                                                            </span>
                                                                                        </h4>
                                                                                    </div>
                                                                                    <div className="card-header pt-2 pb-2">
                                                                                        <h4 style={{ display: 'block', whiteSpace: 'initial', fontSize: 9, }}> 
                                                                                            <span className='float-left'>
                                                                                                <span className='text-danger'>H. T.: </span>
                                                                                                {detalle.horateorica} 
                                                                                            </span>
                                                                                            <span className='float-right'>
                                                                                                <span className='text-danger'>H. P.: </span>
                                                                                                {detalle.horapractica} 
                                                                                            </span>
                                                                                        </h4>
                                                                                    </div>
                                                                                    <div className="card-header pt-2 pb-2">
                                                                                        <h4 style={{ display: 'block', whiteSpace: 'initial', fontSize: 9, }}> 
                                                                                            <span className='float-left'>
                                                                                                <span className='text-danger'>H. S.: </span>
                                                                                                {detalle.horasociales} 
                                                                                            </span>
                                                                                            <span className='float-right'>
                                                                                                <span className='text-danger'>CUPO.: </span>
                                                                                                {detalle.cuporequerido} 
                                                                                            </span>
                                                                                        </h4>
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
    pensum: state.Pensum,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onShow: PensumActions.onShow,
    onLimpiar: PensumActions.onLimpiar,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowPensum );
