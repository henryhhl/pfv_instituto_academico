
export class Programa {
    idprograma: String;
    fkidunidadadministrativa: String;
    unidadadministrativa: String;

    fkidunidadnegocio: String;
    unidadnegocio: String;

    fkidunidadacademica: String;
    unidadacademica: String;

    fkidnivelacademico: String;
    nivelacademico: String;

    fkidmodalidadacademica: String;
    modalidadacademica: String;

    codigo: String;
    sigla: String;
    descripcion: String;
    
    estado: String;
    concurrencia: number;
    isdelete: String;
    created_at: String;
    updated_at?: String;
    deleted_at?: String;
}
