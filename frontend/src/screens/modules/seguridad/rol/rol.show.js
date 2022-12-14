
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent, TextAreaComponent } from '../../../../components/components';
import { Functions } from '../../../../utils/functions';
import { AuthActions } from '../../../../redux/actions/auth/auth.action';
import { RolActions } from '../../../../redux/actions/seguridad/rol.action';

function ShowRol( props ) {
    const { rol } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onLimpiar();
        props.onValidateToken( onLogin ).then( (item) => {
            if ( item?.resp === 1 ) {
                props.onShow( params.idrol );
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
                    header={"Detalle Rol"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={onBack}
                            >
                                Aceptar
                            </ButtonComponent>
                        </>
                    }
                >
                    <div className="row">
                        <div className="form-group col-2"></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Nombre Rol"
                                value={rol.descripcion}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Tipo Rol"
                                value={rol.tiporol}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-12">
                            <TextAreaComponent 
                                label="Nota"
                                value={rol.nota}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4"></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Estado"
                                value={ Functions.getValueEstado( rol.estado ) }
                                readOnly={true}
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    rol: state.Rol,
} );

const mapDispatchToProps = {
    onValidateToken: AuthActions.onValidateToken,
    onLimpiar: RolActions.onLimpiar,
    onShow: RolActions.onShow,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowRol );
