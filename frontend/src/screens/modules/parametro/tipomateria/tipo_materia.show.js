
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { TipoMateriaActions } from '../../../../redux/actions/parametros/tipo_materia.action';
import { Functions } from '../../../../utils/functions';

function ShowTipoMateria( props ) {
    const { tipoMateria } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onShow( params.idtipomateria );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Detalle Tipo Materia"}
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
                                value={tipoMateria.sigla}
                                readOnly
                            />
                        </div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Nombre Tipo Materia"
                                value={tipoMateria.descripcion}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='form-group col-4'></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Estado"
                                value={ Functions.getValueEstado( tipoMateria.estado ) }
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
    tipoMateria: state.TipoMateria,
} );

const mapDispatchToProps = {
    onLimpiar: TipoMateriaActions.onLimpiar,
    onShow: TipoMateriaActions.onShow,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowTipoMateria );
