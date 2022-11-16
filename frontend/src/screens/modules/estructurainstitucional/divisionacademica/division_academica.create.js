
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { DivisionAcademicaActions } from '../../../../redux/actions/estructurainstitucional/division_academica.action';

function CreateDivisionAcademica( props ) {
    const { divisionAcademica } = props;
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
                    header={"Nueva Division academica"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(divisionAcademica, onBack) }
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
                        <div className="form-group col-3">
                            <InputComponent
                                label="Sigla*"
                                value={divisionAcademica.sigla}
                                onChange={ (value) => props.setSigla(divisionAcademica, value) }
                                error={divisionAcademica.error.sigla}
                                message={divisionAcademica.message.sigla}
                            />
                        </div>
                        <div className="form-group col-7">
                            <InputComponent
                                label="Nombre División Acádemica*"
                                value={divisionAcademica.descripcion}
                                onChange={ (value) => props.setDescripcion(divisionAcademica, value) }
                                error={divisionAcademica.error.descripcion}
                                message={divisionAcademica.message.descripcion}
                            />
                        </div>
                        <div className="form-group col-2">
                            <InputComponent
                                label="Orden*"
                                value={divisionAcademica.orden}
                                onChange={ (value) => props.setOrden(divisionAcademica, value) }
                                error={divisionAcademica.error.orden}
                                message={divisionAcademica.message.orden}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    divisionAcademica: state.DivisionAcademica,
} );

const mapDispatchToProps = {
    onCreate: DivisionAcademicaActions.onCreate,
    onLimpiar: DivisionAcademicaActions.onLimpiar,
    setSigla: DivisionAcademicaActions.setSigla,
    setDescripcion: DivisionAcademicaActions.setDescripcion,
    setOrden: DivisionAcademicaActions.setOrden,
    onStore: DivisionAcademicaActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateDivisionAcademica );
