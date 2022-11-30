
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import { EstadoData } from '../../../../data/estado.data';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { TipoActividadActions } from '../../../../redux/actions/oportunidad/tipoactividad.action';

function EditTipoActividad( props ) {
    const { tipoActividad } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onEdit( params.idtipoactividad );
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
                    header={"Editar Tipo Actividad"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(tipoActividad, onBack) }
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
                        <div className="form-group col-4">
                            <InputComponent
                                label="Sigla*"
                                value={tipoActividad.sigla}
                                onChange={ (value) => props.setSigla(tipoActividad, value) }
                                error={tipoActividad.error.sigla}
                                message={tipoActividad.message.sigla}
                            />
                        </div>
                        <div className="form-group col-8">
                            <InputComponent
                                label="Tipo*"
                                value={tipoActividad.descripcion}
                                onChange={ (value) => props.setDescripcion(tipoActividad, value) }
                                error={tipoActividad.error.descripcion}
                                message={tipoActividad.message.descripcion}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4"></div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado*"}
                                value={tipoActividad.estado}
                                onChange={ (value) => props.setEstado(tipoActividad, value) }
                                error={tipoActividad.error.estado}
                                message={tipoActividad.message.estado}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    tipoActividad: state.TipoActividad,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onEdit: TipoActividadActions.onEdit,
    onLimpiar: TipoActividadActions.onLimpiar,
    setSigla: TipoActividadActions.setSigla,
    setDescripcion: TipoActividadActions.setDescripcion,
    setEstado: TipoActividadActions.setEstado,
    onUpdate: TipoActividadActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditTipoActividad );
