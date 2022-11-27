
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { MotivoAperturaCierreCursoActions } from '../../../../redux/actions/ofertaacademica/motivoaperturacierrecurso.action';

function CreateMotivoAperturaCierreCurso( props ) {
    const { motivoAperturaCierre } = props;
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
                    header={"Nuevo Motivo Apertura o Cierre"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(motivoAperturaCierre, onBack) }
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
                        <div className="form-group col-4">
                            <InputComponent
                                label="Sigla*"
                                value={motivoAperturaCierre.sigla}
                                onChange={ (value) => props.setSigla(motivoAperturaCierre, value) }
                                error={motivoAperturaCierre.error.sigla}
                                message={motivoAperturaCierre.message.sigla}
                            />
                        </div>
                        <div className="form-group col-8">
                            <InputComponent
                                label="Motivo*"
                                value={motivoAperturaCierre.descripcion}
                                onChange={ (value) => props.setDescripcion(motivoAperturaCierre, value) }
                                error={motivoAperturaCierre.error.descripcion}
                                message={motivoAperturaCierre.message.descripcion}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    motivoAperturaCierre: state.MotivoAperturaCierreCurso,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onCreate: MotivoAperturaCierreCursoActions.onCreate,
    onLimpiar: MotivoAperturaCierreCursoActions.onLimpiar,
    setSigla: MotivoAperturaCierreCursoActions.setSigla,
    setDescripcion: MotivoAperturaCierreCursoActions.setDescripcion,
    onStore: MotivoAperturaCierreCursoActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateMotivoAperturaCierreCurso );
