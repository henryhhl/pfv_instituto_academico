
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Functions } from '../../../../utils/functions';
import CardComponent from '../../../../components/card';
import PaperComponent from '../../../../components/paper';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import { ProgramaActions } from '../../../../redux/actions/estructuraacademica/programa.action';

function ShowPrograma( props ) {
    const { programa } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onShow( params.idprograma );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Detalle Programa"}
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
                                label="Código"
                                value={programa.codigo}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Sigla"
                                value={programa.sigla}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-12">
                            <InputComponent
                                label="Descripción"
                                value={programa.descripcion}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-4">
                            <InputComponent
                                label="Unidad Academica"
                                value={programa.unidadacademica}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Unidad Administrativa"
                                value={programa.unidadadministrativa}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Unidad Negocio"
                                value={programa.unidadnegocio}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-2"></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Nivel Academico"
                                value={programa.nivelacademico}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Modalidad Academica"
                                value={programa.modalidadacademica}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='form-group col-4'></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Estado"
                                value={ Functions.getValueEstado( programa.estado ) }
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
    programa: state.Programa,
} );

const mapDispatchToProps = {
    onShow: ProgramaActions.onShow,
    onLimpiar: ProgramaActions.onLimpiar,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowPrograma );
