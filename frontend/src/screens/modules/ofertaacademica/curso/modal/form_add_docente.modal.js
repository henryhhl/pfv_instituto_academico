
import React from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import CardComponent from '../../../../../components/card';
import InputComponent from '../../../../../components/input';
import EmptyComponent from '../../../../../components/empty';
import ModalComponent from '../../../../../components/modal';
import SelectComponent from '../../../../../components/select';
import ButtonComponent from '../../../../../components/button';
import TextAreaComponent from '../../../../../components/textarea';
import ListadoDocenteModal from '../../../persona/docente/modal/docente_listado.modal';
import { CursoActions } from '../../../../../redux/actions/ofertaacademica/curso.action';
import { EstadoData } from '../../../../../data/estado.data';

const FormAddDocenteCursoModal = ( props ) => {
    const { curso } = props;
    const [ visibleDocente, setVisibleDocente ] = React.useState(false);
    const [ indexDetailsDocente, setIndexDetailsDocente ] = React.useState(-1);

    const existDocente = ( iddocente ) => {
        for (let index = 0; index < curso.arraydocente.length; index++) {
            const element = curso.arraydocente[index];
            if ( element.fkiddocente === iddocente ) return true;
        }
        return false;
    };

    const onComponentDocente = () => {
        if ( !visibleDocente ) return null;
        return (
            <ListadoDocenteModal
                visible={visibleDocente}
                onClose={ () => setVisibleDocente(false) }
                onSelect={ (docente) => {
                    if ( !existDocente( docente.iddocente ) ) {
                        let detalle = curso.arraydocente[indexDetailsDocente];
                        detalle.fkiddocente = docente.iddocente;
                        detalle.docente = `${docente.nombreprincipal} ${docente.nombreadicional} ${docente.apellidoprimero} ${docente.apellidosegundo}`;
                        props.onChange(curso);
                        setVisibleDocente(false);
                    } else {
                        toastr.warning( 'Docente ya seleccionado.', '', { closeButton: true, progressBar: true, } );
                    }
                } }
                valueSelect={curso.arraydocente[indexDetailsDocente]?.fkiddocente}
            />
        );
    };

    return (
        <ModalComponent
            visible={props.visible}
            onClose={props.onClose}
            footer={null} width={'80%'} centered
            title={props.disabled === true ? "DETALLE DOCENTE ASIGNADO" : "ASIGNAR DOCENTE"}
            style={{ marginBottom: 30, marginTop: 30, }}
        >
            { onComponentDocente() }
            <CardComponent
                actions={
                    props.disabled === true ? null : 
                    <ButtonComponent
                        onClick={ props.onAddRowDocente }
                    >
                        Agregar Docente
                    </ButtonComponent>
                }
            >
                <EmptyComponent data={curso.arraydocente} />
                <div 
                    style={{ 
                        minWidth: '100%', width: '100%', maxWidth: '100%', maxHeight: 450, 
                        overflowY: 'auto', overflowX: 'hidden', 
                    }}
                >
                    <div className="row">
                        { curso.arraydocente.map( ( item, key ) => {
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
                                                    props.onDeleteRowDocente(key);
                                                } }
                                            />
                                        </div>
                                        <div className="card-body">
                                            <div className="form-group col-12 pl-1">
                                                <InputComponent
                                                    label={`Docente*`}
                                                    value={item.docente}
                                                    onClick={ () => {
                                                        setIndexDetailsDocente(key);
                                                        setVisibleDocente(true);
                                                    } }
                                                    readOnly
                                                    style={{ background: 'white', cursor: 'pointer', }}
                                                    placeholder="SELECCIONAR DOCENTE"
                                                    error={item.error.fkiddocente}
                                                    message={item.message.fkiddocente}
                                                />
                                            </div>
                                            <div className="form-group col-12 pl-1">
                                                <TextAreaComponent
                                                    label="Contenido"
                                                    value={item.contenido}
                                                    onChange={ (value) => {
                                                        item.contenido = value;
                                                        props.onChange(curso);
                                                    } }
                                                    rows={2}
                                                    readOnly={ (item.fkiddocente === null) }
                                                />
                                            </div>
                                            <div className="form-group col-12 pl-1">
                                                <SelectComponent 
                                                    data={EstadoData}
                                                    label={"Estado"}
                                                    value={item.estado}
                                                    onChange={ (value) => {
                                                        item.estado = value;
                                                        props.onChange(curso);
                                                    } }
                                                    disabledDefault={true}
                                                    disabled={ (item.fkiddocente === null) }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        } ) }
                    </div>
                </div>
            </CardComponent>
        </ModalComponent>
    );
};

FormAddDocenteCursoModal.propTypes = {
    disabled: PropTypes.bool,
    visible: PropTypes.bool,
    onClose: PropTypes.func,
};

FormAddDocenteCursoModal.defaultProps = {
    disabled: false,
    visible: false,
    onClose: () => {},
};

const mapStateToProps = ( state ) => ( {
    curso: state.Curso,
} );

const mapDispatchToProps = {
    onAddRowDocente: CursoActions.onAddRowDocente,
    onDeleteRowDocente: CursoActions.onDeleteRowDocente,
    onChange: CursoActions.onChange,
};

export default connect(mapStateToProps, mapDispatchToProps)( FormAddDocenteCursoModal );
