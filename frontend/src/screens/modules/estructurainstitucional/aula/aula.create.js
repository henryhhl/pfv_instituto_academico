
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { AulaActions } from '../../../../redux/actions/estructurainstitucional/aula.action';

function CreateAula( props ) {
    const { aula } = props;
    const navigate = useNavigate();

    React.useEffect( () => {
        props.onCreate();
        return () => {};
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Nuevo Aula"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(aula, onBack) }
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
                                value={aula.sigla}
                                onChange={ (value) => props.setSigla(aula, value) }
                                error={aula.error.sigla}
                                message={aula.message.sigla}
                            />
                        </div>
                        <div className="form-group col-8">
                            <InputComponent
                                label="Nombre Aula*"
                                value={aula.descripcion}
                                onChange={ (value) => props.setDescripcion(aula, value) }
                                error={aula.error.descripcion}
                                message={aula.message.descripcion}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    aula: state.Aula,
} );

const mapDispatchToProps = {
    onCreate: AulaActions.onCreate,
    onLimpiar: AulaActions.onLimpiar,
    setSigla: AulaActions.setSigla,
    setDescripcion: AulaActions.setDescripcion,
    onStore: AulaActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateAula );
