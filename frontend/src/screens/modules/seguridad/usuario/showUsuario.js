
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { UsuarioActions } from '../../../../redux/actions/seguridad/usuario.action';
import { Functions } from '../../../../utils/functions';

function ShowUsuario( props ) {
    const { usuario } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onShow( params.idusuario );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <div className="main-content">
                <section className="section">
                    <h1 className="section-header">
                        <div>
                        </div>
                    </h1>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Detalle Usuario</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="form-group col-3"></div>
                                        <div className="form-group col-6">
                                            <InputComponent
                                                label="Email"
                                                value={usuario.email}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-2"></div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Login"
                                                value={usuario.login}
                                                readOnly
                                            />
                                        </div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Estado"
                                                value={ Functions.getValueEstado( usuario.estado ) }
                                                readOnly={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <ButtonComponent
                                        onClick={onBack}
                                    >
                                        Aceptar
                                    </ButtonComponent>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    usuario: state.Usuario,
} );

const mapDispatchToProps = {
    onLimpiar: UsuarioActions.onLimpiar,
    onShow: UsuarioActions.onShow,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowUsuario );
