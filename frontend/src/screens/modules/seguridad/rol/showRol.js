
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonComponent ,InputComponent, TextAreaComponent } from '../../../../components/components';
import { RolActions } from '../../../../redux/actions/rolActions';
import { Functions } from '../../../../utils/functions';

function ShowRol( props ) {
    const { rol } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onShow( params.idrol );
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
                            <div className="card" style={{ marginBottom: 80, }}>
                                <div className="card-header">
                                    <h4>Detalle Rol</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="form-group col-2"></div>
                                        <div className="form-group col-4">
                                            <InputComponent
                                                label="Descripción"
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
    rol: state.Rol,
} );

const mapDispatchToProps = {
    onLimpiar: RolActions.onLimpiar,
    onShow: RolActions.onShow,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowRol );
