
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { CategoriaDocumentoActions } from '../../../../redux/actions/persona/categoria_documento.action';
import { Functions } from '../../../../utils/functions';

function ShowCategoriaDocumento( props ) {
    const { categoriaDocumento } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onShow( params.idcategoriadocumento );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Detalle Categoria Documento"}
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
                        <div className="form-group col-8">
                            <InputComponent
                                label="Nombre de Categoría Documento"
                                value={categoriaDocumento.descripcion}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='form-group col-4'></div>
                        <div className="form-group col-4">
                            <InputComponent
                                label="Estado"
                                value={ Functions.getValueEstado( categoriaDocumento.estado ) }
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
    categoriaDocumento: state.CategoriaDocumento,
} );

const mapDispatchToProps = {
    onShow: CategoriaDocumentoActions.onShow,
    onLimpiar: CategoriaDocumentoActions.onLimpiar,
};

export default connect(mapStateToProps, mapDispatchToProps)( ShowCategoriaDocumento );
