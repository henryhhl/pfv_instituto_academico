
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import { EstadoData } from '../../../../data/estado.data';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { TipoCiudadActions } from '../../../../redux/actions/parametros/tipo_ciudad.action';

function EditTipoCiudad( props ) {
    const { tipoCiudad } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onEdit( params.idtipociudad );
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
                    header={"Editar Tipo Localidad"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(tipoCiudad, onBack) }
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
                                label="Nombre Tipo Localidad*"
                                value={tipoCiudad.descripcion}
                                onChange={ (value) => props.setDescripcion(tipoCiudad, value) }
                                error={tipoCiudad.error.descripcion}
                                message={tipoCiudad.message.descripcion}
                            />
                        </div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado*"}
                                value={tipoCiudad.estado}
                                onChange={ (value) => props.setEstado(tipoCiudad, value) }
                                error={tipoCiudad.error.estado}
                                message={tipoCiudad.message.estado}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    tipoCiudad: state.TipoCiudad,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onLimpiar: TipoCiudadActions.onLimpiar,
    onEdit: TipoCiudadActions.onEdit,
    setDescripcion: TipoCiudadActions.setDescripcion,
    setEstado: TipoCiudadActions.setEstado,
    onUpdate: TipoCiudadActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditTipoCiudad );
