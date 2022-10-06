
import React from 'react';
import ModalComponent from '../../../../../components/modal';

export default function ListadoTipoRolModal() {
    return (
        <>
            <ModalComponent
                visible={visibleTipoRol}
                footer={null}
                width={350}
                centered={true}
            >
                Hola
            </ModalComponent>
        </>
    );
};
