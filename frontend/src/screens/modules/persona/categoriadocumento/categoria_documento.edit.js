
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CardComponent from '../../../../components/card';
import { ButtonComponent ,InputComponent, SelectComponent } from '../../../../components/components';
import PaperComponent from '../../../../components/paper';
import { EstadoData } from '../../../../data/estado.data';
import { CategoriaDocumentoActions } from '../../../../redux/actions/persona/categoria_documento.action';

function EditCategoriaDocumento( props ) {
    const { categoriaDocumento } = props;
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect( () => {
        props.onEdit( params.idcategoriadocumento );
    }, [] );

    function onBack() {
        props.onLimpiar();
        navigate(-1);
    }

    return (
        <>
            <PaperComponent>
                <CardComponent
                    header={"Editar Categoria Documento"}
                    footer={
                        <>
                            <ButtonComponent
                                onClick={ () => props.onUpdate(categoriaDocumento, onBack) }
                            >
                                Editar
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
                    <div className="row">
                        <div className="form-group col-4"></div>
                        <div className="form-group col-4">
                            <SelectComponent 
                                data={EstadoData}
                                label={"Estado*"}
                                value={categoriaDocumento.estado}
                                onChange={ (value) => props.setEstado(categoriaDocumento, value) }
                                error={categoriaDocumento.error.estado}
                                message={categoriaDocumento.message.estado}
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
    onEdit: CategoriaDocumentoActions.onEdit,
    onLimpiar: CategoriaDocumentoActions.onLimpiar,
    setDescripcion: CategoriaDocumentoActions.setDescripcion,
    setEstado: CategoriaDocumentoActions.setEstado,
    onUpdate: CategoriaDocumentoActions.onUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)( EditCategoriaDocumento );
