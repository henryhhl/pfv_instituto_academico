
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ReferenciaContactoActions } from '../../../../redux/actions/parametros/referencia_contacto.action';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import { EstadoData } from '../../../../data/estado.data';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';

function EditReferenciaContacto( props ) {
    const { referenciaContacto } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onEdit( params.idreferenciacontacto );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Editar Referencia Contacto"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(referenciaContacto, onBack) }
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
                        <div className="form-group col-1"></div>
                        <div className="form-group col-6">
                            <InputComponent
                                label="Nombre de Referencia Contacto*"
                                value={referenciaContacto.descripcion}
                                onChange={ (value) => props.setDescripcion(referenciaContacto, value) }
                                error={referenciaContacto.error.descripcion}
                                message={referenciaContacto.message.descripcion}
                            />
                        </div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado*"}
                                value={referenciaContacto.estado}
                                onChange={ (value) => props.setEstado(referenciaContacto, value) }
                                error={referenciaContacto.error.estado}
                                message={referenciaContacto.message.estado}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    referenciaContacto: state.ReferenciaContacto,
} );

const mapDispatchToProps = {
    onLimpiar: ReferenciaContactoActions.onLimpiar,
    onEdit: ReferenciaContactoActions.onEdit,
    setDescripcion: ReferenciaContactoActions.setDescripcion,
    setEstado: ReferenciaContactoActions.setEstado,
    onUpdate: ReferenciaContactoActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditReferenciaContacto );
