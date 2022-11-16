
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { InstitucionActions } from '../../../../redux/actions/estructurainstitucional/institucion.action';
import { Functions } from '../../../../utils/functions';

function ShowInstitucion( props ) {
    const { institucion } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onShow( params.idinstitucion );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Detalle Institución"}
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
                        <div className="form-group col-3">
                            <InputComponent
                                label="Sigla"
                                value={institucion.sigla}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-6">
                            <InputComponent
                                label="Nombre Institución"
                                value={institucion.descripcion}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Nit"
                                value={institucion.nit}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-5">
                            <InputComponent
                                label="Ciudad"
                                value={institucion.ciudad}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-7">
                            <InputComponent
                                label="Dirección"
                                value={institucion.direccion}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-3">
                            <InputComponent
                                label="Telefono"
                                value={institucion.telefono}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-3">
                            <InputComponent
                                label="Celular"
                                value={institucion.celular}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-6">
                            <InputComponent
                                label="Email"
                                value={institucion.email}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='form-group col-4'></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Estado"
                                value={ Functions.getValueEstado( institucion.estado ) }
                                readOnly
                            />
                        </div>
                    </div>
                </CardComponent>
            </PaperComponent>
        </>
    );
}

const mapStateToProps = ( state ) => ( {
    institucion: state.Institucion,
} );

const mapDispatchToProps = {
    onShow: InstitucionActions.onShow,
    onLimpiar: InstitucionActions.onLimpiar,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowInstitucion );
