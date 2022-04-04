import { NextFunction, Request, response, Response } from "express";




export function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    const admin = true;

    if(admin){
        return next();
    }
    // 401 -> Sem autorização
    return response.status(401).json({error: "unauthorized"});
}