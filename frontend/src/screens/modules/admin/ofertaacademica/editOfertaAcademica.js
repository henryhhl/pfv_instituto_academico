
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { EstadoData } from '../../../../data/estado.data';
import { OfertaAcademicaActions } from '../../../../redux/actions/ofertaAcademicaActions';

function EditOfertaAcademica( props ) {
    const { ofertaAcademica } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onEdit( params.idofertaacademica );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Editar Oferta Academica"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(ofertaAcademica, onBack) }
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
                        <div className="form-group col-2"></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Sigla"
                                value={ofertaAcademica.sigla}
                                onChange={ (value) => props.setSigla(ofertaAcademica, value) }
                                error={ofertaAcademica.error.sigla}
                                message={ofertaAcademica.message.sigla}
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Descripción"
                                value={ofertaAcademica.descripcion}
                                onChange={ (value) => props.setDescripcion(ofertaAcademica, value) }
                                error={ofertaAcademica.error.descripcion}
                                message={ofertaAcademica.message.descripcion}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4"></div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado"}
                                value={ofertaAcademica.estado}
                                onChange={ (value) => props.setEstado(ofertaAcademica, value) }
                                error={ofertaAcademica.error.estado}
                                message={ofertaAcademica.message.estado}
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
    onLimpiar: OfertaAcademicaActions.onLimpiar,
    onEdit: OfertaAcademicaActions.onEdit,
    setSigla: OfertaAcademicaActions.setSigla,
    setDescripcion: OfertaAcademicaActions.setDescripcion,
    setEstado: OfertaAcademicaActions.setEstado,
    onUpdate: OfertaAcademicaActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditOfertaAcademica );
