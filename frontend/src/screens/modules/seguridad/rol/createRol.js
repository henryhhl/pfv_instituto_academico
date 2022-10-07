
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ButtonComponent ,InputComponent, ModalComponent, TextAreaComponent } from '../../../../components/components';
import { RolActions } from '../../../../redux/actions/rolActions';
import ListadoTipoRolModal from '../tiporol/modal/listado.modal';

function CreateRol( props ) {
    const { rol } = props;
    const navigate = useNavigate();
    const [ visibleTipoRol, setVisibleTipoRol ] = React.useState( false );

    React.useEffect( () => {
        props.onCreate();
        return () => {};
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    function onComponentTipoRol() {
        if ( !visibleTipoRol ) return null;
        return (
            <ListadoTipoRolModal
                visible={visibleTipoRol}
                onClose={ () => setVisibleTipoRol(false) }
                onSelect={ (tipoRol) => {
                    props.setFKIDTipoRol(rol, tipoRol);
                    setVisibleTipoRol(false);
                } }
            />
        );
    };

    return (
        <>
            { onComponentTipoRol() }
            <div className="main-content">
                <section className="section">
                    <h1 className="section-header">
                        <div>
                        </div>
                    </h1>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                            <div className="card" style={{ marginBottom: 80, }}>
                                <div className="card-header">
                                    <h4>Nuevo Rol</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="form-group col-2"></div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Descripción"
                                                value={rol.descripcion}
                                                onChange={ (value) => props.setDescripcion(rol, value) }
                                                error={rol.error.descripcion}
                                                message={rol.message.descripcion}
                                            />
                                        </div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Tipo"
                                                value={rol.tiporol}
                                                onClick={ () => setVisibleTipoRol(true) }
                                                error={rol.error.fkidtiporol}
                                                message={rol.message.fkidtiporol}
                                                readOnly
                                                style={{ background: 'white', cursor: 'pointer', }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-12">
                                            <TextAreaComponent 
                                                label="Nota"
                                                value={rol.nota}
                                                onChange={ (value) => props.setNota(rol, value) }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <ButtonComponent
                                        onClick={ () => props.onStore(rol, onBack) }
                                    >
                                        Guardar
                                    </ButtonComponent>
                                    <ButtonComponent
                                        type='danger' onClick={onBack}
                                    >
                                        Cancelar
                                    </ButtonComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    rol: state.Rol,
} );

const mapDispatchToProps = {
    onCreate: RolActions.onCreate,
    onLimpiar: RolActions.onLimpiar,
    setDescripcion: RolActions.setDescripcion,
    setFKIDTipoRol: RolActions.setFKIDTipoRol,
    setNota: RolActions.setNota,
    onStore: RolActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateRol );
