
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import { EstadoData } from '../../../../data/estado.data';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { TipoResultadoActions } from '../../../../redux/actions/oportunidad/tiporesultado.action';

function EditTipoResultado( props ) {
    const { tipoResultado } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onEdit( params.idtiporesultado );
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
                    header={"Editar Tipo Resultado"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(tipoResultado, onBack) }
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
                                value={tipoResultado.sigla}
                                onChange={ (value) => props.setSigla(tipoResultado, value) }
                                error={tipoResultado.error.sigla}
                                message={tipoResultado.message.sigla}
                            />
                        </div>
                        <div className="form-group col-8">
                            <InputComponent
                                label="Tipo*"
                                value={tipoResultado.descripcion}
                                onChange={ (value) => props.setDescripcion(tipoResultado, value) }
                                error={tipoResultado.error.descripcion}
                                message={tipoResultado.message.descripcion}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4"></div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado*"}
                                value={tipoResultado.estado}
                                onChange={ (value) => props.setEstado(tipoResultado, value) }
                                error={tipoResultado.error.estado}
                                message={tipoResultado.message.estado}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    tipoResultado: state.TipoResultado,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onEdit: TipoResultadoActions.onEdit,
    onLimpiar: TipoResultadoActions.onLimpiar,
    setSigla: TipoResultadoActions.setSigla,
    setDescripcion: TipoResultadoActions.setDescripcion,
    setEstado: TipoResultadoActions.setEstado,
    onUpdate: TipoResultadoActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditTipoResultado );
