
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import { EstadoData } from '../../../../data/estado.data';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { InstitucionActions } from '../../../../redux/actions/estructurainstitucional/institucion.action';
import ListadoCiudadModal from '../../parametro/ciudad/modal/ciudad_listado.modal';

function EditInstitucion( props ) {
    const { institucion } = props;
    const [ visibleCiudad, setVisibleCiudad ] = React.useState( false );
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onEdit( params.idinstitucion );
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

    const onComponentCiudad = () => {
        if ( !visibleCiudad ) return null;
        return (
            <ListadoCiudadModal
                visible={visibleCiudad}
                onClose={ () => setVisibleCiudad(false) }
                onSelect={ (ciudad) => {
                    props.setFKIDCiudad(institucion, ciudad);
                    setVisibleCiudad(false);
                } }
            />
        );
    };

    return (
        <>
            { onComponentCiudad() }
            <PaperComponent>
                <CardComponent
                    header={"Editar Institución"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(institucion, onBack) }
                            >
                                Editar
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
                        <div className="form-group col-3">
                            <InputComponent
                                label="Sigla*"
                                value={institucion.sigla}
                                onChange={ (value) => props.setSigla(institucion, value) }
                                error={institucion.error.sigla}
                                message={institucion.message.sigla}
                            />
                        </div>
                        <div className="form-group col-6">
                            <InputComponent
                                label="Nombre Institución*"
                                value={institucion.descripcion}
                                onChange={ (value) => props.setDescripcion(institucion, value) }
                                error={institucion.error.descripcion}
                                message={institucion.message.descripcion}
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Nit*"
                                value={institucion.nit}
                                onChange={ (value) => props.setNit(institucion, value) }
                                error={institucion.error.nit}
                                message={institucion.message.nit}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-5">
                            <InputComponent
                                label="Ciudad*"
                                value={institucion.ciudad}
                                onClick={ () => setVisibleCiudad(true) }
                                error={institucion.error.fkidciudad}
                                message={institucion.message.fkidciudad}
                                style={{ background: 'white', cursor: 'pointer', }}
                                placeholder="SELECCIONAR CIUDAD"
                                readOnly
                            />
                        </div>
                        <div className="form-group col-7">
                            <InputComponent
                                label="Dirección"
                                value={institucion.direccion}
                                onChange={ (value) => props.setDireccion(institucion, value) }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-3">
                            <InputComponent
                                label="Telefono"
                                value={institucion.telefono}
                                onChange={ (value) => props.setTelefono(institucion, value) }
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Celular"
                                value={institucion.celular}
                                onChange={ (value) => props.setCelular(institucion, value) }
                            />
                        </div>
                        <div className="form-group col-6">
                            <InputComponent
                                label="Email"
                                value={institucion.email}
                                onChange={ (value) => props.setEmail(institucion, value) }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4"></div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado"}
                                value={institucion.estado}
                                onChange={ (value) => props.setEstado(institucion, value) }
                                error={institucion.error.estado}
                                message={institucion.message.estado}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    institucion: state.Institucion,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onEdit: InstitucionActions.onEdit,
    onLimpiar: InstitucionActions.onLimpiar,
    setFKIDCiudad: InstitucionActions.setFKIDCiudad,
    setSigla: InstitucionActions.setSigla,
    setDescripcion: InstitucionActions.setDescripcion,
    setNit: InstitucionActions.setNit,
    setTelefono: InstitucionActions.setTelefono,
    setCelular: InstitucionActions.setCelular,
    setDireccion: InstitucionActions.setDireccion,
    setEmail: InstitucionActions.setEmail,
    setEstado: InstitucionActions.setEstado,
    onUpdate: InstitucionActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditInstitucion );
