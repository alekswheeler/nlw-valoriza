/* eslint-disable */
import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController{

    async handle(resqueste: Request, response: Response) {

        const {name, email, password, admin } = resqueste.body;
    
        const createUserService = new CreateUserService();
        
        const user = await createUserService.execute({name, email, password, admin});

        return response.json(user);

    }

}


export { CreateUserController };