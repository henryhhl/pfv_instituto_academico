
export class ResponsableUnidadAcademicaDetalle {
    idresponsableunidadacademicadetalle: string;
    fkidunidadacademica: string;
    unidadacademica: string;

    fkidunidadadministrativa: string;
    unidadadministrativa: string;

    fkidunidadnegocio: string;
    unidadnegocio: string;
    
    fechainicio: string;
    fechafinal: string;
    estadoproceso: string;
    
    estado: string;
    concurrencia: number;
    isdelete: string;
    created_at: string;
    updated_at?: string;
    deleted_at?: string;
}
