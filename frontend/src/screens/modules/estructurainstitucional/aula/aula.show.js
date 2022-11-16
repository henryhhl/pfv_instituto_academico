
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { AulaActions } from '../../../../redux/actions/estructurainstitucional/aula.action';
import { Functions } from '../../../../utils/functions';

function ShowAula( props ) {
    const { aula } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onShow( params.idaula );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Detalle Aula"}
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
                        <div className="form-group col-4">
                            <InputComponent
                                label="Sigla"
                                value={aula.sigla}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-8">
                            <InputComponent
                                label="Nombre Aula"
                                value={aula.descripcion}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='form-group col-4'></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Estado"
                                value={ Functions.getValueEstado( aula.estado ) }
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
    aula: state.Aula,
} );

const mapDispatchToProps = {
    onShow: AulaActions.onShow,
    onLimpiar: AulaActions.onLimpiar,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowAula );
