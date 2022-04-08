import { NextFunction, Request, response, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepositories";


interface IUserEntity{
    admin: boolean;
}

async function ensureAdmin(request: Request, response: Response, next: NextFunction) {

    const { user_id } = request;

    const usersRepositories = getCustomRepository(UsersRepository);

    const { admin } = await usersRepositories.findOne(user_id) as IUserEntity;

    if(admin){
        return next();
    }
    // 401 -> Sem autorização
    return response.status(401).json({error: "unauthorized"});
}

export { ensureAdmin };