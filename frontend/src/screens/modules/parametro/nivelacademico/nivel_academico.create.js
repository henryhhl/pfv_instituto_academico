
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { NivelAcademicoActions } from '../../../../redux/actions/parametros/nivel_academico.action';

function CreateNivelAcademico( props ) {
    const { nivelAcademico } = props;
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
                    header={"Nuevo Nivel Academico"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(nivelAcademico, onBack) }
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
                                value={nivelAcademico.sigla}
                                onChange={ (value) => props.setSigla(nivelAcademico, value) }
                                error={nivelAcademico.error.sigla}
                                message={nivelAcademico.message.sigla}
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Nombre Nivel Academico*"
                                value={nivelAcademico.descripcion}
                                onChange={ (value) => props.setDescripcion(nivelAcademico, value) }
                                error={nivelAcademico.error.descripcion}
                                message={nivelAcademico.message.descripcion}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    nivelAcademico: state.NivelAcademico,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onLimpiar: NivelAcademicoActions.onLimpiar,
    onCreate: NivelAcademicoActions.onCreate,
    setSigla: NivelAcademicoActions.setSigla,
    setDescripcion: NivelAcademicoActions.setDescripcion,
    onStore: NivelAcademicoActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateNivelAcademico );
