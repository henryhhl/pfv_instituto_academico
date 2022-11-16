
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { DivisionAcademicaActions } from '../../../../redux/actions/estructurainstitucional/division_academica.action';
import { Functions } from '../../../../utils/functions';

function ShowDivisionAcademica( props ) {
    const { divisionAcademica } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onShow( params.iddivisionacademica );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Detalle División academica"}
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
                                value={divisionAcademica.sigla}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-7">
                            <InputComponent
                                label="Nombre División Acádemica"
                                value={divisionAcademica.descripcion}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-2">
                            <InputComponent
                                label="Orden"
                                value={divisionAcademica.orden}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='form-group col-4'></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Estado"
                                value={ Functions.getValueEstado( divisionAcademica.estado ) }
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
    divisionAcademica: state.DivisionAcademica,
} );

const mapDispatchToProps = {
    onShow: DivisionAcademicaActions.onShow,
    onLimpiar: DivisionAcademicaActions.onLimpiar,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowDivisionAcademica );
