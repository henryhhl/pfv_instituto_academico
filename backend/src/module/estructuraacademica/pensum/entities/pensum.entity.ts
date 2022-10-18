
export class Pensum {
    idpensum: String;
    fkidunidadadministrativa: String;
    unidadadministrativa: String;

    fkidunidadnegocio: String;
    unidadnegocio: String;

    fkidunidadacademica: String;
    unidadacademica: String;

    fkidprograma: String;
    programa: String;

    descripcion: String;
    fechaaprobacion: String;
    estadoproceso: String;
    
    estado: String;
    concurrencia: number;
    isdelete: String;
    created_at: String;
    updated_at?: String;
    deleted_at?: String;
}
