
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { EstadoData } from '../../../../data/estado.data';
import { AulaActions } from '../../../../redux/actions/estructurainstitucional/aula.action';

function EditAula( props ) {
    const { aula } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onEdit( params.idaula );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Editar Aula"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(aula, onBack) }
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
                    <div className="row">
                        <div className="form-group col-4"></div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado*"}
                                value={aula.estado}
                                onChange={ (value) => props.setEstado(aula, value) }
                                error={aula.error.estado}
                                message={aula.message.estado}
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
    onEdit: AulaActions.onEdit,
    onLimpiar: AulaActions.onLimpiar,
    setSigla: AulaActions.setSigla,
    setDescripcion: AulaActions.setDescripcion,
    setEstado: AulaActions.setEstado,
    onUpdate: AulaActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditAula );
