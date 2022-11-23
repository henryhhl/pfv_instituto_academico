
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import DatePickerComponent from '../../../../components/date';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import { EstadoData } from '../../../../data/estado.data';
import { GeneroData } from '../../../../data/genero.data';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { ResponsableActions } from '../../../../redux/actions/estructuraacademica/responsable.action';

function EditResponsable( props ) {
    const { responsable } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onEdit( params.idresponsable );
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
                    header={"Editar Responsable"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(responsable, onBack) }
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
                        <div className="form-group col-2"></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Código"
                                value={responsable.codigo}
                                onChange={ (value) => props.setCodigo(responsable, value) }
                                error={responsable.error.codigo}
                                message={responsable.message.codigo}
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Nro Documento"
                                value={responsable.nrodocumento}
                                onChange={ (value) => props.setNroDocumento(responsable, value) }
                                error={responsable.error.nrodocumento}
                                message={responsable.message.nrodocumento}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4">
                            <InputComponent
                                label="Nombre"
                                value={responsable.nombre}
                                onChange={ (value) => props.setNombre(responsable, value) }
                                error={responsable.error.nombre}
                                message={responsable.message.nombre}
                            />
                        </div>
                        <div className="form-group col-8">
                            <InputComponent
                                label="Apellido"
                                value={responsable.apellido}
                                onChange={ (value) => props.setApellido(responsable, value) }
                                error={responsable.error.apellido}
                                message={responsable.message.apellido}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4">
                            <InputComponent
                                label="Ciudad"
                                value={responsable.ciudad}
                                onChange={ (value) => props.setCiudad(responsable, value) }
                                error={responsable.error.ciudad}
                                message={responsable.message.ciudad}
                            />
                        </div>
                        <div className="form-group col-8">
                            <InputComponent
                                label="Dirección"
                                value={responsable.direccion}
                                onChange={ (value) => props.setDireccion(responsable, value) }
                                error={responsable.error.direccion}
                                message={responsable.message.direccion}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={GeneroData}
                                label={"Genero"}
                                value={responsable.genero}
                                onChange={ (value) => props.setGenero(responsable, value) }
                                error={responsable.error.genero}
                                message={responsable.message.genero}
                            />
                        </div>
                        <div className="form-group col-4">
                            <DatePickerComponent
                                label="Fecha Nacimiento"
                                value={responsable.fechanacimiento}
                                onChange={ (value) => props.setFechaNacimiento(responsable, value) }
                                error={responsable.error.fechanacimiento}
                                message={responsable.message.fechanacimiento}
                                placeholder="SELECCIONAR FECHA"
                            />
                        </div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado"}
                                value={responsable.estado}
                                onChange={ (value) => props.setEstado(responsable, value) }
                                error={responsable.error.estado}
                                message={responsable.message.estado}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    responsable: state.Responsable,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onLimpiar: ResponsableActions.onLimpiar,
    onEdit: ResponsableActions.onEdit,
    setCodigo: ResponsableActions.setCodigo,
    setNroDocumento: ResponsableActions.setNroDocumento,
    setNombre: ResponsableActions.setNombre,
    setApellido: ResponsableActions.setApellido,
    setCiudad: ResponsableActions.setCiudad,
    setDireccion: ResponsableActions.setDireccion,
    setGenero: ResponsableActions.setGenero,
    setFechaNacimiento: ResponsableActions.setFechaNacimiento,
    setEstado: ResponsableActions.setEstado,
    onUpdate: ResponsableActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditResponsable );
