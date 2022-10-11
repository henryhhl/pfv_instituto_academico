
export class Permiso {
    idpermiso: string;
    fkidpermisopadre?: string;
    fkidtipopermiso: string;
    tipopermiso: string;
    descripcion: string;
    imagen?: string;
    estado: string;
    concurrencia: number;
    isdelete: string;
    created_at: string;
    updated_at?: string;
    deleted_at?: string;
}
