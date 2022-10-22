
export class ResponsableReferenciaContactoDetalle {
    idresponsablereferenciacontactodetalle: string;
    fkidreferenciacontacto: string;
    referenciacontacto: string;

    fkidresponsable: string;
    responsable: string;
    
    detalle: string;
    
    estado: string;
    concurrencia: number;
    isdelete: string;
    created_at: string;
    updated_at?: string;
    deleted_at?: string;
}
