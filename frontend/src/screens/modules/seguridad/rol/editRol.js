
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonComponent ,InputComponent, SelectComponent, TextAreaComponent } from '../../../../components/components';
import { EstadoData } from '../../../../data/estado.data';
import { RolActions } from '../../../../redux/actions/rolActions';
import ListadoTipoRolModal from '../tiporol/modal/listado.modal';

function EditRol( props ) {
    const { rol } = props;
    const [ visibleTipoRol, setVisibleTipoRol ] = React.useState( false );
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onEdit( params.idrol );
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
                    console.log(tipoRol)
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
                                    <h4>Editar Rol</h4>
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
                                                label="Tipo Rol"
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
                                    <div className="row">
                                        <div className="form-group col-4"></div>
                                        <div className="form-group col-4">
                                            <SelectComponent 
                                                data={EstadoData}
                                                label={"Estado"}
                                                value={rol.estado}
                                                onChange={ (value) => props.setEstado(rol, value) }
                                                error={rol.error.estado}
                                                message={rol.message.estado}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <ButtonComponent
                                        onClick={ () => props.onUpdate(rol, onBack) }
                                    >
                                        Editar
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
    onLimpiar: RolActions.onLimpiar,
    onEdit: RolActions.onEdit,
    setDescripcion: RolActions.setDescripcion,
    setFKIDTipoRol: RolActions.setFKIDTipoRol,
    setNota: RolActions.setNota,
    setEstado: RolActions.setEstado,
    onUpdate: RolActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditRol );
