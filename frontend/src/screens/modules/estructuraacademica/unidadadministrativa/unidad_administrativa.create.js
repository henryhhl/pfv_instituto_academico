
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import { Button, Tooltip } from 'antd';
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent, SelectComponent, TextAreaComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { EstadoData } from '../../../../data/estado.data';
import { UnidadAdministrativaActions } from '../../../../redux/actions/estructuraacademica/unidad_administrativa.action';
import ListadoUnidadNegocioModal from '../../parametro/unidadnegocio/modal/unidad_negocio_listado.modal';
import ListadoTurnoModal from '../../estructurainstitucional/turno/modal/turno_listado.modal';
import ListadoAulaModal from '../../estructurainstitucional/aula/modal/aula_listado.modal';

function CreateUnidadAdministrativa( props ) {
    const { unidadAdministrativa } = props;
    const navigate = useNavigate();

    const [ visibleUnidadNegocio, setVisibleUnidadNegocio ] = React.useState(false);

    const [ indexDetailsTurno, setIndexDestailsTurno ] = React.useState(-1);
    const [ visibleTurno, setVisibleTurno ] = React.useState(false);

    const [ indexDetailsAula, setIndexDestailsAula ] = React.useState(-1);
    const [ visibleAula, setVisibleAula ] = React.useState(false);

    React.useEffect( () => {
        props.onCreate();
        return () => {};
    }, [] );

    const onBack = () => {
        props.onLimpiar();
        navigate(-1);
    }

    const onComponentUnidadNegocio = () => {
        if ( !visibleUnidadNegocio ) return null;
        return (
            <ListadoUnidadNegocioModal
                visible={visibleUnidadNegocio}
                onClose={ () => setVisibleUnidadNegocio(false) }
                onSelect={ (unidadNegocio) => {
                    props.setFKIDUnidadNegocio(unidadAdministrativa, unidadNegocio);
                    setVisibleUnidadNegocio(false);
                } }
            />
        );
    };

    const existTurno = ( idturno ) => {
        for (let index = 0; index < unidadAdministrativa.arrayturno.length; index++) {
            const element = unidadAdministrativa.arrayturno[index];
            if ( element.fkidturno === idturno ) return true;
        }
        return false;
    };

    const onComponentTurnoDetalle = () => {
        if ( !visibleTurno ) return null;
        return (
            <ListadoTurnoModal
                visible={visibleTurno}
                onClose={ () => setVisibleTurno(false) }
                onSelect={ (turno) => {
                    if ( !existTurno( turno.idturno ) ) {
                        let detalle = unidadAdministrativa.arrayturno[indexDetailsTurno];
                        detalle.fkidturno = turno.idturno;
                        detalle.turno = turno.descripcion;
                        props.onChange(unidadAdministrativa);
                        setVisibleTurno(false);
                    } else {
                        toastr.warning( 'Turno ya seleccionado.', '', { closeButton: true, progressBar: true, } );
                    }
                } }
            />
        );
    };

    const existAula = ( idaula ) => {
        for (let index = 0; index < unidadAdministrativa.arrayaula.length; index++) {
            const element = unidadAdministrativa.arrayaula[index];
            if ( element.fkidaula === idaula ) return true;
        }
        return false;
    };

    const onComponentAulaDetalle = () => {
        if ( !visibleAula ) return null;
        return (
            <ListadoAulaModal
                visible={visibleAula}
                onClose={ () => setVisibleAula(false) }
                onSelect={ (aula) => {
                    if ( !existAula( aula.idaula ) ) {
                        let detalle = unidadAdministrativa.arrayaula[indexDetailsAula];
                        detalle.fkidaula = aula.idaula;
                        detalle.aula = aula.descripcion;
                        props.onChange(unidadAdministrativa);
                        setVisibleAula(false);
                    } else {
                        toastr.warning( 'Aula ya seleccionado.', '', { closeButton: true, progressBar: true, } );
                    }
                } }
            />
        );
    };

    return (
        <>
            { onComponentUnidadNegocio() }
            { onComponentTurnoDetalle() }
            { onComponentAulaDetalle() }
            <PaperComponent>
                <CardComponent
                    header={"Nueva Unidad Administrativa"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(unidadAdministrativa, onBack) }
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
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade pt-4 active show" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="row">
                                <div className="form-group col-3">
                                    <InputComponent
                                        label="Sigla*"
                                        value={unidadAdministrativa.sigla}
                                        onChange={ (value) => props.setSigla(unidadAdministrativa, value) }
                                        error={unidadAdministrativa.error.sigla}
                                        message={unidadAdministrativa.message.sigla}
                                    />
                                </div>
                                <div className="form-group col-5">
                                    <InputComponent
                                        label="Nombre Unidad Administrativa*"
                                        value={unidadAdministrativa.descripcion}
                                        onChange={ (value) => props.setDescripcion(unidadAdministrativa, value) }
                                        error={unidadAdministrativa.error.descripcion}
                                        message={unidadAdministrativa.message.descripcion}
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <InputComponent
                                        label="Unidad Negocio*"
                                        value={unidadAdministrativa.unidadnegocio}
                                        onClick={ () => setVisibleUnidadNegocio(true) }
                                        error={unidadAdministrativa.error.fkidunidadnegocio}
                                        message={unidadAdministrativa.message.fkidunidadnegocio}
                                        readOnly
                                        style={{ background: 'white', cursor: 'pointer', }}
                                        placeholder="SELECCIONAR UNIDAD NEGOCIO"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane fade pt-4" id="aula" role="tabpanel" aria-labelledby="aula-tab">
                            <div className="row">
                                <div className="form-group col-12">
                                    <ButtonComponent
                                        fullWidth
                                        onClick={props.onAddRowAula}
                                    >
                                        Agregar
                                    </ButtonComponent>
                                </div>
                            </div>
                            <div style={{ minWidth: '100%', width: '100%', maxWidth: '100%', maxHeight: 450, overflowY: 'auto', overflowX: 'hidden', }}>
                                <div className="row">
                                    { unidadAdministrativa.arrayaula.map( ( item, key ) => {
                                        return (
                                            <div className="col-12 col-sm-6 col-md-4 col-lg-4" key={key}>
                                                <div className="card card-sm position-relative card-success">
                                                    <i className="card-icon text-danger ion ion-ios-paper-outline"
                                                        style={ { position: 'absolute', left: -20, top: -28, } }
                                                    ></i>
                                                    <div className="card-options dropdown">
                                                        <CloseOutlined
                                                            style={ {
                                                                padding: 4, borderRadius: 50, background: 'white', 
                                                                fontSize: 12, fontWeight: 'bold', boxShadow: '0 0 5px 0 #222',
                                                                position: 'relative', top: -8, left: 8, cursor: 'pointer',
                                                            } }
                                                            onClick={() => {
                                                                props.onDeleteRowAula(key);
                                                            } }
                                                        />
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="form-group col-12 pl-1">
                                                            <InputComponent
                                                                label="Aula"
                                                                value={item.aula}
                                                                onClick={ () => {
                                                                    setIndexDestailsAula(key);
                                                                    setVisibleAula(true);
                                                                } }
                                                                readOnly
                                                                style={{ background: 'white', cursor: 'pointer', }}
                                                                placeholder="SELECCIONAR AULA"
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 pl-1">
                                                            <InputComponent
                                                                label="Cupo"
                                                                value={item.cupo}
                                                                onChange={ (value) => {
                                                                    if ( value === "" ) value = 0;
                                                                    if ( !isNaN( value ) ) {
                                                                        if ( parseInt( value ) >= 0 ) {
                                                                            item.cupo = parseInt(value);
                                                                            props.onChange(unidadAdministrativa);
                                                                        }
                                                                    }
                                                                } }
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 pl-1">
                                                            <SelectComponent 
                                                                data={EstadoData}
                                                                label={"Estado"}
                                                                value={item.estado}
                                                                onChange={ (value) => {
                                                                    item.estado = value;
                                                                    props.onChange(unidadAdministrativa);
                                                                } }
                                                                disabledDefault={true}
                                                            />
                                                        </div>
                                                        <div className="form-group col-12 pl-1">
                                                            <TextAreaComponent
                                                                label="Nota"
                                                                value={item.nota}
                                                                onChange={ (value) => {
                                                                    item.nota = value;
                                                                    props.onChange(unidadAdministrativa);
                                                                } }
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
                            <div className="row">
                                <div className="form-group col-12">
                                    <ButtonComponent
                                        fullWidth
                                        onClick={props.onAddRowTurno}
                                    >
                                        Agregar
                                    </ButtonComponent>
                                </div>
                            </div>
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
                                                    onClick={ () => {
                                                        setIndexDestailsTurno(key);
                                                        setVisibleTurno(true);
                                                    } }
                                                    readOnly
                                                    style={{ background: 'white', cursor: 'pointer', }}
                                                    placeholder="SELECCIONAR TURNO"
                                                />
                                            </div>
                                            <div className="form-group col-3">
                                                <SelectComponent 
                                                    data={EstadoData}
                                                    label={"Estado"}
                                                    value={item.estado}
                                                    onChange={ (value) => {
                                                        item.estado = value;
                                                        props.onChange(unidadAdministrativa);
                                                    } }
                                                    disabledDefault={true}
                                                />
                                            </div>
                                            <div className="form-group col-1 pt-4">
                                                <Tooltip placement="top" title={"Eliminar"}>
                                                    <Button 
                                                        onClick={() => {
                                                            props.onDeleteRowTurno(key);
                                                        } }
                                                        size={"small"}
                                                        style={{ position: 'relative', right: 15, }}
                                                    >
                                                        <DeleteOutlined />
                                                    </Button>
                                                </Tooltip>
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
    onCreate: UnidadAdministrativaActions.onCreate,
    onLimpiar: UnidadAdministrativaActions.onLimpiar,
    onChange: UnidadAdministrativaActions.onChange,
    onAddRowTurno: UnidadAdministrativaActions.onAddRowTurno,
    onDeleteRowTurno: UnidadAdministrativaActions.onDeleteRowTurno,
    onAddRowAula: UnidadAdministrativaActions.onAddRowAula,
    onDeleteRowAula: UnidadAdministrativaActions.onDeleteRowAula,
    setSigla: UnidadAdministrativaActions.setSigla,
    setDescripcion: UnidadAdministrativaActions.setDescripcion,
    setFKIDUnidadNegocio: UnidadAdministrativaActions.setFKIDUnidadNegocio,
    onStore: UnidadAdministrativaActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateUnidadAdministrativa );
