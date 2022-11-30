
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import { EstadoData } from '../../../../data/estado.data';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { TipoContactoActions } from '../../../../redux/actions/oportunidad/tipocontacto.action';

function EditTipoContacto( props ) {
    const { tipoContacto } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onEdit( params.idtipocontacto );
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

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Editar Tipo Contacto"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(tipoContacto, onBack) }
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
                                value={tipoContacto.sigla}
                                onChange={ (value) => props.setSigla(tipoContacto, value) }
                                error={tipoContacto.error.sigla}
                                message={tipoContacto.message.sigla}
                            />
                        </div>
                        <div className="form-group col-8">
                            <InputComponent
                                label="Tipo*"
                                value={tipoContacto.descripcion}
                                onChange={ (value) => props.setDescripcion(tipoContacto, value) }
                                error={tipoContacto.error.descripcion}
                                message={tipoContacto.message.descripcion}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4"></div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado*"}
                                value={tipoContacto.estado}
                                onChange={ (value) => props.setEstado(tipoContacto, value) }
                                error={tipoContacto.error.estado}
                                message={tipoContacto.message.estado}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    tipoContacto: state.TipoContacto,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onLimpiar: TipoContactoActions.onLimpiar,
    onEdit: TipoContactoActions.onEdit,
    setSigla: TipoContactoActions.setSigla,
    setDescripcion: TipoContactoActions.setDescripcion,
    setEstado: TipoContactoActions.setEstado,
    onUpdate: TipoContactoActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditTipoContacto );
