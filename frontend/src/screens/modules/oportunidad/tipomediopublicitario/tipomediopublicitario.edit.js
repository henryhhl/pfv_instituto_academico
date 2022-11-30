
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import { EstadoData } from '../../../../data/estado.data';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { TipoMedioPublicitarioActions } from '../../../../redux/actions/oportunidad/tipomediopublicitario.action';

function EditTipoMedioPublicitario( props ) {
    const { tipoMedioPublicitario } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onEdit( params.idtipomediopublicitario );
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
                    header={"Editar Tipo Medio Publicitario"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(tipoMedioPublicitario, onBack) }
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
                                value={tipoMedioPublicitario.sigla}
                                onChange={ (value) => props.setSigla(tipoMedioPublicitario, value) }
                                error={tipoMedioPublicitario.error.sigla}
                                message={tipoMedioPublicitario.message.sigla}
                            />
                        </div>
                        <div className="form-group col-8">
                            <InputComponent
                                label="Tipo*"
                                value={tipoMedioPublicitario.descripcion}
                                onChange={ (value) => props.setDescripcion(tipoMedioPublicitario, value) }
                                error={tipoMedioPublicitario.error.descripcion}
                                message={tipoMedioPublicitario.message.descripcion}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4"></div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado*"}
                                value={tipoMedioPublicitario.estado}
                                onChange={ (value) => props.setEstado(tipoMedioPublicitario, value) }
                                error={tipoMedioPublicitario.error.estado}
                                message={tipoMedioPublicitario.message.estado}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    tipoMedioPublicitario: state.TipoMedioPublicitario,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onEdit: TipoMedioPublicitarioActions.onEdit,
    onLimpiar: TipoMedioPublicitarioActions.onLimpiar,
    setSigla: TipoMedioPublicitarioActions.setSigla,
    setDescripcion: TipoMedioPublicitarioActions.setDescripcion,
    setEstado: TipoMedioPublicitarioActions.setEstado,
    onUpdate: TipoMedioPublicitarioActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditTipoMedioPublicitario );
