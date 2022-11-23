
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { PeriodoActions } from '../../../../redux/actions/parametros/periodo.action';

function CreatePeriodo( props ) {
    const { periodo } = props;
    const navigate = useNavigate();

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onCreate();
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
                    header={"Nuevo Periodo"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(periodo, onBack) }
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
                    <div className="row">
                        <div className="form-group col-2"></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Sigla*"
                                value={periodo.sigla}
                                onChange={ (value) => props.setSigla(periodo, value) }
                                error={periodo.error.sigla}
                                message={periodo.message.sigla}
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Nombre Periodo*"
                                value={periodo.descripcion}
                                onChange={ (value) => props.setDescripcion(periodo, value) }
                                error={periodo.error.descripcion}
                                message={periodo.message.descripcion}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    periodo: state.Periodo,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onLimpiar: PeriodoActions.onLimpiar,
    onCreate: PeriodoActions.onCreate,
    setSigla: PeriodoActions.setSigla,
    setDescripcion: PeriodoActions.setDescripcion,
    onStore: PeriodoActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreatePeriodo );
