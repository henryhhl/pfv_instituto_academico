
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { TipoRolActions } from '../../../../redux/actions/seguridad/tipoRol.action';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import { EstadoData } from '../../../../data/estado.data';
import PaperComponent from '../../../../components/paper';
import CardComponent from '../../../../components/card';

function EditTipoRol( props ) {
    const { tipoRol } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onEdit( params.idtiporol );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Editar Tipo Rol"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(tipoRol, onBack) }
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
                                label="Nombre Tipo Rol*"
                                value={tipoRol.descripcion}
                                onChange={ (value) => props.setDescripcion(tipoRol, value) }
                                error={tipoRol.error.descripcion}
                                message={tipoRol.message.descripcion}
                            />
                        </div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado*"}
                                value={tipoRol.estado}
                                onChange={ (value) => props.setEstado(tipoRol, value) }
                                error={tipoRol.error.estado}
                                message={tipoRol.message.estado}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    tipoRol: state.TipoRol,
} );

const mapDispatchToProps = {
    onLimpiar: TipoRolActions.onLimpiar,
    onEdit: TipoRolActions.onEdit,
    setDescripcion: TipoRolActions.setDescripcion,
    setEstado: TipoRolActions.setEstado,
    onUpdate: TipoRolActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditTipoRol );
