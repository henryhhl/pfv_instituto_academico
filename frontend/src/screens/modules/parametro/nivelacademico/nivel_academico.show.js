
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { NivelAcademicoActions } from '../../../../redux/actions/parametros/nivel_academico.action';
import { Functions } from '../../../../utils/functions';

function ShowNivelAcademico( props ) {
    const { nivelAcademico } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onShow( params.idnivelacademico );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Detalle Nivel Academico"}
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
                                value={nivelAcademico.sigla}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Nombre Nivel Academico"
                                value={nivelAcademico.descripcion}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='form-group col-4'></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Estado"
                                value={ Functions.getValueEstado( nivelAcademico.estado ) }
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
    nivelAcademico: state.NivelAcademico,
} );

const mapDispatchToProps = {
    onLimpiar: NivelAcademicoActions.onLimpiar,
    onShow: NivelAcademicoActions.onShow,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowNivelAcademico );
