//Adiciona um atributo ao request, tipado com string
declare namespace Express{
    export interface Request{
        user_id: string;
    }
}