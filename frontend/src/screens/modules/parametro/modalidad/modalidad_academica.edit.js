
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import { EstadoData } from '../../../../data/estado.data';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { ModalidadAcademicaActions } from '../../../../redux/actions/parametros/modalidad_academica.action';

function EditModalidadAcademica( props ) {
    const { modalidadAcademica } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onEdit( params.idmodalidadacademica );
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
                    header={"Editar Modalidad Academica"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(modalidadAcademica, onBack) }
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
                                label="Sigla*"
                                value={modalidadAcademica.sigla}
                                onChange={ (value) => props.setSigla(modalidadAcademica, value) }
                                error={modalidadAcademica.error.sigla}
                                message={modalidadAcademica.message.sigla}
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Nombre Modalidad Academica*"
                                value={modalidadAcademica.descripcion}
                                onChange={ (value) => props.setDescripcion(modalidadAcademica, value) }
                                error={modalidadAcademica.error.descripcion}
                                message={modalidadAcademica.message.descripcion}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4"></div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado*"}
                                value={modalidadAcademica.estado}
                                onChange={ (value) => props.setEstado(modalidadAcademica, value) }
                                error={modalidadAcademica.error.estado}
                                message={modalidadAcademica.message.estado}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    modalidadAcademica: state.ModalidadAcademica,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onLimpiar: ModalidadAcademicaActions.onLimpiar,
    onEdit: ModalidadAcademicaActions.onEdit,
    setSigla: ModalidadAcademicaActions.setSigla,
    setDescripcion: ModalidadAcademicaActions.setDescripcion,
    setEstado: ModalidadAcademicaActions.setEstado,
    onUpdate: ModalidadAcademicaActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditModalidadAcademica );
