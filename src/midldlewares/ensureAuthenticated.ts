import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPayLoad{
    sub: string;
};

function ensureAuthenticated (request: Request, response: Response, next: NextFunction){

    //Receber o token
    const authToken = request.headers.authorization;

    //Validar token preenchido
    if(!authToken){
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    //Validar o authToken
    try{
        // Força o objeto retornado por verify a conter um atributo sub do tipo string
        // Pois sabemos que o sub do token é string (id do usuário)
        const { sub } = verify(token , "6555f46cb2615d06170afd5a7f82f4cb") as IPayLoad;

        //Recuperar informações do usuário
        request.user_id = sub;
        return next();
    } catch (err){
        return response.status(401).end();
    }



}

export { ensureAuthenticated };