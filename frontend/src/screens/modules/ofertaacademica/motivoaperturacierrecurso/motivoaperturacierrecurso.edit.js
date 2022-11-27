
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import { EstadoData } from '../../../../data/estado.data';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { MotivoAperturaCierreCursoActions } from '../../../../redux/actions/ofertaacademica/motivoaperturacierrecurso.action';

function EditMotivoAperturaCierreCurso( props ) {
    const { motivoAperturaCierre } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onEdit( params.idmotivoaperturacierrecurso );
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
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Editar Motivo Apertura o cierre"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(motivoAperturaCierre, onBack) }
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
                    <div className="row">
                        <div className="form-group col-4"></div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado*"}
                                value={motivoAperturaCierre.estado}
                                onChange={ (value) => props.setEstado(motivoAperturaCierre, value) }
                                error={motivoAperturaCierre.error.estado}
                                message={motivoAperturaCierre.message.estado}
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
    onEdit: MotivoAperturaCierreCursoActions.onEdit,
    onLimpiar: MotivoAperturaCierreCursoActions.onLimpiar,
    setSigla: MotivoAperturaCierreCursoActions.setSigla,
    setDescripcion: MotivoAperturaCierreCursoActions.setDescripcion,
    setEstado: MotivoAperturaCierreCursoActions.setEstado,
    onUpdate: MotivoAperturaCierreCursoActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditMotivoAperturaCierreCurso );
