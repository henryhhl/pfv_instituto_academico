
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { OfertaAcademicaActions } from '../../../../redux/actions/parametros/oferta_academica.action';

function CreateOfertaAcademica( props ) {
    const { ofertaAcademica } = props;
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
                    header={"Nuevo Oferta Academica"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(ofertaAcademica, onBack) }
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
                                value={ofertaAcademica.sigla}
                                onChange={ (value) => props.setSigla(ofertaAcademica, value) }
                                error={ofertaAcademica.error.sigla}
                                message={ofertaAcademica.message.sigla}
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Nombre Oferta Academica*"
                                value={ofertaAcademica.descripcion}
                                onChange={ (value) => props.setDescripcion(ofertaAcademica, value) }
                                error={ofertaAcademica.error.descripcion}
                                message={ofertaAcademica.message.descripcion}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    ofertaAcademica: state.OfertaAcademica,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onLimpiar: OfertaAcademicaActions.onLimpiar,
    onCreate: OfertaAcademicaActions.onCreate,
    setSigla: OfertaAcademicaActions.setSigla,
    setDescripcion: OfertaAcademicaActions.setDescripcion,
    onStore: OfertaAcademicaActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateOfertaAcademica );
