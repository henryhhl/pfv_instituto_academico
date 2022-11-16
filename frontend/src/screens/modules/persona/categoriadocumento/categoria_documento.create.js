
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { CategoriaDocumentoActions } from '../../../../redux/actions/persona/categoria_documento.action';

function CreateCategoriaDocumento( props ) {
    const { categoriaDocumento } = props;
    const navigate = useNavigate();

    React.useEffect( () => {
        props.onCreate();
        return () => {};
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Nuevo Categoria Documento"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onStore(categoriaDocumento, onBack) }
                            >
                                Guardar
                            </ButtonComponent>
                            <ButtonComponent
                                type='danger' onClick={onBack}
                            >
                                Cancelar
                            </ButtonComponent>
                        </>
                    }
                >
                    <div className="row">
                        <div className="form-group col-2"></div>
                        <div className="form-group col-8">
                            <InputComponent
                                label="Nombre de Categoría Documento*"
                                value={categoriaDocumento.descripcion}
                                onChange={ (value) => props.setDescripcion(categoriaDocumento, value) }
                                error={categoriaDocumento.error.descripcion}
                                message={categoriaDocumento.message.descripcion}
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
    onCreate: CategoriaDocumentoActions.onCreate,
    onLimpiar: CategoriaDocumentoActions.onLimpiar,
    setDescripcion: CategoriaDocumentoActions.setDescripcion,
    onStore: CategoriaDocumentoActions.onGrabar,
};

export default connect(mapStateToProps, mapDispatchToProps)( CreateCategoriaDocumento );
