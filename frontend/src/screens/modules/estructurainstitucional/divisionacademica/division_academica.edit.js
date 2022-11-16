
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { EstadoData } from '../../../../data/estado.data';
import { DivisionAcademicaActions } from '../../../../redux/actions/estructurainstitucional/division_academica.action';

function EditDivisionAcademica( props ) {
    const { divisionAcademica } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onEdit( params.iddivisionacademica );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Editar Division academica"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(divisionAcademica, onBack) }
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
                    <div className="row">
                        <div className="form-group col-4"></div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado*"}
                                value={divisionAcademica.estado}
                                onChange={ (value) => props.setEstado(divisionAcademica, value) }
                                error={divisionAcademica.error.estado}
                                message={divisionAcademica.message.estado}
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
    onEdit: DivisionAcademicaActions.onEdit,
    onLimpiar: DivisionAcademicaActions.onLimpiar,
    setSigla: DivisionAcademicaActions.setSigla,
    setDescripcion: DivisionAcademicaActions.setDescripcion,
    setOrden: DivisionAcademicaActions.setOrden,
    setEstado: DivisionAcademicaActions.setEstado,
    onUpdate: DivisionAcademicaActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditDivisionAcademica );
