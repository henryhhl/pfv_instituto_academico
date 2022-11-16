
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { OfertaAcademicaActions } from '../../../../redux/actions/parametros/oferta_academica.action';
import { Functions } from '../../../../utils/functions';

function ShowOfertaAcademica( props ) {
    const { ofertaAcademica } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onShow( params.idofertaacademica );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Detalle Oferta Academica"}
                    footer={
                        <ButtonComponent
                            onClick={onBack}
                        >
                            Aceptar
                        </ButtonComponent>
                    }
                >
                    <div className="row">
                        <div className="form-group col-2"></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Sigla"
                                value={ofertaAcademica.sigla}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Nombre Oferta Academica"
                                value={ofertaAcademica.descripcion}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='form-group col-4'></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Estado"
                                value={ Functions.getValueEstado( ofertaAcademica.estado ) }
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
    ofertaAcademica: state.OfertaAcademica,
} );

const mapDispatchToProps = {
    onLimpiar: OfertaAcademicaActions.onLimpiar,
    onShow: OfertaAcademicaActions.onShow,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowOfertaAcademica );
